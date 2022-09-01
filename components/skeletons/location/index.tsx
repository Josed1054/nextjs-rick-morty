/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DisplayCharactersUrl } from "../characters-url";
import { useQuery } from "@tanstack/react-query";

// serve single location
export function LocationSkeleton(props: { count: number }) {
  // handle animation
  const [animation] = useAutoAnimate();

  // handle states
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [partOfCharacters, setPartOfCharacters] = useState<any[]>([]);

  const { data, status, error } = useQuery(
    ["data", props.count],
    (): any =>
      axios
        .get(`https://rickandmortyapi.com/api/location/${props.count}`)
        .then((Res) => {
          setPages(Math.ceil(Res.data.residents.length / 20));
          setPartOfCharacters(Res.data.residents.slice(0, 20));
          return Res.data;
        }),
    { refetchOnWindowFocus: false }
  );

  // handle pagination for residents
  useEffect(() => {
    if (status === "success") {
      let start = (page - 1) * 20;
      let end =
        residents.length - (page - 1) * 20 >= 20
          ? (page - 1) * 20 + 20
          : residents.length;
      setPartOfCharacters(residents.slice(start, end));
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

  // handle change pagination
  function changePage(event: SyntheticEvent) {
    const { name } = event.target as HTMLButtonElement;

    if (name === "next" && page < pages) {
      setPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  let { id, name, type, dimension, created, residents } = data;

  return (
    <>
      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">{`ID: ${id}`}</p>
      <p className="py-4 mt-4 text-center text-x md:text-xl text-bold bg-lime-500">{`Name: ${name}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Type: ${type}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Dimension: ${dimension}`}</p>
      <p className="mt-4 text-center text-x md:text-xl">{`Created: ${created
        .split("T")
        .shift()}`}</p>
      <div
        ref={animation as React.RefObject<HTMLDivElement>}
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
