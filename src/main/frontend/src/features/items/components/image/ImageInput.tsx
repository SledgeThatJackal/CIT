import GenericMenu from "@components/general/GenericMenu";
import { ImageType } from "@schema/Image";
import React, { useRef } from "react";
import {
  Button,
  CloseButton,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";

type ImageInputType<T extends ImageType> = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onRemove: (index: number) => void;
  handleAdd: (element: T) => void;
  handleRemove: (element: T) => void;
  data: T[];
  buttonWidth: number;
};

const ImageInput = <T extends ImageType>({
  onChange,
  onRemove,
  handleAdd,
  handleRemove,
  data,
  buttonWidth,
}: ImageInputType<T>) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="p-0">
          <Form.Control
            type="file"
            onChange={onChange}
            multiple
            accept="image/*"
            style={{ display: "none" }}
            ref={fileUploadRef}
          />
          <InputGroup
            title={data.length < 1 ? "No file chosen" : `${data.length} files`}>
            <Button
              variant="secondary"
              id="customFileInput"
              style={{ width: `${buttonWidth}%` }}
              onClick={handleButtonClick}>
              Choose File(s)
            </Button>
            <InputGroup.Text
              as="label"
              htmlFor="customFileInput"
              style={{ cursor: "pointer", width: `${100 - buttonWidth * 2}%` }}>
              {data.length < 1 ? "No file chosen" : `${data.length} files`}
            </InputGroup.Text>

            <Dropdown drop="start">
              <Dropdown.Toggle
                className="ms-0 pe-1"
                variant="light"
                size="sm"
                style={{ width: `${buttonWidth}%`, border: "none" }}>
                Existing
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="p-2 w-75"
                style={{ maxHeight: "30vh", overflowY: "auto" }}>
                <GenericMenu
                  currentData={data}
                  type="Image"
                  filterProperty="fileName"
                  addObject={handleAdd}
                  removeObject={handleRemove}
                  Component={ImageRow}
                />
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Col>
      </Row>
      {data.map((field, index) => (
        <Row key={`image-${field.id}`} className="pb-2 pt-2">
          <Col as={Stack} direction="horizontal" gap={2}>
            <CloseButton onClick={() => onRemove(index)} />
            <div className="text-dark">{field.fileName}</div>
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
};

const ImageRow = (image: ImageType) => {
  return <span>{image.fileName}</span>;
};

export default ImageInput;
