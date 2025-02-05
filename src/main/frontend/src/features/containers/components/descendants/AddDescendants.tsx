import React, { useRef } from "react";

import "../../styles/AddDescendants.css";
import { useOrphanContainers } from "@container/services/query";
import { Form } from "react-bootstrap";
import { useDescendantCellState } from "@container/hooks/useDescendantCellState";
import { useModalState } from "@hooks/state/useModalState";

const AddDescendants = () => {
  const { caller } = useModalState();
  const orphanQuery = useOrphanContainers({
    data: { id: caller?.id, condition: caller?.condition },
  }).data;
  const selectedRef = useRef(new Set<number>());
  const { setOrphans } = useDescendantCellState();

  const toggle = (id: number) => {
    const selected = selectedRef.current;

    if (selected) {
      if (selected.has(id)) {
        selected.delete(id);
      } else {
        selected.add(id);
      }

      setOrphans(Array.from(selected));
    }
  };

  const getChecked = (id: number) => {
    return selectedRef.current.has(id);
  };

  return (
    <div className="descendants-grid">
      {orphanQuery && orphanQuery.length > 0 ? (
        orphanQuery.map((orphan) => (
          <label
            key={`orphan-${orphan.scannerId}`}
            className={`descendants-item${getChecked(orphan.id) ? " checked" : ""}`}
            htmlFor={`descendants-check-input-${orphan.id}`}>
            <Form.Check type="checkbox">
              <Form.Check.Input
                type="checkbox"
                className="descendants-check-input"
                id={`descendants-check-input-${orphan.id}`}
                onChange={() => toggle(orphan.id)}
              />
              <Form.Check.Label
                className="descendants-check-label"
                htmlFor={`descendants-check-input-${orphan.id}`}>
                {orphan.name}
              </Form.Check.Label>
            </Form.Check>
          </label>
        ))
      ) : (
        <div>There are no containers without a parent</div>
      )}
    </div>
  );
};

export default AddDescendants;
