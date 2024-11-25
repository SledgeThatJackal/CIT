import { useMemo, useRef } from "react";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table";

import { Item } from "@item/schemas/Item";
import EditCell from "@components/custom_cell_renderers/EditCell";
import TagCell from "@components/custom_cell_renderers/TagCell";
import DeleteCell from "@components/custom_cell_renderers/DeleteCell";
import { Tag } from "@schema/Tag";
import ActionButtons from "../components/custom_cells/ActionButtons";
import TypeCell from "../components/custom_cells/TypeCell";
import ImageCell from "@components/custom_cell_renderers/ImageCell";
import React from "react";
import { TypeAttribute } from "@schema/Types";
import TypeEditCell from "@item/components/custom_cells/TypeEditCell";

const columnHelper = createColumnHelper<Item>();

export const useTableData = (itemData: Item[], filter: TypeAttribute) => {
  const previousColumnRef = useRef<ColumnDef<Item, any>[]>([]);

  const columns = useMemo(() => {
    if (itemData.length < 1) {
      return previousColumnRef.current;
    }

    const itemAttributes = itemData?.[0]?.itemAttributes;

    const defaultColumns = [
      columnHelper.accessor("images", {
        id: "images",
        header: () => null,
        cell: ImageCell,
        maxSize: 75,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        enableResizing: true,
        cell: EditCell,
        minSize: 200,
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: "Description",
        enableResizing: true,
        cell: EditCell,
        minSize: 200,
        sortUndefined: 1,
      }),
      columnHelper.accessor("tags", {
        id: "tags",
        header: "Tag(s)",
        cell: TagCell,
        minSize: 200,
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
        minSize: 100,
        maxSize: 125,
        enableResizing: true,
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: () => <div className="text-center">Delete</div>,
        maxSize: 75,
        cell: DeleteCell,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("containerItems", {
        id: "containerItems",
        header: () => <div className="text-center">Actions</div>,
        maxSize: 90,
        cell: ActionButtons,
        enableResizing: false,
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ];

    if (filter.id === -1) {
      previousColumnRef.current = defaultColumns;
      return defaultColumns;
    }

    const attributeColumns = itemAttributes
      ?.sort(
        (a, b) =>
          (a.typeAttribute.displayOrder || 0) -
          (b.typeAttribute.displayOrder || 0),
      )
      .map((itemAttribute, index) => {
        return columnHelper.accessor(
          (row) => row.itemAttributes[index]?.value || "",
          {
            id: `${itemAttribute.typeAttribute.columnTitle}-${index}`,
            header: () => <div>{itemAttribute.typeAttribute.columnTitle}</div>,
            cell: TypeEditCell,
            minSize: 200,
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

    previousColumnRef.current = typedColumns;
    return typedColumns;
  }, [itemData]);

  return { columns };
};
