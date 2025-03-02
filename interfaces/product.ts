import type { ImageSourcePropType } from 'react-native'

export interface Product {
  id: string
  brandId: string
  price: number
  title?: string
  name: string
  type: string
  source: string
  description?: string
  reviewers: Reviewer[]
  sizes: ProductSize[]
  like?: boolean
  imagesPreview?: ImageReviewer[]
  rating?: string
  comment: string
}

export interface ProductSize {
  id: string
  size: string
}
export interface Reviewer {
  id: number
  name: string
  avatar: string
  rating: number
  comment: string
  date: string
}

export interface ImageReviewer {
  id: string
  image: string | ImageSourcePropType
}
