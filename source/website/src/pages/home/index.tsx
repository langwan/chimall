import { getHomeDataApi } from "@/lib/api";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Hot } from "./components/Hot";

export default function Home() {

  const homeDataQuery = useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeDataApi
  })

  if (homeDataQuery.isLoading) {
    return <Box>loading...</Box>
  }

  if (homeDataQuery.isError) {
    return <Box>error</Box>
  }


  return (
    <Box p="10px">
      {Object.entries(homeDataQuery.data.blocks).map(([key, value]) => (
        <Hot data={value} title={key} key={key} />
      ))}
    </Box>
  );
}
