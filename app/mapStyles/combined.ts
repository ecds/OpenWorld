import { base } from "./base";
import { modernLabels } from "./modernLabels";
import { satellite } from "./satellite";
import { historicLayers } from "./historicLayers";
import { modernRoads } from "./modernRoads";
import { water } from "./water";
import type { StyleSpecification } from "maplibre-gl";
import { modernLand } from "./modernLand";
import { buildings1928 } from "./buildings1928";
import { annexations } from "./annexations";
import { streetcars } from "./streetcars";
import { openTours } from "./openTour";

export const combined: StyleSpecification = {
  version: 8,
  name: "Combined",
  glyphs:
    "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=uXfXuebPlkoPXiY3TPcv",
  sources: {
    ...base.sources,
    ...satellite.sources,
    ...historicLayers.sources,
    ...modernLabels.sources,
    ...buildings1928.sources,
    ...annexations.sources,
    ...streetcars.sources,
    ...openTours.sources,
  },
  layers: [
    ...base.layers,
    ...modernLand.layers,
    ...water.layers,
    ...historicLayers.layers,
    ...buildings1928.layers,
    ...annexations.layers,
    ...modernRoads.layers,
    ...streetcars.layers,
    ...satellite.layers,
    ...modernLabels.layers,
    ...openTours.layers,
  ],
};
