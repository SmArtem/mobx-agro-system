import { ILayerField, ILayerInfo } from './index';

export interface IRespondedLayer {
  id: number;
  name: string;
  info: ILayerInfo;
  isEditable: boolean;
  fields: ILayerField;
  groupId: number;
  order: number;
}
