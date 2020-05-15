import React from 'react';
import MapContext from '../MapContext';
import L from 'leaflet';
import {} from 'leaflet.vectorgrid';

import { MAP_OPTIONS } from '../../../constants';
import GenericLayer from '../../Components/GenericLayer';

export default class Roads extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            dataLoading: false,
            dataLoaded: false,
            layer: null,
            active: false
        }
    }

    initialize = (map) => {
        fetch(this.props.url)
        .then(response => { return response.json() })
        .then(data => {
            let layer = new L.vectorGrid.slicer(data, {
                rendererFactory: L.canvas.tile,
                vectorTileLayerStyles: {
                    sliced: this.props.options,
                },
                interactive: false,
                maxZoom: MAP_OPTIONS.maxZoom,
            })        

            this.setState({ 
                data: data, 
                dataLoaded: true, 
                dataLoading: false, 
                active: true, 
                layer: layer  
            });

            map.addLayer(layer);
        });
    }

    handleClick = (map) => {
		if (this.state.data === null) {
            this.setState({ dataLoading: true });
            this.initialize(map);
            return;
		}

		if (this.state.active) {
			map.removeLayer(this.state.layer);
		} else {
			map.addLayer(this.state.layer);
		}
		this.setState({ active: !this.state.active });
	}

    render() {
        return (
            <MapContext.Consumer>
                {({map}) => {
                    return <GenericLayer 
                        title={this.props.label} 
                        attr={this.props.attr}
                        desc={this.props.desc} 
                        icon={this.props.icon}
                        onClick={() =>  this.handleClick(map)}
                        active={this.state.active}
                        loading={this.state.dataLoading}
                    />
                }}
            </MapContext.Consumer>
        )
    }
}