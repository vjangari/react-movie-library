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
              onClick={() => column.path && onSort(column.path)}
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
