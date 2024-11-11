import { useEffect, useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useSearchParams,
  useParams,
} from "@remix-run/react";
import styles from "./index.css?url";
import Navbar from "./components/layout/Navbar";
import Loading from "./components/layout/Loading";
import RouteError from "./components/errorResponses/RouteError";
import CodeError from "./components/errorResponses/CodeError";
import { MapContext } from "./contexts";
import { ClientOnly } from "remix-utils/client-only";
import Map from "./components/mapping/Map.client";
// import { topBarHeight } from "./config";
// https://stackoverflow.com/a/59429852/1792144
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import type { Map as TMap } from "maplibre-gl";
import LayerControl from "./components/mapping/LayerControl";
import AboutModal from "./components/AboutModal";
import TutorialModal from "./components/TutorialModal";

const topBarHeight = "6rem";

export const meta: MetaFunction = () => {
  return [{ title: "OpenWorld Atlanta" }];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/images/logo192.png", type: "image/png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { year } = useParams();
  const [searchParams] = useSearchParams();
  const [map, setMap] = useState<TMap>();
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<number | undefined>(undefined);
  const [zoom, setZoom] = useState<string | number>(
    searchParams.get("zoom") ?? 11.0
  );
  const [pitch, setPitch] = useState<string | number>(
    searchParams.get("pitch") ?? 0.0
  );
  const [bearing, setBearing] = useState<string | number>(
    searchParams.get("bearing") ?? 0.0
  );

  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);
  const [tutorialModalOpen, setTutorialModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (year) setCurrentYear(parseInt(year));
  }, [year]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-inter bg-white h-screen overflow-hidden">
        <a href="#main" className="sr-only">
          skip to main content
        </a>
        <Navbar
          setAboutModalOpen={setAboutModalOpen}
          setTutorialModalOpen={setTutorialModalOpen}
        />
        <MapContext.Provider
          value={{
            map,
            setMap,
            mapLoaded,
            setMapLoaded,
            currentYear,
            setCurrentYear,
            zoom,
            pitch,
            bearing,
            setZoom,
            setBearing,
            setPitch,
          }}
        >
          <main
            className={`mx-auto relative mt-11 bg-white overflow-hidden`}
            id="main"
          >
            <div
              className={`flex flex-row overflow-hidden h-[calc(100vh-${topBarHeight})]`}
            >
              <div className="hidden md:block flex-grow">
                <ClientOnly>
                  {() => (
                    <Map>
                      <LayerControl />
                    </Map>
                  )}
                </ClientOnly>
              </div>
            </div>
            {children}
            <AboutModal isOpen={aboutModalOpen} setIsOpen={setAboutModalOpen} />
            <TutorialModal
              isOpen={tutorialModalOpen}
              setIsOpen={setTutorialModalOpen}
            />
          </main>
        </MapContext.Provider>
        <Loading />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <RouteError error={error} />;
  } else if (error instanceof Error) {
    return <CodeError error={error} />;
  } else {
    return <h1>Unknown Error</h1>;
  }
}
