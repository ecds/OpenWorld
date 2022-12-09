import MainNav from './components/MainNav/MainNav';
import ErrorPage from './components/ErrorPage/ErrorPage';
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import TileLayers from './components/TileLayers/TileLayers';
import Annexations from './routes/Annexations/Annexations';
import Buildings from './routes/Buildings/Buildings';
import StreetcarLines from './routes/StreetcarLines/StreetcarLines';
import Wards from './routes/Wards/Wards';
import OpenTour from './routes/OpenTour/OpenTour';
import StoryMap from './routes/StoryMap/StoryMap';
import LatLngContext from './components/LatLngContext';
import { MapContext } from './map';
import './App.scss';

const mapOptions = {
  center:      [33.7528, -84.3891],
  minZoom:     13,
  zoom:        15,
  maxZoom:     20,
  zoomControl: true,
  maxBounds:   [[33.53, -84.61], [34.03, -84.11]],
  attributionControl: false
};

function App() {
  const [leafletMap, setLeafletMap] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    try {
      const map = L.map('map', mapOptions);

      const contextPopup = L.popup();

      const showContext = (event) => {
        contextPopup
            .setLatLng(event.latlng)
            .setContent(LatLngContext(event.latlng, contextPopup))
            .openOn(map);
      }

      L.tileLayer('https://api.mapbox.com/styles/v1/jayvarner/ck9n8d4rj02bh1iom9elzka33/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamF5dmFybmVyIiwiYSI6ImVkYjliN2Y3ZDZlYzEyNzg5NDhiMGU4MWRiZTY3Mzk3In0.U4Sc4HVk2F4MkKyd7ybgXw&fresh=true', {
        maxZoom: 19
      }).addTo(map);

      const boundaryPane = map.createPane('whole');
      boundaryPane.style.zIndex = 400;

      const annexPane = map.createPane('part');
      annexPane.style.zIndex = 400;

      map.on('contextmenu', showContext);

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
          element: <Buildings />
        },
        {
          path: 'annexations',
          element: <Annexations />
        },
        {
          path: 'wards',
          element: <Wards />
        },
        {
          path: 'streetcars/:year',
          element: <StreetcarLines />
        },
        {
          path: 'tours/:tour',
          element: <OpenTour setYear={setYear} />
        },
        {
          path: 'stories/:story',
          element: <StoryMap />
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <MapContext.Provider value={{ leafletMap, year, mapOptions }}>
        <RouterProvider router={router} />
        <div id="map"></div>
        <TileLayers />
      </MapContext.Provider>
    </div>
  );
}

export default App;
