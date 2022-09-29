import React from "react";
import { Button, Offcanvas } from 'react-bootstrap';
import { layers, strongStyle } from './data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import './Buildings.scss';

export default class Buildings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      layerDetails: null,
      currentBuilding: null,
      layer: null
    }

    // this.state.layer = layers[this.props.year];
  }

  componentDidMount() {
    console.log('mount')
    this.setState({ layer: layers[this.props.year] });
  }

  componentDidUpdate(previousProps, previousState) {
    console.log("🚀 ~ file: Buildings.js ~ line 25 ~ Buildings ~ componentDidUpdate ~ previousProps.year !== this.props.year", this.state.layer.year === this.props.year)
    if (this.state.layer.year !== this.props.year) {
      if (this.state.layer) {
        console.log(`remove ${this.state.layer.year}`)
        this.state.layer.leafletObject.removeFrom(this.props.leafletMap);
      }
      console.log(`add ${this.props.year}`)
      this.setState({ layer: layers[this.props.year]} );
    }

    if (this.props.leafletMap && !this.props.leafletMap.hasLayer(this.state.layer.leafletObject)) {
      layers[this.props.year].leafletObject.addTo(this.props.leafletMap);
      layers[this.props.year].leafletObject.on('click', (event) => this.handleClick(event));
      layers[this.props.year].leafletObject.bringToFront();
      this.props.leafletMap.fitBounds(layers[this.props.year].bounds);
    }
  }

  componentWillUnmount() {
    console.log('unmount')
    if (this.state.layer) this.state.layer.leafletObject.removeFrom(this.props.leafletMap);
  }

  handleClick(event) {
    if (this.state.currentBuilding) {
      this.state.layer.leafletObject.resetFeatureStyle(this.state.currentBuilding);
    }
    const properties = event.layer.properties;
    this.setState(
      {
        layerDetails: properties.BLDG_ID,
        currentBuilding: properties.BLDG_ID
      }
    );
    this.state.layer.leafletObject.setFeatureStyle(properties.BLDG_ID, strongStyle(properties));
  }


  render() {
    return (
      <>
      <Offcanvas show={this.state.show} placement="end" scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton onHide={() => {this.setState({ show: false })}}>
          <h5>Buildings {this.props.year}</h5>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {this.state.layerDetails}
        </Offcanvas.Body>
      </Offcanvas>
      {this.renderToggleButton()}
      </>
    )
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button
          className="end-0 position-absolute top-50 mx-3 owa-detail-toggle"
          onClick={() => this.setState({ show: true })}
        >
          <FontAwesomeIcon icon={faCaretLeft} /> Building Details
        </Button>
      )
    }
    return ( <></> )
  }
}