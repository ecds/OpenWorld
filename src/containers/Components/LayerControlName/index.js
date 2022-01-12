import React from 'react';
import { MAP_TILE_LAYERS } from '../../../constants';
import Container from 'react-bootstrap/Container';

export default class LayerControlName extends React.Component {
  render() {
    return (
      <div className="leaflet-bottom leaflet-left opacity-control">
        <div className='leaflet-control leaflet-bar'>
          {this.props.children}
        </div>
      </div>
    )
  }
}