import React from 'react';
import { Modal } from 'react-bootstrap';

export default class OmekaImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '9500a826d4d2090717218ef84a8ca6a816870cbb',
      images: null,
      showModal: false
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true })
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  async componentDidMount() {
    const url = new URL('https://dvl.ecdsdev.org/api/files');
    url.search = new URLSearchParams({item: this.props.item, key: this.state.key})
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ images: data.map(item => item.file_urls.fullsize) });
  }

  render() {
    if (this.state.images) {
      return (
        <section>
        {
          this.state.images.map((image, index) => {
            return (
              <>
                <img role="button" src={image} key={index} className="img-fluid" alt="omeka item" onClick={() => this.handleShow()} />
                <Modal size="lg" dialogClassName="image-" show={this.state.showModal} onHide={this.handleClose}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body className="mx-auto">
                    <img className="img-fluid" src={image} alt="omeka item" />
                  </Modal.Body>
                </Modal>
              </>
            )
          })
        }
        </section>
      )
    } else {
        return(
          <img scr='/placeholder.jpg' alt="placeholder" />
        )
    }
  }
}
