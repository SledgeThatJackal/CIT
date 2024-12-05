import { MenuDataProvider } from "@hooks/MenuDataProvider";
import React from "react";
import Menu from "./Menu";

type ID = {
  id: number;
};

type MenuProps<T extends ID> = {
  currentData: T[];
  type: string;
  filterProperty: keyof T;
  addObject: (newObject: T) => void;
  removeObject: (objectToRemove: T) => void;
  Component: React.ComponentType<T>;
};

const GenericMenu = <T extends ID>(props: MenuProps<T>) => {
  return (
    <MenuDataProvider type={props.type}>
      <Menu
        currentData={props.currentData}
        filterProperty={props.filterProperty}
        addObject={props.addObject}
        removeObject={props.removeObject}
        Component={props.Component}
      />
    </MenuDataProvider>
  );
};

export default GenericMenu;
