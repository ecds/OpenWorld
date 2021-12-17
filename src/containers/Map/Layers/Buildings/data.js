export const layers = {
  1878: {
    layer: 'ATL1878_Buildings',
    workspace: 'Atlanta1878',
    bounds: [[33.73114623715696, -84.41759473046902], [33.778051329587036, -84.36236971796019]]
  },

  1928: {
    layer: 'buildings_1928',
    workspace: 'ATLMaps',
    bounds: [[33.7333353316, -84.4166017627], [33.7833813133, -84.3167420714]],
    details: {
      BD15099: {
        omekaIdentifier: 109
      }
    }
  }
}

export async function fetchMetadata(identifier) {
  const url = new URL(`https://dvl.ecdsdev.org/api/items/${identifier}`);
  url.search = new URLSearchParams({ key: '9500a826d4d2090717218ef84a8ca6a816870cbb' });
  const response = await fetch(url);
  const data = await response.json();
  return {
    title: data.element_texts.find(el => el.element.name == 'Title').text,
    body: data.element_texts.find(el => el.element.name == 'Description').text,
    identifier
  }
}

// export fetchMetadata;