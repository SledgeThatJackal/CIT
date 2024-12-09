import { useErrorState } from "@hooks/state/useErrorState";
import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { displayError } = useErrorState();

  const handleLogout = async () => {
    const response = await axios.post(`/logout`);

    const url = new URL(response.request.responseURL);
    const searchParams = new URLSearchParams(url.search);

    if (searchParams.get("logout")) {
      navigate("/login");
    } else {
      displayError(
        "Something went wrong and you were unable to logout. Please try again.",
      );
    }
  };

  return (
    <Button variant="link" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
