import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
// import styles from './OpacityControl.module.scss';

const OpacityControl = (props) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (props.layer.leafletLayers) {
      for (const leafletLayer of props.layer.leafletLayers) {
        if (parseInt(props.layer.year) > parseInt(props.year)) {
          leafletLayer.setOpacity(0);
          setOpacity(0);
        } else {
          leafletLayer.setOpacity(1);
          setOpacity(1);
        }
      }
    }
  }, [props]);

  const updateOpacity = ((event) => {
    let newOpacity = event.target.value;
    if (event.target.type === 'number') {
      newOpacity = newOpacity * 0.01;
    }
    for (const leafletLayer of props.layer.leafletLayers) {
      setOpacity(newOpacity);
      leafletLayer.setOpacity(newOpacity);
    }
  });

  return (
    <>
      <Row>
        <Col>
          Opacity
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="range"
            className="form-range"
            min="0"
            max="1"
            step=".1"
            value={opacity}
            onChange={(event) => updateOpacity(event)}
          />
        </Col>
        <Col xs="auto">
          <input
            type="number"
            min="0"
            max="100"
            step="5"
            value={opacity / 0.01}
            onChange={(event) => updateOpacity(event)}
          />
        </Col>
      </Row>
    </>
  );
}

OpacityControl.defaultProps = { year: 0 };

export default OpacityControl;
