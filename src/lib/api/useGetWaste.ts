import useSWR from 'swr'
import { ProblemError } from './ProblemError'
import { fetcher } from './fetcher'

export type WasteData = {
  allowed_on_road: boolean
  allows_heavy_waste: boolean
  area: string
  created_at: string
  forbidden: boolean
  hire_period_days: number
  id: number
  per_tonne_cost: number | null
  postcode: string
  price_before_vat: number
  size: number
  transport_cost: null | number
  updated_at: string
  vat: number
}

export function useGetWaste() {
  const API_URL = 'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
  
  const { data, isLoading, error } = useSWR<WasteData[], ProblemError>(
    API_URL,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  )
  
  return {
    data,
    isLoading,
    error,
  }
}