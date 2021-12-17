import React from 'react';
import { Col, Row } from "react-bootstrap";
import MapContext from '../Map/MapContext';

export default class TimeSlider extends React.Component {
  constructor(props) {
    super(props);

    const range = this.props.range;
    const min = Math.min(...range) - 1;
    const max = Math.max(...range) + 1;

    this.state = {
      range,
      min: min,
      max: max,
      extent: max - min,
      current: min
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, setYear) {
    const newYear = parseInt(event.target.value);
    setYear(newYear);
    this.props.update(event, setYear);
  }

  render() {
    return (
      <MapContext.Consumer>
        {({ setYear }) => {
          return (
            <>
            <Row>
              <Col md="auto">
                <label>{this.props.label}</label>
              </Col>
              <Col>
                <input type="number" aria-label={`${this.props.label} in year`} min={this.props.minYear} max={this.props.maxYear} value={this.props.currentYear} onChange={(event) => this.handleChange(event, setYear)} />
              </Col>
            </Row>
            <Row>
              <Col className="text-start">{this.props.firstYear}</Col>
              <Col className="text-end">{this.props.lastYear}</Col>
            </Row>
            <Row>
              <Col className="mb-3">
                <svg role="presentation" height="20px" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1%" y="5" width="1" height="10"></rect>
                  {
                    this.state.range.map((step, index) => {
                      return (
                        <rect x={`${((step - this.state.min) / this.state.extent) * 100}%`} y="5" width="1" height="10" key={index}></rect>
                      )
                    })
                  }
                  <rect x="98%" y="5" width="1" height="10"></rect>
                </svg>
              <input style={{width: "100%"}} className="range" type="range" min={this.state.min} max={this.state.max} onChange={(event) => this.handleChange(event, setYear)} value={this.props.current} />
            </Col>
            </Row>
            </>
          )
        }}
      </MapContext.Consumer>
    )
  }
}

/* <div class="container">
   <input class="range" type="range" min="0" max="10" value=0>
   <svg role="presentation" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect class="range__tick" y="1%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="10%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="20%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="30%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="40%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="50%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="60%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="70%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="80%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="90%" x="45" width="10" height="1"></rect>
      <rect class="range__tick" y="98%" x="45" width="10" height="1"></rect>

      <text class="range__point" x="64" y="2%">0</text>
      <text class="range__point" x="64" y="11%">1</text>
      <text class="range__point" x="64" y="21%">2</text>
      <text class="range__point" x="64" y="31%">3</text>
      <text class="range__point" x="64" y="41%">4</text>
      <text class="range__point" x="64" y="51%">5</text>
      <text class="range__point" x="64" y="61%">6</text>
      <text class="range__point" x="64" y="71%">7</text>
      <text class="range__point" x="64" y="81%">8</text>
      <text class="range__point" x="64" y="91%">9</text>
      <text class="range__point" x="64" y="99%">10</text>
   </svg>
</div> */