import React from "react";

const Like = props => {
  const className = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={className}
      onClick={props.onLike}
    />
  );
};

export default Like;
