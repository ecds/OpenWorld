import React, { useContext } from 'react';
import { AccordionContext, Button, Card, Col, Row } from "react-bootstrap";
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import GenericLayer, { Container, Icon, Label, Description, Attribution } from "../GenericLayer";
import Polygon from '../../Map/Layers/Polygon';
import Railways from '../../Map/Layers/Railways';
import LayerDetails from '../LayerDetails';
import MapContext from '../../Map/MapContext';

// function ContextAwareToggle({ children, eventKey, callback }) {
//   const { activeEventKey } = useContext(AccordionContext);

//   const decoratedOnClick = useAccordionButton(
//     eventKey,
//     () => callback && callback(eventKey),
//   );

//   const isCurrentEventKey = activeEventKey === eventKey;

//   return (
//     <Container>
//     <Row className="no-gutters">
//       <Col>
//         <Button
//           variant="link"
//           size="sm"
//           onClick={decoratedOnClick}
//         >
//           {isCurrentEventKey ? <FaChevronUp /> : <FaChevronDown />}
//         </Button>
//       </Col>
//     </Row>
//     <Row className="no-gutters">
//       <Col>
//         <Button
//           variant="link"
//           size="sm"
//           onClick={decoratedOnClick}
//         >
//           {isCurrentEventKey ? "Collapse" : "Expand"}
//         </Button>
//       </Col>
//     </Row>
//   </Container>
//   );
// }

function CheckAll({ children, eventKey, active, id, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  return (
    <Label htmlFor={`${id}-toggle`} active={active} onClick={!activeEventKey ? decoratedOnClick : null}>
      <Icon active={active}>
        {active ?
          <FaCheckSquare /> :
          <FaRegSquare />
        }
      </Icon>
      &nbsp;
      {children}
    </Label>
  )
}

export default class LayerGroup extends GenericLayer {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      accordionActive: false,
      show: true
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleHide = this.handleHide.bind(this);
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
      this.addRemoveLayers
    );
  }

  handleHide() {
    this.setState({ show: false });
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

  // render() {
  //   return (
  //     <Accordion defaultActiveKey="">
  //       <Card>
  //         <Card.Header>
  //           <Row>
  //             <Col xs="auto">
  //                 <input className="layer-checkbox" type="checkbox" id={`${this.props.id}-toggle`} checked={this.state.active} onChange={this.handleClick} />
  //                 <CheckAll eventKey="0" active={this.state.active} id={this.props.id}>{this.props.label}</CheckAll>
  //               <Description>{this.props.desc}</Description>
  //               <Attribution>{this.props.attr}</Attribution>
  //             </Col>
  //             <Col className="text-center">
  //               <ContextAwareToggle eventKey="0" />
  //             </Col>
  //           </Row>
  //         </Card.Header>
  //         <Accordion.Collapse eventKey="0">
  //           <Card.Body>
  //             {
  //               this.props.layers.map((layer, index) => {
  //                 switch(layer.type) {
  //                   case 'line':
  //                     return <Railways {...layer} key={index} groupActive={this.state.active} />;
  //                   case 'polygon':
  //                     return <Polygon {...layer} key={index} groupActive={this.state.active} />;
  //                   default:
  //                     return null;
  //                 }
  //               })
  //             }
  //           </Card.Body>
  //         </Accordion.Collapse>
  //       </Card>
  //     </Accordion>

  //   )
  // }

  render() {
    return (
      <MapContext.Consumer>
        {({map}) => {
          return  (
            <Container>
              <Offcanvas show={this.state.show} backdrop={false} scroll={true} placement="end" onHide={this.handleHide} onShow={this.handleClick}>
                <Offcanvas.Header closeButton><h5>Streetcar Lines</h5></Offcanvas.Header>
                <Offcanvas.Body>
                <Card>
          <Card.Header>
            <Row>
              <Col xs="auto">
                  <input className="layer-checkbox" type="checkbox" id={`${this.props.id}-toggle`} checked={this.state.active} onChange={this.handleClick} />
                  <CheckAll eventKey="0" active={this.state.active} id={this.props.id}>{this.props.label}</CheckAll>
                <Description>{this.props.desc}</Description>
                <Attribution>{this.props.attr}</Attribution>
              </Col>
            </Row>
          </Card.Header>
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
        </Card>
                <LayerDetails layer={this.state.currentDetails} />
                </Offcanvas.Body>
              </Offcanvas>
              {this.renderToggleButton()}
            </Container>
          )
        }}
      </MapContext.Consumer>
    )
  }

  renderToggleButton() {
    if (!this.state.show) {
      return (
        <Button className="end-0 position-absolute top-50" onClick={() => this.setState({ show: true })}>Layer Data</Button>
      )
    } else {
      return(<span></span>)
    }
  }



  // toggleButton({ eventKey, callback }) {
  //   const activeEventKey = useContext(AccordionContext);

  //   const decoratedOnClick = useAccordionButton(
  //     eventKey,
  //     () => callback && callback(eventKey),
  //   );

  //   const isCurrentEventKey = activeEventKey === eventKey;

  //   return (
  //     <Container>
  //       <Row className="no-gutters">
  //         <Col>
  //           <Button
  //             variant="link"
  //             size="sm"
  //             onClick={decoratedOnClick}
  //             block
  //           >
  //             {isCurrentEventKey ? <FaChevronUp /> : <FaChevronDown />}
  //           </Button>
  //         </Col>
  //       </Row>
  //       <Row className="no-gutters">
  //         <Col>
  //           <Button
  //             variant="link"
  //             size="sm"
  //             onClick={decoratedOnClick}
  //             block
  //           >
  //             {isCurrentEventKey ? "Collapse" : "Expand"}
  //           </Button>
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // }
}
