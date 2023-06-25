import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import cardsService from "../services/cardsService";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";
import useDarkContext from "../hooks/useDarkModa-context";
import usersService from "../services/usersService";

const CardsCreate = () => {
  const [error, setError] = useState("");

  const { theme } = useDarkContext();

  const { user } = useAuth();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidateUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),

      bizImage: Joi.string().min(11).max(1024).allow("").label("Image"),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;
        if (bizImage) {
          body.bizImage = bizImage;
        }
        const res = cardsService.createCard(body);
        res.then((data) => {
          toast.success(`${data.data.bizName}'s card was created successfully`);
          navigate("/my-cards");
        });
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  useEffect(() => {
    try {
      const res = usersService.getMe(user?._id);
      res
        .then((res) =>
          toast.success("You have connected successfully, insert a new card")
        )
        .catch((res) => {
          if (res.response.status === 404) {
            toast.error("The user does not exist please sign up");
            navigate("/sign-out");
          }
        });
    } catch (err) {
      toast.error("The user does not exist please sign up");
      navigate("/sign-out");
    }
  }, []);

  return (
    <div className={`center-div ${theme} shadow p-3`}>
      <PageHeader title="Create Card" />
      <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("bizName")}
          type="text"
          label="Name"
          required
          error={form.touched.bizName && form.errors.bizName}
        />
        <Input
          {...form.getFieldProps("bizDescription")}
          type="text"
          label="Description"
          required
          error={form.touched.bizDescription && form.errors.bizDescription}
        />
        <Input
          {...form.getFieldProps("bizAddress")}
          type="text"
          label="Address"
          required
          error={form.touched.bizAddress && form.errors.bizAddress}
        />
        <Input
          {...form.getFieldProps("bizPhone")}
          type="text"
          label="Phone"
          required
          error={form.touched.bizPhone && form.errors.bizPhone}
        />
        <Input
          {...form.getFieldProps("bizImage")}
          type="text"
          label="Image"
          error={form.touched.bizImage && form.errors.bizImage}
        />

        <p className="text-danger">
          Note The fields marked with an * are mandatory
        </p>
        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className={`btn btn-primary ${theme}`}
          >
            Create Card
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardsCreate;
