import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TileLayer, WMSTileLayer, LayerGroup } from 'react-leaflet';
import MapContext from '../../Map/MapContext';
import { DomEvent } from 'leaflet';

export default class RasterLayerGroup extends React.Component {
  layerGroupRef = React.createRef(null);
  sliderRef = React.createRef(null);
  numberRef = React.createRef(null);


  constructor(props) {
    super(props);

    this.state = {
      opacity: this.props.layerGroup.opacity,
      calculatedOpacity: this.props.layerGroup.opacity * 100,
      opacityManual: false,
      currentPath: document.location.pathname
    };
  }

  componentDidMount() {
    // This makes it so the map doesn't pan while someone is changing the opacity.
    DomEvent.disableClickPropagation(this.sliderRef.current);
    DomEvent.disableClickPropagation(this.numberRef.current);
  }

  // componentWillUnmount() {
  //   console.log('bye')
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPath !== document.location.pathname) {
      this.setState({ currentPath: document.location.pathname });
    }

    if (prevProps.year !== this.props.year) {
      this.updateOpacityYear();
    }
  }

  updateOpacitySlider(event) {
    this.setState({
      opacity: event.target.value,
      calculatedOpacity: event.target.value * 100,
      opacityManual: true
    });
    this.layerGroupRef.current.leafletElement.getLayers().forEach(layer => layer.setOpacity(event.target.value));
  }

  updateOpacityNumber(event) {
    let newNum = event.target.value;

    if (newNum > 100) {
      newNum = 100;
    }

    this.setState({
      opacity: parseFloat(newNum * 0.01).toPrecision(2),
      calculatedOpacity: newNum,
      opacityManual: true
    });
  }

  /*
    TODO: This is really complicated and messy and I really don't like it.
    We might be better off rewrite this stuff to function components and use hooks?
  */
  updateOpacityYear() {
    if (this.props.year >= this.props.layerGroup.year && this.state.opacity < 1) {
      this.setState({
        opacity: 1,
        calculatedOpacity: 100,
      });
    } else if (this.props.year <= this.props.layerGroup.year - 1 && this.state.opacity > 0) {
      this.setState({
        opacity: 0,
        calculatedOpacity: 0
      });
    }
  }

  render () {
    return (
        <MapContext.Consumer>
            {({map, year}) => {
              // this.updateOpacityYear(year);
              if (this.props.layerGroup) {
                return (
                  <LayerGroup ref={this.layerGroupRef}>
                    {this.props.layerGroup.urls.map((url, index) => {
                      if (this.props.layerGroup.type === 'WMS') {
                        return (
                          <WMSTileLayer url={url} {...this.props.layerGroup} opacity={this.state.opacity} key={index} />
                        )
                      } else {
                        return (
                          <TileLayer url={url} {...this.props.layerGroup} opacity={this.state.opacity} key={index} />
                        )
                      }
                    })}
                    <Row>
                      <Col>
                        <h5>{this.props.layerGroup.title}</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        Opacity
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <input type="range" className="form-range" value={this.state.opacity} min="0" max="1" step=".1" onChange={(e) => this.updateOpacitySlider(e)} ref={this.sliderRef} tabIndex="0" />
                      </Col>
                      <Col xs="auto">
                        <input type="number" value={this.state.calculatedOpacity} min="0" max="100" step="5" onChange={(e) => this.updateOpacityNumber(e)} ref={this.numberRef} tabIndex="0" /> %
                      </Col>
                    </Row>
                    <Row><Col><hr /></Col></Row>
                  </LayerGroup>
                )
              } else {
                return <></>
              }
            }}
        </MapContext.Consumer>
    )
  }
}