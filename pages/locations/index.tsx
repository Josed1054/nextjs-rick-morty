import Head from "next/head";
import { LocationsMain } from "../../components/mains/locations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// serve all the locations with pagination
function Locations() {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Rick / Morty</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <LocationsMain />
      </QueryClientProvider>
    </>
  );
}

export default Locations;
