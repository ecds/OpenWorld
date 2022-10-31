import React from 'react';

export default class Layer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contentPlacement: 'end' };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({ contentPlacement: determineSize() });
  }
}

export const determineSize = () => {
  return window.innerWidth >= 556 ? 'end' : 'bottom';
}
