import { useEffect, useState } from "react";
import { defaultGetRequest as getData } from "../../static/main";
import useAuth from "../useAuth/useAuth";
import useAPI from "../useAPI/useAPI";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../ProjectCard/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    renderProjects();
  }, [projects]);

  const getProjects = async () => {
    const response = await getData(`${api.url}projects/`);
    if (response) {
      await setProjects(response.data);
      setLoading(false);
    }
  };

  function renderProjects() {
    return projects.map((project) => (
      <ProjectCard
        name={project.name}
        user_id={project.user_id}
        start_date={project.start_date}
        game={project.game}
        progress={project.progress}
      />
    ));
  }

  return renderProjects();
};

export default Projects;
