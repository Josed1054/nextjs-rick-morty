/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EPISODE_COUNT } from "../../utils/types/episode_count";
import { EPISODE } from "../../utils/types/episode";
import { displayCharacters } from "../characters-skeleton";
import { banners2 } from "../../utils/arrays/episode-arrays";

// serve single episode
export function EpisodeSkeleton(props: EPISODE_COUNT) {
  // handle animation
  const [animation] = useAutoAnimate();

  // handle states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [data, setData] = useState<EPISODE>({
    id: 0,
    banner: "",
    name: "",
    air_date: "",
    episode: "",
    characters: [""],
    url: "",
    created: "",
  });

  const [characters, setCharacters] = useState<any[]>([]);
  const [partOfCharacters, setPartOfCharacters] = useState<any[]>([]);

  // fetch data
  useEffect(() => {
    if (props.count !== NaN && props.count !== undefined) {
      axios
        .get(`https://rickandmortyapi.com/api/episode/${props.count || ""}`)
        .then((Res) => {
          setData(Res.data);
          setPages(Math.ceil(Res.data.characters.length / 20));

          let char: any = [];

          Res.data.characters.forEach((character: string) => {
            axios
              .get(character)
              .then((Res2) => {
                char.push(Res2.data);
              })
              .then(() => {
                setCharacters([...char]);
                setPartOfCharacters(char.slice(0, 20));
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          setData({
            id: 0,
            banner: "0",
            name: "404",
            air_date: "404",
            episode: "404",
            characters: ["404"],
            url: "404",
            created: "404",
          });
          console.log(error);
        });
    }
  }, [props.count]);

  // handle pagination for characters
  useEffect(() => {
    let start = (page - 1) * 20;
    let end =
      data.characters.length - (page - 1) * 20 >= 20
        ? (page - 1) * 20 + 20
        : data.characters.length;
    setPartOfCharacters(characters.slice(start, end));
  }, [page]);

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
          src={`/resources/episodes-imgs/${banners2[data.id]}`}
          alt="Rick & Morty"
          width="100%"
          height="100%"
          className="object-cover w-screen md:w-3/4 h-[50vh] max-height-[50vh] md:mx-auto col-[1] row-[1] max-w-7xl"
        />
        <div className="bg-lime-500 col-[1] row-[1] self-center justify-center w-1/5 h-[6vh] md:w-[8vw] md:h-[6vh] mx-auto flex rounded-lg">
          <p className="m-auto font-bold text-center text-gray-800 text-x md:text-xl md:text-2xl justify-self-center">
            {data.episode}
          </p>
        </div>
      </div>

      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">{`Episode Name: ${data.name}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Air Date: ${data.air_date}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Created: ${data.created
        .split("T")
        .shift()}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Characters: ${data.characters.length}`}</p>
      <div
        ref={animation as React.RefObject<HTMLDivElement>}
        className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl"
      >
        <div className="flex-[100%] flex flex-wrap justify-around">
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] md:w-[7vw] max-h-[4.5vh] ${
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
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] md:w-[7vw] max-h-[4.5vh] ${
              page < pages ? "" : "invisible"
            }`}
            name="next"
            onClick={changePage}
          >
            Next
          </button>
        </div>
        {displayCharacters(partOfCharacters)}
      </div>
    </>
  );
}
