'use client'

import { useState } from 'react'
import { Search, Plus, Filter, CheckCircle, Clock, XCircle, X, Eye, Edit, Trash2, AlertCircle, Upload, Download, FileText, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface Clearance {
  id: string
  projectId: string
  projectName: string
  clearanceType: string
  authority: string
  applicationDate: string
  approvalDate: string
  validUpto: string
  status: 'Approved' | 'Pending' | 'Under Review' | 'Rejected' | 'Expired'
  documents: number
  applicationNumber?: string
  contactPerson?: string
  contactEmail?: string
  contactPhone?: string
  remarks?: string
  conditions?: string[]
}

const initialClearances: Clearance[] = [
  {
    id: 'CLR-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    clearanceType: 'Environmental Clearance',
    authority: 'UP Pollution Control Board',
    applicationDate: '2024-01-05',
    approvalDate: '2024-01-20',
    validUpto: '2027-01-20',
    status: 'Approved',
    documents: 8,
    applicationNumber: 'EC/2024/001',
    contactPerson: 'Dr. R.K. Sharma',
    contactEmail: 'rk.sharma@uppcb.gov.in',
    contactPhone: '+91 522 2237771',
    remarks: 'All environmental norms complied',
    conditions: ['Regular monitoring required', 'Annual compliance report mandatory']
  },
  {
    id: 'CLR-2024-002',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    clearanceType: 'Fire NOC',
    authority: 'Fire Department, Lucknow',
    applicationDate: '2024-01-08',
    approvalDate: '-',
    validUpto: '-',
    status: 'Pending',
    documents: 5,
    applicationNumber: 'FD/2024/045',
    contactPerson: 'CFO Rakesh Kumar',
    contactEmail: 'fire.lucknow@up.gov.in',
    contactPhone: '+91 522 2345678'
  },
  {
    id: 'CLR-2024-003',
    projectId: 'PROJ-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    clearanceType: 'Building Plan Approval',
    authority: 'Lucknow Development Authority',
    applicationDate: '2024-01-15',
    approvalDate: '-',
    validUpto: '-',
    status: 'Under Review',
    documents: 12,
    applicationNumber: 'LDA/BP/2024/089',
    contactPerson: 'Chief Architect',
    contactEmail: 'architect@lda.gov.in',
    contactPhone: '+91 522 2638100',
    remarks: 'Technical review in progress'
  },
]

const clearanceTypes = [
  'Environmental Clearance',
  'Fire NOC',
  'Building Plan Approval',
  'Occupancy Certificate',
  'Electricity Connection',
  'Water Connection',
  'Sewerage Connection',
  'Tree Cutting Permission',
  'Archaeological Clearance',
  'Traffic Impact Assessment'
]

const clearanceStatuses = ['Approved', 'Pending', 'Under Review', 'Rejected', 'Expired']

export default function ClearancesPage() {
  const [clearances, setClearances] = useState<Clearance[]>(initialClearances)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedClearance, setSelectedClearance] = useState<Clearance | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()
  const isLoading = usePageLoading(1000)
  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    clearanceType: 'Environmental Clearance',
    authority: '',
    applicationNumber: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    remarks: '',
  })

  const handleAddClearance = (e: React.FormEvent) => {
    e.preventDefault()
    const newClearance: Clearance = {
      id: `CLR-${new Date().getFullYear()}-${String(clearances.length + 1).padStart(3, '0')}`,
      ...formData,
      applicationDate: new Date().toISOString().split('T')[0],
      approvalDate: '-',
      validUpto: '-',
      status: 'Pending',
      documents: 0,
    }
    setClearances([...clearances, newClearance])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditClearance = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClearance) return
    
    setClearances(clearances.map(c => 
      c.id === selectedClearance.id 
        ? { ...c, ...formData }
        : c
    ))
    setShowEditModal(false)
    setSelectedClearance(null)
    resetForm()
  }

  const handleDeleteClearance = (id: string) => {
    if (confirm('Are you sure you want to delete this clearance application?')) {
      setClearances(clearances.filter(c => c.id !== id))
    }
  }

  const handleApproveClearance = (id: string) => {
    const validDate = new Date()
    validDate.setFullYear(validDate.getFullYear() + 3)
    
    setClearances(clearances.map(c => 
      c.id === id 
        ? { 
            ...c, 
            status: 'Approved' as const,
            approvalDate: new Date().toISOString().split('T')[0],
            validUpto: validDate.toISOString().split('T')[0]
          }
        : c
    ))
  }

  const handleRejectClearance = (id: string) => {
    if (confirm('Are you sure you want to reject this clearance application?')) {
      setClearances(clearances.map(c => 
        c.id === id ? { ...c, status: 'Rejected' as const } : c
      ))
    }
  }

  const handleViewClearance = (clearance: Clearance) => {
    router.push(`/planning/clearances/${clearance.id}`)
  }

  const handleEditClick = (clearance: Clearance) => {
    setSelectedClearance(clearance)
    setFormData({
      projectId: clearance.projectId,
      projectName: clearance.projectName,
      clearanceType: clearance.clearanceType,
      authority: clearance.authority,
      applicationNumber: clearance.applicationNumber || '',
      contactPerson: clearance.contactPerson || '',
      contactEmail: clearance.contactEmail || '',
      contactPhone: clearance.contactPhone || '',
      remarks: clearance.remarks || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      projectId: '',
      projectName: '',
      clearanceType: 'Environmental Clearance',
      authority: '',
      applicationNumber: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      remarks: '',
    })
  }

  const filteredClearances = clearances.filter(clearance => {
    const matchesSearch = clearance.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clearance.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clearance.clearanceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clearance.authority.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || clearance.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status: Clearance['status']) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle size={20} className="text-green-600" />
      case 'Under Review':
        return <Clock size={20} className="text-blue-600" />
      case 'Pending':
        return <Clock size={20} className="text-orange-600" />
      case 'Rejected':
        return <XCircle size={20} className="text-red-600" />
      case 'Expired':
        return <AlertCircle size={20} className="text-gray-600" />
    }
  }

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clearances & NOCs</h1>
          <p className="text-sm text-gray-600 mt-1">Track statutory clearances and NOC applications</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Apply for Clearance</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Total Applications</p>
              <h3 className="text-3xl font-bold text-gray-900">{clearances.length}</h3>
              <p className="text-xs text-gray-500 mt-2">All clearances</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Approved</p>
              <h3 className="text-3xl font-bold text-green-600">
                {clearances.filter(c => c.status === 'Approved').length}
              </h3>
              <p className="text-xs text-green-600 mt-2">Clearances obtained</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Pending</p>
              <h3 className="text-3xl font-bold text-orange-600">
                {clearances.filter(c => c.status === 'Pending' || c.status === 'Under Review').length}
              </h3>
              <p className="text-xs text-gray-500 mt-2">In process</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Rejected</p>
              <h3 className="text-3xl font-bold text-red-600">
                {clearances.filter(c => c.status === 'Rejected').length}
              </h3>
              <p className="text-xs text-gray-500 mt-2">Requires resubmission</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle size={24} className="text-red-600" />
            </div>
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
                  placeholder="Search clearances..."
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
                      {clearanceStatuses.map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clearance ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clearance Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approval Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Upto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClearances.map((clearance) => (
                <tr key={clearance.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{clearance.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clearance.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{clearance.clearanceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{clearance.authority}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(clearance.applicationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{clearance.approvalDate !== '-' 
                    ? new Date(clearance.approvalDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : '-'
                  }</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{clearance.validUpto !== '-'
                    ? new Date(clearance.validUpto).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : '-'
                  }</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(clearance.status)}
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        clearance.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        clearance.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                        clearance.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        clearance.status === 'Expired' ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {clearance.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewClearance(clearance)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {(clearance.status === 'Pending' || clearance.status === 'Under Review') && (
                        <>
                          <button 
                            onClick={() => handleApproveClearance(clearance.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            onClick={() => handleEditClick(clearance)}
                            className="text-orange-600 hover:text-orange-700"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => setShowUploadModal(true)}
                        className="text-purple-600 hover:text-purple-700"
                        title="Upload Documents"
                      >
                        <Upload size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClearance(clearance.id)}
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

      {/* Add Clearance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Apply for Clearance</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddClearance} className="p-6 space-y-6">
              {/* Project Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectId}
                      onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="PROJ-2024-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Number
                    </label>
                    <input
                      type="text"
                      value={formData.applicationNumber}
                      onChange={(e) => setFormData({...formData, applicationNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="EC/2024/001"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Gomti Nagar Housing Scheme"
                    />
                  </div>
                </div>
              </div>

              {/* Clearance Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clearance Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clearance Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.clearanceType}
                      onChange={(e) => setFormData({...formData, clearanceType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {clearanceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Authority <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.authority}
                      onChange={(e) => setFormData({...formData, authority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="UP Pollution Control Board"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Authority Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Dr. R.K. Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="contact@authority.gov.in"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 522 2237771"
                    />
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks / Notes
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter any additional remarks..."
                />
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
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Clearance Modal */}
      {showViewModal && selectedClearance && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Clearance Details - {selectedClearance.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedClearance(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedClearance.status)}
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedClearance.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    selectedClearance.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                    selectedClearance.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    selectedClearance.status === 'Expired' ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedClearance.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Applied on {new Date(selectedClearance.applicationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* Project & Application Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Application Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Clearance ID</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedClearance.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Application Number</label>
                    <p className="mt-1 text-gray-900">{selectedClearance.applicationNumber || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project ID</label>
                    <p className="mt-1 text-gray-900">{selectedClearance.projectId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project Name</label>
                    <p className="mt-1 text-gray-900">{selectedClearance.projectName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Clearance Type</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedClearance.clearanceType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Authority</label>
                    <p className="mt-1 text-gray-900">{selectedClearance.authority}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Calendar size={18} className="mr-2 text-orange-500" />
                  Timeline
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Application Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(selectedClearance.applicationDate).toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Approval Date</label>
                    <p className="mt-1 text-gray-900">
                      {selectedClearance.approvalDate !== '-' 
                        ? new Date(selectedClearance.approvalDate).toLocaleDateString('en-GB', { 
                            day: '2-digit', 
                            month: 'long', 
                            year: 'numeric' 
                          })
                        : 'Pending'
                      }
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Valid Until</label>
                    <p className="mt-1 text-gray-900">
                      {selectedClearance.validUpto !== '-'
                        ? new Date(selectedClearance.validUpto).toLocaleDateString('en-GB', { 
                            day: '2-digit', 
                            month: 'long', 
                            year: 'numeric' 
                          })
                        : '-'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              {(selectedClearance.contactPerson || selectedClearance.contactEmail || selectedClearance.contactPhone) && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900">Authority Contact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedClearance.contactPerson && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Contact Person</label>
                        <p className="mt-1 text-gray-900">{selectedClearance.contactPerson}</p>
                      </div>
                    )}
                    {selectedClearance.contactEmail && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="mt-1 text-gray-900">{selectedClearance.contactEmail}</p>
                      </div>
                    )}
                    {selectedClearance.contactPhone && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="mt-1 text-gray-900">{selectedClearance.contactPhone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Conditions */}
              {selectedClearance.conditions && selectedClearance.conditions.length > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertCircle size={18} className="mr-2 text-yellow-600" />
                    Clearance Conditions
                  </h3>
                  <ul className="space-y-2">
                    {selectedClearance.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <span className="text-yellow-600">•</span>
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Remarks */}
              {selectedClearance.remarks && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Remarks</label>
                  <p className="mt-2 text-gray-700">{selectedClearance.remarks}</p>
                </div>
              )}

              {/* Documents */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Attached Documents ({selectedClearance.documents})</h3>
                  <button className="text-sm text-orange-600 hover:text-orange-700 flex items-center space-x-1">
                    <Download size={16} />
                    <span>Download All</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {[...Array(selectedClearance.documents)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Application Document {i + 1}.pdf</p>
                          <p className="text-xs text-gray-500">1.8 MB • PDF</p>
                        </div>
                      </div>
                      <button className="text-orange-600 hover:text-orange-700">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {(selectedClearance.status === 'Pending' || selectedClearance.status === 'Under Review') && (
                  <>
                    <button
                      onClick={() => { handleRejectClearance(selectedClearance.id); setShowViewModal(false) }}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Reject Application
                    </button>
                    <button
                      onClick={() => { handleApproveClearance(selectedClearance.id); setShowViewModal(false) }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Approve Clearance
                    </button>
                  </>
                )}
                <button
                  onClick={() => { setShowViewModal(false); setSelectedClearance(null) }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar to Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Clearance Application</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedClearance(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditClearance} className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectId}
                      onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Number</label>
                    <input
                      type="text"
                      value={formData.applicationNumber}
                      onChange={(e) => setFormData({...formData, applicationNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clearance Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clearance Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.clearanceType}
                      onChange={(e) => setFormData({...formData, clearanceType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {clearanceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Authority <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.authority}
                      onChange={(e) => setFormData({...formData, authority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Authority Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks / Notes</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedClearance(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Documents Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Upload Clearance Documents</h2>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Browse Files
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">Required Documents</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center space-x-2">
                    <FileText size={14} />
                    <span>Application Form (Duly Filled)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FileText size={14} />
                    <span>Project Drawings/Plans</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FileText size={14} />
                    <span>Supporting Documents</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FileText size={14} />
                    <span>NOC from Other Departments (if applicable)</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Upload Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}