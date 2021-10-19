import React from 'react';
import MapContext from '../MapContext';
import L from 'leaflet';
import {} from 'leaflet.vectorgrid';

import { COLORS } from '../../../constants';
import GenericLayer from '../../Components/GenericLayer';
import { highlightGeoJSON, dehighlightGeoJSON, selectGeoJSON } from '../Utils/Selection';

//DEBUG
//const data = require('../../../data/Railways.json');

export default class Railways extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            dataLoading: false,
            dataLoaded: false,
            layer: null,
            active: false,
            curr: null
        }
    }

    initialize = (map) => {
        let colorIndex = Math.floor(Math.random() * 64);
        let options = this.props.options;
        let curr = null;
        let companies = {};

        function getColor(featureID) {
            colorIndex = colorIndex % 64;
            if (!companies[featureID]) {
                companies[featureID] = COLORS[colorIndex++]
            }
            return companies[featureID];
        }

        fetch(this.props.url)
        .then(response => { return response.json(); })
        .then(data => {
            let layerObj = L.geoJSON(data, {
                style: function(feature) { return { ...options, color: getColor(feature.properties.NAME) }},
                onEachFeature: function(feature, layer) {
                    layer.on({
                        'mouseover': function (e) {
                            highlightGeoJSON(e.target);
                        },
                        'mouseout': function (e) {
                            dehighlightGeoJSON(layerObj, e.target, curr);
                        },
                        'click': function(e) {
                            curr = selectGeoJSON(layerObj, e.target, map,  curr);
                        }
                    })
                }
            })

            this.setState({
                data: data,
                dataLoaded: true,
                dataLoading: false,
                active: true,
                layer: layerObj
            });

            map.addLayer(layerObj);
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
                        id={this.props.id}
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