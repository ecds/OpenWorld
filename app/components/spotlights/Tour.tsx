import { Carousel } from "nuka-carousel";
import { useContext, useEffect, useRef, useState } from "react";
import { MapContext } from "~/contexts";
import { tours } from "~/data/tours";
import { openTours } from "~/mapStyles/openTour";
import ContentPanel from "../layout/ContentPanel";
import { center } from "@turf/turf";
import ImageModal from "../layout/ImageModal";
import type { MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
import type {
  TTourFeatureProps,
  TTourGeoJSON,
  TTourImage,
  TTourTitle,
} from "~/types";

interface Props {
  tour: TTourTitle;
  tourData: TTourGeoJSON;
}

const TourContent = ({ feature }: { feature: TTourFeatureProps }) => {
  const [activeImage, setActiveImage] = useState<TTourImage | undefined>(
    undefined
  );

  return (
    <>
      <Carousel showDots>
        {feature.images.map((image) => {
          return (
            <button key={image.thumb} onClick={() => setActiveImage(image)}>
              <img src={image.full} alt={image.caption} />
              <span className="sr-only">{image.caption}</span>
              <ImageModal
                image={image}
                isOpen={Boolean(activeImage)}
                setIsOpen={setActiveImage}
              />
            </button>
          );
        })}
      </Carousel>
      <h5 className="text-xl">{feature.title}</h5>
      <div
        dangerouslySetInnerHTML={{
          __html: feature.description ?? "",
        }}
      />
    </>
  );
};

const Tour = ({ tour, tourData }: Props) => {
  const { map, setCurrentYear } = useContext(MapContext);
  const [showContent, setShowContent] = useState<boolean>(true);
  const [activeFeature, setActiveFeature] = useState<
    TTourFeatureProps | undefined
  >(undefined);
  const activeFeatureRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const tourCenter = center(tourData);
    if (map) {
      map.flyTo({
        bearing: 0,
        zoom: 12,
        pitch: 0,
        center: {
          lng: tourCenter.geometry.coordinates[0],
          lat: tourCenter.geometry.coordinates[1],
        },
      });
    }
  }, [map, tourData]);

  useEffect(() => {
    if (!map) return;

    const handleClick = ({
      features,
    }: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
      if (features) {
        setShowContent(true);
        const { properties } = features[0];
        if (activeFeatureRef.current) {
          map.setFeatureState(
            {
              source: tour,
              id: activeFeatureRef.current,
            },
            { clicked: false }
          );
        }
        if (activeFeatureRef.current !== properties.position) {
          map.setFeatureState(
            {
              source: tour,
              id: properties.position,
            },
            { clicked: true }
          );
          properties.images = JSON.parse(properties.images);
          setActiveFeature(properties as TTourFeatureProps);
          activeFeatureRef.current = properties.position;
        } else {
          setActiveFeature(undefined);
          activeFeatureRef.current = undefined;
        }
      }
    };

    const mouseEnter = () => {
      if (map) map.getCanvas().style.cursor = "pointer";
    };

    const mouseLeave = () => {
      if (map) map.getCanvas().style.cursor = "";
    };

    const styleLayer = openTours.layers.find(
      (layer) => layer.type === "circle" && layer.source === tour
    );
    if (!styleLayer) return;
    if (map.getLayer(styleLayer.id)) {
      map.setLayoutProperty(styleLayer.id, "visibility", "visible");
      map.on("mouseenter", styleLayer.id, mouseEnter);
      map.on("click", styleLayer.id, handleClick);
      map.on("mouseleave", styleLayer.id, mouseLeave);
      const { year } = tours[tour];
      setCurrentYear(year);
    }

    return () => {
      map.setLayoutProperty(styleLayer.id, "visibility", "none");
      map.off("click", styleLayer.id, handleClick);

      setCurrentYear(undefined);
    };
  }, [map, tour, setCurrentYear]);

  return (
    <ContentPanel
      title={`Tour`}
      isOpen={showContent}
      setIsOpen={setShowContent}
    >
      <p></p>
      {activeFeature && <TourContent feature={activeFeature} />}
      {!activeFeature && <TourContent feature={tourData.meta} />}
    </ContentPanel>
  );
};

export default Tour;
