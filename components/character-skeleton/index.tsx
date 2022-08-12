/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EPISODE_COUNT } from "../../utils/types/episode_count";
import { CHARACTER } from "../../utils/types/character";
import Link from "next/link";
import { displayEpisodes } from "../episodes-skeleton";

// serve single character
export function CharacterSkeleton(props: EPISODE_COUNT) {
  // handle animation
  const [animation] = useAutoAnimate();

  // handle states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [data, setData] = useState<CHARACTER>({
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
      url: "",
    },
    image: "",
    episode: [""],
    url: "",
    created: "",
  });

  const [episodes, setEpisodes] = useState<any[]>([]);
  const [partOfEpisodes, setPartOfEpisodes] = useState<any[]>([]);

  // fetch by page, and update record count
  useEffect(() => {
    if (props.count !== NaN && props.count !== undefined) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${props.count || ""}`)
        .then((Res) => {
          setData(Res.data);
          setPages(Math.ceil(Res.data.episode.length / 20));

          let char: any = [];

          Res.data.episode.forEach((episode: string) => {
            axios
              .get(episode)
              .then((Res2) => {
                char.push({ ...Res2.data });
              })
              .then(() => {
                setEpisodes([...char]);
                setPartOfEpisodes(char.slice(0, 20));
              })
              .catch((error) => {
                console.log(props.count);
              });
          });
        })
        .catch((error) => {
          setData({
            id: 404,
            name: "404",
            status: "404",
            species: "404",
            type: "404",
            gender: "404",
            origin: {
              name: "404",
              url: "404",
            },
            location: {
              name: "404",
              url: "404",
            },
            image: "404",
            episode: ["404"],
            url: "404",
            created: "404",
          });
        });
    }
  }, [props.count]);

  // handle episode pagination
  useEffect(() => {
    let start = (page - 1) * 20;
    let end =
      data.episode.length - (page - 1) * 20 >= 20
        ? (page - 1) * 20 + 20
        : data.episode.length;
    setPartOfEpisodes(episodes.slice(start, end));
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
      <div
        ref={animation as React.RefObject<HTMLDivElement>}
        className="grid h-[65vh] max-height-[65vh] grid-center bg-gray-500"
      >
        <img
          src={data.image}
          alt="Rick & Morty"
          width="100%"
          height="100%"
          className="object-cover w-screen md:w-3/4 h-[65vh] max-height-[65vh] md:mx-auto col-[1] row-[1] max-w-7xl"
        />
      </div>

      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">{`Name: ${data.name}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Status: ${data.status}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Species: ${data.species}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Type: ${data.type}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Gender: ${data.gender}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">
        Origin:{" "}
        <Link href={`/locations/${data.origin.url.split("/").pop()}`}>
          <a className="text-lime-500">{data.origin.name}</a>
        </Link>
      </p>
      <p className="mt-4 text-center text-x md:text-xl">{`Created: ${data.created
        .split("T")
        .shift()}`}</p>
      <div
        ref={animation as React.RefObject<HTMLDivElement>}
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
        {displayEpisodes(partOfEpisodes)}
      </div>
    </>
  );
}
