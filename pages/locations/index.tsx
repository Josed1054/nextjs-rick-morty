import axios from "axios";
import Head from "next/head";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DisplayLocations } from "../../components/skeletons/locations";
import { NavBar } from "../../elements/navbar";
import { QUERY_INFO } from "../../utils/types/info";
import { LOCATION } from "../../utils/types/location";
import { LocationsMain } from "../../components/mains/locations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// serve all the locations with pagination
function Locations() {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <LocationsMain />
      </QueryClientProvider>
    </>
  );
}

export default Locations;
