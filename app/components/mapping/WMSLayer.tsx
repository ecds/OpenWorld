import { useContext, useEffect, useState } from "react";
import LayerOpacity from "./LayerOpacity";
import { MapContext } from "~/contexts";
import type { THistoricLayer } from "~/types";
import { historicMaps } from "~/data/mapLayers";

const YEARS = historicMaps.map((layer) => layer.year);

interface Props {
  layer: THistoricLayer;
}

const WMSLayer = ({ layer }: Props) => {
  const { map, currentYear } = useContext(MapContext);
  const [opacity, setOpacity] = useState<number>();

  useEffect(() => {
    if (map && map.getLayer(layer.id)) {
      setOpacity(map.getPaintProperty(layer.id, "raster-opacity") as number);
    }
  }, [map, layer]);

  useEffect(() => {
    if (
      map &&
      layer &&
      map.getLayer(layer.id) &&
      typeof opacity == "number" &&
      opacity >= 0
    ) {
      map.setPaintProperty(layer.id, "raster-opacity", opacity * 0.01);
    }
  }, [map, layer, opacity]);

  useEffect(() => {
    if (opacity) map?.setLayoutProperty(layer.id, "visibility", "visible");
  }, [opacity, map, layer]);

  useEffect(() => {
    if (currentYear && map && YEARS.includes(currentYear)) {
      if (layer.year === currentYear) {
        setOpacity(100);
      } else {
        setOpacity(0);
      }
    } else {
      setOpacity(0);
    }
  }, [currentYear, map, layer]);

  const handleOpacityChange = (newValue: string) => {
    setOpacity(parseInt(newValue));
  };

  return (
    <div className="b border-b-2 border-black/25 mb-4 pb-2">
      <h2 className="text-xl">{layer.title}</h2>
      <LayerOpacity
        id={layer.id}
        handleChange={handleOpacityChange}
        opacity={opacity}
        disabled={false}
      />
    </div>
  );
};

export default WMSLayer;
