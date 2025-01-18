import React, { useState } from "react";
import { CloseButton, Form, Stack } from "react-bootstrap";
import { useDetailedContainers } from "@services/queries";
import { CellContext } from "@tanstack/react-table";
import { ContainerType } from "@container/schemas/Container";

const ParentContainerCell = ({
  getValue,
  row: { index },
  table,
}: CellContext<ContainerType, ContainerType>) => {
  const containersQuery = useDetailedContainers().data;
  const tableValue = getValue();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!containersQuery) {
    return <div>No Containers Found</div>;
  }

  const initialValue = tableValue
    ? containersQuery.find((container) => container.id === tableValue.id)?.id
    : -1;

  const onChange = (selectedId: number) => {
    table.options.meta?.updateParentContainer?.(index, selectedId);

    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Stack direction="horizontal" gap={1}>
          <Form.Select
            onChange={(e) => onChange(Number(e.target.value))}
            onBlur={() => setIsEditing(false)}
            value={initialValue}>
            <option value={-1} key={"default-option"}></option>
            {containersQuery ? (
              containersQuery
                .filter(
                  (container) =>
                    container.id !== table.options.meta?.getId?.(index),
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((container) => (
                  <option
                    key={`options-${container.id}`}
                    value={
                      container.id
                    }>{`${container.scannerId} (${container.name})`}</option>
                ))
            ) : (
              <option key={`no-options`}>No Containers found</option>
            )}
          </Form.Select>
          <CloseButton
            onClick={() => onChange(-1)}
            disabled={!tableValue?.id}></CloseButton>
        </Stack>
      ) : (
        <div
          style={{ ...(tableValue === null && { height: "20px" }) }}
          onDoubleClick={() => setIsEditing(true)}>
          {tableValue && tableValue.name}
        </div>
      )}
    </>
  );
};

export default ParentContainerCell;
