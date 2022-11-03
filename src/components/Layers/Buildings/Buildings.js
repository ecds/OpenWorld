import React from "react";
import { Button, Offcanvas, Carousel, Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { layers, strongStyle, omekaImages } from './data.js';
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
      showLegend: 1
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
        bldgID: building.element_texts.find(el => el.element.id === 43).text,
        metadata: {
          title: building.element_texts.find(el => el.element.id === 50)?.text,
          address: building.element_texts.find(el => el.element.id === 53)?.text,
          subject: building.element_texts.find(el => el.element.id === 49)?.text,
          description: building.element_texts.find(el => el.element.id === 41)?.text,
          dateBuilt: building.element_texts.find(el => el.element.id === 69)?.text,
          architect: building.element_texts.find(el => el.element.id === 76)?.text,
          buildingType: building.element_texts.find(el => el.element.id === 55)?.text,
          occupantEntities: building.element_texts.find(el => el.element.id === 72)?.text,
          occupantResidents: building.element_texts.find(el => el.element.id === 58)?.text,
          race: building.element_texts.find(el => el.element.id === 59)?.text,
          removed: building.element_texts.find(el => el.element.id === 63)?.text
        },
        landUse: building.element_texts.find(el => el.element.id === 49).text[0],
        location: building.element_texts.find(el => el.element.id === 4).text.split(', ').map(c => {return parseFloat(c)}),
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
      // this.props.leafletMap.fitBounds(layers[this.props.year].bounds);
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
          layerDetails: {
            metadata: properties,
            images: []
          },
          show: true
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
          <Legend open={this.state.showLegend} />
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
          <Container>
            {Object.keys(this.state.layerDetails.metadata).map((key, index) => {
              if (this.state.layerDetails.metadata[key]) {
                return (
                  <Row as="dl" key={index}>
                    <Col sm={3} as="dt">{camelToTitle(key)}</Col>
                    <Col as="dd">{this.state.layerDetails.metadata[key]}</Col>
                  </Row>
                );
              } else {
                return (<span key={index}></span>);
              }
            })}
          </Container>
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