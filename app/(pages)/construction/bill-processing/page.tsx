'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Download, X, Eye, Edit, Trash2, FileText } from 'lucide-react'

interface Bill {
  id: string
  contractId: string
  projectName: string
  contractor: string
  billType: string
  billNo: string
  billAmount: number
  workDone: number
  deductions: number
  netPayable: number
  submissionDate: string
  status: string
  approvedBy: string
  workDescription: string
  deductionDetails: string
  paymentDate: string
}

const initialBills: Bill[] = [
  {
    id: 'BILL-2024-001',
    contractId: 'CON-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    contractor: 'ABC Builders Ltd.',
    billType: 'Running Bill',
    billNo: 'RB-05',
    billAmount: 2500000,
    workDone: 2500000,
    deductions: 125000,
    netPayable: 2375000,
    submissionDate: '2024-01-15',
    status: 'Approved',
    approvedBy: 'Rajesh Sharma',
    workDescription: 'Foundation and basement construction',
    deductionDetails: 'GST, Labour Cess',
    paymentDate: '2024-01-20',
  },
  {
    id: 'BILL-2024-002',
    contractId: 'CON-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    contractor: 'XYZ Construction Co.',
    billType: 'Running Bill',
    billNo: 'RB-03',
    billAmount: 3800000,
    workDone: 3800000,
    deductions: 190000,
    netPayable: 3610000,
    submissionDate: '2024-01-18',
    status: 'Under Verification',
    approvedBy: '-',
    workDescription: 'Ground floor slab work',
    deductionDetails: 'GST, Labour Cess, Penalty',
    paymentDate: '-',
  },
  {
    id: 'BILL-2024-003',
    contractId: 'CON-2024-003',
    projectName: 'Aliganj Residential Project',
    contractor: 'PQR Developers',
    billType: 'Running Bill',
    billNo: 'RB-07',
    billAmount: 1800000,
    workDone: 1800000,
    deductions: 90000,
    netPayable: 1710000,
    submissionDate: '2024-01-20',
    status: 'Paid',
    approvedBy: 'Amit Singh',
    workDescription: 'Brick work and plastering',
    deductionDetails: 'GST, Labour Cess',
    paymentDate: '2024-01-25',
  },
]

export default function BillProcessingPage() {
  const [bills, setBills] = useState<Bill[]>(initialBills)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  const [formData, setFormData] = useState({
    contractId: '',
    projectName: '',
    contractor: '',
    billType: 'Running Bill',
    billNo: '',
    billAmount: '',
    workDone: '',
    deductions: '',
    workDescription: '',
    deductionDetails: '',
    submissionDate: '',
    status: 'Under Verification',
  })

  const resetForm = () => {
    setFormData({
      contractId: '',
      projectName: '',
      contractor: '',
      billType: 'Running Bill',
      billNo: '',
      billAmount: '',
      workDone: '',
      deductions: '',
      workDescription: '',
      deductionDetails: '',
      submissionDate: '',
      status: 'Under Verification',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault()
    const billAmount = parseFloat(formData.billAmount) || 0
    const deductions = parseFloat(formData.deductions) || 0
    const workDone = parseFloat(formData.workDone) || 0
    const netPayable = workDone - deductions

    const newBill: Bill = {
      id: `BILL-2024-${String(bills.length + 1).padStart(3, '0')}`,
      ...formData,
      billAmount,
      workDone,
      deductions,
      netPayable,
      approvedBy: '-',
      paymentDate: '-',
    }

    setBills([...bills, newBill])
    setShowAddModal(false)
    resetForm()
  }

  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill)
    setShowViewModal(true)
  }

  const handleEditBill = (bill: Bill) => {
    setSelectedBill(bill)
    setFormData({
      contractId: bill.contractId,
      projectName: bill.projectName,
      contractor: bill.contractor,
      billType: bill.billType,
      billNo: bill.billNo,
      billAmount: bill.billAmount.toString(),
      workDone: bill.workDone.toString(),
      deductions: bill.deductions.toString(),
      workDescription: bill.workDescription,
      deductionDetails: bill.deductionDetails,
      submissionDate: bill.submissionDate,
      status: bill.status,
    })
    setShowEditModal(true)
  }

  const handleUpdateBill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBill) return

    const billAmount = parseFloat(formData.billAmount) || 0
    const deductions = parseFloat(formData.deductions) || 0
    const workDone = parseFloat(formData.workDone) || 0
    const netPayable = workDone - deductions

    const updatedBills = bills.map(bill =>
      bill.id === selectedBill.id
        ? {
            ...bill,
            ...formData,
            billAmount,
            workDone,
            deductions,
            netPayable,
          }
        : bill
    )

    setBills(updatedBills)
    setShowEditModal(false)
    resetForm()
    setSelectedBill(null)
  }

  const handleDeleteBill = (billId: string) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      setBills(bills.filter(bill => bill.id !== billId))
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Bill ID', 'Project Name', 'Contractor', 'Bill Type', 'Bill No', 'Bill Amount', 'Deductions', 'Net Payable', 'Status'],
      ...filteredBills.map(bill => [
        bill.id,
        bill.projectName,
        bill.contractor,
        bill.billType,
        bill.billNo,
        bill.billAmount,
        bill.deductions,
        bill.netPayable,
        bill.status,
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bills_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.contractor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || bill.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bill Processing</h1>
          <p className="text-sm text-gray-600 mt-1">Manage contractor bills, measurements, and payments</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus size={20} />
          <span>Add New Bill</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Bills Processed</p>
          <h3 className="text-3xl font-bold text-gray-900">{bills.length}</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Amount Paid</p>
          <h3 className="text-2xl font-bold text-green-600">
            {formatCurrency(bills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.netPayable, 0))}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Released to contractors</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Verification</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {bills.filter(b => b.status === 'Under Verification').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">
            {formatCurrency(bills.filter(b => b.status === 'Under Verification').reduce((sum, b) => sum + b.netPayable, 0))} worth
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Processing Time</p>
          <h3 className="text-3xl font-bold text-gray-900">12 days</h3>
          <p className="text-xs text-green-600 mt-2">-3 days improved</p>
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
                  placeholder="Search bills..."
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
                        onClick={() => { setFilterStatus('Approved'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Approved' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Under Verification'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Under Verification' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Under Verification
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Paid'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Paid' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Paid
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contractor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Payable</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bill.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bill.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{bill.contractor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{bill.billType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{bill.billNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(bill.billAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{formatCurrency(bill.deductions)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{formatCurrency(bill.netPayable)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      bill.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      bill.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewBill(bill)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditBill(bill)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteBill(bill.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Bill Modal */}
      {showAddModal && (  
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Bill</h2>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddBill} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract ID</label>
                  <input
                    type="text"
                    name="contractId"
                    value={formData.contractId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="CON-2024-XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill No.</label>
                  <input
                    type="text"
                    name="billNo"
                    value={formData.billNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="RB-XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contractor</label>
                <input
                  type="text"
                  name="contractor"
                  value={formData.contractor}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Contractor name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Type</label>
                  <select
                    name="billType"
                    value={formData.billType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Running Bill</option>
                    <option>Final Bill</option>
                    <option>Advance Payment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                  <input
                    type="date"
                    name="submissionDate"
                    value={formData.submissionDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount (₹)</label>
                  <input
                    type="number"
                    name="billAmount"
                    value={formData.billAmount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Done (₹)</label>
                  <input
                    type="number"
                    name="workDone"
                    value={formData.workDone}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deductions (₹)</label>
                  <input
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Description</label>
                <textarea
                  name="workDescription"
                  value={formData.workDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Describe the work completed..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deduction Details</label>
                <input
                  type="text"
                  name="deductionDetails"
                  value={formData.deductionDetails}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="GST, Labour Cess, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option>Under Verification</option>
                  <option>Approved</option>
                  <option>Paid</option>
                </select>
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
                  Add Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Bill Modal */}
      {showViewModal && selectedBill && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Bill Details - {selectedBill.id}</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-between items-start">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedBill.status === 'Paid' ? 'bg-green-100 text-green-700' :
                  selectedBill.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {selectedBill.status}
                </span>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FileText size={16} />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* Bill Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Bill Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Bill ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBill.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contract ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBill.contractId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bill Type</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBill.billType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bill Number</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBill.billNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Submission Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedBill.submissionDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Project & Contractor</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Project Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBill.projectName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contractor</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBill.contractor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Approved By</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBill.approvedBy}</p>
                    </div>
                    {selectedBill.paymentDate !== '-' && (
                      <div>
                        <p className="text-xs text-gray-500">Payment Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(selectedBill.paymentDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Financial Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bill Amount</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedBill.billAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Work Done</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedBill.workDone)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Deductions</span>
                    <span className="text-sm font-medium text-red-600">- {formatCurrency(selectedBill.deductions)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-300 flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">Net Payable</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(selectedBill.netPayable)}</span>
                  </div>
                </div>
              </div>

              {/* Work Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Work Description</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedBill.workDescription}
                </p>
              </div>

              {/* Deduction Details */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Deduction Details</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedBill.deductionDetails}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bill Modal */}
      {showEditModal && selectedBill && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Bill - {selectedBill.id}</h2>
              <button onClick={() => { setShowEditModal(false); resetForm(); setSelectedBill(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateBill} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract ID</label>
                  <input
                    type="text"
                    name="contractId"
                    value={formData.contractId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill No.</label>
                  <input
                    type="text"
                    name="billNo"
                    value={formData.billNo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contractor</label>
                <input
                  type="text"
                  name="contractor"
                  value={formData.contractor}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Type</label>
                  <select
                    name="billType"
                    value={formData.billType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Running Bill</option>
                    <option>Final Bill</option>
                    <option>Advance Payment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                  <input
                    type="date"
                    name="submissionDate"
                    value={formData.submissionDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount (₹)</label>
                  <input
                    type="number"
                    name="billAmount"
                    value={formData.billAmount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Done (₹)</label>
                  <input
                    type="number"
                    name="workDone"
                    value={formData.workDone}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deductions (₹)</label>
                  <input
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Description</label>
                <textarea
                  name="workDescription"
                  value={formData.workDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deduction Details</label>
                <input
                  type="text"
                  name="deductionDetails"
                  value={formData.deductionDetails}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option>Under Verification</option>
                  <option>Approved</option>
                  <option>Paid</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); resetForm(); setSelectedBill(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}