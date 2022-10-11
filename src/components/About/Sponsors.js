import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Sponsors = () => {
  return (
    <>
      <Row>
        <Col md="4">
          <img
            src="/LOGO_emory.png"
            alt="Emory Logo"
            style={{
              width: "100%",
            }}
          ></img>
        </Col>
        <Col md="c8">
          <div>
            <a
              href="https://ecds.emory.edu/"
              alt="Emory Center for Digital Scholarship"
              className="owa-about-link"
            >
              Emory Center for Digital Scholarship (ECDS), Emory
              University
            </a>
          </div>
          <p>
            The Digital Visualization Lab of ECDS is a production
            focused entity that connects with various faculty projects
            and includes both graduate and undergraduate students from
            many departments and the professional schools that engage
            in learning in a production-focused environment. These
            students engage in work of the lab and many have
            contributed to the production of OpenWorld Atlanta and its
            proceeding development projects that was focused on the
            development of historical geodatabases and the continued
            effort of building historical geocoders. The Rose Library
            Special Collections Library, the Department of
            Environmental Sciences, and the Department of History,
            continue to play a role in the development of this
            project.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <img
            src="/LOGO_Kazringa.png"
            alt="Kaziranga Logo"
            style={{
              width: "100%",
            }}
          ></img>
        </Col>
        <Col md="8">
          <div>
            <a
              href="https://kazirangauniversity.in/"
              alt="Kaziranga University"
              className="owa-about-link"
            >
              Center for Virtual Reality, Kaziranga University
            </a>
          </div>
          <p>Forthcoming.</p>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <img
            src="/LOGO_UNIFESP.png"
            alt="UNIFESP Logo"
            style={{
              width: "100%",
            }}
          ></img>
        </Col>
        <Col md="8">
          <div>
            <a
              href="https://www.unifesp.br/"
              alt="Universidade Federal de São Paulo"
              className="owa-about-link"
            >
              School of Philosophy, Letters and Human Sciences (EFLCH)
              and the Institute of Science and Technology (ICT),
              Universidade Federal de São Paulo (UNIFESP)
            </a>
          </div>
          <p>Forthcoming.</p>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <img
            src="/LOGO_Yonsei.jpg"
            style={{
              width: "100%",
            }}
            alt="Yonsei Logo"
          ></img>
        </Col>
        <Col md="8">
          <div>
            <a
              href="https://www.yonsei.ac.kr/"
              alt="Yonsei University"
              className="owa-about-link"
            >
              Department of Information and Interaction Design, Yonsei
              University
            </a>
          </div>
          <p>Forthcoming.</p>
        </Col>
      </Row>
    </>
  );
}

export default Sponsors;
