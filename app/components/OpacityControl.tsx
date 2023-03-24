import { useContext, useEffect, useState } from "react";
import MapContext from "~/mapContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun as fasSun } from '@fortawesome/free-solid-svg-icons';
import { faSun as farSun } from '@fortawesome/free-regular-svg-icons';
import { Col, Row } from 'react-bootstrap';

export default function OpacityControl({ layer }) {
  const { mapState, currentYearState } = useContext(MapContext);
  const [ opacityState, setOpacityState ] = useState<float>(0.0);

  useEffect(() => {
    setOpacityState(currentYearState === layer.year ? 1.0 : 0.0);
  }, [setOpacityState, currentYearState, layer]);

  useEffect(() => {
    if (mapState?.getLayer(layer.layer.id)) {
      mapState?.setPaintProperty(
        layer.layer.id,
        'raster-opacity',
        parseFloat(opacityState)
      );
    }
  }, [opacityState, layer.layer.id, mapState]);

  return (
    <Row>
    <Col className="fs-6 mt-1" sm={1}>
        <span
          role="button"
          tabIndex={0}
          aria-label={`Toggle opacity for tile layer ${layer.title}`}
          onClick={() => setOpacityState(opacityState > 0 ? 0 : 1)}
          onKeyDown={() => setOpacityState(opacityState > 0 ? 0 : 1)}
        >
          <FontAwesomeIcon
            icon={opacityState === 0 ? farSun : fasSun}
            style={{ opacity: opacityState === 0 ? 1 : opacityState + .2 }}
          />
        </span>
      </Col>
      <Col className="mt-1" sm={7}>
        <input
          type="range"
          className="form-range"
          min="0"
          max="1"
          step=".05"
          aria-label={`Set opacity for base layer ${layer.title ?? ""}`}
          value={opacityState}
          onChange={({ target }) => setOpacityState(target.value)}
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
            value={opacityState / 0.01}
            onChange={({ target }) => setOpacityState(target.value * 0.01)}
          />
          <span className="input-group-text">%</span>
        </div>
      </Col>
    </Row>
  )
}