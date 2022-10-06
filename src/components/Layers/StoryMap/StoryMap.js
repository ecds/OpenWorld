import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { StoryMaps } from './data';
import './StoryMap.scss';

const StoryMap = (props) => {
  const [show, setShow] = useState(false);
  const [storyMap, setStoryMap] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storyMap = StoryMaps.find(storyMap => storyMap.id === props.storyMap);
    setStoryMap(storyMap);
    setShow(true);
  }, [storyMap, props]);

  const unmount = () => {
    setShow(false);
    navigate('/');
  }

  if (storyMap) {
    return (
      <>
        <Button className="ps-0 nav-link fs-6" size="lg" variant="link" onClick={() => { setShow(true)}}>
          {props.title}
        </Button>
        <Modal
          show={show}
          onHide={() => unmount()}
          dialogClassName="owa-story-map-modal"
          aria-labelledby={storyMap.id}
        >
          <Modal.Header closeButton>
            <Modal.Title id={storyMap.id}>
              {storyMap.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              title={storyMap.title}
              src={storyMap.source}
              frameborder="0"
              allowfullscreen
              allow="geolocation"
            ></iframe>
          </Modal.Body>
        </Modal>
      </>
    );
  }

    return <></>
};

export default StoryMap;
