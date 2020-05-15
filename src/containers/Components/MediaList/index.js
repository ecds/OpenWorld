import React from 'react';
import styled from 'styled-components';
import MediaItemList from '../MediaListItem';

const Container = styled.div``;
const Header = styled.div`
text-align: center;
`;

export default class MediaList extends React.Component {
    render() {
        return (
            <Container> 
                <Header>{this.props.media.length} resources available</Header>
                {
                    this.props.media.map((obj, key) => {
                        return <MediaItemList obj={obj} key={key} />;
                    })
                }
            </Container>  
        );
    }
}