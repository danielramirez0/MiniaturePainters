import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import useAPI from "../useAPI/useAPI";
import useAuth from "../../components/useAuth/useAuth";
import Reply from "../Reply/Reply";
import { defaultGetRequest as getData } from "../../static/main";
import { protectedEnpointPostRequest as postReply } from "../../static/main";
import useForm from "../useForm/useForm";
import dateFormat from "dateformat";
import { Form, FormControl, Button } from "react-bootstrap";

const Comment = (props) => {
  const { values, handleChange, handleSubmit } = useForm(submitReply);
  const [showNewReply, setShowNewReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchReplies, setFetchReplies] = useState(true);
  const auth = useAuth();
  const api = useAPI();

  useEffect(() => {
    if (fetchReplies) {
      getReplies();
    }
  }, [fetchReplies]);

  useEffect(() => {
    renderComment();
  }, [replies]);

  async function submitReply() {
    const newReply = { body: values.replyBody };
    const response = await postReply(
      `${api.url}projects/comments/replies/update/${props.commentId}`,
      newReply,
      auth.jwt
    );
    if (response) {
      await setShowNewReply(false);
      await setLoading(true);
      await setFetchReplies(true);
    }
  }

  function renderAddReply() {
    return (
      <Form className="d=flex" onSubmit={handleSubmit}>
        <FormControl
          type="text"
          name="replyBody"
          value={values.replyBody || ""}
          onChange={handleChange}
          placeholder="Type reply here"
          className="me-2"
          aria-label="reply-body"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }

  const getReplies = async () => {
    const response = await getData(
      `${api.url}projects/comments/${props.commentId}/replies/`
    );
    if (response) {
      await setReplies(response.data);
    }
    await setFetchReplies(false);
    await setLoading(false);
  };

  function renderComment() {
    return (
      <React.Fragment>
        <Accordion.Item eventKey={props.commentId}>
          <Accordion.Header>
            <div className="col-2">User: {props.user}</div>
            <div className="col-3">On: {props.posted}</div>
            <div className="col-6 text-center">{props.body}</div>
            <div className="col-1"></div>
          </Accordion.Header>
          <Accordion.Body>
            {replies.map((reply) => (
              <Reply
                key={reply.id}
                user={reply.user_id}
                posted={dateFormat(reply.posted, "ddd mmm dd yyyy HH:MM TT Z")}
                body={reply.body}
              />
            ))}
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowNewReply(!showNewReply)}
              hidden={!auth.jwt}
            >
              Reply
            </button>
            {showNewReply && auth.jwt ? renderAddReply() : null}
          </Accordion.Body>
        </Accordion.Item>
      </React.Fragment>
    );
  }

  return renderComment();
};

export default Comment;
