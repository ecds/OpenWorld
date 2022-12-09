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

const defaultLayerOptions = {
  format: 'image/png',
  transparent: true,
  updateInterval: 1,
  opacity: 0,
  maxZoom: 20
}

export const tileLayers = [
  {
    urls: ['https://geoserver.ecds.emory.edu/Atlanta1878/gwc/service/wms?layers=Atlanta1878:q516x4&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/Atlanta1878/gwc/service/wms?layers=Atlanta1878:q516x4&format=image/png&transparant=true', {
        ...defaultLayerOptions,
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
        ...defaultLayerOptions,
        maxZoom: 20
      })
    ],
    type: 'WMS',
    year: 1870,
    title: '1870 City Map',
    description: 'The Hanlieter\'s Directory Map was published as part of the 1870 Atlanta City Directory. William R. Hanleiter of 1 South Broad Street was the publisher and the directory sold for two dollars. The document was a full alphabetical record of names of persons, firms, companies, orders, and associations in Atlanta and the West End.',
    researchLinks: [
      'https://dlg.usg.edu/record/gsu_afpl_26?canvas=0&x=1948&y=2577&w=5795',
      'https://archive.org/details/emory1870/page/n1/mode/2up'
    ]
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s4d022m&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s4d022m&format=image/png&transparant=true', {
        ...defaultLayerOptions
      })
    ],
    type: 'WMS',
    year: 1895,
    title: '1895 City Map',
    description: 'This 1895 map was published as part of George Franklin Cram\'s Standard American Railway System Atlas.'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s6zg3zx&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:2s6zg3zx&format=image/png&transparant=true', {
        ...defaultLayerOptions
      })
    ],
    type: 'WMS',
    year: 1906,
    title: '1906 City Map',
    description: 'This 1906 map was produced by civil engineer, O. F. Kauffman. Later, the company became know as O. F. Kauffman and Brother which in 1929 became I. U. Kauffman and Sons. Ira Ulysses Kauffman worked as the Georgia Division Chief Engineer of Georgia, United States Coast and Geodetic Survey. Kauffman’s projects inculded Druid Hills, Ansley Park, and Avondale Estates. He also provided surveying and mapping for both Camp Gordon and Fort Benning army posts.'
  },
  {
    urls: ['https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:sq4pd&format=image/png&transparant=true'],
    leafletLayers: [
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:sq4pd&format=image/png&transparant=true', {
        ...defaultLayerOptions
      })
    ],
    type: 'WMS',
    year: 1911,
    title: '1911 Street Map',
    description: 'Peter Fenelon Collier founded the P. F. Collier and Son Publishing Company in 1888. P. F. Collier died in 1909 and his son, Robert Joseph Collier, took over the company. This 1911 map was published in Gazetteer of Cities and Towns of the World.'
  },
  {
    year: 1928,
    urls: [
      'https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png',
      'https://s3.amazonaws.com/tilemaps/ATL28_200tiles/{z}/{x}/{y}.png'
    ],
    leafletLayers: [
      // L.tileLayer.wms('https://s3.amazonaws.com/tilemaps/ATL28_1000tiles/{z}/{x}/{y}.png', {
      //   ...defaultLayerOptions
      // }),
      L.tileLayer.wms('https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms', {
        layers: 'ATLMaps:ATL28',
        ...defaultLayerOptions
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
        ...defaultLayerOptions,
        maxZoom: 20
      })
    ],
    type: 'WMS',
    year: 1934,
    title: '1934 Street Map',
    description: 'This 1934 map was produced by civil engineer, Ira Ulysses Kauffman. He worked as the Georgia Division Chief Engineer of Georgia, United States Coast and Geodetic Survey. Kauffman’s projects inculded Druid Hills, Ansley Park, and Avondale Estates. He also provided surveying and mapping for both Camp Gordon and Fort Benning army posts.'
  },
  {
    urls: [
        'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    ],
    leafletLayers: [
      L.tileLayer.wms('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        ...defaultLayerOptions
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
        ...defaultLayerOptions
      }),
      L.tileLayer.wms('https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        ...defaultLayerOptions
      })
    ],
    year: 2022,
    title: 'Modern Satellite Image',
    description: satelliteDescription()
  },
];

export const YEARS = tileLayers.map(layer => { return layer.year });
