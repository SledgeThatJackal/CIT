import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return <div ref={setNodeRef}>{props.children}</div>;
}

type MultipleDroppablesProps = {
  elements: number[];
};

export function MultipleDroppables({ elements }: MultipleDroppablesProps) {
  return (
    <section>
      {elements.map((element) => {
        const id = `imageDroppable-${element}`;
        return <Droppable id={id} key={id}></Droppable>;
      })}
    </section>
  );
}
