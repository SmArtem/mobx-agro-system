import { AxiosError, AxiosResponse } from 'axios';
import { action, observable } from 'mobx';
import agent from '../agent';
import { IUser } from '../types';

class AuthStore {
  @observable public isLoading = false;

  @observable public errors: AxiosResponse | undefined = undefined;

  @observable
  public values = {
    login: 'startsev',
    password: '12345'
  };

  @observable public authenticated = false;
  @observable public user: IUser | null = null;

  constructor() {
    this.auth();
  }

  @action.bound public auth() {
    this.isLoading = true;
    this.errors = undefined;
    return agent
      .auth()
      .then(({ authenticated, user }) => {
        this.authenticated = authenticated;
        if (authenticated && user) {
          this.user = user;
        }
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

  @action.bound public login() {
    this.isLoading = true;
    this.errors = undefined;
    return agent
      .login({ login: this.values.login, password: this.values.password })
      .then(() => {
        this.authenticated = true;
        this.auth();
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
