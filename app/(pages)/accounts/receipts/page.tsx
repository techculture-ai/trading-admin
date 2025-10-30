'use client'

import { Search, Plus, Filter, Download, TrendingUp } from 'lucide-react'

const receipts = [
  {
    id: 'RCP-2024-001',
    receiptNo: 'RCP/24/001',
    date: '25 Jan 2024',
    receiptType: 'Property Sale',
    description: 'Sale of Unit A-101, Gomti Nagar',
    payer: 'Rajesh Kumar Singh',
    amount: '₹45,00,000',
    paymentMode: 'Online Transfer',
    status: 'Cleared',
  },
  {
    id: 'RCP-2024-002',
    receiptNo: 'RCP/24/002',
    date: '24 Jan 2024',
    receiptType: 'Lease Rent',
    description: 'Commercial Plot Rent - Q4 2024',
    payer: 'XYZ Enterprises',
    amount: '₹12,00,000',
    paymentMode: 'Cheque',
    status: 'Cleared',
  },
  {
    id: 'RCP-2024-003',
    receiptNo: 'RCP/24/003',
    date: '23 Jan 2024',
    receiptType: 'Property Sale',
    description: 'Sale of Unit B-205, Hazratganj',
    payer: 'Priya Sharma',
    amount: '₹62,00,000',
    paymentMode: 'Online Transfer',
    status: 'Pending Clearance',
  },
]

export default function ReceiptsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receipts & Revenue</h1>
          <p className="text-sm text-gray-600 mt-1">Track all revenue receipts and collections</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Add Receipt</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Revenue (FY 24-25)</p>
          <h3 className="text-3xl font-bold text-gray-900">₹92 Cr</h3>
          <div className="flex items-center mt-2">
            <TrendingUp size={14} className="text-green-600 mr-1" />
            <span className="text-xs text-green-600">+15% YoY</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">This Month</p>
          <h3 className="text-3xl font-bold text-green-600">₹12 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">January 2024</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Property Sales</p>
          <h3 className="text-3xl font-bold text-blue-600">₹85 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">92% of total revenue</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Clearance</p>
          <h3 className="text-3xl font-bold text-orange-600">23</h3>
          <p className="text-xs text-gray-500 mt-2">₹8.5 Cr worth</p>
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
                  placeholder="Search receipts..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receipts.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.receiptNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.receiptType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.payer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{receipt.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.paymentMode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      receipt.status === 'Cleared' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {receipt.status}
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