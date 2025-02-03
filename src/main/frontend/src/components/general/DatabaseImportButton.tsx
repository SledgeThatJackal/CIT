import { useUploadData } from "@services/mutations";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";

const DatabaseImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const databaseImportMutation = useUploadData();

  const onClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const data = new FormData();

    data.append("file", files[0]);

    databaseImportMutation.mutate(data);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <React.Fragment>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        accept=".json"
        onChange={onChange}
      />
      <Button size="sm" variant="info" onClick={onClick}>
        Import
      </Button>
    </React.Fragment>
  );
};

export default DatabaseImportButton;
