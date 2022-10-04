import L from 'leaflet';

export const YEARS = [1854, 1871, 1874, 1883];

export const Colors = {
  '1': '#f5ebaa',
  '2': '#ebb7a6',
  '3': '#c4e4a7',
  '4': '#bec9d2',
  '5': '#e9c0d3',
  '6': '#b9d2bb',
  '7': '#bbb2a1'
}

export const Layers = async () => {
  const layers = [];
  const options = {
    color: 'lightgray',
    weight: 4,
    fillOpacity: 0.7,
    opacity: 1,
    onEachFeature
  };

  for (const year of YEARS) {
    const response = await fetch(`https://geoserver.ecds.emory.edu/Wards/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Wards:Wards${year}&maxFeatures=500&outputFormat=application%2Fjson`);
    const data = await response.json();

    const leafletLayer = new L.GeoJSON(data, options);

    layers.push(
      {
        desc: `City of Atlanta Wards in ${year}`,
        id: `ward${year}`,
        label: `Wards ${year}`,
        type: 'polygon',
        url: `https://geoserver.ecds.emory.edu/Wards/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Wards:Wards${year}&maxFeatures=500&outputFormat=application%2Fjson`,
        year,
        leafletLayer,
        details: DETAILS[year]
      }
    );
  };

  return layers;
}

export const addLabels = (map, leafletLayer) => {
  const labels = [];
  for (const layer of leafletLayer.getLayers()) {
    const icon = L.divIcon({html: `<h1>${layer.feature.properties.Ward}</h2>`});
    const label = L.marker(layer.getCenter(), { icon });
    label.addTo(map);
    labels.push(label);
  }

  return labels;
}

const onEachFeature = (feature, layer) => {
  layer.setStyle({...layer.options, color: Colors[`${feature.properties.Ward}`]});
  layer.bindPopup(`<h3>Ward ${feature.properties.Ward}</h3>`);
}

const DETAILS = {
  1854: {
    title: 'Atlanta’s Five Wards (1854-1871)',
    intro: 'In 1854 an ordinance was adopted that divided the town into five wards:',
    wards: [
      {
        title: 'First',
        description: 'The area to the west of the Western & Atlantic Railroad and Whitehall Street. The eastern section of the ward was quite wealthy and the northern and western parts of the ward was working class.'
      },
      {
        title: 'Second',
        description: 'The area to the south of Georgia Railroad between Whitehall and McDonough Streets. Considered a wealthy part of the city containing the bulk of the Atlanta’s commerce including stores, warehouses, food markets, and hotels. '
      },
      {
        title: 'Third',
        description: 'The area to south of the Georgia Railroad and east of McDonough Street which included the new city hall. Also characterized by large estates and mills that strung along the railroad. '
      },
      {
        title: 'Fourth',
        description: 'The area north of the Georgia Railroad and east of Ivy Street. Most of the northern part of the ward was farmland but intown areas including the red-light district along Decatur, Murrell’s Row, and Slabtown. '
      },
      {
        title: 'Fifth',
        description: 'The area west of Ivy Street and north of the Western & Atlantic Railroad that including the large Victorian homes along Peachtree Street. The southern part of the ward included Fairlie-Poplar residential areas and warehousing to the west.'
      }
    ]
  }
}
