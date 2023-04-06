// import maplibregl from 'maplibre-gl'
import { useLoaderData, useLocation } from "@remix-run/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Offcanvas, Col, Row } from "react-bootstrap";
import { omekaMetadata, omekaImages, shapeFileMetadata } from '~/buildingMetadata';
import MapContext from "~/mapContext";
import { buildings } from "~/data/buildings";
import { camelToTitle } from '~/utils';
import Images from "~/components/Images";
import BuildingLegend from "~/components/BuildingLegend";
import ToggleButton from "~/components/ToggleButton";
import { customLayer } from "~/data/model";
import { terminalStation } from "~/data/terminalStation";

export const loader = async ({ params }) => {
  return { year: params.year, ...buildings[params.year] };
}

export default function Buildings() {
  const omekaDataRef = useRef();
  const { year, source, layer } = useLoaderData<typeof loader>();
  const { mapState,  setCurrentYearState, center, bearing, pitch, zoom } = useContext(MapContext);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<number>(1);
  const [selectedBuilding, setSelectedBuilding] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    mapState?.flyTo({
      bearing: bearing ?? 0,
      center,
      pitch: pitch ?? 60,
      zoom: zoom ?? 15
    });
  }, [location, center, mapState, bearing, pitch, zoom]);

  useEffect(() => {
    setCurrentYearState(parseInt(year));

    return () => {
      setCurrentYearState(undefined);
    }
  }, [year, setCurrentYearState]);

  useEffect(() => {
    const fetchOmekaData = async () => {
      omekaDataRef.current = await omekaMetadata();
    };

    fetchOmekaData();

    const layerId = layer.id;
    let clicked = undefined;

    if (mapState && !mapState.getSource(layerId)) mapState?.addSource(layerId, source);
    if (mapState && !mapState.getLayer(layerId)) mapState?.addLayer(layer);
    if (mapState && !mapState.getLayer('3d-model')) mapState?.addLayer(customLayer);
    if (mapState && !mapState.getLayer('terminalStation')) mapState?.addLayer(terminalStation);

    mapState?.once('idle', () => {
      if (mapState.getLayer(layerId)) mapState.moveLayer(layerId);
    });

    const getBuilding = async (properties) => {
      if (clicked) {
        mapState.setFeatureState(
          { source: layerId, sourceLayer: layer['source-layer'], id: clicked },
          { clicked: false }
        );
      }

      mapState.setFeatureState(
        { source: layerId, sourceLayer: layer['source-layer'], id: properties.Identifier },
        { clicked: true }
      );

      clicked = properties.Identifier;

      const omekaBuilding = await omekaDataRef.current.find(bldg => bldg.bldgID === properties.Identifier);
      if (omekaBuilding) {
        if (omekaBuilding.fileCount > 0 && omekaBuilding.images.length === 0) {
          omekaBuilding.images = await omekaImages(omekaBuilding.omekaID);
        }
        setSelectedBuilding(omekaBuilding);
      } else {
        setSelectedBuilding(shapeFileMetadata(properties));
      }
    }

    // mapState?.setFilter(
    //   'buildings1928',
    //   ["all",
    //   ["!=", ["get", "Identifier"], "BD36344"],
    //   ["!=", ["get", "Identifier"], "BD26475"]
    //   ]
    // );

    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    mapState?.on('click', layerId, (({ features }) => {
      getBuilding(features[0].properties);
      setShowLegend(0);
    }));

    // Change the cursor to a pointer when the mouse is over the states layer.
    mapState?.on('mouseenter', layerId, (() => {
      mapState.getCanvas().style.cursor = 'pointer';
    }));

    // Change it back to a pointer when it leaves.
    mapState?.on('mouseleave', layerId, (() => {
      mapState.getCanvas().style.cursor = '';
    }));

    return () => {
      mapState?.off('idle', layerId, () => mapState.moveLayer(layerId));
      mapState?.removeLayer('3d-model');
      mapState?.removeLayer('terminalStation');
      mapState?.removeLayer(layerId);
      mapState?.removeSource(layerId);
    }
  }, [mapState, source, layer, omekaDataRef, setSelectedBuilding]);

  return(
    <section>
      {!showDetails &&
        <ToggleButton toggle={setShowDetails}>
          Show building details
        </ToggleButton>
      }
      <Offcanvas show={showDetails} placement="end" scroll={true} backdrop={false} onHide={() => setShowDetails(false)}>
        <Offcanvas.Header closeButton onHide={() => setShowDetails(false)}>
          <h4>Buildings {year}</h4>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          <article>
            <section className="sticky-top">
              <BuildingLegend open={showLegend} toggle={setShowLegend} />
            </section>
            {selectedBuilding &&
            <>
              {selectedBuilding.images.length > 0 &&
                <section className="sticky-top" style={{ top: "56px" }}>
                  <Images images={selectedBuilding.images} />
                 </section>
              }
              <section className="position-relative">
                <h5>{selectedBuilding.title}</h5>
                <p className='lead'>{selectedBuilding.description}</p>
                {Object.keys(selectedBuilding.metadata).map((key, index) => {
                  if (selectedBuilding.metadata[key]) {
                    return (
                      <Row as="dl" key={index}>
                        <Col className="text-truncate" sm={12} as="dt">
                          {camelToTitle(key)}
                        </Col>
                        <Col as="dd" sm={12}>
                          {selectedBuilding.metadata[key]}
                        </Col>
                      </Row>
                    );
                  }
                  return <span key={index}></span>
                })}
              </section>
              </>
            }
          </article>
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  )
}