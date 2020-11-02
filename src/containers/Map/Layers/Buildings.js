import React from 'react';
import MapContext from '../MapContext';
import L from 'leaflet';
import {} from 'leaflet.vectorgrid';

import store from '../../../redux/store';
import { updateInfo, fetchResources } from '../../../redux/actions';

import { MAP_OPTIONS } from '../../../constants';
import GenericLayer from '../../Components/GenericLayer';

//const data = require('../../../data/buildings_1928.json');

export default class Buildings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            dataLoading: false,
            dataLoaded: false,
            layer: null,
            active: false,
            highlight: null,
            selected: null
        }

        this.clearHighlight = this.clearHighlight.bind(this);
    }

    //#region Styling and Events
    getColor = (use) => {
        if (use) {
            switch(use.toUpperCase()) {
                case 'A':
                    return 'olive';
                case 'C':
                    return 'red';
                case 'F':
                    return 'orange';
                case 'FILM':
                    return 'pink';
                case 'I':
                case 'MFG':
                    return 'purple';
                case 'M':
                    return 'brown';
                case 'O':
                    return 'black';
                case 'P':
                case 'FD':
                    return 'blue';
                case 'R':
                    return 'yellow';
                case 'T':
                    return 'lightgray';
                case 'U':
                    return 'gray';
                case 'W':
                    return 'violet';
                default:
                    return 'cyan';
            }
        } else {
            return 'black';
        }
    }

    style = (building) => {
        return {
            fillOpacity: 0.15,
            opacity: 0.3,
            fillColor: this.getColor(building.use),
            color: this.getColor(building.use),
            fill: true,
            weight: 1,
        };
    }

    strongStyle = (building) => {
        return {
            fillColor: this.getColor(building.use),
            color: this.getColor(building.use),
            fillOpacity: 0.3,
            weight: 2,
            opacity: 0.5,
            fill: true,
        }
    }

    clearHighlight = () => {
        if (this.state.highlight) {
            this.state.layer.resetFeatureStyle(this.state.highlight);
        }
        this.setState({ highlight: null });
    }

    onMouseover = (e) => {
        var properties = e.layer.properties;

        this.clearHighlight();

        if (properties.BLDG_ID !== this.state.selected)
            this.setState({ highlight: properties.BLDG_ID });

        this.state.layer.setFeatureStyle(properties.BLDG_ID, this.strongStyle(properties));
    }

    onMouseout = (e) => {
        if (this.state.highlight !== this.state.selected)
            this.clearHighlight();
    }

    onClick = (e) => {
        var properties = e.layer.properties;

        if (this.state.selected !== properties.BLDG_ID) {
            store.dispatch(updateInfo({type: 'building', properties: properties}));
            store.dispatch(fetchResources(`/resources?id=${properties.BLDG_ID}`));
        }

        this.clearHighlight();
        this.state.layer.resetFeatureStyle(this.state.selected);

        this.setState({ selected: properties.BLDG_ID });
        this.state.layer.setFeatureStyle(properties.BLDG_ID, this.strongStyle(properties));
    }
    //#endregion

    initialize = (map) => {
        this.setState({ dataLoading: true });

        // fetch(this.props.url)
        // .then(response => { return response.json() })
        // .then(data => {
            let layer = new L.vectorGrid.protobuf(this.props.url, {
                rendererFactory: L.svg.tile,
                vectorTileLayerStyles: {
                    buildings_1928: properties => {
                        return this.style(properties);
                    },
                },
                interactive: this.props.options.interactive,
                maxZoom: MAP_OPTIONS.maxZoom,
                getFeatureId: function(f) {
                    return f.properties.BLDG_ID;
                }
            })
            .on('mouseover', (e) => this.onMouseover(e))
            .on('mouseout', (e) => this.onMouseout(e))
            .on('click', (e) => this.onClick(e));

			this.setState({
                dataLoaded: true,
                dataLoading: false,
                active: true,
                layer: layer
            });

			map.addLayer(layer);
        // });
    }

	handleClick = (map) => {
        console.log(this.props, this.state.active)
		if (!this.state.dataLoaded) {
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