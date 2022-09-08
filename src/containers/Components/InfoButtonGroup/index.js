// import React, { lazy } from 'react';
import React from 'react';
// import { Tab, Nav } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ControlsContainer from '../ControlsContainer';

// const ObjectInfo = lazy(() => import('../ObjectInfo'));
// const InfoBox = lazy(() => import('../../Tabs/InfoBox'));
// const MediaList = lazy(() => import('../MediaList'));

// const StyledNav = styled(Nav)`
//     margin-left: 1em;
//     margin-right: 1em;
//     height: 2em;
// `;

// const StyledNavItem = styled(Nav.Item)`
//     padding: 0;
//     background-color: ${props => props.theme.SECOND};
//     color: ${props => props.theme.MAIN};
//     cursor: pointer;
//     font-size: 1em;
//     font-weight: 500; /* slightly bolder than normal */

//     @media (max-width: 768px) {
//         width: calc((100vw - 5em)/2);
//     }

//     @media (min-width: 769px) {
//         min-width: calc((400px - 5em)/2);
//         width: calc((40vw - 5em)/2);
//         max-width: calc((500px - 5em)/2);
//     }

//     > .nav-link.active {
//         border-bottom: 2px solid ${props => props.theme.MAIN};
//         COLOR: ${props => props.theme.MAIN};
//     }
// `;

// const StyledNavLink = styled(Nav.Link)`
//     padding: 0.25em 0 !important;
//     height: 2em;
//     text-align: center;
//     color: ${props => props.theme.MAIN};
//     text-decoration: none;
//     border: 0;
//     font-size: 1em;
//     border-radius: inherit;
//     font-weight: bold;

//     :hover {
//         color: ${props => props.theme.THIRD};
//     }
// `;

const StyledPane = styled(Tab.Pane)`
    padding: 1rem;
        height: calc((100vh) - (55.6px + (3*2em)));
    overflow-y: auto;
    scrollbar-width: none;
`;

// const Bottom = styled.div`
//     width: 100%;
//     height: 0.7rem;
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     background-color: ${props => props.theme.MAIN};
// `;

class InfoButtonGroup extends React.Component {

    onChange(e) {
    }

    render() {
        return (

                    <StyledPane eventKey={1}>
                        <ControlsContainer id="layersControls"/>

                    </StyledPane>

        );
    }
}

const mapStateToProps = state => {
	switch(state.infoSelector.type) {
		case 'building':
			return { info: state.infoSelector, name: state.infoSelector.properties?.name_28, media: state.infoSelector.resources };
		default:
			return { info: null, name: null }
	}
}

export default connect(mapStateToProps, null)(InfoButtonGroup);