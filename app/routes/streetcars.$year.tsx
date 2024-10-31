import { useContext, useEffect, useState } from "react";
import ContentPanel from "~/components/layout/ContentPanel";
import { MapContext } from "~/contexts";
import { streetcars } from "~/mapStyles";
import { streetcarLines } from "~/data/streetcarData";
import { fitToLayerBounds } from "~/utils";
import StreetcarLine from "~/components/StreetcarLine";
import PopupContainer from "~/components/mapping/PopupContainer.client";
import StreetcarPopupContent from "~/components/transportaion/StreetcarPopupContent";
import type { TStreetcarLine } from "~/types";
import type { LngLat, MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
import { ClientOnly } from "remix-utils/client-only";

const Streetcars = () => {
  const { map } = useContext(MapContext);
  const [showContent, setShowContent] = useState<boolean>(true);
  const [activeLines, setActiveLines] = useState<TStreetcarLine[]>([]);
  const [popupCoords, setPopupCoords] = useState<LngLat | undefined>(undefined);

  useEffect(() => {
    if (!map) return;
    const mouseEnter = (
      event: MapMouseEvent & { features?: MapGeoJSONFeature[] }
    ) => {
      const { features } = event;
      if (!features) return;
      setPopupCoords(event.lngLat);
      const lines = [];
      for (const feature of features) {
        const lineDetails = streetcarLines.find(
          (line) => parseInt(feature.properties.Route_num) == line.number
        );
        if (lineDetails) lines.push(lineDetails);
      }

      setActiveLines(lines);
      map.getCanvas().style.cursor = "pointer";
    };

    const mouseLeave = () => {
      if (!map) return;
      map.getCanvas().style.cursor = "";

      setActiveLines([]);
      setPopupCoords(undefined);
    };

    for (const line of streetcars.layers) {
      map.setLayoutProperty(line.id, "visibility", "visible");
      map.on("mouseenter", line.id, mouseEnter);
      map.on("mouseleave", line.id, mouseLeave);
    }

    fitToLayerBounds(map, "streetcars1924");

    return () => {
      for (const line of streetcars.layers) {
        map.setLayoutProperty(line.id, "visibility", "none");
        map.off("mouseenter", line.id, mouseEnter);
        map.off("mouseleave", line.id, mouseLeave);
      }
    };
  }, [map]);

  return (
    <ContentPanel
      title="Streetcars"
      isOpen={showContent}
      setIsOpen={setShowContent}
      showButton="Show Streetcar List"
    >
      <ul>
        {streetcarLines.map((line) => {
          return (
            <li key={`list-${line.number}`}>
              <StreetcarLine
                line={line}
                active={activeLines.includes(line)}
                setActive={setActiveLines}
              />
            </li>
          );
        })}
      </ul>
      {(popupCoords || activeLines.length > 0) && (
        <ClientOnly>
          {() => (
            <PopupContainer
              show={activeLines.length > 0}
              coordinates={popupCoords ?? activeLines[0].center}
            >
              <StreetcarPopupContent lines={activeLines} />
            </PopupContainer>
          )}
        </ClientOnly>
      )}
    </ContentPanel>
  );
};

export default Streetcars;
