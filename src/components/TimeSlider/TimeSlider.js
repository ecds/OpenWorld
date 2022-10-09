import React from 'react';
// import { useSearchParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const TimeSlider = (props) => {
  const min = Math.min(...props.years) - 1;
  const max = Math.max(...props.years) + 1;
  const extent = max - min;
  // let [searchParams] = useSearchParams();


  // const [year, updateYear] = useState(min)

  const handleChange = (event) => {
    props.setYear(event.target.value);
  }

  // useEffect(() => {
  //   updateYear(searchParams.get('year'));
  // }, [searchParams]);

  return (
    <div className='p-3'>
      <Row>
        <Col md="auto">
          <label>{props.label}</label>
        </Col>
        <Col>
          <input
            type="number"
            aria-label={'year'}
            min={min}
            max={max}
            onChange={(event) => handleChange(event)}
            value={parseInt(props.currentYear)}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-start">{min}</Col>
        <Col className="text-end">{max}</Col>
      </Row>
      <Row>
        <Col className="ps-4 pe-4">
          <svg role="presentation" height="20px" width="100%" xmlns="http://www.w3.org/2000/svg">
            {/* <rect x="1%" y="5" width="1" height="10"></rect> */}
            {
              props.years.map((step, index) => {
                return (
                  <rect x={`${((step - min) / extent) * 100}%`} y="5" width="1" height="10" key={index}></rect>
                )
              })
            }
            {/* <rect x="98%" y="5" width="1" height="10"></rect> */}
          </svg>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            className="form-range"
            type="range"
            min={min}
            max={max}
            step={1}
            onChange={(event) => handleChange(event)}
            value={parseInt(props.currentYear)}
          />
        </Col>
      </Row>
    </div>
  );
}

TimeSlider.propTypes = {};

TimeSlider.defaultProps = { years: [0] };

export default TimeSlider;
