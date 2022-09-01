import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { LocationSkeleton } from "../../components/skeletons/location";
import { NavBar } from "../../elements/navbar";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <LocationSkeleton count={Number(id)} />
      </QueryClientProvider>
    </>
  );
}

export default ID;
