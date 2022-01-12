import React from 'react';
import { TileLayer, WMSTileLayer, LayerGroup } from 'react-leaflet';
import MapContext from '../MapContext';
import Toast from 'react-bootstrap/Toast'
import { Button ToastContainer } from 'bootstrap';

export default class RasterLayer extends React.Component {

  render() {
    return(
      <MapContext.Consumer>
      {({map}) => {
        if (map) {
          return(<span>
          </span>)
        } else {
          return(<></>)
        }
      }}
      </MapContext.Consumer>

    )
  }
}