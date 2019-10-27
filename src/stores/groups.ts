import { AxiosError, AxiosResponse } from 'axios';
import { action, computed, observable } from 'mobx';
import agent from '../agent';
import Group from './group';

export default class Groups {
  @observable public isLoading = false;
  @observable public errors: AxiosResponse | undefined = undefined;
  @observable private groups = new Map<number, Group>();

  constructor() {
    this.getGroups();
  }

  @computed
  get map() {
    return this.groups;
  }
  @action.bound public getGroups() {
    this.isLoading = true;
    this.errors = undefined;
    return agent
      .getGroups()
      .then(groups => {
        groups.forEach(group => this.map.set(group.id, new Group(group)));
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
