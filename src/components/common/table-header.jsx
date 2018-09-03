import React, { Component } from "react";

class TableHeader extends Component {
  applyClass(column) {
    const { sortColumn } = this.props;
    if (column.path === sortColumn.path) {
      return sortColumn.order === "asc"
        ? "m-1 fa fa-caret-up"
        : "m-1 fa fa-caret-down";
    }
    return null;
  }

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { columns, onSort } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              scope="col"
              className={column.path && "showCursor"}
              onClick={() => column.path && this.raiseSort(column.path)}
            >
              {column.label}

              <div className={this.applyClass(column)} aria-hidden="true" />
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
