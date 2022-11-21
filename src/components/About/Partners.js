import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Partners = () => {
  return (
    <Container fluid="sm">
      <p className='lead mb-5'>
      The OpenWorld Atlanta project is part of a consortium of international scholars and practitioners who seek to transform historical-geographical data and knowledge of urban settlements, including their development and morphology, into innovative and accessible digital resources. This website provides a venue for sharing the methodologies that transform archival maps, data, and research into visualizations, interfaces, and interpretive commentaries. The members of the Urban Spatial History consortia engage in each other's projects from consultation to production to sharing resources with the aim of producing platforms and data sets that are open-access and open-source.
      </p>
      <Row>
        <Col sm={4}>
          <img
            className="img-fluid"
            src="/LOGO_emory.png"
            alt="Emory Logo"
          ></img>
        </Col>
        <Col sm={8}>
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
        <Col sm={4}>
          <img
            className="img-fluid"
            src="/LOGO_Yonsei.jpg"
            alt="Yonsei Logo"
          ></img>
        </Col>
        <Col sm={8}>
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
          <p>
            ECDS is partnering with UI/UX design experts from Yonsei University's
            department of Creative Technology Management to develop an interactive
            website for the OpenWorld Atlanta project. The Yonsei team, lead by
            Dr. Younah Kang and Dr. Keeheon Lee, is helping to improve the user
            experience and accessibility of the interface. Funded by a collaborative
            grant from Yonsei's Frontier Lab and Emory's Halle Institute for Global
            Research, teams from Atlanta and Seoul have been able to visit their
            counterparts and work together in person.
          </p>
        </Col>
      </Row>


      <Row>
        <Col sm={4}>
          <img
            className="img-fluid"
            src="/LOGO_UNIFESP.png"
            alt="UNIFESP Logo"
          ></img>
        </Col>
        <Col sm={8}>
          <div>
            <a
              href="http://www.pauliceia.dpi.inpe.br/portal/home"
              alt="Universidade Federal de São Paulo"
              className="owa-about-link"
            >
              Universidade Federal de São Paulo (UNIFESP)
            </a>
          </div>
          <p>
            Pauliceia 2.0 is a joint research project of four institutions: UNIFESP
            (Guarulhos and São José dos Campos Units), INPE (National Institute for
            Space Research), the State Archive of São Paulo, and Emory University
            (United States). The objectives of the project include the collection,
            selection, digitization, and creation of historical data for São Paulo
            and to produce a computational platform that allows researchers to explore
            and share urban historical data sets. Like OpenWorld Atlanta, the study area
            includes the central area of the city and the period from 18070 to 1940.
            By design, the collaborative project encourages the input of spatial data and
            information from researchers and the public. Collaboration with Emory University
            focuses on the interchange of knowledge regarding production methods and best
            practices. The partnership was funded by a collaborative grant from FAPESP
            (Foundation for Research Support of the State of São Paulo) and Emory’s Halle
            Institute for Global Research and enabled teams from Atlanta and São Paulo to
            visit their counterparts in 2017 and 2018.
          </p>
        </Col>
      </Row>

      <Row>
        <Col sm={4}>
          <img
            className="img-fluid"
            src="/LOGO_Kazringa.png"
            alt="Kaziranga Logo"
          ></img>
        </Col>
        <Col sm={8}>
          <div>
            <a
              href="https://kazirangauniversity.in/"
              alt="Kaziranga University"
              className="owa-about-link"
            >
              Center for Virtual Reality, Kaziranga University
            </a>
          </div>
          <p>
            Emory Center for Digital Scholarship (ECDS) is partnering with
            Kaziranga University’s Center for Virtual Reality (KUCVR) to
            develop a spatial, historical map of the ancient Ahom Kingdom in
            the Brahmaputra valley of Assam, India. As part of this collaboration,
            ECDS will help KUCVR with technical support through subject matter
            expertise. ECDS will also provide a project team of qualified professionals
            to help plan and execute the development of the approved digital project.
          </p>
          <p>
            The goal of this collaborative research is to enhance scholarship in the
            field of historical mapping. ECDS will help train Kaziranga University
            students with the new paradigms of data visualization such as Geographic
            Information System (GIS), Augmented reality (AR) and Virtual reality (VR)
            to enable the students to contribute and sustain the digital project.
            Training will be provided through an online webinar series.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Partners;
