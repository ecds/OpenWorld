import { useState } from "react";
import { Carousel, Modal } from "react-bootstrap";

export default function Images({ images }) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Carousel className="my-3" interval={null}>
      {images.map((image, index) => {
        return (
          <Carousel.Item key={index}>
            <img
              src={image.full}
              alt={image.caption}
              className="d-block w-100 owa-image-button"
              onClick={() => setShow(true)}
              role="button"
            />
            <Modal size="lg" show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body className="mx-auto">
                <img className="img-fluid" src={image.full} alt={image.caption} />
              </Modal.Body>
              <Modal.Footer>
                {image.caption}
              </Modal.Footer>
            </Modal>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}