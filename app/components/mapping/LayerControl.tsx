import { useState } from "react";
import { historicMaps, modernLandLayers } from "~/data/mapLayers";
import WMSLayer from "./WMSLayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ModernLayers from "./ModernLayers";

const LayerControl = () => {
  const [expand, setExpand] = useState<boolean>(true);

  return (
    <div
      className={`bg-white/80 w-1/5 absolute bottom-6 left-4 z-50 overflow-auto rounded-md ${expand ? "max-h-[calc(100vh-9rem)]" : "max-h-10"} transition-all duration-700`}
    >
      <button
        onClick={() => setExpand(!expand)}
        className={`flex w-full text-left p-2 sticky top-0 z-10 transition-colors ${expand ? "rounded-t-md shadow-md bg-red-200 text-accent" : "rounded-md bg-accent text-red-200"}`}
      >
        <span className="block flex-grow">Base Layers</span>
        <span className="block">
          <FontAwesomeIcon
            icon={faChevronDown}
            rotation={expand ? 180 : undefined}
            className="transition-transform"
          />
        </span>
      </button>
      <div className={`p-2 mb-3`}>
        {historicMaps.map((layer) => {
          return (
            <div key={layer.id} className="flex flex-col">
              <WMSLayer layer={layer} />
            </div>
          );
        })}
        {modernLandLayers.map((layer) => {
          return (
            <div key={layer.id}>
              <ModernLayers layer={layer} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayerControl;
