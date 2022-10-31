import React from "react";
import { Button, Offcanvas, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { layers, strongStyle, omekaImages } from './data.js';
import Legend from "./Legend.js";
import Image from '../../Image/Image.js';
import './Buildings.scss';

export default class Buildings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      layerDetails: null,
      currentBuilding: null,
      layer: null,
      allBuildings: null,
      omekaMarkers: null
    }

    this.omekaMetadata = null;

    this.toggleButtonRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ layer: layers[this.props.year] });
    const response = await fetch('https://dvl.ecdsdev.org/api/items?collection=16&key=23bd7efbce6d7e1ceeee3265cddf6060543f0459&per_page=1000')
    const data = await response.json();
    const reasonableJSON = data.map((building) => {
      return {
        omekaID: building.id,
        fileCount: building.files.count,
        title: building.element_texts.find(el => el.element.id === 50).text,
        bldgID: building.element_texts.find(el => el.element.id === 43).text,
        address: building.element_texts.find(el => el.element.id === 53).text,
        location: building.element_texts.find(el => el.element.id === 4).text.split(', ').map(c => {return parseFloat(c)}),
        landUse: building.element_texts.find(el => el.element.id === 49).text[0],
        images: []
      }
    });
    this.setState({allBuildings: reasonableJSON});
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
      // this.state.omekaMarkers.removeFrom(this.props.leafletMap);
    }
  }

  async handleClick(event) {
    if (this.state.currentBuilding) {
      this.state.layer.leafletObject.resetFeatureStyle(this.state.currentBuilding);
    }

    const properties = event.layer.properties;

    this.setState({ currentBuilding: properties.Identifier });

    const omekaBuilding = this.state.allBuildings.find(building => building.bldgID === properties.Identifier);

    if (omekaBuilding) {
      if (omekaBuilding.fileCount > 0 && omekaBuilding.images.length === 0) {
        omekaBuilding.images = await omekaImages(omekaBuilding.omekaID);
      }
      this.setState(
        {
          layerDetails: omekaBuilding
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