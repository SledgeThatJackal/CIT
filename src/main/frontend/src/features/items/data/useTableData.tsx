import { useMemo } from "react";
import { createColumnHelper, Row } from "@tanstack/react-table";

import { Item } from "@item/schemas/Item";
import EditCell from "@components/custom_cell_renderers/EditCell";
import TagCell from "@components/custom_cell_renderers/TagCell";
import DeleteCell from "@components/custom_cell_renderers/DeleteCell";
import { Tag } from "@schema/Tag";
import ActionButtons from "../components/custom_cells/ActionButtons";
import TypeCell from "../components/custom_cells/TypeCell";
import ImageCell from "@components/custom_cell_renderers/ImageCell";
import React from "react";
import { useTypeAttribute } from "@type/services/query";

const columnHelper = createColumnHelper<Item>();

export const useTableData = (typeId: number) => {
  const typeAttributesQuery = useTypeAttribute(typeId).data;

  const columns = useMemo(() => {
    const defaultColumns = [
      columnHelper.accessor("images", {
        id: "images",
        header: () => null,
        cell: ImageCell,
        size: 75,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
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
      columnHelper.accessor("itemType", {
        id: "itemType",
        header: "Type",
        cell: TypeCell,
        enableResizing: true,
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: () => <div className="text-center">Delete</div>,
        size: 75,
        cell: DeleteCell,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("containerItems", {
        id: "containerItems",
        header: () => <div className="text-center">Actions</div>,
        size: 90,
        cell: ActionButtons,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ];

    if (typeId === -1) {
      return defaultColumns;
    }

    const attributeColumns = typeAttributesQuery
      ?.sort((a, b) => (a?.displayOrder || 0) - (b?.displayOrder || 0))
      .map((typeAttr, index) => {
        return columnHelper.accessor(
          (row) => row.itemAttributes[index]?.value || "",
          {
            id: typeAttr.columnTitle || "",
            header: () => <div>{typeAttr.columnTitle}</div>,
            size: 100,
            cell: EditCell,
            enableResizing: true,
          },
        );
      });

    const startingColumns = defaultColumns.slice(0, defaultColumns.length - 2);
    const endingColumns = defaultColumns.slice(defaultColumns.length - 2);

    const typedColumns = [
      ...startingColumns,
      ...(attributeColumns || []),
      ...endingColumns,
    ];

    return typedColumns;
  }, [typeAttributesQuery]);

  return { columns };
};
