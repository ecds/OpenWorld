import React from 'react';
import styled from 'styled-components';

import { TAGS } from '../../constants';

import PropBox from './PropBox';

const PropsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default class InfoBox extends React.Component {
    render() {
        return (
            <PropsContainer>{
                this.props.properties === undefined ?
                null :
                Object.entries(TAGS.buildings).map(([key, value]) => {
                    if (this.props.properties[key] !== value.falsyValue) {
                        return <PropBox key={key} tag={value.tag} value={this.props.properties[key]} tooltip={value.tooltip} />;
                    } else if (this.props.properties[value.fallback] && this.props.properties[value.fallback] !== value.falsyValue) {
                        return <PropBox key={key} tag={value.tag} value={this.props.properties[value.fallback]} tooltip={value.tooltip} />;
                    }
                })
            }</PropsContainer>
        )
    }
}