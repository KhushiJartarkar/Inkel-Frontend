import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCustomers, updateCustomer } from "../services/taxes";
import { Customer } from "../types/Customer";

export const useCustomers = () => {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => await getCustomers(), // ⬅ FIXED HERE
  });

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) =>
      await updateCustomer(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return { data, isLoading, update };
};
