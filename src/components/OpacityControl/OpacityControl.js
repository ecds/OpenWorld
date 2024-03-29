import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun as fasSun } from '@fortawesome/free-solid-svg-icons';
import { faSun as farSun } from '@fortawesome/free-regular-svg-icons';
import { Col, Row } from 'react-bootstrap';
import { YEARS } from '../../data/TileLayers';

const OpacityControl = ({ layer, year }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (layer.leafletLayers) {
      for (const leafletLayer of layer.leafletLayers) {
        if (Math.max(...YEARS.filter(y => y <= year)) === layer.year) {
          leafletLayer.setOpacity(1);
          setOpacity(1);
        } else {
          leafletLayer.setOpacity(0);
          setOpacity(0);
        }
      }
    }
  }, [year, layer]);

  const updateOpacity = ((event) => {
    const newOpacity  = event.target.type === 'number' ? event.target.value * 0.01 : parseFloat(event.target.value);
    updateLeafletOpacity(newOpacity);
  });

  const toggleOpacity = ((event) => {
    const allowedKeyEvents = ['Enter', 'Space'];

    if (event && !allowedKeyEvents.includes(event.code)) return;

    const newOpacity = opacity > 0 ? 0 : 1;
    updateLeafletOpacity(newOpacity);
  });

  const updateLeafletOpacity = ((newOpacity) => {
    setOpacity(newOpacity);
    for (const leafletLayer of layer.leafletLayers) {
      leafletLayer.setOpacity(newOpacity);
    }
  });

  return (
    <>
      <Row>
        <Col className="fs-6 mt-1" sm={1}>
          <span role="button" tabIndex={0} onClick={() => toggleOpacity()} onKeyDown={(event) => toggleOpacity(event)} aria-label={`Toggle opacity for tile layer ${layer.title}`}>
            <FontAwesomeIcon
              icon={opacity === 0 ? farSun : fasSun}
              style={{ opacity: opacity === 0 ? 1 : opacity + .2 }}
            />
          </span>
          {/* <FontAwesomeIcon icon={["fas", "coffee"]} /> */}
        </Col>
        <Col className="mt-1" sm={7}>
          <input
            type="range"
            className="form-range"
            min="0"
            max="1"
            step=".05"
            aria-label={`Set opacity for base layer ${layer.title}`}
            value={opacity}
            onChange={(event) => updateOpacity(event)}
          />
        </Col>
        <Col sm={4}>
          <div className="input-group input-group-sm">
            <input
              type="number"
              className="form-control form-control-sm pe-0"
              min="0"
              max="100"
              step="5"
              aria-label={`Set opacity for base layer ${layer.title}`}
              value={opacity / 0.01}
              onChange={(event) => updateOpacity(event)}
            />
            <span className="input-group-text">%</span>
          </div>
        </Col>
      </Row>
    </>
  );
}

OpacityControl.defaultProps = { year: 0 };

export default OpacityControl;
