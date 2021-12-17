import React, { Suspense, lazy } from 'react';
import MapContext from '../Map/MapContext';
import { Control, DomUtil } from 'leaflet';

const Watermark = Control.extend({
  onAdd: (map) => {
    const link = DomUtil.create('a');
    link.href = 'https://ecds.emory.edu/';
    link.title = 'Emory Center for Digital Scholarship';

    const img = DomUtil.create('img');

    img.src = '/ecds.svg';
    img.style.height = '4.5rem';
    img.style.padding = '0.5rem';
    // img.style.backgroundColor = 'rgb(255 255 255 / 36%)';
    img.style.filter = 'drop-shadow( 3px 5px 2px rgba(0, 0, 0, .2))';
    img.style.cursor= 'pointer';

    link.appendChild(img);
    return link;
  },

  onRemove: () => {
    // meh
  }
})

export default class WatermarkControl extends React.Component {

  addToMap(map) {
    console.log("🚀 ~ file: WatermarkControl.js ~ line 22 ~ WatermarkControl ~ addToMap ~ map", map)
    const watermark = new Watermark({ position: 'bottomright' });
    console.log("🚀 ~ file: WatermarkControl.js ~ line 24 ~ WatermarkControl ~ addToMap ~ watermark", watermark)
    watermark.addTo(map)
  }

  render() {
    return(
      <MapContext.Consumer>
      {({map}) => {
        if (map) {
          this.addToMap(map);
          return(<span></span>)
        } else {
          return(<span></span>)
        }
      }}
      </MapContext.Consumer>

    )
  }
}