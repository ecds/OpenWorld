import React from 'react';
import MapContext from '../../../containers/Map/MapContext';
import L from 'leaflet';
import { Container, Label } from '../../Components/GenericLayer';
import { Form } from 'react-bootstrap';

const WardYears = [1854, 1871, 1874, 1883];

const WardColors = {
    '1': '#f5ebaa',
    '2': '#ebb7a6',
    '3': '#c4e4a7',
    '4': '#bec9d2',
    '5': '#e9c0d3',
    '6': '#b9d2bb',
    '7': '#bbb2a1'
}

const WardLayers = function() {
    const wards = [];
    WardYears.forEach((year) => {
        wards.push(
            {
                desc: `City of Atlanta Wards in ${year}`,
                id: `ward${year}`,
                label: `Wards ${year}`,
                type: 'polygon',
                url: `https://geoserver.ecds.emory.edu/Wards/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Wards:Wards${year}&maxFeatures=500&outputFormat=application%2Fjson`,
                clickable: true,
                year: year,
                options: {
                    color: 'lightgray',
                    weight: 4,
                    fillOpacity: 0.7,
                    opacity: 1
                }
            }
        )
    });

    return wards;
}

export default class Wards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYear: '1837',
      bounds: new L.latLngBounds(),
      maxYear: '2021',
      minYear: '1837',
      wards: [],
      labels: null,
      current: null,
      showToast: false,
      activeFeature: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.onEachFeature = this.onEachFeature.bind(this);
    this.toggleToast = this.toggleToast.bind(this);
    this.activateFeature = this.activateFeature.bind(this);
    this.deactivateFeature = this.deactivateFeature.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        minYear: Math.min(...WardYears) - 1,
        maxYear: Math.max(...WardYears) + 1
      }
    );

    const wards = [];

    WardLayers().forEach((layer) => {

      fetch(layer.url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let leafletLayer = new L.GeoJSON(data, {
            ...layer.options,
            onEachFeature: this.onEachFeature
          });

          leafletLayer.on('popupopen', this.activateFeature);
          leafletLayer.on('popupclose', this.deactivateFeature);

          wards.push(
            {
              ...layer,
              layerObject: leafletLayer
            }
          );

          this.state.bounds.extend(leafletLayer.getBounds());
        });
      });

      this.setState({wards: wards.sort((a,b) => parseInt(a.year) - parseInt(b.year))});
  }

  activateFeature(event) {
    if (this.state.activeFeature) {
      this.state.activeFeature.closePopup();
    }
    event.layer.setStyle({...event.layer.options, fillOpacity: 1});
    this.setState({activeFeature: event.layer});
  }

  deactivateFeature(event) {
    event.layer.setStyle({...event.layer.options, fillOpacity: 0.7});
    if (this.state.current && !this.state.current.layerObject.getLayers().includes(event.layer)) {
      this.setState({activeFeature: null});
    }
  }

  handleChange(event, map) {
    const eventYear = parseInt(event.target.value);
    const newYear = (eventYear >= this.state.currentYear) ? eventYear : Math.max(...this.state.wards.filter(l => l.year <= eventYear).map(l => parseInt(l.year)));
    this.setState(
      {
        currentYear: event.target.value
      }
    );

    map.fitBounds(map.getBounds().extend(this.state.bounds, { animate: true }));

    this.state.wards.forEach((ward, index) => {
      if (parseInt(ward.year) === newYear && !map.hasLayer(ward.layerObject)) {
        this.props.updateLayerInfo({title: `Wards in ${ward.year}`, body: 'WARDS!!!', type: 'ward'});
        if (this.state.current) {
          this.state.current.layerObject.removeFrom(map);
          this.state.labels.forEach(label => label.removeFrom(map));
        }
        ward.layerObject.addTo(map);
        const labels = [];
        ward.layerObject.getLayers().forEach((layer) => {
          const icon = L.divIcon({html: `<h1>${layer.feature.properties.Ward}</h2>`});
          const label = L.marker(layer.getCenter(), { icon });
          label.addTo(map);
          labels.push(label);
        });
        this.setState(
          {
            current: ward,
            showToast: true,
            labels: labels
          }
        );
      } else if (newYear <= this.state.minYear && this.state.current) {
        this.setState(
          {
            current: null,
            showToast: false,
            labels: null
          }
        );
      }
      if (ward.year > newYear && map.hasLayer(ward.layerObject)) {
        this.props.updateLayerInfo({ type: 'ward' });
        this.state.labels.forEach(label => label.removeFrom(map));
        ward.layerObject.removeFrom(map);
      }
    });
  }

  onEachFeature(feature, layer) {
    layer.setStyle({...layer.options, color: WardColors[`${feature.properties.Ward}`]});
    layer.bindPopup(`<h3>Ward ${feature.properties.Ward}</h3>`);
  }

  toggleToast() {
    this.setState({showToast: !this.state.showToast});
  }


  render() {
    return (
      <MapContext.Consumer>
          {({map}) => {
            return  (
              <Container>
                <Label htmlFor="wards-by-year">City Wards in <em>{this.state.currentYear}</em>
                 <Form.Range id="wards-by-year" className="form-control-range ward-range-input" type="range" min={this.state.minYear} max={this.state.maxYear} onChange={(e) => this.handleChange(e, map)} />
                </Label>
              </Container>
              )
          }}
      </MapContext.Consumer>
    )
  }
}