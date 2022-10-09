import L from 'leaflet';
import {} from '../../../../node_modules/@ecds/leaflet.vectorgrid/dist/Leaflet.VectorGrid'

export const layers = {
  1878: {
    year: '1878',
    layer: 'ATL1878_Buildings',
    workspace: 'Atlanta1878',
    bounds: [[33.73114623715696, -84.41759473046902], [33.778051329587036, -84.36236971796019]],
    leafletObject: new L.vectorGrid.protobuf(
      'https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/Atlanta1878:ATL1878_Buildings@EPSG:900913@pbf/{z}/{x}/{-y}.pbf',
      {
        rendererFactory: L.svg.tile,
        vectorTileLayerStyles: {
          ATL1878_Buildings: properties => {
            return buildingStyles(properties);
          },
        },
        interactive: true,
        // filter: (building) => {
        //   if (building.use == 'N') { return true }
        // },
        getFeatureId: (feature) => {
          // if (layer.details && Object.keys(layer.details).includes(feature.properties.Identifier)) {
          //   // const camera ='<span class="fs-3"><svg viewBox="0 0 512 512"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path></svg></span>';
          //   // const icon = L.divIcon({html: camera});
          //   const icon = L.divIcon({
          //     html: `<div class="jesse-dot"><div class="dot" style="background-color: ${this.getColor(feature.properties.use)}"></div><div class="pulsate-ring"  style="background-color: ${this.getColor(feature.properties.use)}"></div></div>`
          //   });
          //   const marker = L.marker(layer.details[feature.properties.Identifier].latLng, { icon });
          //   marker.addTo(this.state.map);
          //   marker.on('click', (event) => {
          //     event.layer = feature;
          //     this.handleClick(event);
          //   });
          //   this.state.markers.push(marker);
          // }
          return feature.properties.Identifier;
        }
      }
    )
  },

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
          // if (layer.details && Object.keys(layer.details).includes(feature.properties.Identifier)) {
          //   // const camera ='<span class="fs-3"><svg viewBox="0 0 512 512"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path></svg></span>';
          //   // const icon = L.divIcon({html: camera});
          //   const icon = L.divIcon({
          //     html: `<div class="jesse-dot"><div class="dot" style="background-color: ${this.getColor(feature.properties.use)}"></div><div class="pulsate-ring"  style="background-color: ${this.getColor(feature.properties.use)}"></div></div>`
          //   });
          //   const marker = L.marker(layer.details[feature.properties.Identifier].latLng, { icon });
          //   marker.addTo(this.state.map);
          //   marker.on('click', (event) => {
          //     event.layer = feature;
          //     this.handleClick(event);
          //   });
          //   this.state.markers.push(marker);
          // }
          return feature.properties.Identifier;
        }
      }
    )
  }
}

const getColor = (use) => {
  if (use) {
    switch(use.toUpperCase()) {
      case 'A':
        return 'olive';
      case 'C':
        return 'red';
      case 'F':
        return 'orange';
      case 'FILM':
        return 'pink';
      case 'I':
      case 'MFG':
        return 'purple';
      case 'M':
        return 'brown';
      case 'O':
        return 'black';
      case 'P':
      case 'FD':
        return 'blue';
      case 'R':
        return 'green';
      case 'T':
        return 'lightgray';
      case 'U':
        return 'gray';
      case 'W':
        return 'violet';
      default:
        return 'cyan';
    }
  } else {
    return 'black';
  }
}

// const landUseColor = {
//   'Residential': '#FFFFB3',
//   'Residential Transient': '#FFEB8A',
//   'Commercial/Office': '#E83333',
//   'Warehouse': '#AAAAAA',
//   'Manufacturing/Industrial': '#AB59C9',
//   'Public/Institutional': '#2E6DFF',
//   'Transportation/Utility': '#FFCCFF',
//   'Vacant/No Data': '#EBEBEB'
// }

export const buildingStyles = (building) => {
  return {
    fillOpacity: 0.15,
    opacity: 0.3,
    fillColor: getColor(building.Land_Use),
    color: getColor(building.use),
    fill: true,
    weight: 1
  };
}

export const strongStyle = (building) => {
  return {
    ...buildingStyles(building),
    fillOpacity: 0.7,
    weight: 2,
    opacity: 0.5
  }
}
