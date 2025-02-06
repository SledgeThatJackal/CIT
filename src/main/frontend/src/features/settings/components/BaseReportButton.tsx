import React from "react";

export default function BaseReportButton() {
  return (
    <a
      type="button"
      href={`/report/base`}
      download
      className="btn btn-info btn-sm">
      Generate Report
    </a>
  );
}
