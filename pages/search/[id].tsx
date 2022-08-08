import Head from "next/head";
import { useRouter } from "next/router";
import { NavBar } from "../../components/navbar";
import { DisplaySearch } from "../../components/search-skeleton";

// route to handle user searches
function ID() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <DisplaySearch query={String(id)} />
    </>
  );
}

export default ID;
