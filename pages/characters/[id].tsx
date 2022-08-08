import Head from "next/head";
import { useRouter } from "next/router";
import { CharacterSkeleton } from "../../components/character-skeleton";
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
      <CharacterSkeleton count={Number(id)} />
    </>
  );
}

export default ID;
