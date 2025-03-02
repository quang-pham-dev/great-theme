import { useQuery } from '@tanstack/react-query'

import { ProductsAPI } from '@/services/api/products'

export const PRODUCTS_QUERY_KEY = ['products'] as const

export function useProducts(params?: { brandId?: string }) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, params?.brandId],
    queryFn: () => ProductsAPI.getProducts(params),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
