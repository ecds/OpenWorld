export const tileLayers = [
  {
    'year': 1928,
    'id': 'atl1928',
    'title': '1928 Atlas',
    'source': {
      'type': 'raster',
      'tiles': [
        'https://geoserver.ecds.emory.edu/ATLMaps/gwc/service/wms?layers=ATLMaps:ATL28&service=WMS&request=GetMap&layers=&styles=&format=image/png&transparent=true&version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}'
      ],
      'tileSize': 256
    },
    'layer':             {
      'id': 'atl1928',
      'type': 'raster',
      'source': 'atl1928',
      'paint': {
        'raster-opacity': 0,
        'raster-opacity-transition': {
          'duration': 700,
          'delay': 0
        }
      },
    }
  }
]