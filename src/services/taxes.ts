import { api } from './api'
import type { Customer } from '@/types/Customer'


export const getCustomers = async () => {
const res = await api.get<Customer[]>('/taxes')
return res.data
}


export const updateCustomer = async (id: string, payload: Partial<Customer>) => {
const res = await api.put(`/taxes/${id}`, payload)
return res.data
}