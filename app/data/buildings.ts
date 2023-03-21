export const buildings = {
  "1928": {
    "source": {
      "type": "vector",
      "scheme": "tms",
      "tiles": ["https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/ATLMaps:OWAbuildings07OCT22@EPSG:900913@pbf/{z}/{x}/{y}.pbf"]
    },
    "layer": {
      "id": "buildings1928",
      "type": "fill-extrusion",
      "source": "buildings1928",
      "source-layer": "OWAbuildings07OCT22",
      "paint": {
        "fill-extrusion-color": [
          "case",
          ["==", ["get", "Land_Use"], "M"], "#AB59C9",
          ["==", ["get", "Land_Use"], "C"], "#E83333",
          ["==", ["get", "Land_Use"], "P"], "#2E6DFF",
          ["==", ["get", "Land_Use"], "R"], "#FFFF00",
          ["==", ["get", "Land_Use"], "TU"], "#FFCCFF",
          ["==", ["get", "Land_Use"], "TR"], "#FF6F00",
          ["==", ["get", "Land_Use"], "W"], "#5D4037",
          "#EBEBEB"
        ],
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["*", ["get", "calc_ht"], 0.3048]
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"]
        ],
        "fill-extrusion-opacity": 0.6
      }
    }
  }
}