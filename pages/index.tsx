import type { NextPage } from "next";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CHARACTERS } from "../utils/types/characters";
import autoAnimate from "@formkit/auto-animate";
import { NavBar } from "../components/navbar";
import Head from "next/head";
import { EpisodeSkeleton } from "../components/episode-skeleton";

const Home: NextPage = () => {
  const parentAnimation = useRef(null);

  useEffect(() => {
    parentAnimation.current && autoAnimate(parentAnimation.current);
  }, [parentAnimation]);

  const [episodesData, setEpisodesData] = useState(1);

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
      <div ref={parentAnimation}>
        <NavBar />
        <EpisodeSkeleton count={episodesData} />
      </div>
    </>
  );
};

export default Home;
