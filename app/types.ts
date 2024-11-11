import type { FeatureCollection } from "geojson";
import type { LngLatLike } from "maplibre-gl";

export type THistoricLayer = {
  id: string;
  year: number;
  title: string;
  description?: string;
  researchLinks?: string[];
};

export type TStreetcarLine = {
  number: number;
  name: string;
  color: string;
  center: LngLatLike;
};

export type TAnnexDetails = {
  year: number;
  acreage: string | number;
  areas: string;
};

export type TBuildingFeatureProps = {
  Add_Use: string;
  Address: "26 Courtland SE";
  Bldg_Remov: string;
  Bldg_Type: string;
  Contributo: string;
  Coverage: "Atlanta, Georgia, USA";
  Creator: string;
  Date_Bd: "";
  Date_Src: "";
  Desc_URL: number;
  Format: string;
  Format_URL: "";
  Identifier: "BD15725";
  Join_Count: number;
  Land_Use: string;
  Language: string;
  Map_Sheet: string;
  Occupants1: string;
  Occupants_: "";
  Omeka: "";
  Publisher: "";
  Race: "unidentified";
  Relation: string;
  Rights: "";
  Shape_Area: number;
  Shape_Leng: number;
  Source: string;
  Title: "Armory Auditorium";
  Type: string;
  X_Coord: number;
  Y_Coord: number;
  atl_id_12_: string;
  bldg_ht: number;
  bldg_sty: number;
  calc_ht: number;
  Description?: string;
  Date_BD?: string;
};

export type TOmekaMetadataKey =
  | "landUse"
  | "type"
  | "residents"
  | "race"
  | "removed"
  | "date"
  | "businesses";

export type TOmekaImage = {
  caption: string;
  full: string;
  thumb: string;
  title?: string;
};

export type TOmekaBuilding = {
  omekaID: number | string;
  fileCount: number;
  bldgID: string;
  title: string;
  address: string;
  description?: string;
  metadata: {
    landUse: string;
    type: string;
    residents: string;
    race: string;
    removed: string;
    date?: string;
    businesses?: string;
  };
  landUse: string;
  location: [number, number];
  images: TOmekaImage[];
  Land_Use?: string;
};

type TElement = {
  id: number;
  url: string;
  name: string;
  resource: string;
};

type TElementIds =
  | 43
  | 50
  | 53
  | 41
  | 49
  | 69
  | 76
  | 72
  | 58
  | 59
  | 63
  | 49
  | 55
  | 43
  | 4;

type TElementTexts = {
  html: boolean;
  text: string;
  element_set: {
    id: number;
    url: string;
    name: string;
    resource: string;
  };
  element: {
    id: TElementIds;
    url: string;
    name: string;
    resource: string;
  };
};

export type TOmekaResponse = {
  id: number;
  url: string;
  public: boolean;
  featured: boolean;
  added: string;
  modified: string;
  item_type: TElement;
  collection: TElement;
  owner: TElement;
  files: { count: number };
  tags: string[];
  element_texts: TElementTexts[];
  extended_resources: {
    exhibit_pages: {
      count: number;
      url: string;
      resource: string;
    };
    geolocations: {
      id: number;
      url: string;
      resource: string;
    };
  };
};

export type TOmekaImageFiles = {
  file_urls: {
    thumbnail: string;
    original: string;
  };
  original_filename: string;
};

type TPage = {
  label: string;
  route: string;
};

export type TPageGroup = {
  heading: string;
  pages: TPage[];
};

export type TTourTitle = "theaters-1934-1935";

export type TTourDetails = {
  title: string;
  slug: string;
  url: string;
  year: number;
  intro: string;
  layerSource: string;
};

export type TTour = {
  [key in TTourTitle]: TTourDetails;
};

export type TTourImage = {
  caption: string;
  full: string;
  thumb: string;
  title?: string;
};

type TFeaturePropsBase = {
  title: string;
  description: string;
  images: TTourImage[];
};

export type TTourFeatureProps = TFeaturePropsBase & {
  position: number;
};

export type TTourGeoJSON = FeatureCollection & { meta: TTourFeatureProps };
