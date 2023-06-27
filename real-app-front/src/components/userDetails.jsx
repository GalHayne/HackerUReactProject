import userImg from "../imgs/user.png";
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import useDarkContext from "../hooks/useDarkModa-context";
import axios from "axios";
import UserForm from "./userForm";
import UserFormPassword from "./userFormPassword";

const UserDeatils = () => {
  const [userDetails, setUserDetails] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    name: userDetails.name,
    email: userDetails.email,
    password: "test",
  });

  const navigate = useNavigate();

  const { user } = useAuth();

  const { theme } = useDarkContext();

  const getMe = async () => {
    try {
      const res = usersService.getMe(user?._id);
      res
        .then((response) => {
          setUserDetails(response.data[0]);
          setUpdateUser(response.data[0]);
        })
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
  };

  useEffect(() => {
    if (user) {
      getMe();
    } else {
      navigate("/sign-out");
      navigate("/sign-in");
      toast.error("The user does not exist");
    }
  }, []);

  const handleToggleShowEdit = () => {
    setShowEdit((prev) => !prev);
  };
  
  const handleToggleShowEditPassword = () => {
    setShowEditPassword((prev) => !prev);
  };

  let emailRegex = /^\S+@\S+\.\S+$/;

  const handleSumbit = async (e , updateUser) => {
    e.preventDefault();
      if (emailRegex.test(updateUser.email)) {
        try {
          const res = await axios.put(
            `http://localhost:3900/api/users/updateDetails/${user._id}`,
            {
              name: updateUser.name,
              email: updateUser.email,
            }
          );
          toast.success(res.data);
          setShowEdit(false);
          setShowEditPassword(false);
          getMe();
        } catch (err) {
          toast.error(err.response.data);
        }
      } else {
        toast.error("The email must be valid");
      }
  };

  const handlePassword = async (newPassword) => {
;
        try {
          const res = await axios.put(
            `http://localhost:3900/api/users/updatePassword/${user._id}`,
            {
              password: newPassword
            }
          );
          toast.success(res.data);
          setShowEdit(false);
          getMe();
          setShowEditPassword(false);
        } catch (err) {
          toast.error(err.response.data);
        }
      
  };




  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader title={<>User Details</>} />
        <img
          className="rounded-circle m-3"
          style={{ width: "150px" }}
          src={userImg}
          alt="Logo"
        />
      {!showEdit && !showEditPassword && <div>
        <div className="m-3">
          <p>
            <span className="bold">User Name: </span>
            {userDetails?.name}
          </p>
          <p>
            <span className="bold">Email: </span>
            {userDetails?.email}
          </p>
        </div>
        <div className="d-flex flex-column">
          <button
            className={`rounded w-25 btn btn-primary ${theme}`}
            style={{ minWidth: "100px" }}
            title="edit profile"
            onClick={() => handleToggleShowEdit()}
          >
            Edit profile
          </button>
          <button
            className={`rounded w-25 btn btn-secondary ${theme} my-3`}
            style={{ minWidth: "100px" }}
            title="edit profile"
            onClick={() => handleToggleShowEditPassword()}
          >
            Edit Password
          </button>
        </div>
      </div>}
      {showEdit && !showEditPassword && (
        <UserForm theme={theme} handleToggleShowEdit={handleToggleShowEdit} handleSumbit={handleSumbit} userDetails={userDetails} />
      )}
      {!showEdit && showEditPassword && (
        <UserFormPassword theme={theme} handleToggleShowEdit={handleToggleShowEditPassword} handlePassword={handlePassword} userDetails={userDetails} />
      )}
    </>   
  );
};

export default UserDeatils;
