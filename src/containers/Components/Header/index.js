import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {  Link } from "react-router-dom";
import { FaBuilding, FaVectorSquare, FaSubway } from 'react-icons/fa';
import Credit from '../Credit';

export default class Header extends React.Component {
  boundaries() {
    return(
      <span className='fs-6'>
      <FaVectorSquare /> City Boundaries
      </span>
    )
  }

  transportation() {
    return(
      <span className='fs-6'>
      <FaSubway /> Transportation
      </span>
    )
  }

  buildings() {
    return(
      <span className='fs-6'>
      <FaBuilding /> Buildings
      </span>
    )
  }

  render() {
    return(
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
        <Navbar.Brand as={ Link } to="/" className="fw-bold">
          <img
            src={"/logo192.png"}
            width={"40px"}
            height={"40px"}
            alt=""
            role="presentation"
            className="mx-lg-3"
          />
          {' '}OpenWorld Atlanta
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-2">
            <NavDropdown title={ this.buildings() }>
              <NavDropdown.Item as={ Link } to="/buildings/1878">
                1878 Buildings Footprints
              </NavDropdown.Item>
              <NavDropdown.Item as={ Link } to="/buildings/1928">
                1928 Buildings Footprints
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={ this.boundaries() }>
              <NavDropdown.Item as={ Link } to="/annexations">
                Annexations
              </NavDropdown.Item>
              <NavDropdown.Item as={ Link } to='/wards'>
                Wards
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={ this.transportation() }>
              <NavDropdown.Item as={ Link } to="/streetcars/1924">
                Streetcar Lines 1924
              </NavDropdown.Item>
            </NavDropdown>
          <Credit />
          <div>&nbsp;</div>
          </Nav>
          <div className="d-flex">
            <a href="https://ecds.emory.edu/" title="Emory Center for Digital Scholarship">
              <img src="/ecds.svg" className="owa-ecds-logo" alt="Sponsored by Emory Center for Digital Scholarship a division of Emory University's Office of Information Technology." />
            </a>
          </div>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}