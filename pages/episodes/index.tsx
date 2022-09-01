import axios from "axios";
import Head from "next/head";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DisplayEpisodesUrl } from "../../components/skeletons/episodes-url";
import { NavBar } from "../../elements/navbar";
import { EPISODE } from "../../utils/types/episode";
import { QUERY_INFO } from "../../utils/types/info";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { EpisodesMain } from "../../components/mains/episodes";

// serve all the episodes with pagination
function Characters() {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <EpisodesMain />
      </QueryClientProvider>
    </>
  );
}

export default Characters;
