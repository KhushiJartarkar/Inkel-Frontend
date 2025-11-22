import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import type { Customer } from "@/types/Customer";
import { formatDate } from "@/lib/date";

const col = createColumnHelper<Customer>();

export const getColumns = (onEdit: (row: Customer) => void) => [
  col.accessor("name", {
    header: () => <span className="text-sm font-bold text-[var(--foreground)]">Entity</span>,
    cell: (info) => (
      <span className="text-sm font-medium fade-in">
        {info.getValue() ?? "—"}
      </span>
    ),
  }),

  col.accessor("gender", {
    header: () => <span className="text-sm font-bold text-[var(--foreground)]">Gender</span>,
    cell: (info) => {
      const val = info.getValue()?.toLowerCase();
      const isFemale = val === "female";
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold animate-row 
          ${isFemale ? "bg-pink-200 text-pink-700" : "bg-blue-200 text-blue-700"}`}
        >
          {isFemale ? "♀️" : "♂️"} {info.getValue() ?? "—"}
        </span>
      );
    },
  }),

  col.accessor("request_date", {
    header: () => <span className="text-sm font-bold text-[var(--foreground)]">Request Date</span>,
    cell: (info) => (
      <span className="text-sm animate-row">{formatDate(info.getValue())}</span>
    ),
  }),

  col.accessor("country", {
    header: () => <span className="text-sm font-bold text-[var(--foreground)]">Country</span>,
    cell: (info) => (
      <span className="text-sm font-medium fade-in">{info.getValue() ?? "—"}</span>
    ),
  }),

  col.display({
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <button
        onClick={() => onEdit(row.original)}
        className="p-2 rounded-lg text-[var(--foreground)] hover:text-white
        hover:bg-[var(--primary)] transition fade-in"
      >
        ✏️
      </button>
    ),
  }),
];
