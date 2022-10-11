import L from 'leaflet';

export const tileLayers = [
  {
    urls: ['https://geoserver.ecds.emory.edu/Atlanta1878/gwc/service/wms?layers=Atlanta1878:q516x4&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/Atlanta1878/gwc/service/wms?layers=Atlanta1878:q516x4&format=image/png&transparant=true', {
        opacity: 0
      })
    ],
    type: 'WMS',
    year: 1840,
    title: '1848 City Atlas'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2rwkdcdv&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2rwkdcdv&format=image/png&transparant=true', {
        opacity: 0
      })
    ],
    type: 'WMS',
    year: 1870,
    title: '1870 City Map'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s4d022m&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s4d022m&format=image/png&transparant=true', {
        opacity: 0
      })
    ],
    type: 'WMS',
    year: 1895,
    title: '1895 City Map'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:Atlanta1906&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:Atlanta1906&format=image/png&transparant=true', {
        opacity: 0
      })
    ],
    type: 'WMS',
    year: 1906,
    title: '1906 City Map'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:sq4pd&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:sq4pd&format=image/png&transparant=true', {
        opacity: 0
      })
    ],
    type: 'WMS',
    year: 1911,
    title: '1911 Street Map'
  },
  {
    year: 1928,
    urls: [
      'https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png',
      'https://s3.amazonaws.com/tilemaps/ATL28_200tiles/{z}/{x}/{y}.png'
    ],
    leafletLayers: [
      L.tileLayer.wms('https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png', {
        opacity: 0
      }),
      L.tileLayer.wms('https://s3.amazonaws.com/tilemaps/ATL28_200tiles/{z}/{x}/{y}.png', {
        opacity: 0
      })
    ],
    bounds: [[33.93379544, -84.21603335], [33.63298531, -84.51696580]],
    minZoom: 11,
    maxNativeZoom: 16,
    title: '1928 City Atlas'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s3w9vfd&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s3w9vfd&format=image/png&transparant=true', {
        opacity: 0
      })
    ],
    type: 'WMS',
    year: 1934,
    title: '1934 Street Map'
  },
  {
    urls: [
        'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    ],
    leafletLayers: [
      L.tileLayer.wms('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        opacity: 0
      })
    ],
    year: 2022,
    title: 'Modern Street Map'
  },
  {
    urls: [
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      'https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png'
    ],
    leafletLayers: [
      L.tileLayer.wms('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        opacity: 0
      }),
      L.tileLayer.wms('https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        opacity: 0
      })
    ],
    year: 2022,
    title: 'Modern Satellite Image'
  },
];
