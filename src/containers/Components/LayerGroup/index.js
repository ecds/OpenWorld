import React, { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { AccordionContext, Button, Card, Col, Row } from "react-bootstrap";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckSquare, FaRegSquare, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import GenericLayer, { Container, Icon, Label, Description, Attribution } from "../GenericLayer";
import Polygon from '../../Map/Layers/Polygon';
import Railways from '../../Map/Layers/Railways';

export default class LayerGroup extends GenericLayer {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      accordionActive: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.addRemoveLayers = this.addRemoveLayers.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.checkAll = this.checkAll.bind(this);

  }

  toggleCollapsed() {
    this.setState({accordionActive: !this.state.accordionActive});
  }

  handleClick() {
    this.setState(
      {
        active: !this.state.active
      },
      this.addRemoveLayers
    );
  }

  addRemoveLayers() {
    if (this.state.active) {
      this.setState({accordionActive: true});
    }
    this.props.layers.forEach(layer => {
      const checkbox = document.getElementById(`${layer.id}-toggle`);
      if ((this.state.active && !checkbox.checked) || (!this.state.active && checkbox.checked)) {
        checkbox.click();
      }
    });
  }

  render() {
    return (
      <Accordion defaultActiveKey="">
        <Card>
          <Card.Header>
            <Row>
              <Col xs="auto">
                  <input className="layer-checkbox" type="checkbox" id={`${this.props.id}-toggle`} checked={this.state.active} onChange={this.handleClick} />
                  <this.checkAll eventKey="0" poop={this.state.active} />
                <Description>{this.props.desc}</Description>
                <Attribution>{this.props.attr}</Attribution>
              </Col>
              <Col className="text-center">
                <this.toggleButton eventKey="0" />
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {
                this.props.layers.map((layer, index) => {
                  switch(layer.type) {
                    case 'line':
                      return <Railways {...layer} key={index} groupActive={this.state.active} />;
                    case 'polygon':
                      return <Polygon {...layer} key={index} groupActive={this.state.active} />;
                    default:
                      return null;
                  }
                })
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

    )
  }

  checkAll({ eventKey, poop, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );

    return (
      <Label htmlFor={`${this.props.id}-toggle`} active={this.state.active} onClick={!currentEventKey ? decoratedOnClick : null}>
        <Icon active={this.state.active}>
          {this.state.active ?
            <FaCheckSquare /> :
            <FaRegSquare />
          }
        </Icon>
        &nbsp;
        {this.props.label}

      </Label>
    )
  }

  toggleButton({ eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <Container>
        <Row className="no-gutters">
          <Col>
            <Button
              variant="link"
              size="sm"
              onClick={decoratedOnClick}
              block
            >
              {isCurrentEventKey ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </Col>
        </Row>
        <Row className="no-gutters">
          <Col>
            <Button
              variant="link"
              size="sm"
              onClick={decoratedOnClick}
              block
            >
              {isCurrentEventKey ? "Collapse" : "Expand"}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
