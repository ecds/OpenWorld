import { Carousel, Container, Col, Row } from "react-bootstrap";

const BuildingsTutorial = () => {
  const slides = [
    {
      title: 'Building Info',
      image: '',
      notes: [
        'To display more information about a building, click on the building footprint',
        'Content will be updated continuously'
      ]
    }
  ];

  return (
    <Carousel interval={null} variant="dark">
      {slides.map((slide, index) => {
        return (
          <Carousel.Item key={index}>
            <Container>
              <Row>
                <Col md={1}></Col>
                <Col md={6}>
                  <img className="img-fluid" src="/images/tutorials/building1.png" alt="Select a building footprint to view details" />
                </Col>
                <Col>
                  <ul className="fs-4">
                    {slide.notes.map((note, index) => {
                      return (
                        <li key={index}>{note}</li>
                      )
                    })}
                  </ul>
                </Col>
                <Col md={1}></Col>
              </Row>
            </Container>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default BuildingsTutorial;