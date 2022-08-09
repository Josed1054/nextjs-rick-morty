import type { NextPage } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavBar } from "../components/navbar";
import Head from "next/head";
import { EpisodeSkeleton } from "../components/episode-skeleton";

// server the main page
const Home: NextPage = () => {
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

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <div>
        <NavBar />
        <EpisodeSkeleton count={episodesData} />
      </div>
    </>
  );
};

export default Home;
