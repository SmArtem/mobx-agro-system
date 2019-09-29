import { AxiosError, AxiosResponse } from 'axios';
import { action, observable } from 'mobx';
import agent from '../agent';

class AuthStore {
  @observable public isLoading = false;

  @observable public errors: AxiosResponse | undefined = undefined;

  @observable
  public values = {
    login: 'startsev',
    password: '12345'
  };

  @observable public authenticated = false;

  @action.bound public login() {
    this.isLoading = true;
    this.errors = undefined;
    return agent
      .login({ login: this.values.login, password: this.values.password })
      .then(() => {
        this.authenticated = true;
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
  @action.bound public setLogin(login: string) {
    this.values.login = login;
  }

  @action.bound public setPassword(password: string) {
    this.values.password = password;
  }
}

export default new AuthStore();
