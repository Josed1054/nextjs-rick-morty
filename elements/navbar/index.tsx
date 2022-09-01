import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { MdSearch } from "react-icons/md";

// serve navbar
export function NavBar() {
  // handle navbar states
  const [dataInput, setDataInput] = useState("");
  const [navbar, setNavbar] = useState(false);

  // handle user input
  function updateDataInput(event: SyntheticEvent) {
    const { value } = event.target as HTMLInputElement;
    setDataInput(value);
  }

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-[100]">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h2 className="text-xl font-bold cursor-pointer md:text-2xl">
                Rick / Morty
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
              <li>
                <Link href="/">
                  <a className="text-gray-600 hover:text-lime-500">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/characters">
                  <a className="text-gray-600 hover:text-lime-500">
                    Characters
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/episodes">
                  <a className="text-gray-600 hover:text-lime-500">Episodes</a>
                </Link>
              </li>
              <li>
                <Link href="/locations">
                  <a className="text-gray-600 hover:text-lime-500">Locations</a>
                </Link>
              </li>
            </ul>
            <div className="flex w-full mt-4 md:mt-0 md:w-auto">
              <input
                type="text"
                placeholder="Search..."
                className="w-5/6 pl-1 border-2 border-black rounded-lg md:w-auto focus:border-lime-500 focus:border-3 hover:border-lime-500 focus:outline-none"
                autoComplete="off"
                value={dataInput}
                onChange={updateDataInput}
              />
              <div className="flex items-center justify-center w-1/6 m-auto cursor-pointer md:ml-4">
                <Link href={`/search/${dataInput}`}>
                  <MdSearch className="scale-150" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
