import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Button, Carousel, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './Tutorials.scss';

const Tutorials = () => {

  const [open, setOpen] = useState(false);

  // const location = useLocation();

  return (
    <>
      <Button className="ps-0 nav-link fs-6" size="lg" variant="link" onClick={() => { setOpen(true)}}>
        <FontAwesomeIcon icon={faQuestionCircle} /> Tutorials
      </Button>
      <Modal
        show={open}
        dialogClassName="owa-tutorial-modal"
        onHide={() => setOpen(false)}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Carousel interval={null} variant="dark" wrap={false}>
          <Carousel.Item>
            <Row>
              <Col md={1}></Col>
              <Col className="text-center">
                <img className="img-fluid" src="/images/tutorials/Slide2.jpg" alt="slide" />
              </Col>
              <Col md={1}></Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col md={1}></Col>
              <Col>
                <img className="img-fluid" src="/images/tutorials/Slide3.jpg" alt="slide" />
              </Col>
              <Col md={1}></Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col md={1}></Col>
              <Col>
                <img className="img-fluid" src="/images/tutorials/Slide4.jpg" alt="slide" />
              </Col>
              <Col md={1}></Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col md={1}></Col>
              <Col>
                <img className="img-fluid" src="/images/tutorials/Slide5.jpg" alt="slide" />
              </Col>
              <Col md={1}></Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col md={1}></Col>
              <Col>
                <img className="img-fluid" src="/images/tutorials/Slide6.jpg" alt="slide" />
              </Col>
              <Col md={1}></Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col md={1}></Col>
              <Col>
                <img className="img-fluid" src="/images/tutorials/Slide7.jpg" alt="slide" />
              </Col>
              <Col md={1}></Col>
            </Row>
          </Carousel.Item>
      </Carousel>
      </Modal>
    </>
  )
}

export default Tutorials;
