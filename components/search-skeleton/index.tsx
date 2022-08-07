/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useState } from "react";
import { CHARACTER } from "../../utils/types/character";
import { EPISODE } from "../../utils/types/episode";
import { LOCATION } from "../../utils/types/location";
import { displayCharacters } from "../characters-skeleton";
import { displayEpisodes } from "../episodes-skeleton";
import { DisplayLocations } from "../locations-skeleton";

export function DisplaySearch(props: { count: number }) {
  const [character, setCharacter] = useState<CHARACTER[]>([
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
  const [episode, setEpisode] = useState<EPISODE[]>([
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
  const [location, setLocation] = useState<LOCATION[]>([
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
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${props.count}`)
      .then((Res) => {
        setCharacter([Res.data]);
      });
    axios
      .get(`https://rickandmortyapi.com/api/episode/${props.count}`)
      .then((Res) => {
        setEpisode([Res.data]);
      });
    axios
      .get(`https://rickandmortyapi.com/api/location/${props.count}`)
      .then((Res) => {
        setLocation([Res.data]);
      });
  }, [props.count]);

  return (
    <>
      <div className="flex flex-wrap mx-auto my-4 md:w-3/4 md:max-width-3/4 md:justify-between md:gap-4 max-w-7xl">
        <div className="w-full md:flex-[40%] md:w[50%] md:max-w-[49%] p-3 bg-gray-300 rounded-lg">
          <p className="pb-4">Character:</p>
          {displayCharacters(character)}
        </div>
        <div className="w-full md:flex-[40%] md:w[50%] md:max-w-[49%] p-3 bg-gray-300 rounded-lg">
          <p className="pb-4">Episode:</p>
          {displayEpisodes(episode)}
        </div>
        <div className="w-full md:flex-[40%] md:w[50%] md:max-w-[49%] p-3 bg-gray-300 rounded-lg">
          <p className="pb-4">Location:</p>
          {DisplayLocations(location)}
        </div>
      </div>
    </>
  );
}
