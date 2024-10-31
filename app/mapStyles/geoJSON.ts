import type { AddLayerObject } from "maplibre-gl";

export const cluster = (id: string, source: string) => {
  const layer: AddLayerObject = {
    id,
    type: "circle",
    source,
    filter: ["has", "point_count"],
    paint: {
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      "circle-stroke-width": 1,
      "circle-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#3b62ff",
        "#ff623b",
      ],
      "circle-stroke-color": "#8d260c",
    },
  };
  return layer;
};

export const largeCluster = (id: string, source: string) => {
  const layer: AddLayerObject = {
    id,
    type: "circle",
    source,
    filter: ["has", "point_count"],
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["number", ["get", "point_count"], 1],
        0,
        8,
        12,
        16,
      ],
      "circle-stroke-width": 1,
      "circle-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#ca8a04",
        "#fef08a",
      ],
      "circle-stroke-color": "#8d260c",
      "circle-opacity": 0.7,
    },
  };
  return layer;
};

export const clusterCount = (id: string, source: string) => {
  const count: AddLayerObject = {
    id,
    type: "symbol",
    source,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["Noto Sans Regular"],
      "text-size": 12,
    },
  };
  return count;
};

export const singlePoint = (id: string, source: string) => {
  const point: AddLayerObject = {
    id,
    type: "circle",
    source,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-radius": 6,
      "circle-color": ["string", ["get", "hexColor"]],
    },
  };
  return point;
};
