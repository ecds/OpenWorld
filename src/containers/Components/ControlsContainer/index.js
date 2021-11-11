import React from 'react';
import styled from 'styled-components';
import LayerGroup from '../LayerGroup';
import { OVERLAYS, StreetcarLayers } from '../../../constants';
import Buildings from '../../Map/Layers/Buildings';
import Roads from '../../Map/Layers/Roads';
import MarkerCluster from '../../Map/Layers/MarkerCluster';
import Polygon from '../../Map/Layers/Polygon';
import Railways from '../../Map/Layers/Railways';
import Annexations from '../../Map/Layers/Annexations';

const Wrapper = styled.div``;

export default class ControlsContainer extends React.Component {
	render() {
		return (
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
				<Annexations />
				<LayerGroup {...StreetcarLayers(1924)} />
			</Wrapper>
		)
	}
}