import Head from "next/head";
import { useRouter } from "next/router";
import { LocationSkeleton } from "../../components/location-skeleton";
import { NavBar } from "../../components/navbar";
import { DisplaySearch } from "../../components/search-skeleton";

function ID() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <DisplaySearch count={Number(id)} />
    </>
  );
}

export default ID;
