import { Box, Button, Link, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '@/hooks/useUser'

export default function Login() {
  let navigate = useNavigate();

  const [_, {
    login,
    errors
  }] = useUser()
  const [values, setValues] = useState({
    phone: "",
    password: "",
  });
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <form
      onSubmit={async (event) => {
        event.stopPropagation();
        event.preventDefault();
        const err = await login(values)
        if (!err) {
          navigate('/')
        }
      }}
    >
      <Stack
        sx={{ width: 400 }}
        spacing={1}
        direction={"column"}
        justifyContent="flex-start"
      >
        <TextField
          error={!!errors.Phone}
          helperText={errors.Phone}
          onChange={onChange}
          placeholder="手机号"
          name="phone"
          value={values.phone}
        />
        <TextField
          error={!!errors.Password}
          helperText={errors.Password}
          name="password"
          type="password"
          placeholder="密码"
          onChange={onChange}
          value={values.password}
        />
        <Button type="submit" variant="contained">
          登录
        </Button>
        <Box textAlign="center">
          <Link href="/r/register">注册</Link>
        </Box>
      </Stack>
    </form>
  );
}
