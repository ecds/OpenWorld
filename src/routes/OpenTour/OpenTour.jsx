import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Offcanvas, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Tour, markerIcon, activeMarkerIcon } from '../../data/OpenTourData';
import { MapContext } from '../../map';
import ToggleButton from "../../components/ToggleButton.tsx";
import Image from '../../components/Image/Image.js';
import './OpenTour.scss';

const Images = ({ images }) => {
  if (images?.length > 0) {
    return (
      <Carousel className="my-3" interval={null}>
        {images.map(
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

const Content = ({ details }) => {
  if (details) {
    return (
      <article className='owa-opentour-article'>
        <Images images={details.images} />
        <h5 className="mt-5">{details.position ? `${details.position}: ${details.title}` : ''}</h5>
        <section dangerouslySetInnerHTML={{__html: details.description}}></section>
      </article>
    );
  }

  return <span><FontAwesomeIcon icon={faSpinner} spin /> Loading Tour</span>;
}

const OpenTour = ({ setYear }) => {
  const { leafletMap } = useContext(MapContext);
  const setSearchParams = useSearchParams()[1];

  const { tour } = useParams();

  const [tourDetails, setTourDetails] = useState(null);
  const [tourLayer, setTourLayer] = useState(null);

  const [show, setShow] = useState(true);
  const [layerDetails, setLayerDetails] = useState(null);
  // const [activeMarker, setActiveMarker] = useState('poop');

  // const handleHide = () => {
  //   if (this.state.activeMarker) this.resetMarker();
  //   this.setState(
  //     {
  //       show: false,
  //       layerDetails: this.state.tourDetails.intro,
  //       activeMarker: null
  //     }
  //   )
  // };

  useEffect(() => {
    const fetchTour = async () => {
      const { leafletLayer, details } = await Tour(tour);
      setTourLayer(leafletLayer);
      setTourDetails(details);
      setSearchParams({ year: details.year });
    }

    if (!tourLayer && leafletMap) fetchTour();

  }, [tourLayer, tourDetails, leafletMap, setSearchParams, tour, layerDetails]);

  useEffect(() => {
    const handleClick = ({ type, layer }) => {
      if (type === 'popupclose') {
        setLayerDetails(tourDetails.intro);
        layer.setIcon(markerIcon(layer.feature.properties));
      } else {
        layer.setIcon(activeMarkerIcon(layer.feature.properties));
        setLayerDetails(layer.feature.properties);
        setShow(true);
      }
    };

    tourLayer?.addTo(leafletMap);
    tourLayer?.on('click', (event) => handleClick(event));
    tourLayer?.on('popupopen', (event) => handleClick(event));
    tourLayer?.on('popupclose', (event) => handleClick(event));
    tourLayer?.addTo(leafletMap);
    if (tourLayer) leafletMap.flyToBounds(tourLayer.getBounds());
    setLayerDetails(tourDetails?.intro);

    return () => {
      tourLayer?.removeFrom(leafletMap);
    }
  }, [tourLayer, leafletMap, tourDetails]);

  return (
    <>
      <Offcanvas show={show} placement="end" scroll={true} backdrop={false}>
        <Offcanvas.Header closeButton onHide={() => setShow(false)}>
          <h5>{tourDetails?.title}</h5>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Content details={layerDetails} />
        </Offcanvas.Body>
      </Offcanvas>
      <ToggleButton show={!show} toggle={setShow}>Tour Details</ToggleButton>
    </>
  );
};

export default OpenTour;
