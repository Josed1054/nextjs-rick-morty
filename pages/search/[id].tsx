import Head from "next/head";
import { useRouter } from "next/router";
import { NavBar } from "../../elements/navbar";
import { DisplaySearch } from "../../components/skeletons/search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// route to handle user searches
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
        <DisplaySearch query={String(id)} />
      </QueryClientProvider>
    </>
  );
}

export default ID;
