import React from "react";
const Reply = (props) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2">User: {props.user}</div>
        <div className="col-3">On: {props.posted}</div>
        <div className="col-7">{props.body}</div>
      </div>
    </React.Fragment>
  );
};

export default Reply;
