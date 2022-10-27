import React from "react";
import { Button, Offcanvas, Carousel } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { layers, strongStyle, omekaMetadata, omekaHighlight } from './data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Image/Image.js';
import './Buildings.scss';
import Legend from "./Legend.js";

export default class Buildings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      layerDetails: null,
      currentBuilding: null,
      layer: null,
      omekaMarkers: null
    }

    this.omekaMetadata = null;

    this.toggleButtonRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ layer: layers[this.props.year] });
    this.omekaMetadata = await omekaMetadata();
    const omekaMarkers = await omekaHighlight(this.omekaMetadata.filter(b => { return b.longitude && b.latitude }));
    console.log("🚀 ~ file: Buildings.js ~ line 31 ~ Buildings ~ componentDidMount ~ omekaMarkers", omekaMarkers)
    this.setState(
      { omekaMarkers },
      this.addOmekaMarkers
    )
  }

  addOmekaMarkers() {
    this.state.omekaMarkers.addTo(this.props.leafletMap);
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.layer.year !== this.props.year) {
      if (this.state.layer) {
        this.state.layer.leafletObject.removeFrom(this.props.leafletMap);
      }
      this.setState({ layer: layers[this.props.year]} );
    }

    if (this.props.leafletMap && !this.props.leafletMap.hasLayer(this.state.layer.leafletObject)) {
      layers[this.props.year].leafletObject.addTo(this.props.leafletMap);
      layers[this.props.year].leafletObject.on('click', (event) => this.handleClick(event));
      layers[this.props.year].leafletObject.bringToFront();
      this.props.leafletMap.fitBounds(layers[this.props.year].bounds);
    }

    if (previousState.show && !this.state.show) {
      this.toggleButtonRef.current.focus();
    }
  }

  componentWillUnmount() {
    if (this.state.layer) {
      this.state.layer.leafletObject.removeFrom(this.props.leafletMap);
      this.state.omekaMarkers.removeFrom(this.props.leafletMap);
    }
  }

  handleClick(event) {
    if (this.state.currentBuilding) {
      this.state.layer.leafletObject.resetFeatureStyle(this.state.currentBuilding);
    }

    const properties = event.layer.properties;
    this.setState(
      {
        currentBuilding: properties.Identifier
      }
    );

    if (this.omekaMetadata.map(b => b.bldgID).includes(event.layer.properties.Identifier)) {
      this.setState(
        {
          layerDetails: this.omekaMetadata.find(building => building.bldgID === event.layer.properties.Identifier)
        }
      );
    } else {
      this.setState(
        {
          layerDetails: {
            title: properties.Title,
            address: properties.Address,
            images: []
          }
        }
      )
    }

    this.state.layer.leafletObject.setFeatureStyle(properties.Identifier, strongStyle(properties));
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
          <Legend />
          {this.renderDetails()}
        </Offcanvas.Body>
      </Offcanvas>
      </>
    )
  }

  renderDetails() {
    if (this.state.layerDetails) {
      return (
        <article className="my-3">
          {this.renderImages()}
          <h5>{this.state.layerDetails.title}</h5>
          <p>{this.state.layerDetails.address}</p>
        </article>
      );
    } else {
      return (
        <article className="my-3">Click a building footprint to learn more.</article>
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
                  {/* <Carousel.Caption>
                    <p>{image.caption}</p>
                  </Carousel.Caption> */}
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