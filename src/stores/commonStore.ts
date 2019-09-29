import { action, observable, reaction } from 'mobx';
import agent from '../agent';

class CommonStore {
  @observable public appName = 'Conduit';
  @observable private token = window.localStorage.getItem('jwt') || null;
  @observable private appLoaded = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @action.bound public setToken(token: string) {
    this.token = token;
  }

  @action.bound public setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
