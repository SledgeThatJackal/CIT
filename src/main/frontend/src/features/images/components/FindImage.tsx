import {
  Button,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useImageFinds, useImageFindsTotal } from "../services/query";

import "../styles/FindImage.css";
import { NavLink } from "react-router-dom";

const FindImage = () => {
  const [filters, setFilters] = useState({
    containerName: "",
    scannerId: "",
    itemName: "",
  });

  const [fetch, setFetch] = useState<boolean>(false);

  const imageFindsQuery = useImageFinds({ filters, fetch }).data;
  const imageFindsTotal = useImageFindsTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    setFetch(true);

    setTimeout(() => {
      setFetch(false);
    }, 0);
  };

  useEffect(() => handleClick(), []);

  return (
    <Container fluid className="mt-2 w-75 find-container bg-dark">
      <Container className="text-light p-0 m-0 pb-2">{`Displaying ${imageFindsQuery?.length || 0} out of ${imageFindsTotal.data || 0} Images`}</Container>
      <Container fluid className="p-0">
        <InputGroup>
          <FloatingLabel
            label={"Container Name"}
            controlId="floatingContainerName">
            <Form.Control
              type="text"
              name="containerName"
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel label={"Barcode ID"} controlId="floatingScannerId">
            <Form.Control
              type="text"
              name="scannerId"
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel label={"Item Name"} controlId="floatingItemName">
            <Form.Control type="text" name="itemName" onChange={handleChange} />
          </FloatingLabel>
          <Button onClick={handleClick}>Search</Button>
        </InputGroup>
      </Container>
      <Container fluid className="image-container">
        {imageFindsQuery &&
          imageFindsQuery[0]?.scannerId &&
          imageFindsQuery?.map((image, index) => (
            <div
              key={`imageFind-${image.scannerId}-${index}`}
              className="image-div text-center"
              title={image.scannerId}>
              <label>{image.scannerId}</label>
              <NavLink to={`/container/${image.scannerId}`}>
                <img
                  src={`/api/image/${image.fileName}`}
                  alt={`Image-${image.fileName}`}
                  width={"100px"}
                  height={"100px"}
                />
              </NavLink>
            </div>
          ))}
      </Container>
    </Container>
  );
};

export default FindImage;
