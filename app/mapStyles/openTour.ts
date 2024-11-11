import tailwindConfig from "tailwind.config";
import type { StyleSpecification } from "maplibre-gl";

export const tours = [
  {
    title: "1934-1935 run of ‘Imitation of Life’ in Atlanta Movie Theaters",
    slug: "1934-1935-run-of-imitation-of-life-in-atlanta-movie-theaters",
    year: 1934,
    intro: "",
  },
];

export const openTours: StyleSpecification = {
  version: 8,
  name: "Tours",
  sources: {
    "theaters-1934-1935": {
      type: "geojson",
      data: "https://api.opentour.site/openworld-atlanta-tours/geojson_tours/2",
      promoteId: "position",
    },
  },
  layers: [
    {
      id: "theaters-1934-1935",
      type: "circle",
      source: "theaters-1934-1935",
      layout: { visibility: "none" },
      minzoom: 0,
      maxzoom: 20,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-radius": 8,
        "circle-stroke-width": 1,
        "circle-stroke-color": tailwindConfig.theme.extend.colors.white,
        "circle-color": [
          "case",
          ["boolean", ["feature-state", "clicked"], false],
          "#2563eb",
          tailwindConfig.theme.extend.colors.accent,
        ],
      },
    },
  ],
};
