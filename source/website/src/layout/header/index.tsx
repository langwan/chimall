import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase, MyLink } from "./style";
import { useUser } from "@/hooks/useUser";
import { Stack } from "@mui/material";

export default function Header() {
  const [userInfo, { logout }] = useUser();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            痴商
          </Typography>
          <Stack
            height="100%"
            alignItems="center"
            color="#fff"
            justifyContent={"flex-end"}
            spacing={1}
            direction="row"
          >
            {userInfo.isLogin ? (
              <>
                欢迎您，<MyLink href={"/r/login"}>{userInfo.nickname}</MyLink>
                <MyLink color="#fff" sx={{ cursor: "pointer" }} onClick={logout}>
                  退出
                </MyLink>
              </>
            ) : (
              <>
                <MyLink color="#fff" href={"/r/login"}>
                  登录
                </MyLink>
                <MyLink href={"/r/register"}>注册</MyLink>
              </>
            )}
            <MyLink href={"/r/register"}>购物车</MyLink>
          </Stack>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
