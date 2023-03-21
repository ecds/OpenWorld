import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from "react-bootstrap/Container";
import { LinkContainer } from 'react-router-bootstrap'

export default function MainNav() {
  return (
    <Navbar bg="primary" expand="lg" className="nav">
      <Container fluid>
        <LinkContainer to="/">
          <span>Home</span>
        </LinkContainer>
        <Navbar.Collapse id="basic-navbar-nav">
          <NavDropdown title="Buildings">
            <LinkContainer to="/buildings/1928">
              <NavDropdown.Item>1928</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
