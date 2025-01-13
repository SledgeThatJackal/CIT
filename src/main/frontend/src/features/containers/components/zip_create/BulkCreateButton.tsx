import { useBulkContainerCreate } from "@services/mutations";
import React from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BulkCreateButton = () => {
  const bulkContainerCreateMutation = useBulkContainerCreate();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    bulkContainerCreateMutation.mutate(formData);
    navigate("/container");
  };

  return <Form.Control type="file" accept=".zip" onChange={handleSubmit} />;
};

export default BulkCreateButton;
