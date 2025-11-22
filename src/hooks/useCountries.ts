import { useQuery } from '@tanstack/react-query'
import { getCountries } from "../services/countries";

export const useCountries = () => {
return useQuery({ queryKey: ['countries'], queryFn: getCountries })
}