import React, { Component } from "react"
import { Link } from "react-router-dom"
import auth from "../services/authService"
import Like from "./common/like"
import Table from "./common/table"
import ".././App.css"

class MoviesTable extends Component {
  columns = [
    // content should be function that take a movie render a link
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }
  ]

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  }

  constructor() {
    // create a constructor to get the current user
    super()
    const user = auth.getCurrentUser()
    if (user && user.isAdmin) this.columns.push(this.deleteColumn)
  }

  render() {
    const { movies, onSort, sortColumn } = this.props // onSort is a function reference in movies comp or event handler
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    )
  }
}

export default MoviesTable
