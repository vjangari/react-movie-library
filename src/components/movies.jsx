import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import Table from "./common/table";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "./util/pagination";
import _ from "lodash";
import { getGenres } from "./../services/fakeGenreService";
import ListGroup from "./common/list-group";

class Movies extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onLike={() => this.handleLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => this.handleDelete(movie)}
        >
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
      )
    }
  ];

  state = {
    movies: [],
    genres: [],
    filteredMovies: [],
    selectedGenre: "",
    itemsCountPerPage: 4,
    sortColumn: { path: "title", order: "asc" },
    currentPage: 1
  };

  componentDidMount() {
    const movies = getMovies().sort((a, b) => a.title > b.title);
    const genres = getGenres().sort((a, b) => a.name > b.name);
    genres.unshift({ _id: "", name: "All Genres" });
    this.setState({ movies, genres });
  }
  handleDelete = movie => {
    const { currentPage: page, itemsCountPerPage } = this.state;
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    if (index > -1) {
      movies.splice(index, 1);
    }

    const pageIndex = Math.ceil(movies.length / itemsCountPerPage);
    const currentPage = page < pageIndex ? page : pageIndex;
    this.setState({
      movies,
      currentPage
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({
      sortColumn
    });
  };
  handleFilter = item => {
    const selectedGenre = item._id;
    this.setState({ selectedGenre, currentPage: 1 });
  };
  getPagedDate() {
    const {
      movies: allMovies,
      itemsCountPerPage,
      currentPage,
      sortColumn,
      selectedGenre
    } = this.state;
    let filterd = allMovies;
    if (selectedGenre) {
      filterd = _.filter(allMovies, movie => movie.genre._id === selectedGenre);
    }
    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, itemsCountPerPage);
    return {
      data: movies,
      sortColumn,
      currentPage,
      itemsCountPerPage,
      totalCount: filterd.length,
      pageCount: Math.ceil(filterd.length / itemsCountPerPage)
    };
  }

  getPagedText(pageCount, currentPage) {
    if (pageCount) return "Showing page " + currentPage + " of " + pageCount;
    else return "No records found";
  }
  render() {
    const { genres, selectedGenre } = this.state;
    const {
      data,
      sortColumn,
      currentPage,
      itemsCountPerPage,
      totalCount,
      pageCount
    } = this.getPagedDate();
    return (
      <div className="row">
        <div className="col-2" />
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onFilter={this.handleFilter}
        />
        <div className="col">
          <p>{this.getPagedText(pageCount, currentPage)}</p>
          <Table
            columns={this.columns}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            data={data}
            // styleClass="table table-hover table-striped"
          />

          <Pagination
            itemsCount={totalCount}
            itemsCountPerPage={itemsCountPerPage}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
