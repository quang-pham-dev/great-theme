import { MOCK_URL_PRODUCTS } from '@/constants/mock-url'
import { logError } from '@/utils/error'

import type { Product } from '@/interfaces'

export const ProductsAPI = {
  getProducts: async (params?: { brandId?: string }): Promise<Product[]> => {
    try {
      const response = await fetch(MOCK_URL_PRODUCTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const products = data?.products || []
      if (params?.brandId) {
        const productByBrand = products.filter(
          (product: Product) =>
            String(product.brandId) === String(params.brandId),
        )

        return productByBrand
      }

      return products
    } catch (error) {
      logError(error, 'ProductsAPI.getProducts')
      throw error
    }
  },

  async getProduct(id?: string): Promise<Product> {
    try {
      const response = await fetch(MOCK_URL_PRODUCTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const products: Product[] = data?.products || []
      const product = products.find((p: Product) => String(p.id) === String(id))
      if (!product) {
        throw new Error('Product not found')
      }

      return product
    } catch (error) {
      logError(error, 'ProductsAPI.getProduct')
      throw error
    }
  },
}
