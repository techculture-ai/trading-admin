'use client'

import { useState, useEffect } from 'react'

export function usePageLoading(minLoadingTime = 800) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching with minimum loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minLoadingTime)

    return () => clearTimeout(timer)
  }, [minLoadingTime])

  return isLoading
}