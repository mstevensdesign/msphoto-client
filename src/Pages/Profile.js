import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";

import firebaseApp from "../Config/firebase-config";
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

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
      </Container>
    </div>
  );
};

export default Login;
