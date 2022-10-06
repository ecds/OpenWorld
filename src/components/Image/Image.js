import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/ModalFooter';

import './Image.scss';

const Image = (props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <img src={props.source} alt={props.caption} className='d-block w-100 owa-image-button' onClick={() => setShow(true)} />
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="mx-auto">
            <img className="img-fluid" role="button" src={props.source} alt={props.caption} />
          </Modal.Body>
          <ModalFooter>
            {props.caption}
          </ModalFooter>
      </Modal>
    </>
  )
};

export default Image;
