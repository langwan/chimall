import { Backdrop, CircularProgress, Box } from "@mui/material"

export const Loading = () => {
  return (
    <Box display="flex" width="100%" height="100%" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Backdrop
        sx={{ color: "#fff" }}
        open
      >
        <CircularProgress />
      </Backdrop>
    </Box>)
}