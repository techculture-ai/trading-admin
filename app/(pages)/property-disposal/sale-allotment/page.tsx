'use client'

import { Search, Plus, Filter, Download, Users } from 'lucide-react'

const allotments = [
  {
    id: 'ALLOT-2024-001',
    applicationNo: 'APP-2024-156',
    unitNo: 'A-101',
    projectName: 'Gomti Nagar Housing Scheme',
    applicantName: 'Rajesh Kumar Singh',
    applicantContact: '+91 9876543210',
    category: 'General',
    allotmentDate: '15 Jan 2024',
    price: '₹45,00,000',
    amountPaid: '₹45,00,000',
    status: 'Completed',
    possessionDate: '30 Dec 2024',
  },
  {
    id: 'ALLOT-2024-002',
    applicationNo: 'APP-2024-157',
    unitNo: 'B-205',
    projectName: 'Hazratganj Apartments',
    applicantName: 'Priya Sharma',
    applicantContact: '+91 9876543211',
    category: 'EWS',
    allotmentDate: '18 Jan 2024',
    price: '₹62,00,000',
    amountPaid: '₹31,00,000',
    status: 'Payment Pending',
    possessionDate: '31 Mar 2025',
  },
]

export default function SaleAllotmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sale & Allotment Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track property sales, allotments, and buyer management</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          <Plus size={20} />
          <span>New Allotment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Applications</p>
          <h3 className="text-3xl font-bold text-gray-900">567</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Allotments Made</p>
          <h3 className="text-3xl font-bold text-green-600">289</h3>
          <p className="text-xs text-green-600 mt-2">51% conversion</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Revenue Collected</p>
          <h3 className="text-2xl font-bold text-blue-600">₹85 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Payments</p>
          <h3 className="text-3xl font-bold text-orange-600">45</h3>
          <p className="text-xs text-gray-500 mt-2">₹12.5 Cr due</p>
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
                  placeholder="Search allotments..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allotment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allotments.map((allotment) => (
                <tr key={allotment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{allotment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{allotment.applicationNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allotment.unitNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{allotment.applicantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{allotment.applicantContact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{allotment.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{allotment.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{allotment.amountPaid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      allotment.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {allotment.status}
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