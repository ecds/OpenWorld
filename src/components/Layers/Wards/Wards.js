import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { Layers, YEARS, addLabels } from './data';
import TimeSlider from '../../TimeSlider/TimeSlider';
// import styles from './Wards.module.scss';

export default class Wards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      layers: null,
      currentLayer: null,
      labels: []
    }

    this.addLayer = this.addLayer.bind(this);
    this.clearLayer = this.clearLayer.bind(this);
    this.setCurrentLayer = this.setCurrentLayer.bind(this);

  }

  async componentDidMount() {
    const layers = await Layers();
    this.setState({ layers }, this.setCurrentLayer);
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.currentYear < Math.min(...YEARS) && this.state.currentLayer) {
      this.clearLayer();
      this.setState({ currentLayer: null, labels: [] });
    } else if (previousProps.currentYear !== this.props.currentYear) {
      this.setCurrentLayer();
    }
  }

  componentWillUnmount() {
    this.clearLayer();
  }

  setCurrentLayer() {
    if (!this.state.layers) return;
    const closestYear = Math.max(...YEARS.filter(n => {return n <= this.props.currentYear}));
    if (this.state.currentLayer && this.state.currentLayer.year === closestYear) return;
    this.clearLayer();
    const currentLayer = this.state.layers.find(layer => layer.year === closestYear);
    if (currentLayer) this.setState({ currentLayer }, this.addLayer);
  }

  addLayer() {
    this.state.currentLayer.leafletLayer.addTo(this.props.leafletMap);
    this.props.leafletMap.fitBounds(this.state.currentLayer.leafletLayer.getBounds());
    const labels = addLabels(this.props.leafletMap, this.state.currentLayer.leafletLayer);
    this.setState( { labels })
  }

  clearLayer() {
    console.log('clear')
    if (!this.state.currentLayer) return;
    this.state.currentLayer.leafletLayer.removeFrom(this.props.leafletMap);
    for (const label of this.state.labels) {
      label.removeFrom(this.props.leafletMap);
    }
  }

  render() {
    return(
      <>
        <Offcanvas show={this.state.show} placement="end" scroll={true} backdrop={false}>
          <Offcanvas.Header closeButton onHide={() => this.setState({ show: false })}>
            <h5>Wards</h5>
          </Offcanvas.Header>
          <TimeSlider years={YEARS} currentYear={this.props.currentYear} setYear={this.props.updateYear} label="City Wards in" />
          <Offcanvas.Body>
            <article>
              {this.renderContent()}
            </article>
          </Offcanvas.Body>
        </Offcanvas>
        {this.renderToggleButton()}
      </>
    )
  }

  renderContent() {
    if (this.state.currentLayer && this.state.currentLayer.details) {
      return (
        <>
          <h5>{this.state.currentLayer.details.title}</h5>
          <p className="lead">{this.state.currentLayer.details.intro}</p>
          <dl className="row">
            { this.state.currentLayer.details.wards.map((ward, index) => {
              return(
                <span key={index}>
                <dt className="col-sm-3">{ward.title}</dt>
                <dd className="col-sm-9"><p>{ward.description}</p></dd>
                </span>
              )
            })}
          </dl>
        </>
      )
    }

    return (
      <>
        <h5>Atlanta’s Wards</h5>
        <p>From its incorporation in 1847, the municipal boundaries of Atlanta, Georgia, United States, were extended repeatedly from a small area around its railroad station to today's city covering 131.7 square miles (341 km2).</p>
        <p>Prior to 1954, Atlanta was divided into political divisions called wards. The number of wards were increased as the city grew.</p>
        <p>Use the form field or slider above to select a year to see how Atlanta's Wards changed over time.</p>
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
          <FontAwesomeIcon icon={faCaretLeft} /> Ward Details
        </Button>
      )
    }
    return ( <></> )
  }
}
