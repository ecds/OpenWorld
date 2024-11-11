import { useContext, useEffect } from "react";
import { mapDefaults } from "~/config";
import { MapContext } from "~/contexts";

const HomePage = () => {
  const { map, setCurrentYear } = useContext(MapContext);
  setCurrentYear(undefined);

  useEffect(() => {
    const { bounds, pitch } = mapDefaults;
    if (map && bounds) {
      map.fitBounds(bounds, {
        pitch,
        speed: 2,
      });
    }
  }, [map]);
  return <></>;
};

export default HomePage;
