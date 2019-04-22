import React from "react"
import { Redirect } from "react-router-dom"
import Form from "./common/form"
import Joi from "joi-browser"
import auth from "../services/authService"

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" }, //property that get all the data
    errors: {} // property that get errors
  }

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  }

  doSubmit = async () => {
    try {
      // call the server
      const { data } = this.state
      await auth.login(data.username, data.password)

      const { state } = this.props.location
      window.location = state ? state.from.pathname : "/"
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        errors.username = ex.response.data
        this.setState({ errors })
      }
    }
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-8">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username", "username")}
              {this.renderInput("password", "Password", "password", "password")}
              {this.renderButton("login")}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
