import maplibregl from "maplibre-gl";
import type { TPageGroup } from "~/types";

export const pageGroups: TPageGroup[] = [
  {
    heading: "Buildings",
    pages: [
      {
        label: "1928",
        route: "/buildings/1928",
      },
    ],
  },
  {
    heading: "Boundaries",
    pages: [{ label: "Annexations", route: "/annexations" }],
  },
  {
    heading: "Transportation",
    pages: [
      {
        label: "Streetcars 1928",
        route: "/streetcars/1928",
      },
    ],
  },
  {
    heading: "Spotlights",
    pages: [
      {
        label: "Cabbagetown",
        route: "/spotlight/cabbagetown",
      },
      {
        label: '1934-1935 run of "Imitation of Life" in Atlanta Movie Theaters',
        route: "spotlight/theaters-1934-1935",
      },
    ],
  },
];

export const geoserverHost = "https://geoserver.ecds.emory.edu";

export const topBarHeight = "2.75rem";

export const defaultBounds = () => {
  try {
    return new maplibregl.LngLatBounds(
      [-84.6591251582694, 33.62265121423327],
      [-84.13899086471818, 33.93982091532807]
    );
  } catch {}
};

export const mapDefaults = {
  bounds: defaultBounds(),
  zoom: 9.0,
  pitch: 0.0,
  bearing: 0.0,
};
