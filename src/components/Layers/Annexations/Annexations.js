import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { AnnexLayers, Boundaries, YEARS } from './data';
import TimeSlider from '../../TimeSlider/TimeSlider';

export default class Annexations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      annexLayers: [],
      boundaryLayers: [],
      layerDetails: null,
      detailHeader: null,
      show: true,
      currentAnnex: null,
      currentBoundary: null
    }

    this.startYear = Math.min(...YEARS) - 1;
    this.endYear = Math.max(...YEARS) + 1;

    this.clearLayers = this.clearLayers.bind(this);
    this.setInitialBounds = this.setInitialBounds.bind(this);
  }

  async componentDidMount() {
    const annexLayers = AnnexLayers();
    const boundaryLayers = Boundaries();

    for (const annex of annexLayers) {
      annex.leafletLayer = await Promise.resolve(annex.leafletLayer);
    }

    for (const boundary of boundaryLayers) {
      boundary.leafletLayer = await Promise.resolve(boundary.leafletLayer);
    }

    this.setState({ annexLayers, boundaryLayers }, this.setInitialBounds);
  }

  async componentDidUpdate(previousProps, previousState) {
    if (this.state.currentBoundary )this.props.leafletMap.fitBounds(this.state.currentBoundary.leafletLayer.getBounds());

    if (this.props.currentYear !== previousProps.currentYear || !this.state.currentBoundary) {
      const closestYear = Math.max(...YEARS.filter(n => {return n <= this.props.currentYear}));

      const currentAnnex = this.state.annexLayers.find(layer => parseInt(layer.year) === parseInt(closestYear));

      const currentBoundary = this.state.boundaryLayers.find(layer => parseInt(layer.year) === parseInt(closestYear));

      if (currentBoundary && this.state.currentBoundary && this.state.currentBoundary.leafletLayer !== currentBoundary.leafletLayer) {
        this.state.currentBoundary.leafletLayer.removeFrom(this.props.leafletMap);
        this.state.currentAnnex.leafletLayer.removeFrom(this.props.leafletMap);
      }

      if ((currentAnnex && currentBoundary) &&
          currentBoundary.leafletLayer &&
          currentBoundary !== this.state.currentBoundary
       ) {
        await currentBoundary.leafletLayer.addTo(this.props.leafletMap);
        if (parseInt(this.props.currentYear) < this.endYear) currentAnnex.leafletLayer.addTo(this.props.leafletMap);
        this.setState(
          {
            currentBoundary,
            currentAnnex,
            detailHeader: `Area Annexed in ${currentBoundary.year}`,
            layerDetails: currentBoundary.details
          }
        );
      }

      if (parseInt(this.props.currentYear) === this.startYear && this.state.currentBoundary) {
        this.clearLayers();
        this.setState(
          {
            currentAnnex: null,
            currentBoundary: null,
            layerDetails: 'Use the form field or slider above to select a year to see how Atlanta grew over time.',
            detailHeader: 'City Growth Through the Years'
          }
        )
      }

      if (parseInt(this.props.currentYear) === this.endYear && this.state.currentAnnex) {
        this.state.currentAnnex.leafletLayer.removeFrom(this.props.leafletMap);
        this.setState({ currentAnnex: null });
      }
    }
  }

  async componentWillUnmount() {
    /*
      In development, the components get unmounted and remounted.
      https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
      References to the Leaflet layers gets lost. This is sort of a a brute force
      way to ensure the layers are cleared. This makes me sad 😢
    */
    this.clearLayers();
    const oldBoundaries = document.querySelector('.leaflet-whole-pane g');
    const oldAnnexes = document.querySelector('.leaflet-part-pane g');
    if (oldBoundaries) oldBoundaries.innerHTML = '';
    if (oldAnnexes) oldAnnexes.innerHTML = '';
    this.setState({ currentAnnex: null, currentBoundary: null });
    // for (const leftOver of document.querySelectorAll('.leaflet-part-pane g path')) { leftOver.style.fillOpacity = 0 }
  }

  clearLayers() {
    this.state.boundaryLayers.forEach(boundary => boundary.leafletLayer.removeFrom(this.props.leafletMap));
    this.state.annexLayers.forEach(annex => annex.leafletLayer.removeFrom(this.props.leafletMap));
  }

  setInitialBounds() {
    this.props.leafletMap.fitBounds(this.state.boundaryLayers[0].leafletLayer.getBounds());
  }

  render() {
    return(
      <>
        <Offcanvas show={this.state.show} placement="end" scroll={true} backdrop={false}>
          <Offcanvas.Header closeButton onHide={() => this.setState({ show: false })}><h5>Annexations</h5></Offcanvas.Header>
          <Offcanvas.Body>
          <TimeSlider years={YEARS} currentYear={this.props.currentYear} setYear={this.props.updateYear} label="City Boundaries in" />
            <article>
              <h4>{this.state.detailHeader}</h4>
              <p>
                {this.state.layerDetails}
              </p>
            </article>
          </Offcanvas.Body>
        </Offcanvas>
        {this.renderToggleButton()}
      </>
    );
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button
          className="end-0 position-absolute top-50 mx-3 owa-detail-toggle"
          onClick={() => this.setState({ show: true })}
        >
          <FontAwesomeIcon icon={faCaretLeft} /> Annexation Details
        </Button>
      )
    }
    return ( <></> )
  }

}
