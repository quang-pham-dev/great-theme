import { useQuery } from '@tanstack/react-query'

import { ProductsAPI } from '@/services/api/products'

export const PRODUCT_QUERY_KEY = ['product'] as const

export function useProduct(id: string) {
  return useQuery({
    queryKey: [...PRODUCT_QUERY_KEY, id],
    queryFn: () => ProductsAPI.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  })
}
