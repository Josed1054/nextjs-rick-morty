import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { EpisodeSkeleton } from "../../components/skeletons/episode";

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
      <QueryClientProvider client={queryClient}>
        <EpisodeSkeleton count={Number(id)} />
      </QueryClientProvider>
    </>
  );
}

export default ID;
