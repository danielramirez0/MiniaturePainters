import React, { useEffect, useState } from "react";
import {
  Button,
  ToastContainer,
  Toast,
  Navbar,
  Container,
  Form,
  FormControl,
  Accordion,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../useForm/useForm";
import useAPI from "../useAPI/useAPI";
import useAuth from "../../components/useAuth/useAuth";
import Reply from "../Reply/Reply";
import { defaultGetRequest as getData } from "../../static/main";

const Comment = (props) => {
  const { values, handleChange, handleSubmit } = useForm(submitReply);
  const [showNewReply, setShowNewReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/";

 
  function submitReply() {
      return
  }

 

  const getReplies = async () => {
    const response = await getData(
      `${api.url}projects/comments/${props.commentId}`
    );
    if (response) {
      await setReplies(response.data);
    }
    setLoading(false);
  };

  function renderComment() {
    return (
      <React.Fragment>
        <Accordion.Item eventKey={props.commentId}>
          <Accordion.Header>
            <div className="col-1">User: {props.user}</div>
            <div className="col-1">On: {props.posted}</div>
            <div className="col-8 text-center">{props.body}</div>
            <div className="col-1">
              <Button
                type="button"
                onClick={() => setShowNewReply(true)}
                hidden={!auth.jwt}
              >
                Reply
              </Button>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {replies.map((reply) => (
              <Reply
                user={reply.user}
                posted={reply.posted}
                body={reply.body}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </React.Fragment>
    );
  }

  return renderComment();
};

export default Comment;
