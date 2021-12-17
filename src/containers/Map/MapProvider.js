import React from 'react';
import MapContext from './MapContext';

export default class MapProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = { map: null, year: 1833 };
    };

    setMap = map => {
        this.setState({ map });
    };

    setYear = year => {
        this.setState({ year });
    }

    render() {

        return (
            <MapContext.Provider value={{ map: this.state.map, setMap: this.setMap, setYear: this.setYear, year: this.state.year }}>
                {this.props.children}
            </MapContext.Provider>
        );
    };
}