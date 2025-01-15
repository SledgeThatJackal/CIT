import EditCell from "@components/custom_cell_renderers/EditCell";
import RemoveCell from "@components/custom_cell_renderers/RemoveCell";
import { setProperCase } from "@components/general/DetailBody";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnHelper = createColumnHelper<any>();

export const useDetailGridData = <T extends DataType>(data: T) => {
  const columns = useMemo(() => {
    const dynamicColumns = dynamicColumnsKeys(data[0]).map((key) => {
      return columnHelper.accessor(key, {
        id: key,
        header: setProperCase(key.split(".")[1]),
        cell: ({ getValue }) => getValue(),
      });
    });

    const staticColumns = [
      columnHelper.accessor("quantity", {
        id: "quantity",
        header: "Quantity",
        cell: EditCell,
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: "Remove",
        cell: RemoveCell,
      }),
    ];

    return [...dynamicColumns, ...staticColumns];
  }, [data]);

  return { columns };
};

type DataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const dynamicColumnsKeys = <T extends DataType>(data: T) => {
  const keys: string[] = [];

  Object.keys(data).map((key) => {
    if (key === "id" || key === "quantity") return;

    const nested = data[key];
    if (nested && typeof nested === "object") {
      Object.keys(nested).forEach((nestedKey) => {
        if (nestedKey === "id") return;
        keys.push(`${key}.${nestedKey}`);
      });
    }
  });

  return keys;
};
