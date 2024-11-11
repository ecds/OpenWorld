import { bbox } from "@turf/turf";
import { Map } from "maplibre-gl";
import { geoserverHost } from "~/config";

export const printProps = (props: { [key: string]: string }) => {
  return Object.keys(props)
    .map((prop) => {
      return `<p>${prop}: ${props[prop] ?? "nope"}</p>`;
    })
    .join("");
};

export const camelToTitle = (string: string) => {
  return string
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .replace(/_/g, "")
    .trim();
};

enum WMSFormat {
  raster = "image/png",
  vector = "application/x-protobuf;type=mapbox-vector",
}

export const wmsURL = ({
  workspace,
  layer,
  format,
}: {
  workspace: string;
  layer: string;
  format: "raster" | "vector";
}) => {
  const url = new URL(`${geoserverHost}/${workspace}/gwc/service/wms`);
  url.searchParams.set("layers", `${workspace}:${layer}`);
  url.searchParams.set("service", "WMS");
  url.searchParams.set("request", "GetMap");
  url.searchParams.set("format", WMSFormat[format]);
  url.searchParams.set("transparent", "true");
  url.searchParams.set("version", "1.1.1");
  url.searchParams.set("width", "256");
  url.searchParams.set("height", "256");
  url.searchParams.set("srs", "EPSG:3857");
  url.searchParams.set("bbox", "{bbox-epsg-3857}");
  return decodeURI(url.toString());
};

export const tmsURL = ({
  workspace,
  layer,
}: {
  workspace: string;
  layer: string;
}) => {
  return `${geoserverHost}/gwc/service/tms/1.0.0/${workspace}:${layer}@EPSG:900913@pbf/{z}/{x}/{y}.pbf`;
};

// https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/ATLMaps:OWAbuildings07OCT22@EPSG:900913@pbf/{z}/{x}/{y}.pbf
// https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/ATLMaps:OWAbuildings07OCT22@EPSG:900913@pbf/{z}/{x}/{y}.pbf

export const geojsonURL = ({
  layer,
  workspace,
}: {
  layer: string;
  workspace: string;
}) => {
  const url = new URL(`${geoserverHost}/${workspace}/ows`);
  url.searchParams.set("service", "WFS");
  url.searchParams.set("version", "1.0.0");
  url.searchParams.set("request", "GetFeature");
  url.searchParams.set("typeName", `${workspace}:${layer}`);
  url.searchParams.set("maxFeatures", "500");
  url.searchParams.set("outputFormat", "application/json");
  return decodeURI(url.toString());
};

export const fitToLayerBounds = async (map: Map, source: string) => {
  // @ts-ignore getData does exist.
  const data = await map.getSource(source)?.getData();
  const layerBounds = bbox(data);
  map.fitBounds(
    [
      [layerBounds[0], layerBounds[1]],
      [layerBounds[2], layerBounds[3]],
    ],
    {
      padding: {
        left: window.innerWidth * 0.25,
        right: window.innerWidth * 0.3,
      },
      pitch: 0,
      bearing: 0,
    }
  );
};
