import React, { useContext, useEffect, useState } from "react";
// import Layer, { determineSize } from '../Layer.js';
import { Offcanvas } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import StreetcarLayers, { dehighlightGeoJSON, highlightGeoJSON } from '../../data/StreetcarLineData';
import { MapContext } from '../../map';
import ToggleButton from "../../components/ToggleButton.tsx";
import './StreetcarLines.scss';

const Content = ({ layers }) => {
  if (layers?.length > 0) {
    return (
      <ul className="list-unstyled">
        {layers.map((layer, index) => {
          return(
            <li
              key={index}
              tabIndex={0}
              className="fs-5 my-2 p-2 fw-semibold"
              style={{backgroundColor: layer.leafletObject.options.color, cursor: 'pointer', color: layer.leafletObject.options.fillColor}}
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
    )
  }

  return <span><FontAwesomeIcon icon={faSpinner} spin /> Loading Routes</span>
}

const StreetcarLines = () => {
  const { leafletMap, year, mapOptions } = useContext(MapContext);
  const [streetcarLines, setStreetcarLines] = useState(null);
  const [show, setShow] = useState(true);


  useEffect(() => {
    const fetchLayers = async () => {
      leafletMap.setZoom(mapOptions.zoom - 1).panTo(mapOptions.center);
      const layers = await StreetcarLayers(year);
      setStreetcarLines(layers);
      for (const layer of layers) {
        if (!leafletMap.hasLayer(layer.leafletObject)) {
          layer.leafletObject.addTo(leafletMap);
        }
      }
    };

    if (!streetcarLines && leafletMap && year) fetchLayers();

    return () => {
      if (streetcarLines) {
        for (const layer of streetcarLines) {
          layer.leafletObject.removeFrom(leafletMap);
        }

        setStreetcarLines(null);
      }
    }
  }, [leafletMap, streetcarLines, year, mapOptions]);

  return (
    <>
      <Offcanvas show={show} placement="end" scroll={true} backdrop={false}>
        <Offcanvas.Header onHide={() => setShow(false)}>
          <span className="fs-5">StreetcarLines {year}</span>
          <CloseButton onClick={() => setShow(false)}/>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Content layers={streetcarLines} />
        </Offcanvas.Body>
      </Offcanvas>
      <ToggleButton show={!show} toggle={setShow}>Streetcar Line Details</ToggleButton>
     </>
  );
}

export default StreetcarLines;
