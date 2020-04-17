import React, { Suspense, lazy } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import styled from 'styled-components';

// import Stories from '../Stories';
// import Images from '../Images'
// import Videos from '../Videos';
// import Objects from '../Objects';

const Stories = lazy(() => import('../Stories'));
const Images = lazy(() => import('../Images'));
const Videos = lazy(() => import('../Videos'));
const Objects = lazy(() => import('../Objects'));

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
    border-radius: ${props => props.borderradius ? props.borderradius : "0 0 0 0"};

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
    border-radius: inherit;

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
                    <StyledNavItem borderradius={"4px 0px 0px 4px"}>
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
                    <StyledNavItem borderradius={"0px 4px 4px 0px"}>
                        <StyledNavLink eventKey="3d">
                            3D MODELS
                        </StyledNavLink>
                    </StyledNavItem>
                </StyledNav>
                <Tab.Content>
                    <Tab.Pane eventKey="stories">
                        <Suspense fallback={<div>Loading Stories...</div>}>
                            <Stories />
                        </Suspense>
                    </Tab.Pane>
                    <Tab.Pane eventKey="images">
                        <Suspense fallback={<div>Loading Images...</div>}>
                            <Images />
                        </Suspense>
                    </Tab.Pane>
                    <Tab.Pane eventKey="videos">
                        <Suspense fallback={<div>Loading Videos...</div>}>
                            <Videos />
                        </Suspense>
                    </Tab.Pane>
                    <Tab.Pane eventKey="3d">
                        <Suspense fallback={<div>Loading Objects...</div>}>
                            <Objects />
                        </Suspense>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        );
    }
}