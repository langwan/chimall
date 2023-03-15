import { useUser } from "@/hooks/useUser"
import { getCartsApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { Loading } from '@/components'
import { Box, Stack, Typography } from "@mui/material"

export const CartPage = () => {

  const [user] = useUser()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  if (!user.isLogin) {
    enqueueSnackbar("请先登录", { variant: "error" })
    navigate('/r/login')
    return
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['carts'],
    queryFn: getCartsApi,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>error</div>
  }


  return (
    <Box>
      {data.map(item => {
        return <Stack key={item.goodsId} spacing={3}>
          <Typography>{item.goodsId}</Typography>

          <Typography>{item.numbers}</Typography>
        </Stack>
      })}
    </Box>
  )
}