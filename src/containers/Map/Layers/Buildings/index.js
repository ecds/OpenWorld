import React from 'react';
import MapContext from '../../MapContext';
import L from 'leaflet';
import {} from 'leaflet.vectorgrid';
import store from '../../../../redux/store';
import { updateInfo, fetchResources } from '../../../../redux/actions';
import LayerDetails from '../../../Components/LayerDetails';
import { MAP_OPTIONS } from '../../../../constants';
import GenericLayer from '../../../Components/GenericLayer';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Col, Row, Button } from "react-bootstrap";
import { Container, Label } from '../../../Components/GenericLayer';
import { FaCaretLeft, FaCaretSquareLeft, FaCameraRetro } from 'react-icons/fa';
import { layers, fetchMetadata } from './data';
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
      selected: null,
      show: true,
      year: parseInt(this.props.match.params.year),
      currentDetails: null,
      markers: [],
      setYear: null
    }

    this.clearHighlight = this.clearHighlight.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.setLayer = this.setLayer.bind(this);
  }

  componentDidMount() {
    this.setLayer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.year != prevProps.match.params.year) {
      this.state.layer.leafletObject.removeFrom(this.state.map);
      this.setState(
        {
          year: parseInt(this.props.match.params.year)
        },
        this.setLayer
      );

      if (this.state.setYear) {
        this.state.setYear(this.props.match.params.year);
      }
    }
  }

  componentWillUnmount() {
    this.state.layer.leafletObject.removeFrom(this.state.map);
    this.state.markers.forEach(marker => marker.removeFrom(this.state.map));
    this.state.setYear(0);
  };

  setLayer() {
    this.setState({ dataLoading: true });
    const layer = layers[this.state.year];
    const url = `https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/${layer.workspace}:${layer.layer}@EPSG:900913@pbf/{z}/{x}/{-y}.pbf`;
    // const url = 'https://api.mapbox.com/v4/jayvarner.d2xvvkl9/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiamF5dmFybmVyIiwiYSI6ImVkYjliN2Y3ZDZlYzEyNzg5NDhiMGU4MWRiZTY3Mzk3In0.U4Sc4HVk2F4MkKyd7ybgXw'
    layer.leafletObject = new L.vectorGrid.protobuf(url, {
      rendererFactory: L.svg.tile,
      vectorTileLayerStyles: {
        buildings_1928: properties => {
          return this.style(properties);
        },
      },
      interactive: true,
      maxZoom: MAP_OPTIONS.maxZoom,
      getFeatureId: (f) => {
        if (layer.details && Object.keys(layer.details).includes(f.properties.BLDG_ID)) {
          // const camera ='<span class="fs-3"><svg viewBox="0 0 512 512"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path></svg></span>';
          // const icon = L.divIcon({html: camera});
          const icon = L.divIcon({
            html: `<div class="jesse-dot"><div class="dot" style="background-color: ${this.getColor(f.properties.use)}"></div><div class="pulsate-ring"  style="background-color: ${this.getColor(f.properties.use)}"></div></div>`
          });
          const marker = L.marker(layer.details[f.properties.BLDG_ID].latLng, { icon });
          marker.addTo(this.state.map);
          marker.on('click', (e) => {
            e.layer = f;
            this.handleClick(e);
          });
          this.state.markers.push(marker);
        }
        return f.properties.BLDG_ID;
      }
    })
    .on('click', (e) => this.handleClick(e));
    // This was just an idea to show building data on as a person moves there mouse around the map
    // .on('mouseover', (e) => this.onMouseover(e))
    // .on('mouseout', (e) => this.onMouseout(e))

    this.setState(
      {
        dataLoaded: true,
        dataLoading: false,
        active: true,
        layer: layer
      },
      this.addLayer
    );


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
      fillOpacity: 0.7,
      weight: 2,
      opacity: 0.5
    }
  }

  clearHighlight = () => {
    if (this.state.highlight) {
      this.state.layer.leafletObject.resetFeatureStyle(this.state.highlight);
    }
    this.setState({ highlight: null });
  }

  onMouseover = (e) => {
    var properties = e.layer.properties;

    this.clearHighlight();

    // This was just an idea to show building data on as a person moves there mouse around the map
    const popup = L.popup()
      .setContent(
        `<p>${properties.BLDG_ID}</p>`
      )
      .setLatLng(e.latlng)
      .openOn(this.state.map);

    if (properties.BLDG_ID !== this.state.selected)
      this.setState({ highlight: properties.BLDG_ID });

    this.state.layer.leafletObject.setFeatureStyle(properties.BLDG_ID, this.strongStyle(properties));
  }

  onMouseout = (e) => {
    if (this.state.highlight !== this.state.selected)
      this.clearHighlight();
  }

  async handleClick(e) {
    const properties = e.layer.properties;

    // let popupContent = '<table class="table"><tbody>';

    // for (const [key, value] of Object.entries(properties)) {
    //   popupContent += `<tr><th scope="row">${key}</th><td>${value}</td></tr>`
    // }

    // popupContent += '</tbody></table>'

    // const popup = L.popup()
    //   .setContent(
    //     popupContent
    //   )
    //   .setLatLng(e.latlng)
    //   .openOn(this.state.map);

    // popup.on('remove', () => {
    //   this.state.layer.resetFeatureStyle(this.state.selected);
    // });

    this.setState({ currentDetails: null });


    this.clearHighlight();
    this.state.layer.leafletObject.resetFeatureStyle(this.state.selected);

    let image = '';
    if (properties.name_28 == 'KIMBAL HOUSE') {
      image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kimball-house-1890.JPG/2560px-Kimball-house-1890.JPG'
    }

    if (this.state.selected !== properties.BLDG_ID) {
      let layerInfo = {}

      if (Object.keys(this.state.layer.details).includes(properties.BLDG_ID)) {
        layerInfo = await fetchMetadata(this.state.layer.details[properties.BLDG_ID].omekaIdentifier);
      } else {
        layerInfo = {
          title: properties.name_28 || 'undefined',
          body: '',
          type: 'building',
          image
        };
      }

      // store.dispatch(updateInfo({type: 'building', properties: properties}));
      // await store.dispatch(fetchResources(`/resources?id=${properties.BLDG_ID}`));
      this.setState({ currentDetails: layerInfo, selected: properties.BLDG_ID });
      this.state.layer.leafletObject.setFeatureStyle(properties.BLDG_ID, this.strongStyle(properties));
    } else {
      this.setState({ currentDetails: null, selected: null });
    }

    this.setState({ show: true });
  }

  initialize(map, setYear) {
    setYear(this.state.year);
    this.setState({ map, setYear }, this.addLayer);
  }

  addLayer() {
    if (this.state.map && !this.state.map.hasLayer(this.state.layer.leafletObject)) {
      this.state.map.addLayer(this.state.layer.leafletObject);
      this.state.map.fitBounds(this.state.layer.bounds, { animate: true, padding: [-400, 0] });
      this.state.markers.forEach((marker) => {
        marker.addTo(this.state.map)
      });
    }
  }

  handleHide() {
    this.setState({ show: false });
  }


  // render() {
  //   return (
  //     <MapContext.Consumer>
  //       {({map}) => {
  //         return <GenericLayer
  //           title={this.props.label}
  //           id={this.props.id}
  //           attr={this.props.attr}
  //           desc={this.props.desc}
  //           icon={this.props.icon}
  //           handleClick={() =>  this.handleClick(map)}
  //           active={this.state.active}
  //           loading={this.state.dataLoading}
  //         />
  //       }}
  //     </MapContext.Consumer>
  //   )
  // }

  render() {
    return (
      <MapContext.Consumer>
      {({ map, setYear }) => {
        if (map && this.state.layer && this.state.layer.leafletObject) {

          return  (
            <Container>
            <Offcanvas show={this.state.show} backdrop={false} scroll={true} placement="end" onHide={this.handleHide} onShow={() => this.initialize(map, setYear)}>
              <Offcanvas.Header closeButton><h5>Building Footprints in {this.state.year}</h5></Offcanvas.Header>
              <Offcanvas.Body>
                {this.renderDetails()}
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
        <article><p>Click a building<i className="fas fa-coffee"></i> to for details.</p></article>
      )
    }
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button className="end-0 position-absolute top-50 mx-3" onClick={() => this.setState({ show: true })}><FaCaretLeft /> Building Details</Button>
      )
    } else {
      return(<></>)
    }
  }

  renderIcon() {
    return(<FaCameraRetro />)
  }
}
