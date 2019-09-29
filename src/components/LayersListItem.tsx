import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { ILayer } from '../types';

interface IProps {
  layer: ILayer;
}

const LayersListItem: React.FC<IProps> = observer(({ layer }) => {
  return (
    <div>
      {layer.id}
      {layer.name}
      {layer.isLoading ? <Icon loading name="spinner" /> : <Icon name="download" onClick={() => layer.getLayer()} />}
      <Button onClick={() => layer.getLayer()}>asdsa</Button>
    </div>
  );
});
export default LayersListItem;
