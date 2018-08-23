import React from "react";

const Like = ({ liked, onLike }) => {
  const className = liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i style={{ cursor: "pointer" }} className={className} onClick={onLike} />
  );
};

export default Like;
