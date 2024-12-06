import React, { useEffect, useState } from "react";
import { useAttributeState } from "@item/hooks/useAttributeState";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import SelectComponentW from "@components/write/SelectComponentW";
import { useItemTypes } from "@type/services/query";
import { useModalState } from "@hooks/state/useModalState";
import { ItemAttribute } from "@item/schemas/Item";
import EditCellWType from "../boolean_rows/EditCellWType";
import { alterItemAttribute } from "../boolean_rows/AlteredItemAttribute";

const ItemAttributeSection = () => {
  const { context } = useAttributeState();
  const [isNotEditing, setIsNotEditing] = useState<boolean>(true);
  const { openMessageModal } = useModalState();

  const itemTypeQuery = useItemTypes().data;

  const [itemAttributes, setItemAttributes] = useState<
    ItemAttribute[] | undefined
  >(context?.row.original.itemAttributes);

  useEffect(() => {
    setItemAttributes(context?.row.original.itemAttributes);
  }, [context]);

  const handleEdit = (itemAttr: any, value: string | number) => {
    const updatedElement = alterItemAttribute(itemAttr, value);

    context?.table.options.meta?.updateItemAttribute?.(updatedElement);
  };

  const changeType = (id: number) => {
    const newType = itemTypeQuery?.find((type) => type.id === id);
    context?.table.options.meta?.updateData(
      context.row.index,
      context.column.id,
      newType,
    );
  };

  const handleTypeChange = (id: number) => {
    openMessageModal(
      "Change Type",
      "Change",
      () => changeType(id),
      "Are you sure you want to change this type? If you do this, you will lose any assocaited data by doing this.",
    );
  };

  return (
    <Container
      className="rounded overflow-y-auto shadow"
      style={{ height: "90vh", background: "#9b9d9e" }}
      fluid>
      <Row
        className="mb-2 align-items-center rounded-top shadow"
        style={{ background: "#777a7b" }}>
        <Col md={3} className="text-end align-middle">
          Type:
        </Col>
        <Col md={8} className="mt-2 mb-2">
          <InputGroup>
            <SelectComponentW
              data={itemTypeQuery}
              labelKey="name"
              setValue={handleTypeChange}
              isDisabled={isNotEditing}
              initialValue={context?.getValue().id}
            />
            <Button
              variant={isNotEditing ? "info" : "danger"}
              onClick={() => setIsNotEditing(!isNotEditing)}>
              {isNotEditing ? (
                <i className="bi bi-pencil" />
              ) : (
                <i className="bi bi-x" />
              )}
            </Button>
          </InputGroup>
        </Col>
      </Row>
      {itemAttributes ? ( // style={{ height: "40px" }}
        itemAttributes.map((attr) => (
          <Row
            key={`attrRow-${attr.id}`}
            className="d-flex align-items-center justify-content-center m-1">
            <Col md={3} className="text-end">
              {attr.typeAttribute.columnTitle}:
            </Col>
            <Col
              md={9}
              className="rounded"
              style={{ background: "rgb(136, 139, 140)" }}>
              <EditCellWType
                initialElement={attr}
                defaultValue={attr.stringValue || attr.numberValue}
                handleEdit={handleEdit}
                typeKey="typeAttribute"
              />
            </Col>
          </Row>
        ))
      ) : (
        <Row>
          <Col>No Attributes to display</Col>
        </Row>
      )}
    </Container>
  );
};

export default ItemAttributeSection;
