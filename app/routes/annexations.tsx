import { useSearchParams } from "@remix-run/react";
import { useRef, useContext, useEffect, useState } from "react";
import MapContext from "~/mapContext";
import { Offcanvas } from "react-bootstrap";
import { YEARS, AnnexDetails } from "~/data/annexationData";
import TimeSlider from "~/components/TimeSlider";

const annexationFilter = ["==", ["get", "TYPE"], "annexation"];
const boundaryFilter = ["==", ["get", "TYPE"], "boundary"];

const Annexations = () => {
  const { mapState, currentYearState, setCurrentYearState } = useContext(MapContext);
  const [searchParams] = useSearchParams();

  const initialYearFilter = useRef(
    Math.max(...YEARS.filter(year => year <= (searchParams.get("year") ?? Math.min(...YEARS)))).toString()
  );

  const [details, setDetails] = useState(AnnexDetails[initialYearFilter.current]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://geoserver.ecds.emory.edu/AtlantaAnnexations/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AtlantaAnnexations:annexations_1847-1945&maxFeatures=500&outputFormat=application%2Fjson");
      const data = await response.json();

      if (!mapState?.getSource("allAnnexations")) {
        mapState?.addSource("allAnnexations", {
          type: "geojson",
          promoteId: "id",
          data
        });
      }

      if (!mapState?.getLayer("annexations")) {
        mapState?.addLayer({
          id: "annexations",
          type: "fill",
          source: "allAnnexations",
          paint: {
            'fill-color': '#E65100',
            'fill-opacity': 0.4,
            'fill-outline-color': "#0D47A1"
          },
          filter: ["all",
            annexationFilter,
            ["==", ["get", "YEAR"], initialYearFilter.current]
          ]
        });

        // mapState?.on('click', 'annexations', (({ features }) => {
        //   console.log("🚀 ~ file: annexations.tsx:42 ~ mapState?.on ~ features:", features)
        // }));
      }

      if (!mapState?.getLayer("boundaries")) {
        mapState?.addLayer({
          id: "boundaries",
          type: "line",
          source: "allAnnexations",
          paint: {
            'line-color': "#0D47A1",
            'line-width': 4
          },
          filter: ["all",
            boundaryFilter,
            ["==", ["get", "YEAR"], initialYearFilter.current]
          ]
        });
      }

      mapState?.setPitch(0);
      mapState?.fitBounds([[-84.48687037559027,33.69864192995179],[-84.24557749909809,33.81150767366269]]);
    };

    if (!mapState?.getSource('allAnnexations')) fetchData();

    return () => {
      if (mapState?.getLayer('annexations')) mapState.removeLayer('annexations');
      if (mapState?.getLayer('boundaries')) mapState.removeLayer('boundaries');
      if (mapState?.getSource('allAnnexations')) mapState.removeSource('allAnnexations');
    }
  }, [mapState, initialYearFilter]);

  useEffect(() => {
    setCurrentYearState(
      Math.max(...YEARS.filter(year => year <= (searchParams.get("year") ?? Math.min(...YEARS))))
    )
  }, [setCurrentYearState, searchParams]);

  useEffect(() => {
    if (
      mapState &&
      mapState.getLayer('annexations')
    ) {
      mapState?.setFilter(
        'annexations',
        ["all",
          annexationFilter,
          ["==", ["get", "YEAR"], currentYearState?.toString()]
      ]);
      mapState?.setFilter(
        'boundaries',
        ["all",
          boundaryFilter,
          ["==", ["get", "YEAR"], currentYearState?.toString()]
      ]);
    }

    setDetails(AnnexDetails[currentYearState?.toString()]);
  }, [currentYearState, mapState]);

  return (
    <Offcanvas show={true} placement="end" scroll={true} backdrop={false}>
      <Offcanvas.Header closeButton onHide={() => setShowDetails(false)}>
        <h4>Annexations</h4>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0">
        <TimeSlider years={YEARS} label="City Boundaries in" />
        <article>
          {details?.areas}
        </article>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Annexations;
