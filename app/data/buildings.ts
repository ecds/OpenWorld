export const buildings = {
  "1928": {
    "source": {
      "type": "vector",
      "scheme": "tms",
      "tiles": [
        "https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/ATLMaps:OWAbuildings07OCT22@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
      ],
      "promoteId": "Identifier"
    },
    "layer": {
      "id": "buildings1928",
      "type": "fill-extrusion",
      "source": "buildings1928",
      "source-layer": "OWAbuildings07OCT22",
      "paint": {
        "fill-extrusion-color": [
          "case",
          ['boolean', ['feature-state', 'clicked'], false], "deeppink",
          ["==", ["get", "Land_Use"], "M"], "#AB59C9",
          ["==", ["get", "Land_Use"], "C"], "#E83333",
          ["==", ["get", "Land_Use"], "P"], "#2E6DFF",
          ["==", ["get", "Land_Use"], "R"], "#FFFF00",
          ["==", ["get", "Land_Use"], "TU"], "#FFCCFF",
          ["==", ["get", "Land_Use"], "TR"], "#FF6F00",
          ["==", ["get", "Land_Use"], "W"], "#5D4037",
          "#EBEBEB"
        ],
        "fill-extrusion-height": ["*", ["get", "calc_ht"], 0.3048],
        // "fill-extrusion-base": [
        //   "interpolate",
        //   ["linear"],
        //   ["zoom"],
        //   15,
        //   0,
        //   15.05,
        //   ["get", "min_height"]
        // ],
        "fill-extrusion-opacity": 0.6
      }
    }
  }
}

export const buildingUses = [
  {
    label: 'Residential',
    color: '#FFFF00',
    code: 'R'
  },
  {
    label: 'Residential Transient',
    color: '#FF6F00',
    code: 'TR'
  },
  {
    label: 'Commercial/Office',
    color: '#E83333',
    code: 'C'
  },
  {
    label: 'Warehouse',
    color: '#5D4037',
    code: 'W'
  },
  {
    label: 'Manufacturing/Industrial',
    color: '#AB59C9',
    code: 'M'
  },
  {
    label: 'Public/Institutional',
    color: '#2E6DFF',
    code: 'P'
  },
  {
    label: 'Transportation/Utility',
    color: '#FFCCFF',
    code: 'TU'
  },
  // {
  //   label: 'Vacant/No Data',
  //   color: '#EBEBEB',
  //   code: null
  // },
];
