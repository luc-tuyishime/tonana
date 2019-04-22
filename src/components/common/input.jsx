import React from "react"

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      {/* we remove the username label to
       get something from props, pick {label} from props */}
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}{" "}
      {/* if error is truphy run alert */}
    </div>
  )
}

export default Input
