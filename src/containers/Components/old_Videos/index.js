import React from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { THEME } from '../../../constants';

import ItemHeader from '../ItemHeader';
import ContentInfo from '../ContentInfo';

const Container = styled.div`
    margin: ${props => props.margin ? props.margin : "0 0 0 0"};
`;

const videos = [/*
    { id: "17892962" },
    { id: "148751763" },
    { id: "37328349" },
    { id: "17892962" },
    { id: "148751763" },
    { id: "37328349" },
    { id: "17892962" },
    { id: "148751763" },
    { id: "37328349" },
    { id: "17892962" },
    { id: "148751763" },
    { id: "37328349" }
*/];

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
                <iframe 
                    title={this.props.title} 
                    src={`https://player.vimeo.com/video/${this.props.id}?autoplay=1&color=${THEME.MAIN.substring(1)}&byline=0&portrait=0`} 
                    style={videoStyle} 
                    frameborder="0" 
                    allow="autoplay; fullscreen" 
                    allowfullscreen="true" 
                    mozallowfullscreen="true" 
                    webkitallowfullscreen="true"
                />
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
                <ItemHeader 
                    key={this.props.data.id} 
                    id={this.props.data.id} 
                    square={false}
                    imgSrc={this.props.data.img}
                    title={this.props.data.title} 
                    onClick={() => this.setState({ show: true })} 
                />
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
                video.img = data.thumbnail_url;
                video.title = data.title;
            })
        })
    }

    render() {
        return (
            <Container>
                <ContentInfo num={this.state.numVideos} singular={"video"} plural={"videos"} />
                <Container margin={"0 0 40px 0"}>{
                    this.state.videoList.map((video, key) => 
                        <VideoHeader key={video.id} id={video.id} data={video} />
                    )}
                </Container>
            </Container>
        );
    }
}