import SelectComponentW from "@components/write/SelectComponentW";
import { TypeAttribute } from "@schema/Types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import Canvas from "@components/general/Canvas";
import { useCanvasState } from "@hooks/state/useCanvasState";
import TypeForm from "@type/components/TypeForm";
import { useErrorState } from "@hooks/state/useErrorState";
import GenericModal from "@components/general/GenericModal";
import { useModalState } from "@hooks/state/useModalState";
import {
  useDeleteItemType,
  useDeleteTypeAttribute,
  useEditTypeAttribute,
} from "@type/services/mutation";
import { useTypeAttribute } from "@type/services/query";
import { TypeProvider, useData } from "@type/hooks/TypeProvider";
import { AttributeForm } from "@type/schema/Type";
import { useEditState } from "@type/hooks/state/useEditState";
import TypeAttributeRow from "@type/components/TypeAttributeRow";
import TypeAttributeEditCell from "@type/components/table/TypeAttributeEditCell";
import TypeAttributeDeleteCell from "@type/components/table/TypeAttributeDeleteCell";
import TypeAttributeSelectCell from "@type/components/table/TypeAttributeSelectCell";
import EditCellW from "@item/components/boolean_rows/EditCellWType";
import { useDebounce } from "@hooks/useDebounce";

function TypeSettingsContent() {
  const itemTypesQuery = useData();
  const [type, setType] = useState<number>(itemTypesQuery[0].id);

  const typeAttributeQuery = useTypeAttribute(type);
  const { openCanvas } = useCanvasState();
  const { displayError } = useErrorState();
  const { openMessageModal } = useModalState();

  const { setProps } = useEditState();

  // Mutations
  const updateAttributeMutation = useEditTypeAttribute();
  const deleteTypeMuation = useDeleteItemType();
  const deleteAttributeMutation = useDeleteTypeAttribute();

  const [filteredTypes, setFilteredTypes] = useState<TypeAttribute[]>([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (typeAttributeQuery.data) {
      const filtered = typeAttributeQuery.data
        .filter((el) =>
          el.columnTitle?.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => (a?.displayOrder || 0) - (b.displayOrder || 0));

      setFilteredTypes(filtered);
    }
  }, [typeAttributeQuery.data, search, type]);

  const handleCreate = () => {
    openCanvas(TypeForm, "bottom", "Creating New Type");
  };

  const handleEdit = () => {
    const itemType = itemTypesQuery?.find((itemType) => itemType.id === type);
    const typeAttributes: AttributeForm = {
      typeAttributes: typeAttributeQuery.data || [],
    };

    if (itemType) {
      setProps(itemType, typeAttributes);
      openCanvas(TypeForm, "bottom", `Editing: ${itemType.name}`);
    } else {
      displayError("ItemType does not exist");
    }
  };

  const handleAttributeEdit = (
    typeAttr: TypeAttribute,
    value?: string | number,
  ) => {
    const getDataTypeKey = (): keyof TypeAttribute =>
      typeAttr.dataType?.startsWith("S")
        ? "stringDefaultValue"
        : "numberDefaultValue";

    const updatedAttr =
      value !== undefined
        ? { ...typeAttr, [getDataTypeKey()]: value }
        : typeAttr;

    updateAttributeMutation.mutate(updatedAttr);
  };

  const handleTypeDelete = () => {
    if (type) {
      deleteTypeMuation.mutate(type);
      setType(itemTypesQuery[0].id || -1);
    }
  };

  const handleAttributeDelete = (id?: number) => {
    if (id) {
      deleteAttributeMutation.mutate(id);
    }
  };

  const [tableIndex, setTableIndex] = useState<number>(0);

  const request = useDebounce(() => {
    setTableIndex((prev) => prev + 1);
  }, 50);

  useEffect(() => {
    request();
  }, [typeAttributeQuery.data]);

  return (
    <React.Fragment>
      <Canvas />
      <GenericModal />
      <Container fluid>
        <Row>
          <h2>Types</h2>
        </Row>
        <Row>
          <hr />
        </Row>
        <Row>
          <Container
            fluid
            className="rounded bg-dark text-white mt-3 w-75 overflow-auto shadow"
            style={{ height: "65vh", border: "3px solid #7B8895" }}>
            <Row className="mt-3 mb-3">
              <Col as={Stack} direction="horizontal" gap={3}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <SelectComponentW
                    data={itemTypesQuery}
                    labelKey="name"
                    setValue={setType}
                  />
                </InputGroup>
                <InputGroup>
                  <Button variant="success" onClick={handleCreate}>
                    New
                  </Button>
                  <Button variant="info" onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    disabled={type === -1}
                    onClick={() =>
                      openMessageModal(
                        "Delete Type",
                        "Delete",
                        handleTypeDelete,
                        "Are you sure you want to delete this type?",
                      )
                    }>
                    Delete
                  </Button>
                </InputGroup>
              </Col>
              <Col
                md={3}
                className="d-flex align-items-center justify-content-end">
                <div>
                  Displaying: {filteredTypes.length || 0} out of{" "}
                  {typeAttributeQuery.data?.length || 0}
                </div>
              </Col>
            </Row>
            <Row className="m-1">
              <Container
                style={{
                  background: "#3d454e",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "3px solid #7B8895",
                }}>
                <Row>
                  <Col md={1} className="text-center">
                    Order
                  </Col>
                  <Col md={2}>Data Type</Col>
                  <Col md={6}>Attribute Name</Col>
                  <Col md={2}>Default Value</Col>
                  <Col md={1} className="text-center">
                    Delete
                  </Col>
                </Row>
                <React.Fragment key={`typeRows-${tableIndex}`}>
                  {filteredTypes &&
                    filteredTypes.map((fType) => (
                      <TypeAttributeRow
                        key={`pageTypeRow-${fType.id}`}
                        fType={fType}>
                        <TypeAttributeEditCell
                          attributeKey="displayOrder"
                          fType={fType}
                          handleEdit={handleAttributeEdit}
                        />
                        <TypeAttributeSelectCell
                          attributeKey="dataType"
                          fType={fType}
                        />
                        <TypeAttributeEditCell
                          attributeKey="columnTitle"
                          fType={fType}
                          handleEdit={handleAttributeEdit}
                        />
                        <EditCellW
                          key={`TypeRow-${fType.dataType}-${fType.id}`}
                          initialElement={fType}
                          handleEdit={handleAttributeEdit}
                          defaultValue={
                            fType.dataType?.startsWith("S")
                              ? fType.stringDefaultValue
                              : fType.numberDefaultValue
                          }
                        />
                        <TypeAttributeDeleteCell
                          handleDelete={() =>
                            openMessageModal(
                              "Delete Attribute",
                              "Delete",
                              () => handleAttributeDelete(fType.id),
                              "Are you sure you want to delete this attribute?",
                            )
                          }
                        />
                      </TypeAttributeRow>
                    ))}
                </React.Fragment>
              </Container>
            </Row>
          </Container>
        </Row>
      </Container>
    </React.Fragment>
  );
}

const TypeSettings = () => {
  return (
    <TypeProvider>
      <TypeSettingsContent />
    </TypeProvider>
  );
};

export default TypeSettings;
