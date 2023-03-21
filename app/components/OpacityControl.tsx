import { useContext, useEffect, useState } from "react";
import MapContext from "~/mapContext";
import { Col, Row } from 'react-bootstrap';

export default function OpacityControl({ layer }) {
  const { mapState, currentYearState } = useContext(MapContext);
  const [ opacityState, setOpacityState ] = useState<float>(0.0);

  useEffect(() => {
    console.log("🚀 ~ file: OpacityControl.tsx:11 ~ useEffect ~ year === layer.year:", currentYearState, layer.year)
    setOpacityState(currentYearState === layer.year ? 1.0 : 0.0);
  }, [setOpacityState, currentYearState, layer]);

  useEffect(() => {
    mapState?.setPaintProperty(layer.id, 'raster-opacity', parseFloat(opacityState));
  }, [opacityState]);

  return (
    <Row>
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
    </Row>
  )
}