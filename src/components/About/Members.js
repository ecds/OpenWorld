import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Members = () => {
  return (
    <>
      <Row className="owa-sponsorship-row">
        <Col md="12">
          <div>
            <a
              href="https://ecds.emory.edu/about/staff/basu-arya.html"
              alt="Arya Basu, PhD"
              className="owa-about-link"
            >
              Arya Basu, PhD
            </a>
          </div>
          <p>
            Arya creates, modifies, and configures 3D models using a
            variety of computer modeling, simulation software, and
            geospatial data. In partnership with faculty and ECDS
            staff, Arya prepares aesthetically composed digital media
            through graphic design, image processing, and data
            visualization for use in ECDS-supported digital
            scholarship projects. He also researches and explores new
            methods of visualizing data, including 3D, virtual
            reality, and augmented reality.
          </p>
        </Col>
      </Row>

      <Row className="owa-sponsorship-row">
        <Col md="12">
          <div>
            <div>Chris Wyllie</div>
          </div>
          <p>
            Chris was a computer science student at Emory University.
            He developed the initial version of the site using React,
            Leaflet, and Bootstrap.
          </p>
        </Col>
      </Row>

      <Row className="owa-sponsorship-row">
        <Col md="12">
          <div>
            <a
              href="https://ecds.emory.edu/about/staff/page-michael.html"
              alt="Michael Page"
              className="owa-about-link"
            >
              Michael Page
            </a>
          </div>
          <p>
            Michael manages map and data libraries, GIS
            infrastructure, and consults on research projects that
            have a geospatial technology/spatial data component. His
            primary research focus involves cartography, geospatial
            technologies, and urban geography, and his key projects
            include American Excavations Samothrace, Georgia Coast
            Atlas, and OpenWorld Atlanta. He is coauthor of Sacred
            Places: A Guide to the Civil Rights Movement in Atlanta,
            Georgia. His maps have been published in many print and
            digital journals and books.
          </p>
        </Col>
      </Row>

      <Row className="owa-sponsorship-row">
        <Col md="12">
          <div>
            <a
              href="https://ecds.emory.edu/about/staff/li-yang.html"
              alt="Yang Li"
              className="owa-about-link"
            >
              Yang Li
            </a>
          </div>
          <p>
            Yang is a Senior Software Engineer at the Emory Center for
            Digital Scholarship and an Information Designer at the Fox
            Center for Humanistic Inquiries. He has been the UI/UX
            designer for this project since 2019 and completed visual
            design for the current site.
          </p>
        </Col>
      </Row>

      <Row className="owa-sponsorship-row">
        <Col md="12">
          <div>
            <a
              href="https://ecds.emory.edu/about/staff/varner-jay.html"
              alt="Jay Varner"
              className="owa-about-link"
            >
              Jay S. Varner
            </a>
          </div>
          <p>
            As the lead software engineer at ECDS, Jay takes the great ideas from the Emory community and turns them into code.
          </p>
          <p>
            Primarily working in Ruby, Python, and JavaScript, he strives to develop usable and accessible applications to aid and showcase scholarly research. He enjoys creating new ways for people to interact with old stuff.
          </p>
          <p>
            Jay also holds a master's degree in User Experience Design from Kent State University.
          </p>
        </Col>
      </Row>
    </>
  );
}

export default Members;
