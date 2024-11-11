import type { StyleSpecification } from "maplibre-gl";

export const base: StyleSpecification = {
  version: 8,
  name: "Default",
  sources: {
    openmaptiles: {
      type: "vector",
      url: "https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key=uXfXuebPlkoPXiY3TPcv",
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      maxzoom: 0,
      layout: {
        visibility: "visible",
      },
      paint: {
        "background-color": "rgb(123 162 141)",
      },
    },
  ],
};
