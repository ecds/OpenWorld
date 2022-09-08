import React from 'react';

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