import { AxiosError, AxiosResponse } from 'axios';
import { FeatureCollection } from 'geojson';
import { action, observable } from 'mobx';
import xml2js from 'xml2js';
import agent from '../agent';
import { ILayer, ILayerClass, ILayerField, ILayerInfo } from '../types';

export default class Layer implements ILayerClass {
  @observable public isLoading = false;
  @observable public errors: AxiosResponse | undefined = undefined;
  public id: number;
  public name: string;
  public info: ILayerInfo;
  public isEditable: boolean;
  public fields: ILayerField;
  public groupId: number;
  public order: number;
  @observable.struct public featureCollection: FeatureCollection | null = null;
  public style = null;
  private RespondedLayer: ILayer;

  constructor(RespondedLayer: ILayer) {
    this.id = RespondedLayer.id;
    this.name = RespondedLayer.name;
    this.info = RespondedLayer.info;
    this.isEditable = RespondedLayer.isEditable;
    this.fields = RespondedLayer.fields;
    this.groupId = RespondedLayer.groupId;
    this.order = RespondedLayer.order;
    this.RespondedLayer = RespondedLayer;
    // this.getLayer();
  }

  @action.bound public getLayer() {
    this.isLoading = true;
    this.errors = undefined;
    agent
      .getLayer(this.RespondedLayer)
      .then(featureCollection => {
        this.featureCollection = featureCollection;
        this.getStyle(this.id);
      })
      .catch(
        action((error: AxiosError) => {
          this.errors = error.response;
          throw error;
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }
  @action.bound private getStyle(id: number) {
    agent.getStyle(id).then(style => {
      console.log(style);
      // const parser = new xml2js.Parser({ trim: true, normalize: true, mergeAttrs: true, charkey: 'val' });
      const parser = new DOMParser();
      const xml = parser.parseFromString(style.styleSld, 'application/xml');
      // const xml = style.styleSld || null;
      console.log(xml);
      // parser.parseString(xml, (err: any, result: any) => {
      //   console.log(err, result);
      // });
      this.style = style;
    });
  }
}
