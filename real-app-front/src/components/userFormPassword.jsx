import { useState } from "react";
import Input from "./common/input";
import { toast } from "react-toastify";


const UserFormPassword = ({ theme, handleToggleShowEdit, handlePassword }) => {
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");

  const regularExpression =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/;

  const handleCheckValid = ({ newPass, newPass2 }) => {
    if (newPass === "" || newPass2 === "") {
      toast.error("The new password does not comply with the policy!");
      return false;
    }

    if (!regularExpression.test(newPass)) {
      toast.error("The new password does not comply with the policy!");
      return false;
    }

    if (!regularExpression.test(newPass2)) {
      toast.error("The new password does not comply with the policy!");
      return false;
    }

    if (newPass !== newPass2) {
      toast.error("New password and repeat password do not match!");
      return false;
    }

    handlePassword(newPass)
  };

  return (
    <div className="w-25">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(handleCheckValid({ newPass, newPass2 }));
        }}
      >
        <div className="w-100">
          <div className="d-flex flex-column">
            <Input
              required
              label={"New Password:"}
              minLength="2"
              maxLength="120"
              className="rounded m-3 form-group p-2 needs-validation"
              type="password"
              onChange={(e) => setNewPass(e.target.value)}
              eye
            />
            <Input
              required
              label={"Repeat Password:"}
              minLength="2"
              maxLength="120"
              className="rounded m-3 form-group p-2 needs-validation"
              type="password"
              onChange={(e) => setNewPass2(e.target.value)}
              eye
            />
          </div>
        </div>

        <div className="d-flex w-100">
          <button className={`btn btn-primary ${theme} m-3`} disabled={newPass2 === "" || newPass === ""}>Update</button>
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

export default UserFormPassword;
