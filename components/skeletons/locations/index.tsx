/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";

// serve locations boxes
export function DisplayLocations(props: { locations: any }) {
  return props.locations.map((location: any, index: number) => {
    let { id, name, type, dimension, created } = location;
    return (
      <div
        key={`${id} ${index}`}
        className="md:flex-[30%] md:w[30%]  w-full p-3 min-h-[15vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative max-h-[20vh]"
      >
        <p>{`ID: ${id}`}</p>
        <p>{name}</p>
        <p>{`Type: ${type}`}</p>
        <p>{`Dimension: ${dimension}`}</p>
        <p>{`Created: ${created.split("T").shift()}`}</p>
        <div className="absolute top-4 right-4 cursor-pointer z-[80]">
          <Link href={`/locations/${id}`}>
            <MdInfoOutline className="scale-150 rounded-full bg-lime-500" />
          </Link>
        </div>
      </div>
    );
  });
}
