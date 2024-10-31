import { useContext, useState } from "react";
import { buildingUses } from "~/data/buildings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { MapContext } from "~/contexts";

// interface Props {}

const Legend = () => {
  const [expand, setExpand] = useState<boolean>(true);
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
      className={`w-full border border-black/50 rounded-md ${expand ? "max-h-[calc(100vh-9rem)]" : "max-h-10"} transition-all duration-700 overflow-hidden`}
    >
      <button
        onClick={() => setExpand(!expand)}
        className={`flex w-full text-left p-2 sticky top-0 z-10 transition-colors ${expand ? "rounded-t-md shadow-md bg-red-200 text-accent " : "rounded-md bg-accent text-red-200 delay-500"}`}
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
        {buildingUses.map((use) => (
          <li key={use.label}>
            <button
              className={`bg-[${use.color}] p-2 text-xl my-1 w-full text-left`}
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
