import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faDrawPolygon, faTrain, faStar } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import About from '../About/About';
import { tours } from '../../data/OpenTourData';
import { StoryMaps } from '../../data/StoryMapData';
import styles from './MainNav.module.scss';
import Tutorials from '../Tutorials/Tutorials';

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

const FeaturesNav = () => (
  <>
    <FontAwesomeIcon icon={faStar} /> Spotlights
  </>
)

const MainNav = ({ setYear }) => {
  const { year } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchYear = searchParams.get('year');
    if (searchYear) {
      setYear(searchYear);
    } else {
      setYear(year);
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
            <NavDropdown title={BuildingsNav()}>
              {/* <LinkContainer to="/buildings/1878">
                <NavDropdown.Item>1878</NavDropdown.Item>
              </LinkContainer> */}
              <LinkContainer to="/buildings/1928">
                <NavDropdown.Item>1928</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={BoundaryNav()}>
              <LinkContainer to='/annexations'>
                <NavDropdown.Item>Annexations</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/wards'>
                <NavDropdown.Item>Wards</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={TransportationNav()}>
              <LinkContainer to='/streetcars/1924'>
                <NavDropdown.Item>Streetcars 1924</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={FeaturesNav()}>
              {tours.map((tour, index) => {
                return (
                  <LinkContainer key={index} to={`/tours/${tour.slug}`}>
                    <NavDropdown.Item>{tour.title}</NavDropdown.Item>
                  </LinkContainer>
                );
              })}
              <NavDropdown.Item>
                {StoryMaps.map((story, index) => {
                  return (
                    <LinkContainer key={index} to={`/stories/${story.id}`}>
                      <NavDropdown.Item>{story.title}</NavDropdown.Item>
                    </LinkContainer>
                  );
                })}
              </NavDropdown.Item>
            </NavDropdown>
            <About />
            <Tutorials />
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
