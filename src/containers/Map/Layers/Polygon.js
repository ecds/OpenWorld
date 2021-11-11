import React from 'react';
import L from 'leaflet';
import MapContext from '../MapContext';
import GenericLayer from '../../Components/GenericLayer';

export default class Polygon extends React.Component {
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
        .then(response => { return response.json(); })
        .then(data => {
            let layer = new L.GeoJSON(data, {
                ...this.props.options,
                interactive: false,
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

    render () {
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
                        color={this.props.activeColor}
                    />
                }}
            </MapContext.Consumer>
        )
    }
}