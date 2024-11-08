import chroma from "chroma-js";
import { useContext, useState } from "react";
import { buildingUses } from "~/data/buildings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { MapContext } from "~/contexts";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
}

const Legend = ({ expand, setExpand }: Props) => {
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(
    undefined
  );
  const { map } = useContext(MapContext);

  const filterByUse = (useCode: string) => {
    if (!map) return;
    if (useCode && currentFilter !== useCode) {
      map.setFilter("OWAbuildings07OCT22", [
        "==",
        ["get", "Land_Use"],
        useCode,
      ]);
      setCurrentFilter(useCode);
    } else {
      map.setFilter("OWAbuildings07OCT22", undefined);
      setCurrentFilter(undefined);
    }
  };

  return (
    <div
      className={`w-full border border-black/50 rounded-md ${expand ? "max-h-[calc(100vh-9rem)]" : "max-h-10"} transition-all duration-700 overflow-hidden mb-4`}
    >
      <button
        onClick={() => setExpand(!expand)}
        className={`flex w-full text-left p-2 sticky top-0 z-10 transition-colors ${expand ? "rounded-t-md shadow-md bg-red-50 text-accent " : "rounded-md bg-accent text-red-200 delay-500"}`}
      >
        <span className="block flex-grow">Building Color Key</span>
        <span className="block">
          <FontAwesomeIcon
            icon={faChevronDown}
            rotation={expand ? undefined : 180}
            className="transition-transform"
          />
        </span>
      </button>
      <ul className={``}>
        {buildingUses.map((use, index) => (
          <li key={use.label}>
            <button
              className={`bg-[${use.color}] text-${chroma.contrast(use.color, "white") > 3.5 ? "white" : "black"} p-2 text-xl border border-black w-full text-left ${index === buildingUses.length - 1 ? "rounded-b-md" : ""} ${currentFilter && currentFilter !== use.code ? "opacity-25 hover:opacity-100" : "opacity-100"}`}
              onClick={() => filterByUse(use.code)}
            >
              {use.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
