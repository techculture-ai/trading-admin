'use client'

import { Search, Plus, Filter, Download } from 'lucide-react'

const materials = [
  {
    id: 'MAT-ENG-001',
    materialCode: 'CEM-OPC-53',
    materialName: 'Cement OPC 53 Grade',
    category: 'Cement',
    unit: 'Bag (50 kg)',
    currentStock: 2500,
    reorderLevel: 500,
    specification: 'IS 12269:2013',
    unitPrice: '₹420',
    totalValue: '₹10,50,000',
    status: 'In Stock',
  },
  {
    id: 'MAT-ENG-002',
    materialCode: 'STL-TMT-12',
    materialName: 'Steel TMT Bars 12mm',
    category: 'Steel',
    unit: 'Ton',
    currentStock: 45,
    reorderLevel: 50,
    specification: 'IS 1786:2008',
    unitPrice: '₹58,000',
    totalValue: '₹26,10,000',
    status: 'Low Stock',
  },
  {
    id: 'MAT-ENG-003',
    materialCode: 'AGG-20MM',
    materialName: 'Aggregate 20mm',
    category: 'Aggregates',
    unit: 'Cu.M.',
    currentStock: 850,
    reorderLevel: 200,
    specification: 'IS 383:2016',
    unitPrice: '₹1,200',
    totalValue: '₹10,20,000',
    status: 'In Stock',
  },
]

export default function MaterialMasterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Material Master</h1>
          <p className="text-sm text-gray-600 mt-1">Manage construction materials and specifications</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Add Material</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Materials</p>
          <h3 className="text-3xl font-bold text-gray-900">856</h3>
          <p className="text-xs text-gray-500 mt-2">All categories</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Stock Value</p>
          <h3 className="text-2xl font-bold text-green-600">₹2.5 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Current valuation</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Critical Stock</p>
          <h3 className="text-3xl font-bold text-orange-600">15</h3>
          <p className="text-xs text-gray-500 mt-2">Below reorder level</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Quality Tested</p>
          <h3 className="text-3xl font-bold text-blue-600">234</h3>
          <p className="text-xs text-gray-500 mt-2">This month</p>
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
                  placeholder="Search materials..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.materialCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.materialName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.currentStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.reorderLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.specification}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.unitPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{material.totalValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      material.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                      material.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {material.status}
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