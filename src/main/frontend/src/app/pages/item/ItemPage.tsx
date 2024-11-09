import React from "react";
import { TagProvider } from "@hooks/TagProvider";
import ItemTable from "@item/components/ItemTable";

export default function Item() {
  return (
    <TagProvider>
      <ItemTable />
    </TagProvider>
  );
}
