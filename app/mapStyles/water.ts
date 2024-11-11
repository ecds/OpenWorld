import type { StyleSpecification } from "maplibre-gl";

export const water: StyleSpecification = {
  version: 8,
  name: "Water",
  sources: {
    openmaptiles: {
      type: "vector",
      url: "https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key=uXfXuebPlkoPXiY3TPcv",
    },
  },
  layers: [
    {
      id: "water",
      type: "fill",
      source: "openmaptiles",
      layout: { visibility: "visible" },
      "source-layer": "water",
      filter: [
        "all",
        ["==", ["geometry-type"], "Polygon"],
        ["!=", ["get", "brunnel"], "tunnel"],
      ],
      paint: { "fill-color": "hsl(205,56%,73%)" },
    },
    {
      id: "waterway",
      type: "line",
      source: "openmaptiles",
      "source-layer": "waterway",
      filter: [
        "all",
        ["==", ["geometry-type"], "LineString"],
        ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ],
      layout: { visibility: "visible" },
      paint: {
        "line-color": "hsl(205,56%,73%)",
        "line-opacity": 1,
        "line-width": [
          "interpolate",
          ["exponential", 1.4],
          ["zoom"],
          8,
          1,
          20,
          8,
        ],
      },
    },
  ],
};
