/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CHARACTER } from "../../utils/types/character";

export function displayCharacters(props: CHARACTER[]) {
  return props.map((character, index) => {
    return (
      <div
        key={`${character.id} ${index}`}
        className="md:flex-[40%] md:w[50%] w-full p-3 min-h-[15vh] max-h-[20vh] bg-gray-200 m-4 mt-4 md:m-0 rounded-lg relative flex"
      >
        <img
          className="w-1/3 my-auto rounded-l-lg max-w-[15vh]"
          src={character.image}
          alt={character.name}
        />
        <div className="w-3/5 m-auto">
          <p>{`ID: ${character.id}`}</p>
          <p className="">{character.name}</p>
          <p>{`Species: ${character.species}`}</p>
          <p>{`Created: ${character.created.split("T").shift()}`}</p>
          <div className="absolute top-4 right-4 cursor-pointer z-[80]">
            <Link href={`/characters/${character.id}`}>
              <span className="rounded-full material-symbols-outlined bg-lime-500">
                info
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  });
}
