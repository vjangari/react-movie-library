import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import Table from "./common/table";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "./util/pagination";
import _ from "lodash";

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
    filteredMovies: [],
    itemsCountPerPage: 4,
    sortColumn: { path: "title", order: "asc" },
    currentPage: 1
  };

  componentDidMount() {
    const movies = getMovies().sort((a, b) => a.title > b.title);
    this.setState({ movies });
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

  getPagedDate() {
    const {
      movies: allMovies,
      itemsCountPerPage,
      currentPage,
      sortColumn
    } = this.state;
    const sorted = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, itemsCountPerPage);
    return { data: movies, sortColumn, currentPage, itemsCountPerPage, totalCount:allMovies.length };
  }
  render() {
    const {
      data,
      sortColumn,
      currentPage,
      itemsCountPerPage,
      totalCount
    } = this.getPagedDate();
    return (
      <div className="row">
        <div className="col-2" />
        <div className="col">
          <p>
            {"Showing page " +
              currentPage +
              " of " +
              Math.ceil(totalCount / itemsCountPerPage)}
          </p>
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
