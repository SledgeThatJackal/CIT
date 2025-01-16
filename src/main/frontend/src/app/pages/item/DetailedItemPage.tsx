import DetailBody from "@components/general/DetailBody";
import { DetailContext } from "@hooks/data/useDetailContext";
import { useItem } from "@item/services/query";
import { Container } from "react-bootstrap";
import React, { useParams } from "react-router-dom";

function DetailedItemPage() {
  const { id } = useParams();
  const itemQuery = useItem(Number(id)).data;

  if (!id || !itemQuery) return <div>Item Id was not provided</div>;

  itemQuery?.containerItems?.sort((a, b) =>
    (a.container?.name || "").localeCompare(b.container?.name || ""),
  );

  return (
    <Container className="detail-container">
      <h3>Item</h3>
      <DetailContext.Provider value={itemQuery}>
        <DetailBody />
      </DetailContext.Provider>
    </Container>
  );
}

export default DetailedItemPage;
