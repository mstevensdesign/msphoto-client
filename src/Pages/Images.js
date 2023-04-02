import { useState, useEffect } from "react";
import { Container, Image, Modal, Form, Button } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Images = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(
        "http://127.0.0.1:5001/mikestevensphoto-c810c/us-central1/app/images"
      );
      const data = await response.json();
      setImages(data);
    }
    fetchImages();
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

  const handleSendEmail = () => {
    alert(`Email ${email} sent for image ${selectedImage.metadata.name}`);
    handleCloseModal();
  };

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {images.map((image) => (
            <div
              key={image.metadata.name}
              onClick={() => handleOpenModal(image)}
            >
              <Image fluid src={image.url} alt={image.metadata.name} />
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
                placeholder="Enter email"
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
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Images;
