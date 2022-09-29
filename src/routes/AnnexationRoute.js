import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { YEARS } from '../components/Layers/Annexations/data';
import Annexations from '../components/Layers/Annexations/Annexations';


const AnnexationRoute = (props) => {
  const startYear = Math.min(...YEARS) - 1;

  const [searchParams, setSearchParams] = useSearchParams();
  let [currentYear, setCurrentYear] = useState(null);

  const updateYear = (year) => {
    setSearchParams({ year });
  }

  useEffect(() => {
    setCurrentYear(searchParams.get('year'));

    if (searchParams.has('year')) {
      setCurrentYear(parseInt(searchParams.get('year')));
    } else {
      setSearchParams({ year: startYear });
    }

  }, [currentYear, searchParams, startYear, setSearchParams])

  return (
    <Annexations currentYear={currentYear} updateYear={updateYear} {...props} />
  );
}

export default AnnexationRoute;
