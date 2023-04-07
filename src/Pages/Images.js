import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Modal, Form, Button } from "react-bootstrap";
import ImageList from "../Components/ImageList";

const Images = () => {
  return (
    <div>
      <h1>YO</h1>
      <ImageList event="photos" />;
    </div>
  );
};

export default Images;
