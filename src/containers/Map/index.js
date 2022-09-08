import 'leaflet/dist/leaflet.css';
import { Map as MapComponent } from 'react-leaflet';
import styled from 'styled-components';
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Accordion from 'react-bootstrap/Accordion';
import MapContext from './MapContext';
import { MAP_OPTIONS, MAP_TILE_LAYERS } from '../../constants';
import { ToastContainer } from 'react-bootstrap';
import RasterLayerGroup from './Layers/RasterLayerGroup';
import { DomEvent } from 'leaflet';
import { FaLayerGroup } from 'react-icons/fa';

const StyledMap = styled(MapComponent)`
	width: auto;
	height: calc(100vh - 66px);
	position: absolute;
	left: 0;
	bottom: 0;
  width: 100vw;
	z-index: 0;
`;

class Map extends React.Component {
  mapRef = React.createRef(null);
  controlRef = React.createRef(null);

  componentDidMount() {
    const map = this.mapRef.current.leafletElement;
    this.props.setMap(map);
    setTimeout(() => { map.invalidateSize() }, 100);
  }

  componentDidUpdate() {
    // This makes it so the map doesn't pan while someone is changing the opacity.
    if (this.controlRef.current) {
      DomEvent.disableScrollPropagation(this.controlRef.current);
    }
  }


  render() {
    return (
      <StyledMap {...MAP_OPTIONS} ref={this.mapRef}>
        <ToastContainer position="bottom-start" className="leaflet-bottom leaflet-left overflow-hidden" tabndex="0">
          <Toast show={true} className="leaflet-control leaflet-bar overflow-auto" ref={this.controlRef}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <FaLayerGroup className="me-2" /> Base Layers
                </Accordion.Header>
                <Accordion.Body>
                  <div className='base-layer-control'>
                    {MAP_TILE_LAYERS.map((layer, key) => {
                      if (this.mapRef) {
                        return (
                          <RasterLayerGroup {...this.props} layerGroup={layer} key={key} />
                          )
                      } else {
                        return <></>
                      }
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Toast>
        </ToastContainer>
      </StyledMap>
    )
  };
}

export default props => (
  <MapContext.Consumer>
    {({ setMap, year }) => <Map {...props} setMap={setMap} year={year} />}
  </MapContext.Consumer>
);
