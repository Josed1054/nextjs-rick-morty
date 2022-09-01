/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";

// server characters boxes
export function DisplayCharactersObj(props: { objs: any }) {
  function charactersDiv() {
    return props.objs.map((character: any, index: any) => {
      let { id, name, image, species, created } = character;

      return (
        <div
          key={`${id} ${index}`}
          className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] max-h-[20vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex"
        >
          <img
            className="w-1/3 my-auto rounded-l-lg max-w-[15vh]"
            src={image}
            alt={`${name}`}
          />
          <div className="w-3/5 m-auto">
            <p>{`ID: ${id}`}</p>
            <p className="">{name}</p>
            <p>{`Species: ${species}`}</p>
            <p>{`Created: ${created.split("T").shift()}`}</p>
            <div className="absolute top-4 right-4 cursor-pointer z-[80]">
              <Link href={`/characters/${id}`}>
                <MdInfoOutline className="scale-150 rounded-full bg-lime-500" />
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return <>{charactersDiv()}</>;
}
