import { ZodContainerType } from "@item/schemas/Item";
import { OptionsEnum } from "@report/data/OptionsEnum";
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function BaseReport() {
  const [selectedId, setSelectedId] = useState<number>(-1);
  const containers = OptionsEnum.Container.getContext()() as ZodContainerType[];

  return (
    <InputGroup className="base-report-group">
      <InputGroup.Text className="base-report-label">
        Base Report:{" "}
      </InputGroup.Text>
      <Form.Select
        onChange={(e) => setSelectedId(Number(e.target.value))}
        title="Select a container to generate a report">
        <option value={-1}></option>
        {containers &&
          containers.map((container) => (
            <option
              key={`containerOption-${container.id}`}
              value={container.id}>
              {container.scannerId} ({container.name})
            </option>
          ))}
      </Form.Select>
      <Button
        size="sm"
        variant="info"
        disabled={selectedId == -1}
        className="p-0 m-0 d-flex align-items-center">
        <a
          type="button"
          href={`/report/base/${selectedId}`}
          download
          className=" base-report-download btn btn-sm">
          Generate Report
        </a>
      </Button>
    </InputGroup>
  );
}
