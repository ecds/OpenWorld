import React from 'react';
import L from 'leaflet';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import StreetcarLayers, { dehighlightGeoJSON, highlightGeoJSON } from './data.js';
// import styles from './StreetcarLines.module.scss';

export default class StreetcarLines extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      layers: [],
      show: true,
      layerGroup: new L.layerGroup()
    };

    this.bounds = null;
    // this.layerGroup = null;
  }

  async componentDidMount() {
    const layers = await StreetcarLayers(this.props.year);
    this.setState({ layers }, this.addLayers)
  }

  async componentDidUpdate(previousProps, previousState) {
    // if (this.layers.length > 0) {
    //   this.addLayers();
    // }
  }

  async componentWillUnmount() {
    // if (this.layerGroup) {
      this.state.layerGroup.removeFrom(this.props.leafletMap);
    // }
    // await this.state.layers.map(layer => layer.removeFrom(this.props.leafletMap));
    // try {
    //   for (const layer of this.state.layers.entries()) {
    //     console.log("🚀 ~ file: StreetcarLines.js ~ line 35 ~ StreetcarLines ~ componentWillUnmount ~ layer", layer.leafletObject)
    //     await layer.leafletObject.removeFrom(this.props.leafletMap);
    //   }
    // } catch(e) {
    //   console.log("🚀 ~ file: StreetcarLines.js ~ line 39 ~ StreetcarLines ~ componentWillUnmount ~ e", e, this.state.layers.entries())

    // }
  }

  addLayers() {
    // if (this.state.layers.length > 0) {

      for (const [index, layer] of this.state.layers.entries()) {
        // if (!this.props.leafletMap.hasLayer(layer.leafletObject)) {
          // layer.leafletObject.addTo(this.props.leafletMap);
          this.state.layerGroup.addLayer(layer.leafletObject);
          if (index === 0) {
            this.bounds = layer.leafletObject.getBounds();
          } else {
            this.bounds.extend(
              layer.leafletObject.getBounds()
            );
          }

          if (index === this.state.layers.length - 1) {
            this.props.leafletMap.fitBounds(this.bounds);
          }
        // }
      // }
    }

    this.state.layerGroup.addTo(this.props.leafletMap);
    // this.layerGroup = new L.layerGroup(this.state.layers.map(layer => layer.leafletObject));
  }

  render() {
    return (
      <>
        <Offcanvas show={this.state.show} placement="end" scroll={true} backdrop={false}>
          <Offcanvas.Header closeButton onHide={() => this.setState({ show: false })}>
            <h5>StreetcarLines {this.props.year}</h5>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="list-unstyled">
              {this.state.layers.map((layer, index) => {
                return(
                  <li
                    key={index}
                    tabIndex="0"
                    className="fs-3"
                    style={{color: layer.leafletObject.options.color, cursor: 'pointer'}}
                    onMouseEnter={() => highlightGeoJSON(layer.leafletObject)}
                    onMouseLeave={() => dehighlightGeoJSON(null, layer.leafletObject)}
                    onFocus={() => highlightGeoJSON(layer.leafletObject)}
                  >
                    {layer.label}
                  </li>
                )
              })}
            </ul>
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
          <FontAwesomeIcon icon={faCaretLeft} /> Streetcar Line Details
        </Button>
      )
    }
    return ( <></> )
  }
}
