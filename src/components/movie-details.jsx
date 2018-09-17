import React from "react";

const MovieDetails = props => {
  return (
    <h1>
      Movie Details:
      {props.match.params.id}
    </h1>
  );
};

export default MovieDetails;
