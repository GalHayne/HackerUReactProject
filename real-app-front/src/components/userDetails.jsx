import Input from "./common/input";
import userImg from '../imgs/user.png'
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Joi from "joi";
import { useFormik } from "formik";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";

const UserDeatils = () => {

  const [userDetails,setUserDetails] = useState("");
  const [showEdit,setShowEdit] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user } = useAuth();

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
        console.log(values);
        const res = await axios.put(`http://localhost:3900/api/users/updateDetails/${user._id}`,{
          email: values.email,
          name: values.name,
        })
        console.log(res);
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
    const res = await axios.get(`http://localhost:3900/api/users/${user._id}`)
    setUserDetails(res.data[0]);

  }

  useEffect(() => {
    getMe();
  },[])

  const handleToggleShowEdit = () => {
    setShowEdit((prevState) => {
      return !prevState;
    })
  }

  const handleCancle = () => {
    handleToggleShowEdit()
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
      {!showEdit && <p>User Name: {userDetails.name}</p>}
       {!showEdit && <button className='rounded border w-25 min-vw-25 p-2 btn btn-secondary' onClick={handleToggleShowEdit}>Edit profile</button>}
       {showEdit && <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          required
          placeholder={userDetails.email}
          error={form.touched.email && form.errors.email}
          />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          required
          placeholder='********'
          error={form.touched.password && form.errors.password}
          />
        <Input
          {...form.getFieldProps("name")}
          type="text"
          label="Name"
          required
          placeholder={userDetails.name}
          error={form.touched.name && form.errors.name}
        />
        
        <div className="my-2 d-flex justify-content-around w-25">
          <button
            value={userDetails}
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary m-2"
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
