import React from 'react'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import cookies from "react-cookies";

class Credit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "info",
      suppress: cookies.load('suppressIntro') === 'true',
      modalOpen: false,
    };

    this.setSuppressCookie = this.setSuppressCookie.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    if (!this.state.suppress) {
      this.setState({
        modalOpen: true
      });
      // this.props.modalOpen = true;
    }
  }

  toggleModal() {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
    }));
	}

  setSuppressCookie(event) {
    if (this.state.suppress) {
      cookies.remove('suppressIntro');
    } else {
      cookies.save('suppressIntro', true);
    }
    this.setState({ suppress: !this.state.suppress });
  }

  render() {
    return (
      <span>
        <Button className="ps-0 nav-link" size="lg" variant="link" onClick={this.toggleModal}>
          About
        </Button>
        {/* <a className="nav-link" href="#" role="button" aria-expanded="false" aria-controls="about-modal" onClick={this.toggleModal}>About</a> */}
        <Modal
          size="lg"
          show={this.state.modalOpen}
          onHide={this.toggleModal}
          backdrop={true}
          id="about-modal"
        >
          <ModalHeader closeButton>
            <ModalTitle>About OpenWorld Atlanta</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Tabs
              variant="pills"
              id="owa-controlled-tab"
              activeKey={this.state.key}
              onSelect={(key) => this.setState({ key })}
              className="nav mb-3"
            >
              <Tab eventKey="info" title="OpenWorld Atlanta" className="p-3">
                <p>
                  OpenWorld Atlanta seeks to provide engaging 3D and dynamic
                  interfaces to the wealth of data extracted by the Emory Center
                  for Digital Scholarship from historic maps and city
                  directories from post-Civil War Atlanta to 1940. During this
                  reconstruction and post-reconstruction period Atlanta went
                  through many changes and experienced rapid growth due to the
                  influences of new economic investments and the development of
                  heavy rail and the electric streetcar which by the 1940s made
                  way for the commuter automobile which transformed Atlanta into
                  the sprawling landscape it is today. The project utilizes
                  geodatabases of historical geographic features that are
                  appended with information acquired from historical geocoders
                  to create data rich and engaging interfaces for community and
                  educational exploration.
                </p>
              </Tab>
              <Tab eventKey="ush" title="Urban Spatial History">
                <p>
                  Urban Spatial History represents a consortium of international
                  scholars and practitioners who seek to transform
                  historical-geographical data and knowledge of urban
                  settlements, including their development and morphology, into
                  innovative and accessible digital resources. This website
                  provides a venue for sharing the methodologies that transform
                  archival maps, data, and research into visualizations,
                  interfaces, and interpretive commentaries. The members of the
                  Urban Spatial History consortia engage in each other’s
                  projects from consultation to production to sharing resources
                  with the aim of producing platforms and data sets that are
                  open-access and open-source.
                </p>
                <Button
                  size="sm"
                  className="owa-btn"
                  href="https://www.urbanspatialhistory.org/"
                >
                  Visit Site
                </Button>
              </Tab>
              <Tab eventKey="sponsors" title="Project Sponsors">
                <div className="row owa-sponsorship-row">
                  <div className="col-4">
                    <img
                      src="/LOGO_emory.png"
                      alt="Emory Logo"
                      style={{
                        width: "100%",
                      }}
                    ></img>
                  </div>
                  <div className="col-8">
                    <div className="owa-about-title">
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
                  </div>
                </div>
                <div className="row owa-sponsorship-row">
                  <div className="col-4">
                    <img
                      src="/LOGO_Kazringa.png"
                      alt="Kaziranga Logo"
                      style={{
                        width: "100%",
                      }}
                    ></img>
                  </div>
                  <div className="col-8">
                    <div className="owa-about-title">
                      <a
                        href="https://kazirangauniversity.in/"
                        alt="Kaziranga University"
                        className="owa-about-link"
                      >
                        Center for Virtual Reality, Kaziranga University
                      </a>
                    </div>
                    <p>Forthcoming.</p>
                  </div>
                </div>
                <div className="row owa-sponsorship-row">
                  <div className="col-4">
                    <img
                      src="/LOGO_UNIFESP.png"
                      alt="UNIFESP Logo"
                      style={{
                        width: "100%",
                      }}
                    ></img>
                  </div>
                  <div className="col-8">
                    <div className="owa-about-title">
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
                  </div>
                </div>
                <div className="row owa-sponsorship-row">
                  <div className="col-4">
                    <img
                      src="/LOGO_Yonsei.jpg"
                      style={{
                        width: "100%",
                      }}
                      alt="Yonsei Logo"
                    ></img>
                  </div>
                  <div className="col-8">
                    <div className="owa-about-title">
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
                  </div>
                </div>
              </Tab>
              <Tab eventKey="members" title="Members">
                <div className="row owa-sponsorship-row">
                  <div className="col-12">
                    <div className="owa-about-title">
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
                  </div>
                </div>

                <div className="row owa-sponsorship-row">
                  <div className="col-12">
                    <div className="owa-about-title">
                      <div>Chris Wyllie</div>
                    </div>
                    <p>
                      Chris was a computer science student at Emory University.
                      He developed the initial version of the site using React,
                      Leaflet, and Bootstrap.
                    </p>
                  </div>
                </div>

                <div className="row owa-sponsorship-row">
                  <div className="col-12">
                    <div className="owa-about-title">
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
                  </div>
                </div>

                <div className="row owa-sponsorship-row">
                  <div className="col-12">
                    <div className="owa-about-title">
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
                  </div>
                </div>

                <div className="row owa-sponsorship-row">
                  <div className="col-12">
                    <div className="owa-about-title">
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
                  </div>
                </div>
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <div className="container-fluid">
            <Form>
              <Form.Group>
                <Form.Check type="checkbox" label="Don't show again*" checked={this.state.suppress} onChange={this.setSuppressCookie}/>
              </Form.Group>
            </Form>
              <p className="text-muted">
                * By checking, you agree to accept a cookie for this setting.
                <br />
                You can review our <a href="https://digitalscholarship.emory.edu/about/privacy-policy.html" target="_blank" rel="noreferrer">privacy policy</a> for more information.
              </p>
            </div>
            Sponsored by{" "}
            <a
              href="https://ecds.emory.edu"
              alt="Emory Center for Digital Scholarship"
              className="owa-about-link"
            >
              Emory Center for Digital Scholarship
            </a>
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default Credit;