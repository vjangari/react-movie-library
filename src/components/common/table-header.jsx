import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column.path || columns.key} scope="col">
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
