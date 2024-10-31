import { geojsonURL } from "~/utils";
import { streetcarLines } from "~/data/streetcarData";

import type {
  DataDrivenPropertyValueSpecification,
  StyleSpecification,
} from "maplibre-gl";

const lineColors = (year: number) => {
  const colors: [string | [string, [string, string], string]] = ["case"];
  for (const line of streetcarLines) {
    colors.push(["==", ["get", "Route_num"], line.number.toString()]);
    colors.push(line.color);
  }
  colors.push("black");
  return colors as DataDrivenPropertyValueSpecification<string>;
};

export const streetcars: StyleSpecification = {
  version: 8,
  name: "Annexations 1847-1945",
  sources: {
    streetcars1924: {
      type: "geojson",
      data: geojsonURL({
        layer: "streetcars1924",
        workspace: "StreetcarRoutes",
      }),
      promoteId: "Route_num",
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: "streetcars1924",
      type: "line",
      source: "streetcars1924",
      layout: { visibility: "none" },
      minzoom: 0,
      maxzoom: 20,
      paint: {
        "line-width": [
          "case",
          ["boolean", ["feature-state", "active"], false],
          8,
          4,
        ],
        "line-color": lineColors(1928),
        "line-dasharray": [1, 1],
        // 'line-offset': [
        //   "case",
        //   // ["==", ["%", ["get", "Route_num"], 2], 20], 0.2,
        //   ["==", ["get", "Route_num"], "2"], 2,
        //   ["==", ["get", "Route_num"], "4"], 2,
        //   ["==", ["get", "Route_num"], "6"], 2,
        //   ["==", ["get", "Route_num"], "8"], 2,
        //   ["==", ["get", "Route_num"], "8"], 2,
        //   ["==", ["get", "Route_num"], "10"], 2,
        //   ["==", ["get", "Route_num"], "12"], 2,
        //   ["==", ["get", "Route_num"], "14"], 2,
        //   ["==", ["get", "Route_num"], "16"], 2,
        //   ["==", ["get", "Route_num"], "18"], 2,
        //   ["==", ["get", "Route_num"], "20"], 2,
        //   ["==", ["get", "Route_num"], "22"], 2,
        //   ["==", ["get", "Route_num"], "24"], 2,
        //   -2
        // ]
      },
    },
  ],
};
