import React from 'react';
import { Row, Modal, Image } from 'react-bootstrap';
import styled from 'styled-components';
import {THEME_COLOR} from '../../constants';

const Container = styled.div``;

const videos = [
    { id: "17892962" },
    { id: "148751763" },
    { id: "37328349" }
];

const videoThumbnail = {
    width: "9.25em",
    height: "5em",
}

const videoThumbnailImg = {
    width: "9.25em",
    height: "5em",
    position: "relative",
    objectFit: "cover",
}

const objectTitle = {
    position: "relative",
    display: "inline",
    marginLeft: "1em",
    marginTop: "auto",
    marginBottom: "auto",
    width: "calc(40vw - (12.25em / 1.4) - 1em)",
    maxWidth: "calc(500px - (12.25em / 1.4) - 1em)",
    flexGrow: 1,
    color: "#444444",
    fontSize: "1.4em",
}

const videoStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    margin: "auto"
}

const videoContainerStyle = {
    padding: "70% 0 0 0",
    position: "relative"
}

class ModalVideo extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="idk"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="idk">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container style={videoContainerStyle}>
                <iframe title={this.props.title} src={`https://player.vimeo.com/video/${this.props.id}?autoplay=1&color=${THEME_COLOR.substring(1)}&byline=0&portrait=0`} 
                    style={videoStyle} frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
            </Container><script src="https://player.vimeo.com/api/player.js"></script>
        </Modal.Body>
      </Modal>
    )
  }
}

class VideoHeader extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            show: false,
        }
    }

    render() {
        return (
            <Container>
                <Row onClick={() => this.setState({ show: true })}>
                    <Container style={videoThumbnail}>
                        <Image style={videoThumbnailImg} src={this.props.data.thumbnail} alt="Story thumbnail" />
                    </Container>
                    <Container style={objectTitle}>
                        {this.props.data.title}
                    </Container>
                </Row>
                <ModalVideo
                    show={this.state.show} 
                    title={this.props.data.title}
                    id={this.props.id}
                    onHide={() => this.setState({ show: false })}
                />
            </Container>
        )
    }
}

export default class Videos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoList: videos,
            numVideos: videos.length,
        }
    }

    componentDidMount() {
        this.state.videoList.forEach((video, key) => {
            let url = `https://vimeo.com/api/oembed.json?url=http%3A//vimeo.com/${video.id}`;
            fetch(url)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                video.thumbnail = data.thumbnail_url;
                video.title = data.title;
            })
        })
    }

    render() {
        return (
            <Container>
                <span className={"contentInfo"}>{this.state.numVideos} video{this.state.numVideos === 1? '' : 's'} available</span>
                <Container className={"clickable-children scroll-no-show"}>{
                    this.state.videoList.map((video, key) => 
                        <VideoHeader key={video.id} id={video.id} data={video} />
                    )}
                </Container>
            </Container>
        );
    }
}