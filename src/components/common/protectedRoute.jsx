import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import auth from "../../services/authService"

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={props => {
          if (!auth.getCurrentUser())
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          return Component ? <Component {...props} /> : render(props)
        }}
      />
    </div>
  )
}

export default ProtectedRoute
