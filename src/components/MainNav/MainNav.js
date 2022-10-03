import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faDrawPolygon, faTrain } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import About from '../About/About';
import styles from './MainNav.module.scss';

const BuildingsNav = () => (
  <>
    <FontAwesomeIcon icon={faBuilding} /> Buildings
  </>
)

const BoundaryNav = () => (
  <>
    <FontAwesomeIcon icon={faDrawPolygon} /> City Boundaries
  </>
)

const TransportationNav = () => (
  <>
    <FontAwesomeIcon icon={faTrain} /> Transportation
  </>
)

const MainNav = (props) => {
  const { year } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchYear = searchParams.get('year');
    if (searchYear) {
      props.setYear(searchYear);
    } else {
      props.setYear(year);
    }
  });

  return (
    <>
      <Navbar bg="primary" expand="lg" className={styles.MainNav}>
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={"/images/logo192.png"}
              width={"40px"}
              height={"40px"}
              alt=""
              role="presentation"
              className="mx-lg-3"
            />
            OpenWorld Atlanta
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={BuildingsNav()} id="building-dropdown">
              <LinkContainer to="/buildings/1878">
                <NavDropdown.Item>1878</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/buildings/1928">
                <NavDropdown.Item>1928</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={BoundaryNav()} id="boundary-dropdown">
              <LinkContainer to='/annexations'>
                <NavDropdown.Item>Annexations</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={TransportationNav()} id="boundary-dropdown">
              <LinkContainer to='/streetcars/1924'>
                <NavDropdown.Item>Streetcars 1924</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <About />
          </Nav>
          <Nav>
            <Nav.Link
              href="https://ecds.emory.edu/"
              title="Emory Center for Digital Scholarship"
              className="me-5"
            >
              <img
                src="/ecds.svg"
                className="owa-ecds-logo"
                style={{ transform: "scale(6)", width: "100%" }}
                alt="Sponsored by Emory Center for Digital Scholarship a division of Emory University's Office of Information Technology."
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
   </>
  );
};

MainNav.propTypes = {};

MainNav.defaultProps = {};

export default MainNav;
