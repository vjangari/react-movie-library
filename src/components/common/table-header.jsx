import React from "react";

const TableHeader = ({ columns, onClick }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            scope="col"
            onClick={() => column.path && onClick(column)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
