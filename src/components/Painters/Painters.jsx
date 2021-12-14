import React, { useEffect, useState } from "react";
import { defaultGetRequest as getData } from "../../static/main";
import useAuth from "../useAuth/useAuth";
import useAPI from "../useAPI/useAPI";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import dateFormat from "dateformat";
import { Outlet, useNavigate } from "react-router-dom";

const Painters = () => {
  const [painters, setPainters] = useState([]);
  const auth = useAuth();
  const api = useAPI();
  const from = window.location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPainters();
  }, []);

  useEffect(() => {
    renderPainters();
  }, [painters]);

  const getPainters = async () => {
    const response = await getData(`${api.url}painters/`);
    if (response) {
      await setPainters(response.data);
      setLoading(false);
    }
  };

  function renderPainters() {
    return (
      <React.Fragment>
        {painters.map((painter) => (
          <div className="col">
            <Card style={{ width: "18rem" }} className="m-auto">
              <Card.Img variant="top" src="/static/img/avatar.jpg" />
              <Card.Body>
                <Card.Title>{painter.username}</Card.Title>
                <Card.Text>I'm a painter!</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Joined: {dateFormat(painter.date_joined)}
                </ListGroupItem>
                <ListGroupItem>
                  Experience: {painter.years_experience} years
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button
                  onClick={() => navigate(`/explore/painters/${painter.id}`)}
                >
                  See Projects
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </React.Fragment>
    );
  }

  return renderPainters();
};

export default Painters;
