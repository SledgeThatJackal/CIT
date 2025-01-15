import { useContainer } from "@container/services/query";
import { Container } from "react-bootstrap";
import React, { useParams } from "react-router-dom";
import "@container/styles/DetailedContainer.css";
import { createContext, useContext } from "react";
import DetailBody from "@components/general/DetailBody";

const DetailContext = createContext<unknown>(undefined);

export function useDetailContext<T>() {
  const context = useContext(DetailContext);

  if (context === undefined)
    throw new Error("useDetailContext must be used within a Provider");

  return context as T;
}

function DetailedContainerPage() {
  const { scannerId } = useParams();
  const containerQuery = useContainer(scannerId || "").data;

  if (!scannerId || !containerQuery)
    return <div>Barcode ID was not provided</div>;

  return (
    <Container className="detail-container">
      <h3>Container</h3>
      <DetailContext.Provider value={containerQuery}>
        <DetailBody />
      </DetailContext.Provider>
    </Container>
  );
}

export default DetailedContainerPage;
