import type { NextPage } from "next";
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Head from "next/head";
import { NavBar } from "../elements/navbar";
import { EpisodeSkeleton } from "../components/skeletons/episode";

const queryClient = new QueryClient();

function Home() {
  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <div>
        <NavBar />
        <QueryClientProvider client={queryClient}>
          <MainPage />
        </QueryClientProvider>
      </div>
    </>
  );
}

// server the main page
function MainPage() {
  const { status, data: episodeNumber } = useQuery(["episodeNumber"], () =>
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((Res) => Res.data.info.count)
  );

  const [episodesData, setEpisodesData] = useState(0);

  // get the latest episode ID
  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((Res) => {
        setEpisodesData(Res.data.info.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }
  if (status === "error") {
    return <h2>error</h2>;
  }

  return <EpisodeSkeleton count={episodeNumber} />;
}

export default Home;
