import Head from "next/head";
import { useRouter } from "next/router";
import { LocationSkeleton } from "../../components/location-skeleton";
import { NavBar } from "../../components/navbar";

// serve single location result
function ID() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <LocationSkeleton count={Number(id)} />
    </>
  );
}

export default ID;
