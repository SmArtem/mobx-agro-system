import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Accordion, Icon, List } from 'semantic-ui-react';

import layersStore from '../stores/layersStore';
import LayersListItem from './LayersListItem';

const LayersList: React.FC = observer(() => {
  const grouped = layersStore.grouped;
  // tslint:disable-next-line: react-hooks-nesting
  const [selected, setSelected] = useState<number[]>([]);
  const handleClick = (id: number) =>
    setSelected(selected.includes(id) ? selected.filter(n => n !== id) : selected.concat(id));
  return (
    <Accordion styled>
      {grouped.map(group => (
        <div key={group.id.toString()}>
          <Accordion.Title active={selected.includes(group.id)} index={0} onClick={() => handleClick(group.id)}>
            <Icon name="dropdown" />
            {group.name}
          </Accordion.Title>
          <Accordion.Content active={selected.includes(group.id)}>
            {group.layers.map(layer => (
              <List divided celled verticalAlign="middle" key={layer.id.toString()}>
                <List.Item>
                  <List.Content>
                    <LayersListItem layer={layer} />
                  </List.Content>
                </List.Item>
              </List>
            ))}
          </Accordion.Content>
        </div>
      ))}
    </Accordion>
  );
});

export default LayersList;
