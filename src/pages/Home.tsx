"use client";
import React, { useMemo, useState } from "react";
import DataTable from "../components/table/DataTable";
import { getColumns } from "../components/table/columns";
import { useCustomers } from "../hooks/useCustomers";
import EditCustomerModal from "../components/EditModal/EditCustomerModal";
import { Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Home() {
  const { data, isLoading, update } = useCustomers();
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");

  const onEdit = (row: any) => {
    setEditing(row);
    setOpen(true);
  };

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) =>
        countryFilter === "All" ? true : item.country === countryFilter
      );
  }, [data, search, countryFilter]);

  const columns = useMemo(() => getColumns(onEdit), []);

  return (
  <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex justify-center p-10">
    <Toaster richColors />

    <div className="w-full max-w-6xl space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
        Entity Management
      </h1>
      <p className="text-sm opacity-70">
        Manage records — edit name, gender & country.
      </p>

      <div className="rounded-xl bg-[var(--card)] shadow-xl border border-[var(--border)]
                      transition-all duration-300 hover:shadow-2xl overflow-hidden">
        <DataTable columns={columns} data={data ?? []} />
      </div>

      <EditCustomerModal
        open={open}
        onClose={() => setOpen(false)}
        customer={editing}
      />
    </div>
  </div>
);

}
