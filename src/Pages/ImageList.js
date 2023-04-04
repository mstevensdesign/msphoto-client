import { useState, useEffect } from "react";
import {
  Container,
  Image,
  Modal,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("");
  const [hoveredImage, setHoveredImage] = useState(null);

  const overlayStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
    color: "#fff",
    fontSize: "1.5rem",
    transition: "opacity 0.25s ease-in-out",
  };

  const buttonStyle = {
    margin: "0.5rem",
  };

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

  const handleSendEmail = async () => {
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
      const data = await response.json();
      alert(data.message);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert("Error sending email");
    }
  };

  const handleImageHover = (event, image) => {
    setHoveredImage(image);
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {images.map((image) => (
            <div
              key={image.url}
              onMouseEnter={(event) => handleImageHover(event, image)}
              onMouseLeave={handleImageLeave}
              onClick={() => handleOpenModal(image)}
              style={{ position: "relative" }}
            >
              <Image fluid src={image.url} />
              {hoveredImage === image && (
                <div
                  style={{
                    ...overlayStyle,
                    opacity: "1",
                  }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <Button
                      style={{ ...buttonStyle, backgroundColor: "gray" }}
                      onClick={() => alert(`Added to favorites: ${image.url}`)}
                    >
                      Favorite
                    </Button>
                    <Button
                      style={buttonStyle}
                      onClick={() => handleOpenModal(image)}
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image fluid src={selectedImage?.url} />
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendEmail}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageList;
