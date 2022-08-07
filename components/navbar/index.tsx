import autoAnimate from "@formkit/auto-animate";
import Link from "next/link";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

export function NavBar() {
  const [dataInput, setDataInput] = useState("");
  const [navbar, setNavbar] = useState(false);

  const parentAnimation = useRef(null);

  useEffect(() => {
    parentAnimation.current && autoAnimate(parentAnimation.current);
  }, [parentAnimation]);

  function updateDataInput(event: SyntheticEvent) {
    let { value } = event.target as HTMLInputElement;
    value = value.replace(/[^0-9]/gi, "");

    setDataInput(value);
  }

  return (
    <nav
      className="w-full bg-white shadow sticky top-0 z-[100]"
      ref={parentAnimation}
    >
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h2 className="text-xl font-bold cursor-pointer md:text-2xl">
                Rick/Morty
              </h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 md:flex sm:flex-col md:flex-row md:pb-0 md:mt-0 md:block ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-4 md:flex md:space-x-6 md:space-y-0 md:pr-4">
              <li className="text-gray-600 hover:text-lime-500">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="text-gray-600 hover:text-lime-500">
                <Link href="/characters">
                  <a>Characters</a>
                </Link>
              </li>
              <li className="text-gray-600 hover:text-lime-500">
                <Link href="/episodes">
                  <a>Episodes</a>
                </Link>
              </li>
              <li className="text-gray-600 hover:text-lime-500">
                <Link href="/locations">
                  <a>Locations</a>
                </Link>
              </li>
            </ul>
            <div className="flex w-full mt-4 md:mt-0 md:w-auto">
              <input
                type="text"
                placeholder="Search by ID only..."
                className="w-5/6 pl-1 border-2 border-black rounded-lg md:w-auto focus:border-lime-500 focus:border-3 hover:border-lime-500 focus:outline-none"
                autoComplete="off"
                value={dataInput}
                onChange={updateDataInput}
              />
              <div className="flex items-center justify-center w-1/6 m-auto cursor-pointer md:ml-4">
                <Link href={`/search/${dataInput}`}>
                  <span className="material-symbols-outlined">search</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
