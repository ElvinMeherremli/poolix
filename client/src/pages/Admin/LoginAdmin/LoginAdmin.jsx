import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import toast, { Toaster } from "react-hot-toast";
import { UserApi } from "../../../context/ContextApi";
import "./LoginAdmin.scss";

// Определение схемы валидации
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function LoginAdmin() {
  const { UserApiData } = useContext(UserApi);

  // Инициализация formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user = UserApiData.find(
        (user) => user.username === values.username && user.password === values.password
      );

      if (user) {
        toast.success("Login successful!");
        sessionStorage.setItem('user', JSON.stringify(user))
        // Здесь вы можете выполнить дальнейшие действия, например, перенаправление
      } else {
        toast.error("Invalid username or password");
      }
    },
  });

  return (
    <div className="LoginAdmin-section">
      <div className="container max-w-[1320px]">
        <form
          className="mt-[200px] mx-auto flex flex-col items-center justify-center gap-3"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            style={{ width: 400 }}
            id="outlined-username"
            name="username"
            label="Username"
            variant="outlined"
            color="success"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="standard-password-input"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            color="success"
            style={{ width: 400 }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            className="mt-3"
            color="success"
            variant="outlined"
            style={{ width: 120, height: 40 }}
          >
            Login
          </Button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default LoginAdmin;
