import React from "react";
import { Link } from "react-router-dom";

const NotFound = props => {
  return (
    <h3>
      Invalid page requested. Click <Link to="/">here</Link> to take you to home
      page
    </h3>
  );
};

export default NotFound;
