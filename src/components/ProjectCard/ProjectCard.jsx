import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";

const ProjectCard = (props) => {
  const navigate = useNavigate();

  return (
    <div className="col">
      <Card style={{ width: "18rem" }} className="m-auto">
        <Card.Img variant="top" src="/static/img/project.jpg" />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>By: {props.user_id}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Started: {dateFormat(props.start_date)}</ListGroupItem>
          <ListGroupItem>Game: {props.game}</ListGroupItem>
          <ListGroupItem>Progress: {props.progress}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button onClick={() => navigate(`/explore/projects/${props.id}`)}>
            See Details
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectCard;
