'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, Users, Eye, Edit, Trash2, X } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface Allotment {
  id: string
  applicationNo: string
  unitNo: string
  projectName: string
  projectId: string
  applicantName: string
  applicantContact: string
  applicantEmail?: string
  applicantAddress?: string
  category: 'General' | 'EWS' | 'LIG' | 'MIG' | 'HIG' | 'SC/ST' | 'OBC'
  allotmentDate: string
  price: string
  amountPaid: string
  status: 'Completed' | 'Payment Pending' | 'Documentation Pending' | 'Registry Pending' | 'Cancelled'
  possessionDate: string
  bookingAmount?: string
  installmentsPaid?: number
  totalInstallments?: number
  registryNumber?: string
  documentStatus?: string
}

const initialAllotments: Allotment[] = [
  {
    id: 'ALLOT-2024-001',
    applicationNo: 'APP-2024-156',
    unitNo: 'A-101',
    projectName: 'Gomti Nagar Housing Scheme',
    projectId: 'PROJ-001',
    applicantName: 'Rajesh Kumar Singh',
    applicantContact: '+91 9876543210',
    applicantEmail: 'rajesh.kumar@example.com',
    applicantAddress: 'Indira Nagar, Lucknow - 226016',
    category: 'General',
    allotmentDate: '2024-01-15',
    price: '₹45,00,000',
    amountPaid: '₹45,00,000',
    status: 'Completed',
    possessionDate: '2024-12-30',
    bookingAmount: '₹5,00,000',
    installmentsPaid: 10,
    totalInstallments: 10,
    registryNumber: 'REG/2024/001',
    documentStatus: 'Completed',
  },
  {
    id: 'ALLOT-2024-002',
    applicationNo: 'APP-2024-157',
    unitNo: 'B-205',
    projectName: 'Hazratganj Apartments',
    projectId: 'PROJ-002',
    applicantName: 'Priya Sharma',
    applicantContact: '+91 9876543211',
    applicantEmail: 'priya.sharma@example.com',
    applicantAddress: 'Hazratganj, Lucknow - 226001',
    category: 'EWS',
    allotmentDate: '2024-01-18',
    price: '₹62,00,000',
    amountPaid: '₹31,00,000',
    status: 'Payment Pending',
    possessionDate: '2025-03-31',
    bookingAmount: '₹6,00,000',
    installmentsPaid: 5,
    totalInstallments: 10,
    registryNumber: '',
    documentStatus: 'Pending',
  },
]

const projects = ['Gomti Nagar Housing Scheme', 'Hazratganj Apartments', 'Aliganj Residency']
const categories = ['General', 'EWS', 'LIG', 'MIG', 'HIG', 'SC/ST', 'OBC']

export default function SaleAllotmentPage() {
  const router = useRouter()
  const [allotments, setAllotments] = useState<Allotment[]>(initialAllotments)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAllotment, setSelectedAllotment] = useState<Allotment | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    applicationNo: '',
    unitNo: '',
    projectName: 'Gomti Nagar Housing Scheme',
    projectId: 'PROJ-001',
    applicantName: '',
    applicantContact: '',
    applicantEmail: '',
    applicantAddress: '',
    category: 'General' as Allotment['category'],
    allotmentDate: new Date().toISOString().split('T')[0],
    price: '',
    amountPaid: '',
    possessionDate: '',
    bookingAmount: '',
    installmentsPaid: 0,
    totalInstallments: 10,
    registryNumber: '',
    documentStatus: 'Pending',
  })

  const handleAddAllotment = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newAllotment: Allotment = {
      id: `ALLOT-2024-${String(allotments.length + 1).padStart(3, '0')}`,
      ...formData,
      price: `₹${formData.price}`,
      amountPaid: `₹${formData.amountPaid}`,
      bookingAmount: formData.bookingAmount ? `₹${formData.bookingAmount}` : '',
      status: parseInt(formData.amountPaid) >= parseInt(formData.price) ? 'Completed' : 'Payment Pending',
    }
    
    setAllotments([...allotments, newAllotment])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditAllotment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAllotment) return
    
    setAllotments(allotments.map(allot => 
      allot.id === selectedAllotment.id 
        ? { 
            ...allot, 
            ...formData,
            price: `₹${formData.price}`,
            amountPaid: `₹${formData.amountPaid}`,
            bookingAmount: formData.bookingAmount ? `₹${formData.bookingAmount}` : '',
          }
        : allot
    ))
    setShowEditModal(false)
    setSelectedAllotment(null)
    resetForm()
  }

  const handleDeleteAllotment = (id: string) => {
    if (confirm('Are you sure you want to delete this allotment?')) {
      setAllotments(allotments.filter(allot => allot.id !== id))
    }
  }

  const handleViewAllotment = (allotment: Allotment) => {
    router.push(`/property-disposal/sale-allotment/${allotment.id}`)
  }

  const handleEditClick = (allotment: Allotment) => {
    setSelectedAllotment(allotment)
    setFormData({
      applicationNo: allotment.applicationNo,
      unitNo: allotment.unitNo,
      projectName: allotment.projectName,
      projectId: allotment.projectId,
      applicantName: allotment.applicantName,
      applicantContact: allotment.applicantContact,
      applicantEmail: allotment.applicantEmail || '',
      applicantAddress: allotment.applicantAddress || '',
      category: allotment.category,
      allotmentDate: allotment.allotmentDate,
      price: allotment.price.replace(/[^0-9]/g, ''),
      amountPaid: allotment.amountPaid.replace(/[^0-9]/g, ''),
      possessionDate: allotment.possessionDate,
      bookingAmount: allotment.bookingAmount?.replace(/[^0-9]/g, '') || '',
      installmentsPaid: allotment.installmentsPaid || 0,
      totalInstallments: allotment.totalInstallments || 10,
      registryNumber: allotment.registryNumber || '',
      documentStatus: allotment.documentStatus || 'Pending',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      applicationNo: '',
      unitNo: '',
      projectName: 'Gomti Nagar Housing Scheme',
      projectId: 'PROJ-001',
      applicantName: '',
      applicantContact: '',
      applicantEmail: '',
      applicantAddress: '',
      category: 'General',
      allotmentDate: new Date().toISOString().split('T')[0],
      price: '',
      amountPaid: '',
      possessionDate: '',
      bookingAmount: '',
      installmentsPaid: 0,
      totalInstallments: 10,
      registryNumber: '',
      documentStatus: 'Pending',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Allotment ID', 'Application No', 'Unit No', 'Applicant', 'Contact', 'Category', 'Price', 'Amount Paid', 'Status'].join(','),
      ...filteredAllotments.map(allot => 
        [allot.id, allot.applicationNo, allot.unitNo, allot.applicantName, allot.applicantContact, allot.category, allot.price, allot.amountPaid, allot.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sale-allotments.csv'
    a.click()
  }

  const filteredAllotments = allotments.filter(allot => {
    const matchesSearch = allot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allot.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allot.unitNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         allot.applicantName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || allot.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalApplications = 567
  const allotmentsMade = allotments.length
  const revenueCollected = '₹85 Cr'
  const pendingPayments = allotments.filter(a => a.status === 'Payment Pending').length
if (isLoading) {
    return <DetailsSkeleton />
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sale & Allotment Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track property sales, allotments, and buyer management</p>
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
            <span>New Allotment</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Applications</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalApplications}</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Allotments Made</p>
          <h3 className="text-3xl font-bold text-green-600">{allotmentsMade}</h3>
          <p className="text-xs text-green-600 mt-2">{((allotmentsMade / totalApplications) * 100).toFixed(0)}% conversion</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Revenue Collected</p>
          <h3 className="text-2xl font-bold text-blue-600">{revenueCollected}</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Payments</p>
          <h3 className="text-3xl font-bold text-orange-600">{pendingPayments}</h3>
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
                      {['Completed', 'Payment Pending', 'Documentation Pending', 'Registry Pending', 'Cancelled'].map(status => (
                        <button
                          key={status}
                          onClick={() => { setFilterStatus(status); setShowFilterDropdown(false) }}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                        >
                          {status}
                        </button>
                      ))}
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
              {filteredAllotments.map((allotment) => (
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
                      allotment.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      allotment.status === 'Payment Pending' ? 'bg-orange-100 text-orange-700' :
                      allotment.status === 'Documentation Pending' ? 'bg-blue-100 text-blue-700' :
                      allotment.status === 'Registry Pending' ? 'bg-purple-100 text-purple-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {allotment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewAllotment(allotment)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(allotment)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteAllotment(allotment.id)}
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

      {/* Add Allotment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">New Allotment</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAllotment} className="p-6 space-y-6">
              {/* Application & Unit Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application & Unit Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicationNo}
                      onChange={(e) => setFormData({...formData, applicationNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="APP-2024-156"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unitNo}
                      onChange={(e) => setFormData({...formData, unitNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="A-101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as Allotment['category']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Applicant Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Rajesh Kumar Singh"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.applicantContact}
                      onChange={(e) => setFormData({...formData, applicantContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.applicantEmail}
                      onChange={(e) => setFormData({...formData, applicantEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="rajesh.kumar@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantAddress}
                      onChange={(e) => setFormData({...formData, applicantAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Indira Nagar, Lucknow"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="4500000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Paid <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.amountPaid}
                        onChange={(e) => setFormData({...formData, amountPaid: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="4500000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.bookingAmount}
                        onChange={(e) => setFormData({...formData, bookingAmount: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="500000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Installments
                    </label>
                    <input
                      type="number"
                      value={formData.totalInstallments}
                      onChange={(e) => setFormData({...formData, totalInstallments: parseInt(e.target.value) || 10})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Installments Paid
                    </label>
                    <input
                      type="number"
                      value={formData.installmentsPaid}
                      onChange={(e) => setFormData({...formData, installmentsPaid: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Dates & Documentation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dates & Documentation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allotment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.allotmentDate}
                      onChange={(e) => setFormData({...formData, allotmentDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Possession Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.possessionDate}
                      onChange={(e) => setFormData({...formData, possessionDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registry Number
                    </label>
                    <input
                      type="text"
                      value={formData.registryNumber}
                      onChange={(e) => setFormData({...formData, registryNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="REG/2024/001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Status
                    </label>
                    <select
                      value={formData.documentStatus}
                      onChange={(e) => setFormData({...formData, documentStatus: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
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
                  Create Allotment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Edit Allotment</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedAllotment(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditAllotment} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application & Unit Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicationNo}
                      onChange={(e) => setFormData({...formData, applicationNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unitNo}
                      onChange={(e) => setFormData({...formData, unitNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as Allotment['category']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.applicantContact}
                      onChange={(e) => setFormData({...formData, applicantContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.applicantEmail}
                      onChange={(e) => setFormData({...formData, applicantEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantAddress}
                      onChange={(e) => setFormData({...formData, applicantAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Paid <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.amountPaid}
                        onChange={(e) => setFormData({...formData, amountPaid: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Booking Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.bookingAmount}
                        onChange={(e) => setFormData({...formData, bookingAmount: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Installments</label>
                    <input
                      type="number"
                      value={formData.totalInstallments}
                      onChange={(e) => setFormData({...formData, totalInstallments: parseInt(e.target.value) || 10})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Installments Paid</label>
                    <input
                      type="number"
                      value={formData.installmentsPaid}
                      onChange={(e) => setFormData({...formData, installmentsPaid: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dates & Documentation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allotment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.allotmentDate}
                      onChange={(e) => setFormData({...formData, allotmentDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Possession Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.possessionDate}
                      onChange={(e) => setFormData({...formData, possessionDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registry Number</label>
                    <input
                      type="text"
                      value={formData.registryNumber}
                      onChange={(e) => setFormData({...formData, registryNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Document Status</label>
                    <select
                      value={formData.documentStatus}
                      onChange={(e) => setFormData({...formData, documentStatus: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedAllotment(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Allotment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}