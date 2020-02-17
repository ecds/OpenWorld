import React from 'react';
import { Modal, Image, Carousel } from 'react-bootstrap';
import styled from 'styled-components';

import ItemHeader from './ItemHeader.js';
import ContentInfo from './ContentInfo.js';

const Container = styled.div``;

const galleries = [
  {
	title: "Test images",
	id: "asdskfjaksdjl",
    imgs: [
      { url: "https://images.unsplash.com/photo-1451186859696-371d9477be93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1052&q=80", },
      { url: "https://reactjs.org/logo-og.png", },
      { url: "https://images.unsplash.com/photo-1550006490-9f0656b79e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=629&q=80", },
      { url: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80", },
    ],
  }
];

const galleryImg = {
  height: "70vh",
  width: "auto",
  objectFit: "cover",
  display: "block",
  margin: "auto"
}

const carouselStyle = {
  backgroundColor: "#222222",
}

class ModalCarousel extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel style={carouselStyle} interval={null}>{
            this.props.imgs.map((image, key) => 
              <Carousel.Item key={key}>
                <Image src={image.url} style={galleryImg} alt="test" touch fluid />
              </Carousel.Item>
            )
          }</Carousel>
        </Modal.Body>
      </Modal>
    )
  }
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }
  }

  render() {
    return (
      <Container>
        <ItemHeader 
            key={this.props.key} 
            id={this.props.id} 
            square={true}
            imgSrc={this.props.imgs[0].url}
            title={this.props.title} 
            onClick={() => this.setState({ show: true })} 
        />
        <ModalCarousel 
          show={this.state.show} 
          title={this.props.title}
          imgs={this.props.imgs}
          onHide={() => this.setState({ show: false })}
        />
      </Container>
    )
  }
}

export default class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      galleryList: galleries,
      numGalleries: galleries.length,
    }
  }

  render() {
    return (
    <Container>
		<ContentInfo num={this.state.numGalleries} singular={"gallery"} plural={"galleries"} />
		<Container className={"clickable-children scroll-no-show"}>{
			this.state.galleryList.map((gallery, key) =>
				<Gallery key={key} title={gallery.title} imgs={gallery.imgs} />
			)}
		</Container>
	</Container>
    )
  }
}