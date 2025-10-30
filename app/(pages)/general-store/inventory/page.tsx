'use client'

import { Search, Plus, Filter, Download, Package } from 'lucide-react'

const inventory = [
  {
    id: 'INV-GS-001',
    itemCode: 'STAT-001',
    itemName: 'A4 Paper (500 Sheets)',
    category: 'Stationery',
    unit: 'Ream',
    currentStock: 450,
    reorderLevel: 100,
    unitPrice: '₹350',
    totalValue: '₹1,57,500',
    status: 'In Stock',
  },
  {
    id: 'INV-GS-002',
    itemCode: 'IT-045',
    itemName: 'HP Printer Cartridge',
    category: 'IT Consumables',
    unit: 'Piece',
    currentStock: 25,
    reorderLevel: 30,
    unitPrice: '₹2,500',
    totalValue: '₹62,500',
    status: 'Low Stock',
  },
  {
    id: 'INV-GS-003',
    itemCode: 'FURN-023',
    itemName: 'Office Chair Executive',
    category: 'Furniture',
    unit: 'Piece',
    currentStock: 45,
    reorderLevel: 10,
    unitPrice: '₹12,000',
    totalValue: '₹5,40,000',
    status: 'In Stock',
  },
]

export default function GeneralStoreInventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">General Store Inventory</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage office supplies and consumables</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Items</p>
          <h3 className="text-3xl font-bold text-gray-900">1,245</h3>
          <p className="text-xs text-gray-500 mt-2">All categories</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Stock Value</p>
          <h3 className="text-2xl font-bold text-green-600">₹45,00,000</h3>
          <p className="text-xs text-gray-500 mt-2">Current valuation</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Low Stock Items</p>
          <h3 className="text-3xl font-bold text-orange-600">23</h3>
          <p className="text-xs text-gray-500 mt-2">Below reorder level</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Out of Stock</p>
          <h3 className="text-3xl font-bold text-red-600">8</h3>
          <p className="text-xs text-gray-500 mt-2">Needs urgent order</p>
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
                  placeholder="Search inventory..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inventory ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.itemCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.currentStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.reorderLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unitPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{item.totalValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                      item.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">View</button>
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