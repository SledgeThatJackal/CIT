import ErrorBanner from "@components/error_handling/ErrorBanner";
import ErrorBoundaryFallBack from "@components/error_handling/ErrorBoundaryFallBack";
import { useErrorState } from "@hooks/state/useErrorState";
import React, { useState } from "react";
import { Container, Navbar, Nav, Row } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";
import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
  // The active key works really weird, if you click the brand button while on item or container, it will leave the previous active and add another one.
  // I did this to make sure that it would "remove" the old active when you click the brand button.
  const [activeKey, setActiveKey] = useState("home");

  const { showError } = useErrorState();

  return (
    <>
      <header>
        <Navbar
          expand="lg"
          bg="dark"
          className="border-bottom border-body"
          data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand
              as={NavLink}
              to="/"
              className="text-light"
              onClick={() => setActiveKey("home")}>
              CIT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-nav-bar">
              <Nav className="me-auto" variant="pills" activeKey={activeKey}>
                <Nav.Link
                  as={NavLink}
                  to="/"
                  eventKey="home"
                  className="navbar-link"
                  onClick={() => setActiveKey("home")}>
                  Home
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/container"
                  eventKey="container"
                  className="nav-link"
                  onClick={() => setActiveKey("container")}>
                  Container
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/item"
                  eventKey="item"
                  className="nav-link"
                  onClick={() => setActiveKey("item")}>
                  Item
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/settings"
                  eventKey="settings"
                  className="nav-link"
                  onClick={() => setActiveKey("settings")}>
                  Settings
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <ErrorBoundary FallbackComponent={ErrorBoundaryFallBack}>
        <main className="bg-secondary">
          {showError && <ErrorBanner />}
          <Outlet />
        </main>
      </ErrorBoundary>
    </>
  );
};

export default RootLayout;
