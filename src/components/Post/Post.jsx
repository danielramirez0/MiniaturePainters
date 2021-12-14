import React, { useEffect, useState } from "react";
import { defaultGetRequest as getData } from "../../static/main";
import useAuth from "../useAuth/useAuth";
import useAPI from "../useAPI/useAPI";
import { ListGroup, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Comment from "../Comment/Comment";
import dateFormat from "dateformat";

const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const api = useAPI();
  const { projectId } = useParams();

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    renderPost();
  }, [comments]);

  const getComments = async () => {
    const commentsResponse = await getData(
      `${api.url}projects/comments/${projectId}`
    );
    if (commentsResponse) {
      await setComments(commentsResponse.data);
    }
    setLoading(false);
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
            <h4>Comments</h4>
          {comments.map((comment) => (
            <Comment
              user={comment.user_id}
              posted={dateFormat(comment.posted)}
              body={comment.body}
            ></Comment>
          ))}
        </div>
      </React.Fragment>
    );
  }

  return renderPost();
};

export default Post;
