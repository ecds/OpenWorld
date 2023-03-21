import maplibregl from "maplibre-gl";
import { useContext, useEffect, useRef, useState } from "react";
import MapContext from '~/mapContext';
import * as BABYLON from "@babylonjs/core";
import { modelLayer } from "~/data/model";

export default function BaseMap() {
  const { mapState, setMapState } = useContext(MapContext);
  const mapContainerRef = useRef();

  useEffect(() => {
    let map = undefined;
    if (!mapState && mapContainerRef.current) {
      map = new maplibregl.Map({
        container: "map",
        center: [-84.3891, 33.7528],
        zoom: 16,
        pitch: 45,
        style: {
          version: 8,
          sources: {
            modernTerrain: {
              type: 'raster',
              tiles: ['https://api.mapbox.com/styles/v1/jayvarner/ck9n8d4rj02bh1iom9elzka33/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamF5dmFybmVyIiwiYSI6ImVkYjliN2Y3ZDZlYzEyNzg5NDhiMGU4MWRiZTY3Mzk3In0.U4Sc4HVk2F4MkKyd7ybgXw&fresh=true'],
              tileSize: 256,
              maxzoom: 19
            }
          },
          layers: [
            {
              id: 'modernTerrain',
              type: 'raster',
              source: 'modernTerrain'
            }
          ]
        }
      });
      setMapState(map);

      // map.on('style.load', function () {
      //   map.addLayer(modelLayer);
      //   });
    }

    return () => {
      map.remove();
      setMapState(undefined);
    }
  }, [setMapState, mapContainerRef]);

  return (
    <div ref={mapContainerRef} id="map"></div>
  )
}