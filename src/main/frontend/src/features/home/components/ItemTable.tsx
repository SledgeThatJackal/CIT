import { HomeContext } from "@app/pages/home/HomePage";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ItemTable = () => {
  const data = useContext(HomeContext);

  return (
    <Container className="item-container">
      <h2>Item</h2>
      <Container>
        <strong>
          <u>{data?.numberOfItems} Items</u>
        </strong>
        {data?.itemTypes?.map((type) => (
          <div key={type.a.id}>
            {type.b}{" "}
            {type.a.name ? (
              <NavLink to={`/item/${type.a.name}`}>{type.a.name}</NavLink>
            ) : (
              "No Type"
            )}
          </div>
        ))}
      </Container>
    </Container>
  );
};

export default ItemTable;
