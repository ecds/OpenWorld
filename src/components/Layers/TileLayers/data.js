import L from 'leaflet';

const modernStreetMapDescription = () => {
  return (
    <p>
      &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>
    </p>
  )
}

const satelliteDescription = () => {
  return (
    <div>
      <dl>
        <dt>Imagery</dt>
        <dd>
          Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community.
        </dd>
        <dt>Labels</dt>
        <dd>
          &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>
        </dd>
      </dl>
      <p>
      </p>
    </div>
  );
}

export const tileLayers = [
  {
    urls: ['https://geoserver.ecds.emory.edu/Atlanta1878/gwc/service/wms?layers=Atlanta1878:q516x4&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/Atlanta1878/gwc/service/wms?layers=Atlanta1878:q516x4&format=image/png&transparant=true', {
        opacity: 0,
        maxZoom: 20
      })
    ],
    type: 'WMS',
    year: 1840,
    title: '1853 City Atlas',
    description: 'Originally produced in 1853 for the City Council by civil engineer Edward Vincent. Includes index and circle marking the extended city limits. "These numbers are city numbers, and deeds refer to them--whether subdivisions or not. N.B. The City Line has been extended."',
    researchLinks: [
      'https://scholarblogs.emory.edu/woodruff/news/explore-marbls-digital-historic-map-collection',
      'http://www.digitalgallery.emory.edu/luna/servlet/detail/EMORYUL~3~3~1000~100068:Old-Map-of-Atlanta?sort=Publication_Title%2CTitle%2CPage_No_%2CPages&qvq=sort:Publication_Title%2CTitle%2CPage_No_%2CPages;lc:EMORYUL%7E3%7E3&mi=0&trs=24',
      'https://muse.jhu.edu/article/430839/pdf',
      'https://en.wikipedia.org/wiki/Edward_A._Vincent',
      'https://www.loc.gov/resource/g3924a.ct001134/'
    ]
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2rwkdcdv&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2rwkdcdv&format=image/png&transparant=true', {
        opacity: 0,
        maxZoom: 20
      })
    ],
    type: 'WMS',
    year: 1870,
    title: '1870 City Map',
    description: 'Hanleiter\'s Directory Map of Atlanta, 1870.',
    researchLinks: [
      'https://dlg.usg.edu/record/gsu_afpl_26?canvas=0&x=1948&y=2577&w=5795'
    ]
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s4d022m&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s4d022m&format=image/png&transparant=true', {
        opacity: 0,
        maxZoom: 20
      })
    ],
    type: 'WMS',
    year: 1895,
    title: '1895 City Map'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s6zg3zx&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s6zg3zx&format=image/png&transparant=true', {
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
        opacity: 0,
        maxZoom: 20
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
      // L.tileLayer.wms('https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png', {
      //   opacity: 0
      // }),
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms', {
        layers: 'ATLMaps:ATL28',
        format: 'image/png',
        transparent: true,
        updateInterval: 1,
        opacity: 0,
        maxZoom: 20
      })
    ],
    bounds: [[33.93379544, -84.21603335], [33.63298531, -84.51696580]],
    title: '1928 City Atlas'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s3w9vfd&'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s3w9vfd', {
        format: 'image/png',
        transparent: true,
        opacity: 0,
        maxZoom: 20
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
    title: 'Modern Street Map',
    description: modernStreetMapDescription()
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
    title: 'Modern Satellite Image',
    description: satelliteDescription()
  },
];

export const YEARS = tileLayers.map(layer => { return layer.year });
