// object from third party libraries
import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"

// import components from application
import MovieForm from "./components/movieForm"
import NavBar from "./components/Navbar"
import Movies from "./components/movies"
import Customers from "./components/customers"
import Rentals from "./components/rentals"
import NotFound from "./components/notFound"
import LoginForm from "./components/loginForm"
import Logout from "./components/logout"
import RegisterForm from "./components/registerForm"
import auth from "./services/authService"
import ProtectedRoute from "./components/common/protectedRoute"

// css properties
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

class App extends Component {
  state = {}

  componentDidMount() {
    // get user and display in navbar
    const user = auth.getCurrentUser()
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}

export default App
