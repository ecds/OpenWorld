import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "@remix-run/react";
import MapContext from "~/mapContext";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { Popup } from "maplibre-gl";
import chroma from "chroma-js";
import { streetcarLines } from "~/data/streetcarData";

const popupContent = (features, year) => {
  features = [...new Set(features)];
  const list = document.createElement('div');
  list.classList.add('btn-group-vertical');

  for (const line of features) {
    const lineData = streetcarLines[year].find(streetcarLine => streetcarLine.number == line.properties.Route_num)
    const item = document.createElement('div');
    if (!list.innerText.includes(line.properties.R_Name)) {
      item.classList.add('btn')
      item.style.backgroundColor = lineData.color;
      item.style.color = chroma.contrast(lineData.color, 'white') > 3.5 ? 'white': 'black'
      item.innerText = `${line.properties.Route_num}: ${line.properties.R_Name}`;
      list.appendChild(item);
    }
  }
  return list;
}

const singlePopupContent = (lineData) => {
  const element = document.createElement('div');
  element.classList.add('btn');
  element.style.backgroundColor = lineData.color;
  element.style.color = chroma.contrast(lineData.color, 'white') > 3.5 ? 'white': 'black'
  element.innerText = `${lineData.number}: ${lineData.name}`;
  return element;
}

const popup = new Popup({
  closeButton: false,
  closeOnClick: false
});

const Streetcars = () => {
  const { mapState, currentYearState, setCurrentYearState } = useContext(MapContext);
  const { year } = useParams();
  const activeLines = useRef([]);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  useEffect(() => {
    setCurrentYearState(year)
  }, [setCurrentYearState, year]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://geoserver.ecds.emory.edu/StreetcarRoutes/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=StreetcarRoutes:streetcars1924&maxFeatures=500&outputFormat=application%2Fjson');
      const data = await response.json();

      if (!mapState?.getSource("streetcarLines")) {
        mapState?.addSource("streetcarLines", {
          type: "geojson",
          promoteId: "Route_num",
          // lineMetrics: true,
          data
        });

        if (!mapState?.getLayer("streetcarLines")) {
          mapState?.addLayer({
            id: "streetcarLines",
            type: "line",
            source: "streetcarLines",
            paint: {
              'line-width': [
                "case",
                ['boolean', ['feature-state', 'active'], false], 8,
                4
              ],
              'line-color': [
                "case",
                ["==", ["get", "Route_num"], "1"], "#ff0000",
                ["==", ["get", "Route_num"], "2"], "#ed7940",
                ["==", ["get", "Route_num"], "3"], "#ffff00",
                ["==", ["get", "Route_num"], "4"], "#e600a9",
                ["==", ["get", "Route_num"], "5"], "#409679",
                ["==", ["get", "Route_num"], "6"], "#4094ff",
                ["==", ["get", "Route_num"], "7"], "#6677cd",
                ["==", ["get", "Route_num"], "8"], "#8400a8",
                ["==", ["get", "Route_num"], "9"], "#be4040",
                ["==", ["get", "Route_num"], "10"], "#d3d37f",
                ["==", ["get", "Route_num"], "11"], "#ca7af5",
                ["==", ["get", "Route_num"], "12"], "#cdf57a",
                ["==", ["get", "Route_num"], "13"], "#ff7fe2",
                ["==", ["get", "Route_num"], "14"], "#267300",
                ["==", ["get", "Route_num"], "15"], "#ff7f7f",
                ["==", ["get", "Route_num"], "16"], "#a6a6a6",
                ["==", ["get", "Route_num"], "17"], "#407abe",
                ["==", ["get", "Route_num"], "18"], "#e69800",
                ["==", ["get", "Route_num"], "19"], "#40d4ff",
                ["==", ["get", "Route_num"], "20"], "#be40a3",
                ["==", ["get", "Route_num"], "21"], "#38a800",
                ["==", ["get", "Route_num"], "22"], "#00a884",
                ["==", ["get", "Route_num"], "23"], "#ffb9ef",
                ["==", ["get", "Route_num"], "24"], "#73ffdf",
                "black"
              ],
              'line-dasharray': [1, 1]
              // 'line-offset': [
              //   "case",
              //   // ["==", ["%", ["get", "Route_num"], 2], 20], 0.2,
              //   ["==", ["get", "Route_num"], "2"], 2,
              //   ["==", ["get", "Route_num"], "4"], 2,
              //   ["==", ["get", "Route_num"], "6"], 2,
              //   ["==", ["get", "Route_num"], "8"], 2,
              //   ["==", ["get", "Route_num"], "8"], 2,
              //   ["==", ["get", "Route_num"], "10"], 2,
              //   ["==", ["get", "Route_num"], "12"], 2,
              //   ["==", ["get", "Route_num"], "14"], 2,
              //   ["==", ["get", "Route_num"], "16"], 2,
              //   ["==", ["get", "Route_num"], "18"], 2,
              //   ["==", ["get", "Route_num"], "20"], 2,
              //   ["==", ["get", "Route_num"], "22"], 2,
              //   ["==", ["get", "Route_num"], "24"], 2,
              //   -2
              // ]
            }
          });

          // mapState?.on('click', 'streetcarLines', (({ features }) => {
          //   console.log("🚀 ~ file: annexations.tsx:42 ~ mapState?.on ~ features:", features)
          // }));
          // mapState?.on('mouseenter', 'streetcarLines', (({ features }) => {
          // console.log("🚀 ~ file: streetcars.$year.tsx:74 ~ mapState?.on ~ features:", features)

          // }));

          mapState?.on('mouseenter', 'streetcarLines', ({ lngLat, features }) => {
            activeLines.current = features;
            for (const line of features) {
              mapState.setFeatureState(
                { source: "streetcarLines", id: line.properties.Route_num },
                { active: true }
              );
            }
            mapState.getCanvas().style.cursor = 'pointer';
            popup.setLngLat(lngLat);
            popup.setDOMContent(popupContent([...new Set(features)], currentYearState));
            popup.addTo(mapState);
          });

          mapState?.on('mouseleave', 'streetcarLines', () => {
            console.log("🚀 ~ file: streetcars.$year.tsx:147 ~ mapState?.on ~ activeLines:", activeLines)
            for (const line of activeLines.current) {
              console.log("🚀 ~ file: streetcars.$year.tsx:148 ~ mapState?.on ~ line:", line)
              mapState.setFeatureState(
                { source: "streetcarLines", id: line.properties.Route_num },
                { active: false }
              );
            }
            mapState.getCanvas().style.cursor = '';
            popup.remove();
            activeLines.current = [];
          })

          mapState?.setPitch(0);
          mapState?.fitBounds([[-84.25462256154452,33.81246005549207],[-84.49819653886276,33.69852787511353]]);
        }
      }
    }

    fetchData();

    return () => {
      if (mapState?.getLayer('streetcarLines')) mapState.removeLayer('streetcarLines');
      if (mapState?.getSource('streetcarLines')) mapState.removeSource('streetcarLines');

    }
  }, [mapState, currentYearState]);

  const handleMouseEnter = (line) => {
    const { number, center } = line
    mapState.setFeatureState(
      { source: "streetcarLines", id: number },
      { active: true }
    );
    popup.setLngLat(center);
    popup.setDOMContent(singlePopupContent(line));
    popup.addTo(mapState);

  };

  const handleMouseExit = (number) => {
    mapState.setFeatureState(
      { source: "streetcarLines", id: number },
      { active: false }
    );
    popup.remove();
  };

  return (
    <Offcanvas show={showDetails} placement="end" scroll={true} backdrop={false} >
      <Offcanvas.Header closeButton onHide={() => setShowDetails(false)}>
        <h4>Streetcar Lines {currentYearState}</h4>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0">
        {currentYearState &&
          <ListGroup>
            {streetcarLines[currentYearState]?.map((line, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  role="button"
                  style={{
                    backgroundColor: line.color,
                    color: chroma.contrast(line.color, 'white') > 3.5 ? 'white': 'black'
                  }}
                  onMouseEnter={() => handleMouseEnter(line)}
                  onMouseLeave={() => handleMouseExit(line.number)}
                >
                  {line.number}: {line.name}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        }
      </Offcanvas.Body>
    </Offcanvas>
  )
};

export default Streetcars;