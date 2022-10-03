import chroma from 'chroma-js';
import L from 'leaflet';

const StreetcarLines = {
  1924: [
      '1924_Route_1',
      '1924_Route_2',
      '1924_Route_3',
      '1924_Route_4',
      '1924_Route_5',
      '1924_Route_6',
      '1924_Route_7',
      '1924_Route_8',
      '1924_Route_9',
      '1924_Route_10',
      '1924_Route_11',
      '1924_Route_12',
      '1924_Route_13',
      '1924_Route_14',
      '1924_Route_15',
      '1924_Route_16',
      '1924_Route_17',
      '1924_Route_18',
      '1924_Route_19',
      '1924_Route_20',
      '1924_Route_21',
      '1924_Route_22',
      '1924_Route_23',
      '1924_Route_24',
      '1924_Sidings',
      '1924_SupportBuildings'
  ]
};

export const StreetcarLayers = async (year) => {
  const layers = [];
  if (year) {
    const colors = chroma.scale('Set1').correctLightness().colors(26).sort((a, b) => 0.5 - Math.random());
    for (const [index, line] of StreetcarLines[year].entries()) {
      const label = line.split('_').slice(1).join(' ');
      const response = await fetch(`https://geoserver.ecds.emory.edu/StreetcarRoutes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=StreetcarRoutes:${line}&maxFeatures=500&outputFormat=application%2Fjson`);
      const data = await response.json();
      const leafletObject = new L.GeoJSON(
        data,
        {
          color: colors[index],
          weight: 4,
          dashArray: '20 20',
          dashOffset: index % 2 === 0 ? '1' : '2',
          onEachFeature,
          label
        }
      )

      layers.push({ label, leafletObject });
    }
  }

  return layers;
}

const onEachFeature = (feature, layer) => {
  let curr = null;
  layer.bindPopup(`<h1 style="color: ${layer.options.color};">${layer.options.label}</h1>`)
  layer.on({
      'mouseover': function (e) {
          highlightGeoJSON(e.target);
          // layer.getPopup().setLatLng(e.latlng).open;
          layer.openPopup(e.latlng);
          layer.bringToFront();
      },
      'mouseout': function (e) {
          dehighlightGeoJSON(layer, e.target, curr);
          layer.closePopup();
          layer.bringToBack();
      },
      'click': function(e) {
          curr = selectGeoJSON(layer, e.target, null,  curr);
      }
  })
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

export const dehighlightGeoJSON = (data, layer, selected=null) => {
   if (selected && selected._leaflet_id === layer._leaflet_id)
       return;

   layer.setStyle({
       weight: 4,
       dashArray: '20 20'
   });
}

const selectGeoJSON = (data, layer, map, curr) => {
  if (curr && curr._leaflet_id !== layer._leaflet_id) {
      dehighlightGeoJSON(data, curr, null);
      curr.bringToBack();
  }

  // map.fitBounds(layer.getBounds());
  layer.setStyle({
      weight: 5,
  });

  layer.bringToFront();

  return layer;
}

export default StreetcarLayers;

// https://geoserver.ecds.emory.edu/StreetcarRoutes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=StreetcarRoutes:1924_Route_1&maxFeatures=500&outputFormat=application%2Fjson
// https://geoserver.ecds.emory.edu/StreetcarRoutes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=StreetcarRoutes:9&maxFeatures=500&outputFormat=application%2Fjson