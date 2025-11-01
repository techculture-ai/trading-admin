'use client'

interface RevenueChartProps {
  data: { day: string; value: number }[]
  period: string
  onPeriodChange: (period: string) => void
}

export default function RevenueChart({ data, period, onPeriodChange }: RevenueChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="bg-white flex flex-col justify-between rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
        <select 
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
        >
          <option value="7days">This Week</option>
          <option value="30days">This Month</option>
          <option value="90days">Last 90 Days</option>
          <option value="1year">This Year</option>
        </select>
      </div>
      
      <div className="relative">
        <div className="flex">
          <div className="flex flex-col justify-between h-64 text-xs text-gray-500 pr-4">
            <span>{maxValue}k</span>
            <span>{Math.round(maxValue * 0.66)}k</span>
            <span>{Math.round(maxValue * 0.33)}k</span>
            <span>0k</span>
          </div>

          <div className="flex-1 flex items-end justify-between gap-2 h-64 border-b border-gray-200">
            {data.map((item, index) => {
              const heightPercentage = (item.value / maxValue) * 100
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '100%' }}>
                    <div className="absolute z-10 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ bottom: `${heightPercentage}%`, marginBottom: '8px' }}>
                      ₹{(item.value * 100000).toLocaleString('en-IN')}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500"></div>
                    </div>
                    <div 
                      className="w-full bg-orange-500 rounded-t-lg transition-all hover:bg-orange-600 cursor-pointer"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex ml-12 mt-2">
          {data.map((item) => (
            <div key={item.day} className="flex-1 text-center">
              <span className="text-sm text-gray-600 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}