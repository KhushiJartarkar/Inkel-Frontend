import { api } from './api'
import type { Country } from '@/types/Country'


export const getCountries = async () => {
const res = await api.get<Country[]>('/countries')
return res.data
}