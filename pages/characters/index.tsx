import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharactersMain } from "../../components/mains/characters";

// serve all the episodes with pagination
function Characters() {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <CharactersMain />
      </QueryClientProvider>
    </>
  );
}

export default Characters;
