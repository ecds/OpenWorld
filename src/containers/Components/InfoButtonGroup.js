import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import styled from 'styled-components';

import Stories from './Stories.js';
import Images from './Images.js';
import Videos from './Videos.js';
import Objects from './Objects.js';

const StyledNav = styled(Nav)`
    margin-left: 1em;
    margin-right: 1em;
    height: 2em;
`;

const StyledNavItem = styled(Nav.Item)`
    padding: 0;
    background-color: ${props => props.theme.MAIN};
    color: ${props => props.theme.SECOND};
    cursor: pointer;
    font-size: 1em;
    font-weight: normal;

    @media (max-width: 768px) {
        width: calc((100vw - 5em)/4);
    }

    @media (min-width: 769px) {
        min-width: calc((400px - 5em)/4);
        width: calc((40vw - 5em)/4);
        max-width: calc((500px - 5em)/4);
    }

    > .nav-link.active {
        background-color: ${props => props.theme.SECOND};
        color: ${props => props.theme.MAIN};
    }
`;

const StyledNavLink = styled(Nav.Link)`
    padding: 0.25em 0 !important;
    height: 2em;
    text-align: center;
    color: ${props => props.theme.SECOND};
    text-decoration: none;
    border: 1px solid ${props => props.theme.MAIN};
    font-size: 1em;

    :hover {
        color: ${props => props.theme.THIRD};
    }
`;

export default class InfoButtonGroup extends React.Component {

    onChange(e) {
        console.log(e);
    }
    
    render() {
        return (
            <Tab.Container id="infoGroup">
                <StyledNav>
                    <StyledNavItem id="firstNav">
                        <StyledNavLink eventKey="stories">
                            STORIES
                        </StyledNavLink>
                    </StyledNavItem>
                    <StyledNavItem>
                        <StyledNavLink eventKey="images">
                            IMAGES
                        </StyledNavLink>
                    </StyledNavItem>
                    <StyledNavItem>
                        <StyledNavLink eventKey="videos">
                            VIDEOS
                        </StyledNavLink>
                    </StyledNavItem>
                    <StyledNavItem id="lastNav">
                        <StyledNavLink eventKey="3d">
                            3D MODELS
                        </StyledNavLink>
                    </StyledNavItem>
                </StyledNav>
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