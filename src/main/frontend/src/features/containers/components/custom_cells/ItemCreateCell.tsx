import ButtonCell from "@components/custom_cell_renderers/ButtonCell";
import { ContainerType } from "@container/schemas/Container";
import { DisplayCell } from "@schema/General";
import React, { createContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ItemCreate from "@container/components/zip_create/ItemCreate";
import { ContainerImageType } from "@schema/Image";

import "../../styles/ItemCreateModal.css";

type ContainerContextType = {
  container: ContainerType;
  selectedImages: ContainerImageType[];
  setSelectedImages: React.Dispatch<React.SetStateAction<ContainerImageType[]>>;
};

export const ContainerContext = createContext<ContainerContextType | undefined>(
  undefined,
);

const ItemCreateCell = ({ row }: DisplayCell<ContainerType>) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setComponentToggle(false), 150);
  };

  const [componentToggle, setComponentToggle] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<ContainerImageType[]>(
    [],
  );

  return (
    <React.Fragment>
      <ButtonCell
        title="Item Create"
        color="info"
        handleClick={openModal}
        isDisabled={
          row.original.images === undefined || row.original.images?.length < 1
        }>
        <i className="bi bi-link" />
      </ButtonCell>
      <Modal
        show={showModal}
        onHide={closeModal}
        size="xl"
        dialogClassName="image-modal">
        <Modal.Header closeButton closeVariant="white" className="shadow">
          <Modal.Title>Item Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContainerContext.Provider
            value={{
              container: row.original,
              selectedImages,
              setSelectedImages,
            }}>
            {componentToggle ? <div>Item Create</div> : <ItemCreate />}
          </ContainerContext.Provider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="info"
            onClick={() => setComponentToggle(!componentToggle)}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ItemCreateCell;
