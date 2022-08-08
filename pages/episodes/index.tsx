import axios from "axios";
import Head from "next/head";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { displayEpisodes } from "../../components/episodes-skeleton";
import { NavBar } from "../../components/navbar";
import { EPISODE } from "../../utils/types/episode";
import { QUERY_INFO } from "../../utils/types/info";

// serve all the episodes with pagination
function Characters() {
  // handle animation
  const [animation] = useAutoAnimate();

  // handle states
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(20);
  const [info, setInfo] = useState<QUERY_INFO>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });
  const [data, setData] = useState<EPISODE[]>([]);

  // fetch by page, and update record count
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then((Res) => {
        setInfo(Res.data.info);
        setData(Res.data.results);
        setRecords((page - 1) * 20 + Res.data.results.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // handle pagination
  function changePage(event: SyntheticEvent) {
    const { name } = event.target as HTMLButtonElement;

    if (name === "next" && page < info.pages) {
      setPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  // render buttons for pagination and results
  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <div
        ref={animation as React.RefObject<HTMLDivElement>}
        className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl"
      >
        <div className="flex-[100%] flex flex-wrap justify-around">
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg p-2 ${
              info.prev === "" || info.prev === null || info.prev === undefined
                ? "invisible"
                : ""
            }`}
            name="prev"
            onClick={changePage}
          >
            Back
          </button>
          <p className="self-center w-1/2 text-xl text-center">{`Episodes ${
            records - data.length + 1
          } - ${records}`}</p>
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg p-2 ${
              info.prev === "" || info.next === null || info.prev === undefined
                ? "invisible"
                : ""
            }`}
            name="next"
            onClick={changePage}
          >
            Next
          </button>
        </div>

        {displayEpisodes(data)}
      </div>
    </>
  );
}

export default Characters;
