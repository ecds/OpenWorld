import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const descStyle = {};
const infoStyle = {
	fontSize: "0.8rem",
	textAlign: "center",
};

export default class TabInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			style: descStyle,
		};

		if (this.props.type === "info") {
			this.state.style = infoStyle;
		}
	}

	render() {
		return <Container style={this.state.style}>
				<p>{this.props.text}</p>
		</Container>
	}
}