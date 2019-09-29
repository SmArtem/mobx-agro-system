// type
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export interface IGroup {
  id: number;
  name: string;
  order: string;
}
export interface ILayerField {
  id: number;
  name: string;
  nameRu: string;
  order: number;
  title: boolean;
  view: boolean;
  type: string; // TODO: сделать перечисляемый тип
}
export interface ILayerInfo {
  id: number;
  typeName: string;
  style: string; // TODO: сделать перечисляемый тип
  service: string; // TODO: сделать перечисляемый тип
  poly: false;
  requestUrl: string;
}
export interface IRespondedLayer {
  id: number;
  name: string;
  info: ILayerInfo;
  isEditable: boolean;
  fields: ILayerField;
  groupId: number;
  order: number;
}
export interface ILayer {
  id: number;
  name: string;
  info: ILayerInfo;
  isEditable: boolean;
  fields: ILayerField;
  groupId: number;
  order: number;
  isLoading: boolean;
  getLayer: () => void;
  // getLayer: () => Promise<FeatureCollection<Geometry, GeoJsonProperties>>;
}

export interface IUser {
  id: number;
  login: string;
  name: string;
  info: {
    id: number;
    address: string;
    phone: string;
    fax: string;
    email: string;
  };
  organizationId: number | null;
  roleId: number;
  role: {
    id: number;
    title: string;
  };
}
