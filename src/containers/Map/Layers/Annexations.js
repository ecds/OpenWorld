import React from 'react';
import MapContext from '../MapContext';
import L from 'leaflet';
import Toast from 'react-bootstrap/Toast'
import { Boundaries, AnnexLayers, AnnexDetails } from '../../../constants';
import { Container } from '../../Components/GenericLayer';

export default class Annexations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYear: '1837',
      maxYear: '2021',
      minYear: '1837',
      boundaries: [],
      annexations: [],
      currentBoundary: null,
      showToast: false,
      mapCenter: L.latLng(33.75499844096392, -84.38624382019044),
      bounds: new L.latLngBounds(),
      activeFeature: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.toggleToast = this.toggleToast.bind(this);
    this.activateFeature = this.activateFeature.bind(this);
    this.deactivateFeature = this.deactivateFeature.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        minYear: Math.min.apply(null, AnnexLayers().map((layer) => parseInt(layer.year))) - 1,
        maxYear: Math.max.apply(null, AnnexLayers().map((layer) => parseInt(layer.year))) + 1
      }
    );

    const boundaries = [];
    const annexations = [];
    Boundaries().forEach((layer) => {

      fetch(layer.url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let leafletLayer = new L.GeoJSON(data, {
            ...layer.options,
            onEachFeature: this.onEachFeature,
            pane: 'boundary'
          });

          boundaries.push(
            {
              ...layer,
              layerObject: leafletLayer
            }
          );

          this.state.bounds.extend(leafletLayer.getBounds());

          this.setState({boundaries: boundaries.sort((a,b) => parseInt(a.year) - parseInt(b.year))})
        });
    });

    AnnexLayers().forEach((layer) => {

      fetch(layer.url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let leafletLayer = new L.GeoJSON(data, {
            ...layer.options,
            onEachFeature: this.onEachFeature,
            pane: 'annexation'
          });

          leafletLayer.on('popupopen', this.activateFeature);
          leafletLayer.on('popupclose', this.deactivateFeature);

          annexations.push(
            {
              ...layer,
              layerObject: leafletLayer
            }
          );

          this.setState({annexations: annexations.sort((a,b) => parseInt(a.year) - parseInt(b.year))})
        });
    });
  }

  activateFeature(event) {
    if (this.state.activeFeature) {
      this.state.activeFeature.closePopup();
    }
    event.layer.setStyle({fillOpacity: 0.7, fillColor: '#0D47A1'});
    this.setState({activeFeature: event.layer});
  }

  deactivateFeature(event) {
    if (this.state.currentAnnexation && !this.state.currentAnnexation.layerObject.getLayers().includes(event.layer)) {
      event.layer.setStyle({fillOpacity: 0, fillColor: '#E65100'});
      this.setState({activeFeature: null});
    }
  }

  handleChange(event, map) {
    const boundaryPane = map.createPane('boundary');
    const annexPane = map.createPane('annexation')
    boundaryPane.style.zIndex = 450;
    annexPane.style.zIndex = 475;
    const eventYear = parseInt(event.target.value);
    const newYear = (eventYear >= this.state.currentYear) ? eventYear : Math.max(...this.state.annexations.filter(l => l.year <= eventYear).map(l => parseInt(l.year)));
    this.setState(
      {
        currentYear: event.target.value
      }
    );

    map.fitBounds(map.getBounds().extend(this.state.bounds, { animate: true }));

    this.state.boundaries.forEach((layer, index) => {
      const annexation = this.state.annexations[index];
      if (parseInt(layer.year) === newYear && !map.hasLayer(layer.layerObject)) {
        layer.layerObject.addTo(map);
        annexation.layerObject.addTo(map);
        if (this.state.currentBoundary) {
          this.state.currentBoundary.layerObject.removeFrom(map);
        }
        if (this.state.currentAnnexation) {
          // this.state.currentAnnexation.layerObject.removeFrom(map);
          this.state.currentAnnexation.layerObject.setStyle({fillOpacity: 0, color: 'transparent'})
        }
        annexation.layerObject.setStyle({fillOpacity: 0.7});
        this.setState(
          {
            currentBoundary: layer,
            currentAnnexation: annexation,
            showToast: true
          }
        );
        // layer.layerObject.getLayers().forEach(layer => layer.openPopup(annexation.layerObject.getBounds().getCenter()));
      } else if (newYear <= this.state.minYear && this.state.currentBoundary) {
        this.state.currentBoundary.layerObject.removeFrom(map);
        this.state.currentAnnexation.layerObject.removeFrom(map);
        this.setState(
          {
            currentBoundary: null,
            currentAnnexation: null,
            showToast: false
          }
        );
      }
      if (layer.year > newYear && map.hasLayer(annexation.layerObject)) {
        annexation.layerObject.removeFrom(map);
      }
      if (newYear >= this.state.maxYear) {
        // layer.layerObject.getLayers().forEach(layer => layer.closePopup());
        this.state.currentAnnexation.layerObject.removeFrom(map);
        this.setState(
          {
            currentAnnexation: null,
            showToast: false
          }
        );
      }
    });

  }

  onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.YEAR}</h3><p>${AnnexDetails[feature.properties.YEAR].areas}</p>`);
  }

  toggleToast() {
    this.setState({showToast: !this.state.showToast});
  }


  render() {
    return (
      <MapContext.Consumer>
          {({map}) => {
            return  (
              <Container>
                <style type="text/css">{`.annexation-range-input { width: 100%; }`}</style>
                <label htmlFor="annexations-by-year">City Boundaries in <em>{this.state.currentYear}</em></label>
                <input id="annexations-by-year" className="form-control-range annexation-range-input" type="range" min={this.state.minYear} max={this.state.maxYear} onChange={(e) => this.handleChange(e, map)} />
                {this.renderLayerInfo()}
              </Container>
              )
          }}
      </MapContext.Consumer>
    )
  }

  renderLayerInfo() {
    if (this.state.currentBoundary) {
      return (
        <div className="ow-toast-container" style={{bottom: "2rem", position: "fixed", left: "2rem"}}>
              <Toast onClose={this.toggleToast} show={this.state.showToast} animation={true} delay={3000}>
              <Toast.Header>
                <strong style={{color: this.state.currentBoundary.activeColor}} className="mr-auto">Area annexed in {this.state.currentBoundary.year}</strong>
                <small></small>
              </Toast.Header>
              <Toast.Body>{AnnexDetails[this.state.currentBoundary.year].areas}</Toast.Body>
            </Toast>
        </div>
      )
    }
  }
}