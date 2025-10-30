'use client'

import { Search, Plus, Filter, Download, Home } from 'lucide-react'

const properties = [
  {
    id: 'PROP-2024-001',
    unitNo: 'A-101',
    projectName: 'Gomti Nagar Housing Scheme',
    type: '2BHK',
    carpetArea: '950 sq.ft',
    builtUpArea: '1150 sq.ft',
    floor: '1st Floor',
    facing: 'East',
    price: '₹45,00,000',
    status: 'Sold',
    possessionDate: '30 Dec 2024',
  },
  {
    id: 'PROP-2024-002',
    unitNo: 'B-205',
    projectName: 'Hazratganj Apartments',
    type: '3BHK',
    carpetArea: '1250 sq.ft',
    builtUpArea: '1450 sq.ft',
    floor: '2nd Floor',
    facing: 'North',
    price: '₹62,00,000',
    status: 'Available',
    possessionDate: '31 Mar 2025',
  },
  {
    id: 'PROP-2024-003',
    unitNo: 'C-302',
    projectName: 'Aliganj Residency',
    type: '2BHK',
    carpetArea: '875 sq.ft',
    builtUpArea: '1050 sq.ft',
    floor: '3rd Floor',
    facing: 'West',
    price: '₹38,00,000',
    status: 'Reserved',
    possessionDate: '15 Jan 2025',
  },
]

export default function PropertyMasterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Master</h1>
          <p className="text-sm text-gray-600 mt-1">Manage complete property inventory and unit details</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          <Plus size={20} />
          <span>Add Property</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Properties</p>
          <h3 className="text-3xl font-bold text-gray-900">450</h3>
          <p className="text-xs text-gray-500 mt-2">All units</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Available</p>
          <h3 className="text-3xl font-bold text-green-600">123</h3>
          <p className="text-xs text-gray-500 mt-2">Ready for sale</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Sold</p>
          <h3 className="text-3xl font-bold text-blue-600">289</h3>
          <p className="text-xs text-gray-500 mt-2">64.2% sold</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Reserved</p>
          <h3 className="text-3xl font-bold text-orange-600">38</h3>
          <p className="text-xs text-gray-500 mt-2">Booking in progress</p>
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
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carpet Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Facing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.unitNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.carpetArea}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.floor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.facing}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      property.status === 'Sold' ? 'bg-blue-100 text-blue-700' :
                      property.status === 'Available' ? 'bg-green-100 text-green-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {property.status}
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