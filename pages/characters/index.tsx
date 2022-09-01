/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Head from "next/head";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NavBar } from "../../elements/navbar";
import { CHARACTER } from "../../utils/types/character";
import { QUERY_INFO } from "../../utils/types/info";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { CharactersMain } from "../../components/mains/characters";

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
        <CharactersMain />
      </QueryClientProvider>
    </>
  );
}

export default Characters;
