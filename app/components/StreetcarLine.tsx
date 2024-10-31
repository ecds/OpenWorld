import chroma from "chroma-js";
import { useContext, useEffect } from "react";
import { MapContext } from "~/contexts";
import type { TStreetcarLine } from "~/types";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  line: TStreetcarLine;
  className?: string;
  active?: boolean;
  setActive?: Dispatch<SetStateAction<TStreetcarLine[]>>;
}

const StreetcarLine = ({ line, className, active, setActive }: Props) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map || typeof active == "undefined") return;
    map.setFeatureState(
      {
        source: "streetcars1924",
        id: line.number.toString(),
      },
      { active }
    );
  }, [map, active, line]);

  const handleMouseEvent = () => {
    if (!setActive) return;
    if (active) {
      setActive([]);
    } else {
      setActive([line]);
    }
  };

  return (
    <span
      className={`block bg-[${line.color}] text-${chroma.contrast(line.color, "white") > 3.5 ? "white" : "black"} p-2 my-2 ${className} cursor-pointer`}
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      {line.number}: {line.name}
    </span>
  );
};

export default StreetcarLine;
