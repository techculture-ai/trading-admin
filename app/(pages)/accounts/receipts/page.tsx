'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Download, TrendingUp, X, Eye, Edit, Trash2, ArrowRight, Receipt } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ReceiptData {
  id: string
  receiptNo: string
  date: string
  receiptType: string
  description: string
  payer: string
  amount: number
  paymentMode: string
  status: string
  transactionRef: string
  bankName: string
  chequeNo: string
  chequeDate: string
  depositDate: string
  remarks: string
  createdBy: string
}

const initialReceipts: ReceiptData[] = [
  {
    id: 'RCP-2024-001',
    receiptNo: 'RCP/24/001',
    date: '2024-01-25',
    receiptType: 'Property Sale',
    description: 'Sale of Unit A-101, Gomti Nagar',
    payer: 'Rajesh Kumar Singh',
    amount: 4500000,
    paymentMode: 'Online Transfer',
    status: 'Cleared',
    transactionRef: 'TXN2024012500123',
    bankName: 'State Bank of India',
    chequeNo: '-',
    chequeDate: '-',
    depositDate: '2024-01-25',
    remarks: 'Full payment received',
    createdBy: 'Accounts Manager',
  },
  {
    id: 'RCP-2024-002',
    receiptNo: 'RCP/24/002',
    date: '2024-01-24',
    receiptType: 'Lease Rent',
    description: 'Commercial Plot Rent - Q4 2024',
    payer: 'XYZ Enterprises',
    amount: 1200000,
    paymentMode: 'Cheque',
    status: 'Cleared',
    transactionRef: '-',
    bankName: 'HDFC Bank',
    chequeNo: 'CHQ123456',
    chequeDate: '2024-01-24',
    depositDate: '2024-01-25',
    remarks: 'Quarterly rent payment',
    createdBy: 'Revenue Officer',
  },
  {
    id: 'RCP-2024-003',
    receiptNo: 'RCP/24/003',
    date: '2024-01-23',
    receiptType: 'Property Sale',
    description: 'Sale of Unit B-205, Hazratganj',
    payer: 'Priya Sharma',
    amount: 6200000,
    paymentMode: 'Online Transfer',
    status: 'Pending Clearance',
    transactionRef: 'TXN2024012300456',
    bankName: 'ICICI Bank',
    chequeNo: '-',
    chequeDate: '-',
    depositDate: '-',
    remarks: 'Awaiting bank confirmation',
    createdBy: 'Accounts Manager',
  },
]

export default function ReceiptsPage() {
  const router = useRouter()
  const [receipts, setReceipts] = useState<ReceiptData[]>(initialReceipts)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  const [formData, setFormData] = useState({
    receiptNo: '',
    date: '',
    receiptType: 'Property Sale',
    description: '',
    payer: '',
    amount: '',
    paymentMode: 'Online Transfer',
    transactionRef: '',
    bankName: '',
    chequeNo: '',
    chequeDate: '',
    depositDate: '',
    remarks: '',
    status: 'Pending Clearance',
  })

  const resetForm = () => {
    setFormData({
      receiptNo: '',
      date: '',
      receiptType: 'Property Sale',
      description: '',
      payer: '',
      amount: '',
      paymentMode: 'Online Transfer',
      transactionRef: '',
      bankName: '',
      chequeNo: '',
      chequeDate: '',
      depositDate: '',
      remarks: '',
      status: 'Pending Clearance',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddReceipt = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(formData.amount) || 0

    const newReceipt: ReceiptData = {
      id: `RCP-2024-${String(receipts.length + 1).padStart(3, '0')}`,
      receiptNo: formData.receiptNo,
      date: formData.date,
      receiptType: formData.receiptType,
      description: formData.description,
      payer: formData.payer,
      amount,
      paymentMode: formData.paymentMode,
      status: formData.status,
      transactionRef: formData.paymentMode === 'Online Transfer' ? formData.transactionRef : '-',
      bankName: formData.bankName,
      chequeNo: formData.paymentMode === 'Cheque' ? formData.chequeNo : '-',
      chequeDate: formData.paymentMode === 'Cheque' ? formData.chequeDate : '-',
      depositDate: formData.depositDate || '-',
      remarks: formData.remarks,
      createdBy: 'Accounts Manager',
    }

    setReceipts([...receipts, newReceipt])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditReceipt = (receipt: ReceiptData) => {
    setSelectedReceipt(receipt)
    setFormData({
      receiptNo: receipt.receiptNo,
      date: receipt.date,
      receiptType: receipt.receiptType,
      description: receipt.description,
      payer: receipt.payer,
      amount: receipt.amount.toString(),
      paymentMode: receipt.paymentMode,
      transactionRef: receipt.transactionRef !== '-' ? receipt.transactionRef : '',
      bankName: receipt.bankName,
      chequeNo: receipt.chequeNo !== '-' ? receipt.chequeNo : '',
      chequeDate: receipt.chequeDate !== '-' ? receipt.chequeDate : '',
      depositDate: receipt.depositDate !== '-' ? receipt.depositDate : '',
      remarks: receipt.remarks,
      status: receipt.status,
    })
    setShowEditModal(true)
  }

  const handleUpdateReceipt = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedReceipt) return

    const amount = parseFloat(formData.amount) || 0

    const updatedReceipts = receipts.map(receipt =>
      receipt.id === selectedReceipt.id
        ? {
            ...receipt,
            receiptNo: formData.receiptNo,
            date: formData.date,
            receiptType: formData.receiptType,
            description: formData.description,
            payer: formData.payer,
            amount,
            paymentMode: formData.paymentMode,
            status: formData.status,
            transactionRef: formData.paymentMode === 'Online Transfer' ? formData.transactionRef : '-',
            bankName: formData.bankName,
            chequeNo: formData.paymentMode === 'Cheque' ? formData.chequeNo : '-',
            chequeDate: formData.paymentMode === 'Cheque' ? formData.chequeDate : '-',
            depositDate: formData.depositDate || '-',
            remarks: formData.remarks,
          }
        : receipt
    )

    setReceipts(updatedReceipts)
    setShowEditModal(false)
    resetForm()
    setSelectedReceipt(null)
  }

  const handleDeleteReceipt = (receiptId: string) => {
    if (confirm('Are you sure you want to delete this receipt?')) {
      setReceipts(receipts.filter(receipt => receipt.id !== receiptId))
    }
  }

  const handleViewDetails = (receipt: ReceiptData) => {
    router.push(`/receipts-details/${receipt.id}`)
  }

  const handleViewModal = (receipt: ReceiptData) => {
    router.push(`/accounts/receipts/${receipt.id}`)
  }

  const handleExport = () => {
    const csvContent = [
      ['Receipt ID', 'Receipt No', 'Date', 'Type', 'Payer', 'Amount', 'Payment Mode', 'Status'],
      ...filteredReceipts.map(receipt => [
        receipt.id,
        receipt.receiptNo,
        receipt.date,
        receipt.receiptType,
        receipt.payer,
        receipt.amount,
        receipt.paymentMode,
        receipt.status,
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipts_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = 
      receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || receipt.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const totalRevenue = receipts.reduce((sum, r) => sum + r.amount, 0)
  const thisMonthRevenue = receipts.filter(r => {
    const receiptDate = new Date(r.date)
    const now = new Date()
    return receiptDate.getMonth() === now.getMonth() && receiptDate.getFullYear() === now.getFullYear()
  }).reduce((sum, r) => sum + r.amount, 0)
  const propertySalesRevenue = receipts.filter(r => r.receiptType === 'Property Sale').reduce((sum, r) => sum + r.amount, 0)
  const pendingClearance = receipts.filter(r => r.status === 'Pending Clearance').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receipts & Revenue</h1>
          <p className="text-sm text-gray-600 mt-1">Track all revenue receipts and collections</p>
        </div>
        <div className="flex space-x-3">
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
            <span>Add Receipt</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Revenue (FY 24-25)</p>
          <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</h3>
          <div className="flex items-center mt-2">
            <TrendingUp size={14} className="text-green-600 mr-1" />
            <span className="text-xs text-green-600">+15% YoY</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">This Month</p>
          <h3 className="text-3xl font-bold text-green-600">{formatCurrency(thisMonthRevenue)}</h3>
          <p className="text-xs text-gray-500 mt-2">January 2024</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Property Sales</p>
          <h3 className="text-3xl font-bold text-blue-600">{formatCurrency(propertySalesRevenue)}</h3>
          <p className="text-xs text-gray-500 mt-2">
            {totalRevenue > 0 ? Math.round((propertySalesRevenue / totalRevenue) * 100) : 0}% of total revenue
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Clearance</p>
          <h3 className="text-3xl font-bold text-orange-600">{pendingClearance}</h3>
          <p className="text-xs text-gray-500 mt-2">
            {formatCurrency(receipts.filter(r => r.status === 'Pending Clearance').reduce((sum, r) => sum + r.amount, 0))} worth
          </p>
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
                        onClick={() => { setFilterStatus('Cleared'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Cleared' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Cleared
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Pending Clearance'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Pending Clearance' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Pending Clearance
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
              {filteredReceipts.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.receiptNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(receipt.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.receiptType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{receipt.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.payer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    {formatCurrency(receipt.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.paymentMode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      receipt.status === 'Cleared' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {receipt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewModal(receipt)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Quick View"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditReceipt(receipt)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteReceipt(receipt.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleViewDetails(receipt)}
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

      {/* Add Receipt Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Receipt</h2>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddReceipt} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
                  <input
                    type="text"
                    name="receiptNo"
                    value={formData.receiptNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="RCP/24/XXX"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Type</label>
                  <select
                    name="receiptType"
                    value={formData.receiptType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Property Sale</option>
                    <option>Lease Rent</option>
                    <option>Registration Fee</option>
                    <option>Development Charges</option>
                    <option>Penalty</option>
                    <option>Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Pending Clearance</option>
                    <option>Cleared</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payer Name</label>
                <input
                  type="text"
                  name="payer"
                  value={formData.payer}
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
                  placeholder="Receipt description..."
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Online Transfer</option>
                    <option>Cheque</option>
                    <option>DD</option>
                    <option>Cash</option>
                    <option>UPI</option>
                  </select>
                </div>
              </div>

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

              {formData.paymentMode === 'Online Transfer' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference</label>
                  <input
                    type="text"
                    name="transactionRef"
                    value={formData.transactionRef}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="TXN/REF number"
                  />
                </div>
              )}

              {formData.paymentMode === 'Cheque' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cheque Number</label>
                    <input
                      type="text"
                      name="chequeNo"
                      value={formData.chequeNo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Cheque number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cheque Date</label>
                    <input
                      type="date"
                      name="chequeDate"
                      value={formData.chequeDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Date</label>
                <input
                  type="date"
                  name="depositDate"
                  value={formData.depositDate}
                  onChange={handleInputChange}
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
                  Add Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Receipt Modal */}
      {showEditModal && selectedReceipt && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Receipt - {selectedReceipt.id}</h2>
              <button onClick={() => { setShowEditModal(false); resetForm(); setSelectedReceipt(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateReceipt} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
                  <input
                    type="text"
                    name="receiptNo"
                    value={formData.receiptNo}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Type</label>
                  <select
                    name="receiptType"
                    value={formData.receiptType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Property Sale</option>
                    <option>Lease Rent</option>
                    <option>Registration Fee</option>
                    <option>Development Charges</option>
                    <option>Penalty</option>
                    <option>Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Pending Clearance</option>
                    <option>Cleared</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payer Name</label>
                <input
                  type="text"
                  name="payer"
                  value={formData.payer}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Online Transfer</option>
                    <option>Cheque</option>
                    <option>DD</option>
                    <option>Cash</option>
                    <option>UPI</option>
                  </select>
                </div>
              </div>

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

              {formData.paymentMode === 'Online Transfer' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference</label>
                  <input
                    type="text"
                    name="transactionRef"
                    value={formData.transactionRef}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              {formData.paymentMode === 'Cheque' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cheque Number</label>
                    <input
                      type="text"
                      name="chequeNo"
                      value={formData.chequeNo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cheque Date</label>
                    <input
                      type="date"
                      name="chequeDate"
                      value={formData.chequeDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Date</label>
                <input
                  type="date"
                  name="depositDate"
                  value={formData.depositDate}
                  onChange={handleInputChange}
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
                  onClick={() => { setShowEditModal(false); resetForm(); setSelectedReceipt(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showViewModal && selectedReceipt && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Receipt Details - {selectedReceipt.id}</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-between items-start">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedReceipt.status === 'Cleared' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {selectedReceipt.status}
                </span>
                <button 
                  onClick={() => handleViewDetails(selectedReceipt)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Receipt size={16} />
                  <span>View Full Details</span>
                </button>
              </div>

              {/* Receipt Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Receipt Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Receipt ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedReceipt.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Receipt Number</p>
                      <p className="text-sm font-medium text-gray-900">{selectedReceipt.receiptNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Receipt Type</p>
                      <p className="text-sm font-medium text-gray-900">{selectedReceipt.receiptType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedReceipt.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Payer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Payer Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedReceipt.payer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Mode</p>
                      <p className="text-sm font-medium text-gray-900">{selectedReceipt.paymentMode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bank Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedReceipt.bankName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Details */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-900 mb-3">Receipt Amount</h3>
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-green-900">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(selectedReceipt.amount)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedReceipt.description}
                </p>
              </div>

              {/* Remarks */}
              {selectedReceipt.remarks && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Remarks</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    {selectedReceipt.remarks}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}