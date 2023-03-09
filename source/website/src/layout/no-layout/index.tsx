import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
export default function NoLayout() {
  return (
    <Stack
      sx={{ height: "100vh", width: "100vw", padding: '10px' }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Outlet />
    </Stack>
  );
}
