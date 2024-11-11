import { useContext, useEffect } from "react";
import { MapContext } from "~/contexts";
import { mill, terminalStation } from "~/models";

const ThreeDModels = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    if (!map.getLayer(mill.id)) map.addLayer(mill);
    if (!map.getLayer(terminalStation.id)) map.addLayer(terminalStation);

    return () => {
      map.removeLayer(mill.id);
      map.removeLayer(terminalStation.id);
    };
  }, [map]);
  return <></>;
};

export default ThreeDModels;
