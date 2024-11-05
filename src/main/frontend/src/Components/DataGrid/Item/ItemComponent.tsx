import React from "react";
import { TagProvider } from "../../../Hooks/TagProvider";
import ItemTable from "./ItemTable";

export default function ItemComponent(){
    return (
        <TagProvider>
            <ItemTable />
        </TagProvider>
    );
}