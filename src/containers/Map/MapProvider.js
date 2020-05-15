import React from 'react';
import MapContext from './MapContext';

export default class MapProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = { map: null };
    };

    setMap = map => {
        this.setState({ map });
    };

    render() {
        return (
            <MapContext.Provider value={{ map: this.state.map, setMap: this.setMap }}>
                {this.props.children}
            </MapContext.Provider>
        );
    };
}