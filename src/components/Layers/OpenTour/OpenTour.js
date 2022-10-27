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
    this.handleHide = this.handleHide.bind(this);
  }

  async componentDidMount() {
    const { leafletLayer, tourDetails } = await Tour(this.props.tour);
    leafletLayer.on('click', (event) => this.handleClick(event));
    leafletLayer.on('popupopen', (event) => this.handleClick(event));
    leafletLayer.on('popupclose', (event) => this.handleClick(event));
    this.props.setYear(tourDetails.year);
    this.setState({ leafletLayer, tourDetails, layerDetails: tourDetails.intro }, this.addLayer);
  }

  componentDidUpdate() {
    this.props.setYear(this.state.tourDetails.year);
  }

 async componentWillUnmount() {
    this.setState({ layerDetails: this.state.tourDetails.intro, activeMarker: null });
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

  handleClick(event) {
    if (this.state.activeMarker) this.resetMarker();

    const { type, layer } = event;

    if (type === 'popupclose' && layer === this.state.activeMarker) {
      this.setState(
        {
          layerDetails: this.state.tourDetails.intro,
          activeMarker: null
        }
      )
    } else {
      layer.setIcon(activeMarkerIcon(layer.feature.properties));
      this.setState(
        {
          layerDetails: layer.feature.properties,
          activeMarker: layer,
          show: true
        }
      );
    }
  }

  handleHide() {
    if (this.state.activeMarker) this.resetMarker();
    this.setState(
      {
        show: false,
        layerDetails: this.state.tourDetails.intro,
        activeMarker: null
      }
    )
  }

  resetMarker() {
    this.state.activeMarker.setIcon(markerIcon(this.state.layerDetails));
  }

  render() {
    return (
      <>
        <Offcanvas show={this.state.show} placement="end" scroll={true} backdrop={false}>
          <Offcanvas.Header closeButton onHide={this.handleHide}>
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
        <article className='owa-opentour-article'>
          {this.renderImages()}
          {this.renderTitle()}
          <section dangerouslySetInnerHTML={{__html: this.state.layerDetails.description}}></section>

        </article>
      );
    }

    return <span><FontAwesomeIcon icon={faSpinner} spin /> Loading Tour</span>;
  }

  renderImages() {
    if (this.state.layerDetails.images.length > 0) {
      return (
        <Carousel interval={500000}>
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

  renderTitle() {
    if (this.state.layerDetails.title === this.state.tourDetails.title) {
      return (<></>)
    }

    return (
      <h5 className="mt-5">{this.state.layerDetails.position}: {this.state.layerDetails.title}</h5>
    )
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button
          className="end-0 position-absolute top-50 mx-3 owa-detail-toggle"
          onClick={() => this.setState({ show: true })}
        >
          <FontAwesomeIcon icon={faCaretLeft} /> Tour Details
        </Button>
      )
    }
    return ( <></> )
  }
}
