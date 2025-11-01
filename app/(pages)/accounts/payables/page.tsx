'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Download, CreditCard, X, Eye, Edit, Trash2, ArrowRight, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'

interface Payable {
  id: string
  voucherNo: string
  date: string
  paymentType: string
  description: string
  payee: string
  amount: number
  dueDate: string
  status: string
  paymentDate: string
  paymentMode: string
  transactionRef: string
  approvedBy: string
  remarks: string
}

const initialPayables: Payable[] = [
  {
    id: 'PAY-2024-001',
    voucherNo: 'V/24/001',
    date: '2024-01-20',
    paymentType: 'Contractor Payment',
    description: 'Running Bill RB-05 - ABC Builders',
    payee: 'ABC Builders Ltd.',
    amount: 25000000,
    dueDate: '2024-01-30',
    status: 'Paid',
    paymentDate: '2024-01-25',
    paymentMode: 'NEFT',
    transactionRef: 'TXN202401250001',
    approvedBy: 'Finance Director',
    remarks: 'Payment completed on time',
  },
  {
    id: 'PAY-2024-002',
    voucherNo: 'V/24/002',
    date: '2024-01-22',
    paymentType: 'Material Payment',
    description: 'Cement Supply - January 2024',
    payee: 'XYZ Cement Suppliers',
    amount: 4500000,
    dueDate: '2024-02-05',
    status: 'Approved',
    paymentDate: '-',
    paymentMode: '-',
    transactionRef: '-',
    approvedBy: 'Finance Director',
    remarks: 'Awaiting payment processing',
  },
  {
    id: 'PAY-2024-003',
    voucherNo: 'V/24/003',
    date: '2024-01-23',
    paymentType: 'Contractor Payment',
    description: 'Running Bill RB-03 - XYZ Construction',
    payee: 'XYZ Construction Co.',
    amount: 38000000,
    dueDate: '2024-02-10',
    status: 'Pending Approval',
    paymentDate: '-',
    paymentMode: '-',
    transactionRef: '-',
    approvedBy: '-',
    remarks: 'Pending verification',
  },
]

export default function PayablesManagementPage() {
  const router = useRouter()
  const [payables, setPayables] = useState<Payable[]>(initialPayables)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedPayable, setSelectedPayable] = useState<Payable | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const isLoading = usePageLoading(1000)
  const [formData, setFormData] = useState({
    voucherNo: '',
    date: '',
    paymentType: 'Contractor Payment',
    description: '',
    payee: '',
    amount: '',
    dueDate: '',
    paymentMode: 'NEFT',
    transactionRef: '',
    approvedBy: '',
    remarks: '',
    status: 'Pending Approval',
  })

  const resetForm = () => {
    setFormData({
      voucherNo: '',
      date: '',
      paymentType: 'Contractor Payment',
      description: '',
      payee: '',
      amount: '',
      dueDate: '',
      paymentMode: 'NEFT',
      transactionRef: '',
      approvedBy: '',
      remarks: '',
      status: 'Pending Approval',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddPayable = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(formData.amount) || 0

    const newPayable: Payable = {
      id: `PAY-2024-${String(payables.length + 1).padStart(3, '0')}`,
      voucherNo: formData.voucherNo,
      date: formData.date,
      paymentType: formData.paymentType,
      description: formData.description,
      payee: formData.payee,
      amount,
      dueDate: formData.dueDate,
      status: formData.status,
      paymentDate: formData.status === 'Paid' ? new Date().toISOString().split('T')[0] : '-',
      paymentMode: formData.status === 'Paid' ? formData.paymentMode : '-',
      transactionRef: formData.status === 'Paid' ? formData.transactionRef : '-',
      approvedBy: formData.approvedBy || '-',
      remarks: formData.remarks,
    }

    setPayables([...payables, newPayable])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditPayable = (payable: Payable) => {
    setSelectedPayable(payable)
    setFormData({
      voucherNo: payable.voucherNo,
      date: payable.date,
      paymentType: payable.paymentType,
      description: payable.description,
      payee: payable.payee,
      amount: payable.amount.toString(),
      dueDate: payable.dueDate,
      paymentMode: payable.paymentMode !== '-' ? payable.paymentMode : 'NEFT',
      transactionRef: payable.transactionRef !== '-' ? payable.transactionRef : '',
      approvedBy: payable.approvedBy !== '-' ? payable.approvedBy : '',
      remarks: payable.remarks,
      status: payable.status,
    })
    setShowEditModal(true)
  }

  const handleUpdatePayable = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPayable) return

    const amount = parseFloat(formData.amount) || 0

    const updatedPayables = payables.map(payable =>
      payable.id === selectedPayable.id
        ? {
            ...payable,
            voucherNo: formData.voucherNo,
            date: formData.date,
            paymentType: formData.paymentType,
            description: formData.description,
            payee: formData.payee,
            amount,
            dueDate: formData.dueDate,
            status: formData.status,
            paymentDate: formData.status === 'Paid' ? (payable.paymentDate !== '-' ? payable.paymentDate : new Date().toISOString().split('T')[0]) : '-',
            paymentMode: formData.status === 'Paid' ? formData.paymentMode : '-',
            transactionRef: formData.status === 'Paid' ? formData.transactionRef : '-',
            approvedBy: formData.approvedBy || '-',
            remarks: formData.remarks,
          }
        : payable
    )

    setPayables(updatedPayables)
    setShowEditModal(false)
    resetForm()
    setSelectedPayable(null)
  }

  const handleDeletePayable = (payableId: string) => {
    if (confirm('Are you sure you want to delete this payable?')) {
      setPayables(payables.filter(payable => payable.id !== payableId))
    }
  }

  const handleViewDetails = (payable: Payable) => {
    router.push(`/payables-details/${payable.id}`)
  }

  const handleViewModal = (payable: Payable) => {
    router.push(`/accounts/payables/${payable.id}`)
  }

  const handleExport = () => {
    const csvContent = [
      ['Payment ID', 'Voucher No', 'Date', 'Type', 'Payee', 'Amount', 'Due Date', 'Status'],
      ...filteredPayables.map(payable => [
        payable.id,
        payable.voucherNo,
        payable.date,
        payable.paymentType,
        payable.payee,
        payable.amount,
        payable.dueDate,
        payable.status,
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `payables_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredPayables = payables.filter(payable => {
    const matchesSearch = 
      payable.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payable.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payable.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payable.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || payable.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const totalPayables = payables.reduce((sum, p) => sum + (p.status !== 'Paid' ? p.amount : 0), 0)
  const paidThisMonth = payables.reduce((sum, p) => sum + (p.status === 'Paid' ? p.amount : 0), 0)
  const pendingApproval = payables.filter(p => p.status === 'Pending Approval').length
  const overdueCount = payables.filter(p => {
    const dueDate = new Date(p.dueDate)
    const today = new Date()
    return p.status !== 'Paid' && dueDate < today
  }).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payables Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage all payments and vendor bills</p>
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
            <span>Add Payment</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Payables</p>
          <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(totalPayables)}</h3>
          <p className="text-xs text-gray-500 mt-2">Outstanding amount</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Paid This Month</p>
          <h3 className="text-3xl font-bold text-green-600">{formatCurrency(paidThisMonth)}</h3>
          <p className="text-xs text-gray-500 mt-2">January 2024</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Approval</p>
          <h3 className="text-3xl font-bold text-orange-600">{pendingApproval}</h3>
          <p className="text-xs text-gray-500 mt-2">
            {formatCurrency(payables.filter(p => p.status === 'Pending Approval').reduce((sum, p) => sum + p.amount, 0))} worth
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Overdue</p>
          <h3 className="text-3xl font-bold text-red-600">{overdueCount}</h3>
          <p className="text-xs text-gray-500 mt-2">Requires attention</p>
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
                        onClick={() => { setFilterStatus('Paid'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Paid' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Paid
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Approved'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Approved' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Pending Approval'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Pending Approval' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Pending Approval
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
              {filteredPayables.map((payable) => {
                const isOverdue = new Date(payable.dueDate) < new Date() && payable.status !== 'Paid'
                return (
                  <tr key={payable.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payable.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payable.voucherNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(payable.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payable.paymentType}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{payable.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payable.payee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                      {formatCurrency(payable.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {new Date(payable.dueDate).toLocaleDateString('en-IN')}
                      </span>
                    </td>
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
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleViewModal(payable)}
                          className="text-blue-600 hover:text-blue-700"
                          title="Quick View"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditPayable(payable)}
                          className="text-orange-600 hover:text-orange-700"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeletePayable(payable.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleViewDetails(payable)}
                          className="text-purple-600 hover:text-purple-700"
                          title="View Details"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payable Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Payment</h2>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddPayable} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voucher Number</label>
                  <input
                    type="text"
                    name="voucherNo"
                    value={formData.voucherNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="V/24/XXX"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Contractor Payment</option>
                    <option>Material Payment</option>
                    <option>Service Payment</option>
                    <option>Consultant Payment</option>
                    <option>Utility Payment</option>
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
                    <option>Pending Approval</option>
                    <option>Approved</option>
                    <option>Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payee Name</label>
                <input
                  type="text"
                  name="payee"
                  value={formData.payee}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Vendor/Contractor name"
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
                  placeholder="Payment description..."
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {formData.status === 'Paid' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                    <select
                      name="paymentMode"
                      value={formData.paymentMode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option>NEFT</option>
                      <option>RTGS</option>
                      <option>Cheque</option>
                      <option>DD</option>
                      <option>Cash</option>
                    </select>
                  </div>
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
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                <input
                  type="text"
                  name="approvedBy"
                  value={formData.approvedBy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Approver name"
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
                  Add Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Payable Modal */}
      {showEditModal && selectedPayable && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Payment - {selectedPayable.id}</h2>
              <button onClick={() => { setShowEditModal(false); resetForm(); setSelectedPayable(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdatePayable} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voucher Number</label>
                  <input
                    type="text"
                    name="voucherNo"
                    value={formData.voucherNo}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Contractor Payment</option>
                    <option>Material Payment</option>
                    <option>Service Payment</option>
                    <option>Consultant Payment</option>
                    <option>Utility Payment</option>
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
                    <option>Pending Approval</option>
                    <option>Approved</option>
                    <option>Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payee Name</label>
                <input
                  type="text"
                  name="payee"
                  value={formData.payee}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {formData.status === 'Paid' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                    <select
                      name="paymentMode"
                      value={formData.paymentMode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option>NEFT</option>
                      <option>RTGS</option>
                      <option>Cheque</option>
                      <option>DD</option>
                      <option>Cash</option>
                    </select>
                  </div>
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
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                <input
                  type="text"
                  name="approvedBy"
                  value={formData.approvedBy}
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
                  onClick={() => { setShowEditModal(false); resetForm(); setSelectedPayable(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showViewModal && selectedPayable && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Payment Details - {selectedPayable.id}</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-between items-start">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedPayable.status === 'Paid' ? 'bg-green-100 text-green-700' :
                  selectedPayable.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {selectedPayable.status}
                </span>
                <button 
                  onClick={() => handleViewDetails(selectedPayable)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <CreditCard size={16} />
                  <span>View Full Details</span>
                </button>
              </div>

              {/* Payment Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Payment Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Payment ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedPayable.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Voucher Number</p>
                      <p className="text-sm font-medium text-gray-900">{selectedPayable.voucherNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Type</p>
                      <p className="text-sm font-medium text-gray-900">{selectedPayable.paymentType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedPayable.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Payee Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Payee Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedPayable.payee}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedPayable.dueDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    {selectedPayable.approvedBy !== '-' && (
                      <div>
                        <p className="text-xs text-gray-500">Approved By</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPayable.approvedBy}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Amount Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Payment Amount</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-red-600">
                      {formatCurrency(selectedPayable.amount)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedPayable.status === 'Paid' && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-900 mb-3 flex items-center">
                    <CheckCircle size={16} className="mr-2" />
                    Payment Completed
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Payment Date</span>
                      <span className="text-sm font-medium text-green-900">
                        {new Date(selectedPayable.paymentDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Payment Mode</span>
                      <span className="text-sm font-medium text-green-900">{selectedPayable.paymentMode}</span>
                    </div>
                    {selectedPayable.transactionRef !== '-' && (
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">Transaction Ref</span>
                        <span className="text-sm font-medium text-green-900">{selectedPayable.transactionRef}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedPayable.description}
                </p>
              </div>

              {/* Remarks */}
              {selectedPayable.remarks && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Remarks</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    {selectedPayable.remarks}
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