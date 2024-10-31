import type {
  TBuildingFeatureProps,
  TOmekaBuilding,
  TOmekaImageFiles,
  TOmekaResponse,
} from "./types";

const omekaURL = "https://dvl.ecdsdev.org/api";
const omekaKey = "23bd7efbce6d7e1ceeee3265cddf6060543f0459";

const uses = (use: string | undefined) => {
  switch (use) {
    case "M":
      return "Manufacturing/Industrial";
    case "C":
      return "Commercial/Office";
    case "P":
      return "Public/Institutional";
    case "R":
      return "Residential";
    case "TU":
      return "Transportation/Utility";
    case "TR":
      return "Residential Transient";
    case "W":
      return "Warehouse";
    default:
      return use || "NA";
  }
};

export const omekaImages = async (omekaId: string | number) => {
  const fileResponse = await fetch(
    `${omekaURL}/files?item=${omekaId}&key=${omekaKey}`
  );
  const fileData = await fileResponse.json();
  return fileData.map((image: TOmekaImageFiles) => {
    return {
      thumb: image.file_urls.thumbnail,
      full: image.file_urls.original,
      caption: image.original_filename,
    };
  });
};

export const omekaMetadata = async () => {
  const response = await fetch(
    `${omekaURL}/items?collection=16&key=${omekaKey}&per_page=1000`
  );
  const data = await response.json();
  const reasonableJSON = await data.map(async (building: TOmekaResponse) => {
    return {
      omekaID: building.id,
      fileCount: building.files.count,
      bldgID: building.element_texts.find((el) => el.element.id === 43)?.text,
      title: building.element_texts.find((el) => el.element.id === 50)?.text,
      address: building.element_texts.find((el) => el.element.id === 53)?.text,
      description: building.element_texts.find((el) => el.element.id === 41)
        ?.text,
      metadata: {
        landUse: uses(
          building.element_texts.find((el) => el.element.id === 49)?.text
        ),
        date: building.element_texts.find((el) => el.element.id === 69)?.text,
        architect: building.element_texts.find((el) => el.element.id === 76)
          ?.text,
        type: building.element_texts.find((el) => el.element.id === 55)?.text,
        businesses: building.element_texts.find((el) => el.element.id === 72)
          ?.text,
        residents: building.element_texts.find((el) => el.element.id === 58)
          ?.text,
        race: building.element_texts.find((el) => el.element.id === 59)?.text,
        removed: building.element_texts.find((el) => el.element.id === 63)
          ?.text,
      },
      landUse: building.element_texts.find((el) => el.element.id === 49)
        ?.text[0],
      location: building.element_texts
        .find((el) => el.element.id === 4)
        ?.text.split(", ")
        .map((c) => {
          return parseFloat(c);
        }),
      images: [],
    };
  });

  const buildingMetadata = await Promise.all(reasonableJSON);
  return buildingMetadata;
};

export const shapeFileMetadata = (building: TBuildingFeatureProps) => {
  const data: TOmekaBuilding = {
    omekaID: building.Omeka,
    fileCount: 0,
    bldgID: building.Identifier,
    title: building.Title,
    address: building.Address,
    description: building.Description,
    metadata: {
      landUse: uses(building.Land_Use),
      date: building.Date_BD,
      type: building.Bldg_Type,
      businesses: building.Occupants_,
      residents: building.Occupants1,
      race: building.Race,
      removed: building.Bldg_Remov,
    },
    landUse: uses(building.Land_Use),
    Land_Use: building.Land_Use,
    location: [building.X_Coord, building.Y_Coord],
    images: [],
  };

  return data;
};
