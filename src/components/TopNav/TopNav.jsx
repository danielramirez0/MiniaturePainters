import { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../useAuth/useAuth";

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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Miniature Painters</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {auth.jwt ? (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
              <NavDropdown title="Explore" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/explore/painters">
                  Painters
                </NavDropdown.Item>
                <NavDropdown.Item href="/explore/projects">
                  Projects
                </NavDropdown.Item>
                <NavDropdown.Item href="/explore/games">Games</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/projects/new">
                  Start a project!
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Learn" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/learn/basics">Basics</NavDropdown.Item>
                <NavDropdown.Item href="/learn/advanced">
                  Advanced
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/learn">
                  Get started learning!
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/myjourney" disabled={!auth.jwt ? true : false}>
                {!auth.jwt ? "Login for more features!" : "My Palet"}
              </Nav.Link>
              {auth.jwt ? <Nav.Link href="/logoff">Logoff</Nav.Link> : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return renderNav();
};

export default TopNav;
