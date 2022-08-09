/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";
import { banners2 } from "../../utils/arrays/episode-arrays";
import { EPISODE } from "../../utils/types/episode";

// server episodes boxes
export function displayEpisodes(props: EPISODE[]) {
  return props.map((episode, index) => {
    return (
      <div
        key={`${episode.id} ${index}`}
        className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex"
      >
        <img
          className="w-1/3 my-auto rounded-l-lg"
          src={`/resources/episodes-imgs/${banners2[episode.id]}`}
          alt={episode.name}
        />
        <div className="w-3/5 m-auto">
          <p>{`ID: ${episode.id}`}</p>
          <p>{episode.name}</p>
          <p>{`Episode: ${episode.episode}`}</p>
          <p>{`Air Date: ${episode.air_date}`}</p>
          <p>{`Created: ${episode.created.split("T").shift()}`}</p>
          <div className="absolute top-4 right-4 cursor-pointer z-[80]">
            <Link href={`/episodes/${episode.id}`}>
              <MdInfoOutline className="scale-150 rounded-full bg-lime-500" />
            </Link>
          </div>
        </div>
      </div>
    );
  });
}
