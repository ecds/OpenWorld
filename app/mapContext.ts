import type { Map } from "maplibre-gl";
import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface IMap {
  mapState: Map|undefined;
  setMapState: Dispatch<SetStateAction<Map>>;
  currentYearState: number|undefined;
  setCurrentYearState: Dispatch<SetStateAction<number>>;
}

const MapContext = createContext<IMap>({
  mapState: undefined,
  setMapState: (_: SetStateAction<Map>) => {
    console.error("setMapState not implemented. Did you pass it to context?");
  },
  currentYearState: undefined,
  setCurrentYearState: (_: SetStateAction<number>) => {
    console.error("setCurrentYearState not implemented. Did you pass it to context?");
  }
});

MapContext.displayName = "MapContext";

export default MapContext;