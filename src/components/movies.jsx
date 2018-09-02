import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./util/pagination";
import TableHeader from "./common/table-header";
import _ from "lodash";
const columns = [
  { path: "title", label: "Title" },
  { path: "genre.name", label: "Genre" },
  { path: "numberInStock", label: "Stock" },
  { path: "dailyRentalRate", label: "Rate" },
  { key: "like" },
  { key: "delete" }
];
class Movies extends Component {
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

  handleSort = path => {
    const sortColumn = { ...this.state.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({
      sortColumn
    });
  };
  render() {
    const {
      movies: allMovies,
      itemsCountPerPage,
      currentPage,
      sortColumn
    } = this.state;
    const sorted = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, itemsCountPerPage);
    return (
      <div className="row">
        <div className="col-2" />
        <div className="col">
          <p>
            {"Showing page " +
              currentPage +
              " of " +
              Math.ceil(allMovies.length / itemsCountPerPage)}
          </p>
          <table className="table">
            <TableHeader
              columns={columns}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <tbody>
              {movies.map(m => {
                return (
                  <tr key={m._id}>
                    <td> {m.title}</td>
                    <td> {m.genre.name}</td>
                    <td> {m.numberInStock}</td>
                    <td> {m.dailyRentalRate}</td>
                    <td>
                      <Like liked={m.liked} onLike={() => this.handleLike(m)} />
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.handleDelete(m)}
                      >
                        <i className="fa fa-trash" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            itemsCount={allMovies.length}
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
