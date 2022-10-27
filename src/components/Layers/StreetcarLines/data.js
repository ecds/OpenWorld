// import chroma from 'chroma-js';
import L from 'leaflet';
import chroma from 'chroma-js';

const StreetcarLines = {
  1924: [
    {
      number: 1,
      name: 'Decatur St-Marietta St',
      color: '#ff0000'
    },
    {
      number: 2,
      name: 'Ponce de Leon-West View',
      color: '#ed7940'
    },
    {
      number: 3,
      name: 'Boulevard-West Hunter',
      color: '#ffff00'
    },
    {
      number: 4,
      name: 'Georgia Ave-Inman Park',
      color: '#e600a9'
    },
    {
      number: 5,
      name: 'Highland-South Pryor',
      color: '#409679'
    },
    {
      number: 6,
      name: 'Forrest-Capitol',
      color: '#4094ff'
    },
    {
      number: 7,
      name: 'West Peachtree-East Hunter',
      color: '#6677cd'
    },
    {
      number: 8,
      name: 'Howell Mill Rd-East Fair',
      color: '#8400a8'
    },
    {
      number: 9,
      name: 'Courtland-Central',
      color: '#be4040'
    },
    {
      number: 10,
      name: 'Peachtree-Whitehall',
      color: '#d3d37f'
    },
    {
      number: 11,
      name: 'Luckie-Woodward',
      color: '#ca7af5'
    },
    {
      number: 12,
      name: 'Pine-Cooper',
      color: '#cdf57a'
    },
    {
      number: 13,
      name: 'Irwin-West Fair',
      color: '#ff7fe2'
    },
    {
      number: 14,
      name: 'Orme-Magnolia',
      color: '#267300'
    },
    {
      number: 15,
      name: 'Piedmont-Washington',
      color: '#ff7f7f'
    },
    {
      number: 16,
      name: 'Pine St',
      color: '#a6a6a6'
    },
    {
      number: 17,
      name: 'Main Decatur',
      color: '#407abe'
    },
    {
      number: 18,
      name: 'South Decatur-East Lake',
      color: '#e69800'
    },
    {
      number: 19,
      name: 'River',
      color: '#40d4ff'
    },
    {
      number: 20,
      name: 'College Park and Hapeville',
      color: '#be40a3'
    },
    {
      number: 21,
      name: 'Stewart Avenue',
      color: '#38a800'
    },
    {
      number: 22,
      name: 'English Ave-Soldiers\' Home',
      color: '#00a884'
    },
    {
      number: 23,
      name: 'Buckhead and Oglethorpe',
      color: '#ffb9ef'
    },
    {
      number: 24,
      name: 'McDaniel\'s Street',
      color: '#73ffdf'
    }
  ]
};

export const StreetcarLayers = async (year) => {
  const layers = [];

  if (year) {
    // const colors = chroma.scale('Set1').correctLightness().colors(26).sort((a, b) => 0.5 - Math.random());

    for (const [index, line] of StreetcarLines[year].entries()) {
      const label = `${line.number}: ${line.name}`;
      const response = await fetch(`https://geoserver.ecds.emory.edu/StreetcarRoutes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=StreetcarRoutes:${year}_Route_${line.number}&maxFeatures=500&outputFormat=application%2Fjson`);
      const data = await response.json();

      const leafletObject = new L.GeoJSON(
        data,
        {
          color: line.color,
          fillColor: chroma.contrast(line.color, 'white') > 4.5 ? 'white': 'black',
          weight: 4,
          dashArray: '20 20',
          dashOffset: index % 2 === 0 ? '1' : '2',
          onEachFeature,
          label
        }
      );

      layers.push({ label, leafletObject });
    }
  }

  return layers;
}

const onEachFeature = (feature, layer) => {
  layer.bindPopup(
    `<span style="color: ${layer.options.color}; backgroundColor: ${layer.options.fillColor};">${layer.options.label}</span>`,
    {
      className: layer.options.fillColor === 'black' ? 'owa-streetcar-popup-dark' : ''
    }
  );

  layer.on({
    'mouseover': function (event) {
        highlightGeoJSON(event.target);
        layer.openPopup(event.latlng);
        layer.bringToFront();
    },
    'mouseout': function () {
        dehighlightGeoJSON(layer);
        layer.closePopup();
        layer.bringToBack();
    }
  });
}

export const highlightGeoJSON = (layer) => {
  if (!layer) return;

  try {
      layer.setStyle({
          weight: 8,
          dashArray: '1'
      });
      layer.eachLayer(layer => layer.openPopup());
      layer.bringToFront();
  } catch(e) {
      console.log(e)
  }
}

export const dehighlightGeoJSON = (layer) => {
   layer.setStyle({
       weight: 4,
       dashArray: '20 20'
   });
}

export default StreetcarLayers;
