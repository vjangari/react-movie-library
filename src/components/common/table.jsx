import React from "react";

import TableHeader from "./table-header";
import TableBody from "./table-body";

const Table = props => {
  const { columns, sortColumn, data, onSort, styleClass } = props;
  return (
    <table className={styleClass}>
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};
Table.defaultProps = {
  styleClass: "table"
};
export default Table;
