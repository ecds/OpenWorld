import { Popup } from "maplibre-gl";
import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MapContext } from "~/contexts";
import type { ReactNode } from "react";
import type { LngLat, LngLatLike } from "maplibre-gl";

interface Props {
  children: ReactNode;
  show: boolean;
  coordinates: LngLat | LngLatLike;
}

const PopupContainer = ({ children, show, coordinates }: Props) => {
  const containerRef = useRef<HTMLDivElement>(document.createElement("div"));
  const popupRef = useRef<Popup>(new Popup({ closeButton: false }));
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    if (show) {
      popupRef.current
        .setLngLat(coordinates)
        .setDOMContent(containerRef.current);
      popupRef.current.addTo(map);
    } else {
      popupRef.current.remove();
    }

    const popupRefCopy = popupRef.current;

    return () => {
      popupRefCopy.remove();
    };
  }, [map, show, coordinates]);

  return <>{createPortal(<div>{children}</div>, containerRef.current)}</>;
};

export default PopupContainer;
