import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import LayersList from '../../components/LayersList';
import layersStore from '../../stores/layersStore';

const Home: React.FC = observer(() => {
  // tslint:disable-next-line: react-hooks-nesting
  useEffect(() => {
    layersStore.getLayers();
  }, []);
  // console.log(layersStore, layersStore.layers && layersStore.layers.map(() => 'a'));
  // const layers = Array.from(layersStore.layers);
  return <LayersList />;
});

export default Home;
