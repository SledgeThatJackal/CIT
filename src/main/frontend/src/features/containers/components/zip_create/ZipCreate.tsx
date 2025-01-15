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
import ItemSelect from "./ItemSelect";

type ContainerContextType = {
  container: ContainerType;
  selectedImages: ContainerImageType[];
  setSelectedImages: React.Dispatch<React.SetStateAction<ContainerImageType[]>>;
};

export const ContainerContext = createContext<ContainerContextType | undefined>(
  undefined,
);

const STATE = {
  CREATE: "CREATE",
  EXISTING: "EXISTING",
  IMAGES: "IMAGES",
};

const ZipCreateModal = () => {
  const { updateItemAction } = useActionState();
  const { row, showModal, closeModal } = useZipCreateState();
  const deleteContainerImageLinkMutation = useDeleteContainerImageLink();

  const [componentState, setComponentState] = useState<string>(STATE.IMAGES);

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

  const handleCreateClick = () => {
    handleRowChange();
    setComponentState(STATE.CREATE);
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
    handleRowChange();
    setComponentState(
      (container?.images?.length ?? 0) < 1 ? STATE.CREATE : STATE.IMAGES,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  const renderButtons = () => {
    const buttons = [];

    if (
      componentState !== STATE.IMAGES &&
      (container?.images?.length ?? 0) > 0
    ) {
      buttons.push(
        <ModalButton
          label="Back"
          variant="danger"
          handleClick={() => setComponentState(STATE.IMAGES)}
          key={"ModalButton-IMAGES"}
        />,
      );
    }

    if (
      componentState === STATE.IMAGES &&
      (container?.containerItems?.length ?? 0) > 0
    )
      buttons.push(
        <ModalButton
          label="Add to existing Item"
          variant="light"
          handleClick={() => setComponentState(STATE.EXISTING)}
          isDisabled={selectedImages.length < 1}
          key={"ModalButton-EXISTING"}
        />,
      );

    if (componentState === STATE.IMAGES)
      buttons.push(
        <ModalButton
          label="Create new Item"
          variant="info"
          handleClick={handleCreateClick}
          key={"ModalButton-CREATE"}
        />,
      );

    return buttons;
  };

  const renderComponents = () => {
    switch (componentState) {
      case STATE.IMAGES:
        return <ItemCreate />;
      case STATE.EXISTING:
        return <ItemSelect handleLinkDelete={handleLinkDelete} />;
      case STATE.CREATE:
        return <CreateBox afterSubmit={handleLinkDelete} />;
      default:
        return <div>An error has occured</div>;
    }
  };

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
          {renderComponents()}
        </ContainerContext.Provider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        {renderButtons()}
      </Modal.Footer>
    </Modal>
  );
};

type ModalButtonProps = {
  label: string;
  variant: string;
  isDisabled?: boolean;
  handleClick: () => void;
};

const ModalButton = ({
  label,
  variant,
  isDisabled = false,
  handleClick,
}: ModalButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={isDisabled}
      className="shadow">
      {label}
    </Button>
  );
};

export default ZipCreateModal;
