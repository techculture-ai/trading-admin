'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function GlobalLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-orange-500 animate-pulse"></div>
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center space-x-2">
        <Loader2 size={20} className="text-orange-500 animate-spin" />
        <span className="text-sm font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  )
}