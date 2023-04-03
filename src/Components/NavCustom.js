import { Container, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import { NavLink as Link } from "react-router-dom";

//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/firebase-config";

function NavCustom() {
  const [currentUser, setCurrentUser] = useState(null);

  // listen for changes to the user's authentication state
  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MSPHOTO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link eventKey="1" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/events">
              Events
            </Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/images">
              Images
            </Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <Nav.Link eventKey="4" as={Link} to="/profile">
                Profile
              </Nav.Link>
            ) : (
              <Nav.Link eventKey="4" as={Link} to="/login">
                Log In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavCustom;
