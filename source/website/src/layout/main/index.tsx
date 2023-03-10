import { Box, Stack } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { Outlet } from "react-router-dom";
import Header from "../header";
export default function MainLayout() {
  const [userInfo, { logout }] = useUser();
  return (
    <Box sx={{ width: "100vw", height: "100vh", padidng: "10px" }} bgcolor="#F5F5F5">
      <Header />
      <Outlet />
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
        direction="column"
        sx={{ height: 80 }}
        textAlign={"center"}
      >
        © 痴商单店版 2023
      </Stack>
    </Box>
  );
}
