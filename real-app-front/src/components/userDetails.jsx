import Input from "./common/input";
import userImg from '../imgs/user.png'
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Joi from "joi";
import { useFormik } from "formik";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import useDarkContext from "../hooks/useDarkModa-context";

const UserDeatils = () => {

  const [userDetails, setUserDetails] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user } = useAuth();

  const { theme } = useDarkContext();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
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
    }),
    async onSubmit(values) {
      try {
        await axios.put(`http://localhost:3900/api/users/updateDetails/${user._id}`, {
          email: values.email,
          name: values.name,
        })
        toast.success(`The user information has been updated successfully`)
        navigate("/");

      } catch (error) {
        if (error) {
          setError(error);
          toast.error(`User information has not been updated`)
        }
      }
    },
  });


  const getMe = async () => {
    const res = usersService.getMe(user._id)
    res.then(response => setUserDetails(response.data[0]))
      .catch(err => toast(`cant get user details`))
  }

  useEffect(() => {
    if (user) {
      getMe();
    }
  }, [])

  const handleToggleShowEdit = () => {
    setShowEdit((prevState) => {
      return !prevState;
    })
  }

  const handleCancle = () => {
    handleToggleShowEdit()
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className='m-3'>
      <PageHeader
        title={
          <>
            User Details
          </>
        }
      />
      <img className="rounded-circle w-25" src={userImg} alt="Logo" />
      {!showEdit && <div className="m-3"><p><span>User Name: </span>{userDetails.name}</p>
        <p> <span>Email: </span>{userDetails.email}</p></div>
      }
      {!showEdit && <button className={`rounded w-25 p-2 btn btn-primary ${theme}`} style={{ minWidth: "100px" }} onClick={handleToggleShowEdit}>Edit profile</button>}
      {showEdit && <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="w-25">
          <Input
            {...form.getFieldProps("email")}
            type="email"
            label="Email"
            required
            placeholder={userDetails.email}
            error={form.touched.email && form.errors.email}
          />
          <Input
            {...form.getFieldProps("name")}
            type="text"
            label="Name"
            required
            placeholder={userDetails.name}
            error={form.touched.name && form.errors.name}
          />
        </div>

        <div className="my-2 d-flex justify-content-around w-25">
          <button
            value={userDetails}
            type="submit"
            disabled={!form.isValid}
            className={`btn btn-primary  ${theme} m-2`}
          >
            Update
          </button>
          <button
            className="btn btn-secondary m-2"
            onClick={handleCancle}
          >
            Cancle
          </button>
        </div>
      </form>}
    </div>
  )
};

export default UserDeatils;
