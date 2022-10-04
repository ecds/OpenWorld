import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { YEARS } from '../components/Layers/Wards/data';
import Wards from '../components/Layers/Wards/Wards';


const WardRoute = (props) => {
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
    <Wards currentYear={parseInt(currentYear)} updateYear={updateYear} {...props} />
  );
}

export default WardRoute;
