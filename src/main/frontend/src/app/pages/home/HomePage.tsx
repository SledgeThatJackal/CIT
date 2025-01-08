import React from "react";

import DatabaseExportButton from "@components/general/DatabaseExportButton";
import { NavLink } from "react-router-dom";
import BulkCreateButton from "@components/bulk_create/BulkCreateButton";

function Home() {
  return (
    <>
      <p>Home</p>
      <DatabaseExportButton />
      <div className="mt-2">
        <BulkCreateButton />
      </div>
    </>
  );
}

export default Home;
