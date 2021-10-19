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
                    return 'green';
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
            weight: 1
        };
    }

    strongStyle = (building) => {
        return {
            ...this.style(building),
            fillOpacity: 0.3,
            weight: 2,
            opacity: 0.5
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

        // This was just an idea to show building data on as a person moves there mouse around the map
        // const popup = L.popup()
        //     .setContent(
        //         `<p>${properties.BLDG_ID}</p>`
        //     )
        //     .setLatLng(e.latlng)
        //     .openOn(this.state.map);

        if (properties.BLDG_ID !== this.state.selected)
            this.setState({ highlight: properties.BLDG_ID });

        this.state.layer.setFeatureStyle(properties.BLDG_ID, this.strongStyle(properties));
    }

    onMouseout = (e) => {
        if (this.state.highlight !== this.state.selected)
            this.clearHighlight();
    }

    onClick = (e) => {
        const properties = e.layer.properties;

        const popup = L.popup()
            .setContent(
                `<p>${properties.BLDG_ID}!!!!!!</p>`
            )
            .setLatLng(e.latlng)
            .openOn(this.state.map);

        popup.on('remove', () => {
            this.state.layer.resetFeatureStyle(this.state.selected);
        });

        if (this.state.selected !== properties.BLDG_ID) {
            store.dispatch(updateInfo({type: 'building', properties: properties}));
            store.dispatch(fetchResources(`/resources?id=${properties.BLDG_ID}`));
        }

        this.clearHighlight();
        this.state.layer.resetFeatureStyle(this.state.selected);

        this.setState({ selected: properties.BLDG_ID });
        this.state.layer.setFeatureStyle(properties.BLDG_ID, this.strongStyle(properties));
    }

    initialize = (map) => {
        this.setState({ dataLoading: true });

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
            layer: layer,
            map
        });

        map.addLayer(layer);
    }

	handleClick = (map) => {
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
