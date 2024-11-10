import React from "react";
import { FallbackProps } from "react-error-boundary";

export default function ServerErrors({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
