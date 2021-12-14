import { useEffect, useState } from "react";
import { defaultGetRequest as getData } from "../../static/main";
import useAuth from "../useAuth/useAuth";
import useAPI from "../useAPI/useAPI";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../ProjectCard/ProjectCard";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [dummyData, setDummyData] = useState([]);
  const [painters, setPainters] = useState([]);
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      getProjects();
      getPainters();
    }
  }, [userDetails]);

  useEffect(() => {
    renderProjects();
  }, [projects]);

  useEffect(() => {
    if (auth.jwt) {
      decodeJWT();
    }
  }, [auth.jwt]);

  function decodeJWT() {
    if (auth.jwt) {
      setUserDetails(jwtDecode(auth.jwt));
    }
  }

  const getProjects = async () => {
    const response = await getData(
      `${api.url}projects/user/?id=${userDetails.user_id}`
    );
    if (response) {
      await setProjects(response.data);
      setLoading(false);
    }
  };

  const getPainters = async () => {
    const response = await getData(`${api.url}painters/`);
    if (response) {
      await setPainters(response.data);
      setLoading(false);
    }
  };

  function renderProjects() {
    return (
      <div className="">
        <div className="row mt-4 mb-4">
          <h4>My Projects</h4>
          <ListGroup>
            {projects.map((project) => (
              <ListGroup.Item
                key={project.id}
                action
                onClick={() => navigate(`/explore/projects/${project.id}`)}
              >
                <div className="row">
                  <div className="col">{project.name}</div>
                  <div className="col">{project.likes} Likes</div>
                </div>
              </ListGroup.Item>
            ))}
            <Button className="btn btn-secondary">Add New Project</Button>
          </ListGroup>
        </div>
        <div className="row mt-4 mb-4">
          <h4>Watched Projects</h4>
          <ListGroup>
            {dummyData.map((project) => (
              <ListGroup.Item
                key={project.id}
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
        </div>
        <div className="row">
          <h4>Followed Painters</h4>
          <ListGroup>
            {painters.map((painter) => (
              <ListGroup.Item
                key={painter.id}
                action
                onClick={() => navigate(`/explore/painters/${painter.id}`)}
              >
                <div className="row">
                  <div className="col">{painter.username}</div>
                  <div className="col">
                    {painter.years_experience} years experience
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }

  return renderProjects();
};

export default Dashboard;
