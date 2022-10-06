import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OpenTour from '../components/Layers/OpenTour/OpenTour';


const OpenTourRoute = (props) => {

  let { tour } = useParams();

  useEffect(() => {
    props.setYear(1938)
  })

  return (
    <OpenTour tour={tour} {...props} />
  )
}

export default OpenTourRoute;
