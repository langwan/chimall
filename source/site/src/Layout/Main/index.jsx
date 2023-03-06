import { Box, Link, Stack } from "@mui/material";
import { apiRequest } from "Helper/axios";
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router";
export default function MainLayout() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    let tokenString = cookies.get("token");

    if (!!tokenString) {
      let jwtToken = jwtDecode(tokenString);
      setAccount(jwtToken);
    }
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack
        sx={{ height: 40 }}
        alignItems="center"
        justifyContent={"flex-end"}
        spacing={1}
        direction="row"
      >
        {account && (
          <Fragment>
            欢迎您，<Link href={"/r/login"}>{account.nickname}</Link>
            <Link
              sx={{ cursor: "pointer" }}
              onClick={async (event) => {
                await apiRequest.post("/api/v1/logout");
                setAccount(null);
              }}
            >
              退出
            </Link>
          </Fragment>
        )}
        {account == null && (
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
