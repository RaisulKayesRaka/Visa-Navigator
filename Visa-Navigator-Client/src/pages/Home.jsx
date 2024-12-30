import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import LatestVisas from "../components/LatestVisas";
import WhatWeOffer from "../components/WhatWeOffer";
import WorkingProcess from "../components/WorkingProcess";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Visa Navigator</title>
      </Helmet>
      <Banner />
      <LatestVisas />
      <hr />
      <WhatWeOffer />
      <hr />
      <WorkingProcess />
    </>
  );
}
