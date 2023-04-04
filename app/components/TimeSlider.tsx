// import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";
// import MapContext from "~/mapContext";
import { Col, Row } from "react-bootstrap";

const TimeSlider = ({ years, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const min = Math.min(...years);
  const max = Math.max(...years);
  const extent = max - min;

  return (
    <div className="p-3">
      <Row>
        <Col md="auto">
          <label>{label}</label>
        </Col>
        <Col>
          <input
            type="number"
            aria-label="select year"
            value={searchParams.get("year") ?? min}
            onChange={({ target }) => setSearchParams({ year: parseInt(target.value) })}
            min={min}
            max={max}
            step={1}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-start">{min}</Col>
        <Col className="text-end">{max}</Col>
      </Row>
      <Row>
        <Col className="ps-3">
        <svg role="presentation" height="20px" width="100%" xmlns="http://www.w3.org/2000/svg">
            {years.map((step, index) => {
              return (
                <rect x={`${((step - min) / extent) * 100}%`} y="5" width="1" height="10" key={index}></rect>
              )
            })}
          </svg>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            className="form-range"
            type="range"
            aria-label="select year"
            value={searchParams.get("year") ?? min}
            onChange={({ target }) => setSearchParams({ year: parseInt(target.value) })}
            min={min}
            max={max}
            step={1}
          />
        </Col>
      </Row>
    </div>
  )
};

export default TimeSlider