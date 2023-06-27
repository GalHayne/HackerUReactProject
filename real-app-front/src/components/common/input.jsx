import { useState } from "react";

const Input = ({ label, name, error, type = 'password', width = "w-100", maxLength = 60, eye, password, placeholder = "", ...rest }) => {

  const [showPassword, setShowPassword] = useState(type)

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
        {label}
        {rest.required && <span className="text-danger ms-1">*</span>}
      </label>
      <div className="d-flex justify-content-center align-items-center bg-light rounded">
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
        {showPassword === 'password' ? <div>
          <i className="bi bi-eye-fill m-1 w-100" onClick={handleShowPasswordChange}></i>
        </div> : (showPassword === 'text' && eye === true) ? <div>
          <i className="bi bi-eye-slash-fill m-1 w-100" onClick={handleShowPasswordChange}></i>
        </div> : ''}
      </div>
      <span className="invalid-feedback">{error}</span>
    </div>
  );
};

export default Input;
