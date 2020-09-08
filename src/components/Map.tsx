import { DeckGL, GeoJsonLayer, LineLayer } from 'deck.gl';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import layersStore from '../stores/layersStore';
import mapStore from '../stores/mapStore';

const geojsonLayer = new GeoJsonLayer({
  data: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json',
  filled: true,
  opacity: 0.8,
  stroked: false,

  // getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
  // getFillColor: f => colorScale(f.properties.growth),
  // getLineColor: f => [255, 255, 255],

  pickable: true
});

const AppMap = observer(() => {
  const { viewState, setViewState } = mapStore;
  const { geoJSONLayers } = layersStore;

  return (
    <>
      <DeckGL
        // onResize={() => console.log('resize')}
        // TODO: Посмотреть другие параметры
        onViewStateChange={({ viewState: vs }) => setViewState(vs)}
        width="100%"
        height="100%"
        viewState={viewState}
        controller={true}
        layers={[geoJSONLayers]}
      />
    </>
  );
});

export default AppMap;
