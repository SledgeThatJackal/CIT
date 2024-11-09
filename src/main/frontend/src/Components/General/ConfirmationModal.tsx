import React from "react";

import { Modal, Button } from "react-bootstrap";

type ConfirmationModalProp = {
  show: boolean;
  handleClose: () => void;
  onDelete?: () => void;
  message?: string;
};

const ConfirmationModal = (props: ConfirmationModalProp) => {
  const { show, handleClose, onDelete, message } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            onDelete && onDelete();

            handleClose();
          }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
