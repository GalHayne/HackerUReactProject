import userImg from "../imgs/user.png";
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import usersService from "../services/usersService";
import useDarkContext from "../hooks/useDarkModa-context";
import axios from "axios";

const UserDeatils = () => {
  const [userDetails, setUserDetails] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    name: userDetails.name,
    email: userDetails.email,
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

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleToggleShowEdit = () => {
    setShowEdit((prevState) => {
      return !prevState;
    });
    setUpdateUser(userDetails);
  };

  const handlecancel = () => {
    handleToggleShowEdit();
  };

  const handleChangeName = (e) => {
    setUpdateUser((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChangeEmail = (e) => {
    setUpdateUser((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleSumbit = async (e) => {

    e.preventDefault();

    if (isValidEmail(updateUser.email)) {
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
        getMe()
        setShowEdit(false);
      } catch (err) {
        toast.error(err.response.data);
      }
    } else {
      toast.error("The email must be valid");
    }
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex flex-column">
      <PageHeader title={<>User Details</>} />
      <img
        className="rounded-circle m-3"
        style={{ width: "150px" }}
        src={userImg}
        alt="Logo"
      />
      {!showEdit && (
        <div className="m-3">
          <p>
            <span className="bold">User Name: </span>
            {userDetails?.name}
          </p>
          <p>
            {" "}
            <span className="bold">Email: </span>
            {userDetails?.email}
          </p>
        </div>
      )}
      {!showEdit && (
        <button
          className={`rounded w-25 btn btn-primary ${theme}`}
          style={{ minWidth: "100px" }}
          title="edit profile"
          onClick={handleToggleShowEdit}
        >
          Edit profile
        </button>
      )}
      {showEdit && (
        <form onSubmit={e => handleSumbit(e)}>
          <div className="w-25">
            <input
              required
              onChange={(e) => {
                handleChangeName(e);
              }}
              minLength="2"
              maxLength="12"
              className="rounded m-3 form-group p-2 needs-validation"
              type="text"
              value={updateUser.name}
            />
            <input
              required
              onChange={(e) => {
                handleChangeEmail(e);
              }}
              minLength="2"
              maxLength="25"
              name="email"
              className="rounded m-3 form-group p-2 needs-validation"
              type="text"
              value={updateUser.email}
            />
          </div>

          <div className="d-flex w-25">
            <button
              disabled={
                updateUser.name === userDetails.name &&
                updateUser.email === userDetails.email
              }
              className={`btn btn-primary ${theme} m-3`}
            >
              Update
            </button>
            <button
              className={`btn btn-danger ${theme} m-3`}
              onClick={(e) => handlecancel(e)}
            >
              Cancle
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserDeatils;
