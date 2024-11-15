import { CellContext } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import ReadRow from "./ReadRow";
import SelectComponentW from "@components/Write/SelectComponentW";
import { useItemTypes } from "@type/services/query";
import { ZodItemType } from "@schema/General";

const SelectCell = <T, S extends ZodItemType>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<T, S>) => {
  const initialValue: ZodItemType = getValue();

  const [value, setValue] = useState<number>(initialValue?.id);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const typeQuery = useItemTypes().data;

  const handleValueChange = () => {
    const newValue = typeQuery?.find((type) => type.id === value);

    table.options.meta?.updateData(index, id, newValue);
    setIsEditing(false);
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <SelectComponentW
          data={typeQuery}
          labelKey="name"
          setValue={setValue}
          onBlur={handleValueChange}
        />
      ) : (
        <ReadRow
          value={initialValue?.name}
          handleDoubleClick={() => setIsEditing(true)}
        />
      )}
    </React.Fragment>
  );
};

export default SelectCell;
