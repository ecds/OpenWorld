import React from 'react';
import L from 'leaflet';
import {} from 'leaflet.markercluster';
import {} from 'leaflet.vectorgrid';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import styled from 'styled-components';

import { addBuildingsToMap } from './Layers/Buildings.js';
import { addClusterToMap } from './Layers/MarkerCluster.js';
import { addSimpleGeoJSONToMap } from './Layers/SimpleGeoJSON.js';
import { addStreetcarsToMap } from './Layers/Streetcars.js';
import { addRoadsToMap } from './Layers/Roads.js';

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
`;

export default class Map extends React.Component {
    componentDidMount() {
		// MAP CONSTRUCTION
		this.map = L.map('map', MAP_OPTIONS);

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
		var overlays = {};
		for (let i = 0; i < OVERLAYS.length; i++) {
			var layerGroup = L.layerGroup([]);

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
					addBuildingsToMap(layerGroup, this.map);
					break;
				default:
					break;
			}

			overlays[OVERLAYS[i].LABEL] = layerGroup;
		}

		// CONTROLS
		var control = L.control.layers(null, overlays, {collapsed: false, autoZIndex: false});
		control.addTo(this.map);
		
		var htmlObject = control.getContainer();
		var parent = document.getElementById('layersControls');

		parent.appendChild(htmlObject);
		
		L.control.scale().addTo(this.map);

		// DYNAMICALLY LOAD LAYERS
		var inputContainer = document.getElementsByClassName("leaflet-control-layers-overlays");

		var inputs = inputContainer[0].childNodes;
		parent.firstChild.remove();
		var len = inputs.length;

		for(var i = 0; i < len; i++) {
			var container = inputs[i].firstChild;
			var obj = OVERLAYS[i];
			var layer = document.createElement("div");
				layer.className = "layerController";
				layer.id = "layer" + i;
			var desc = document.createElement("p");
				desc.innerHTML = obj.DESC;
				desc.className = "layerDesc";
			var img = document.createElement("i");
				img.className = obj.ICON;
			var label = document.createElement("label");

			container.appendChild(img);
			container.appendChild(desc);
			label.appendChild(container);
			layer.appendChild(label);

			parent.appendChild(layer);
		}
    }

	render() {
		return <Wrapper id="map" />
	}
}