import { useState } from "react";
import useDarkContext from "../../hooks/useDarkModa-context";

const Input = ({ label, name, error, type = 'password', width = "w-100", maxLength = 60, eye, password, placeholder = "", ...rest }) => {

  const [showPassword, setShowPassword] = useState(type)

  const { theme } = useDarkContext();

  const handleShowPasswordChange = () => {
    setShowPassword(prev => {
      if (prev === 'text') {
        return 'password'
      } else {
        return 'text'
      }
    })
  }

  return (
    <div className="form-group my-1">

      <label htmlFor={name}>
        <div className="flex d-flex">
          {rest.required && <span className="text-danger ms-1">*</span>}
          {label}
          {showPassword === 'password' ? <div>
            <i className={`bi bi-eye-fill ${theme} m-1 w-100`} onClick={handleShowPasswordChange}></i>
          </div> : (showPassword === 'text' && eye === true) ? <div>
            <i className={`bi bi-eye-slash-fill ${theme} m-1 w-100`} onClick={handleShowPasswordChange}></i>
          </div> : ''}
        </div>
      </label>
      <input
        placeholder={placeholder}
        {...rest}
        id={name}
        type={showPassword}
        name={name}
        minLength={2}
        maxLength={maxLength}
        className={["form-control", error && "is-invalid", width]
          .filter(Boolean)
          .join(" ")}
      />

      <span className="invalid-feedback">{error}</span>
    </div>

  );
};

export default Input;
