import React, { useContext } from 'react';
import Collapse from 'react-bootstrap/Collapse'
import { Card, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import Spinner from '../Spinner';
import GenericLayer, { Container, Icon, Label, Description, Attribution } from "../GenericLayer";
import Polygon from '../../Map/Layers/Polygon';

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

  }

  toggleCollapsed() {
    this.setState({accordionActive: !this.state.accordionActive});
  }

  handleClick() {
    this.setState(
      {
        active: !this.state.active
      },
      // this.addRemoveLayers
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
      <Container>
        <Card>
          <Card.Header>
            <Row onClick={() => this.toggleCollapsed()}>
              <Col>
                <Label htmlFor={`${this.props.id}-toggle`} active={this.state.active}>
                  <input className="layer-checkbox" type="checkbox" id={`${this.props.id}-toggle`} checked={this.state.active} onChange={this.handleClick} />
                  <Icon active={this.state.active}>
                    {this.props.loading ?
                      <Spinner
                        width={'16px'}
                        height={'16px'}
                        thickness={'4px'}
                        margin={'2px auto auto auto'}
                      /> :
                      this.state.active ?
                        <FaCheckSquare /> :
                        <FaRegSquare />
                    }
                  </Icon>
                  &nbsp;
                  {this.props.label}
                </Label>
                <Description>{this.props.desc}</Description>
                <Attribution>{this.props.attr}</Attribution>
              </Col>
              <Col xs lg="1"></Col>
            </Row>
          </Card.Header>
          <Collapse  in={this.state.accordionActive}>
            <Card.Body>
              {
                this.props.layers.map((layer, index) => {
                  switch(layer.type) {
                    case 'polygon':
                      return <Polygon {...layer} key={index} groupActive={this.state.active} />;
                    default:
                      return null;
                  }
                })
              }
            </Card.Body>
          </Collapse>
        </Card>
      </Container>

    )
}
}
