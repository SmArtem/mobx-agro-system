import { AxiosError, AxiosResponse } from 'axios';
import { action, computed, observable } from 'mobx';
import agent from '../agent';
import { IGroup, ILayer, IRespondedLayer } from '../types';
import Groups from './groups';
import Layer from './layer';

class LayersStore {
  @observable public isLoading = false;
  @observable public errors: AxiosResponse | undefined = undefined;

  @observable public layersRegistry = observable.map<number, ILayer>();
  @observable public groups = new Groups();

  @computed get layers() {
    return Array.from(this.layersRegistry.values());
  }

  @computed get grouped() {
    return new Map(
      Array.from(this.groups.map).map(([id, group]) => [
        id,
        { group, layers: this.layers.filter(layer => layer.groupId === group.id) }
      ])
    );
  }

  // constructor() {}

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
