import { bbox } from "@turf/turf";
import { useContext, useEffect, useState } from "react";
import ContentPanel from "~/components/layout/ContentPanel";
import YearTicks from "~/components/layout/YearTicks";
import { MapContext } from "~/contexts";
import { annexDetails, YEARS } from "~/data/annexationData";
import { annexations } from "~/mapStyles";
import type { TAnnexDetails } from "~/types";
import { fitToLayerBounds } from "~/utils";

const START_YEAR = Math.min(...YEARS);
const END_YEAR = Math.max(...YEARS);

const Annexations = () => {
  const { map, currentYear, setCurrentYear } = useContext(MapContext);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [content, setContent] = useState<TAnnexDetails | undefined>();

  useEffect(() => {
    setCurrentYear(START_YEAR);
  }, [setCurrentYear]);

  useEffect(() => {
    if (!map) return;
    for (const annexation of annexations.layers) {
      if (currentYear && YEARS.includes(currentYear)) {
        map.setFilter(annexation.id, [
          "all",
          ["==", ["to-number", ["get", "YEAR"]], currentYear],
        ]);

        if (annexation.type === "fill") {
          map.setPaintProperty(annexation.id, "fill-opacity", [
            "case",
            [
              "all",
              ["==", ["to-number", ["get", "YEAR"]], currentYear],
              ["in", "part", ["get", "id"]],
            ],
            0.4,
            0,
          ]);
        }
      }
      map.setLayoutProperty(annexation.id, "visibility", "visible");
    }

    return () => {
      for (const annexation of annexations.layers) {
        map.setLayoutProperty(annexation.id, "visibility", "none");
      }
    };
  }, [map, currentYear]);

  useEffect(() => {
    if (currentYear && YEARS.includes(currentYear)) {
      if (annexDetails && map) {
        setContent(annexDetails.find((annex) => annex.year === currentYear));
        fitToLayerBounds(map, "annexations_1847-1945");
      }
    }
  }, [currentYear, map]);

  const handleChange = (newValue: string) => {
    setCurrentYear(parseInt(newValue));
  };

  return (
    <ContentPanel title="Annexations" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        City Boundaries in{" "}
        <input
          className="ml-2 w-16 p-1"
          type="number"
          min={START_YEAR}
          max={END_YEAR}
          step={1}
          value={currentYear ?? START_YEAR}
          onInput={({ target }) =>
            handleChange((target as HTMLInputElement).value)
          }
        />
      </div>
      <div className="flex">
        <div className="flex-grow">{START_YEAR}</div>
        <div className="">{END_YEAR}</div>
      </div>
      <div>
        <YearTicks years={YEARS} start={START_YEAR} end={END_YEAR} />
      </div>
      <div>
        <input
          type="range"
          className="cursor-ew-resize w-full accent-red-600/50"
          min={START_YEAR}
          max={END_YEAR}
          step={1}
          value={currentYear ?? START_YEAR}
          onChange={({ target }) =>
            handleChange((target as HTMLInputElement).value)
          }
        />
      </div>
      <div>{content?.areas ?? ""}</div>
    </ContentPanel>
  );
};

export default Annexations;
