import L from 'leaflet';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

export const markerIcon = (num) => {
  return L.divIcon(
    {
      html: `<span class="fs-3"><svg viewBox="0 0 512 512"><path d="${faLocationPin.icon[4]}"></path><span class="fa-stack-1x text-center mt-2 me-2 owa-marker-number fs-6">${num}</span></span>`,
      iconSize: 40,
      className: 'owa-location-marker'
    }
  );
}

export const activeMarkerIcon = (num) => {
  return L.divIcon(
    {
      html: `<span class="fs-3"><svg viewBox="0 0 512 512"><path d="${faLocationPin.icon[4]}"></path><span class="fa-stack-1x text-center mt-2 me-3 owa-marker-number fs-5">${num}</span></span>`,
      iconSize: 60,
      className: 'owa-location-marker'
    }
  );
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
                            return L.marker(latlng, { icon: markerIcon(feature.properties.position) });
                          }
                        }
                      ),
    tourDetails: tour
  }
}