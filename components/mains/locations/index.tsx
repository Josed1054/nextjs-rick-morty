import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { DisplayLocations } from "../../skeletons/locations";

export function LocationsMain() {
  // handle animation
  const [animationLocations] = useAutoAnimate();

  // handle states
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(20);

  // fetch by page, and update record count
  const {
    data,
    status: fetchStatus,
    error,
  } = useQuery(
    ["data", page],
    (): any =>
      axios
        .get(`https://rickandmortyapi.com/api/location/?page=${page}`)
        .then((Res) => {
          setRecords((page - 1) * 20 + Res.data.results.length);
          return Res.data;
        }),
    { refetchOnWindowFocus: false }
  );

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

  let { next, prev, pages } = data.info;

  // handle pagination
  function changePage(event: SyntheticEvent) {
    const { name } = event.target as HTMLButtonElement;

    if (name === "next" && page < pages) {
      setPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  // render buttons for pagination and results
  return (
    <div
      ref={animationLocations as React.RefObject<HTMLDivElement>}
      className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl"
    >
      <div className="flex-[100%] flex flex-wrap justify-around">
        <button
          type="button"
          className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
            prev === "" || prev === null || prev === undefined
              ? "invisible"
              : ""
          }`}
          name="prev"
          onClick={changePage}
        >
          Back
        </button>
        <p className="self-center w-1/2 text-xl text-center">{`Locations ${
          records - data.results.length + 1
        } - ${records}`}</p>
        <button
          type="button"
          className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
            next === "" || next === null || next === undefined
              ? "invisible"
              : ""
          }`}
          name="next"
          onClick={changePage}
        >
          Next
        </button>
      </div>
      <DisplayLocations locations={data.results} />
    </div>
  );
}
