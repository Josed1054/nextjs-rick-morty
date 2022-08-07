/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { LOCATION } from "../../utils/types/location";

export function DisplayLocations(props: LOCATION[]) {
  return props.map((location, index) => {
    return (
      <div
        key={`${location.id} ${index}`}
        className="md:flex-[30%] md:w[30%]  w-full p-3 min-h-[15vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative"
      >
        <p>{`ID: ${location.id}`}</p>
        <p>{location.name}</p>
        <p>{`Type: ${location.type}`}</p>
        <p>{`Dimension: ${location.dimension}`}</p>
        <p>{`Created: ${location.created.split("T").shift()}`}</p>
        <div className="absolute top-4 right-4 cursor-pointer z-[80]">
          <Link href={`/locations/${location.id}`}>
            <span className="rounded-full material-symbols-outlined bg-lime-500">
              info
            </span>
          </Link>
        </div>
      </div>
    );
  });
}