import React from 'react';
import L from 'leaflet';
import {} from 'leaflet.markercluster';
import {} from 'leaflet.vectorgrid';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import styled from 'styled-components';
import { addBuildingsToMap } from './Layers/Buildings.js';

import { MAP_CENTER, 
		 DEFAULT_ZOOM, 
		 MAP_MAX_ZOOM, 
		 MAP_SW_MAX, 
		 MAP_NE_MAX, 
		 MAP_TILE_LAYERS as layers, 
		 THIRD_COLOR, 
		 MAP_MIN_ZOOM,
		 DIV_ICONS,
		 OVERLAYS } from '../../constants/';

const streetcars = require('../../data/Streetcars.json');
const buildings = require('../../data/Buildings.json');

const Wrapper = styled.div `
	width: auto;
	height: calc(100vh - 56px);
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 0;
`;

// ICONS
let divIcons = [];
for (let i = 0; i < DIV_ICONS.length; i++) {
	divIcons[i] = L.divIcon({
		className: DIV_ICONS[i].CLASS_NAME,
		html: 	   DIV_ICONS[i].HTML,
		iconSize:  DIV_ICONS[i].ICON_SIZE,
	})
}

export default class Map extends React.Component {
	constructor(props) {
		super(props);

		this.populatePopup = this.populatePopup.bind(this);
		this.markerCluster = this.markerCluster.bind(this);
		this.polygon 	   = this.polygon.bind(this);
		this.slicedGrid    = this.slicedGrid.bind(this);
		this.paths	       = this.paths.bind(this);
	}

	populatePopup = (data, ind, i) => {
		let popupContent = '';
		let popupSrc = OVERLAYS[ind].OPTIONS.POPUP_CONTENT;

		for (let j = 0; j < popupSrc.length; j++) {
			if (popupSrc[j].CONDITIONAL === true) {
				if (data.features[i].properties[popupSrc[j].PROPERTY] != "") { // intentionally left as non strict
					popupContent += popupSrc[j].CONTENT
								  + data.features[i].properties[popupSrc[j].PROPERTY]
								  + popupSrc[j].SUFFIX;
				} 
			} else {
				popupContent += popupSrc[j].CONTENT;
			}
		}

		return popupContent;
	}

	markerCluster = (ind, layer, options) => {
		var cluster = L.markerClusterGroup();
		let index = options.DIV_ICON;

		fetch(OVERLAYS[ind].URL)
		.then((response) => { return response.json() })
		.then((data) => {
			for (var i = 0; i < data.features.length; i++) {
				let popupContent = this.populatePopup(data, ind, i);

				var m = L.marker(new L.latLng(data.features[i].geometry.coordinates[1], 
											  data.features[i].geometry.coordinates[0]),
											  {icon: divIcons[index]}) // WILL CAUSE PROBLEMS IF OVERLAYS NOT PROPERLY DEFINED
				.bindTooltip(popupContent, {offset: new L.Point(-15, 0), direction: 'left'});

				m.on('mouseover', function() { this.openTooltip() }); // DO NOT USE ARROW FUNCTIONS HERE
				m.on('mouseout', function() { this.closeTooltip() });
				cluster.addLayer(m);
			}
			cluster.addTo(layer);
		});
	}

	polygon = (ind, layer, options) => {
		fetch(OVERLAYS[ind].URL)
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			new L.GeoJSON(myJson, {
				color: options.COLOR,
				opactiy: 1,
				weight: options.WEIGHT,
				fillOpacity: options.FILL_OPACITY, 
				fillColor: options.FILL_COLOR,
				interactive: false,
			}).addTo(layer);
		});
	}

	slicedGrid = (ind, layer, options) => {
		fetch(OVERLAYS[ind].URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
			new L.vectorGrid.slicer(myJson, {
				rendererFactory: L.svg.tile,
				vectorTileLayerStyles: {
					sliced: {
						color: options.COLOR,
						opacity: options.OPACITY,
						weight: options.WEIGHT,
						fill: options.FILL,
					}
				},
				interactive: false,
				maxZoom: MAP_MAX_ZOOM,
				getFeatureId: function(f) {
					return f.properties.OBJECTID;
				}
			})
			.on('mouseover', function(e) { 
				console.log(e);
				//document.getElementById('object-info').innerHTML = e.layer.properties.ROAD_NAME;
			//	vectorGrid.setFeatureStyle(e.layer.properties.OBJECTID, { opacity: 1, color: 'black' });
			})
			//.on('mouseout', function(e) { 
			//	vectorGrid.setFeatureStyle(e.layer.properties.OBJECTID, { opacity: 0 });
			//})			
			.addTo(layer);/*
			var geojsonLayer = new L.GeoJSON(myJson, {
				color: 'black',
				opacity: 0,
				weight: 3,
				fillOpacity: 0,
				onEachFeature: function(feature, layer) {
					layer.on({ mouseover: function() {
						document.getElementById('object-info').innerHTML = feature.properties.ROAD_NAME;
						console.log(layer.options)
						layer.options.opacity = 1;
						console.log(layer.options)
					}});

					layer.on({ mouseout: function() {
						layer.options.opacity = 0;
					}})
				}
			})
			.addTo(layer);*/
		});
	}

	paths = (ind, layer, map, options) => {

		function highlight(layer) {
			layer.setStyle({
				opacity: 1
			});
		}

		function dehighlight(layer) {
			if (curr === null || curr._leaflet_id !== layer._leaflet_id)
				data.resetStyle(layer);
		}

		function select(layer) {
			if (curr !== null) {
				var prev = curr;
				if (curr._leaflet_id === layer._leaflet_id) {
					data.resetStyle(layer);
					curr = null;
					return
				}
			}

			map.fitBounds(layer.getBounds());
			layer.setStyle({
				weight: 5,
			});

			curr = layer;
			if (prev) {
				dehighlight(prev);
			}
		}

		var curr = null;

		var data = L.geoJSON(streetcars, {
			style: {
				color: options.COLOR,
				fill: options.FILL,
				opacity: options.OPACITY,
				weight: options.WEIGHT,
			},
			onEachFeature: function(feature, layer) {
				layer.on({
					'mouseover': function (e) {
					  	highlight(e.target);
					},
					'mouseout': function (e) {
					  	dehighlight(e.target);
					},
					'click': function(e) {
						select(e.target);
					}
				})
			}
		}).addTo(layer);
	}

    componentDidMount() {
		// MAP CONSTRUCTION
		this.map = L.map('map', {
			center: 	 MAP_CENTER,
			minZoom: 	 MAP_MIN_ZOOM,
            zoom: 		 DEFAULT_ZOOM,
			maxZoom:     MAP_MAX_ZOOM,
			zoomControl: true,
			maxBounds:   L.latLngBounds(MAP_SW_MAX, MAP_NE_MAX),
        });

		// BASE LAYER CONSTRUCTION
		for (let i = 0; i < layers.length; i++) {
			L.tileLayer(layers[i].TILE_URL, {
				bounds:			L.latLngBounds(layers[i].SW_BOUND, layers[i].NE_BOUND),
				minZoom: 		layers[i].MIN_ZOOM,
				maxNativeZoom: 	layers[i].MAX_NATV,
				maxZoom:		MAP_MAX_ZOOM,
			})
			.addTo(this.map);
		}

		// OVERLAY LAYERS
		let layerGroups = [];
		let overlays = {};
		for (let i = 0; i < OVERLAYS.length; i++) {
			layerGroups[i] = L.layerGroup([]);

			switch(OVERLAYS[i].TYPE) {
				case 'cluster':
					this.markerCluster(i, layerGroups[i], OVERLAYS[i].OPTIONS);
					break;
				case 'polygon':
					this.polygon(i, layerGroups[i], OVERLAYS[i].OPTIONS);
					break;
				case 'sliced':
					this.slicedGrid(i, layerGroups[i], OVERLAYS[i].OPTIONS);
					break;
				case 'paths':
					this.paths(i, layerGroups[i], this.map, OVERLAYS[i].OPTIONS);
					break;
				case 'buildings':
					//this.buildings(i, layerGroups[i], this.map, OVERLAYS[i].OPTIONS);
					addBuildingsToMap(layerGroups[i], this.map);
					break;
				default:
					break;
			}

			overlays[OVERLAYS[i].LABEL] = layerGroups[i];
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