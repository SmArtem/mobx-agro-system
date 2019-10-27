import { action, observable } from 'mobx';
import { IGroup } from '../types';

export default class Group {
  public id: number;
  public name: string;
  public order: string;
  @observable public open = false;
  constructor(group: IGroup) {
    this.id = group.id;
    this.name = group.name;
    this.order = group.order;
  }

  @action.bound
  public toggle() {
    this.open = !this.open;
  }
}
