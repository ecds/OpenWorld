import React from 'react';
import Toast from 'react-bootstrap/Toast'
import styled from 'styled-components';
import LayerGroup from '../LayerGroup';
import { OVERLAYS, StreetcarLayers } from '../../../constants';
import Buildings from '../../Map/Layers/Buildings';
import Roads from '../../Map/Layers/Roads';
import MarkerCluster from '../../Map/Layers/MarkerCluster';
import Polygon from '../../Map/Layers/Polygon';
import Railways from '../../Map/Layers/Railways';
import Annexations from '../../Map/Layers/Annexations';
import Wards from '../../Map/Layers/Wards';
import { Accordion, Card } from 'react-bootstrap';
import { FaCity, FaDrawPolygon, FaSubway } from 'react-icons/fa';

const Wrapper = styled.div``;

export default class ControlsContainer extends React.Component {
	constructor(props) {
    super(props);

		this.state = {
			layers: []
		};

    this.updateLayerInfo = this.updateLayerInfo.bind(this);
    this.closeToast = this.closeToast.bind(this);
	}

	updateLayerInfo(layer) {
		const currentLayers = this.state.layers.filter(currentLayer => currentLayer.type != layer.type);
		if (layer.title) {
			currentLayers.push({ ...layer, show: true });
		}
		this.setState({ layers: currentLayers });
	}

	closeToast(event, index) {
    this.state.layers.splice(index, 1);
    this.setState({ layers: this.state.layers });
	}

	render() {
		return (
			<Wrapper>
				<Accordion>
				{/* {
					OVERLAYS.map((layer, ind) => {
						switch(layer.type) {
							case 'buildings':
								return
							case 'roads':
								return <Roads {...layer} key={ind} />;
							case 'cluster':
								return <MarkerCluster {...layer} key={ind} />;
							case 'polygon':
								return <Polygon {...layer} key={ind} />;
							case 'railways':
								return <Railways {...layer} key={ind} />;
							default:
								return null;
						}
					})
			  }, */}
				<Accordion.Item eventKey="0">
					<Accordion.Header>
					<FaCity style={{marginRight: ".25rem"}} /> Buildings
					</Accordion.Header>
					<Accordion.Body>
						{/* <Buildings {...layer} key={ind} />; */}
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header><FaDrawPolygon style={{marginRight: ".25rem"}} /> City Boundaries</Accordion.Header>
					<Accordion.Body>
						<Annexations updateLayerInfo={this.updateLayerInfo} />
            <Wards updateLayerInfo={this.updateLayerInfo} />
					</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header>
						<FaSubway style={{marginRight: ".25rem"}} /> Transportation
						</Accordion.Header>
						<Accordion.Body>
							<LayerGroup {...StreetcarLayers(1924)} />
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Wrapper>
		)
	}
}