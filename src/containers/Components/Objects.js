import React from 'react';
import styled from 'styled-components';

import ItemHeader from './ItemHeader.js';
import ContentInfo from './ContentInfo.js';

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
                <ContentInfo num={this.state.numObjects} singular={"model in 3D"} plural={"models in 3D"} />
                <Container className={""}>{
                    this.state.objectList.map((object, key) =>
                        <ItemHeader 
                            key={object.id} 
                            id={object.id} 
                            square={false}
                            imgSrc={object.img}
                            title={object.title} 
                            onClick={() => this.handleClick(object)} 
                        />
                    )}
                </Container>
            </Container>
        );
    }
}