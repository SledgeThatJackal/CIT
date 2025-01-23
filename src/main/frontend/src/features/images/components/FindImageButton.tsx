import { Container } from "react-bootstrap";
import React from "react";
import { useImageFinds } from "../services/query";

const FindImageButton = () => {
  const imageFindsQuery = useImageFinds({ scannerId: "0F" }).data;

  return (
    <React.Fragment>
      <Container fluid>
        {imageFindsQuery &&
          imageFindsQuery.map((image, index) => (
            <div key={`imageFind-${image.scannerId}-${index}`}>
              {image.fileName}
            </div>
          ))}
      </Container>
    </React.Fragment>
  );
};

export default FindImageButton;
