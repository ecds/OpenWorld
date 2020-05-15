import React from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const Row = styled.div`
    display: flex;
    cursor: pointer;
    margin: 0.5rem 0 0.5rem 0;
`;

const Thumbnail = styled("img")`
    height: 4rem;
    width: 4rem;
    position: relative;
    object-fit: cover;
`;

const Title = styled.div`
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 1em;
    vertical-align: middle;
    color: ${props => props.theme.TEXT};
    font-size: 1.4em;
    line-height: 1.15em;
`;

class CustomModal extends React.Component {
	render() {
		return (
			<Modal
				{...this.props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered 
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						{this.props.title}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <img src={this.props.src} alt={this.props.title} />
				</Modal.Body>
			</Modal>
		)
	}
}

export default class MediaItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            onClick: null,
        }
    }

    

    render() {
        return (<>
            <Row onClick={this.state.onClick}>
                <Thumbnail src={this.props.obj.url} />
                <Title>{this.props.obj.title}</Title>
            </Row>
            <CustomModal
                show={this.state.show}
                title={this.props.obj.title}
                src={this.props.obj.url}
                onHide={() => this.setState({ show: false })}
            />
        </>)
    };
}