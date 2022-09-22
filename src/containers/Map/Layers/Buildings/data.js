export const layers = {
  1878: {
    layer: 'ATL1878_Buildings',
    workspace: 'Atlanta1878',
    bounds: [[33.73114623715696, -84.41759473046902], [33.778051329587036, -84.36236971796019]]
  },

  1928: {
    layer: 'OWAbuildings07SEP22',
    workspace: 'ATLMaps',
    bounds: [[33.7333353316, -84.4166017627], [33.7833813133, -84.3167420714]],
    details: {
      BD15099: {
        omekaIdentifier: 109,
        latLng: [33.756854, -84.388618]
      },
      BD15695: {
        omekaIdentifier: 33,
        latLng: [33.7594, -84.3859]
      },
      BD37940: {
        omekaIdentifier: 38,
        latLng: [33.74874142, -84.41570194]
      }
    }
  }
}

export async function fetchMetadata(identifier) {
  const url = new URL(`https://dvl.ecdsdev.org/api/items/${identifier}`);
  url.search = new URLSearchParams({ key: '23bd7efbce6d7e1ceeee3265cddf6060543f0459' });
  const response = await fetch(url);
  const data = await response.json();
  return {
    title: data.element_texts.find(el => el.element.name === 'Title').text,
    body: data.element_texts.find(el => el.element.name === 'Description').text,
    identifier
  }
}

export const COLORS = {
  A: 'olive',
  C: 'red',
  F: 'orange',
  FILM: 'pink',
  I: 'purple',
  MFG: 'purple',
  M: 'brown',
  O: 'black',
  P: 'blue',
  FD: 'blue',
  R: 'green',
  T: 'lightgray',
  U: 'gray',
  W: 'violet'
}

// export fetchMetadata;