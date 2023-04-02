import { useState, useEffect } from "react";
import { Container, Image, Modal, Form, Button } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useParams } from "react-router-dom";

const Images = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [email, setEmail] = useState("");
  const { filename } = useParams();

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(
        "http://127.0.0.1:5001/mikestevensphoto-c810c/us-central1/app/images/" +
          filename
      );
      const data = await response.json();
      setImages(data);
    }
    fetchImages();
  }, []);

  // console.log(filename);
  console.log(images);

  return (
    <>
      <Image fluid src={images.url} />
    </>
  );
};

export default Images;
