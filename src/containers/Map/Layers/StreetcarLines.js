import React from 'react';
import MapContext from '../MapContext';
import L from 'leaflet';
import { StreetcarLayers } from '../../../constants';
import { layer } from '@fortawesome/fontawesome-svg-core';
import Toast from 'react-bootstrap/Toast'

export default class StreetcarLines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYear: '1840',
      layers: [],
      activeLayers: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);


  }

  componentDidMount() {
    const layers = []
    StreetcarLayers.forEach((layer) => {

      fetch(layer.url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let leafletLayer = new L.GeoJSON(data, {
            ...layer.options,
            onEachFeature: this.onEachFeature,
            pane: layer.id
          });

          // leafletLayer.on('popupopen', this.show);
          // leafletLayer.on('popupclose', this.hide);

          layers.push(
            {
              ...layer,
              layerObject: leafletLayer
            }
          );
          this.setState({layers: layers.sort((a,b) => parseInt(a.year) - parseInt(b.year))})
        });
    });


  }

  handleChange(event, map) {
    const newYear = parseInt(event.target.value);
    this.setState(
      {
        currentYear: event.target.value
      }
      );

      this.state.layers.forEach(layer => {
      if (parseInt(layer.year) <= newYear && !map.hasLayer(layer.layerObject)) {
        const pane = map.createPane(layer.id);
        pane.style.zIndex = layer.zIndex;
        this.state.activeLayers.push(layer)
        this.setState({activeLayers: [layer]})
        layer.layerObject.addTo(map);
        const bounds = layer.layerObject.getBounds()
        layer.layerObject.getLayers().forEach(layer => layer.openPopup(layer.getBounds().getCenter()))
        map.fitBounds(map.getBounds().extend(bounds));
      } else if (parseInt(layer.year) >= newYear && map.hasLayer(layer.layerObject)) {
        layer.layerObject.removeFrom(map);
        const indexOfLayerRemoved = this.state.layers.indexOf(layer)
        if (indexOfLayerRemoved == 0) {
          this.setState({activeLayers: []});
        } else {
          this.setState({activeLayers: [this.state.layers[indexOfLayerRemoved - 1]]})
        }
      }
    });
  }

  onEachFeature(feature, layer) {
    const popupContent = feature.properties[Object.keys(feature.properties).find(key => key.toLowerCase() === 'year')];
    layer.bindPopup(`<h1>${popupContent}</h1>`);
  }

  hide(event) {
    event.layer.setStyle({fillOpacity: 0});
  }

  show(event) {
    event.layer.setStyle({
      fillOpacity: 0.7
    });
  }


    render () {
      return (
          <MapContext.Consumer>
              {({map}) => {
                return  (
                  <div>
                    <div>Year: {this.state.currentYear}</div>
                    <input className="form-control-range annexation-range-input" type="range" min="1840" max="1945" onChange={(e) => this.handleChange(e, map)} />
                    <div style={{bottom: "2rem", position: "fixed", left: "2rem", minWidth: "25vw"}}>
                    {this.state.activeLayers.map((layer, index) => {
                      switch(layer.type) {
                        case 'polygon':
                          return <div key={index}>
                          <Toast onClose={() => layer.showToast = false} show={layer.showToast} animation={true} delay={3000}>
                          <Toast.Header>
                            <strong style={{color: layer.activeColor}} className="mr-auto">Area annexed in {layer.year}</strong>
                            <small></small>
                          </Toast.Header>
                          <Toast.Body>{layer.desc}</Toast.Body>
                        </Toast></div>;
                        default:
                          return null;
                      }
                    })}
                    </div>
                  </div>
                  )
              }}
          </MapContext.Consumer>
      )
  }
}
