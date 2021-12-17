import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Map as MapComponent, TileLayer, ScaleControl, WMSTileLayer } from 'react-leaflet';
import styled from 'styled-components';

import MapContext from './MapContext';
import { MAP_OPTIONS, MAP_TILE_LAYERS } from '../../constants';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

const StyledMap = styled(MapComponent)`
	width: auto;
	height: calc(100vh - 66px);
	position: absolute;
	left: 0;
	bottom: 0;
  width: 100vw;
	z-index: 0;
`;

class Map extends React.Component {
  mapRef = React.createRef(null);

  componentDidMount() {
    const map = this.mapRef.current.leafletElement;
    this.props.setMap(map);
    setTimeout(() => { map.invalidateSize() }, 100)
  };

  render() {
    return (
      <StyledMap {...MAP_OPTIONS} ref={this.mapRef}>
        {MAP_TILE_LAYERS.map((layer, key) => {
          // if(layer.year <= this.props.year) {
            if (layer.type == 'WMS') {
              return <WMSTileLayer {...layer} opacity={layer.year <= this.props.year ? 1 : 0} key={key} />
            } else {
              return <TileLayer {...layer} opacity={layer.year <= this.props.year ? 1 : 0} key={key} />
            }
          // } else {
          //   return <></>
          // }
        })}
        {/* <ScaleControl /> */}
      </StyledMap>
    )
  };
}

export default props => (
  <MapContext.Consumer>
    {({ setMap, year }) => <Map {...props} setMap={setMap} year={year} />}
  </MapContext.Consumer>
);
