import { Box, Link, Stack } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  const [userInfo, {
    logout,
  }] = useUser()
  return (
    <Box sx={{ width: "100vw", height: "100vh", padidng: '10px' }}>
      <Stack
        sx={{ height: 40 }}
        alignItems="center"
        justifyContent={"flex-end"}
        spacing={1}
        direction="row"
      >
        {userInfo.isLogin ? (
          <Fragment>
            欢迎您，<Link href={"/r/login"}>{userInfo.nickname}</Link>
            <Link
              sx={{ cursor: "pointer" }}
              onClick={logout}
            >
              退出
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link href={"/r/login"}>登录</Link>
            <Link href={"/r/register"}>注册</Link>
          </Fragment>
        )}
        <Link href={"/r/register"}>购物车</Link>
      </Stack>
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
