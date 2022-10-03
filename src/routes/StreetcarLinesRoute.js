import React from 'react';
import { useParams } from 'react-router-dom';
import StreetcarLines from '../components/Layers/StreetcarLines/StreetcarLines';


const StreetcarLinesRoute = (props) => {
  let { year } = useParams();

  return (
    <StreetcarLines year={year} {...props} />
  )
}

export default StreetcarLinesRoute;
