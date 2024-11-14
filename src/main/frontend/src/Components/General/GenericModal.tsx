import { useModalState } from "@hooks/state/useModalState";
import React from "react";

import { Modal, Button } from "react-bootstrap";

const GenericModal = () => {
  const { showModal, message, onDelete, closeModal } = useModalState();

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            onDelete && onDelete();

            closeModal();
          }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenericModal;
