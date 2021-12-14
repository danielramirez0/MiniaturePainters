import React from "react";

const Reply = (props) => {
  return (
    <React.Fragment>
      <div className="row row-cols-2">
        <div className="col">By: {props.user}</div>
        <div className="col">On: {props.posted}</div>
      </div>
      <div className="row">
        <div className="col">{props.body}</div>
      </div>
    </React.Fragment>
  );
};

export default Reply;
