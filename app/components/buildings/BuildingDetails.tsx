import { Carousel } from "nuka-carousel";
import { useState } from "react";
import ImageModal from "../layout/ImageModal";
import type { TOmekaImage, TOmekaBuilding, TOmekaMetadataKey } from "~/types";

interface Props {
  building: TOmekaBuilding;
}

const BuildingDetails = ({ building }: Props) => {
  const [activeImage, setActiveImage] = useState<TOmekaImage | undefined>(
    undefined
  );
  return (
    <div>
      {building && (
        <>
          {building.fileCount > 0 && (
            <Carousel showDots>
              {building.images.map((image) => {
                return (
                  <button
                    key={image.thumb}
                    onClick={() => setActiveImage(image)}
                  >
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
          )}
          <h5 className="text-xl">{building.title}</h5>
          <p className="lead my-4">{building.description}</p>
          <table className="table-auto w-full">
            <tbody>
              {Object.keys(building.metadata).map((key, index) => {
                if (building.metadata[key as TOmekaMetadataKey]) {
                  return (
                    <tr
                      key={`${building.omekaID}-${key}`}
                      className="border-b border-slate-500 border-spacing-y-2"
                    >
                      <td className="capitalize p-2">{key}</td>
                      <td className="p-2">
                        {building.metadata[key as TOmekaMetadataKey]}
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
  );
};

export default BuildingDetails;
