import { AxiosError, AxiosResponse } from 'axios';
import { GeoJsonLayer } from 'deck.gl';
import { action, computed, observable } from 'mobx';
import agent from '../agent';
import Groups from './groups';
import Layer from './layer';

class LayersStore {
  @observable public isLoading = false;
  @observable public errors: AxiosResponse | undefined = undefined;

  @observable public layersRegistry = new Map<number, Layer>();
  @observable public groups = new Groups();

  @computed get layers() {
    return Array.from(this.layersRegistry.values());
  }

  @computed get featureCollections() {
    return this.layers.filter(layer => !!layer.featureCollection).map(layer => layer.featureCollection);
  }

  @computed get geoJSONLayers() {
    return this.featureCollections.map(feature => {
      return new GeoJsonLayer({
        data: feature,
        filled: true,
        opacity: 0.8,
        stroked: false,

        // getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
        getFillColor: [40, 40, 255, 255],
        getLineColor: () => [255, 50, 50],

        pickable: true
      });
    });
  }

  @computed get grouped() {
    return this.groups.list.map(group => ({
      group,
      ids: this.layers.reduce((acc, layer) => (layer.groupId === group.id ? acc.concat(layer.id) : acc), [] as number[])
    }));
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
