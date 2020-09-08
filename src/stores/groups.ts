import { AxiosError, AxiosResponse } from 'axios';
import { action, computed, observable } from 'mobx';
import agent from '../agent';
import Group from './group';

export default class Groups {
  @observable public isLoading = false;
  @observable public errors: AxiosResponse | undefined = undefined;
  @observable private groups: Group[] = [];

  constructor() {
    this.getGroups();
  }

  @computed
  get list() {
    return this.groups;
  }
  @action.bound public getGroups() {
    this.isLoading = true;
    this.errors = undefined;
    return agent
      .getGroups()
      .then(groups => {
        this.groups = groups.map(group => new Group(group));
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
