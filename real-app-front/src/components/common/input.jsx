const Input = ({ label, name, error, width = "w-25", placeholder= "",...rest }) => {
  return (
    <div className="form-group my-1">
      <label htmlFor={name}>
        {label}
        {rest.required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
      placeholder={placeholder}
        {...rest}
        id={name}
        name={name}
        className={["form-control", error && "is-invalid", width]
          .filter(Boolean)
          .join(" ")}
      />
      <span className="invalid-feedback">{error}</span>
    </div>
  );
};

export default Input;
