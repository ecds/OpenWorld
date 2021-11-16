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
			<div>
			<Wrapper>
				{
					OVERLAYS.map((layer, ind) => {
						switch(layer.type) {
							case 'buildings':
								return <Buildings {...layer} key={ind} />;
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
			  },
				<Annexations updateLayerInfo={this.updateLayerInfo} />
				<Wards updateLayerInfo={this.updateLayerInfo} />
						</Wrapper>
				<LayerGroup {...StreetcarLayers(1924)} />
        <div className="ow-toast-container" style={{bottom: "2rem", position: "absolute", left: "2rem", zIndex: -1}}>
				<div className="overflow-auto" style={{maxHeight: "85vh"}}>
					<div className="overflow-hidden">
					{
						this.state.layers.map((layer, index) => {
							return (<Toast show={layer.show} key={index} onClose={(e) => this.closeToast(e, index)} animation={true}>
								<Toast.Header>
									<strong className="mr-auto">{layer.title}</strong>
									<small></small>
								</Toast.Header>
								<Toast.Body>
									{layer.body}
								</Toast.Body>
							</Toast>)
						})
					}
					</div>
					</div>
				</div>
				</div>
		)
	}
}