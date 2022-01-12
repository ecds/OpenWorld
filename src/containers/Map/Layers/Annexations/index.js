import React from 'react';
import MapContext from '../../MapContext';
import L from 'leaflet';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import { Boundaries, AnnexLayers, AnnexDetails, YEARS, Intro } from './data';
import { Container, Label } from '../../../Components/GenericLayer';
import TimeSlider from '../../../Components/TimeSlider';
import LayerDetails from '../../../Components/LayerDetails';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaCaretLeft, FaCaretSquareLeft } from 'react-icons/fa';

export default class Annexations extends React.Component {
  constructor(props, state) {
    super(props);

    this.state = {
      currentYear: YEARS[0] - 1,
      maxYear: '2021',
      minYear: YEARS[0],
      firstYear: null,
      lastYear: null,
      boundaries: [],
      annexations: [],
      currentBoundary: null,
      mapCenter: L.latLng(33.75499844096392, -84.38624382019044),
      bounds: new L.latLngBounds(),
      activeFeature: null,
      currentDetails: Intro,
      mapObject: null,
      show: true,
      label: 'City Boundaries in',
      setYear: null
    }

    this.initialize = this.initialize.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.activateFeature = this.activateFeature.bind(this);
    this.deactivateFeature = this.deactivateFeature.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        firstYear: Math.min.apply(null, AnnexLayers().map((layer) => parseInt(layer.year))),
        minYear: Math.min.apply(null, AnnexLayers().map((layer) => parseInt(layer.year))) - 1,
        lastYear: Math.max.apply(null, AnnexLayers().map((layer) => parseInt(layer.year))),
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

  componentWillUnmount() {
    this.state.boundaries.forEach((layer, index) => {
      layer.layerObject.removeFrom(this.state.mapObject);
      this.state.annexations[index].layerObject.removeFrom(this.state.mapObject);
    });
    this.state.setYear(0);
  };

  initialize(setYear) {
    setYear(this.state.minYear);
    this.setState({ setYear });
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

  handleHide() {
    this.setState({ show: false });
  }

  handleChange(event, map, setYear) {
    const boundaryPane = map.createPane('boundary');
    const annexPane = map.createPane('annexation')
    boundaryPane.style.zIndex = 450;
    annexPane.style.zIndex = 475;
    const eventYear = parseInt(event.target.value);
    const newYear = (eventYear >= this.state.currentYear) ? eventYear : Math.max(...this.state.annexations.filter(l => l.year <= eventYear).map(l => parseInt(l.year)));
    // setYear(newYear)
    this.setState(
      {
        currentYear: event.target.value,
        mapObject: map
      }
    );

    // map.fitBounds(map.getBounds().extend(this.state.bounds, { animate: false, paddingTopLeft: [0, '400px'] }));
    map.fitBounds(this.state.bounds, { animate: true, padding: [-400, 0] });

    this.state.boundaries.forEach((layer, index) => {
      const layerInfo = {
        title: `Area annexed in ${layer.year}`,
        body: AnnexDetails[layer.year].areas,
        type: 'annex'
      };

      const annexation = this.state.annexations[index];

      if (parseInt(layer.year) === newYear && !map.hasLayer(layer.layerObject)) {
        layer.layerObject.addTo(map);
        annexation.layerObject.addTo(map);
        // map.flyToBounds(map.getBounds().extend(layer.layerObject.getBounds(), { animate: true }));

        if (this.state.currentBoundary) {
          this.state.currentBoundary.layerObject.removeFrom(map);
        }

        if (this.state.currentAnnexation) {
          this.state.currentAnnexation.layerObject.setStyle({fillOpacity: 0, color: 'transparent'})
        }

        annexation.layerObject.setStyle({fillOpacity: 0.7});
        this.setState(
          {
            currentBoundary: layer,
            currentAnnexation: annexation,
            currentDetails: layerInfo
          }
        );
      } else if (newYear <= this.state.minYear && this.state.currentBoundary) {
        // this.props.updateLayerInfo({ type: 'annex' });
        this.state.currentBoundary.layerObject.removeFrom(map);
        this.state.currentAnnexation.layerObject.removeFrom(map);
        this.setState(
          {
            currentBoundary: null,
            currentAnnexation: null,
            currentDetails: null
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
            currentAnnexation: null
          }
        );
      }
    });

  }

  onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.YEAR}</h3><p>${AnnexDetails[feature.properties.YEAR].areas}</p>`);
  }

  render() {
    return (
      <MapContext.Consumer>
        {({ map, setYear }) => {
          if (map) {
            return  (
              <Container>
                <Offcanvas show={this.state.show} backdrop={false} scroll={true} placement="end" onHide={this.handleHide} onShow={() => this.initialize(setYear)}>
                  <Offcanvas.Header closeButton><h5>Annexations</h5></Offcanvas.Header>
                  <Offcanvas.Body>
                    <TimeSlider {...this.state} range={YEARS} update={(e) => this.handleChange(e, map)} current={this.state.currentYear} />
                    <LayerDetails layer={this.state.currentDetails} />
                    </Offcanvas.Body>
                </Offcanvas>
                {this.renderToggleButton()}
              </Container>
            )
          } else {
            return <></>
          }
        }}
      </MapContext.Consumer>
    )
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button className="end-0 position-absolute top-50 mx-3" onClick={() => this.setState({ show: true })}><FaCaretLeft /> Annexation Details</Button>
      )
    } else {
      return(<></>)
    }
  }
}