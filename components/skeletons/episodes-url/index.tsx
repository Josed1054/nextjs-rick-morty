/* eslint-disable @next/next/no-img-element */
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";
import { banners2 } from "../../../utils/arrays/episode-arrays";

// server episodes boxes
export function DisplayEpisodesUrl(props: { urls: string[] }) {
  const queryMultiple: any = useQueries({
    queries: props.urls.map((url: string) => {
      return {
        queryKey: [url],
        queryFn: () => axios.get(url).then((Res) => Res.data),
      };
    }),
  });

  return queryMultiple.map((episodeData: any, index: number) => {
    if (episodeData.status === "loading") {
      return (
        <div
          key={index}
          className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex max-h-[27vh]"
        >
          <h2 className="self-center text-2xl text-center justify-self-center">
            Loading...
          </h2>
        </div>
      );
    }
    if (episodeData.status === "error") {
      console.log(episodeData.error);

      return (
        <div
          key={index}
          className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex max-h-[27vh]"
        >
          <h2 className="self-center text-2xl text-center justify-self-center">
            Error
          </h2>
        </div>
      );
    }

    let { id, name, episode, air_date, created } = episodeData.data;
    return (
      <div
        key={`${id} ${index}`}
        className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex max-h-[27vh]"
      >
        <img
          className="w-1/4 my-auto rounded-l-lg"
          src={`/resources/episodes-imgs/${banners2[id]}`}
          alt={name}
        />
        <div className="w-3/5 m-auto">
          <p>{`ID: ${id}`}</p>
          <p>{name}</p>
          <p>{`Episode: ${episode}`}</p>
          <p>{`Air Date: ${air_date}`}</p>
          <p>{`Created: ${created.split("T").shift()}`}</p>
          <div className="absolute top-4 right-4 cursor-pointer z-[80]">
            <Link href={`/episodes/${id}`}>
              <MdInfoOutline className="scale-150 rounded-full bg-lime-500" />
            </Link>
          </div>
        </div>
      </div>
    );
  });
}
