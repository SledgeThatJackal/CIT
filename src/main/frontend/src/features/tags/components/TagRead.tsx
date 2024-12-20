import React from "react";
import { Row, Col, InputGroup, Button, Stack } from "react-bootstrap";

import TagBadge from "./TagBadge";
import { Tag } from "@schema/Tag";

type TagReadProps = {
  index: number;
  tag: Tag;
  setDeleteTagId: React.Dispatch<React.SetStateAction<number>>;
  handleOpen: () => void;
  setEditId: React.Dispatch<React.SetStateAction<number>>;
};

const TagRead = ({
  index,
  tag,
  setDeleteTagId,
  handleOpen,
  setEditId,
}: TagReadProps) => {
  const setupDelete = () => {
    setDeleteTagId(tag.id);
    handleOpen();
  };

  return (
    <Row
      key={`tagRow-${index}`}
      className="text-light pt-3 pb-3"
      style={{
        background: "#4B555F",
        borderTop: "3px solid #7B8895",
        borderBottom: "3px solid #7B8895",
      }}>
      <Col className="d-flex align-items-center me-auto">
        <Stack direction="horizontal" gap={1}>
          <TagBadge {...tag} />
          <div>: {tag.description}</div>
        </Stack>
      </Col>
      <Col>
        <InputGroup className="d-flex justify-content-end">
          <Button
            type="button"
            variant="info"
            onClick={() => setEditId(tag.id)}>
            Edit
          </Button>
          <Button type="button" variant="danger" onClick={setupDelete}>
            Delete
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default TagRead;
