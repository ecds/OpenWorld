import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MapContext from '../MapContext';
import L from 'leaflet';
import {} from 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { populatePopup } from '../Utils/Popups.js';

import GenericLayer from '../../Components/GenericLayer';

export default class MarkerCluster extends React.Component {
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
        let layer = L.markerClusterGroup();

        let divIcon = L.divIcon({
            className: 'custom-icon',
            html: ReactDOMServer.renderToString(React.cloneElement(this.props.options.div_icon, {width: '16px', height: '16px'}))
        });

        fetch(this.props.url)
        .then(response => { return response.json() })
        .then(data => {
            for (let i = 0; i < data.features.length; i++) {
                let m = L.marker(new L.latLng(data.features[i].geometry.coordinates[1], 
                                            data.features[i].geometry.coordinates[0]),
                                            {icon: divIcon}); // WILL CAUSE PROBLEMS IF OVERLAYS NOT PROPERLY DEFINED

                if (this.props.options.popup_content) {
                    let popupContent = populatePopup(data.features[i], this.props.options.popup_content);
                    m.bindTooltip(popupContent, {offset: new L.Point(-15, 0), direction: 'left'});
                    m.on('mouseover', function() { this.openTooltip() }); // DO NOT USE ARROW FUNCTIONS HERE
                    m.on('mouseout', function() { this.closeTooltip() });
                }
                
                layer.addLayer(m);
            }        

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
    
    render () {
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