import React from "react";
import { Button, Offcanvas, Carousel, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { layers, strongStyle, omekaImages, shapeFileMetadata, omekaMetadata, addLayer } from './data.js';
import Legend from "./Legend.js";
import Image from '../../Image/Image.js';
import './Buildings.scss';
import { camelToTitle } from "../../../utils/stringHelpers.js";

export default class Buildings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      layerDetails: null,
      currentBuilding: null,
      layer: null,
      allBuildings: null,
      omekaMarkers: null,
      showLegend: 1,
      currentFilter: null
    }

    this.omekaMetadata = null;

    this.toggleButtonRef = React.createRef();

    this.filter = this.filter.bind(this);
    this.poopLayer = this.poopLayer.bind(this);
  }

  async componentDidMount() {
    this.props.leafletMap.flyToBounds(layers[this.props.year].bounds).panTo([33.75432, -84.38979]).setZoom(15, { animate: true });

    // this.setState({ layer: layers[this.props.year] });
    const omekaBuildingMetadata = await omekaMetadata();
    this.setState({allBuildings: omekaBuildingMetadata});
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.layer?.year !== this.props.year) {
      if (this.state.layer) {
        this.state.layer.leafletObject.removeFrom(this.props.leafletMap);
      }
      this.setState({ layer: layers[this.props.year]} );
    }

    if (this.props.leafletMap && this.state.layer && !this.props.leafletMap.hasLayer(this.state.layer.leafletObject) ) {
      this.poopLayer();
    }

    if (previousState.show && !this.state.show) {
      this.toggleButtonRef.current.focus();
    }
  }

  componentWillUnmount() {
    if (this.state.layer) {
      this.state.layer.leafletObject.removeFrom(this.props.leafletMap);
      // this.state.omekaMarkers.removeFrom(this.props.leafletMap);
    }
  }

  poopLayer(filter) {
    console.log("🚀 ~ file: Buildings.js ~ line 64 ~ Buildings ~ poopLayer ~ this.props.year, filter", this.props.year, filter)
    const layer = addLayer(this.props.year, filter);
    layer.leafletObject.addTo(this.props.leafletMap);
    layer.leafletObject.on('click', (event) => this.handleClick(event));
    layer.leafletObject.bringToFront();
    this.setState({ layer });
  }

  async handleClick(event) {
    if (this.state.currentBuilding) {
      this.state.layer.leafletObject.resetFeatureStyle(this.state.currentBuilding);
    }

    const properties = event.layer.properties;

    this.setState({ currentBuilding: properties.Identifier, showLegend: 0 });

    const omekaBuilding = this.state.allBuildings.find(building => building.bldgID === properties.Identifier);

    if (omekaBuilding) {
      if (omekaBuilding.fileCount > 0 && omekaBuilding.images.length === 0) {
        omekaBuilding.images = await omekaImages(omekaBuilding.omekaID);
      }
      this.setState(
        {
          layerDetails: omekaBuilding,
          show: true
        }
      );
    } else {
      this.setState(
        {
          layerDetails: shapeFileMetadata(properties),
          show: true
        }
      )
    }

    this.state.layer.leafletObject.setFeatureStyle(properties.Identifier, strongStyle(properties));
  }

  filter(use) {
    this.state.layer.leafletObject.removeFrom(this.props.leafletMap);
    this.setState({ currentFilter: use});
    this.poopLayer(use);
  }

  render() {
    return (
      <>
      {this.renderToggleButton()}
      <Offcanvas show={this.state.show} placement="end" scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton onHide={() => {this.setState({ show: false })}}>
          <h5>Buildings {this.props.year}</h5>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Legend open={this.state.showLegend} filter={this.filter} currentFilter={this.state.currentFilter} />
          <article className="my-3">
            {this.renderDetails()}
          </article>
        </Offcanvas.Body>
      </Offcanvas>
      </>
    )
  }

  renderDetails() {
    if (this.state.layerDetails) {
      return (
        <>
          {this.renderImages()}
          <h5>{this.state.layerDetails.title}</h5>
          <p className="lead">{this.state.layerDetails.address}</p>
          <p>{this.state.layerDetails.description}</p>
          {/* <Container> */}
            {Object.keys(this.state.layerDetails.metadata).map((key, index) => {
              if (this.state.layerDetails.metadata[key]) {
                return (
                  <Row as="dl" key={index}>
                    <Col className="text-truncate" sm={12} as="dt">{camelToTitle(key)}</Col>
                    <Col as="dd" sm={12}>{this.state.layerDetails.metadata[key]}</Col>
                  </Row>
                );
              } else {
                return (<span key={index}></span>);
              }
            })}
          {/* </Container> */}
        </>
      );
    } else {
      return (
        <p>Click a building footprint to learn more.</p>
      )
    }
  }

  renderImages() {
    if (this.state.layerDetails.images.length > 0) {
      return (
        <Carousel className="my-3" interval={500000}>
          {this.state.layerDetails.images.map(
            (image, index) => {
              return (
                <Carousel.Item key={index}>
                  <Image source={image.full} caption={image.caption} />
                </Carousel.Item>
              )
            }
          )}
        </Carousel>
      );
    }

    return <hr />
  }


  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button
          className="end-0 position-absolute top-50 mx-3 owa-detail-toggle"
          onClick={() => this.setState({ show: true })}
          tabIndex="0"
          ref={this.toggleButtonRef}
        >
          <FontAwesomeIcon icon={faCaretLeft} /> Building Details
        </Button>
      )
    }
    return ( <></> )
  }
}