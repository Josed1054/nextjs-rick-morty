/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EPISODE_COUNT } from "../../utils/types/episode_count";
import { displayCharacters } from "../characters-skeleton";
import { LOCATION } from "../../utils/types/location";

// serve single location
export function LocationSkeleton(props: EPISODE_COUNT) {
  // handle animation
  const [animation] = useAutoAnimate();

  // handle states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [data, setData] = useState<LOCATION>({
    id: 0,
    name: "",
    type: "",
    dimension: "",
    residents: [""],
    url: "",
    created: "",
  });

  const [characters, setCharacters] = useState<any[]>([]);
  const [partOfCharacters, setPartOfCharacters] = useState<any[]>([]);

  // fetch data
  useEffect(() => {
    if (props.count !== NaN && props.count !== undefined) {
      axios
        .get(`https://rickandmortyapi.com/api/location/${props.count || ""}`)
        .then((Res) => {
          setData(Res.data);
          setPages(Math.ceil(Res.data.residents.length / 20));

          let char: any = [];

          Res.data.residents.forEach((character: string) => {
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
            id: 404,
            name: "404",
            type: "404",
            dimension: "404",
            residents: ["404"],
            url: "404",
            created: "404",
          });
          console.log(error);
        });
    }
  }, [props.count]);

  // handle pagination for residents
  useEffect(() => {
    let start = (page - 1) * 20;
    let end =
      data.residents.length - (page - 1) * 20 >= 20
        ? (page - 1) * 20 + 20
        : data.residents.length;
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
      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">{`ID: ${data.id}`}</p>
      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">{`Name: ${data.name}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Type: ${data.type}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Dimension: ${data.dimension}`}</p>
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
            className={`border-solid border-2 border-lime-500 rounded-lg p-2 max-h-[4.5vh] ${
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
            className={`border-solid border-2 border-lime-500 rounded-lg p-2 max-h-[4.5vh] ${
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
