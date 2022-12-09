import { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Offcanvas } from 'react-bootstrap';
import { MapContext } from "../../map.js";
import { Layers, YEARS, addLabels } from '../../data/WardsData';
import ToggleButton from "../../components/ToggleButton.tsx";
import TimeSlider from "../../components/TimeSlider/TimeSlider";

// const setCurrentLayer = (layers, currentLayer, currentYear) => {
//   if (!this.state.layers) return;
//   const closestYear = Math.max(...YEARS.filter(n => {return n <= this.props.currentYear}));
//   if (this.state.currentLayer && this.state.currentLayer.year === closestYear) return;
//   this.clearLayer();
//   const currentLayer = this.state.layers.find(layer => layer.year === closestYear);
//   if (currentLayer) this.setState({ currentLayer }, this.addLayer);
// };

// addLayer() {
//   this.state.currentLayer.leafletLayer.addTo(this.props.leafletMap);
//   this.props.leafletMap.flyToBounds(this.state.currentLayer.leafletLayer.getBounds());
//   const labels = addLabels(this.props.leafletMap, this.state.currentLayer.leafletLayer);
//   this.setState( { labels })
// }

const clearLayers = (map, layers, labels) => {
  layers?.forEach(layer => layer.leafletLayer.removeFrom(map));
  labels?.forEach(label => label.removeFrom(map));
}

const YearDetails = ({ details }) => {
  if (details) {
    return (
      <>
        <h5>{details.title}</h5>
        <p className="lead">{details.intro}</p>
        <dl className="row">
          { details.wards.map((ward, index) => {
            return(
              <span key={index}>
              <dt className="col-sm-3">{ward.title}</dt>
              <dd className="col-sm-9"><p>{ward.description}</p></dd>
              </span>
            )
          })}
        </dl>
      </>
    );
  }

  return (
    <>
      <h5>Atlanta’s Wards</h5>
      <p>From its incorporation in 1847, the municipal boundaries of Atlanta, Georgia, United States, were extended repeatedly from a small area around its railroad station to today's city covering 131.7 square miles (341 km2).</p>
      <p>Prior to 1954, Atlanta was divided into political divisions called wards. The number of wards were increased as the city grew.</p>
      <p>Use the form field or slider above to select a year to see how Atlanta's Wards changed over time.</p>
    </>
  )
}

const Wards = () => {
  const { leafletMap, mapOptions } = useContext(MapContext);

  const [show, setShow] = useState(true);
  const [currentYear, setCurrentYear] = useState(Math.min(...YEARS));
  const [layers, setLayers] = useState(null);
  const [currentDetails, setCurrentDetails] = useState(null);
  // const [currentLabels, setCurrentLabels] = useState(null);

  const currentLayer = useRef();
  const currentLabels = useRef();

  const [searchParams, setSearchParams] = useSearchParams();

  const updateYear = (year) => {
    setSearchParams({ year });
    setCurrentYear(year);
  };

  useEffect(() => {
    if (searchParams.has('year')) {
      setCurrentYear(parseInt(searchParams.get('year')));
    } else {
      setSearchParams({ year: currentYear });
    }

  }, [currentYear, searchParams, setSearchParams]);


  useEffect(() => {
    const fetchLayers = async () => {
      const fetchedLayers = await Layers();
      setLayers(fetchedLayers);
      // leafletMap?.panTo(mapOptions.center).setZoom(mapOptions.zoom - 2);
    };

    if (!layers) fetchLayers();

    return () => {
      clearLayers(leafletMap, layers, currentLabels.current);
    };
  }, [leafletMap, layers, mapOptions, currentLabels]);

  useEffect(() => {
    if (leafletMap && layers) {

      if (currentYear < Math.min(...YEARS) && currentLayer.current) {
        clearLayers(leafletMap, layers, currentLabels.current);
        currentLayer.current = null;
        currentLabels.current = null;
        setCurrentDetails(null);
      } else {
        const closestYear = Math.max(...YEARS.filter(n => { return n <= currentYear }));
        const closestLayer = layers.find(layer => layer.year === closestYear);

        if (
          closestLayer !== currentLayer.current &&
          closestLayer && !leafletMap.hasLayer(closestLayer)
        ) {
          clearLayers(leafletMap, layers, currentLabels.current);
          closestLayer.leafletLayer.addTo(leafletMap);
          currentLayer.current = closestLayer;
          currentLabels.current = addLabels(leafletMap, closestLayer.leafletLayer);
          currentLabels.current?.forEach(label => label.addTo(leafletMap));
          setCurrentDetails(closestLayer.details)
        }
      }
    }
  }, [currentYear, leafletMap, layers]);

  return (
    <>
      <Offcanvas show={show} placement="end" scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton onHide={() => setShow(false)}>
          <h5>Wards</h5>
        </Offcanvas.Header>
        <TimeSlider years={YEARS} currentYear={currentYear} setYear={updateYear} label="City Wards in" />
        <Offcanvas.Body>
          <article>
            <YearDetails details={currentDetails} />
          </article>
        </Offcanvas.Body>
      </Offcanvas>
      <ToggleButton show={!show} toggle={setShow}>Ward Details</ToggleButton>
    </>
  )
};

export default Wards;
