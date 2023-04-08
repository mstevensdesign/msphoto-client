import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { Button, Container, Form, Col, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { auth } from "../Config/firebase-config";
const provider = new GoogleAuthProvider();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]); // get favs from api
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchFavorites() {
      const response = await fetch(
        "http://127.0.0.1:5001/mikestevensphoto-c810c/us-central1/app/favorites?email=mikestevensdesign@gmail.com"
      );
      const data = await response.json().then((e) => {
        setFavorites(e);
        console.log(e);
      });
    }
    fetchFavorites();
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <h1>Profile</h1>
            <Form>
              <Form.Group controlId="displayName">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={user?.displayName ?? ""}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={user?.email ?? ""} />
              </Form.Group>
            </Form>
            {user ? (
              <Button onClick={signOutUser} disabled={loading}>
                {loading ? "Loading..." : "Sign out"}
              </Button>
            ) : (
              <Button onClick={signInWithGoogle} disabled={loading}>
                {loading ? "Loading..." : "Sign in with Google"}
              </Button>
            )}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <h2>Favorites</h2>
            {favorites.map((image) => (
              <div key={image}>
                <Image fluid src={image} />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
