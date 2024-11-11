import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Cabbagetown from "~/components/spotlights/Cabbagetown";
import Tour from "~/components/spotlights/Tour";
import { tours } from "~/data/tours";
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { TTourTitle } from "~/types";

const TOURS = Object.keys(tours);

// const loader = async (stuff) => {
//   return { stuff };
// };

export const loader = async ({
  params,
}: LoaderFunctionArgs & { params: { year: string } }) => {
  console.log("🚀 ~ params:", params);
  const spotlight = params.spotlight;
  console.log("🚀 ~ spotlight:", spotlight);
  let tourData = undefined;
  if (spotlight && TOURS.includes(spotlight)) {
    const data = await fetch(tours[spotlight as TTourTitle].url);
    tourData = await data.json();
  }
  return { spotlight, tourData };
};

const SpotlightPage = () => {
  const { spotlight, tourData } = useLoaderData<typeof loader>();
  const [cabbagetownOpen, setCabbagetownOpen] = useState<boolean>(false);

  useEffect(() => {
    setCabbagetownOpen(spotlight === "cabbagetown");
  }, [spotlight]);

  if (cabbagetownOpen) {
    return (
      <Cabbagetown isOpen={cabbagetownOpen} setIsOpen={setCabbagetownOpen} />
    );
  }

  if (tourData) {
    return <Tour tour={spotlight as TTourTitle} tourData={tourData} />;
  }

  return <></>;
};

export default SpotlightPage;
