import { useLocation } from "@remix-run/react";
import { useContext, useEffect } from "react";
import MapContext from "~/mapContext";

export default function Index() {
  const location = useLocation();
  const { mapState, center, zoom } = useContext(MapContext);

  useEffect(() => {
    mapState?.flyTo({
      bearing: 0,
      center,
      pitch: 0,
      zoom
    });
  }, [location, center, mapState, zoom]);

  return (
    <>
    </>
  );
}
