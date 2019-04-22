import React from "react"
import Joi from "joi-browser"
import Form from "./common/form"
import { getMovie, saveMovie } from "../services/moviesService"
import { getGenres } from "../services/genreService"

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [], // get genre from imaginary server
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  }

  async populateGenres() {
    const { data: genres } = await getGenres() // getGenres from api backend and get data and rename it to genres
    this.setState({ genres }) // update the state
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id // read it in the route and store in movieId
      if (movieId === "new") return

      const { data: movie } = await getMovie(movieId)
      this.setState({ data: this.mapToViewModel(movie) }) // get a movie from server and map to different kind of movie object we can use
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found")
    }
  }

  async componentDidMount() {
    await this.populateGenres()
    await this.populateMovie()
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = async () => {
    await saveMovie(this.state.data)

    this.props.history.push("/movies")
  }

  render() {
    return (
      <div>
        <h1>Movie Form..</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "title")}
          {this.renderSelect("genreId", "Genre", this.state.genres, "genre")}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    )
  }
}

export default MovieForm
