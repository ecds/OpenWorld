import React, { useEffect, useRef } from 'react';
import { DomEvent } from 'leaflet';
import { Accordion, Col, Container, Row, Toast, ToastContainer } from 'react-bootstrap';
import './TileLayers.scss';
import { tileLayers } from './data';
import OpacityControl from '../../OpacityControl/OpacityControl';

const TileLayers = (props) => {

  const controlRef = useRef(null);

  useEffect(() => {
    if (props.leafletMap) {
      for (const tileLayer of tileLayers) {
        for (const leafletLayer of tileLayer.leafletLayers) {
          leafletLayer.addTo(props.leafletMap);
        }
      }
    }

    if (controlRef.current) {
      DomEvent.disableScrollPropagation(controlRef.current);
    }
  }, [props, controlRef]);

  return (
    <ToastContainer position="bottom-start" className="leaflet-bottom leaflet-left overflow-hidden" tabIndex="0">
      <Toast show={true} className="leaflet-control leaflet-bar overflow-auto" ref={controlRef}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Base Layers
          </Accordion.Header>
          <Accordion.Body className="base-layer-control">
            {tileLayers.map((layer, index) => {
              return (
                <Container fluid key={index}>
                  <Row>
                    <Col>
                      <h5>{layer.title}</h5>
                    </Col>
                  </Row>
                  <OpacityControl layer={layer} year={props.year} />
                  <Row><Col><hr /></Col></Row>
                </Container>
              )
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </Toast>
    </ToastContainer>
  );
};


export default TileLayers;
