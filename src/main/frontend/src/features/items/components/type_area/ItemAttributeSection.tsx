import React from "react";
import { useAttributeState } from "@item/hooks/useAttributeState";
import { useItemAttributes } from "@item/services/query";
import { Col, Container, Row } from "react-bootstrap";
import { ItemAttribute } from "@item/schemas/Item";
import EditCellW from "@components/Write/EditCellW";

const ItemAttributeSection = () => {
  const { context } = useAttributeState();

  const itemAttributeQuery = useItemAttributes(
    context?.table.options.meta?.getId?.(context.row.index) ?? -1,
  ).data?.sort(
    (a, b) =>
      (a?.typeAttribute.displayOrder || 0) -
      (b?.typeAttribute.displayOrder || 0),
  );

  const handleEdit = (itemAttr: any) => {
    context?.table.options.meta?.updateItemAttribute?.(itemAttr);
  };

  return (
    <Container fluid>
      <Row className="mt-1 mb-1">
        <Col md={3} className="text-end">
          Type:
        </Col>
        <Col md={8}>
          <div>{context?.getValue().name}</div>
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
