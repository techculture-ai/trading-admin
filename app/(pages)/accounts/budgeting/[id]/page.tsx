'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, TrendingUp, TrendingDown, Calendar, DollarSign, Users, FileText, Activity } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface Transaction {
  id: string
  date: string
  description: string
  type: 'Allocation' | 'Expenditure' | 'Reappropriation'
  amount: number
  balance: number
  approvedBy: string
}

interface BudgetDetails {
  id: string
  budgetHead: string
  department: string
  allocatedBudget: number
  utilizedBudget: number
  availableBudget: number
  utilizationPerc: number
  status: string
  financialYear: string
  approvedBy: string
  approvalDate: string
  description: string
  remarks: string
}

export default function BudgetDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  
  // Mock data - in real app, fetch based on params.id
  const [budget] = useState<BudgetDetails>({
    id: 'BUD-2024-001',
    budgetHead: 'Construction - Capital',
    department: 'Engineering',
    allocatedBudget: 500000000,
    utilizedBudget: 310000000,
    availableBudget: 190000000,
    utilizationPerc: 62,
    status: 'Active',
    financialYear: 'FY 2024-25',
    approvedBy: 'Finance Minister',
    approvalDate: '2024-04-01',
    description: 'Capital budget for construction projects including residential and commercial developments',
    remarks: 'Quarterly review scheduled for October 2024',
  })

  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      date: '2024-04-01',
      description: 'Initial Budget Allocation',
      type: 'Allocation',
      amount: 500000000,
      balance: 500000000,
      approvedBy: 'Finance Minister',
    },
    {
      id: 'TXN-002',
      date: '2024-04-15',
      description: 'Gomti Nagar Housing Scheme - Phase 1',
      type: 'Expenditure',
      amount: 125000000,
      balance: 375000000,
      approvedBy: 'Chief Engineer',
    },
    {
      id: 'TXN-003',
      date: '2024-05-10',
      description: 'Hazratganj Commercial Complex',
      type: 'Expenditure',
      amount: 95000000,
      balance: 280000000,
      approvedBy: 'Chief Engineer',
    },
    {
      id: 'TXN-004',
      date: '2024-06-05',
      description: 'Aliganj Residential Project',
      type: 'Expenditure',
      amount: 90000000,
      balance: 190000000,
      approvedBy: 'Chief Engineer',
    },
  ])

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const handleExport = () => {
    const csvContent = [
      ['Transaction ID', 'Date', 'Description', 'Type', 'Amount', 'Balance', 'Approved By'],
      ...transactions.map(txn => [
        txn.id,
        txn.date,
        txn.description,
        txn.type,
        txn.amount,
        txn.balance,
        txn.approvedBy,
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `budget_transactions_${budget.id}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const monthlyData = [
    { month: 'Apr', allocated: 50, utilized: 12 },
    { month: 'May', allocated: 50, utilized: 22 },
    { month: 'Jun', allocated: 50, utilized: 31 },
    { month: 'Jul', allocated: 50, utilized: 31 },
  ]
if (isLoading) {
    return <DetailsSkeleton />
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{budget.budgetHead}</h1>
            <p className="text-sm text-gray-600 mt-1">{budget.id} • {budget.department} Department</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${
            budget.status === 'Active' ? 'bg-green-100 text-green-700' :
            budget.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
            'bg-red-100 text-red-700'
          }`}>
            {budget.status}
          </span>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Allocated Budget</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(budget.allocatedBudget)}
              </h3>
              <p className="text-xs text-gray-500 mt-2">{budget.financialYear}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Utilized</p>
              <h3 className="text-2xl font-bold text-blue-600">
                {formatCurrency(budget.utilizedBudget)}
              </h3>
              <p className="text-xs text-blue-600 mt-2 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                {budget.utilizationPerc}% of budget
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Available</p>
              <h3 className="text-2xl font-bold text-green-600">
                {formatCurrency(budget.availableBudget)}
              </h3>
              <p className="text-xs text-gray-500 mt-2">{100 - budget.utilizationPerc}% remaining</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingDown size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Transactions</p>
              <h3 className="text-2xl font-bold text-orange-600">{transactions.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Total entries</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilization Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{data.month} 2024</span>
                  <span className="text-gray-900 font-medium">
                    {formatCurrency(data.utilized * 10000000)} / {formatCurrency(data.allocated * 10000000)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(data.utilized / data.allocated) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Approved By</p>
              <p className="text-sm font-medium text-gray-900">{budget.approvedBy}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Approval Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(budget.approvalDate).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Department</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Users size={14} className="mr-1" />
                {budget.department}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Financial Year</p>
              <p className="text-sm font-medium text-gray-900">{budget.financialYear}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Remarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {budget.description}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Remarks</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {budget.remarks}
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approved By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(txn.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{txn.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      txn.type === 'Allocation' ? 'bg-green-100 text-green-700' :
                      txn.type === 'Expenditure' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={txn.type === 'Expenditure' ? 'text-red-600' : 'text-green-600'}>
                      {txn.type === 'Expenditure' ? '-' : '+'} {formatCurrency(txn.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(txn.balance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{txn.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}