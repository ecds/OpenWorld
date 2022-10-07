import L from 'leaflet';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

export const markerIcon = (props) => {
  return L.divIcon(
    {
      html: iconHTML(props, 6),
      iconSize: 40,
      className: 'owa-location-marker'
    }
  );
}

export const activeMarkerIcon = (props) => {
  return L.divIcon(
    {
      html: iconHTML(props, 5),
      iconSize: 60,
      className: 'owa-location-marker'
    }
  );
}

const iconHTML = (props, size) => {
  return `<span class="fs-3">
            <svg viewBox="0 0 512 512" role="image">
              <path d="${faLocationPin.icon[4]}"></path>
              <title>${props.title}</title>
              <span class="fa-stack-1x text-center mt-2 me-2 owa-marker-number fs-${size}">${props.position}</span>
            </svg>
          </span>`
}


export const tours = [
  {
    title: '1934-1935 run of ‘Imitation of Life’ in Atlanta Movie Theaters',
    slug: '1934-1935-run-of-imitation-of-life-in-atlanta-movie-theaters',
    url: 'https://api.opentour.site/openworld-atlanta-tours/geojson_tours/2',
    year: 1934,
    intro: ''
  }
]

export const Tour = async (tourSlug) => {
  const tour = tours.find(tour => tour.slug === tourSlug)
  const response = await fetch(tour.url);
  const data = await response.json();
  tour.intro = data.meta.intro;

  return {
    leafletLayer: new L.GeoJSON(
                        data,
                        {
                          pointToLayer: (feature, latlng) => {
                            const marker = L.marker(
                              latlng, {
                                icon: markerIcon(feature.properties),
                                autoPanOnFocus: false
                              }
                            );
                            return marker;
                          },
                          onEachFeature
                        }
                      ),
    tourDetails: tour
  }
}

const onEachFeature = (feature, layer) => {
  // This is sort of a hack to make sure the markers accessible via the keyboard.
  // Focus/blur events and not supported, this is added so we can respond to
  // popupopen/close events.
  layer.bindPopup(
    feature.properties.title, {  className: 'd-none' }
  );
}