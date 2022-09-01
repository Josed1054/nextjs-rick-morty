/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { NavBar } from "../../elements/navbar";

// main page for searching, has no content, only a gif as an easter egg, this page is unreachable from the nav bar, only users that directly type the route gets this page
function search() {
  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <div className="flex justify-center w-full h-full">
        <img
          src="https://camo.githubusercontent.com/d7d6de4c51ea697bc96da2194ee682d43cea056a297af45e82b79ac6bdd15d0f/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f5756756479474561697a4e65672f67697068792e676966"
          alt=""
          data-canonical-src="https://media.giphy.com/media/WVudyGEaizNeg/giphy.gif"
          className="max-w-[100%] inline-block"
          data-target="animated-image.originalImage"
        ></img>
      </div>
    </>
  );
}

export default search;
