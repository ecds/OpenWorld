import L from 'leaflet';
import {} from '../../../../node_modules/@ecds/leaflet.vectorgrid/dist/Leaflet.VectorGrid'

export const layers = {
  // 1878: {
  //   year: '1878',
  //   layer: 'ATL1878_Buildings',
  //   workspace: 'Atlanta1878',
  //   bounds: [[33.73114623715696, -84.41759473046902], [33.778051329587036, -84.36236971796019]],
  //   leafletObject: new L.vectorGrid.protobuf(
  //     'https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/Atlanta1878:ATL1878_Buildings@EPSG:900913@pbf/{z}/{x}/{-y}.pbf',
  //     {
  //       rendererFactory: L.svg.tile,
  //       vectorTileLayerStyles: {
  //         ATL1878_Buildings: properties => {
  //           return buildingStyles(properties);
  //         },
  //       },
  //       interactive: true,
  //       // filter: (building) => {
  //       //   if (building.use == 'N') { return true }
  //       // },
  //       getFeatureId: (feature) => {
  //         console.log("🚀 ~ file: data.js ~ line 24 ~ feature", feature)
  //         // if (layer.details && Object.keys(layer.details).includes(feature.properties.Identifier)) {
  //         //   // const camera ='<span class="fs-3"><svg viewBox="0 0 512 512"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path></svg></span>';
  //         //   // const icon = L.divIcon({html: camera});
  //         //   const icon = L.divIcon({
  //         //     html: `<div class="jesse-dot"><div class="dot" style="background-color: ${this.getColor(feature.properties.use)}"></div><div class="pulsate-ring"  style="background-color: ${this.getColor(feature.properties.use)}"></div></div>`
  //         //   });
  //         //   const marker = L.marker(layer.details[feature.properties.Identifier].latLng, { icon });
  //         //   marker.addTo(this.state.map);
  //         //   marker.on('click', (event) => {
  //         //     event.layer = feature;
  //         //     this.handleClick(event);
  //         //   });
  //         //   this.state.markers.push(marker);
  //         // }
  //         return feature.properties.Identifier;
  //       }
  //     }
  //   )
  // },

  1928: {
    layer: 'OWAbuildings07OCT22',
    year: '1928',
    workspace: 'ATLMaps',
    bounds: [[33.7333353316, -84.4166017627], [33.7833813133, -84.3167420714]],
    leafletObject: new L.vectorGrid.protobuf(
      'https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/ATLMaps:OWAbuildings07OCT22@EPSG:900913@pbf/{z}/{x}/{-y}.pbf',
      {
        rendererFactory: L.svg.tile,
        vectorTileLayerStyles: {
          OWAbuildings07OCT22: properties => {
            return buildingStyles(properties);
          },
        },
        interactive: true,
        // filter: (building) => {
        //   if (building.use == 'N') { return true }
        // },
        getFeatureId: (feature) => {
          return feature.properties.Identifier;
        }
      }
    )
  }
}

export const omekaHighlight = async (buildings) => {
  const featureGroup = new L.featureGroup();

  // for (const building of buildings) {
  //   if (!building.longitude || !building.latitude) return;

  //   const icon = L.divIcon({
  //     html: `<div class="jesse-dot"><div class="dot" style="background-color: ${getColor(building.landUse)}"></div><div class="pulsate-ring"  style="background-color: ${getColor(building.landUse)}"></div></div>`
  //   });

  //   const marker = L.marker([building.latitude, building.longitude], { icon, interactive: false });
  //   marker.on('click', (event) => { console.log(event) })

  //   await featureGroup.addLayer(marker);
  // }
  return featureGroup;
}

const getColor = (use) => {
  switch(use) {
    case 'M':
      return '#AB59C9';
    case 'C':
      return '#E83333';
    case 'P':
      return '#2E6DFF';
    case 'R':
      return '#FFFFB3';
    case 'TU':
      return '#FFCCFF';
    case 'TR':
      return '#FFEB8A';
    case 'W':
      return '#AAAAAA';
    default:
      return '#EBEBEB';
  }
}

export const buildingStyles = (building) => {
  return {
    fillOpacity: 0.4,
    opacity: 0,
    fillColor: getColor(building.Land_Use),
    color: getColor(building.Land_Use),
    fill: true,
    weight: 1
  };
}

export const strongStyle = (building) => {
  return {
    ...buildingStyles(building),
    fillOpacity: 1,
    weight: 2,
    opacity: 0.5
  }
}

export const omekaMetadata = async () => {
  const response = await fetch('https://dvl.ecdsdev.org/api/items?collection=16&key=23bd7efbce6d7e1ceeee3265cddf6060543f0459&per_page=1000');
  const data = await response.json();
  const reasonableJSON = await data.map(async (building) => {
    const fileResponse = await fetch(`${building.files.url}&key=23bd7efbce6d7e1ceeee3265cddf6060543f0459`);
    const fileData = await fileResponse.json();
    const latLng = { longitude: null, latitude: null };
    if (building.extended_resources.geolocations) {
      const locationResponse = await fetch(`${building.extended_resources.geolocations.url}?key=23bd7efbce6d7e1ceeee3265cddf6060543f0459`);
      const locationData = await locationResponse.json();
      latLng.longitude = locationData.longitude;
      latLng.latitude = locationData.latitude;
    }
    const images = fileData.map((image) => {
      return{
        thumb: image.file_urls.thumbnail,
        full: image.file_urls.original,
        caption: image.original_filename
      }
     });

    return{
      title: building.element_texts.find(el => el.element.id === 50).text,
      bldgID: building.element_texts.find(el => el.element.id === 43).text,
      address: building.element_texts.find(el => el.element.id === 53).text,
      landUse: building.element_texts.find(el => el.element.id === 49).text[0],
      ...latLng,
      images
    }
  });

  const buildingMetadata = await Promise.all(reasonableJSON);
  return buildingMetadata;
}
