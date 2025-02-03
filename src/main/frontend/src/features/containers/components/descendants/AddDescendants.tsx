import { useModalState } from "@hooks/state/useModalState";
import React from "react";

import "../../styles/AddDescendants.css";
import { useOrphanContainers } from "@container/services/query";

const AddDescendants = () => {
  const orphanQuery = useOrphanContainers().data;
  const { callerId } = useModalState();

  return (
    <div className="descendants-grid">
      {orphanQuery && orphanQuery.length > 0 ? (
        orphanQuery.map((orphan) => (
          <div key={`orphan-${orphan.id}`}>{orphan.name}</div>
        ))
      ) : (
        <div>There are no containers missing a parent</div>
      )}
      <div>{callerId}</div>
    </div>
  );
};

export default AddDescendants;
