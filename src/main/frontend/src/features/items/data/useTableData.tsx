import { useMemo } from "react";
import { createColumnHelper, Row } from "@tanstack/react-table";

import { Item } from "@item/schemas/Item";
import EditCell from "@components/custom_cell_renderers/EditCell";
import TagCell from "@components/custom_cell_renderers/TagCell";
import { useItems } from "@services/queries";
import DeleteCell from "@components/custom_cell_renderers/DeleteCell";
import { Tag } from "@schema/Tag";
import ActionButtons from "../components/custom_cells/ActionButtons";

const columnHelper = createColumnHelper<Item>();

export const useTableData = () => {
  const itemsQuery = useItems().data;

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        size: 500,
        enableResizing: true,
        cell: EditCell,
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: "Description",
        size: 500,
        enableResizing: true,
        cell: EditCell,
        sortUndefined: 1,
      }),
      columnHelper.accessor("tags", {
        id: "tags",
        header: "Tag(s)",
        size: 500,
        cell: TagCell,
        enableResizing: true,
        enableSorting: false,
        filterFn: (row: Row<Item>, columnId: string, filterValue: string) => {
          return (row.getValue(columnId) as Tag[]).some((tag) =>
            tag.tag.toLowerCase().includes(filterValue.toLowerCase()),
          );
        },
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: "Delete",
        size: 50,
        cell: DeleteCell,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("containerItems", {
        id: "containerItems",
        header: () => null,
        size: 100,
        cell: ActionButtons,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [],
  );

  return { columns, itemsQuery };
};
