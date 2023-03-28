import { useContext, useEffect } from "react";
import {
  Accordion,
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import MapContext from "~/mapContext";
import { tileLayers } from "~/data/tileLayers";
import OpacityControl from "./OpacityControl";

export default function TileLayers() {
  const { mapState, currentYearState } = useContext(MapContext);

  useEffect(() => {
    for (const tileLayer of tileLayers) {
      if (mapState && !mapState.getLayer(tileLayer.layer.id)) {
        mapState?.addSource(tileLayer.layer.id, tileLayer.source);
        mapState?.addLayer(tileLayer.layer);
      }
    }

    // return () => {
    //   for (const tileLayer of tileLayers) {
    //     mapState?.removeLayer(tileLayer.layer.id);
    //     mapState?.removeSource(tileLayer.layer.id);
    //   }
    // }
  }, [mapState, currentYearState]);
  return (
    <ToastContainer position="bottom-start" className="ms-2 mb-2 overflow-hidden" tabIndex={0}>
      <Toast show={true} className="overflow-auto">
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
                          <OverlayTrigger
                            trigger={["focus"]}
                            placement="right"
                            overlay={
                              <Popover style={{zIndex: 1090}}>
                                <Popover.Header as="h3">
                                  {layer.title}
                                </Popover.Header>
                                <Popover.Body>
                                  {layer.description}
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <FontAwesomeIcon className="fs-6 text-muted ms-2" icon={faInfoCircle} role="button" tabIndex={0} />
                          </OverlayTrigger>
                        </span>
                      </Col>
                    </Row>
                    <OpacityControl layer={layer} />
                    <Row><Col><hr /></Col></Row>
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