import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import useDarkContext from "../hooks/useDarkModa-context";

const SignUp = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const { theme } = useDarkContext();

  const navigate = useNavigate();
  const { user, createUser } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: formikValidateUsingJoi({
      name: Joi.string().min(2).max(255).required().label("Name"),
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
        const res = await createUser({
          ...values,
          biz: false,
          block: false,
          admin: false,
        });
        toast.success(
          `${res.data.name} you have successfully registered to the site, you are transferred to the login page`
        );
        navigate(redirect);
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
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
          title="Sign Up with Real App"
          description="Open a new account, it is free for you!"
        />
      </div>

      <div className={`center-div ${theme} shadow p-3`}>
        <form className="p-3" onSubmit={form.handleSubmit} noValidate>
          {error && <div className="alert alert-danger">{error}</div>}

          <Input
            {...form.getFieldProps("email")}
            type="email"
            label="Email"
            required
            error={form.touched.email && form.errors.email}
          />
          <Input
            {...form.getFieldProps("name")}
            type="text"
            label="Name"
            required
            error={form.touched.name && form.errors.name}
          />
          <Input
            {...form.getFieldProps("password")}
            type="password"
            label="Password"
            required
            eye
            error={form.touched.password && form.errors.password}
          />

          <p className="text-danger">
            Note The fields marked with an * are mandatory
          </p>

          <div className="my-2">
            <button
              type="submit"
              title="sign up"
              disabled={!form.isValid}
              className={`btn btn-primary ${theme}`}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
