import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { StoryMaps } from '../../data/StoryMapData';
import './StoryMap.scss';

const StoryMap = () => {
  const [show, setShow] = useState(false);
  const [storyMap, setStoryMap] = useState(null);
  const navigate = useNavigate();
  let { story } = useParams();

  useEffect(() => {
    const storyMap = StoryMaps.find(storyMap => storyMap.id === story);
    setStoryMap(storyMap);
    setShow(true);
  }, [story]);

  const unmount = () => {
    setShow(false);
    navigate('/');
  }

  if (storyMap) {
    return (
      <>
        <Button className="ps-0 nav-link fs-6" size="lg" variant="link" onClick={() => { setShow(true)}}>
          {storyMap.title}
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
