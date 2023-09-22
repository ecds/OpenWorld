import React, { useContext, useEffect, useRef, useState } from "react";
import { Offcanvas, Carousel, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Image from '../../components/Image/Image.js';
import Legend from "../../components/Legend.js";
import { MapContext } from "../../map.js";
import { camelToTitle } from "../../utils/stringHelpers.js";
import ToggleButton from "../../components/ToggleButton.tsx";
import { omekaImages, strongStyle, omekaMetadata, shapeFileMetadata, addLayer } from '../../data/BuildingData.js';
import './Buildings.scss';

const BuildingDetails = ({ loaded, building }) => {
  if (loaded) {
    if (building) {
      return (
        <>
          <h5>{building?.title}</h5>
          <p className="lead">{building?.address}</p>
          <p>{building?.description}</p>
          {Object.keys(building.metadata).map((key, index) => {
            if (building.metadata[key]) {
              return (
                <Row as="dl" key={index}>
                  <Col className="text-truncate" sm={12} as="dt">{camelToTitle(key)}</Col>
                  <Col
                    ass="dd"
                    sm={12}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: building.metadata[key],
                    }}
                  />
                </Row>
              );
            } else {
              return (<span key={index}></span>);
            }
          })}
        </>
      );
    }

    return (
      <p>Click a building footprint to learn more.</p>
    );
  }

  return (
    <p><FontAwesomeIcon icon={faSpinner} spin /> Loading Buildings</p>
  );
};

const BuildingImages = ({ building }) => {
  if (building?.images.length > 0) {
    return (
      <Carousel className="my-3" interval={null}>
        {building.images.map(
          (image, index) => {
            return (
              <Carousel.Item key={index}>
                <Image source={image.full} caption={image.caption} />
              </Carousel.Item>
            )
          }
        )}
      </Carousel>
    );
  }

  return <hr />
}

const Buildings = () => {
  const [show, setShow] = useState(true);
  const [allBuildings, setAllBuildings] = useState(null);
  const [showLegend, setShowLegend] = useState(0);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const { leafletMap, year, mapOptions } = useContext(MapContext);

  const currentBuilding = useRef();
  const leafletLayer = useRef();

  useEffect(() => {
    const fetchOmekaData = async () => {
      leafletMap.setZoom(mapOptions.zoom).panTo(mapOptions.center);
      const data = await omekaMetadata();
      setAllBuildings(data);
      setShowLegend(1);
    };

    if (!allBuildings && leafletMap) fetchOmekaData().catch(console.error)
  }, [allBuildings, leafletMap, mapOptions]);

  useEffect( () => {
    const handleClick = async (event) => {
      if (currentBuilding.current) {
        leafletLayer.current.leafletObject.resetFeatureStyle(currentBuilding.current);
      }

      const properties = shapeFileMetadata(event.layer.properties);
      currentBuilding.current = properties.bldgID;
      leafletLayer.current.leafletObject.setFeatureStyle(properties.bldgID, strongStyle(properties));

      const omekaBuilding = await allBuildings.find(building => building.bldgID === properties.bldgID);

      if (omekaBuilding) {
        if (omekaBuilding.fileCount > 0 && omekaBuilding.images.length === 0) {
          omekaBuilding.images = await omekaImages(omekaBuilding.omekaID);
        }

        Object.assign(properties, omekaBuilding);
      }

      setSelectedBuilding(properties);
      setShowLegend(0);
    };

    leafletLayer.current?.leafletObject.removeFrom(leafletMap);
    leafletLayer.current = addLayer(year, currentFilter);

    if (allBuildings) {
      leafletLayer.current?.leafletObject.addTo(leafletMap);
      leafletLayer.current?.leafletObject.on('click', (event) => handleClick(event))
    }

    return ()  => {
      leafletLayer.current?.leafletObject.removeFrom(leafletMap);
      // setAllBuildings(null);
    }
  }, [leafletMap, currentFilter, year, allBuildings]);

  useEffect(() => {
    setSelectedBuilding(null);
  }, [currentFilter]);

  return (
    <>
     <ToggleButton show={!show} toggle={setShow}>Building Details</ToggleButton>
      <Offcanvas show={show} placement="end" scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton onHide={() => { setShow(false) }}>
          <h5>Buildings {year}</h5>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Legend open={showLegend} toggle={setShowLegend} filter={setCurrentFilter} currentFilter={currentFilter} />
          <article className="my-3">
            <BuildingImages building={selectedBuilding} />
            <BuildingDetails loaded={allBuildings?.length > 0} building={selectedBuilding} />
          </article>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Buildings;