// import maplibregl from 'maplibre-gl'
import { useLoaderData, useLocation } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { Offcanvas, Col, Row } from "react-bootstrap";
import { omekaMetadata, omekaImages, shapeFileMetadata } from '~/buildingMetadata';
import MapContext from "~/mapContext";
import { buildings } from "~/data/buildings";
import { camelToTitle } from '~/utils';
import Images from "~/components/Images";
import BuildingLegend from "~/components/BuildingLgend";
import ToggleButton from "~/components/ToggleButton";

export const loader = async ({ params }) => {
  const buildingMetaData = await omekaMetadata();
  return { year: params.year, buildingMetaData, ...buildings[params.year] };
}

export default function Buildings() {
  const { year, source, buildingMetaData, layer } = useLoaderData<typeof loader>();
  const { mapState,  setCurrentYearState, center } = useContext(MapContext);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<number>(1);
  const [selectedBuilding, setSelectedBuilding] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    mapState?.flyTo({
      bearing: 0,
      center,
      pitch: 60,
      zoom: 15
    });
  }, [location, center, mapState]);

  useEffect(() => {
    setCurrentYearState(parseInt(year));

    return () => {
      setCurrentYearState(undefined);
    }
  }, [year, setCurrentYearState]);

  useEffect(() => {
    const layerId = layer.id;
    let clicked = undefined;
    mapState?.addSource(layerId, source);
    mapState?.addLayer(layer);
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

      const omekaBuilding = await buildingMetaData.find(bldg => bldg.bldgID === properties.Identifier);
      if (omekaBuilding) {
        if (omekaBuilding.fileCount > 0 && omekaBuilding.images.length === 0) {
          omekaBuilding.images = await omekaImages(omekaBuilding.omekaID);
        }
        setSelectedBuilding(omekaBuilding);
      } else {
        setSelectedBuilding(shapeFileMetadata(properties));
      }
    }

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
      // mapState?.off('idle', layerId, () => mapState.moveLayer(layerId));
      mapState?.removeLayer(layerId);
      mapState?.removeSource(layerId);
    }
  }, [mapState, source, layer, buildingMetaData, setSelectedBuilding]);

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