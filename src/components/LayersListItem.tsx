import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import layersStore from '../stores/layersStore';

interface IProps {
  id: number;
}

const LayersListItem = observer(({ id }: IProps) => {
  const layer = layersStore.layersRegistry.get(id);
  if (!layer) {
    return null;
  }
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
