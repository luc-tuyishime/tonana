import React, { Component } from "react"
import { getMovies, deleteMovie } from "../services/moviesService"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import MoviesTable from "./moviesTable"
import ListGroup from "./common/listGroup"
import Pagination from "./common/pagination"
import SearchBox from "./common/searchBox"
import { getGenres } from "../services/genreService"
import { paginate } from "../utils/paginate"
import _ from "lodash"

class Movies extends Component {
  state = {
    movies: [], // Going to take some time until we get data from server
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  }

  async componentDidMount() {
    const { data } = await getGenres() // get the data and pass it down
    const genres = [{ _id: "", name: "All genres" }, ...data] // new object on top of the array called (All genres)

    const { data: movies } = await getMovies()
    this.setState({ movies, genres })
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies
    const movies = originalMovies.filter(m => m._id !== movie._id)
    this.setState({ movies })

    try {
      await deleteMovie(movie._id)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("this movie has already been deleted.")

      this.setState({ movies: originalMovies })
    }
  }

  handleLike = movie => {
    const movies = [...this.state.movies] // clone the object of movies
    const index = movies.indexOf(movie) //find index of that object
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  handleGenderSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies
    } = this.state //we extract from this.state

    let filtered = allMovies
    if (searchQuery)
      // if we have a searchQuery down call almovies.filter where m goes to tile and convert to toLowerCase
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

    // Sorting
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize) // Paginate the movies by passing (allmovies,etc...)

    return { totalCount: filtered.length, data: movies }
  }

  render() {
    // object destructuring
    const { length: count } = this.state.movies
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state //we extract from this.state
    const { user } = this.props // extract the user from router

    if (count === 0) return <p>There are no movies in the database</p>

    const { totalCount, data: movies } = this.getPageData()

    return (
      <div className="row">
        <div className="col-3">
          {/*It should get a list of items to render*/}
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenderSelect}
          />
        </div>

        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: "20px" }}
            >
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

export default Movies
