import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { ContainerContext } from "./ZipCreate";
import { createItemImagesArray } from "./ItemCreation";
import { useCreateItemImages } from "@item/services/mutation";

import "@container/styles/ItemSelect.css";
import { useOverlayScrollbars } from "overlayscrollbars-react";

type ItemSelectProps = {
  handleLinkDelete: () => void;
};

const ItemSelect = ({ handleLinkDelete }: ItemSelectProps) => {
  const containerContext = useContext(ContainerContext);

  if (!containerContext)
    throw new Error(
      "ImageSelect can only be used inside of a ContainerContext Provider",
    );

  const { container, selectedImages } = containerContext;
  const createItemImagesMutation = useCreateItemImages();

  const [id, setId] = useState<number>(-1);

  const handleSubmit = async () => {
    const itemImages = createItemImagesArray(id, selectedImages);
    await createItemImagesMutation.mutateAsync(itemImages);
    handleLinkDelete();
  };

  const scrollRef = useRef<HTMLUListElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [initialize, instance] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: { theme: "os-theme-light" },
    },
  });

  useEffect(() => {
    if (scrollRef.current && viewRef.current)
      initialize({
        target: viewRef.current,
        elements: { viewport: scrollRef.current },
      });

    return () => instance()?.destroy();
  }, [initialize, instance]);

  return (
    <Container fluid>
      <Row>
        <h3 className="text-center">
          <u>Select Item</u>
        </h3>
      </Row>
      <Container className="item-select-container shadow" fluid ref={viewRef}>
        <ul className="item-select-list" ref={scrollRef}>
          {container.containerItems &&
            container.containerItems.map((ci) => (
              <li
                key={`itemSelect-${ci.id}`}
                className={`item-select-item ${id === ci.item.id ? "selected" : ""}`}
                onClick={() => setId(ci.item.id)}>
                {ci.item.name}
              </li>
            ))}
        </ul>
      </Container>
      <Container className="justify-content-end d-flex pe-0">
        <Button
          className="item-select-button shadow"
          variant="success"
          onClick={handleSubmit}
          disabled={id === -1}>
          Submit
        </Button>
      </Container>
    </Container>
  );
};

export default ItemSelect;
