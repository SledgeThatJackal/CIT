import { useData } from "@hooks/MenuDataProvider";
import React, { useEffect, useState } from "react";
import { Container, Dropdown, Form } from "react-bootstrap";

type ID = {
  id: number;
};

type MenuProps<T extends ID> = {
  currentData: T[];
  dbData?: T[];
  filterProperty: keyof T;
  addObject: (newObject: T) => void;
  removeObject: (objectToRemove: T) => void;
  Component: React.ComponentType<T>;
};

type WrapperProps<T extends {}> = {
  Component: React.ComponentType<T>;
  element: T;
};

const ComponentWrapper = <T extends {}>({
  Component,
  element,
}: WrapperProps<T>) => {
  return <Component {...element} />;
};

const Menu = <T extends ID>({
  currentData,
  filterProperty,
  addObject,
  removeObject,
  Component: ComponentToRender,
}: MenuProps<T>) => {
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>([]);

  const dbData = useData();

  useEffect(() => {
    if (dbData) {
      setFilteredData(
        dbData.filter((element) =>
          String(element[filterProperty])
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      );
    }
  }, [dbData, search]);

  const checkIfDataExists = (elementTocheck: T) => {
    return currentData.some(
      (element) => element[filterProperty] === elementTocheck[filterProperty],
    );
  };

  return (
    <React.Fragment>
      <Container className="mb-2">
        <Form.Control
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </Container>
      {filteredData.length > 0 ? (
        filteredData.sort().map((element, index) => {
          const elementExists = checkIfDataExists(element);

          return (
            <Dropdown.Item
              key={`menuOption-${index}-${element.id}`}
              onClick={() =>
                elementExists ? removeObject(element) : addObject(element)
              }>
              <span style={{ paddingRight: "10px" }}>
                {elementExists ? "✔️" : "❌"}
              </span>
              <ComponentWrapper
                Component={ComponentToRender}
                element={element}
              />
            </Dropdown.Item>
          );
        })
      ) : (
        <Dropdown.Item disabled>Nothing was found</Dropdown.Item>
      )}
    </React.Fragment>
  );
};

export default Menu;
