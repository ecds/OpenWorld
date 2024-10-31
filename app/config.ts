import maplibregl from "maplibre-gl";

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
