import { Loading } from "@/components";
import { addCartApi, getGoodApi } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Stack } from '@mui/material'
import { useUser } from "@/hooks/useUser";

export const GoodsPage = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  if (id === undefined) {
    enqueueSnackbar("访问页面错误", { variant: "error" });
    navigate("/", { replace: true })
    return <span></span>
  }
  const { isLoading, data } = useQuery({
    queryKey: ['goods', id],
    queryFn: () => getGoodApi(id)
  })

  const addToCartMutation = useMutation({
    mutationFn: addCartApi,
    onSuccess: () => {
    }
  })

  const [userInfo] = useUser()

  const handleAddToCart = () => {
    if (!userInfo.isLogin) {
      enqueueSnackbar("请先登录", { variant: "error" });
      return
    }
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems={"center"} py="30px">
      <Box component="img" src={data?.img} sx={{ width: 300, height: 300 }} />
      <Stack spacing={1} direction={"row"} justifyContent="flex-start">
        <Button variant="contained" onClick={handleAddToCart}>加入购物车</Button>
      </Stack>
    </Box>
  )
}