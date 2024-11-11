import { wmsURL } from "~/utils";
import { modernLabels } from "./modernLabels";
import type {
  LayerSpecification,
  RasterSourceSpecification,
  StyleSpecification,
} from "maplibre-gl";

const sourceDefaults: RasterSourceSpecification = {
  type: "raster",
  tileSize: 256,
  attribution: "Emory University",
  maxzoom: 20,
  tiles: [""],
};

const sources = {
  atl1840: {
    ...sourceDefaults,
    tiles: [
      wmsURL({
        workspace: "Atlanta1878",
        layer: "q516x4",
        format: "raster",
      }),
    ],
  },
  atl1870: {
    ...sourceDefaults,
    tiles: [
      wmsURL({
        workspace: "ATLMaps",
        layer: "2rwkdcdv",
        format: "raster",
      }),
    ],
  },
  atl1895: {
    ...sourceDefaults,
    tiles: [
      wmsURL({
        workspace: "ATLMaps",
        layer: "2s4d022m",
        format: "raster",
      }),
    ],
  },
  atl1906: {
    ...sourceDefaults,
    tiles: [
      wmsURL({
        workspace: "ATLMaps",
        layer: "2s6zg3zx",
        format: "raster",
      }),
    ],
  },
  atl1911: {
    ...sourceDefaults,
    tiles: [wmsURL({ workspace: "ATLMaps", layer: "sq4pd", format: "raster" })],
  },
  atl1928: {
    ...sourceDefaults,
    tiles: [wmsURL({ workspace: "ATLMaps", layer: "ATL28", format: "raster" })],
  },
  atl1934: {
    ...sourceDefaults,
    tiles: [
      wmsURL({
        workspace: "ATLMaps",
        layer: "2s3w9vfd",
        format: "raster",
      }),
    ],
  },
};

const layers = Object.keys(sources).map((id) => {
  const layer: LayerSpecification = {
    id,
    type: "raster",
    source: id,
    maxzoom: 20,
    paint: {
      "raster-opacity": 0,
    },
    layout: {
      visibility: "none",
    },
  };
  return layer;
});

export const historicLayers: StyleSpecification = {
  version: 8,
  name: "ATL1878",
  metadata: {
    id: "atl1878",
  },
  glyphs: modernLabels.glyphs,
  sources,
  layers,
};
