import React, { useEffect, useState } from "react";
import { defaultGetRequest as getData } from "../../static/main";
import { protectedEnpointPostRequest as postComment } from "../../static/main";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";
import useAPI from "../useAPI/useAPI";
import { Form, FormControl, Button, Accordion } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Comment from "../Comment/Comment";
import dateFormat from "dateformat";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionItem from "react-bootstrap/esm/AccordionItem";

const Post = (props) => {
  const { values, handleChange, handleSubmit } = useForm(submitComment);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchComments, setFetchComments] = useState(true);
  const auth = useAuth();
  const api = useAPI();
  const [showNewComment, setShowNewComment] = useState(false);

  useEffect(() => {
    if (fetchComments) {
      getComments();
    }
  }, [fetchComments]);

  useEffect(() => {
    renderPost();
  }, [comments]);

  async function submitComment() {
    const newComment = { body: values.commentBody };
    const response = await postComment(
      `${api.url}projects/comments/update/${props.postId}`,
      newComment,
      auth.jwt
    );
    if (response) {
      await setShowNewComment(false);
      await setLoading(true);
      await setFetchComments(true);
    }
  }

  function renderAddComment() {
    return (
      <Form className="d=flex" onSubmit={handleSubmit}>
        <FormControl
          type="text"
          name="commentBody"
          value={values.commentBody || ""}
          onChange={handleChange}
          placeholder="Type comment here"
          className="me-2"
          aria-label="comment-body"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
  const getComments = async () => {
    const commentsResponse = await getData(
      `${api.url}projects/comments/${props.postId}`
    );
    if (commentsResponse) {
      await setComments(commentsResponse.data);
    }
    await setFetchComments(false);
    await setLoading(false);
  };

  function renderPost() {
    return (
      <React.Fragment>
        <Card>
          <Card.Header>{props.posted}</Card.Header>
          <Card.Img variant="top" src={"/static/img/samplepost.jpeg"} />
          <Card.Body>
            <Card.Text>{props.body}</Card.Text>
          </Card.Body>
        </Card>
        <div className="comments">
          <Button
            type="button"
            className="mt-3 mb-3"
            onClick={() => setShowNewComment(!showNewComment)}
            hidden={showNewComment || !auth.jwt}
          >
            Add A Comment
          </Button>
          <Accordion defaultActiveKey={props.postId}>
            <AccordionItem eventKey={props.postId}>
              <AccordionHeader>
                <h4>Comments</h4>
              </AccordionHeader>
              <AccordionBody>
                {showNewComment && auth.jwt ? renderAddComment() : null}
                <Accordion defaultActiveKey="0">
                  {comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      user={comment.user_id}
                      posted={dateFormat(comment.posted, "ddd mmm dd yyyy HH:MM TT Z")}
                      body={comment.body}
                      commentId={comment.id}
                      toggleFetchComments={() =>
                        setFetchComments(!fetchComments)
                      }
                    ></Comment>
                  ))}
                </Accordion>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </React.Fragment>
    );
  }

  return renderPost();
};

export default Post;
