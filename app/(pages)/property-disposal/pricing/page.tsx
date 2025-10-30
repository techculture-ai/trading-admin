'use client'

import { Search, Plus, Filter, TrendingUp, Calculator } from 'lucide-react'

const pricings = [
  {
    id: 'PRICE-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    unitType: '2BHK',
    basePrice: '₹4,200/sq.ft',
    floorRiseCharge: '₹150/sq.ft',
    cornerCharge: '₹200/sq.ft',
    parkingCharge: '₹2,00,000',
    finalPrice: '₹45,00,000',
    effectiveDate: '01 Jan 2024',
    status: 'Active',
  },
  {
    id: 'PRICE-2024-002',
    projectName: 'Hazratganj Apartments',
    unitType: '3BHK',
    basePrice: '₹4,800/sq.ft',
    floorRiseCharge: '₹200/sq.ft',
    cornerCharge: '₹250/sq.ft',
    parkingCharge: '₹2,50,000',
    finalPrice: '₹62,00,000',
    effectiveDate: '15 Jan 2024',
    status: 'Active',
  },
]

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pricing Engine</h1>
          <p className="text-sm text-gray-600 mt-1">Manage property pricing, escalations, and discounts</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          <Plus size={20} />
          <span>Add Price Rule</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Avg. Price/Sq.ft</p>
              <h3 className="text-2xl font-bold text-gray-900">₹4,500</h3>
              <div className="flex items-center mt-2">
                <TrendingUp size={14} className="text-green-600 mr-1" />
                <span className="text-xs text-green-600">+8% YoY</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Projects</p>
          <h3 className="text-3xl font-bold text-gray-900">15</h3>
          <p className="text-xs text-gray-500 mt-2">With active pricing</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Discounts Applied</p>
          <h3 className="text-3xl font-bold text-orange-600">45</h3>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Discount</p>
          <h3 className="text-3xl font-bold text-gray-900">7.5%</h3>
          <p className="text-xs text-gray-500 mt-2">Standard discount</p>
        </div>
      </div>

      {/* Pricing Calculator */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Select Project</option>
              <option>Gomti Nagar Housing</option>
              <option>Hazratganj Apartments</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Select Type</option>
              <option>1BHK</option>
              <option>2BHK</option>
              <option>3BHK</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area (sq.ft)</label>
            <input
              type="number"
              placeholder="Enter area"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Floor Number</label>
            <input
              type="number"
              placeholder="Enter floor"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Calculate Price
          </button>
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
                  placeholder="Search pricing rules..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor Rise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Corner Charge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Effective Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pricings.map((pricing) => (
                <tr key={pricing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pricing.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pricing.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.unitType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pricing.basePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.floorRiseCharge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.cornerCharge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.parkingCharge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.effectiveDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {pricing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">Edit</button>
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