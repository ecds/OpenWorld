import maplibregl from "maplibre-gl";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "~/contexts";
import { mapDefaults } from "~/config";
import { combined } from "~/mapStyles";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Map = ({ children }: Props) => {
  const { setMap, setMapLoaded } = useContext(MapContext);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!setMap || !mapContainerRef.current) return;

    let _map: maplibregl.Map | undefined = undefined;

    const { bounds, zoom } = mapDefaults;
    try {
      _map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: combined,
        center: bounds?.getCenter(),
        zoom,
        preserveDrawingBuffer: true,
        attributionControl: false,
      });

      if (bounds) _map.fitBounds(bounds, { speed: 2 });

      _map.on("load", () => {
        setMap(_map);
        setMapLoaded(true);
      });
    } catch {}

    return () => {
      try {
        // if (_map) {
        //   _map.remove();
        // }
        setMap(undefined);
        setMapLoaded(false);
      } catch {}
    };
  }, [setMap, setMapLoaded]);

  return (
    <div className="relative">
      <div ref={mapContainerRef} className={`h-screen`}></div>
      {children}
    </div>
  );
};

export default Map;
