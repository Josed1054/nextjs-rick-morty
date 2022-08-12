/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CHARACTER } from "../../utils/types/character";
import { EPISODE } from "../../utils/types/episode";
import { QUERY_INFO } from "../../utils/types/info";
import { LOCATION } from "../../utils/types/location";
import { displayCharacters } from "../characters-skeleton";
import { displayEpisodes } from "../episodes-skeleton";
import { DisplayLocations } from "../locations-skeleton";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

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

  const [charactersInfo, setCharactersInfo] = useState<QUERY_INFO>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });
  const [characters, setCharacters] = useState<CHARACTER[]>([
    {
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
    },
  ]);
  const [episodesInfo, setEpisodesInfo] = useState<QUERY_INFO>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });
  const [episodes, setEpisodes] = useState<EPISODE[]>([
    {
      id: 0,
      banner: "",
      name: "",
      air_date: "",
      episode: "",
      characters: [""],
      url: "",
      created: "",
    },
  ]);
  const [locationsInfo, setLocationsInfo] = useState<QUERY_INFO>({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  });
  const [locations, setLocations] = useState<LOCATION[]>([
    {
      id: 0,
      name: "",
      type: "",
      dimension: "",
      residents: [""],
      url: "",
      created: "",
    },
  ]);

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

  // fecth on every page and prop change
  useEffect(() => {
    if (
      props.query !== null &&
      props.query !== undefined &&
      props.query !== "undefined"
    ) {
      axios
        .get(
          `https://rickandmortyapi.com/api/character/?page=${charactersPage}&name=${
            props.query || ""
          }`
        )
        .then((Res) => {
          setCharactersInfo(Res.data.info);
          setCharacters(Res.data.results);
          setCharactersRecords(
            (charactersPage - 1) * 20 + Res.data.results.length
          );
        })
        .catch((error) => {
          setCharacters([
            {
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
            },
          ]);
          setCharactersRecords(0);

          console.log(error);
        });
    }
  }, [charactersPage, props.query]);

  useEffect(() => {
    if (
      props.query !== null &&
      props.query !== undefined &&
      props.query !== "undefined"
    ) {
      axios
        .get(
          `https://rickandmortyapi.com/api/episode/?page=${episodesPage}&name=${
            props.query || ""
          }`
        )
        .then((Res) => {
          setEpisodesInfo(Res.data.info);
          setEpisodes(Res.data.results);
          setEpisodesRecords((episodesPage - 1) * 20 + Res.data.results.length);
        })
        .catch((error) => {
          setEpisodes([
            {
              id: 0,
              banner: "0",
              name: "404",
              air_date: "404",
              episode: "404",
              characters: ["404"],
              url: "404",
              created: "404",
            },
          ]);
          setEpisodesRecords(0);
          console.log(error);
        });
    }
  }, [episodesPage, props.query]);

  useEffect(() => {
    if (
      props.query !== null &&
      props.query !== undefined &&
      props.query !== "undefined"
    ) {
      axios
        .get(
          `https://rickandmortyapi.com/api/location/?page=${locationsPage}&name=${
            props.query || ""
          }`
        )
        .then((Res) => {
          setLocationsInfo(Res.data.info);
          setLocations(Res.data.results);
          setLocationsRecords(
            (locationsPage - 1) * 20 + Res.data.results.length
          );
        })
        .catch((error) => {
          setLocations([
            {
              id: 404,
              name: "404",
              type: "404",
              dimension: "404",
              residents: ["404"],
              url: "404",
              created: "404",
            },
          ]);
          setLocationsRecords(0);
          console.log(error);
        });
    }
  }, [locationsPage, props.query]);

  // handle searches pagination
  function changePage(event: SyntheticEvent) {
    const { name, id } = event.target as HTMLButtonElement;

    if (
      name === "next" &&
      charactersPage < charactersInfo.pages &&
      id === "1"
    ) {
      setCharactersPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && charactersPage > 1 && id === "1") {
      setCharactersPage((prevPage) => prevPage - 1);
    } else if (
      name === "next" &&
      episodesPage < episodesInfo.pages &&
      id === "2"
    ) {
      setEpisodesPage((prevPage) => prevPage + 1);
    } else if (name === "prev" && episodesPage > 1 && id === "2") {
      setEpisodesPage((prevPage) => prevPage - 1);
    } else if (
      name === "next" &&
      locationsPage < locationsInfo.pages &&
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
        {!hideCharacters && (
          <div className="flex flex-wrap my-4 md:justify-between md:gap-4">
            <div className="flex-[100%] flex flex-wrap justify-around">
              <button
                type="button"
                className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
                  charactersInfo.prev === "" ||
                  charactersInfo.prev === null ||
                  charactersInfo.prev === undefined
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
                charactersRecords - characters.length + 1
              } - ${charactersRecords}`}</p>
              <button
                type="button"
                className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
                  charactersInfo.next === "" ||
                  charactersInfo.next === null ||
                  charactersInfo.next === undefined
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
            {displayCharacters(characters)}
          </div>
        )}
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
        {!hideEpisodes && (
          <div className="flex flex-wrap my-4 md:justify-between md:gap-4">
            <div className="flex-[100%] flex flex-wrap justify-around">
              <button
                type="button"
                className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
                  episodesInfo.prev === "" ||
                  episodesInfo.prev === null ||
                  episodesInfo.prev === undefined
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
                episodesRecords - episodes.length + 1
              } - ${episodesRecords}`}</p>
              <button
                type="button"
                className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
                  episodesInfo.next === "" ||
                  episodesInfo.next === null ||
                  episodesInfo.next === undefined
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
            {displayEpisodes(episodes)}
          </div>
        )}
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
        {!hideLocations && (
          <div className="flex flex-wrap my-4 md:justify-between md:gap-4">
            <div className="flex-[100%] flex flex-wrap justify-around">
              <button
                type="button"
                className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] max-h-[4vh] ${
                  locationsInfo.prev === "" ||
                  locationsInfo.prev === null ||
                  locationsInfo.prev === undefined
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
                locationsRecords - locations.length + 1
              } - ${locationsRecords}`}</p>
              <button
                type="button"
                className={`border-solid border-2 border-lime-500 rounded-lg w-[15vw] max-w-[76px] md:w-[7vw] ${
                  locationsInfo.next === "" ||
                  locationsInfo.next === null ||
                  locationsInfo.next === undefined
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
            {DisplayLocations(locations)}
          </div>
        )}
      </div>
    </>
  );
}
