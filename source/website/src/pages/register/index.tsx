import { Button, Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '@/hooks/useUser'

export default function RegisterPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    phone: "",
    nickname: "",
    password: "",
  });
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [_, {
    register,
    errors,
  }] = useUser()
  return (
    <form
      onSubmit={async (event) => {
        event.stopPropagation();
        event.preventDefault();
        const err = await register(values)
        if (!err) {
          enqueueSnackbar("注册成功", { variant: "success" });
          navigate("/");
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
          error={!!errors.Nickname}
          helperText={errors.Nickname}
          name="nickname"
          placeholder="昵称"
          onChange={onChange}
          value={values.nickname}
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
          注册
        </Button>
        <Button onClick={() => navigate('/r/login')}>登录</Button>
      </Stack>
    </form>
  );
}
