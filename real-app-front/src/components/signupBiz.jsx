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

const SignUpBiz = ({ redirect = "/sign-in" }) => {
  const [error, setError] = useState("");

  const { theme } = useDarkContext();

  const navigate = useNavigate();
  const { user, createUser } = useAuth();

  const regularExpression =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/;

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
      password: Joi.string().min(8).max(1024).regex(regularExpression).regex(
        regularExpression,
        "The password must have at least one uppercase English letter, one lowercase English letter, at least 4 numbers and one special character. The minimum length of the password is 8 characters"
      ).label("Password"),
    }),
    async onSubmit(values) {
      if (regularExpression.test(values.password)) {
        try {
          const res = await createUser({
            ...values,
            biz: true,
            block: false,
            admin: false,
          });
          if (res) {
            toast.success(
              `${res.data.name} you have successfully registered to the site, you are transferred to the login page`
            );
          }
          navigate(redirect);
        } catch ({ response }) {
          if (response && response.status === 400) {
            setError(response.data);
          }
        }
      } else {
        setError("The password does not match the policy");
        toast.error(
          "The password length must be minimum 8 char ,  at least a number, and at least a special character."
        );
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
          title="Sign Up as Business with Real App"
          description="Open a new business account and get ability to advertise your business and your employees or friends!"
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
            eye
            type="password"
            label="Password"
            required
            error={form.touched.password && form.errors.password}
          />

          <div className="my-2">
            <button
              type="submit"
              title="sign up business"
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

export default SignUpBiz;
