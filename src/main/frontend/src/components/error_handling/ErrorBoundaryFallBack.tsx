import React from "react";
import { Button } from "react-bootstrap";
import { FallbackProps } from "react-error-boundary";

export default function ErrorBoundaryFallBack({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  console.log(error);

  return (
    <div>
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.response.data.message}</pre>
      <Button onClick={resetErrorBoundary}>Reset</Button>
    </div>
  );
}
