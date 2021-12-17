import chroma from 'chroma-js';

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

export const StreetcarLayers = function(year) {
  if (year) {
    const layers = [];
    const colors = chroma.scale('Set1').correctLightness().colors(26).sort((a, b) => 0.5 - Math.random());
    StreetcarLines[year].forEach((line, index) => {
        layers.push(
            {
                id: line,
                icon: null,
                label: line.split('_').slice(1).join(' '),
                type: 'line',
                url: `https://geoserver.ecds.emory.edu/StreetcarRoutes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=StreetcarRoutes:${line}&maxFeatures=500&outputFormat=application%2Fjson`,
                clickable: true,
                onMap: false,
                activeColor: colors[index],
                order: index,
                options: {
                    color: colors[index],
                    weight: 4,
                    dashArray: '20 20',
                    dashOffset: index % 2 == 0 ? '1' : '2'
                }
            }
        );
    });

    return {
        desc: `Streetcar Lines in ${year}`,
        attr: 'Source TBA',
        id: `streetcar${year}`,
        icon: null,
        label: `Streetcar Lines in ${year}`,
        type: 'annexations',
        layers
    }
  } else {
    return { layers: [] };
  }
}
