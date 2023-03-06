import { Stack } from "@mui/material";
import { Outlet } from "react-router";
export default function RegisterLayout() {
  return (
    <Stack
      sx={{ height: "100%", width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Outlet />
    </Stack>
  );
}
