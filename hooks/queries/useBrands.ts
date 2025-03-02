import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { BrandsAPI } from '@/services/api/brands'

import type { Brand } from '@/interfaces'

export const BRANDS_QUERY_KEY = ['brands'] as const

export function useBrands(): UseQueryResult<Brand[], Error> {
  return useQuery({
    queryKey: BRANDS_QUERY_KEY,
    queryFn: BrandsAPI.getBrands,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
