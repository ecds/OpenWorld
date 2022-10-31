import React from 'react';
import { DomEvent } from 'leaflet';
import { Accordion, Col, Container, Row, Toast, ToastContainer } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './TileLayers.scss';
import { tileLayers } from './data';
import OpacityControl from '../../OpacityControl/OpacityControl';

export default class TileLayers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };

    this.controlRef = React.createRef();
  }

  componentDidMount() {
    // DomEvent.disableScrollPropagation(this.controlRef.current);
    DomEvent.stopPropagation(this.controlRef.current);

  }

  componentDidUpdate(previousProps, previousState) {
    if (!this.props.leafletMap) return;

    for (const tileLayer of tileLayers) {
      for (const leafletLayer of tileLayer.leafletLayers) {
        if (!this.props.leafletMap.hasLayer(leafletLayer)) leafletLayer.addTo(this.props.leafletMap);
      }
    }
  }

  componentWillUnmount() {
    for (const tileLayer of tileLayers) {
      for (const leafletLayer of tileLayer.leafletLayers) {
        leafletLayer.removeFrom(this.props.leafletMap);
      }
    }
  }

  // const controlRef = useRef(null);

  // useEffect(() => {
  //   if (props.leafletMap) {
  //     for (const tileLayer of tileLayers) {
  //       for (const leafletLayer of tileLayer.leafletLayers) {
  //         leafletLayer.addTo(props.leafletMap);
  //       }
  //     }
  //   }

  //   if (controlRef.current) {
  //     DomEvent.disableScrollPropagation(controlRef.current);
  //     DomEvent.disableClickPropagation(controlRef.current);
  //   }
  // }, [props, controlRef]);

  render() {
    return (
      <ToastContainer position="bottom-start" className="leaflet-bottom leaflet-left overflow-hidden" tabIndex="0">
        <Toast show={true} className="leaflet-control leaflet-bar overflow-auto" ref={this.controlRef}>
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
                        <h5 className="fs-5">
                          {layer.title}&nbsp;
                          <OverlayTrigger
                            trigger={["focus"]}
                            placement="right"
                            overlay={
                              <Popover>
                                <Popover.Header as="h3">
                                  {layer.title}
                                </Popover.Header>
                                <Popover.Body>
                                  {layer.description}
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <FontAwesomeIcon className="fs-6 text-muted" icon={faInfoCircle} role="button" tabIndex="0" />
                          </OverlayTrigger>
                        </h5>
                      </Col>
                    </Row>
                    <OpacityControl layer={layer} year={this.props.year} />
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
  }
}
