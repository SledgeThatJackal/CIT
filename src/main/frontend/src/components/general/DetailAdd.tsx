import React, { useMemo, useState } from "react";
import { Container, Dropdown, Form, InputGroup } from "react-bootstrap";

import "@styles/DetailAdd.css";
import { useDetailContext } from "@hooks/data/useDetailContext";
import { DataType, DetailContextValueType } from "./DetailBody";
import { ZodContainerType } from "@item/schemas/Item";
import { ContainerType } from "@container/schemas/Container";
import { useCreateLink } from "@services/mutations";

type DetailAddProps = {
  toggleShow: () => void;
};

const DetailAdd = <T extends DataType>({ toggleShow }: DetailAddProps) => {
  const createLinkMutation = useCreateLink();
  const { data } = useDetailContext<DetailContextValueType<T, unknown>>();
  const [properties, setProperties] = useState<{
    id: number;
    quantity: number;
  }>({ id: -1, quantity: 1 });

  const handleSubmit = () => {
    if (properties.id === -1) return;

    const isContainer = isContainerType(data);

    const newCI = {
      itemId: isContainer ? properties.id : data.id,
      containerId: isContainer ? data.id : properties.id,
      quantity: properties.quantity,
    };

    createLinkMutation.mutate(newCI);
    toggleShow();
  };

  const handleChange = (value: number, name: string = "id") => {
    setProperties((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container fluid className="add-container">
      <Container className="add-container-name" as={InputGroup}>
        <InputGroup.Text
          as="label"
          className="add-quantity-label"
          htmlFor="add-menu">
          Name:
        </InputGroup.Text>
        <DetailMenu handleChange={handleChange} />
      </Container>
      <Container className="add-container-quantity" as={InputGroup}>
        <InputGroup.Text
          as="label"
          htmlFor="quantity"
          className="add-quantity-label">
          Quantity:
        </InputGroup.Text>
        <Form.Control
          type="number"
          id="quantity"
          placeholder="Quantity"
          className="add-quantity-input"
          name="quantity"
          value={properties.quantity}
          onChange={(e) => handleChange(Number(e.target.value), e.target.name)}
        />
      </Container>
      <Container className="add-container-button">
        <button className="add-add-button" onClick={handleSubmit}>
          Add
        </button>
        <button className="add-cancel-button" onClick={toggleShow}>
          Cancel
        </button>
      </Container>
    </Container>
  );
};

export default DetailAdd;

type DetailMenuProps = {
  handleChange: (id: number, name?: string) => void;
};

const DetailMenu = <T extends DataType, S extends ZodContainerType>({
  handleChange,
}: DetailMenuProps) => {
  const { data, menuData } = useDetailContext<DetailContextValueType<T, S>>();
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<S>();

  const handleToggle = () => setShow((prev) => !prev);

  const handleClick = (element: S) => {
    setValue(element);
    handleChange(element.id);
  };

  const filteredData = useMemo<S[]>(() => {
    if (isContainerType(data)) {
      return menuData.filter((element) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.containerItems.every((ci: any) => ci.item.id !== element.id),
      );
    } else {
      return menuData.filter((element) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.containerItems.every((ci: any) => ci.container.id !== element.id),
      );
    }
  }, [data, menuData]);

  return (
    <>
      <InputGroup.Text
        as="label"
        className="add-input-group-text"
        htmlFor="add-dropdown-toggle">
        {value?.scannerId || value?.name}
      </InputGroup.Text>
      <Dropdown show={show} onToggle={handleToggle}>
        <Dropdown.Toggle
          id="add-dropdown-toggle"
          className="add-dropdown-toggle"></Dropdown.Toggle>
        <Dropdown.Menu className="add-dropdown">
          {filteredData &&
            filteredData?.map((element) => (
              <Dropdown.Item
                key={`menuElement-${element.id}`}
                onClick={() => handleClick(element)}>
                <span>{element?.scannerId || element.name}</span>
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

function isContainerType(obj: unknown): obj is ContainerType {
  return (obj as ContainerType)?.scannerId !== undefined;
}
