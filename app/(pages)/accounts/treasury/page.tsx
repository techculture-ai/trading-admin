'use client'

import { Search, Filter, Download, RefreshCw, CheckCircle, Clock } from 'lucide-react'

const treasuryTransactions = [
  {
    id: 'TRY-2024-001',
    transactionId: 'PFMS/2024/001',
    date: '25 Jan 2024',
    type: 'Payment',
    description: 'Contractor Payment - ABC Builders',
    amount: '₹2,50,00,000',
    treasuryRef: 'TRY-REF-2024-001',
    status: 'Processed',
    pfmsStatus: 'Success',
  },
  {
    id: 'TRY-2024-002',
    transactionId: 'PFMS/2024/002',
    date: '24 Jan 2024',
    type: 'Receipt',
    description: 'Property Sale - Unit A-101',
    amount: '₹45,00,000',
    treasuryRef: 'TRY-REF-2024-002',
    status: 'Reconciled',
    pfmsStatus: 'Success',
  },
  {
    id: 'TRY-2024-003',
    transactionId: 'PFMS/2024/003',
    date: '23 Jan 2024',
    type: 'Payment',
    description: 'Material Payment - Cement Supply',
    amount: '₹45,00,000',
    treasuryRef: 'TRY-REF-2024-003',
    status: 'Pending',
    pfmsStatus: 'In Progress',
  },
]

export default function TreasuryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Treasury Integration (PFMS)</h1>
          <p className="text-sm text-gray-600 mt-1">Track treasury transactions and PFMS reconciliation</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCw size={20} />
            <span>Sync with PFMS</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Total Transactions</p>
              <h3 className="text-3xl font-bold text-gray-900">456</h3>
              <p className="text-xs text-gray-500 mt-2">This FY</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Reconciled</p>
          <h3 className="text-3xl font-bold text-green-600">398</h3>
          <p className="text-xs text-green-600 mt-2">87% success rate</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending</p>
          <h3 className="text-3xl font-bold text-orange-600">45</h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Failed</p>
          <h3 className="text-3xl font-bold text-red-600">13</h3>
          <p className="text-xs text-gray-500 mt-2">Needs attention</p>
        </div>
      </div>

      {/* PFMS Status */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">PFMS Connection Status</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Connected</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Last Sync</p>
            <p className="text-lg font-semibold text-gray-900">25 Oct 2025, 09:00 AM</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Next Scheduled Sync</p>
            <p className="text-lg font-semibold text-gray-900">25 Oct 2025, 03:00 PM</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">API Status</p>
            <p className="text-lg font-semibold text-green-600">Operational</p>
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
                  placeholder="Search transactions..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PFMS ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treasury Ref</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PFMS Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {treasuryTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.treasuryRef}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Reconciled' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'Processed' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      transaction.pfmsStatus === 'Success' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {transaction.pfmsStatus}
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