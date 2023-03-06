import { Button, Stack, TextField } from "@mui/material";
import { apiRequest } from "Helper/axios";
import hashPassword from "Helper/password";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    phone: "",
    nickname: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const onChange = async (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <form
      onSubmit={async (event) => {
        event.stopPropagation();
        event.preventDefault();

        try {
          let hp = hashPassword(values.password);
          let vals = { ...values, password: hp };
          let resp = await apiRequest.post("/api/v1/register", vals);
          enqueueSnackbar("注册成功", { variant: "success" });
          setErrors({});
          navigate("/");
        } catch (error) {
          if (error.response.status === 422) {
            setErrors(error.response.data);
          }
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
          error={errors.Phone}
          helperText={errors.Phone}
          onChange={onChange}
          placeholder="手机号"
          name="phone"
          value={values.phone}
        />
        <TextField
          error={errors.Nickname}
          helperText={errors.Nickname}
          name="nickname"
          placeholder="昵称"
          onChange={onChange}
          value={values.nickname}
        />
        <TextField
          error={errors.Password}
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
        <Button>登录</Button>
      </Stack>
    </form>
  );
}
