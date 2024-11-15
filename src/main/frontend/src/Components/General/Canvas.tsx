import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useCanvasState } from "@hooks/state/useCanvasState";
import { useActionState } from "@item/hooks/useActionState";
import { useEditState } from "@type/hooks/state/useEditState";

const Canvas = () => {
  const {
    showCanvas,
    component: ComponentToRender,
    placement,
    title,
    closeCanvas,
  } = useCanvasState();
  const { clearAction } = useActionState();
  const { clearProps } = useEditState();

  const handleClose = () => {
    closeCanvas();
    clearAction();
    clearProps();
  };

  return (
    <Offcanvas
      className="bg-dark text-white"
      show={showCanvas}
      onHide={handleClose}
      placement={placement || "bottom"}
      keyboard
      style={placement === "bottom" ? { height: "50vh" } : {}}
      scroll={true}
      backdrop={true}>
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {ComponentToRender ? (
          <ComponentToRender />
        ) : (
          <div>Nothing to display</div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Canvas;
