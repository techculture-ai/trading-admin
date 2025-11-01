'use client'

import { useState } from 'react'
import { Search, Filter, Download, RefreshCw, CheckCircle, Clock, X, Eye, Edit, Trash2, ArrowRight, Plus, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface TreasuryTransaction {
  id: string
  transactionId: string
  date: string
  type: string
  description: string
  amount: number
  treasuryRef: string
  status: string
  pfmsStatus: string
  payeePayerName: string
  billVoucherNo: string
  bankName: string
  accountNo: string
  ifscCode: string
  sanctionedBy: string
  remarks: string
  createdBy: string
  lastSyncTime: string
}

const initialTransactions: TreasuryTransaction[] = [
  {
    id: 'TRY-2024-001',
    transactionId: 'PFMS/2024/001',
    date: '2024-01-25',
    type: 'Payment',
    description: 'Contractor Payment - ABC Builders',
    amount: 25000000,
    treasuryRef: 'TRY-REF-2024-001',
    status: 'Processed',
    pfmsStatus: 'Success',
    payeePayerName: 'ABC Builders Ltd.',
    billVoucherNo: 'V/24/001',
    bankName: 'State Bank of India',
    accountNo: '1234567890',
    ifscCode: 'SBIN0001234',
    sanctionedBy: 'Finance Director',
    remarks: 'Payment processed successfully',
    createdBy: 'Treasury Officer',
    lastSyncTime: '2024-01-25 15:30:00',
  },
  {
    id: 'TRY-2024-002',
    transactionId: 'PFMS/2024/002',
    date: '2024-01-24',
    type: 'Receipt',
    description: 'Property Sale - Unit A-101',
    amount: 4500000,
    treasuryRef: 'TRY-REF-2024-002',
    status: 'Reconciled',
    pfmsStatus: 'Success',
    payeePayerName: 'Rajesh Kumar Singh',
    billVoucherNo: 'RCP/24/001',
    bankName: 'HDFC Bank',
    accountNo: '9876543210',
    ifscCode: 'HDFC0001234',
    sanctionedBy: 'Revenue Officer',
    remarks: 'Receipt reconciled with PFMS',
    createdBy: 'Accounts Manager',
    lastSyncTime: '2024-01-24 16:00:00',
  },
  {
    id: 'TRY-2024-003',
    transactionId: 'PFMS/2024/003',
    date: '2024-01-23',
    type: 'Payment',
    description: 'Material Payment - Cement Supply',
    amount: 4500000,
    treasuryRef: 'TRY-REF-2024-003',
    status: 'Pending',
    pfmsStatus: 'In Progress',
    payeePayerName: 'XYZ Cement Suppliers',
    billVoucherNo: 'V/24/002',
    bankName: 'ICICI Bank',
    accountNo: '5555666677',
    ifscCode: 'ICIC0001234',
    sanctionedBy: 'Finance Director',
    remarks: 'Awaiting PFMS confirmation',
    createdBy: 'Treasury Officer',
    lastSyncTime: '2024-01-23 10:00:00',
  },
]

export default function TreasuryPage() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<TreasuryTransaction[]>(initialTransactions)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<TreasuryTransaction | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [lastSync, setLastSync] = useState('2025-10-30 09:00:00')
  const [isSyncing, setIsSyncing] = useState(false)

  const [formData, setFormData] = useState({
    transactionId: '',
    date: '',
    type: 'Payment',
    description: '',
    amount: '',
    treasuryRef: '',
    payeePayerName: '',
    billVoucherNo: '',
    bankName: '',
    accountNo: '',
    ifscCode: '',
    sanctionedBy: '',
    remarks: '',
    status: 'Pending',
    pfmsStatus: 'In Progress',
  })

  const resetForm = () => {
    setFormData({
      transactionId: '',
      date: '',
      type: 'Payment',
      description: '',
      amount: '',
      treasuryRef: '',
      payeePayerName: '',
      billVoucherNo: '',
      bankName: '',
      accountNo: '',
      ifscCode: '',
      sanctionedBy: '',
      remarks: '',
      status: 'Pending',
      pfmsStatus: 'In Progress',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(formData.amount) || 0

    const newTransaction: TreasuryTransaction = {
      id: `TRY-2024-${String(transactions.length + 1).padStart(3, '0')}`,
      transactionId: formData.transactionId,
      date: formData.date,
      type: formData.type,
      description: formData.description,
      amount,
      treasuryRef: formData.treasuryRef,
      status: formData.status,
      pfmsStatus: formData.pfmsStatus,
      payeePayerName: formData.payeePayerName,
      billVoucherNo: formData.billVoucherNo,
      bankName: formData.bankName,
      accountNo: formData.accountNo,
      ifscCode: formData.ifscCode,
      sanctionedBy: formData.sanctionedBy,
      remarks: formData.remarks,
      createdBy: 'Treasury Officer',
      lastSyncTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    }

    setTransactions([...transactions, newTransaction])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditTransaction = (transaction: TreasuryTransaction) => {
    setSelectedTransaction(transaction)
    setFormData({
      transactionId: transaction.transactionId,
      date: transaction.date,
      type: transaction.type,
      description: transaction.description,
      amount: transaction.amount.toString(),
      treasuryRef: transaction.treasuryRef,
      payeePayerName: transaction.payeePayerName,
      billVoucherNo: transaction.billVoucherNo,
      bankName: transaction.bankName,
      accountNo: transaction.accountNo,
      ifscCode: transaction.ifscCode,
      sanctionedBy: transaction.sanctionedBy,
      remarks: transaction.remarks,
      status: transaction.status,
      pfmsStatus: transaction.pfmsStatus,
    })
    setShowEditModal(true)
  }

  const handleUpdateTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTransaction) return

    const amount = parseFloat(formData.amount) || 0

    const updatedTransactions = transactions.map(txn =>
      txn.id === selectedTransaction.id
        ? {
            ...txn,
            transactionId: formData.transactionId,
            date: formData.date,
            type: formData.type,
            description: formData.description,
            amount,
            treasuryRef: formData.treasuryRef,
            status: formData.status,
            pfmsStatus: formData.pfmsStatus,
            payeePayerName: formData.payeePayerName,
            billVoucherNo: formData.billVoucherNo,
            bankName: formData.bankName,
            accountNo: formData.accountNo,
            ifscCode: formData.ifscCode,
            sanctionedBy: formData.sanctionedBy,
            remarks: formData.remarks,
            lastSyncTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
          }
        : txn
    )

    setTransactions(updatedTransactions)
    setShowEditModal(false)
    resetForm()
    setSelectedTransaction(null)
  }

  const handleDeleteTransaction = (transactionId: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(txn => txn.id !== transactionId))
    }
  }

  const handleViewDetails = (transaction: TreasuryTransaction) => {
    router.push(`/treasury-details/${transaction.id}`)
  }

  const handleViewModal = (transaction: TreasuryTransaction) => {
    router.push(`/accounts/treasury/${transaction.id}`)
  }

  const handleSyncWithPFMS = async () => {
    setIsSyncing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLastSync(new Date().toISOString().replace('T', ' ').substring(0, 19))
    setIsSyncing(false)
    alert('Successfully synced with PFMS')
  }

  const handleExport = () => {
    const csvContent = [
      ['Transaction ID', 'PFMS ID', 'Date', 'Type', 'Description', 'Amount', 'Treasury Ref', 'Status', 'PFMS Status'],
      ...filteredTransactions.map(txn => [
        txn.id,
        txn.transactionId,
        txn.date,
        txn.type,
        txn.description,
        txn.amount,
        txn.treasuryRef,
        txn.status,
        txn.pfmsStatus,
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `treasury_transactions_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.payeePayerName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || txn.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const totalTransactions = transactions.length
  const reconciledCount = transactions.filter(t => t.status === 'Reconciled').length
  const pendingCount = transactions.filter(t => t.status === 'Pending').length
  const failedCount = transactions.filter(t => t.pfmsStatus === 'Failed').length
  const successRate = totalTransactions > 0 ? Math.round((reconciledCount / totalTransactions) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Treasury Integration (PFMS)</h1>
          <p className="text-sm text-gray-600 mt-1">Track treasury transactions and PFMS reconciliation</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleSyncWithPFMS}
            disabled={isSyncing}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync with PFMS'}</span>
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Total Transactions</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalTransactions}</h3>
              <p className="text-xs text-gray-500 mt-2">This FY</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Reconciled</p>
          <h3 className="text-3xl font-bold text-green-600">{reconciledCount}</h3>
          <p className="text-xs text-green-600 mt-2">{successRate}% success rate</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending</p>
          <h3 className="text-3xl font-bold text-orange-600">{pendingCount}</h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Failed</p>
          <h3 className="text-3xl font-bold text-red-600">{failedCount}</h3>
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
            <p className="text-lg font-semibold text-gray-900">{new Date(lastSync).toLocaleString('en-IN')}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Next Scheduled Sync</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleString('en-IN')}
            </p>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                {showFilterMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <button
                        onClick={() => { setFilterStatus('all'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'all' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Reconciled'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Reconciled' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Reconciled
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Processed'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Processed' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Processed
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Pending'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Pending' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Pending
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </td>
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
                      transaction.pfmsStatus === 'Success' ? 'bg-green-100 text-green-700' :
                      transaction.pfmsStatus === 'Failed' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {transaction.pfmsStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewModal(transaction)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Quick View"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditTransaction(transaction)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleViewDetails(transaction)}
                        className="text-purple-600 hover:text-purple-700"
                        title="View Details"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Treasury Transaction</h2>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddTransaction} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PFMS Transaction ID</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="PFMS/2024/XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Payment</option>
                    <option>Receipt</option>
                    <option>Refund</option>
                    <option>Adjustment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Treasury Reference</label>
                  <input
                    type="text"
                    name="treasuryRef"
                    value={formData.treasuryRef}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="TRY-REF-XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payee/Payer Name</label>
                <input
                  type="text"
                  name="payeePayerName"
                  value={formData.payeePayerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Individual/Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Transaction description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill/Voucher No</label>
                  <input
                    type="text"
                    name="billVoucherNo"
                    value={formData.billVoucherNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="V/24/XXX or RCP/24/XXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Bank name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNo"
                    value={formData.accountNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Account number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="IFSC code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Pending</option>
                    <option>Processed</option>
                    <option>Reconciled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PFMS Status</label>
                  <select
                    name="pfmsStatus"
                    value={formData.pfmsStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>In Progress</option>
                    <option>Success</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sanctioned By</label>
                <input
                  type="text"
                  name="sanctionedBy"
                  value={formData.sanctionedBy}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Sanctioning authority"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Transaction Modal - Similar structure to Add Modal */}
      {showEditModal && selectedTransaction && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Transaction - {selectedTransaction.id}</h2>
              <button onClick={() => { setShowEditModal(false); resetForm(); setSelectedTransaction(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateTransaction} className="p-6 space-y-4">
              {/* Same form fields as Add Modal but with update button */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PFMS Transaction ID</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Payment</option>
                    <option>Receipt</option>
                    <option>Refund</option>
                    <option>Adjustment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Treasury Reference</label>
                  <input
                    type="text"
                    name="treasuryRef"
                    value={formData.treasuryRef}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payee/Payer Name</label>
                <input
                  type="text"
                  name="payeePayerName"
                  value={formData.payeePayerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill/Voucher No</label>
                  <input
                    type="text"
                    name="billVoucherNo"
                    value={formData.billVoucherNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNo"
                    value={formData.accountNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Pending</option>
                    <option>Processed</option>
                    <option>Reconciled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PFMS Status</label>
                  <select
                    name="pfmsStatus"
                    value={formData.pfmsStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>In Progress</option>
                    <option>Success</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sanctioned By</label>
                <input
                  type="text"
                  name="sanctionedBy"
                  value={formData.sanctionedBy}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); resetForm(); setSelectedTransaction(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showViewModal && selectedTransaction && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Transaction Details - {selectedTransaction.id}</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Badges */}
              <div className="flex justify-between items-start">
                <div className="flex space-x-2">
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedTransaction.status === 'Reconciled' ? 'bg-green-100 text-green-700' :
                    selectedTransaction.status === 'Processed' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedTransaction.status}
                  </span>
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedTransaction.pfmsStatus === 'Success' ? 'bg-green-100 text-green-700' :
                    selectedTransaction.pfmsStatus === 'Failed' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    PFMS: {selectedTransaction.pfmsStatus}
                  </span>
                </div>
                <button 
                  onClick={() => handleViewDetails(selectedTransaction)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <RefreshCw size={16} />
                  <span>View Full Details</span>
                </button>
              </div>

              {/* Transaction Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Transaction Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Transaction ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">PFMS ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Treasury Reference</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.treasuryRef}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Transaction Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedTransaction.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Transaction Type</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.type}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Payee/Payer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.payeePayerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bank Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.bankName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Account Number</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.accountNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">IFSC Code</p>
                      <p className="text-sm font-medium text-gray-900">{selectedTransaction.ifscCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Details */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-3">Transaction Amount</h3>
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-blue-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatCurrency(selectedTransaction.amount)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedTransaction.description}
                </p>
              </div>

              {/* Remarks */}
              {selectedTransaction.remarks && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Remarks</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    {selectedTransaction.remarks}
                  </p>
                </div>
              )}

              {/* Sync Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">PFMS Sync Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Last Sync Time</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTransaction.lastSyncTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Created By</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTransaction.createdBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}