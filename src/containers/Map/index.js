import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Map as MapComponent, TileLayer, ScaleControl } from 'react-leaflet';
import styled from 'styled-components';

import MapContext from './MapContext';
import { MAP_OPTIONS, MAP_TILE_LAYERS } from '../../constants';

const StyledMap = styled(MapComponent)`
	width: auto;
	height: calc(100vh - 56px);
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 0;

	@media (max-width: 768px) {
		min-width: 100vw;
		max-width: 100vw;
	}

	@media (min-width: 769px) {
		min-width: calc(100% - 500px);
		width: 60vw;
		max-width: calc(100% - 400px);
	}
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
                    return <TileLayer {...layer} key={key} />
                })}
                <ScaleControl />
            </StyledMap>
        )
    };
}

export default props => (
    <MapContext.Consumer>
        {({ setMap }) => <Map {...props} setMap={setMap} />}
    </MapContext.Consumer>
);
