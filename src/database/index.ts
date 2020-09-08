import Dexie from 'dexie';
import { ILayer } from '../types';

class LayersDatabase extends Dexie {
  public layers: Dexie.Table<ILayer, number>; // id is number in this case

  public constructor() {
    super('LayersDatabase');
    this.version(1).stores({
      layers: '++id,name,groupId,order'
    });
    this.layers = this.table('friends');
  }
}

export default new LayersDatabase();
