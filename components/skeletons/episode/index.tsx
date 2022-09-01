/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EPISODE_COUNT } from "../../../utils/types/episode_count";
import { DisplayCharactersUrl } from "../characters-url";
import { banners2 } from "../../../utils/arrays/episode-arrays";
import { useQuery } from "@tanstack/react-query";

// serve single episode
export function EpisodeSkeleton(props: EPISODE_COUNT) {
  // handle animation
  const [animationEpisode] = useAutoAnimate();

  // handle states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [partOfCharacters, setPartOfCharacters] = useState<any[]>([]);

  // fetch episodeData
  const { data, status, error } = useQuery(
    ["episodeData", props.count],
    (): any =>
      axios
        .get(`https://rickandmortyapi.com/api/episode/${props.count}`)
        .then((Res) => {
          setPages(Math.ceil(Res.data.characters.length / 20));
          setPartOfCharacters(Res.data.characters.slice(0, 20));
          return Res.data;
        }),
    { refetchOnWindowFocus: false }
  );

  // handle pagination for characters
  useEffect(() => {
    let start = (page - 1) * 20;
    if (status === "success") {
      let end =
        characters.length - (page - 1) * 20 >= 20
          ? (page - 1) * 20 + 20
          : characters.length;
      setPartOfCharacters(characters.slice(start, end));
    }
  }, [page]);

  if (status === "loading") {
    return (
      <div className="flex justify-center w-full h-full ">
        <h2 className="self-center text-2xl text-center justify-self-center">
          Loading...
        </h2>
      </div>
    );
  }
  if (status === "error") {
    console.log(error);

    return (
      <div className="flex justify-center w-full h-full ">
        <h2 className="self-center text-2xl text-center justify-self-center">
          Error
        </h2>
      </div>
    );
  }

  let { id, name, characters, episode, air_date, created } = data;

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
      <div className="grid h-[50vh] max-height-[50vh] grid-center bg-gray-500">
        <img
          src={`/resources/episodes-imgs/${banners2[id]}`}
          alt="Rick & Morty"
          width="100%"
          height="100%"
          className="object-cover w-screen md:w-3/4 h-[50vh] max-height-[50vh] md:mx-auto col-[1] row-[1] max-w-7xl"
        />
        <div className="bg-lime-500 md:min-w-[100px] col-[1] row-[1] self-center justify-center w-1/5 h-[6vh] md:w-[8vw] md:h-[6vh] mx-auto flex rounded-lg">
          <p className="m-auto text-xl font-bold text-center text-gray-800 text-x md:text-2xl justify-self-center">
            {episode}
          </p>
        </div>
      </div>
      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">{`Episode Name: ${name}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Air Date: ${air_date}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Created: ${created
        .split("T")
        .shift()}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Characters: ${characters.length}`}</p>
      <div
        ref={animationEpisode as React.RefObject<HTMLDivElement>}
        className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl"
      >
        <div className="flex-[100%] flex flex-wrap justify-around">
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
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
        <DisplayCharactersUrl urls={partOfCharacters} />
      </div>
    </>
  );
}
