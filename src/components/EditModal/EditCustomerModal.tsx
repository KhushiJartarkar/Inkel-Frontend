"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useCountries } from "../../hooks/useCountries";
import { useCustomers } from "../../hooks/useCustomers";
import type { Customer } from "../../types/Customer";
import { toast } from "sonner";

interface EditCustomerModalProps {
  open: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export default function EditCustomerModal({
  open,
  onClose,
  customer,
}: EditCustomerModalProps) {
  const { update } = useCustomers();
  const { data: countries } = useCountries();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setCountry(customer.country);
    }
  }, [customer]);

  const handleSave = () => {
    if (!customer) return;

    update.mutate(
      {
        id: customer.id,
        payload: { name, country },
      },
      {
        onSuccess: () => {
          toast.success("Updated successfully!");
          onClose();
        },
        onError: () => toast.error("Failed to update!"),
      }
    );
  };

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-xl animate-scaleIn">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          {/* Country */}
          <div className="space-y-1">
            <Label>Country</Label>
            <Select value={country} onValueChange={(v) => setCountry(v)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries?.map((c: any) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={update.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {update.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
