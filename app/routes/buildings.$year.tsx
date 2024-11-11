import { Carousel } from "nuka-carousel";
import { useLoaderData } from "@remix-run/react";
import { useContext, useEffect, useRef, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import ThreeDModels from "~/components/mapping/ThreeDModels.client";
import { MapContext } from "~/contexts";
import { buildings } from "~/data/buildings";
import ContentPanel from "~/components/layout/ContentPanel";
import Legend from "~/components/buildings/Legend";
import {
  omekaMetadata,
  omekaImages,
  shapeFileMetadata,
} from "~/buildingMetadata";

import type { MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
import type { LoaderFunctionArgs } from "@remix-run/node";
import type {
  TBuildingFeatureProps,
  TOmekaBuilding,
  TOmekaMetadataKey,
} from "~/types";

export const loader = async ({
  params,
}: LoaderFunctionArgs & { params: { year: string } }) => {
  return { year: params.year, layer: buildings[params.year] };
};

const Buildings = () => {
  const { year, layer } = useLoaderData<typeof loader>();
  const { map } = useContext(MapContext);
  const [showContent, setShowContent] = useState<boolean>(true);
  const [expandLegend, setExpandLegend] = useState<boolean>(true);
  const [selectedFeature, setSelectedFeature] = useState<
    TBuildingFeatureProps | undefined
  >(undefined);
  const [omekaData, setOmekaData] = useState<TOmekaBuilding[]>();
  const [activeBuilding, setActiveBuilding] = useState<TOmekaBuilding>();
  const selectedFeatureRef = useRef<TBuildingFeatureProps | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await omekaMetadata();
      setOmekaData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!map) return;
    if (selectedFeatureRef.current) {
      map.setFeatureState(
        {
          source: "OWAbuildings07OCT22",
          sourceLayer: "OWAbuildings07OCT22",
          id: selectedFeatureRef.current.Identifier,
        },
        { clicked: false }
      );
    }
    if (selectedFeature) {
      map.setFeatureState(
        {
          source: "OWAbuildings07OCT22",
          sourceLayer: "OWAbuildings07OCT22",
          id: selectedFeature.Identifier,
        },
        { clicked: true }
      );
    }

    selectedFeatureRef.current = selectedFeature;
    if (selectedFeature) {
      setExpandLegend(false);
    } else {
      setActiveBuilding(undefined);
      setExpandLegend(true);
    }
  }, [selectedFeature, map]);

  useEffect(() => {
    if (!selectedFeature || !omekaData) return;
    const setActive = async (building: TOmekaBuilding) => {
      if (building.fileCount > 0 && building.images.length === 0) {
        building.images = await omekaImages(building.omekaID);
      }
      setActiveBuilding(building);
    };

    const building = omekaData.find(
      (bldData) => bldData.bldgID === selectedFeature.Identifier
    );

    if (building) {
      setActive(building);
    } else {
      setActive(shapeFileMetadata(selectedFeature));
    }
  }, [selectedFeature, omekaData]);

  useEffect(() => {
    const handleClick = ({
      features,
      lngLat,
    }: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
      if (!features) return;
      if (
        features[0].properties.Identifier ===
        selectedFeatureRef.current?.Identifier
      )
        setSelectedFeature(undefined);
      else {
        setSelectedFeature(features[0].properties as TBuildingFeatureProps);
        map?.flyTo({ center: lngLat, minZoom: 17 });
      }
    };

    const mouseEnter = () => {
      if (map) map.getCanvas().style.cursor = "pointer";
    };

    const mouseLeave = () => {
      if (map) map.getCanvas().style.cursor = "";
    };

    if (!map) return;

    map.flyTo({
      bearing: 0,
      zoom: 15,
      center: layer.center,
      pitch: 60,
    });

    map?.setLayoutProperty(layer.id, "visibility", "visible");

    map.on("click", layer.id, handleClick);
    map.on("mouseenter", layer.id, mouseEnter);
    map.on("mouseleave", layer.id, mouseLeave);

    return () => {
      map.setLayoutProperty(layer.id, "visibility", "none");
      map.off("click", layer.id, handleClick);
      map.off("mouseenter", layer.id, mouseEnter);
      map.off("mouseleave", layer.id, mouseLeave);
      map.off("click", "atl1928", handleClick);
    };
  }, [map, layer, year]);

  return (
    <>
      <ClientOnly>{() => <ThreeDModels />}</ClientOnly>
      <ContentPanel
        title={`Buildings ${year}`}
        isOpen={showContent}
        setIsOpen={setShowContent}
      >
        <Legend expand={expandLegend} setExpand={setExpandLegend} />
        <div>
          {activeBuilding && (
            <>
              {activeBuilding.fileCount > 0 && (
                <Carousel>
                  {activeBuilding.images.map((image) => {
                    return <img key={image.full} src={image.full} alt="" />;
                  })}
                </Carousel>
              )}
              <h5 className="text-xl">{activeBuilding.title}</h5>
              <p className="lead my-4">{activeBuilding.description}</p>
              <table className="table-auto w-full">
                <tbody>
                  {Object.keys(activeBuilding.metadata).map((key, index) => {
                    if (activeBuilding.metadata[key as TOmekaMetadataKey]) {
                      return (
                        <tr
                          key={`${activeBuilding.omekaID}-${key}`}
                          className="border-b border-slate-500 border-spacing-y-2"
                        >
                          <td className="capitalize p-2">{key}</td>
                          <td className="p-2">
                            {activeBuilding.metadata[key as TOmekaMetadataKey]}
                          </td>
                        </tr>
                      );
                    }
                    return <span key={index}></span>;
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </ContentPanel>
    </>
  );
};

export default Buildings;
