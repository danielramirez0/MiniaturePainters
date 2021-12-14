import React, { useEffect, useState } from "react";
import {
  Button,
  ToastContainer,
  Toast,
  Navbar,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAPI from "../useAPI/useAPI";
import useAuth from "../../components/useAuth/useAuth";

const Comment = (props) => {
  const { values, handleChange, handleSubmit } = useForm(submitComment);
  const [showReplies, setShowReplies] = useState(false);
  const [showNewComment, setShowNewComment] = useState(false);

  function renderAddComment() {
    return (
      <Form className="d=flex" onSubmit={handleSubmit}>
        <FormControl
          type="text"
          name="body"
          value={values.body || ""}
          onChange={handleChange}
          placeholder="Type comment here"
          className="me-2"
          aria-label="body"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }

  function submitComment() {
    return;
  }

  function renderComment() {
    return (
      <React.Fragment>
        <div className="row row-cols-4">
          <div className="col">User: {props.user}</div>
          <div className="col">On: {props.posted}</div>
          <div className="col">{props.body}</div>
          <div className="col">
            <Button type="button" onClick={() => setShowReplies(true)}>
              Reply
            </Button>
          </div>
        </div>
        <Button type="button" onClick={() => setShowNewComment(true)}>
          Comment
        </Button>
        {showNewComment ? renderAddComment() : null}
      </React.Fragment>
    );
  }

  return renderComment();
};

export default Comment;
