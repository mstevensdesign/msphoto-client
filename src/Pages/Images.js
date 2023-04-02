import { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>
        {images.map((image) => (
          <Image fluid src={image.url} alt={image.metadata.name} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default Images;
