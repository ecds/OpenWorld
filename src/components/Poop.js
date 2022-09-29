import React from 'react';

export default class Poop extends React.Component {
  componentWillUnmount() {
    console.log('unmounting');
  }

  render() {
    return(
      <div>{this.props.currentYear}</div>
    )
  }
}
