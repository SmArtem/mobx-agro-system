import { AxiosError, AxiosResponse } from 'axios';
import { FeatureCollection } from 'geojson';
import { action, observable } from 'mobx';
import agent from '../agent';
import { ILayer, ILayerField, ILayerInfo, IRespondedLayer } from '../types';

export class Layer implements ILayer {
  @observable public isLoading = false;
  @observable public errors: AxiosResponse | undefined = undefined;
  public id: number;
  public name: string;
  public info: ILayerInfo;
  public isEditable: boolean;
  public fields: ILayerField;
  public groupId: number;
  public order: number;
  @observable public featureCollection: FeatureCollection | null = null;
  private RespondedLayer: IRespondedLayer;

  constructor(RespondedLayer: IRespondedLayer) {
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
}
