import { AxiosError, AxiosResponse } from 'axios';
import { action, computed, observable } from 'mobx';
import agent from '../agent';
import { IGroup, ILayer, IRespondedLayer } from '../types';
import { Layer } from './layer';

class LayersStore {
  @observable public isLoading = false;
  @observable public errors: AxiosResponse | undefined = undefined;

  @observable public layersRegistry = observable.map<number, ILayer>();
  @observable public groups: IGroup[] = [];

  @computed get layers() {
    return Array.from(this.layersRegistry.values());
  }

  @computed get grouped() {
    const layers = this.layers;
    const grouped = this.groups.map(group => ({
      ...group,
      layers: layers.filter(layer => layer.groupId === group.id)
    }));
    return grouped;
  }

  constructor() {
    this.getGroups();
  }

  @action.bound public getGroups() {
    this.isLoading = true;
    this.errors = undefined;
    return agent
      .getGroups()
      .then(groups => {
        this.groups = groups;
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

  @action.bound public getLayers() {
    this.isLoading = true;
    this.errors = undefined;
    return agent
      .getLayers()
      .then(layers => {
        layers.forEach(layer => this.layersRegistry.set(layer.id, new Layer(layer)));
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

export default new LayersStore();
