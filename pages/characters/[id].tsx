import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { CharacterSkeleton } from "../../components/skeletons/character";
import { NavBar } from "../../elements/navbar";

// serve single episode result
function ID() {
  const router = useRouter();
  const { id } = router.query;

  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <CharacterSkeleton count={Number(id)} />
      </QueryClientProvider>
    </>
  );
}

export default ID;
