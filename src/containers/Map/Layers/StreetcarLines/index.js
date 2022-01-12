import React from 'react';
import MapContext from '../../MapContext';
import L from 'leaflet';
import { StreetcarLayers } from './data';
import { Container, Label } from '../../../Components/GenericLayer';
import LayerDetails from '../../../Components/LayerDetails';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaCaretLeft, FaCaretSquareLeft } from 'react-icons/fa';
import { Col, Row, Button } from "react-bootstrap";
import { highlightGeoJSON, dehighlightGeoJSON, selectGeoJSON } from '../../Utils/Selection';

export default class StreetcarLines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYear: '1840',
      layers: [],
      activeLayers: [],
      bounds: new L.latLngBounds(),
      dataLoaded: false,
      show: true,
      map: null,
      year: parseInt(this.props.match.params.year),
      setYear: null
    }

    this.handleHide = this.handleHide.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  async componentDidMount() {
    const layers = [];
    const lines = StreetcarLayers(parseInt(this.props.match.params.year)).layers
    await lines.forEach(async (layer) => {

      const response = await fetch(layer.url);
      const data = await response.json();

        let leafletLayer = new L.GeoJSON(data, {
          ...layer.options,
          onEachFeature: this.onEachFeature,
          label: layer.label
        });

        // leafletLayer.on('popupopen', this.show);
        // leafletLayer.on('popupclose', this.hide);
        layers.push(
          {
            ...layer,
            layerObject: leafletLayer
          }
        );

        this.setState(
          {
            layers: layers.sort((a,b) => parseInt(a.order) - parseInt(b.order)),
            dataLoaded: layers.length == lines.length,
            bounds: this.state.bounds.extend(leafletLayer.getBounds())
          }
        );
      });
  }

  componentWillUnmount() {
    this.state.layers.forEach((layer, index) => {
      layer.layerObject.removeFrom(this.state.map);
    });
    this.state.setYear(0);
  };

  handleHide() {
    this.setState({ show: false });
  }

  async initialize(map, setYear) {
    setYear(this.state.year)
    this.setState({ map, setYear });
    this.state.layers.forEach(layer => layer.layerObject.addTo(map));
    map.fitBounds(this.state.bounds, { animate: true, padding: [-400, 0] });
  }

  onEachFeature(feature, layer) {
    let curr = null;
    layer.bindPopup(`<h1 style="color: ${layer.options.color};">${layer.options.label}</h1>`)
    layer.on({
        'mouseover': function (e) {
            highlightGeoJSON(e.target);
            // layer.getPopup().setLatLng(e.latlng).open;
            layer.openPopup(e.latlng);
            layer.bringToFront();
        },
        'mouseout': function (e) {
            dehighlightGeoJSON(layer, e.target, curr);
            layer.closePopup();
            layer.bringToBack();
        },
        'click': function(e) {
            curr = selectGeoJSON(layer, e.target, null,  curr);
        }
    })
  }

  hide(event) {
    event.layer.setStyle({fillOpacity: 0});
  }

  show(event) {
    event.layer.setStyle({
      fillOpacity: 0.7
    });
  }

  hightLight(layer) {
    try {
      highlightGeoJSON(layer);
      layer.eachLayer(layer => layer.openPopup());
    } catch {
      // meh
    }
  }

  deHightlight(layer) {
    dehighlightGeoJSON(null, layer);
  }

  render() {
    return (
      <MapContext.Consumer>
      {({map, setYear}) => {
        if (map && this.state.dataLoaded) {

          return  (
            <Container>
            <Offcanvas show={this.state.show} backdrop={false} scroll={true} placement="end" onHide={this.handleHide} onShow={() => this.initialize(map, setYear)}>
              <Offcanvas.Header closeButton><h5>Streetcar Lines in {this.state.year}</h5></Offcanvas.Header>
              <Offcanvas.Body>
                <ul className="list-unstyled">
                {this.state.layers.map((layer, index) => {
                  return(
                    <li key={index} tabIndex="0" className="fs-3" style={{color: layer.activeColor}} onMouseEnter={() => this.hightLight(layer.layerObject)} onMouseLeave={() => this.deHightlight(layer.layerObject)} onFocus={() => this.hightLight(layer)}>{layer.label}</li>
                    )
                  })}
                  </ul>
              </Offcanvas.Body>
            </Offcanvas>
            {this.renderToggleButton()}
            </Container>
          )
        } else {
          return(<span>Loading</span>)
        }
      }}
      </MapContext.Consumer>
    )
    }

  renderDetails() {
    if (this.state.currentDetails) {
      return(
        <LayerDetails layer={this.state.currentDetails} />
      )
    } else {
      return(
        <article><p>Click a building to for details.</p></article>
      )
    }
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button className="end-0 position-absolute top-50 mx-3" onClick={() => this.setState({ show: true })}><FaCaretLeft /> Streetcar Details</Button>
      )
    } else {
      return(<></>)
    }
  }
}
