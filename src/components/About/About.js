import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
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
import Intro from './Intro';
import History from './History';
import Partners from './Partners';
import Members from './Members';
import './About.scss';

const About = () => {
  const [key, setKey] = useState('info');
  const [suppress, setSuppress] = useState(cookies.load('suppressIntro') === 'true');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!suppress) {
      setOpen(true);
    }
  }, [suppress]);

  const setSuppressCookie = (event) => {
    if (suppress) {
      cookies.remove('suppressIntro', { path: '/' });
    } else {
      const expires = new Date();
      expires.setFullYear(2025);
      cookies.save('suppressIntro', true, { path: '/', expires, maxAge: null });
    }
    setSuppress(!suppress);
  }

  return (
    <>
      <Button className="ps-0 nav-link fs-6" size="lg" variant="link" onClick={() => { setOpen(true)}}>
        <FontAwesomeIcon icon={faCircleInfo} /> About
      </Button>
      <Modal
        size="lg"
        show={open}
        onHide={() => { setOpen(false) }}
        backdrop={true}
        id="about-modal"
        scrollable={true}
        dialogClassName="owa-about-modal"
      >
        <ModalHeader closeButton>
          <ModalTitle>About OpenWorld Atlanta</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Tabs
            variant="pills"
            id="owa-controlled-tab"
            activeKey={key}
            onSelect={(key) => setKey(key)}
            className="mb-3 flex-row"
            justify
          >
            <Tab eventKey="info" title="OpenWorld Atlanta">
              <Intro />
            </Tab>
            {/* <Tab eventKey="ush" title="Urban Spatial History">
              <History />
            </Tab> */}
            <Tab eventKey="partners" title="Partners">
              <Partners />
            </Tab>
            <Tab eventKey="members" title="Members">
              <Members />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <div className="container-fluid">
          <Form>
            <Form.Group>
              <Form.Check type="checkbox" label="Don't show again*" checked={suppress} onChange={(event) => setSuppressCookie(event)}/>
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
    </>
  );
}

export default About;
