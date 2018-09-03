import React from "react";

const ListGroup = props => {
  const { items, selectedItem, onFilter, idProperty, nameProperty } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[idProperty]}
          className={
            selectedItem === item[idProperty]
              ? "clickable list-group-item active"
              : "clickable list-group-item"
          }
          onClick={() => onFilter(item)}
        >
          {item[nameProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  idProperty: "_id",
  nameProperty: "name"
};
export default ListGroup;
