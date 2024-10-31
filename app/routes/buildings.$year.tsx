import { useLoaderData } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import ThreeDModels from "~/components/mapping/ThreeDModels.client";
import { MapContext } from "~/contexts";
import { buildings } from "~/data/buildings";
import ContentPanel from "~/components/layout/ContentPanel";

import type { MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
import type { LoaderFunctionArgs } from "@remix-run/node";
import Legend from "~/components/buildings/Legend";
import {
  omekaMetadata,
  omekaImages,
  shapeFileMetadata,
} from "~/buildingMetadata";
import type { TBuildingFeatureProps, TOmekaBuilding } from "~/types";

export const loader = async ({
  params,
}: LoaderFunctionArgs & { params: { year: string } }) => {
  return { year: params.year, layer: buildings[params.year] };
};

const Buildings = () => {
  const { year, layer } = useLoaderData<typeof loader>();
  const { map } = useContext(MapContext);
  const [showContent, setShowContent] = useState<boolean>(true);
  const [selectedFeature, setSelectedFeature] = useState<
    TBuildingFeatureProps | undefined
  >(undefined);
  const [omekaData, setOmekaData] = useState<TOmekaBuilding[]>();
  const [activeBuilding, setActiveBuilding] = useState<TOmekaBuilding>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await omekaMetadata();
      console.log("🚀 ~ fetchData ~ data:", data);
      setOmekaData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const setActive = async (building: TOmekaBuilding) => {
      if (building.fileCount > 0 && building.images.length === 0) {
        building.images = await omekaImages(building.omekaID);
      }
      setActiveBuilding(building);
    };
    if (!selectedFeature || !omekaData) return;
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
    console.log("🚀 ~ Buildings ~ activeBuilding:", activeBuilding);
  }, [activeBuilding]);

  useEffect(() => {
    const handleClick = ({
      features,
    }: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
      if (!features) return;
      setSelectedFeature(features[0].properties as TBuildingFeatureProps);
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
        <Legend />
        <div>
          {activeBuilding && (
            <>
              <h5>{activeBuilding.title}</h5>
              <p className="lead">{activeBuilding.description}</p>
              {Object.keys(activeBuilding.metadata).map((key, index) => {
                if (activeBuilding.metadata[key]) {
                  return (
                    <dl key={activeBuilding?.title}>
                      <dt className="text-truncate">{activeBuilding.title}</dt>
                      <dd>{activeBuilding.metadata[key]}</dd>
                    </dl>
                  );
                }
                return <span key={index}></span>;
              })}
            </>
          )}
        </div>
      </ContentPanel>
    </>
  );
};

export default Buildings;
