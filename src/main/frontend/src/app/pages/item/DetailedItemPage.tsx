import React, { useParams } from "react-router-dom";

function DetailedItemPage() {
  const { id } = useParams();

  return <div>{id}</div>;
}

export default DetailedItemPage;
