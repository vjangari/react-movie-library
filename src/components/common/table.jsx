import React from "react";
import TableHeader from "./table-header";
import TableBody from "./table-body";

const Table = props => {
  const { columns, sortColumn, data, onSort } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
