import { MOCK_URL_BRANDS } from '@/constants/mock-url'
import { logError } from '@/utils/error'

import type { Brand } from '@/interfaces'

export const BrandsAPI = {
  getBrands: async (): Promise<Brand[]> => {
    try {
      const response = await fetch(MOCK_URL_BRANDS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data?.brands || []
    } catch (error) {
      logError(error, 'BrandsAPI.getBrands')
      throw error
    }
  },
}
