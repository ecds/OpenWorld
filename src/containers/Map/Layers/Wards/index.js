import React from 'react';
import MapContext from '../../MapContext';
import { Col, Row, Button, ThemeProvider } from "react-bootstrap";
import L from 'leaflet';
import { Container, Label } from '../../../Components/GenericLayer';
import { Form } from 'react-bootstrap';
import { Layers, Colors, Years, DETAILS } from './data';
import TimeSlider from '../../../Components/TimeSlider';
import LayerDetails from '../../../Components/LayerDetails';
import Offcanvas from 'react-bootstrap/Offcanvas'

export default class Wards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYear: '1837',
      bounds: new L.latLngBounds(),
      maxYear: '2021',
      minYear: '1837',
      wards: [],
      labels: [],
      current: null,
      showToast: false,
      activeFeature: null,
      show: true,
      years: [1854, 1871, 1874, 1883],
      map: null,
      label: 'City wards in the year'
    }

    this.initialize = this.initialize.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.toggleToast = this.toggleToast.bind(this);
    this.activateFeature = this.activateFeature.bind(this);
    this.deactivateFeature = this.deactivateFeature.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        minYear: Math.min(...Years) - 1,
        maxYear: Math.max(...Years) + 1
      }
    );

    const wards = [];

    Layers().forEach((layer) => {

      fetch(layer.url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let leafletLayer = new L.GeoJSON(data, {
            ...layer.options,
            onEachFeature: this.onEachFeature
          });

          leafletLayer.on('popupopen', this.activateFeature);
          leafletLayer.on('popupclose', this.deactivateFeature);

          wards.push(
            {
              ...layer,
              layerObject: leafletLayer
            }
          );

          this.state.bounds.extend(leafletLayer.getBounds());
        });
      });

      this.setState({wards: wards.sort((a,b) => parseInt(a.year) - parseInt(b.year))});
  }

  componentWillUnmount() {
    this.state.labels.forEach(label => label.removeFrom(this.state.map));
    this.state.wards.forEach((layer) => {
      layer.layerObject.removeFrom(this.state.map);
    });
  };

  initialize(setYear) {
    setYear(this.state.minYear);
  }

  activateFeature(event) {
    if (this.state.activeFeature) {
      this.state.activeFeature.closePopup();
    }
    event.layer.setStyle({...event.layer.options, fillOpacity: 1});
    this.setState({activeFeature: event.layer});
  }

  deactivateFeature(event) {
    event.layer.setStyle({...event.layer.options, fillOpacity: 0.7});
    if (this.state.current && !this.state.current.layerObject.getLayers().includes(event.layer)) {
      this.setState({activeFeature: null});
    }
  }

  handleChange(event, map) {
    const eventYear = parseInt(event.target.value);
    const newYear = (eventYear >= this.state.currentYear) ? eventYear : Math.max(...this.state.wards.filter(l => l.year <= eventYear).map(l => parseInt(l.year)));
    this.setState(
      {
        currentYear: event.target.value,
        map
      }
    );

    map.fitBounds(this.state.bounds, { animate: true, padding: [-400, 0] });

    this.state.wards.forEach((ward, index) => {
      if (parseInt(ward.year) === newYear && !map.hasLayer(ward.layerObject)) {
        if (this.state.current) {
          this.state.current.layerObject.removeFrom(map);
          this.state.labels.forEach(label => label.removeFrom(map));
        }
        ward.layerObject.addTo(map);
        const labels = [];
        ward.layerObject.getLayers().forEach((layer) => {
          const icon = L.divIcon({html: `<h1>${layer.feature.properties.Ward}</h2>`});
          const label = L.marker(layer.getCenter(), { icon });
          label.addTo(map);
          labels.push(label);
        });
        this.setState(
          {
            current: ward,
            showToast: true,
            labels: labels,
            currentDetails: DETAILS[ward.year]
          }
        );
      } else if (newYear <= this.state.minYear && this.state.current) {
        this.setState(
          {
            current: null,
            showToast: false,
            labels: []
          }
        );
      }
      if (ward.year > newYear && map.hasLayer(ward.layerObject)) {
        this.state.labels.forEach(label => label.removeFrom(map));
        ward.layerObject.removeFrom(map);
      }
    });
  }

  onEachFeature(feature, layer) {
    layer.setStyle({...layer.options, color: Colors[`${feature.properties.Ward}`]});
    layer.bindPopup(`<h3>Ward ${feature.properties.Ward}</h3>`);
  }

  handleHide() {
    this.setState({ show: false });
  }

  toggleToast() {
    this.setState({showToast: !this.state.showToast});
  }


  // render() {
  //   return (
  //     <MapContext.Consumer>
  //         {({map}) => {
  //           return  (
  //             <Container>
  //               <Label htmlFor="wards-by-year">City Wards in <em>{this.state.currentYear}</em>
  //                <Form.Range id="wards-by-year" className="form-control-range ward-range-input" type="range" min={this.state.minYear} max={this.state.maxYear} onChange={(e) => this.handleChange(e, map)} />
  //               </Label>
  //             </Container>
  //             )
  //         }}
  //     </MapContext.Consumer>
  //   )
  // }

  render() {
    return (
      <MapContext.Consumer>
        {({map, setYear}) => {
          return  (
            <Container>
              <Offcanvas show={this.state.show} backdrop={false} scroll={true} placement="end" onHide={this.handleHide} onShow={() => this.initialize(setYear)}>
                <Offcanvas.Header closeButton><h5>City Wards</h5></Offcanvas.Header>
                <Offcanvas.Body>
                  <TimeSlider {...this.state} range={Years} update={(e) => this.handleChange(e, map)} current={this.state.currentYear} />
                  {/* <LayerDetails layer={this.state.currentDetails} /> */}
                  {this.renderDetails()}
                  </Offcanvas.Body>
              </Offcanvas>
              {this.renderToggleButton()}
            </Container>
          )
        }}
      </MapContext.Consumer>
    )
  }

  renderDetails() {
    if (this.state.currentDetails) {
      return(
        <article>
          <h5>{this.state.currentDetails.title}</h5>
          <p className="lead">{this.state.currentDetails.intro}</p>
          <dl className="row">
            { this.state.currentDetails.wards.map((ward, index) => {
              return(
                <>
                <dt className="col-sm-3" key={index}>{ward.title}</dt>
                <dd className="col-sm-9"><p>{ward.description}</p></dd>
                </>
              )
            })}
          </dl>
        </article>
      )
    } else {
      return(<></>)
    }
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button className="end-0 position-absolute top-50" onClick={() => this.setState({ show: true })}>Layer Data</Button>
      )
    } else {
      return(<span></span>)
    }
  }
}