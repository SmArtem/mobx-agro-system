import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FeatureCollection } from 'geojson';
import { IGroup, IRespondedLayer } from '../types';

export default class Api {
  private client: AxiosInstance;
  private token: string | null;
  private refreshToken: string | null;
  private refreshRequest: Promise<AxiosResponse<any>> | null;

  constructor() {
    this.client = axios.create();
    this.token = localStorage.getItem('jwt');
    this.refreshToken = localStorage.getItem('jwt refreshToken');
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
        if (!this.token) {
          return config;
        }

        const newConfig = {
          headers: {},
          params: {
            ...config.params,
            token: this.token
          },
          ...config
        };

        // newConfig.headers.Authorization = `Bearer ${this.token}`;
        return newConfig;
      },
      e => Promise.reject(e)
    );

    this.client.interceptors.response.use(
      response => response,
      async error => {
        if (!this.refreshToken || error.response.status !== 401 || error.config.retry) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.get('/auth/token/refresh', {
            params: {
              refreshToken: this.refreshToken
            }
          });
        }
        const { data } = await this.refreshRequest;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        const newRequest = {
          ...error.config,
          retry: true
        };

        return this.client(newRequest);
      }
    );
  }

  public async login({ login, password }: { login: string; password: string }) {
    return this.client.post('/auth/token', { login, password }).then(({ data }) => {
      this.token = data.token;
      this.refreshToken = data.refreshToken;
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('jwt refreshToken', data.refreshToken);
      return data;
    });
  }

  public logout() {
    this.token = null;
    this.refreshToken = null;
  }

  public async getUsers() {
    const { data } = await this.client('/users');
    return data;
  }
  public async getLayers() {
    const { data } = await this.client.get('/layers');
    const arr = data.layers;
    const layers: IRespondedLayer[] = arr.map((item: { layer: IRespondedLayer; groupId: number; order: number }) => ({
      ...item.layer,
      groupId: item.groupId,
      order: item.order
    }));
    return layers;
  }
  public async getGroups() {
    const { data } = await this.client.get('/groups');
    const { groups } = data;
    // TODO: Разобраться как можно использовать параметр mapExtent
    return groups as IGroup[];
  }
  public async getLayer(layer: IRespondedLayer) {
    // const { data } = await this.client.get('/layers');
    const { info } = layer;
    const url = '/wfs';
    const params = {
      service: 'wfs' || info.service,
      version: '1.1.0',
      outputFormat: 'application/json',
      typeName: info.typeName,
      srsName: 'EPSG:4326',
      request: 'GetFeature'
    };
    const { data } = await this.client.get(url, { params });
    return data as FeatureCollection;
  }
}
