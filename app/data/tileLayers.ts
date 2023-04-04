const geoserverUrl = (workspace, layer) => {
  return {
    'type': 'raster',
    'tiles': [
      `https://geoserver.ecds.emory.edu/${workspace}/gwc/service/wms?layers=${workspace}:${layer}&service=WMS&request=GetMap&layers=&styles=&format=image/png&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}`
    ],
    'tileSize': 256
  }
}

const defaultPaintOptions = {
  'raster-opacity': 0,
  'raster-opacity-transition': {
    'duration': 700,
    'delay': 0
  }
};

export const tileLayers = [
  {
    'year': 1840,
    'title': '1853 City Atlas',
    'description': 'Originally produced in 1853 for the City Council by civil engineer Edward Vincent. Includes index and circle marking the extended city limits. "These numbers are city numbers, and deeds refer to them--whether subdivisions or not. N.B. The City Line has been extended."',
    'researchLinks': [
      'https://scholarblogs.emory.edu/woodruff/news/explore-marbls-digital-historic-map-collection',
      'http://www.digitalgallery.emory.edu/luna/servlet/detail/EMORYUL~3~3~1000~100068:Old-Map-of-Atlanta?sort=Publication_Title%2CTitle%2CPage_No_%2CPages&qvq=sort:Publication_Title%2CTitle%2CPage_No_%2CPages;lc:EMORYUL%7E3%7E3&mi=0&trs=24',
      'https://muse.jhu.edu/article/430839/pdf',
      'https://en.wikipedia.org/wiki/Edward_A._Vincent',
      'https://www.loc.gov/resource/g3924a.ct001134/'
    ],
    'source': geoserverUrl('Atlanta1878', 'q516x4'),
    'layer': {
      'id': 'atl1840',
      'type': 'raster',
      'source': 'atl1840',
      'paint': defaultPaintOptions
    }
  },
  {
    'year': 1870,
    'title': '1870 City Map',
    'description': 'The Hanlieter\'s Directory Map was published as part of the 1870 Atlanta City Directory. William R. Hanleiter of 1 South Broad Street was the publisher and the directory sold for two dollars. The document was a full alphabetical record of names of persons, firms, companies, orders, and associations in Atlanta and the West End.',
    'researchLinks': [
      'https://dlg.usg.edu/record/gsu_afpl_26?canvas=0&x=1948&y=2577&w=5795',
      'https://archive.org/details/emory1870/page/n1/mode/2up'
    ],
    'source': geoserverUrl('ATLMaps', '2rwkdcdv'),
    'layer': {
      'id': 'atl1870',
      'type': 'raster',
      'source': 'atl1870',
      'paint': defaultPaintOptions
    }
  },
  {
    'year': 1895,
    'title': '1895 City Map',
    'source': geoserverUrl('ATLMaps', '2s4d022m'),
    'layer': {
      'id': 'atl1895',
      'type': 'raster',
      'source': 'atl1895',
      'paint': defaultPaintOptions,
    }
  },
  {
    'year': 1906,
    'title': '1906 City Map',
    'source': geoserverUrl('ATLMaps', '2s6zg3zx'),
    'layer': {
      'id': 'atl1906',
      'type': 'raster',
      'source': 'atl1906',
      'paint': defaultPaintOptions,
    }
  },
  {
    'year': 1911,
    'title': '1911 Street Map',
    'source': geoserverUrl('ATLMaps', 'sq4pd'),
    'layer': {
      'id': 'atl1911',
      'type': 'raster',
      'source': 'atl1911',
      'paint': defaultPaintOptions,
    }
  },
  {
    'year': 1928,
    'title': '1928 Atlas',
    'source': geoserverUrl('ATLMaps', 'ATL28'),
    'layer': {
      'id': 'atl1928',
      'type': 'raster',
      'source': 'atl1928',
      'paint': defaultPaintOptions,
    }
  },
  {
    'year': 1934,
    'title': '1934 Street Map',
    'source': geoserverUrl('ATLMaps', '2s3w9vfd'),
    'layer': {
      'id': 'atl1934',
      'type': 'raster',
      'source': 'atl1934',
      'paint': defaultPaintOptions
    }
  },
  {
    'year': 2023,
    'title': 'Modern Street Map',
    'source': {
      'type': 'raster',
      'tileSize': 256,
      'tiles': [
        'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      ]
    },
    'layer': {
      'id': 'modernStreet',
      'type': 'raster',
      'source': 'modernStreet',
      'paint': defaultPaintOptions
    }
  },
  {
    'year': 2023,
    'title': 'Modern Satellite Image',
    'source': {
      'type': 'raster',
      'tileSize': 256,
      'tiles': [
        'https://api.mapbox.com/styles/v1/jayvarner/clfl9e5bl002d01nuiuh6onc3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamF5dmFybmVyIiwiYSI6ImVkYjliN2Y3ZDZlYzEyNzg5NDhiMGU4MWRiZTY3Mzk3In0.U4Sc4HVk2F4MkKyd7ybgXw'
      ]
    },
    'layer': {
      'id': 'modernSatellite',
      'type': 'raster',
      'source': 'modernSatellite',
      'paint': defaultPaintOptions
    }
  }
];

export const YEARS = tileLayers.map((layer) => layer.year);