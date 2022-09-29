import React from 'react';
import { useParams } from 'react-router-dom';
import Buildings from '../components/Layers/Buildings/Buildings';


const BuildingsRoute = (props) => {

  let { year } = useParams();

  return (
    <Buildings year={year} {...props} />
  )
}

export default BuildingsRoute;
