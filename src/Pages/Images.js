import { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";

const Images = () => {
  const [images, setImages] = useState([]);

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

  return (
    <Container>
      {images.map((image) => (
        <Image fluid src={image.url} alt={image.metadata.name} />
      ))}
    </Container>
  );
};

export default Images;
