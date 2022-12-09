import { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Offcanvas } from 'react-bootstrap';
import { MapContext } from "../../map.js";
import { AnnexLayers, Boundaries, YEARS } from '../../data/AnnexationsData';
import ToggleButton from "../../components/ToggleButton.tsx";
import TimeSlider from "../../components/TimeSlider/TimeSlider";
import './Annexations.scss'

const Content = ({ content, year }) => {
  if (content) {
    return (
      <article>
        <h4>Area Annexed in {year}</h4>
        <p>{content}</p>
      </article>
    )
  }

  return (
    <article>
      <h4>City Growth Through the Years</h4>
      <p>
        Use the form field or slider above to select a year to see how
        Atlanta grew over time.
      </p>
    </article>
  );
};

const Annexations = () => {
  const { leafletMap, mapOptions } = useContext(MapContext);

  const startYear = Math.min(...YEARS) - 1;
  // const endYear = Math.max(...YEARS) + 1;

  const [searchParams, setSearchParams] = useSearchParams();

  const [show, setShow] = useState(true);
  const [currentYear, setCurrentYear] = useState(null);
  const [annexLayers, setAnnexLayers] = useState(null);
  const [boundaryLayers, setBoundaryLayers] = useState(null);
  const [layerDetails, setLayerDetails] = useState(null);

  const currentAnnex = useRef();
  const currentBoundary = useRef();

  const updateYear = (year) => {
    setSearchParams({ year });
    setCurrentYear(year);
  };

  useEffect(() => {
    const fetchLayers = async () => {
      const fetchedAnnexLayers = await AnnexLayers();
      const fetchedBoundaryLayers = await Boundaries();
      setAnnexLayers(fetchedAnnexLayers);
      setBoundaryLayers(fetchedBoundaryLayers);
      leafletMap?.panTo(mapOptions.center).setZoom(mapOptions.zoom - 2);
    };

    if (!boundaryLayers) fetchLayers();

    return () => {
      boundaryLayers?.forEach(boundary => boundary.leafletLayer.removeFrom(leafletMap));
      annexLayers?.forEach(annex => annex.leafletLayer.removeFrom(leafletMap));
    };
  }, [leafletMap, boundaryLayers, annexLayers, mapOptions]);

  useEffect(() => {
    if (searchParams.has('year')) {
      setCurrentYear(parseInt(searchParams.get('year')));
    } else {
      setSearchParams({ year: startYear });
    }

  }, [currentYear, searchParams, startYear, setSearchParams]);

  useEffect(() => {
    const clearLayers = () => {
      boundaryLayers?.forEach(boundary => boundary.leafletLayer.removeFrom(leafletMap));
      annexLayers?.forEach(annex => annex.leafletLayer.removeFrom(leafletMap));
    };

    if (annexLayers && boundaryLayers && leafletMap) {
      if (currentYear < Math.min(...YEARS) && currentBoundary.current) {
        clearLayers(leafletMap);
        currentAnnex.current = null;
        currentBoundary.current = null;
        setLayerDetails(null);
      } else {
        const closestYear = Math.max(...YEARS.filter(n => { return n <= currentYear }));
        const closestAnnex = annexLayers.find(layer => parseInt(layer.year) === parseInt(closestYear));
        const closestBoundary = boundaryLayers.find(layer => parseInt(layer.year) === parseInt(closestYear));

        if (
          closestAnnex &&
          closestAnnex !== currentAnnex.current &&
          !leafletMap.hasLayer(closestAnnex)
        ) {
          clearLayers();
          closestAnnex.leafletLayer.addTo(leafletMap);
          closestBoundary.leafletLayer.addTo(leafletMap);
          currentAnnex.current = closestAnnex;
          currentBoundary.current = closestBoundary;
          setLayerDetails(closestBoundary.details);
        }
      }
    }
  }, [boundaryLayers, annexLayers, leafletMap, currentAnnex, currentBoundary, currentYear]);

  return (
    <>
      <Offcanvas show={show} placement="end" scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton onHide={() => setShow(false)}><h5>Annexations</h5></Offcanvas.Header>
        <Offcanvas.Body>
        <TimeSlider years={YEARS} currentYear={currentYear} setYear={updateYear} label="City Boundaries in" />
          <Content year={currentYear} content={layerDetails} />
        </Offcanvas.Body>
      </Offcanvas>
      <ToggleButton show={!show} toggle={setShow}>Annexation Details</ToggleButton>
    </>
  );
}

export default Annexations;
