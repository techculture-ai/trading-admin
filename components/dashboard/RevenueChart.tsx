'use client'

export default function RevenueChart() {
  const data = [
    { day: 'Fri', value: 20 },
    { day: 'Sat', value: 15 },
    { day: 'Sun', value: 25 },
    { day: 'Mon', value: 22 },
    { day: 'Tue', value: 18 },
    { day: 'Wed', value: 28 },
    { day: 'Thu', value: 20 },
  ]

  const maxValue = 30 // 30k as shown in reference

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue analytics</h3>
        <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="relative">
        {/* Chart Container */}
        <div className="flex ">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between h-64 text-xs text-gray-500 pr-4">
            <span>30k</span>
            <span>20k</span>
            <span>10k</span>
            <span>0k</span>
          </div>

          {/* Bars */}
          <div className="flex-1 flex items-end justify-between gap-2 h-64 border-b border-gray-200">
            {data.map((item, index) => {
              const heightPercentage = (item.value / maxValue) * 100
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '100%' }}>
                    {index === 5 && (
                      <div className="absolute z-10 bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium whitespace-nowrap"
                        style={{ bottom: `${heightPercentage}%`, marginBottom: '8px' }}>
                        $22,649
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500"></div>
                      </div>
                    )}
                    <div 
                      className="w-full bg-orange-500 rounded-t-lg transition-all hover:bg-orange-600"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* X-axis labels */}
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