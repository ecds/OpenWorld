import React from 'react';
import styled from 'styled-components';

import ItemHeader from '../ItemHeader';
import ContentInfo from '../ContentInfo';

const Container = styled.div`
    margin: ${props => props.margin ? props.margin : "0 0 0 0"};
`;

const objects = [/*
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
    {
        "id": "story3",
        "title": "A 3D Model of the Mill Site and Its Production Assembly Line",
        "img": "https://reactjs.org/logo-og.png",
    }, 
    {
        "id": "story4",
        "title": "A 3D Model of the Mill Site and Its Production Assembly Line",
        "img": "https://reactjs.org/logo-og.png",
    }, 
    {
        "id": "story5",
        "title": "A 3D Model of the Mill Site and Its Production Assembly Line",
        "img": "https://reactjs.org/logo-og.png",
    }, 
    {
        "id": "story6",
        "title": "A 3D Model of the Mill Site and Its Production Assembly Line",
        "img": "https://reactjs.org/logo-og.png",
    }, 
    {
        "id": "story7",
        "title": "A 3D Model of the Mill Site and Its Production Assembly Line",
        "img": "https://reactjs.org/logo-og.png",
    }, 
*/];

export default class Objects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
                <Container margin={"0 0 40px 0"}>{
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