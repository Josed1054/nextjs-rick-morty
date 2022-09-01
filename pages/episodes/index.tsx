import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EpisodesMain } from "../../components/mains/episodes";

// serve all the episodes with pagination
function Characters() {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <EpisodesMain />
      </QueryClientProvider>
    </>
  );
}

export default Characters;
