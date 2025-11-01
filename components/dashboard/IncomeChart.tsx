'use client'

interface IncomeChartProps {
  data: { day: string; profit: number; loss: number }[]
}

export default function IncomeChart({ data }: IncomeChartProps) {
  const maxValue = 60

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Income</h3>
        <p className="text-sm text-gray-500 mt-1">View your income in a certain period of time</p>
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-900 rounded-sm"></div>
          <span className="text-sm text-gray-600">Profit</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Loss</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between h-64 text-xs text-gray-500 pr-4">
            <span>60k</span>
            <span>40k</span>
            <span>20k</span>
            <span>0k</span>
          </div>

          {/* Chart Area */}
          <div className="flex-1 relative">
            <div className="flex items-end justify-between gap-2 h-64 border-b border-gray-200">
              {data.map((item, index) => {
                const profitHeight = (item.profit / maxValue) * 100
                const lossHeight = (item.loss / maxValue) * 100
                return (
                  <div key={index} className="flex-1 flex items-end justify-center gap-1 h-full">
                    {/* Profit Bar */}
                    <div className="relative flex-1 flex items-end h-full group">
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Profit: ₹{(item.profit * 1000).toLocaleString('en-IN')}
                      </div>
                      <div 
                        className="w-full bg-gray-900 rounded-t-lg transition-all hover:bg-gray-800 cursor-pointer"
                        style={{ height: `${profitHeight}%`, minHeight: profitHeight > 0 ? '4px' : '0' }}
                      ></div>
                    </div>
                    {/* Loss Bar */}
                    <div className="relative flex-1 flex items-end h-full group">
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Loss: ₹{(item.loss * 1000).toLocaleString('en-IN')}
                      </div>
                      <div 
                        className="w-full bg-orange-500 rounded-t-lg transition-all hover:bg-orange-600 cursor-pointer"
                        style={{ height: `${lossHeight}%`, minHeight: lossHeight > 0 ? '4px' : '0' }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex ml-12 mt-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-sm text-gray-600 font-medium">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}