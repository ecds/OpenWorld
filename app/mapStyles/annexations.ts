import { geojsonURL } from "~/utils";
import type { StyleSpecification } from "maplibre-gl";

export const annexations: StyleSpecification = {
  version: 8,
  name: "Annexations 1847-1945",
  sources: {
    "annexations_1847-1945": {
      type: "geojson",
      data: geojsonURL({
        layer: "annexations_1847-1945",
        workspace: "AtlantaAnnexations",
      }),
      promoteId: "Identifier",
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: "annexations_1847-1945",
      type: "fill",
      source: "annexations_1847-1945",
      layout: { visibility: "none" },
      minzoom: 0,
      maxzoom: 20,
      paint: {
        "fill-color": "#E65100",
        "fill-opacity": 0,
      },
      filter: [
        "all",
        ["==", ["get", "TYPE"], "annexation"],
        ["in", "part", ["get", "id"]],
      ],
    },
    {
      id: "annexations_1847-1945-outlines",
      source: "annexations_1847-1945",
      type: "line",
      layout: { visibility: "none" },
      paint: {
        "line-color": "#0D47A1",
        "line-width": 2,
      },
    },
  ],
};
