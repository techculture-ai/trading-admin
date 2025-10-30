interface StatCardProps {
  title: string
  value: string
  change: string
  lastMonth: string
  icon: any
  positive: boolean
}

export default function StatCard({ title, value, change, lastMonth, icon: Icon, positive }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            {change && (
              <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">Last month: {lastMonth}</p>
        </div>
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon size={24} className="text-gray-600" />
        </div>
      </div>
    </div>
  )
}