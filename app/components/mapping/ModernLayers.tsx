import { useContext, useEffect, useState } from "react";
import { MapContext } from "~/contexts";
import LayerOpacity from "./LayerOpacity";

import type { AddLayerObject } from "maplibre-gl";
import { useLocation } from "@remix-run/react";

interface Props {
  layer: { id: string; layers: AddLayerObject[] };
}

const ModernLayers = ({ layer }: Props) => {
  const [opacity, setOpacity] = useState<number>(0);
  const { map } = useContext(MapContext);
  const location = useLocation();

  useEffect(() => {
    setOpacity(0);
  }, [location]);

  useEffect(() => {
    if (!map) return;

    const adjustedOpacity = opacity * 0.01;

    for (const styleLayer of layer.layers) {
      switch (styleLayer.type) {
        case "line":
          map.setPaintProperty(styleLayer.id, "line-opacity", adjustedOpacity);
          break;
        case "fill":
          map.setPaintProperty(styleLayer.id, "fill-opacity", adjustedOpacity);
          break;
        case "symbol":
          map.setPaintProperty(styleLayer.id, "text-opacity", adjustedOpacity);
          break;
        case "raster":
          map.setPaintProperty(
            styleLayer.id,
            "raster-opacity",
            adjustedOpacity
          );
        default:
          break;
      }

      map.setLayoutProperty(
        styleLayer.id,
        "visibility",
        opacity > 0 ? "visible" : "none"
      );
    }
  }, [map, opacity, layer]);

  const handleOpacityChange = (newValue: string) => {
    setOpacity(parseInt(newValue));
  };

  return (
    <div className="b border-b-2 border-black/25 mb-4 pb-2">
      <h2 className="text-xl capitalize">Modern {layer.id}</h2>
      <LayerOpacity
        id={layer.id}
        handleChange={handleOpacityChange}
        opacity={opacity}
        disabled={false}
      />
    </div>
  );
};

export default ModernLayers;
