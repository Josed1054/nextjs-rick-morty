import Head from "next/head";
import { useRouter } from "next/router";
import { EpisodeSkeleton } from "../../components/episode-skeleton";
import { NavBar } from "../../components/navbar";

// serve single episode result
function ID() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <EpisodeSkeleton count={Number(id)} />
    </>
  );
}

export default ID;
