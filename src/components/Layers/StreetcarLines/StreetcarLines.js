import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import StreetcarLayers, { dehighlightGeoJSON, highlightGeoJSON } from './data.js';
import './StreetcarLines.scss';

export default class StreetcarLines extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      layers: [],
      show: true,
      added: false
    };

    this.clearLayers = this.clearLayers.bind(this);

    this.bounds = null;
  }

  async componentDidMount() {
    const layers = await StreetcarLayers(this.props.year);
    this.setState({ layers }, this.addLayers)
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.layers !== this.state.layers) this.addLayers();
  }

  componentWillUnmount() {
    this.clearLayers();
  }

  clearLayers() {
    for (const layer of this.state.layers) {
      layer.leafletObject.removeFrom(this.props.leafletMap)
    }
  }

  addLayers() {
    try {
      document.querySelector('.leaflet-overlay-pane g').innerHTML = '';
    } catch {}

    this.clearLayers();

    for (const [index, layer] of this.state.layers.entries()) {
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

      if (!this.props.leafletMap.hasLayer(layer.leafletObject)) {
        layer.leafletObject.addTo(this.props.leafletMap);
      }
    }

    this.setState({ added: true });
  }

  render() {
    return (
      <>
        <Offcanvas className="text-bg-dark" show={this.state.show} placement="end" scroll={true} backdrop={false}>
          <Offcanvas.Header onHide={() => this.setState({ show: false })}>
            <h5>StreetcarLines {this.props.year}</h5>
            <CloseButton variant="white" onClick={() => this.setState({ show: false })}/>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {this.renderContent()}
          </Offcanvas.Body>
        </Offcanvas>
        {this.renderToggleButton()}
     </>
    )
  }

  renderContent() {
    if (this.state.layers.length > 0) {
      return (
        <ul className="list-unstyled">
          {this.state.layers.map((layer, index) => {
            return(
              <li
                key={index}
                tabIndex="0"
                className="fs-5"
                style={{color: layer.leafletObject.options.color, cursor: 'pointer'}}
                onMouseEnter={() => highlightGeoJSON(layer.leafletObject, layer.leafletObject.options.color)}
                onMouseLeave={() => dehighlightGeoJSON(layer.leafletObject, layer.leafletObject.options.color)}
                onFocus={() => highlightGeoJSON(layer.leafletObject, layer.leafletObject.options.color)}
                onBlur={() => dehighlightGeoJSON(layer.leafletObject, layer.leafletObject.options.color)}
              >
                {layer.label}
              </li>
            )
          })}
        </ul>
      );
    }

    return <span><FontAwesomeIcon icon={faSpinner} spin /> Loading Routes</span>;
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
