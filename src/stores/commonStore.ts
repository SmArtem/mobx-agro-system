import { action, observable, reaction } from 'mobx';
import agent from '../agent';

class CommonStore {
  @observable public appName = 'Conduit';
  @observable public online = navigator.onLine;
  @observable private token = window.localStorage.getItem('jwt') || null;
  @observable private refreshToken = window.localStorage.getItem('jwt refreshToken') || null;
  @observable private appLoaded = false;

  constructor() {
    reaction(() => this.token, token => this.setToStorage('jwt', token));
    reaction(() => this.refreshToken, refreshToken => this.setToStorage('jwt refreshToken', refreshToken));
    window.addEventListener('online', () => (this.online = true));
    window.addEventListener('offline', () => (this.online = false));
  }

  @action.bound public setToken(token: string) {
    this.token = token;
  }

  @action.bound public getToken() {
    return this.token;
  }

  @action.bound public setAppLoaded() {
    this.appLoaded = true;
  }
  private setToStorage(key: string, value: string | null) {
    if (value) {
      window.localStorage.setItem(key, value);
    } else {
      window.localStorage.removeItem(key);
    }
  }
}

export default new CommonStore();
