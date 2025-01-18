import { useContainer } from "@container/services/query";
import { Container } from "react-bootstrap";
import React, { useParams } from "react-router-dom";
import "@styles/DetailedContainer.css";
import DetailBody from "@components/general/DetailBody";
import { DetailContext } from "@hooks/data/useDetailContext";

function DetailedContainerPage() {
  const { scannerId } = useParams();
  const containerQuery = useContainer(scannerId || "").data;

  if (!scannerId || !containerQuery)
    return <div>Barcode ID was not provided</div>;

  containerQuery.containerItems?.sort((a, b) => {
    const nameA = a.item.name;
    const nameB = b.item.name;

    // Split each name into its textual part and numeric part
    const extractParts = (name: string): (string | number)[] => {
      const split = name.match(/([a-zA-Z]+|\d+)/g); // Split into letters and numbers
      return split
        ? split.map((part) => (isNaN(Number(part)) ? part : parseInt(part, 10)))
        : [];
    };

    const partsA = extractParts(nameA);
    const partsB = extractParts(nameB);

    // Compare each part of the name
    for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
      if (partsA[i] !== partsB[i]) {
        return partsA[i] < partsB[i] ? -1 : 1;
      }
    }

    return partsA.length - partsB.length;
  });

  return (
    <Container className="detail-container">
      <h3>{containerQuery.scannerId}</h3>
      <DetailContext.Provider value={containerQuery}>
        <DetailBody />
      </DetailContext.Provider>
    </Container>
  );
}

export default DetailedContainerPage;
