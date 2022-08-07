/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { EPISODE_COUNT } from "../../utils/types/episode_count";
import { CHARACTER } from "../../utils/types/character";
import { banners2 } from "../../utils/arrays/episode-arrays";
import Link from "next/link";
import { displayEpisodes } from "../episodes-skeleton";

export function CharacterSkeleton(props: EPISODE_COUNT) {
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

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${props.count}`)
      .then((Res) => {
        setData(Res.data);
        setPages(Math.ceil(Res.data.episode.length / 20));

        let char: any = [];

        Res.data.episode.forEach((episode: string) => {
          axios
            .get(episode)
            .then((Res2) => {
              let bannerImage = "";
              banners2.forEach((banner, index) => {
                if (index + 1 === Res.data.id) {
                  return (bannerImage = banner);
                }
              });
              char.push({ ...Res2.data, image: bannerImage });
            })
            .then(() => {
              setEpisodes([...char]);
              setPartOfEpisodes(char.slice(0, 20));
            })
            .catch((error) => {
              console.log(props.count);

              if (props.count !== NaN) {
                console.log(error);
              }
            });
        });
      })
      .catch((error) => {
        if (props.count !== NaN) {
          console.log(error);
        }
      });
  }, [props.count]);

  useEffect(() => {
    let start = (page - 1) * 20;
    let end =
      data.episode.length - (page - 1) * 20 >= 20
        ? (page - 1) * 20 + 20
        : data.episode.length;
    setPartOfEpisodes(episodes.slice(start, end));
  }, [page]);

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
      <div className="grid h-[82vh] max-height-[82vh] grid-center bg-gray-500">
        <img
          src={data.image}
          alt="Rick & Morty"
          width="100%"
          height="100%"
          className="object-cover w-screen md:w-3/4 h-[82vh] max-height-[82vh] md:mx-auto col-[1] row-[1] max-w-7xl"
        />
      </div>

      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">{`Name: ${
        data.name === "" ? "404" : data.name
      }`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Status: ${
        data.status === "" ? "404" : data.status
      }`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Species: ${
        data.species === "" ? "404" : data.species
      }`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Type: ${
        data.type === "" ? "404" : data.type
      }`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Gender: ${
        data.gender === "" ? "404" : data.gender
      }`}</p>
      <p className="mt-4 text-center text-x md:text-xl">
        {" "}
        Origin:
        <Link href={data.origin.url}>
          {data.origin.name === "" ? "404" : data.origin.name}
        </Link>
      </p>
      <p className="mt-4 text-center text-x md:text-xl">{`Created: ${
        data.created === "" ? "404" : data.created.split("T").shift()
      }`}</p>
      <div className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl">
        <div className="flex-[100%] flex flex-wrap justify-around">
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg p-2 ${
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
            className={`border-solid border-2 border-lime-500 rounded-lg p-2 ${
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
