import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import Stories from './Stories.js';
import Images from './Images.js';
import Videos from './Videos.js';
import Objects from './Objects.js';

export default class InfoButtonGroup extends React.Component {

    onChange(e) {
        console.log(e);
    }
    
    render() {
        return (
            <Tab.Container id="infoGroup">
                <Nav variant="custom">
                    <Nav.Item id="firstNav">
                        <Nav.Link eventKey="stories">STORIES</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="images">IMAGES</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="videos">VIDEOS</Nav.Link>
                    </Nav.Item>
                    <Nav.Item id="lastNav">
                        <Nav.Link eventKey="3d">3D MODELS</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="stories">
                        <Stories />
                    </Tab.Pane>
                    <Tab.Pane eventKey="images">
                        <Images />
                    </Tab.Pane>
                    <Tab.Pane eventKey="videos">
                        <Videos />
                    </Tab.Pane>
                    <Tab.Pane eventKey="3d">
                        <Objects />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        );
    }
}