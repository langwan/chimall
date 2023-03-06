import { Box, Grid, Typography } from "@mui/material";

export default function Entry() {
  return (
    <Grid container spacing={2}>
      {[...Array(12)].map((x, i) => (
        <Grid key={i} item xs={2}>
          <Box textAlign={"center"}>
            <Box
              sx={{ width: 160, height: 160 }}
              component={"img"}
              src="//cdn.cnbj1.fds.api.mi-img.com/nr-pub/202212301043_9e2a889ac4d99a1bbf95aa2defda039a.png?thumb=1&amp;w=400&amp;h=400&amp;f=webp&amp;q=90"
            />
          </Box>
          <Typography sx={{ color: "#333" }} textAlign="center">
            Redmi 12C
          </Typography>
          <Typography sx={{ color: "#b0b0b0" }} textAlign="center" noWrap>
            高性能长续航，5000万像素超清双摄
          </Typography>
          <Typography sx={{ color: "#ff6700" }} textAlign="center">
            699元
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
