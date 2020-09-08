import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Accordion, Icon, List } from 'semantic-ui-react';

import layersStore from '../stores/layersStore';
import LayersListItem from './LayersListItem';

const LayersList: React.FC = observer(() => (
  <Accordion styled style={{ maxHeight: '60%', overflow: 'auto' }}>
    {layersStore.grouped.map(n => {
      const { group, ids } = n;
      return (
        <div key={group.id.toString()}>
          <Accordion.Title active={group.open} index={0} onClick={() => group.toggle()}>
            <Icon name="dropdown" />
            {group.name}
          </Accordion.Title>
          <Accordion.Content active={group.open}>
            {ids.map(id => (
              <List divided celled verticalAlign="middle" key={id.toString()}>
                <List.Item>
                  <List.Content>
                    <LayersListItem id={id} />
                  </List.Content>
                </List.Item>
              </List>
            ))}
          </Accordion.Content>
        </div>
      );
    })}
  </Accordion>
));

export default LayersList;
