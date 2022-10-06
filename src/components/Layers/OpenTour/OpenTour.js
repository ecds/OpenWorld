import React from 'react';
import { Button, Offcanvas, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Tour, markerIcon, activeMarkerIcon } from './data.js';
import './OpenTour.scss';
import Image from '../../Image/Image.js';

export default class OpenTour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: null,
      layerDetails: null,
      show: true,
      leafletLayer: null,
      tourDetails: {},
      activeMarker: null
    };

    this.addLayer = this.addLayer.bind(this);
    this.clearLayer = this.clearLayer.bind(this);
  }

  async componentDidMount() {
    const { leafletLayer, tourDetails } = await Tour(this.props.tour);
    leafletLayer.on('click', (event) => this.handleClick(event.layer));
    this.props.setYear(tourDetails.year);
    this.setState({ leafletLayer, tourDetails }, this.addLayer);
  }

  componentDidUpdate() {
    this.props.setYear(this.state.tourDetails.year);
  }

 async componentWillUnmount() {
    this.setState({ layerDetails: null, activeMarker: null });
    await this.clearLayer();
  }

  addLayer() {
    this.state.leafletLayer.addTo(this.props.leafletMap);
    this.props.leafletMap.fitBounds(this.state.leafletLayer.getBounds());
  }

  async clearLayer() {
    try {
      await this.state.leafletLayer.removeFrom(this.props.leafletMap);
    } catch {
      setTimeout(() => {
        this.clearLayer();
      }, 300);
    }
  }

  handleClick(layer) {
    if (this.state.activeMarker) this.state.activeMarker.setIcon(markerIcon(this.state.layerDetails.position));
    layer.setIcon(activeMarkerIcon(layer.feature.properties.position));
    this.setState(
      {
        layerDetails: layer.feature.properties,
        activeMarker: layer
      }
    );
  }

  render() {
    return (
      <>
        <Offcanvas show={this.state.show} placement="end" scroll={true} backdrop={false}>
          <Offcanvas.Header closeButton onHide={() => this.setState({ show: false })}>
            <h5>{this.state.tourDetails.title}</h5>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {this.renderContent()}
          </Offcanvas.Body>
        </Offcanvas>
        {this.renderToggleButton()}
      </>
    );
  }

  renderContent() {
    if (this.state.layerDetails) {
      return (
        <article>
          <Carousel interval={500000}>
            {this.state.layerDetails.images.map(
              (image, index) => {
                return (
                  <Carousel.Item key={index}>
                    <Image source={image.full} caption={image.caption} />
                    <Carousel.Caption>
                      <p>{image.caption}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              }
            )}
          </Carousel>
          <h5 className="mt-5">{this.state.layerDetails.title}</h5>
          <section dangerouslySetInnerHTML={{__html: this.state.layerDetails.description}}></section>

        </article>
      );
    } else if (this.state.tourDetails.intro) {
      return (
        <article>
          <section dangerouslySetInnerHTML={{__html: this.state.tourDetails.intro}}></section>
        </article>
      )
    }

    return <span><FontAwesomeIcon icon={faSpinner} spin /> Loading Tour</span>;
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button
          className="end-0 position-absolute top-50 mx-3 owa-detail-toggle"
          onClick={() => this.setState({ show: true })}
        >
          <FontAwesomeIcon icon={faCaretLeft} /> Streetcar Line Details
        </Button>
      )
    }
    return ( <></> )
  }
}
