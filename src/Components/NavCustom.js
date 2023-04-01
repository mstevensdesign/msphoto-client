import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { Routes, Route, NavLink as Link } from "react-router-dom";

function NavCustom() {
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavCustom;
