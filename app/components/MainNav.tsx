import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "@remix-run/react";
import logo from "~/images/logo192.png";

export default function MainNav() {
  return (
    <Navbar bg="primary" expand="lg" className="nav">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand>
            <img
              src={logo}
              width="40px"
              height="40px"
              alt=""
              role="presentation"
              className="mx-lg-3"
            />
              Open World Atlanta
            </Navbar.Brand>
          </Link>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="pb-1">
          <Nav className="me-auto">
            <Dropdown navbar={true}>
              <DropdownButton title="Buildings" id="buildings-nav">
                <Dropdown.Item
                  eventKey={1}
                  active={false}
                  as={Link}
                  to="/buildings/1928"
                >
                  1928
                </Dropdown.Item>
              </DropdownButton>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
