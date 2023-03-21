import maplibregl from 'maplibre-gl'
import { useLoaderData } from "@remix-run/react";
import { useContext, useEffect } from "react";
import MapContext from "~/mapContext";
import { buildings } from "~/data/buildings";
import { printProps } from '~/utils';

export function loader({ params }) {
  return { year: params.year, ...buildings[params.year] };
}

export default function Buildings() {
  const { year, source, layer } = useLoaderData();
  const { mapState,  setCurrentYearState } = useContext(MapContext);

  useEffect(() => {
    setCurrentYearState(parseInt(year));

    return () => {
      setCurrentYearState(undefined);
    }
  }, [year, setCurrentYearState]);

  useEffect(() => {
    const layerId = layer.id;
    mapState?.addSource(layerId, source);
    mapState?.addLayer(layer);
    mapState?.once('idle', () => {
      console.log("🚀 ~ file: buildings.$year.tsx:31 ~ mapState?.on ~ idle:", 'idle')
      if (mapState.getLayer(layerId)) mapState.moveLayer(layerId);
    });


    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    mapState?.on('click', layerId, (({
      lngLat,
      features
    }) => {
      new maplibregl.Popup()
        .setLngLat(lngLat)
        .setHTML(`<article>${printProps(features[0].properties)}</article>`)
        .addTo(mapState);
    }));

    // Change the cursor to a pointer when the mouse is over the states layer.
    mapState?.on('mouseenter', layerId, (() => {
      mapState.getCanvas().style.cursor = 'pointer';
    }));

    // Change it back to a pointer when it leaves.
    mapState?.on('mouseleave', layerId, (() => {
      mapState.getCanvas().style.cursor = '';
    }));

    return () => {
      // mapState?.off('idle', layerId, () => mapState.moveLayer(layerId));
      mapState?.removeLayer(layerId);
      mapState?.removeSource(layerId);
    }
  }, [mapState, source, layer]);

  return(
    <section></section>
  )
}