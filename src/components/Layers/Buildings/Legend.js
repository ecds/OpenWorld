import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import chroma from 'chroma-js';

const Legend = () => {
  const uses = [
    {
      label: 'Residential',
      color: '#FFFFB3'
    },
    {
      label: 'Residential Transient',
      color: '#FFEB8A'
    },
    {
      label: 'Commercial/Office',
      color: '#E83333'
    },
    {
      label: 'Warehouse',
      color: '#AAAAAA'
    },
    {
      label: 'Manufacturing/Industrial',
      color: '#AB59C9'
    },
    {
      label: 'Public/Institutional',
      color: '#2E6DFF'
    },
    {
      label: 'Transportation/Utility',
      color: '#FFCCFF'
    },
    {
      label: 'Vacant/No Data',
      color: '#EBEBEB'
    },
  ];

  const colorStyle = (color) => {
    return {
      backgroundColor: color,
      borderColor: '#888',
      borderStyle: 'solid',
      color: chroma.contrast(color, 'white') > 4 ? 'white': 'black'}
  }

  return (
    <Container>
      {uses.map((use, index) => {
        return (
          <Row key={index} className="my-1 fs-5">
            <Col style={colorStyle(use.color)}>{use.label}</Col>
            {/* <Col></Col> */}
          </Row>
        )
      })}
    </Container>
  )
}

export default Legend