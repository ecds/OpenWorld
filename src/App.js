import './App.scss';
import MainNav from './components/MainNav/MainNav';
import ErrorPage from './components/ErrorPage/ErrorPage';
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import TileLayers from './components/Layers/TileLayers/TileLayers';
import AnnexationRoute from './routes/AnnexationRoute';
import BuildingsRoute from './routes/BuildingsRoute';
import StreetcarLinesRoute from './routes/StreetcarLinesRoute';
import WardRoute from './routes/WardsRoute';
import OpenTourRoute from './routes/OpenTourRoute';
import StoryMapRoute from './routes/StoryMapRoute';

function App() {
  const [leafletMap, setLeafletMap] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    const mapOptions = {
      center:      [33.75432, -84.38979],
      minZoom:     11,
      zoom:        13,
      maxZoom:     20,
      zoomControl: true,
      maxBounds:   [[33.53, -84.61], [34.03, -84.11]]
    };

    try {
      const map = L.map('map', mapOptions);

      L.tileLayer('https://api.mapbox.com/styles/v1/jayvarner/ck9n8d4rj02bh1iom9elzka33/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamF5dmFybmVyIiwiYSI6ImVkYjliN2Y3ZDZlYzEyNzg5NDhiMGU4MWRiZTY3Mzk3In0.U4Sc4HVk2F4MkKyd7ybgXw', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      const boundaryPane = map.createPane('whole');
      boundaryPane.style.zIndex = 400;

      const annexPane = map.createPane('part');
      annexPane.style.zIndex = 400;

      setLeafletMap(map);
      setTimeout(() => { map.invalidateSize() }, 100);
    } catch {
      /*
        This is probably only an issue in development when the the component is mounted
        and unmounted. I have tried destroying the map in the return function, but it
        does not get recreated in time for all the layers. It doesn't really matter because
        this will never be unmounted.
      */
    }

  }, [leafletMap]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainNav setYear={setYear} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "buildings/:year",
          element: <BuildingsRoute leafletMap={leafletMap} />
        },
        {
          path: 'annexations',
          element: <AnnexationRoute leafletMap={leafletMap} />
        },
        {
          path: 'wards',
          element: <WardRoute leafletMap={leafletMap} />
        },
        {
          path: 'streetcars/:year',
          element: <StreetcarLinesRoute leafletMap={leafletMap} />
        },
        {
          path: 'features/:tour',
          element: <OpenTourRoute leafletMap={leafletMap} setYear={setYear} />
        },
        {
          path: 'stories/:story',
          element: <StoryMapRoute />
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <div id="map"></div>
      <TileLayers leafletMap={leafletMap} year={year} />
    </div>
  );
}

export default App;
