'use client'

export default function IncomeChart() {
  const data = [
    { day: 'Fri', profit: 30, loss: 20 },
    { day: 'Sat', profit: 45, loss: 10 },
    { day: 'Sun', profit: 50, loss: 35 },
    { day: 'Mon', profit: 40, loss: 25 },
    { day: 'Tue', profit: 60, loss: 50 },
    { day: 'Wed', profit: 55, loss: 45 },
    { day: 'Thu', profit: 42, loss: 38 },
  ]

  const maxValue = 60 // 60k as shown in reference

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Income</h3>
        <p className="text-sm text-gray-500 mt-1">View your income in a certain period of time</p>
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-900 rounded-sm"></div>
          <span className="text-sm text-gray-600">Profit and Loss</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Loss</span>
        </div>
      </div>

      <div className="relative">
        {/* Chart Container */}
        <div className="flex">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between h-64 text-xs text-gray-500 pr-4">
            <span>60k</span>
            <span>40k</span>
            <span>20k</span>
            <span>0k</span>
          </div>

          {/* Bars */}
          <div className="flex-1 flex items-end justify-between gap-2 h-64 border-b border-gray-200">
            {data.map((item) => {
              const profitHeight = (item.profit / maxValue) * 100
              const lossHeight = (item.loss / maxValue) * 100
              return (
                <div key={item.day} className="flex-1 flex items-end justify-center gap-1 h-full">
                  <div 
                    className="flex-1 bg-gray-900 rounded-t-lg transition-all hover:bg-gray-800"
                    style={{ height: `${profitHeight}%` }}
                  ></div>
                  <div 
                    className="flex-1 bg-orange-500 rounded-t-lg transition-all hover:bg-orange-600"
                    style={{ height: `${lossHeight}%` }}
                  ></div>
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