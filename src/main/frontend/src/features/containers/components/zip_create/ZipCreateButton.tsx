import { useBulkContainerCreate } from "@services/mutations";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ZipCreateButton = () => {
  const bulkContainerCreateMutation = useBulkContainerCreate();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    bulkContainerCreateMutation.mutate(formData);
    navigate("/container");
  };

  return (
    <React.Fragment>
      <Button
        size="sm"
        className="shadow"
        onClick={() => inputRef.current?.click()}>
        Upload Zip
      </Button>
      <input
        type="file"
        accept=".zip"
        onChange={handleSubmit}
        style={{ display: "none" }}
        ref={inputRef}
      />
    </React.Fragment>
  );
};

export default ZipCreateButton;
