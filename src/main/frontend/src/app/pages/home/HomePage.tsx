import React from "react";

import DatabaseExportButton from "@components/general/DatabaseExportButton";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <p>Home</p>
      <DatabaseExportButton />
    </>
  );
}

export default Home;
