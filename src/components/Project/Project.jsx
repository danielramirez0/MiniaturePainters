import React, { useEffect, useState } from "react";
import { defaultGetRequest as getData } from "../../static/main";
import useAuth from "../useAuth/useAuth";
import useAPI from "../useAPI/useAPI";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import Post from "../Post/Post";

const Project = () => {
  const [posts, setPosts] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const api = useAPI();
  const { projectId } = useParams();

  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    renderProject();
  }, [posts, details]);

  const getProject = async () => {
    const detailResponse = await getData(
      `${api.url}projects/user/?unique=true&projectId=${projectId}`
    );
    if (detailResponse) {
      await setDetails(detailResponse.data);
    }
    const postsResponse = await getData(
      `${api.url}projects/posts/${projectId}`
    );
    if (postsResponse) {
      await setPosts(postsResponse.data);
    }
    setLoading(false);
  };

  function renderProject() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <p>Name</p>
            <h1>{details.name}</h1>
          </div>
          <div className="col">
            <p>Started on</p>
            <h3>{dateFormat(details.start_date)}</h3>
          </div>
          <div className="col">
            <p>Status</p>
            <h3>{details.progress}</h3>
          </div>
          <div className="col">
            <p>Likes</p>
            <h3>{details.likes}</h3>
          </div>
        </div>
        <div className="row">
          <p>{details.description}</p>
        </div>
        {posts.map((post)=>(
            <Post posted={dateFormat(post.posted)} body={post.body}></Post>
        ))}
      </React.Fragment>
    );
  }

  return renderProject();
};

export default Project;
