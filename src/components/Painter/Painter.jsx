import React, { useEffect, useState } from "react";
import {
  defaultGetRequest as getData,
  protectedEnpointPostRequest as postFollow,
  protectedEnpointDeleteRequest as postUnfollow,
  protectedEnpointGetRequest as getIsFollowing,
} from "../../static/main";

import useAuth from "../useAuth/useAuth";
import useAPI from "../useAPI/useAPI";
import { ListGroup, Spinner, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Painter = () => {
  const [painter, setPainter] = useState([]);
  const [projects, setProjects] = useState([]);
  const [following, setFollowing] = useState(false);
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { painterId } = useParams();

  useEffect(() => {
    getPainter();
    checkIsFollowing();
    getProjects();
  }, []);

  useEffect(() => {
    renderPainter();
  }, [painter, projects]);

  const getPainter = async () => {
    const response = await getData(`${api.url}painters/${painterId}`);
    if (response) {
      await setPainter(response.data);
    }
  };

  const getProjects = async () => {
    const response = await getData(`${api.url}projects/user/?id=${painterId}`);
    if (response) {
      await setProjects(response.data);
    }
  };

  const checkIsFollowing = async () => {
    const response = await getIsFollowing(
      `${api.url}painters/follow/${painterId}`,
      auth.jwt
    );
    if (response) {
      if (response.data.length === 1) {
        await setFollowing(true);
      } else {
        await setFollowing(false);
      }
    }
  };

  const followPainter = async () => {
    const response = await postFollow(
      `${api.url}painters/follow/${painterId}`,
      {},
      auth.jwt
    );
    if (response) {
      await setFollowing(true);
    }
  };

  const unfollowPainter = async () => {
    const response = await postUnfollow(
      `${api.url}painters/unfollow/${painterId}`,
      auth.jwt
    );
    if (response) {
      await setFollowing(false);
    } else {
      console.log("Error during unfollow");
    }
  };

  function renderLoading() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  function renderPainter() {
    return (
      <React.Fragment>
        {auth.jwt && following ? (
          <button className="btn btn-link" onClick={() => unfollowPainter()}>
              Unfollow
          </button>
        ) : (
          <button className="btn btn-link" onClick={() => followPainter()}>
              Follow
          </button>
        )}
        <h1>{painter.username}'s Projects</h1>
        <ListGroup>
          {projects.map((project) => (
            <ListGroup.Item
              action
              onClick={() => navigate(`/explore/projects/${project.id}`)}
            >
              <div className="row">
                <div className="col">{project.name}</div>
                <div className="col">{project.likes} Likes</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }

  return loading ? renderLoading() : renderPainter();
};

export default Painter;
