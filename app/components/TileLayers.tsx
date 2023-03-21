import { useContext, useEffect } from "react";
import { Accordion, Col, Container, Row, Toast, ToastContainer } from 'react-bootstrap';
import MapContext from "~/mapContext";
import { tileLayers } from "~/data/tileLayers";
import OpacityControl from "./OpacityControl";

export default function TileLayers() {
  const { mapState, currentYearState } = useContext(MapContext);

  useEffect(() => {
    for (const baseLayer in tileLayers) {
      mapState?.addSource(tileLayers[baseLayer].id, tileLayers[0].source);
      mapState?.addLayer(tileLayers[baseLayer].layer);
    }

    return () => {
      for (const baseLayer in tileLayers) {
        mapState?.removeLayer(tileLayers[baseLayer].id);
        mapState?.removeSource(tileLayers[baseLayer].id);
      }
    }
  }, [mapState, currentYearState]);
  return (
    <ToastContainer position="bottom-start" className="leaflet-bottom leaflet-left overflow-hidden" tabIndex={0}>
      <Toast show={true} className="leaflet-control leaflet-bar overflow-auto">
        <Accordion defaultActiveKey={0}>
          <Accordion.Item eventKey={0}>
            <Accordion.Header>
              Base Layers
            </Accordion.Header>
            <Accordion.Body className="base-layer-control">
              {tileLayers.map((layer, index) => {
                return (
                  <Container fluid key={index}>
                    <Row>
                      <Col>
                        <span className="fs-5">
                          {layer.title}
                        </span>
                      </Col>
                    </Row>
                    <OpacityControl layer={layer} />
                  </Container>
                )
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Toast>
    </ToastContainer>
  )
}