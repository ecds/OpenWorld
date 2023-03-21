import {
  mapContext_default,
  require_maplibre_gl
} from "/build/_shared/chunk-LJMOFEXV.js";
import {
  useLoaderData
} from "/build/_shared/chunk-FQEOJSC7.js";
import {
  __toESM,
  require_jsx_dev_runtime,
  require_react
} from "/build/_shared/chunk-56THQXCK.js";

// app/routes/buildings.$year.tsx
var import_maplibre_gl = __toESM(require_maplibre_gl());
var import_react2 = __toESM(require_react());

// app/utils.ts
var printProps = (props) => {
  return Object.keys(props).map((prop) => {
    var _a;
    return `<p>${prop}: ${(_a = props[prop]) != null ? _a : "nope"}</p>`;
  }).join("");
};

// app/routes/buildings.$year.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Buildings() {
  const { year, source, layer } = useLoaderData();
  const { mapState, setCurrentYearState } = (0, import_react2.useContext)(mapContext_default);
  (0, import_react2.useEffect)(() => {
    setCurrentYearState(parseInt(year));
    return () => {
      setCurrentYearState(void 0);
    };
  }, [year, setCurrentYearState]);
  (0, import_react2.useEffect)(() => {
    const layerId = layer.id;
    mapState == null ? void 0 : mapState.addSource(layerId, source);
    mapState == null ? void 0 : mapState.addLayer(layer);
    mapState == null ? void 0 : mapState.once("idle", () => {
      console.log("\u{1F680} ~ file: buildings.$year.tsx:31 ~ mapState?.on ~ idle:", "idle");
      if (mapState.getLayer(layerId))
        mapState.moveLayer(layerId);
    });
    mapState == null ? void 0 : mapState.on("click", layerId, ({
      lngLat,
      features
    }) => {
      new import_maplibre_gl.default.Popup().setLngLat(lngLat).setHTML(`<article>${printProps(features[0].properties)}</article>`).addTo(mapState);
    });
    mapState == null ? void 0 : mapState.on("mouseenter", layerId, () => {
      mapState.getCanvas().style.cursor = "pointer";
    });
    mapState == null ? void 0 : mapState.on("mouseleave", layerId, () => {
      mapState.getCanvas().style.cursor = "";
    });
    return () => {
      mapState == null ? void 0 : mapState.removeLayer(layerId);
      mapState == null ? void 0 : mapState.removeSource(layerId);
    };
  }, [mapState, source, layer]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {}, void 0, false, {
    fileName: "app/routes/buildings.$year.tsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
}
export {
  Buildings as default
};
//# sourceMappingURL=/build/routes/buildings.$year-D7TG23QO.js.map
