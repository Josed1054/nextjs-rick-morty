/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EPISODE_COUNT } from "../../../utils/types/episode_count";
import Link from "next/link";
import { DisplayEpisodesUrl } from "../episodes-url";
import { useQuery } from "@tanstack/react-query";

// serve single character
export function CharacterSkeleton(props: EPISODE_COUNT) {
  // handle animation
  const [animationCharacter] = useAutoAnimate();

  // handle states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [partOfEpisodes, setPartOfEpisodes] = useState<any[]>([]);

  const {
    data,
    status: fetchStatus,
    error,
  } = useQuery(
    ["data", props.count],
    (): any =>
      axios
        .get(`https://rickandmortyapi.com/api/character/${props.count}`)
        .then((Res) => {
          setPages(Math.ceil(Res.data.episode.length / 20));
          setPartOfEpisodes(Res.data.episode.slice(0, 20));
          return Res.data;
        }),
    { refetchOnWindowFocus: false }
  );

  // handle episode pagination
  useEffect(() => {
    if (fetchStatus === "success") {
      let start = (page - 1) * 20;
      let end =
        data.episode.length - (page - 1) * 20 >= 20
          ? (page - 1) * 20 + 20
          : episode.length;
      setPartOfEpisodes(episode.slice(start, end));
    }
  }, [page]);

  if (fetchStatus === "loading") {
    return (
      <div className="flex justify-center w-full h-full ">
        <h2 className="self-center text-2xl text-center justify-self-center">
          Loading...
        </h2>
      </div>
    );
  }
  if (fetchStatus === "error") {
    console.log(error);

    return (
      <div className="flex justify-center w-full h-full ">
        <h2 className="self-center text-2xl text-center justify-self-center">
          Error
        </h2>
      </div>
    );
  }

  let {
    id,
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode,
    created,
  } = data;

  // handle change pagination
  function changePage(event: SyntheticEvent) {
    const { name } = event.target as HTMLButtonElement;

    if (name === "next" && page < pages) {
      setPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  return (
    <>
      <div className="grid h-[65vh] max-height-[65vh] grid-center bg-gray-500">
        <img
          src={image}
          alt="Rick & Morty"
          width="100%"
          height="100%"
          className="object-cover w-screen md:w-3/4 h-[65vh] max-height-[65vh] md:mx-auto col-[1] row-[1] max-w-7xl"
        />
      </div>
      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">
        Name: {name}
      </p>
      <p className="mt-4 text-center text-x md:text-xl">ID: {id}</p>
      <p className="mt-4 text-center text-x md:text-xl">Status: {status}</p>
      <p className="mt-4 text-center text-x md:text-xl">Species: {species}</p>
      <p className="mt-4 text-center text-x md:text-xl">Type: {type}</p>
      <p className="mt-4 text-center text-x md:text-xl">Gender: {gender}</p>
      <p className="mt-4 text-center text-x md:text-xl">
        Location: {location.name}
      </p>
      <p className="mt-4 text-center text-x md:text-xl">
        Origin:{" "}
        <Link href={`/locations/${origin.url.split("/").pop()}`}>
          <a className="text-lime-500">{origin.name}</a>
        </Link>
      </p>
      <p className="mt-4 text-center text-x md:text-xl">{`Created: ${created
        .split("T")
        .shift()}`}</p>
      <div
        ref={animationCharacter as React.RefObject<HTMLDivElement>}
        className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl"
      >
        <div className="flex-[100%] flex flex-wrap justify-around">
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg  max-h-[4.5vh] w-[15vw] md:w-[7vw] ${
              page > 1 ? "" : "invisible"
            }`}
            name="prev"
            onClick={changePage}
          >
            Back
          </button>
          <p className="self-center w-1/2 text-xl text-center">{`Page ${page} - ${pages}`}</p>
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
              page < pages ? "" : "invisible"
            }`}
            name="next"
            onClick={changePage}
          >
            Next
          </button>
        </div>
        <DisplayEpisodesUrl urls={partOfEpisodes} />
      </div>
    </>
  );
}
