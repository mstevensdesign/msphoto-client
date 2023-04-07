import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Modal, Form, Button } from "react-bootstrap";
import ImageList from "../Components/ImageList";

// console.log(event_id);

const Images = () => {
  const { event_id } = useParams();

  return (
    <div>
      <h1>{event_id}</h1>
      <ImageList event={event_id} />
    </div>
  );
};

export default Images;
