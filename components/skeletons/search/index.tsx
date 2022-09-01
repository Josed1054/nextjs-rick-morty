/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DisplayEpisodesObj } from "../episodes-obj";
import { DisplayLocations } from "../locations";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { DisplayCharactersObj } from "../characters-obj";

// serve search response
export function DisplaySearch(props: { query: string }) {
  // handle searches states and state pagination
  const [animationCharacters] = useAutoAnimate();
  const [animationEpisodes] = useAutoAnimate();
  const [animationLocations] = useAutoAnimate();

  const [charactersPage, setCharactersPage] = useState(1);
  const [hideCharacters, setHideCharacters] = useState(false);
  const [charactersRecords, setCharactersRecords] = useState(20);

  const [episodesPage, setEpisodesPage] = useState(1);
  const [hideEpisodes, setHideEpisodes] = useState(false);
  const [episodesRecords, setEpisodesRecords] = useState(20);

  const [locationsPage, setLocationsPage] = useState(1);
  const [hideLocations, setHideLocations] = useState(false);
  const [locationsRecords, setLocationsRecords] = useState(20);

  // reset states on every prop change
  useEffect(() => {
    setCharactersPage(1);
    setEpisodesPage(1);
    setLocationsPage(1);

    setHideCharacters(false);
    setHideEpisodes(false);
    setHideLocations(false);

    setCharactersRecords(20);
    setEpisodesRecords(20);
    setLocationsRecords(20);
  }, [props.query]);

  // fetch characterData
  const {
    data: characterData,
    status: characterStatus,
    error: characterError,
  } = useQuery(
    ["characterData", props.query, charactersPage],
    (): any =>
      axios
        .get(
          `https://rickandmortyapi.com/api/character/?page=${charactersPage}&name=${
            props.query || ""
          }`
        )
        .then((Res) => {
          setCharactersRecords(
            (charactersPage - 1) * 20 + Res.data.results.length
          );
          return Res.data;
        }),
    { refetchOnWindowFocus: false }
  );

  // fetch episodeData
  const {
    data: episodeData,
    status: episodeStatus,
    error: episodeError,
  } = useQuery(
    ["episodeData", props.query, episodesPage],
    (): any =>
      axios
        .get(
          `https://rickandmortyapi.com/api/episode/?page=${episodesPage}&name=${
            props.query || ""
          }`
        )
        .then((Res) => {
          setEpisodesRecords((episodesPage - 1) * 20 + Res.data.results.length);
          return Res.data;
        }),
    { refetchOnWindowFocus: false }
  );

  // fetch locationData
  const {
    data: locationData,
    status: locationStatus,
    error: locationError,
  } = useQuery(
    ["locationData", props.query, locationsPage],
    (): any =>
      axios
        .get(
          `https://rickandmortyapi.com/api/location/?page=${locationsPage}&name=${
            props.query || ""
          }`
        )
        .then((Res) => {
          setLocationsRecords(
            (locationsPage - 1) * 20 + Res.data.results.length
          );
          return Res.data;
        }),
    { refetchOnWindowFocus: false }
  );

  // handle searches pagination
  function changePage(event: SyntheticEvent) {
    const { name, id } = event.target as HTMLButtonElement;

    if (
      name === "next" &&
      charactersPage < characterData.info.pages &&
      id === "1"
    ) {
      setCharactersPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && charactersPage > 1 && id === "1") {
      setCharactersPage((prevPage) => prevPage - 1);
    } else if (
      name === "next" &&
      episodesPage < episodeData.info.pages &&
      id === "2"
    ) {
      setEpisodesPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && episodesPage > 1 && id === "2") {
      setEpisodesPage((prevPage) => prevPage - 1);
    } else if (
      name === "next" &&
      locationsPage < locationData.info.pages &&
      id === "3"
    ) {
      setLocationsPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && locationsPage > 1 && id === "3") {
      setLocationsPage((prevPage) => prevPage - 1);
    }
  }

  // handle searches visibility
  function hideSearch(event: SyntheticEvent) {
    const { id } = event.target as HTMLButtonElement;

    if (id === "1") {
      setHideCharacters((prevHide) => !prevHide);
    }
    if (id === "2") {
      setHideEpisodes((prevHide) => !prevHide);
    }
    if (id === "3") {
      setHideLocations((prevHide) => !prevHide);
    }
  }

  function DisplayCharacterSearch() {
    if (characterStatus === "loading") {
      return (
        <div className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] max-h-[20vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex">
          <img
            className="w-1/3 my-auto rounded-l-lg max-w-[15vh]"
            src="../../public/resources/episodes-imgs/No_Image.webp"
            alt="loading"
          />
          <div className="w-3/5 m-auto">
            <p>Loading...</p>
          </div>
        </div>
      );
    }
    if (characterStatus === "error") {
      console.log(characterError);
      return (
        <div className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] max-h-[20vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex">
          <img
            className="w-1/3 my-auto rounded-l-lg max-w-[15vh]"
            src="../../public/resources/episodes-imgs/No_Image.webp"
            alt="404"
          />
          <div className="w-3/5 m-auto">
            <p>404</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap my-4 md:justify-between md:gap-4">
        <div className="flex-[100%] flex flex-wrap justify-around">
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
              characterData.info.prev === "" ||
              characterData.info.prev === null ||
              characterData.info.prev === undefined
                ? "invisible"
                : ""
            } ${hideCharacters ? "none" : ""}`}
            name="prev"
            onClick={changePage}
            id="1"
          >
            Back
          </button>
          <p className="self-center w-1/2 text-center text-x md:text-xl">{`Characters ${
            charactersRecords - characterData.results.length + 1
          } - ${charactersRecords}`}</p>
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
              characterData.info.next === "" ||
              characterData.info.next === null ||
              characterData.info.next === undefined
                ? "invisible"
                : ""
            } ${hideCharacters ? "none" : ""}`}
            name="next"
            onClick={changePage}
            id="1"
          >
            Next
          </button>
        </div>
        <DisplayCharactersObj objs={characterData.results} />
      </div>
    );
  }

  function DisplayEpisodeSearch() {
    if (episodeStatus === "loading") {
      return (
        <div className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] max-h-[20vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex">
          <img
            className="w-1/3 my-auto rounded-l-lg max-w-[15vh]"
            src="../../public/resources/episodes-imgs/No_Image.webp"
            alt="loading"
          />
          <div className="w-3/5 m-auto">
            <p>Loading...</p>
          </div>
        </div>
      );
    }
    if (episodeStatus === "error") {
      console.log(episodeError);

      return (
        <div className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] max-h-[20vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex">
          <img
            className="w-1/3 my-auto rounded-l-lg max-w-[15vh]"
            src="../../public/resources/episodes-imgs/No_Image.webp"
            alt="404"
          />
          <div className="w-3/5 m-auto">
            <p>404</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap my-4 md:justify-between md:gap-4">
        <div className="flex-[100%] flex flex-wrap justify-around">
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
              episodeData.info.prev === "" ||
              episodeData.info.prev === null ||
              episodeData.info.prev === undefined
                ? "invisible"
                : ""
            }`}
            name="prev"
            onClick={changePage}
            id="2"
          >
            Back
          </button>
          <p className="self-center w-1/2 text-center text-x md:text-xl">{`Episodes ${
            episodesRecords - episodeData.results.length + 1
          } - ${episodesRecords}`}</p>
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
              episodeData.info.next === "" ||
              episodeData.info.next === null ||
              episodeData.info.next === undefined
                ? "invisible"
                : ""
            }`}
            name="next"
            onClick={changePage}
            id="2"
          >
            Next
          </button>
        </div>
        <DisplayEpisodesObj objs={episodeData.results} />
      </div>
    );
  }

  function DisplayLocationSearch() {
    if (locationStatus === "loading") {
      return (
        <div className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] max-h-[20vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex">
          <img
            className="w-1/3 my-auto rounded-l-lg max-w-[15vh]"
            src="../../public/resources/episodes-imgs/No_Image.webp"
            alt="loading"
          />
          <div className="w-3/5 m-auto">
            <p>Loading...</p>
          </div>
        </div>
      );
    }
    if (locationStatus === "error") {
      console.log(locationError);

      return (
        <div className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] max-h-[20vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex">
          <img
            className="w-1/3 my-auto rounded-l-lg max-w-[15vh]"
            src="../../public/resources/episodes-imgs/No_Image.webp"
            alt="404"
          />
          <div className="w-3/5 m-auto">
            <p>404</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap my-4 md:justify-between md:gap-4">
        <div className="flex-[100%] flex flex-wrap justify-around">
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
              locationData.info.prev === "" ||
              locationData.info.prev === null ||
              locationData.info.prev === undefined
                ? "invisible"
                : ""
            }`}
            name="prev"
            onClick={changePage}
            id="3"
          >
            Back
          </button>
          <p className="self-center w-1/2 text-center text-x md:text-xl">{`Locations ${
            locationsRecords - locationData.results.length + 1
          } - ${locationsRecords}`}</p>
          <button
            type="button"
            className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] ${
              locationData.info.next === "" ||
              locationData.info.next === null ||
              locationData.info.next === undefined
                ? "invisible"
                : ""
            }`}
            name="next"
            onClick={changePage}
            id="3"
          >
            Next
          </button>
        </div>
        <DisplayLocations locations={locationData.results} />
      </div>
    );
  }

  return (
    <>
      <div
        ref={animationCharacters as React.RefObject<HTMLDivElement>}
        className="relative flex flex-col m-auto mt-4 md:w-3/4 md:max-width-3/4 max-w-7xl"
      >
        {hideCharacters ? (
          <MdKeyboardArrowDown
            className="absolute scale-150 cursor-pointer top-1 right-4 material-symbols-outlined"
            onClick={hideSearch}
            id="1"
          />
        ) : (
          <MdKeyboardArrowUp
            className="absolute scale-150 cursor-pointer top-1 right-4 material-symbols-outlined"
            onClick={hideSearch}
            id="1"
          />
        )}
        <p className="self-center w-1/2 text-center text-x md:text-xl">
          Characters Results:
        </p>
        {!hideCharacters && <DisplayCharacterSearch />}
      </div>
      <div
        ref={animationEpisodes as React.RefObject<HTMLDivElement>}
        className="relative flex flex-col m-auto mt-4 md:w-3/4 md:max-width-3/4 max-w-7xl"
      >
        {hideEpisodes ? (
          <MdKeyboardArrowDown
            className="absolute scale-150 cursor-pointer top-1 right-4 material-symbols-outlined"
            onClick={hideSearch}
            id="2"
          />
        ) : (
          <MdKeyboardArrowUp
            className="absolute scale-150 cursor-pointer top-1 right-4 material-symbols-outlined"
            onClick={hideSearch}
            id="2"
          />
        )}
        <p className="self-center w-1/2 text-center text-x md:text-xl">
          Episodes Results:
        </p>
        {!hideEpisodes && <DisplayEpisodeSearch />}
      </div>
      <div
        ref={animationLocations as React.RefObject<HTMLDivElement>}
        className="relative flex flex-col m-auto my-4 md:w-3/4 md:max-width-3/4 max-w-7xl"
      >
        {hideLocations ? (
          <MdKeyboardArrowDown
            className="absolute scale-150 cursor-pointer top-1 right-4 material-symbols-outlined"
            onClick={hideSearch}
            id="3"
          />
        ) : (
          <MdKeyboardArrowUp
            className="absolute scale-150 cursor-pointer top-1 right-4 material-symbols-outlined"
            onClick={hideSearch}
            id="3"
          />
        )}
        <p className="self-center w-1/2 text-center text-x md:text-xl">
          Locations Results:
        </p>
        {!hideLocations && <DisplayLocationSearch />}
      </div>
    </>
  );
}
