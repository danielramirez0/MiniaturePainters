import React, { useEffect, useState } from "react";
import { defaultGetRequest as getData } from "../../static/main";
import useAuth from "../useAuth/useAuth";
import useAPI from "../useAPI/useAPI";
import { ListGroup, Spinner, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Painter = () => {
  const [painter, setPainter] = useState([]);
  const [projects, setProjects] = useState([]);
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { painterId } = useParams();

  useEffect(() => {
    getPainter();
    getProjects();
    setLoading(false);
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

  const followPainter = async () => {
      const response = await postFollow(`${api.url}`)
  }

  const getProjects = async () => {
    const response = await getData(`${api.url}projects/user/?id=${painterId}`);
    if (response) {
      await setProjects(response.data);
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
        {auth.jwt && (
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
