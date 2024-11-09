import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDetailedContainers } from "@services/queries";

const ParentContainerCell = ({ getValue, row: { index }, table }: any) => {
  const containersQuery = useDetailedContainers().data;
  const tableValue = getValue();

  if (!containersQuery) {
    return <div>No Containers Found</div>;
  }

  const initialValue = tableValue
    ? containersQuery.find((container) => container.id === tableValue.id)?.id
    : -1;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onChange = (e: any) => {
    const selectedValue = e.target.value;

    table.options.meta?.updateParentContainer(index, selectedValue);

    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Form.Select
          onChange={onChange}
          onBlur={() => setIsEditing(false)}
          value={initialValue}>
          <option value={-1} key={"default-option"}></option>
          {containersQuery ? (
            containersQuery
              .filter((container) => container.id !== tableValue.id)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((container) => (
                <option
                  key={`options-${container.id}`}
                  value={
                    container.id
                  }>{`${container.name} (${container.scannerId})`}</option>
              ))
          ) : (
            <option key={`no-options`}>No Containers found</option>
          )}
        </Form.Select>
      ) : (
        <div
          style={{ ...(!tableValue && { height: "20px" }) }}
          onDoubleClick={() => setIsEditing(true)}>
          {tableValue && tableValue.name}
        </div>
      )}
    </>
  );
};

export default ParentContainerCell;
