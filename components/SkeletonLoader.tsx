'use client'

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-64 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 animate-pulse">
            <div className="h-12 flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
            <div className="h-12 w-24 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
      <div className="h-8 w-32 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 w-20 bg-gray-200 rounded"></div>
    </div>
  )
}

export function DetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-96 bg-gray-200 rounded"></div>
      </div>
      <div className="bg-white rounded-lg p-8 animate-pulse">
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <TableSkeleton />
    </div>
  )
}