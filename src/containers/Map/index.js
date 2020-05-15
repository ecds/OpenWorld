import React, { createRef } from 'react';
import L from 'leaflet';
import {} from 'leaflet.markercluster';
import {} from 'leaflet.vectorgrid';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { addLayer, toggleLayer } from '../../redux/actions';

import { addBuildingsToMap } from './Layers/old_Buildings';
import { addClusterToMap } from './Layers/MarkerCluster';
import { addSimpleGeoJSONToMap } from './Layers/SimpleGeoJSON';
import { addStreetcarsToMap } from './Layers/Streetcars';
import { addRoadsToMap } from './Layers/Roads';

import { MAP_OPTIONS,
		 MAP_TILE_LAYERS as layers, 
		 OVERLAYS } from '../../constants/';
		

const Wrapper = styled.div`
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
// TODO: convert to react-leaflet so layers can dispatch "toggleLayer", cleans code too
class Map extends React.Component {
	constructor(props) {
		super(props);
	}

    componentDidMount() {
		// MAP CONSTRUCTION
		this.map = L.map('map', MAP_OPTIONS);
		// mapRef = createRef();
		// plugin = createRef();

		// BASE LAYER CONSTRUCTION
		for (let i = 0; i < layers.length; i++) {
			L.tileLayer(layers[i].TILE_URL, {
				bounds:			L.latLngBounds(layers[i].SW_BOUND, layers[i].NE_BOUND),
				minZoom: 		layers[i].MIN_ZOOM,
				maxNativeZoom: 	layers[i].MAX_NATV,
				maxZoom:		MAP_OPTIONS.maxZoom,
			})
			.addTo(this.map);
		}

		// OVERLAY LAYERS
		let overlays = {};
		for (let i = 0; i < OVERLAYS.length; i++) {
			let layerGroup = L.layerGroup([]);

			let flag = false;
			
			switch(OVERLAYS[i].TYPE) {
				case 'cluster':
					addClusterToMap(i, layerGroup);
					break;
				case 'polygon':
					addSimpleGeoJSONToMap(i, layerGroup);
					break;
				case 'sliced':
					addRoadsToMap(i, layerGroup);
					break;
				case 'paths':
					addStreetcarsToMap(i, layerGroup, this.map);
					break;
				case 'buildings':
					addBuildingsToMap(i, layerGroup, this.map);
					break;
				default:
					break;
			}
			
			if (flag === true) console.log('hihi');
			overlays[OVERLAYS[i].LABEL] = layerGroup;
		}

		// CONTROLS
		let control = L.control.layers(null, overlays, {collapsed: false, autoZIndex: false});
		control.addTo(this.map);
		
		let htmlObject = control.getContainer();
		let parent = document.getElementById('layersControls');

		parent.appendChild(htmlObject);
		
		L.control.scale().addTo(this.map);

		// DYNAMICALLY LOAD LAYERS
		let inputContainer = document.getElementsByClassName("leaflet-control-layers-overlays");

		let inputs = inputContainer[0].childNodes;
		parent.firstChild.remove();
		let len = inputs.length;

		for(let i = 0; i < len; i++) {
			let container = inputs[i].firstChild;
			let input = container.firstChild;
				input.id = "input-layer" + i;
			let obj = OVERLAYS[i];
			let layer = document.createElement("div");
				layer.className = "layerController";
				layer.id = "layer" + i;
			let desc = document.createElement("p");
				desc.innerHTML = obj.DESC;
				desc.className = "layerDesc";
			let img = document.createElement("i");
				img.className = obj.ICON;
			let label = document.createElement("label");

			container.appendChild(img);
			container.appendChild(desc);
			label.appendChild(container);
			layer.appendChild(label);

			parent.appendChild(layer);
			
			this.props.addLayer({ id: layer.id, content: OVERLAYS[i].LABEL });
			layer.onclick = this.props.toggleLayer({ id: layer.id });
		}
	}
	
	componentDidUpdate() {
		//console.log(this.props)
	}

	render() {
		return <Wrapper id="map" ref={this.mapRef} />
	}
}

const mapStateToProps = state => {
	return { state };
}

export default connect(mapStateToProps, {addLayer, toggleLayer})(Map);