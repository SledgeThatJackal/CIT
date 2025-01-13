import React, { createContext, useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CreateBox from "@item/components/CreateBox";
import ItemCreate from "./ItemCreate";
import { useActionState } from "@item/hooks/useActionState";
import { ContainerImageType } from "@schema/Image";
import { createImagesArray, createItem } from "./ItemCreation";
import { ContainerType } from "@container/schemas/Container";
import { useZipCreateState } from "@container/hooks/useZipCreateState";
import { useDeleteContainerImageLink } from "@container/services/mutation";

type ContainerContextType = {
  container: ContainerType;
  selectedImages: ContainerImageType[];
  setSelectedImages: React.Dispatch<React.SetStateAction<ContainerImageType[]>>;
};

export const ContainerContext = createContext<ContainerContextType | undefined>(
  undefined,
);

const ZipCreateModal = () => {
  const { updateItemAction } = useActionState();
  const { row, showModal, closeModal } = useZipCreateState();
  const deleteContainerImageLinkMutation = useDeleteContainerImageLink();

  const [componentToggle, setComponentToggle] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<ContainerImageType[]>(
    [],
  );

  const container = useMemo(() => row?.original, [row]);

  const handleRowChange = () => {
    if (!container) return;

    const images = createImagesArray(selectedImages);
    const item = createItem(container, images);

    updateItemAction(item);
  };

  const handleClick = () => {
    handleRowChange();
    setComponentToggle(true);
  };

  const handleLinkDelete = () => {
    if (
      !container?.images ||
      container?.images?.length < 1 ||
      selectedImages.length < 1
    )
      return;

    const images = selectedImages.map((image) => ({
      id: image.id || -1,
    }));

    deleteContainerImageLinkMutation.mutate(images);
  };

  useEffect(() => {
    setSelectedImages([]);
    setComponentToggle((container?.images?.length ?? 0) < 1);
    handleRowChange();
  }, [row]);

  if (!container) return;

  return (
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
            container: container,
            selectedImages,
            setSelectedImages,
          }}>
          {componentToggle ? (
            <CreateBox afterSubmit={handleLinkDelete} />
          ) : (
            <ItemCreate />
          )}
        </ContainerContext.Provider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => setComponentToggle(false)}
          disabled={!componentToggle || (container.images?.length ?? 0) < 1}>
          Images
        </Button>
        <Button variant="info" onClick={handleClick} disabled={componentToggle}>
          Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ZipCreateModal;
