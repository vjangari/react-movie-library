import React from "react";
import _ from "lodash";
const Pagination = props => {
  const range = _.range(
    1,
    Math.ceil(props.itemsCount / props.itemsCountPerPage) + 1
  );
  if (range.length === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {range.map(p => (
          <li
            key={p}
            className={
              p === props.currentPage ? "page-item active" : "page-item"
            }
            onClick={() => props.onPageChange(p)}
          >
            <a className="page-link">{p}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
