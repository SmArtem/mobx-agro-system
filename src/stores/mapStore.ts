import { action, observable } from 'mobx';

class MapStore {
  public width = '100%';
  public height = '100%';

  @observable public viewState = {
    longitude: 93.193935,
    latitude: 56.559655,
    zoom: 9,
    pitch: 0,
    bearing: 0
  };

  @action.bound public setViewState(viewState: any) {
    this.viewState = viewState;
  }
}

export default new MapStore();
