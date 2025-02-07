import React, { useState } from "react";
import { CloseButton, Form, Stack } from "react-bootstrap";
import { CellContext } from "@tanstack/react-table";
import { ContainerType } from "@container/schemas/Container";
import { useContainersByArea } from "@container/services/query";

const ParentContainerCell = ({
  getValue,
  row,
  table,
}: CellContext<ContainerType, ContainerType>) => {
  const tableValue = getValue();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const containersQuery = useContainersByArea(
    row.original.isArea,
    row.original.id,
    isEditing,
  ).data;

  const initialValue = tableValue
    ? containersQuery?.find((container) => container.id === tableValue.id)?.id
    : -1;

  const onChange = (selectedId: number) => {
    table.options.meta?.updateParentContainer?.(row.index, selectedId);

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
            <option value={-1} key={"default-option"}>
              {tableValue?.scannerId}
            </option>
            {containersQuery ? (
              containersQuery
                .filter(
                  (container) =>
                    container.id !== table.options.meta?.getId?.(row.index),
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
          {tableValue?.scannerId}
        </div>
      )}
    </>
  );
};

export default ParentContainerCell;
