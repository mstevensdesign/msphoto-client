import {
  Container,
  Nav,
  Navbar,
  Image,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { auth } from "../Config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function ImageList({ event }) {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(
        "http://127.0.0.1:5001/mikestevensphoto-c810c/us-central1/app/images/" +
          event
      );
      const data = await response.json().then((e) => setImages(e));
    }
    fetchImages();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    const message = "Howdy There!  Here's your photo!";
    try {
      const response = await fetch(
        "http://127.0.0.1:5001/mikestevensphoto-c810c/us-central1/app/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `email=${email}&message=${message}&url=${selectedImage.url}`,
        }
      );
      const data = await response.json().then(setIsSending(false));
      alert(data.message);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert("Error sending email");
    }
  };

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {images.map((image) => (
            <div key={image.url} onClick={() => handleOpenModal(image)}>
              <Image fluid src={image.url} />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Send Email for {selectedImage?.metadata?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={selectedImage?.url} thumbnail />
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={(user && user.email) || "Your Email"}
                value={email}
                onChange={handleEmailChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendEmail}>
            {isSending ? "Sending..." : "Send"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ImageList;
