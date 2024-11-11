import type { Map } from "maplibre-gl";
import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface IMap {
  map: Map | undefined;
  setMap: Dispatch<SetStateAction<Map | undefined>>;
  mapLoaded: boolean;
  setMapLoaded: Dispatch<SetStateAction<boolean>>;
  currentYear: number | undefined;
  setCurrentYear: Dispatch<SetStateAction<number | undefined>>;
  setZoom: Dispatch<SetStateAction<number | string>>;
  setPitch: Dispatch<SetStateAction<number | string>>;
  setBearing: Dispatch<SetStateAction<number | string>>;
  zoom: number | string;
  bearing: number | string;
  pitch: number | string;
}

export const MapContext = createContext<IMap>({
  map: undefined,
  setMap: (_: SetStateAction<Map | undefined>) => {
    console.error("setMapState not implemented. Did you pass it to context?");
  },
  mapLoaded: false,
  setMapLoaded: (_: SetStateAction<boolean>) => {
    console.error("setMapLoaded not implemented. Did you pass it to context?");
  },
  currentYear: undefined,
  setCurrentYear: (_: SetStateAction<number | undefined>) => {
    console.error(
      "setCurrentYearState not implemented. Did you pass it to context?"
    );
  },
  setZoom: (_: SetStateAction<number | string>) => {
    console.error("setZoom not implemented. Did you pass it to context?");
  },
  setPitch: (_: SetStateAction<number | string>) => {
    console.error("setPitch not implemented. Did you pass it to context?");
  },
  setBearing: (_: SetStateAction<number | string>) => {
    console.error("setBearing not implemented. Did you pass it to context?");
  },
  zoom: 15,
  pitch: 0,
  bearing: 0,
});

// MapContext.displayName = "MapContext";
