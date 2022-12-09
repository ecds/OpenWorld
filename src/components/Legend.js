import { Accordion, ButtonGroup, Button } from 'react-bootstrap';
import chroma from 'chroma-js';

const Legend = (props) => {
  const uses = [
    {
      label: 'Residential',
      color: '#FFFF00',
      code: 'R'
    },
    {
      label: 'Residential Transient',
      color: '#FF6F00',
      code: 'TR'
    },
    {
      label: 'Commercial/Office',
      color: '#E83333',
      code: 'C'
    },
    {
      label: 'Warehouse',
      color: '#5D4037',
      code: 'W'
    },
    {
      label: 'Manufacturing/Industrial',
      color: '#AB59C9',
      code: 'M'
    },
    {
      label: 'Public/Institutional',
      color: '#2E6DFF',
      code: 'P'
    },
    {
      label: 'Transportation/Utility',
      color: '#FFCCFF',
      code: 'TU'
    },
    {
      label: 'Vacant/No Data',
      color: '#EBEBEB',
      code: null
    },
  ];

  const outlineStyle = (color) => {
    return {
      backgroundColor: chroma(color).alpha(0.3),
      borderColor: color,
      color: 'black'
    }
  }

  const colorStyle = (color) => {
    return {
      backgroundColor: color,
      borderColor: '#888',
      borderStyle: 'solid',
      // width: '100%',
      // flex: '1 1 auto',
      color: chroma.contrast(color, 'white') > 4 ? 'white': 'black'}
  }

  const filterByUse = ((use) => {
    props.filter(use);
  });

  return (
    <Accordion
      activeKey={props.open}
      onSelect={(eventKey) => { props.toggle(eventKey)}}
    >
      <Accordion.Item eventKey={1}>
        <Accordion.Header>Building Color Key</Accordion.Header>
        <Accordion.Body>
          <ButtonGroup vertical className="d-grid col-12" style={{justifyContent: "unset"}}>
            {uses.map((use, index) => {
              if (props.currentFilter === use.code) {
                return (
                  <Button
                    key={index}
                    style={colorStyle(use.color)}
                    size="lg"
                  >
                    {use.label}
                  </Button>
                )
              }
              return (
                <Button
                  key={index}
                  style={props.currentFilter ? outlineStyle(use.color) : colorStyle(use.color)}
                  size="lg" onClick={() => filterByUse(use.code)}
                >
                  {use.label}
                </Button>
              )
            })}
              {props.currentFilter &&
                <Button size="lg" variant="secondary" onClick={() => filterByUse(null)}>All Buildings</Button>
              }
          </ButtonGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Legend