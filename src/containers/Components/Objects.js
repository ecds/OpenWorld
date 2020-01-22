import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div``;

const objects = [
    {
        "id": "story1",
        "title": "A Modern View of the Mill in a Historical Context",
        "img": "https://reactjs.org/logo-og.png",
    },
    {
        "id": "story2",
        "title": "A 3D Model of the Mill Site and Its Production Assembly Line",
        "img": "https://reactjs.org/logo-og.png",
    }, 
];

const objectThumbnail = {
    width: "9.25em",
    height: "5em",
}

const objectThumbnailImg = {
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

class ObjectHeader extends React.Component {
    render() {
        return (
            <Row onClick={this.props.onClick}>
                <div style={objectThumbnail}>
                    <img style={objectThumbnailImg} src={this.props.data.img} alt="Story thumbnail" />
                </div>
                <div style={objectTitle}>
                    {this.props.data.title}
                    {this.props.data.unity? <span className="object-info">This will launch in Unity.</span> : ""}
                </div>
            </Row>
        )
    }
}

export default class Objects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            poiId: "building1",
            object: null,
            objectList: objects,
            numObjects: objects.length,
        }
    }

    handleClick(props) {
        this.setState({
            object: props,
        })
    }

    render() {
        return (
            <Container>
                <span className={"contentInfo"}>{this.state.numObjects} 3D model{this.state.numObjects === 1? '' : 's'} available</span>
                <Container className={""}>{
                    this.state.objectList.map((object, key) =>
                        <ObjectHeader key={object.id} id={object.id} data={object} onClick={() => this.handleClick(object)} />
                    )}
                </Container>
            </Container>
        );
    }
}