'use client'

import { Search, Plus, Filter, Download, CreditCard } from 'lucide-react'

const payables = [
  {
    id: 'PAY-2024-001',
    voucherNo: 'V/24/001',
    date: '20 Jan 2024',
    paymentType: 'Contractor Payment',
    description: 'Running Bill RB-05 - ABC Builders',
    payee: 'ABC Builders Ltd.',
    amount: '₹2,50,00,000',
    dueDate: '30 Jan 2024',
    status: 'Paid',
    paymentDate: '25 Jan 2024',
  },
  {
    id: 'PAY-2024-002',
    voucherNo: 'V/24/002',
    date: '22 Jan 2024',
    paymentType: 'Material Payment',
    description: 'Cement Supply - January 2024',
    payee: 'XYZ Cement Suppliers',
    amount: '₹45,00,000',
    dueDate: '05 Feb 2024',
    status: 'Approved',
    paymentDate: '-',
  },
  {
    id: 'PAY-2024-003',
    voucherNo: 'V/24/003',
    date: '23 Jan 2024',
    paymentType: 'Contractor Payment',
    description: 'Running Bill RB-03 - XYZ Construction',
    payee: 'XYZ Construction Co.',
    amount: '₹3,80,00,000',
    dueDate: '10 Feb 2024',
    status: 'Pending Approval',
    paymentDate: '-',
  },
]

export default function PayablesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payables Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage all payments and vendor bills</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Add Payment</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Payables</p>
          <h3 className="text-3xl font-bold text-gray-900">₹15 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Outstanding amount</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Paid This Month</p>
          <h3 className="text-3xl font-bold text-green-600">₹8 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">January 2024</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Approval</p>
          <h3 className="text-3xl font-bold text-orange-600">23</h3>
          <p className="text-xs text-gray-500 mt-2">₹5.2 Cr worth</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Overdue</p>
          <h3 className="text-3xl font-bold text-red-600">8</h3>
          <p className="text-xs text-gray-500 mt-2">₹1.2 Cr worth</p>
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
                  placeholder="Search payables..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Voucher No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payables.map((payable) => (
                <tr key={payable.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payable.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payable.voucherNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payable.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payable.paymentType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payable.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payable.payee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">{payable.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payable.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      payable.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      payable.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {payable.status}
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