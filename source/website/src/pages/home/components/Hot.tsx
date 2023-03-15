import { Grid, Box, Typography, Stack } from "@mui/material";
import { FC, memo } from "react";
import { Good } from "./Good";


type Props = {
  title: string
  data: GoodRes[]
}

export const Hot: FC<Props> = memo(({ data, title }) => {
  return (
    <Box mt="20px">
      <Typography variant="h5">{title}</Typography>
      <Stack direction="row" spacing={2} mt="10px">
        {data.map((item) => (
          <Good data={item} key={item.id} />
        ))}
      </Stack>
    </Box>
  );
});