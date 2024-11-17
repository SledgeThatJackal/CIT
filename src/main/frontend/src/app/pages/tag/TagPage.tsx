import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  FormControl,
  Form,
  Stack,
} from "react-bootstrap";

import { Tag } from "@schema/Tag";
import ConfirmationModal from "@components/general/ConfirmationModal";
import TagRead from "@tag/components/TagRead";
import TagForm from "@tag/components/TagForm";
import { useDeleteTag } from "@services/mutations";
import { useTags } from "@services/queries";

function TagSettings() {
  const tagsQuery = useTags().data;
  const deleteTagMutations = useDeleteTag();

  // Modal
  const [show, setShow] = useState<boolean>(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [deleteTagId, setDeleteTagId] = useState<number>(-1);

  // Creation Area
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [bulkCreating, setBulkCreating] = useState<boolean>(false);
  const closeCreate = () => setShowCreate(false);

  // Edit Area
  const [editId, setEditId] = useState<number>(-1);
  const closeEdit = () => setEditId(-1);

  // Search
  const [search, setSearch] = useState<string>("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (tagsQuery) {
      setFilteredTags(
        tagsQuery.filter((tag) =>
          tag.tag.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [tagsQuery, search]);

  const onCreate = () => {
    if (!bulkCreating) {
      closeCreate();
    }
  };

  const onEdit = () => {
    closeEdit();
  };

  const handleDelete = () => {
    deleteTagMutations.mutate(deleteTagId);
  };

  return (
    <React.Fragment>
      <ConfirmationModal
        show={show}
        handleClose={handleClose}
        onDelete={handleDelete}
        message={"Are you sure you want to delete this tag?"}
      />
      <Container fluid>
        <Row>
          <h2>Tags</h2>
        </Row>
        <Row>
          <hr />
        </Row>
        <Row className="mx-auto justify-content-center w-75 mb-3">
          <Col>
            <FormControl
              type="text"
              className="w-75"
              aria-label="Search"
              id="searchInput"
              placeholder="Search..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}></FormControl>
          </Col>
          <Col
            as={Stack}
            direction="horizontal"
            gap={2}
            className="d-flex justify-content-end">
            <Button
              variant="success"
              onClick={() => setShowCreate(true)}
              disabled={showCreate}>
              Create
            </Button>
            <Form.Switch
              className="my-auto"
              id="bulkSwitch"
              label="Bulk Create"
              onChange={() => setBulkCreating(!bulkCreating)}
              disabled={!showCreate}
            />
          </Col>
        </Row>
        {showCreate && (
          <TagForm closeCreate={closeCreate} onCreate={onCreate} />
        )}
      </Container>
      <Container
        fluid
        className="rounded bg-dark text-white mt-3 w-75 overflow-auto shadow"
        style={{ height: "65vh", border: "3px solid #7B8895" }}>
        <Row className="p-3">
          Tags: {filteredTags.length || 0} out of {tagsQuery?.length || 0}
        </Row>
        {filteredTags.length > 0 ? (
          filteredTags
            .sort()
            .map((tag, index) => (
              <React.Fragment key={`tagRow-${tag.id}`}>
                {editId === tag.id ? (
                  <TagForm tag={tag} onEdit={onEdit} closeEdit={closeEdit} />
                ) : (
                  <TagRead
                    index={index}
                    tag={tag}
                    setDeleteTagId={setDeleteTagId}
                    handleOpen={handleOpen}
                    setEditId={setEditId}
                  />
                )}
              </React.Fragment>
            ))
        ) : (
          <Row
            className="text-center"
            style={{
              background: "#4B555F",
              borderTop: "3px solid #7B8895",
              borderBottom: "3px solid #7B8895",
            }}>
            <h4>No tags found.</h4>
          </Row>
        )}
      </Container>
    </React.Fragment>
  );
}

export default TagSettings;
