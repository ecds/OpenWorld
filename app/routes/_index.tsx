import { useContext, useEffect } from "react";
import { mapDefaults } from "~/config";
import { MapContext } from "~/contexts";

const HomePage = () => {
  const { map } = useContext(MapContext);

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
