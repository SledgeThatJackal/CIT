import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { forwardRef } from "react";

export function WriteSortable(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ReadSortable
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      id={props.id}>
      {props.children}
    </ReadSortable>
  );
}

export const ReadSortable = forwardRef<HTMLDivElement, any>(
  ({ id, children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className="rounded p-1">
        {children ? children : id}
      </div>
    );
  },
);
