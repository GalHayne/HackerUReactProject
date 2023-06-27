import { useState } from "react";
import Input from "./common/input";

const UserForm = ({
  theme,
  handleToggleShowEdit,
  handleSumbit,
  userDetails,
}) => {
  const [updateUser, setUpdateUser] = useState({
    name: userDetails.name,
    email: userDetails.email,
  });

  const handleChangeName = (e) => {
    setUpdateUser((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChangeEmail = (e) => {
    setUpdateUser((prev) => ({ ...prev, email: e.target.value }));
  };

  return (
    <div className="w-25">
      <form onSubmit={(e) => handleSumbit(e, updateUser)}>
        <div className="w-100">
          <div className="d-flex flex-column">
            <Input
              value={updateUser.name}
              required
              label={"Name"}
              minLength="2"
              maxLength="120"
              className="rounded m-3 form-group p-2 needs-validation"
              onChange={(e) => handleChangeName(e)}
              type="text"
            />
          </div>
          <div className="d-flex flex-column">
            <Input
              value={updateUser.email}
              required
              label={"Email"}
              minLength="2"
              maxLength="120"
              name="email"
              className="rounded m-3 form-group p-2 needs-validation"
              onChange={(e) => handleChangeEmail(e)}
              type="text"
            />
          </div>
        </div>

        <div className="d-flex w-100">
          <button
            className={`btn btn-primary ${theme} m-3`}
            disabled={
              userDetails.name === updateUser.name &&
              userDetails.email === updateUser.email
            }
          >
            Update
          </button>
          <button
            className={`btn btn-danger ${theme} m-3`}
            onClick={() => handleToggleShowEdit()}
          >
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
