'use client'

import { Search, Filter, Download, BarChart3 } from 'lucide-react'

const inventory = [
  {
    projectName: 'Gomti Nagar Housing Scheme',
    totalUnits: 150,
    available: 35,
    sold: 98,
    reserved: 12,
    blocked: 5,
    availabilityPerc: '23%',
    soldPerc: '65%',
  },
  {
    projectName: 'Hazratganj Apartments',
    totalUnits: 120,
    available: 42,
    sold: 68,
    reserved: 8,
    blocked: 2,
    availabilityPerc: '35%',
    soldPerc: '57%',
  },
  {
    projectName: 'Aliganj Residency',
    totalUnits: 180,
    available: 46,
    sold: 123,
    reserved: 18,
    blocked: 3,
    availabilityPerc: '26%',
    soldPerc: '68%',
  },
]

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Status</h1>
          <p className="text-sm text-gray-600 mt-1">Real-time property inventory and availability tracking</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Download size={20} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Units</p>
          <h3 className="text-3xl font-bold text-gray-900">450</h3>
          <p className="text-xs text-gray-500 mt-2">All projects</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600 mb-2">Available</p>
          <h3 className="text-3xl font-bold text-green-600">123</h3>
          <p className="text-xs text-gray-500 mt-2">27% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600 mb-2">Sold</p>
          <h3 className="text-3xl font-bold text-blue-600">289</h3>
          <p className="text-xs text-gray-500 mt-2">64% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-orange-500">
          <p className="text-sm text-gray-600 mb-2">Reserved</p>
          <h3 className="text-3xl font-bold text-orange-600">38</h3>
          <p className="text-xs text-gray-500 mt-2">9% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Blocked</p>
          <h3 className="text-3xl font-bold text-red-600">10</h3>
          <p className="text-xs text-gray-500 mt-2">2% of total</p>
        </div>
      </div>

      {/* Inventory Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Project-wise Inventory Distribution</h2>
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 size={64} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Inventory Chart</p>
            <p className="text-sm text-gray-500 mt-2">Visual representation of project-wise inventory</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reserved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blocked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Availability %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.totalUnits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{item.available}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.sold}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{item.reserved}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">{item.blocked}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.availabilityPerc}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: item.soldPerc }}></div>
                      </div>
                      <span>{item.soldPerc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}