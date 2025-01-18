import ContainerTable from "@home/components/ContainerTable";
import ItemTable from "@home/components/ItemTable";
import React, { createContext } from "react";
import { Container } from "react-bootstrap";
import { HomeType } from "src/features/home/schemas/Home";

import { useHome } from "src/features/home/services/query";

import "@home/styles/HomePage.css";

export const HomeContext = createContext<HomeType | undefined>(undefined);

function Home() {
  const homeQuery = useHome().data;

  if (!homeQuery) return <div>No data found</div>;

  return (
    <Container fluid className="home-container">
      <HomeContext.Provider value={homeQuery}>
        <ContainerTable />
        <ItemTable />
      </HomeContext.Provider>
    </Container>
  );
}

export default Home;
