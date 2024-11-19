import React, { useState } from "react";
import { useAttributeState } from "@item/hooks/useAttributeState";
import { useItemAttributes } from "@item/services/query";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import EditCellW from "@components/Write/EditCellW";
import SelectComponentW from "@components/Write/SelectComponentW";
import { useItemTypes } from "@type/services/query";
import { useModalState } from "@hooks/state/useModalState";

const ItemAttributeSection = () => {
  const { context } = useAttributeState();
  const [isNotEditing, setIsNotEditing] = useState<boolean>(true);
  const { openMessageModal } = useModalState();

  const itemAttributeQuery = useItemAttributes(
    context?.table.options.meta?.getId?.(context.row.index) ?? -1,
  ).data?.sort(
    (a, b) =>
      (a?.typeAttribute.displayOrder || 0) -
      (b?.typeAttribute.displayOrder || 0),
  );

  const itemTypeQuery = useItemTypes().data;

  const handleEdit = (itemAttr: any) => {
    context?.table.options.meta?.updateItemAttribute?.(itemAttr);
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
              onBlur={() => setIsNotEditing(true)}
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
      {itemAttributeQuery ? (
        itemAttributeQuery.map((attr) => (
          <Row
            key={`attrRow-${attr.id}`}
            className="mt-1 mb-1 d-flex align-items-center justify-content-center"
            style={{ height: "40px" }}>
            <Col md={3} className="text-end">
              {attr.typeAttribute.columnTitle}:
            </Col>
            <Col md={9}>
              <EditCellW
                initialElement={attr}
                elementKey="value"
                handleEdit={handleEdit}
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
