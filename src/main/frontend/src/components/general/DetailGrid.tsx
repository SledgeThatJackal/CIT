import React, { useEffect, useRef, useState } from "react";
import { useDetailGridData } from "@hooks/data/useDetailGridData";
import { DataType, DetailContextValueType } from "./DetailBody";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Container } from "react-bootstrap";
import "@styles/DetailGrid.css";
import useScrollbar from "@hooks/useScrollbar";
import { useDetailContext } from "@hooks/data/useDetailContext";
import GenericModal from "./GenericModal";

const DetailGrid = <T extends DataType>() => {
  const {
    data: { containerItems: data },
  } = useDetailContext<DetailContextValueType<T, unknown>>();
  const { columns } = useDetailGridData(data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  useScrollbar(tableRef, scrollRef);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.style.display = "grid";
      tableRef.current.style.gridTemplateColumns = `repeat(${columns.length - 3}, 1fr) auto auto auto`;
    }
  }, [columns.length, tableRef]);

  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [data]);

  return (
    <Container fluid className="detail-grid-container" ref={scrollRef}>
      <GenericModal />
      <Container fluid className="detail-grid-table" ref={tableRef}>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <div
              key={`detailGrid-${headerGroup.id}`}
              className="detail-grid-header detail-grid-row">
              {headerGroup.headers.map((header) => {
                return (
                  <div
                    key={`detailGridHeader-${header.id}`}
                    className="detail-grid-column">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                );
              })}
            </div>
          );
        })}
        <React.Fragment key={`rows-${key}`}>
          {table.getRowModel().rows.map((row) => {
            return (
              <div key={`detailRow-${row.id}`} className="detail-grid-row">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <div
                      key={`detailCell-${cell.id}`}
                      className="detail-grid-column">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </React.Fragment>
      </Container>
    </Container>
  );
};

export default DetailGrid;
