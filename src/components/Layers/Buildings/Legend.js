import React from 'react';
import { Accordion, ListGroup} from 'react-bootstrap';
import chroma from 'chroma-js';

const Legend = (props) => {
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
    <Accordion defaultActiveKey={props.open}>
      {console.log("🚀 ~ file: Legend.js ~ line 51 ~ Legend ~ Accordion", Accordion, this)}
      <Accordion.Item eventKey={1}>
        <Accordion.Header>Building Color Key</Accordion.Header>
        <Accordion.Body>
          <ListGroup className="sticky-bottom">
            {uses.map((use, index) => {
              return (
                <ListGroup.Item key={index} style={colorStyle(use.color)}>
                  {use.label}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Legend