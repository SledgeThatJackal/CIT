import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useContainers } from "@services/queries";

import { useCreateLink } from "@services/mutations";
import { ZodContainerSchema } from "../../schemas/Item";

type AddLinkProps = {
  itemId: number;
};

const AddLink = ({ itemId }: AddLinkProps) => {
  const containerQuery = useContainers().data;
  const [container, setContainer] = useState<ZodContainerSchema>();
  const [quantity, setQuantity] = useState<number>(1);

  const [show, setShow] = useState<boolean>(false);

  const createLinkMutation = useCreateLink();

  const handleSave = () => {
    const containerId = container?.id;

    if (containerId && container) {
      createLinkMutation.mutateAsync({ itemId, containerId, quantity });

      setContainer(undefined);
      setQuantity(1);
    }
  };

  return (
    <>
      {show && (
        <tr>
          <td>{container?.name}</td>
          <td>
            <Form.Select
              onChange={(value) =>
                setContainer(
                  containerQuery?.find(
                    (container) => container.id === Number(value.target.value),
                  ),
                )
              }>
              <option value={-1}></option>
              {containerQuery && containerQuery.length > 0 ? (
                containerQuery.map((container) => (
                  <option value={container.id}>
                    {container.scannerId} ({container.name})
                  </option>
                ))
              ) : (
                <option value={-2}>No Tags found</option>
              )}
            </Form.Select>
          </td>
          <td>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </td>
          <td>
            <Button
              variant="success"
              size="sm"
              className="me-1"
              onClick={handleSave}>
              Save
            </Button>
            <Button variant="danger" size="sm" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </td>
        </tr>
      )}
      {!show && (
        <Button
          variant="success"
          className="mt-2"
          onClick={() => setShow(true)}>
          Add
        </Button>
      )}
    </>
  );
};

export default AddLink;
