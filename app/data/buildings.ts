type TVectorTileLayer = {
  [key: string]: {
    id: string;
    bounds: Array<number[]>;
    center: [number, number];
  };
};
export const buildings: TVectorTileLayer = {
  "1928": {
    id: "OWAbuildings07OCT22",
    bounds: [
      [-84.4295658336286, 33.73107756260961],
      [-84.34658604514821, 33.79524918165538],
    ],
    center: [-84.38812858886877, 33.74937124416094],
  },
};

export const buildingUses = [
  {
    label: "Residential",
    color: "#FFFF00",
    code: "R",
  },
  {
    label: "Residential Transient",
    color: "#FF6F00",
    code: "TR",
  },
  {
    label: "Commercial/Office",
    color: "#E83333",
    code: "C",
  },
  {
    label: "Warehouse",
    color: "#5D4037",
    code: "W",
  },
  {
    label: "Manufacturing/Industrial",
    color: "#AB59C9",
    code: "M",
  },
  {
    label: "Public/Institutional",
    color: "#2E6DFF",
    code: "P",
  },
  {
    label: "Transportation/Utility",
    color: "#FFCCFF",
    code: "TU",
  },
  // {
  //   label: 'Vacant/No Data',
  //   color: '#EBEBEB',
  //   code: null
  // },
];
