import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from 'react-router-bootstrap'

export default function MainNav() {
  return (
    <Navbar bg="primary" expand="lg" className="nav">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/images/logo192.png"
              width="40px"
              height="40px"
              alt=""
              role="presentation"
              className="mx-lg-3"
            />
            Open World Atlanta
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="pb-1">
          <Nav className="me-auto">
            <NavDropdown title="Buildings">
              <LinkContainer to="/buildings/1928">
                <NavDropdown.Item>1928</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
