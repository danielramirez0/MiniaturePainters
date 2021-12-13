import { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../useAuth/useAuth";
import logo from "../../static/logo.png";
import "./topnav.css";

const TopNav = () => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.jwt) {
      localStorage.getItem("token");
    }
  }, []);

  useEffect(() => {
    renderNav();
  }, [auth]);

  function renderNav() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="mt-4 mb-4"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">
              Home
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {auth.jwt ? (
                <Link to="dashboard/projects" className="nav-link">
                  My Projects
                </Link>
              ) : null}
              <NavDropdown title="Explore" id="collasible-nav-dropdown">
                <NavDropdown.Item as="li">
                  <Link to="explore/painters" className="dropdown-item">
                    Painters
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="explore/projects" className="dropdown-item">
                    Projects
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="explore/games" className="dropdown-item">
                    Games
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as="li">
                  <Link to="dashboard/projects/new" className="dropdown-item">
                    Start a project!
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Learn" id="collasible-nav-dropdown">
                <NavDropdown.Item as="li">
                  <Link to="learn/basics" className="dropdown-item">
                    Basics
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item as="li">
                  <Link to="learn/advanced" className="dropdown-item">
                    Advanced
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as="li">
                  <Link to="learn" className="dropdown-item">
                    Learn how to paint!
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Item as="li">
                {!auth.jwt ? (
                  "Login for more features!"
                ) : (
                  <Link to="dashboard" className="nav-link">
                    My Dashboard
                  </Link>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return renderNav();
};

export default TopNav;
