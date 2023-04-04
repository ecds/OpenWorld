import { createContext, useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { SSRProvider } from "react-bootstrap";
import type { Map } from "maplibre-gl";
import MapContext from "./mapContext";
import BaseMap from "./components/BaseMap";
import styles from "../app/styles/app.css"
import MainNav from "./components/MainNav";
import TileLayers from "./components/TileLayers";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});


export function links() {
  return [
    { rel: "stylesheet", href: styles },
  ];
}


export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapState, setMapState] = useState<Map | undefined>(undefined);
  const [currentYearState, setCurrentYearState] = useState<number|undefined>(undefined);
  const centerLng = searchParams.get("centerLng") ?? -84.3891;
  const centerLat = searchParams.get("centerLat") ?? 33.7528;
  const center = [centerLng, centerLat];
  const zoom = parseFloat(searchParams.get("zoom")) ?? 11;
  const pitch = parseFloat(searchParams.get("pitch")) ?? 0;
  const bearing = parseFloat(searchParams.get("bearing")) ?? 0;

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body id="root">
        <SSRProvider>
          <MapContext.Provider
            value={{
              mapState,
              setMapState,
              currentYearState,
              setCurrentYearState,
              center,
              zoom,
              pitch,
              bearing
            }}
          >
            <MainNav />
            <BaseMap />
            <TileLayers />
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </MapContext.Provider>
        </SSRProvider>
      </body>
    </html>
  );
}
