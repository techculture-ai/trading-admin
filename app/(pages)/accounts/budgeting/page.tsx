'use client'

import { Search, Plus, Filter, Download, TrendingUp } from 'lucide-react'

const budgets = [
  {
    id: 'BUD-2024-001',
    budgetHead: 'Construction - Capital',
    department: 'Engineering',
    allocatedBudget: '₹50,00,00,000',
    utilizedBudget: '₹31,00,00,000',
    availableBudget: '₹19,00,00,000',
    utilizationPerc: '62%',
    status: 'Active',
  },
  {
    id: 'BUD-2024-002',
    budgetHead: 'Land Acquisition',
    department: 'Land',
    allocatedBudget: '₹30,00,00,000',
    utilizedBudget: '₹18,50,00,000',
    availableBudget: '₹11,50,00,000',
    utilizationPerc: '62%',
    status: 'Active',
  },
  {
    id: 'BUD-2024-003',
    budgetHead: 'Administrative Expenses',
    department: 'Admin',
    allocatedBudget: '₹8,00,00,000',
    utilizedBudget: '₹3,60,00,000',
    availableBudget: '₹4,40,00,000',
    utilizationPerc: '45%',
    status: 'Active',
  },
]

export default function BudgetingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage annual budgets and allocations</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Add Budget Head</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Budget (FY 24-25)</p>
          <h3 className="text-3xl font-bold text-gray-900">₹125 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Annual allocation</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Utilized</p>
          <h3 className="text-3xl font-bold text-blue-600">₹78 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">62% utilized</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Available</p>
          <h3 className="text-3xl font-bold text-green-600">₹47 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">38% remaining</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Re-appropriations</p>
          <h3 className="text-3xl font-bold text-orange-600">12</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
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
                  placeholder="Search budget heads..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget Head</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allocated Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilized Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilization %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{budget.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{budget.budgetHead}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{budget.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{budget.allocatedBudget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{budget.utilizedBudget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{budget.availableBudget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: budget.utilizationPerc }}></div>
                      </div>
                      <span className="text-gray-600">{budget.utilizationPerc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {budget.status}
                    </span>
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