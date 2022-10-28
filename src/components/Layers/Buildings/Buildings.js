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
      layer: null,
      allBuildings: null
    }

    // this.state.layer = layers[this.props.year];
  }

  async componentDidMount() {
    this.setState({ layer: layers[this.props.year] });
    const response = await fetch('https://dvl.ecdsdev.org/api/items?collection=16&key=23bd7efbce6d7e1ceeee3265cddf6060543f0459&per_page=1000')
    const data = await response.json();
    const reasonableJSON = data.map((building) => {
      return {
        title: building.element_texts.find(el => el.element.id === 50).text,
        bldgID: building.element_texts.find(el => el.element.id === 43).text
      }
    });
    this.setState({allBuildings: reasonableJSON});
    console.log(this.state.allBuildings);
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
  }

  componentWillUnmount() {
    if (this.state.layer) this.state.layer.leafletObject.removeFrom(this.props.leafletMap);
  }

  handleClick(event) {
    console.log("🚀 ~ file: Buildings.js ~ line 49 ~ Buildings ~ handleClick ~ event", event)
    if (this.state.currentBuilding) {
      this.state.layer.leafletObject.resetFeatureStyle(this.state.currentBuilding);
    }
    const properties = event.layer.properties;
    const reasonableJSON = this.state.allBuildings;
    let building_details = {};
    for(const building of reasonableJSON) {
      if (building.bldgID === properties.Identifier) {
        building_details = {
          title: building.title,
          bldgID: building.bldgID
        };
        break;
      }
    }
    if (Object.keys(building_details).length === 0) {
      this.setState(
        {
          layerDetails: properties.Identifier,
          currentBuilding: properties.Identifier
        }
      );
    }
    else {
      this.setState(
        {
          layerDetails: building_details.title,
          currentBuilding: building_details.bldgID
        }
      )
    }
    this.state.layer.leafletObject.setFeatureStyle(properties.Identifier, strongStyle(properties));
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