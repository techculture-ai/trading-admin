'use client'

import { Search, Plus, Filter, Download, ShoppingCart } from 'lucide-react'

const procurements = [
  {
    id: 'PO-GS-001',
    poNumber: 'PO/GS/2024/001',
    vendor: 'ABC Stationery Mart',
    category: 'Stationery',
    orderDate: '20 Oct 2025',
    deliveryDate: '30 Oct 2025',
    totalAmount: '₹2,50,000',
    status: 'Delivered',
    items: 12,
  },
  {
    id: 'PO-GS-002',
    poNumber: 'PO/GS/2024/002',
    vendor: 'XYZ IT Solutions',
    category: 'IT Consumables',
    orderDate: '22 Oct 2025',
    deliveryDate: '05 Nov 2025',
    totalAmount: '₹1,80,000',
    status: 'In Transit',
    items: 8,
  },
  {
    id: 'PO-GS-003',
    poNumber: 'PO/GS/2024/003',
    vendor: 'Modern Furniture Co.',
    category: 'Furniture',
    orderDate: '24 Oct 2025',
    deliveryDate: '10 Nov 2025',
    totalAmount: '₹4,50,000',
    status: 'Pending',
    items: 15,
  },
]

export default function GeneralStoreProcurementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Procurement Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage purchase orders and vendor transactions</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Create PO</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total POs (2024)</p>
          <h3 className="text-3xl font-bold text-gray-900">156</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Value</p>
          <h3 className="text-2xl font-bold text-green-600">₹1.2 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Procurement spend</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active POs</p>
          <h3 className="text-3xl font-bold text-blue-600">23</h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Delivery</p>
          <h3 className="text-3xl font-bold text-orange-600">12</h3>
          <p className="text-xs text-gray-500 mt-2">Awaiting receipt</p>
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
                  placeholder="Search purchase orders..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {procurements.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{po.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{po.poNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{po.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.orderDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.deliveryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{po.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.items} items</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      po.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      po.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {po.status}
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