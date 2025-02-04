import { useModalState } from "@hooks/state/useModalState";
import React from "react";

import { Modal, Button } from "react-bootstrap";

const GenericModal = () => {
  const {
    showModal,
    title,
    buttonLabel,
    message,
    component: ComponentToRender,
    variant = "danger",
    onDelete,
    closeModal,
  } = useModalState();

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(message && message) || (ComponentToRender && <ComponentToRender />)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>

        <Button
          variant={variant}
          onClick={() => {
            if (onDelete) onDelete();

            closeModal();
          }}>
          {buttonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenericModal;
