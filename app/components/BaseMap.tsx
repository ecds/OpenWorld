import maplibregl from "maplibre-gl";
import { useContext, useEffect, useRef } from "react";
import MapContext from '~/mapContext';
import lngLatContext from "./lngLatContext";

export default function BaseMap() {
  const { mapState, setMapState, center } = useContext(MapContext);
  const mapContainerRef = useRef();

  useEffect(() => {
    let map = undefined;
    if (!mapState && mapContainerRef.current) {
      map = new maplibregl.Map({
        container: "map",
        center,
        zoom: 16,
        style: {
          version: 8,
          sources: {
            modernTerrain: {
              type: 'raster',
              tiles: [
                'https://api.mapbox.com/styles/v1/jayvarner/ck9n8d4rj02bh1iom9elzka33/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamF5dmFybmVyIiwiYSI6ImVkYjliN2Y3ZDZlYzEyNzg5NDhiMGU4MWRiZTY3Mzk3In0.U4Sc4HVk2F4MkKyd7ybgXw&fresh=true',
              ],
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

      const nav = new maplibregl.NavigationControl({ visualizePitch: true });
      map.addControl(nav, 'top-left');

      setMapState(map);

      map.on('contextmenu', ({ lngLat }) => {
        console.log("🚀 ~ file: BaseMap.tsx:50 ~ map.on ~ lngLat:", lngLat)
        const popup = new maplibregl.Popup();
        popup.setLngLat(lngLat);
        popup.setDOMContent(lngLatContext(lngLat, popup));
        popup.addTo(map);
      });

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