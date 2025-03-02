type ErrorType = Error | unknown

interface ErrorResponse {
  message: string
  code?: string
  details?: unknown
}

export function handleError(error: ErrorType): ErrorResponse {
  // Handle Error objects
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'APP_ERROR',
      details: error,
    }
  }

  // Handle API errors
  if (typeof error === 'object' && error !== null) {
    const apiError = error as Record<string, unknown>

    // Handle specific API error formats
    if ('message' in apiError) {
      return {
        message: String(apiError.message),
        code: String(apiError.code || 'API_ERROR'),
        details: apiError,
      }
    }
  }

  // Handle unknown errors
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    details: error,
  }
}

export function logError(error: ErrorType, context?: string): void {
  const formattedError = handleError(error)

  // Log to console in development
  if (__DEV__) {
    console.error(
      `[${context || 'App'}] ${formattedError.code}: ${formattedError.message}`,
      formattedError.details,
    )
  }

  // Here you can add additional error logging:
  // - Analytics
  // - Error reporting services
  // - Remote logging
}
