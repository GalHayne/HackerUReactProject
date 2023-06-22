import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import useDarkContext from "../hooks/useDarkModa-context";

const SignIn = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const { theme } = useDarkContext();

  const { login, user } = useAuth();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string().min(6).max(1024).required().label("Password"),
    }),
    async onSubmit(values) {
      try {
        const res = await login(values);
        if (res) {
          navigate(redirect);
          toast.success(`You have successfully connected to the system`);
        } else {
          toast.error(`Problem connecting to the server`);
          setError(
            "After 3 incorrect login attempts the user will be blocked for 24 hours"
          );
        }
      } catch (err) {
        if (err) {
          setError(err);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="text-center">
        <PageHeader
          title="Sign In with Real App"
          description="Sign in to your accound"
        />
      </div>

      <div className={`center-div ${theme} shadow p-3`}>
        <form onSubmit={form.handleSubmit} noValidate>
          {error && <div className="alert alert-danger">{error}</div>}

          <Input
            {...form.getFieldProps("email")}
            type="email"
            label="Email"
            required
            error={form.touched.email && form.errors.email}
          />
          <Input
            {...form.getFieldProps("password")}
            type="password"
            label="Password"
            required
            error={form.touched.password && form.errors.password}
          />

          <div className="my-2">
            <button
              type="submit"
              title="sign in"
              disabled={!form.isValid}
              className={`btn btn-primary ${theme}`}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
