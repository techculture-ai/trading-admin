'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Download, X, DollarSign, CheckCircle, Clock, AlertCircle, Eye, Edit, Trash2, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface Compensation {
  id: string
  parcelId: string
  owner: string
  ownerContact: string
  landArea: string
  marketValue: string
  solatium: string
  interest: string
  totalCompensation: string
  paidAmount: string
  pendingAmount: string
  status: 'Paid' | 'Partial' | 'Pending'
  paymentDate: string
  paymentMode?: string
  transactionId?: string
  bankDetails?: {
    accountName: string
    accountNumber: string
    bankName: string
    ifscCode: string
  }
}

const initialCompensations: Compensation[] = [
  {
    id: 'COMP-001',
    parcelId: 'PAR-145',
    owner: 'Ram Kumar Singh',
    ownerContact: '+91 98765 43210',
    landArea: '2.5 acres',
    marketValue: '₹40,00,000',
    solatium: '₹12,00,000',
    interest: '₹3,00,000',
    totalCompensation: '₹55,00,000',
    paidAmount: '₹55,00,000',
    pendingAmount: '₹0',
    status: 'Paid',
    paymentDate: '20 Jan 2024',
    paymentMode: 'Bank Transfer',
    transactionId: 'TXN2024001',
    bankDetails: {
      accountName: 'Ram Kumar Singh',
      accountNumber: '1234567890',
      bankName: 'State Bank of India',
      ifscCode: 'SBIN0001234'
    }
  },
  {
    id: 'COMP-002',
    parcelId: 'PAR-146',
    owner: 'Geeta Devi',
    ownerContact: '+91 98765 43211',
    landArea: '3.2 acres',
    marketValue: '₹52,00,000',
    solatium: '₹15,60,000',
    interest: '₹4,20,000',
    totalCompensation: '₹71,80,000',
    paidAmount: '₹35,90,000',
    pendingAmount: '₹35,90,000',
    status: 'Partial',
    paymentDate: '22 Jan 2024',
    paymentMode: 'Bank Transfer',
    transactionId: 'TXN2024002',
    bankDetails: {
      accountName: 'Geeta Devi',
      accountNumber: '0987654321',
      bankName: 'Punjab National Bank',
      ifscCode: 'PUNB0009876'
    }
  },
  {
    id: 'COMP-003',
    parcelId: 'PAR-147',
    owner: 'Suresh Kumar',
    ownerContact: '+91 98765 43212',
    landArea: '1.8 acres',
    marketValue: '₹30,00,000',
    solatium: '₹9,00,000',
    interest: '₹2,50,000',
    totalCompensation: '₹41,50,000',
    paidAmount: '₹0',
    pendingAmount: '₹41,50,000',
    status: 'Pending',
    paymentDate: '-',
  },
]

export default function CompensationPaymentPage() {
  const [compensations, setCompensations] = useState<Compensation[]>(initialCompensations)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedCompensation, setSelectedCompensation] = useState<Compensation | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    parcelId: '',
    owner: '',
    ownerContact: '',
    landArea: '',
    marketValue: '',
    solatium: '',
    interest: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
  })

  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMode: 'Bank Transfer',
    transactionId: '',
    remarks: '',
  })

  const calculateTotalCompensation = () => {
    const market = parseFloat(formData.marketValue.replace(/[^0-9]/g, '')) || 0
    const sol = parseFloat(formData.solatium.replace(/[^0-9]/g, '')) || 0
    const int = parseFloat(formData.interest.replace(/[^0-9]/g, '')) || 0
    return market + sol + int
  }

  const handleAddCompensation = (e: React.FormEvent) => {
    e.preventDefault()
    const total = calculateTotalCompensation()
    const newCompensation: Compensation = {
      id: `COMP-${String(compensations.length + 1).padStart(3, '0')}`,
      parcelId: formData.parcelId,
      owner: formData.owner,
      ownerContact: formData.ownerContact,
      landArea: formData.landArea,
      marketValue: formData.marketValue,
      solatium: formData.solatium,
      interest: formData.interest,
      totalCompensation: `₹${total.toLocaleString('en-IN')}`,
      paidAmount: '₹0',
      pendingAmount: `₹${total.toLocaleString('en-IN')}`,
      status: 'Pending',
      paymentDate: '-',
      bankDetails: {
        accountName: formData.accountName,
        accountNumber: formData.accountNumber,
        bankName: formData.bankName,
        ifscCode: formData.ifscCode,
      }
    }
    setCompensations([...compensations, newCompensation])
    setShowAddModal(false)
    resetForm()
  }

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCompensation) return

    const paymentAmount = parseFloat(paymentData.amount.replace(/[^0-9]/g, '')) || 0
    const currentPaid = parseFloat(selectedCompensation.paidAmount.replace(/[^0-9]/g, '')) || 0
    const total = parseFloat(selectedCompensation.totalCompensation.replace(/[^0-9]/g, '')) || 0
    const newPaid = currentPaid + paymentAmount
    const newPending = total - newPaid

    const newStatus: 'Paid' | 'Partial' | 'Pending' = 
      newPending === 0 ? 'Paid' : 
      newPaid > 0 ? 'Partial' : 'Pending'

    setCompensations(compensations.map(c => 
      c.id === selectedCompensation.id 
        ? {
            ...c,
            paidAmount: `₹${newPaid.toLocaleString('en-IN')}`,
            pendingAmount: `₹${newPending.toLocaleString('en-IN')}`,
            status: newStatus,
            paymentDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            paymentMode: paymentData.paymentMode,
            transactionId: paymentData.transactionId,
          }
        : c
    ))
    setShowPaymentModal(false)
    setSelectedCompensation(null)
    resetPaymentForm()
  }

  const handleDeleteCompensation = (id: string) => {
    if (confirm('Are you sure you want to delete this compensation record?')) {
      setCompensations(compensations.filter(c => c.id !== id))
    }
  }

  const handleViewCompensation = (compensation: Compensation) => {
    router.push(`/land-acquisition/compensation-payment/${compensation.id}`)
  }

  const handlePaymentClick = (compensation: Compensation) => {
    setSelectedCompensation(compensation)
    const pending = parseFloat(compensation.pendingAmount.replace(/[^0-9]/g, '')) || 0
    setPaymentData({
      ...paymentData,
      amount: pending.toString(),
    })
    setShowPaymentModal(true)
  }

  const resetForm = () => {
    setFormData({
      parcelId: '',
      owner: '',
      ownerContact: '',
      landArea: '',
      marketValue: '',
      solatium: '',
      interest: '',
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: '',
    })
  }

  const resetPaymentForm = () => {
    setPaymentData({
      amount: '',
      paymentMode: 'Bank Transfer',
      transactionId: '',
      remarks: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Comp. ID', 'Parcel ID', 'Owner', 'Land Area', 'Market Value', 'Solatium', 'Total Compensation', 'Paid Amount', 'Pending Amount', 'Status'].join(','),
      ...filteredCompensations.map(c => 
        [c.id, c.parcelId, c.owner, c.landArea, c.marketValue, c.solatium, c.totalCompensation, c.paidAmount, c.pendingAmount, c.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'compensation-report.csv'
    a.click()
  }

  const filteredCompensations = compensations.filter(compensation => {
    const matchesSearch = compensation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compensation.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compensation.parcelId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || compensation.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalCompensationSum = compensations.reduce((sum, c) => 
    sum + (parseFloat(c.totalCompensation.replace(/[^0-9]/g, '')) || 0), 0
  )
  const totalPaidSum = compensations.reduce((sum, c) => 
    sum + (parseFloat(c.paidAmount.replace(/[^0-9]/g, '')) || 0), 0
  )
  const totalPendingSum = compensations.reduce((sum, c) => 
    sum + (parseFloat(c.pendingAmount.replace(/[^0-9]/g, '')) || 0), 0
  )

  if (isLoading) {
    return <DetailsSkeleton />
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compensation & Payment Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage compensation calculations and payments</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={20} />
            <span>Add Compensation</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Compensation</p>
          <h3 className="text-3xl font-bold text-gray-900">₹{(totalCompensationSum / 10000000).toFixed(1)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Across {compensations.length} parcels</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Amount Paid</p>
          <h3 className="text-3xl font-bold text-green-600">₹{(totalPaidSum / 10000000).toFixed(1)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">{((totalPaidSum / totalCompensationSum) * 100).toFixed(0)}% disbursed</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Payment</p>
          <h3 className="text-3xl font-bold text-orange-600">₹{(totalPendingSum / 10000000).toFixed(1)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">{compensations.filter(c => c.status === 'Pending').length} cases pending</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Processing Time</p>
          <h3 className="text-3xl font-bold text-gray-900">18 days</h3>
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
                  placeholder="Search compensations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                {showFilterDropdown && (
                  <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <button
                        onClick={() => { setFilterStatus('all'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Paid'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Paid
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Partial'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Partial
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Pending'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comp. ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parcel ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Land Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solatium</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Compensation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompensations.map((comp) => (
                <tr key={comp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{comp.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{comp.parcelId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comp.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{comp.landArea}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comp.marketValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{comp.solatium}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{comp.totalCompensation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comp.paidAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      comp.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      comp.status === 'Partial' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {comp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewCompensation(comp)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {comp.status !== 'Paid' && (
                        <button 
                          onClick={() => handlePaymentClick(comp)}
                          className="text-green-600 hover:text-green-700"
                          title="Process Payment"
                        >
                          <CreditCard size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteCompensation(comp.id)}
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

      {/* Add Compensation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Compensation</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddCompensation} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parcel ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parcelId}
                      onChange={(e) => setFormData({...formData, parcelId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="PAR-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Owner Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.owner}
                      onChange={(e) => setFormData({...formData, owner: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Ram Kumar Singh"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.ownerContact}
                      onChange={(e) => setFormData({...formData, ownerContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Land Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.landArea}
                      onChange={(e) => setFormData({...formData, landArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="2.5 acres"
                    />
                  </div>
                </div>
              </div>

              {/* Compensation Calculation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compensation Calculation</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.marketValue}
                      onChange={(e) => setFormData({...formData, marketValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹40,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solatium (30%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.solatium}
                      onChange={(e) => setFormData({...formData, solatium: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹12,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹3,00,000"
                    />
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Compensation:</span>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{calculateTotalCompensation().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.accountName}
                      onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Ram Kumar Singh"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.bankName}
                      onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="State Bank of India"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="SBIN0001234"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Add Compensation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Process Payment Modal */}
      {showPaymentModal && selectedCompensation && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Process Payment - {selectedCompensation.id}</h2>
              <button 
                onClick={() => { setShowPaymentModal(false); setSelectedCompensation(null); resetPaymentForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleProcessPayment} className="p-6 space-y-4">
              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Owner:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedCompensation.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Compensation:</span>
                  <span className="text-sm font-medium text-gray-900">{selectedCompensation.totalCompensation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Already Paid:</span>
                  <span className="text-sm font-medium text-green-600">{selectedCompensation.paidAmount}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-sm font-semibold text-gray-900">Pending Amount:</span>
                  <span className="text-lg font-bold text-orange-600">{selectedCompensation.pendingAmount}</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={paymentData.paymentMode}
                      onChange={(e) => setPaymentData({...paymentData, paymentMode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
                      <option value="DD">Demand Draft</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.transactionId}
                      onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="TXN2024001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks
                  </label>
                  <textarea
                    value={paymentData.remarks}
                    onChange={(e) => setPaymentData({...paymentData, remarks: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter payment remarks..."
                  />
                </div>
              </div>

              {/* Bank Account Info */}
              {selectedCompensation.bankDetails && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Beneficiary Bank Details</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Account Name:</span>
                      <p className="font-medium text-gray-900">{selectedCompensation.bankDetails.accountName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Account Number:</span>
                      <p className="font-medium text-gray-900">{selectedCompensation.bankDetails.accountNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Bank Name:</span>
                      <p className="font-medium text-gray-900">{selectedCompensation.bankDetails.bankName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">IFSC Code:</span>
                      <p className="font-medium text-gray-900">{selectedCompensation.bankDetails.ifscCode}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowPaymentModal(false); setSelectedCompensation(null); resetPaymentForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
                >
                  <CreditCard size={18} />
                  <span>Process Payment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Compensation Modal */}
      {showViewModal && selectedCompensation && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Compensation Details - {selectedCompensation.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedCompensation(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedCompensation.status === 'Paid' ? 'bg-green-100 text-green-700' :
                  selectedCompensation.status === 'Partial' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {selectedCompensation.status}
                </span>
                {selectedCompensation.paymentDate !== '-' && (
                  <span className="text-sm text-gray-500">Last Payment: {selectedCompensation.paymentDate}</span>
                )}
              </div>

              {/* Owner Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Owner Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="mt-1 text-gray-900">{selectedCompensation.owner}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contact</label>
                    <p className="mt-1 text-gray-900">{selectedCompensation.ownerContact}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Parcel ID</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedCompensation.parcelId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Land Area</label>
                    <p className="mt-1 text-gray-900">{selectedCompensation.landArea}</p>
                  </div>
                </div>
              </div>

              {/* Compensation Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Compensation Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Market Value:</span>
                    <span className="text-sm font-medium text-gray-900">{selectedCompensation.marketValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Solatium (30%):</span>
                    <span className="text-sm font-medium text-gray-900">{selectedCompensation.solatium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Interest:</span>
                    <span className="text-sm font-medium text-gray-900">{selectedCompensation.interest}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-base font-semibold text-gray-900">Total Compensation:</span>
                    <span className="text-xl font-bold text-gray-900">{selectedCompensation.totalCompensation}</span>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Payment Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Paid Amount:</span>
                    <span className="text-sm font-medium text-green-600">{selectedCompensation.paidAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pending Amount:</span>
                    <span className="text-sm font-medium text-orange-600">{selectedCompensation.pendingAmount}</span>
                  </div>
                  {selectedCompensation.paymentMode && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Payment Mode:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedCompensation.paymentMode}</span>
                    </div>
                  )}
                  {selectedCompensation.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Transaction ID:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedCompensation.transactionId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bank Details */}
              {selectedCompensation.bankDetails && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900">Bank Account Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Account Name</label>
                      <p className="mt-1 text-gray-900">{selectedCompensation.bankDetails.accountName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Account Number</label>
                      <p className="mt-1 text-gray-900">{selectedCompensation.bankDetails.accountNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Bank Name</label>
                      <p className="mt-1 text-gray-900">{selectedCompensation.bankDetails.bankName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">IFSC Code</label>
                      <p className="mt-1 text-gray-900">{selectedCompensation.bankDetails.ifscCode}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {selectedCompensation.status !== 'Paid' && (
                  <button
                    onClick={() => { setShowViewModal(false); handlePaymentClick(selectedCompensation) }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Process Payment
                  </button>
                )}
                <button
                  onClick={() => { setShowViewModal(false); setSelectedCompensation(null) }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}