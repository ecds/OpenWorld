import { useContext, useState } from "react";
import MapContext from "~/mapContext";
import chroma from "chroma-js";
import { Accordion, Button, ButtonGroup } from "react-bootstrap";
import { buildingUses } from "~/data/buildings";

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

const BuildingLegend = ({ open, toggle }) => {
  const { mapState } = useContext(MapContext);
  const [currentFilter, setCurrentFilter] = useState<string|undefined>(undefined);

  const filterByUse = (useCode) => {
    if (useCode) {
      mapState.setFilter('buildings1928', ["==", ["get", "Land_Use"], useCode]);
    } else {
      mapState?.setFilter('buildings1928', undefined);
    }
    setCurrentFilter(useCode);
  }

  return (
    <Accordion
      activeKey={open}
      onSelect={(eventKey) => { toggle(eventKey)}}
    >
      <Accordion.Item eventKey={1}>
        <Accordion.Header>Building Color Key</Accordion.Header>
        <Accordion.Body>
          <ButtonGroup vertical className="d-grid col-12" style={{justifyContent: "unset"}}>
            {buildingUses.map((use, index) => {
              if (currentFilter === use.code) {
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
                  style={currentFilter ? outlineStyle(use.color) : colorStyle(use.color)}
                  size="lg" onClick={() => filterByUse(use.code)}
                >
                  {use.label}
                </Button>
              )
            })}
              {currentFilter &&
                <Button size="lg" variant="secondary" onClick={() => filterByUse(undefined)}>All Buildings</Button>
              }
          </ButtonGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
};

export default BuildingLegend;
