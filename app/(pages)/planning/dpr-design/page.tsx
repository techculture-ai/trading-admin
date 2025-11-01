'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Upload, Download, FileText, X, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle, File } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface DPR {
  id: string
  projectId: string
  projectName: string
  version: string
  submittedBy: string
  submittedDate: string
  reviewedBy: string
  status: 'Approved' | 'Under Review' | 'Revision Required' | 'Rejected'
  approvalDate: string
  documents: number
  description?: string
  estimatedCost?: string
  scope?: string
  remarks?: string
}

const initialDPRs: DPR[] = [
  {
    id: 'DPR-2024-045',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    version: 'v2.1',
    submittedBy: 'Rajesh Sharma',
    submittedDate: '2024-01-15',
    reviewedBy: 'Dr. Suresh Kumar',
    status: 'Approved',
    approvalDate: '2024-01-22',
    documents: 5,
    description: 'Detailed project report for housing scheme',
    estimatedCost: '₹45,00,00,000',
    scope: 'Construction of 200 residential units',
    remarks: 'All technical specifications approved'
  },
  {
    id: 'DPR-2024-046',
    projectId: 'PROJ-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    version: 'v1.0',
    submittedBy: 'Priya Verma',
    submittedDate: '2024-01-20',
    reviewedBy: 'Dr. Suresh Kumar',
    status: 'Under Review',
    approvalDate: '-',
    documents: 8,
    description: 'Commercial complex DPR',
    estimatedCost: '₹78,00,00,000',
    scope: 'Multi-story commercial development'
  },
  {
    id: 'DPR-2024-047',
    projectId: 'PROJ-2024-003',
    projectName: 'Aliganj Residential Project',
    version: 'v1.5',
    submittedBy: 'Amit Singh',
    submittedDate: '2024-01-18',
    reviewedBy: '-',
    status: 'Revision Required',
    approvalDate: '-',
    documents: 6,
    description: 'Residential project DPR',
    estimatedCost: '₹35,00,00,000',
    remarks: 'Technical drawings need revision'
  },
]

const dprStatuses = ['Approved', 'Under Review', 'Revision Required', 'Rejected']

export default function DPRDesignPage() {
  const [dprs, setDPRs] = useState<DPR[]>(initialDPRs)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedDPR, setSelectedDPR] = useState<DPR | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    version: '',
    submittedBy: '',
    description: '',
    estimatedCost: '',
    scope: '',
    remarks: '',
  })

  const handleAddDPR = (e: React.FormEvent) => {
    e.preventDefault()
    const newDPR: DPR = {
      id: `DPR-${new Date().getFullYear()}-${String(dprs.length + 1).padStart(3, '0')}`,
      ...formData,
      submittedDate: new Date().toISOString().split('T')[0],
      reviewedBy: '-',
      status: 'Under Review',
      approvalDate: '-',
      documents: 0,
    }
    setDPRs([...dprs, newDPR])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditDPR = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDPR) return
    
    setDPRs(dprs.map(d => 
      d.id === selectedDPR.id 
        ? { ...d, ...formData }
        : d
    ))
    setShowEditModal(false)
    setSelectedDPR(null)
    resetForm()
  }

  const handleDeleteDPR = (id: string) => {
    if (confirm('Are you sure you want to delete this DPR?')) {
      setDPRs(dprs.filter(d => d.id !== id))
    }
  }

  const handleApproveDPR = (id: string) => {
    setDPRs(dprs.map(d => 
      d.id === id 
        ? { 
            ...d, 
            status: 'Approved' as const, 
            approvalDate: new Date().toISOString().split('T')[0],
            reviewedBy: 'Dr. Suresh Kumar'
          }
        : d
    ))
  }

  const handleRejectDPR = (id: string) => {
    if (confirm('Are you sure you want to reject this DPR?')) {
      setDPRs(dprs.map(d => 
        d.id === id 
          ? { ...d, status: 'Rejected' as const, reviewedBy: 'Dr. Suresh Kumar' }
          : d
      ))
    }
  }

  const handleViewDPR = (dpr: DPR) => {
    router.push(`/planning/dpr-design/${dpr.id}`)
  }

  const handleEditClick = (dpr: DPR) => {
    setSelectedDPR(dpr)
    setFormData({
      projectId: dpr.projectId,
      projectName: dpr.projectName,
      version: dpr.version,
      submittedBy: dpr.submittedBy,
      description: dpr.description || '',
      estimatedCost: dpr.estimatedCost || '',
      scope: dpr.scope || '',
      remarks: dpr.remarks || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      projectId: '',
      projectName: '',
      version: '',
      submittedBy: '',
      description: '',
      estimatedCost: '',
      scope: '',
      remarks: '',
    })
  }

  const filteredDPRs = dprs.filter(dpr => {
    const matchesSearch = dpr.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dpr.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dpr.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || dpr.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status: DPR['status']) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle size={20} className="text-green-600" />
      case 'Under Review':
        return <Clock size={20} className="text-blue-600" />
      case 'Revision Required':
        return <AlertCircle size={20} className="text-orange-600" />
      case 'Rejected':
        return <X size={20} className="text-red-600" />
    }
  }

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DPR & Design Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage Detailed Project Reports and design approvals</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload size={20} />
            <span>Upload DPR</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={20} />
            <span>Create New DPR</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total DPRs</p>
          <h3 className="text-3xl font-bold text-gray-900">{dprs.length}</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Approved</p>
          <h3 className="text-3xl font-bold text-green-600">
            {dprs.filter(d => d.status === 'Approved').length}
          </h3>
          <p className="text-xs text-green-600 mt-2">+8 this month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Under Review</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {dprs.filter(d => d.status === 'Under Review').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Revision Required</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {dprs.filter(d => d.status === 'Revision Required').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Pending action</p>
        </div>
      </div>

      {/* Approval Workflow */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">DPR Approval Workflow</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <FileText size={24} className="text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Submission</p>
            <p className="text-xs text-gray-500">Upload DPR</p>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <FileText size={24} className="text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Technical Review</p>
            <p className="text-xs text-gray-500">Committee Review</p>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <FileText size={24} className="text-orange-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Statutory Approval</p>
            <p className="text-xs text-gray-500">Authority Approval</p>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Final Approval</p>
            <p className="text-xs text-gray-500">Project Approved</p>
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
                  placeholder="Search DPRs..."
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
                      {dprStatuses.map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DPR ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviewed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDPRs.map((dpr) => (
                <tr key={dpr.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dpr.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dpr.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{dpr.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{dpr.submittedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(dpr.submittedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{dpr.reviewedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(dpr.status)}
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        dpr.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        dpr.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                        dpr.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {dpr.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <FileText size={14} />
                      <span>{dpr.documents} files</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewDPR(dpr)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      {dpr.status === 'Under Review' && (
                        <>
                          <button 
                            onClick={() => handleApproveDPR(dpr.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            onClick={() => handleEditClick(dpr)}
                            className="text-orange-600 hover:text-orange-700"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        </>
                      )}
                      <button 
                        className="text-gray-600 hover:text-gray-700"
                        title="Download"
                      >
                        <Download size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteDPR(dpr.id)}
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

      {/* Add DPR Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Create New DPR</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddDPR} className="p-6 space-y-6">
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
                      Version <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.version}
                      onChange={(e) => setFormData({...formData, version: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="v1.0"
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Submitted By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.submittedBy}
                      onChange={(e) => setFormData({...formData, submittedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Rajesh Sharma"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">DPR Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Cost
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedCost}
                      onChange={(e) => setFormData({...formData, estimatedCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹45,00,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Scope
                    </label>
                    <textarea
                      value={formData.scope}
                      onChange={(e) => setFormData({...formData, scope: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter project scope..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter DPR description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter any remarks..."
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
                  Create DPR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload DPR Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Upload DPR Documents</h2>
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
                <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 50MB)</p>
                <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Browse Files
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">Required Documents</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center space-x-2">
                    <File size={14} />
                    <span>Technical Drawings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <File size={14} />
                    <span>Cost Estimation Report</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <File size={14} />
                    <span>Project Timeline</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <File size={14} />
                    <span>Risk Assessment</span>
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

      {/* View DPR Modal */}
      {showViewModal && selectedDPR && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">DPR Details - {selectedDPR.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedDPR(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedDPR.status)}
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedDPR.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    selectedDPR.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                    selectedDPR.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedDPR.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Submitted on {new Date(selectedDPR.submittedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* Project Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project ID</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedDPR.projectId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project Name</label>
                    <p className="mt-1 text-gray-900">{selectedDPR.projectName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">DPR Version</label>
                    <p className="mt-1 text-gray-900">{selectedDPR.version}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Estimated Cost</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedDPR.estimatedCost || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Submission Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Submission Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Submitted By</label>
                    <p className="mt-1 text-gray-900">{selectedDPR.submittedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Submission Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(selectedDPR.submittedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Reviewed By</label>
                    <p className="mt-1 text-gray-900">{selectedDPR.reviewedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Approval Date</label>
                    <p className="mt-1 text-gray-900">
                      {selectedDPR.approvalDate !== '-' 
                        ? new Date(selectedDPR.approvalDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
                        : '-'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Scope */}
              {selectedDPR.scope && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Project Scope</label>
                  <p className="mt-2 text-gray-700">{selectedDPR.scope}</p>
                </div>
              )}

              {/* Description */}
              {selectedDPR.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Description</label>
                  <p className="mt-2 text-gray-700">{selectedDPR.description}</p>
                </div>
              )}

              {/* Remarks */}
              {selectedDPR.remarks && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Remarks</label>
                  <p className="mt-2 text-gray-700">{selectedDPR.remarks}</p>
                </div>
              )}

              {/* Documents */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Attached Documents ({selectedDPR.documents})</h3>
                  <button className="text-sm text-orange-600 hover:text-orange-700">
                    Download All
                  </button>
                </div>
                <div className="space-y-2">
                  {[...Array(selectedDPR.documents)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Document {i + 1}.pdf</p>
                          <p className="text-xs text-gray-500">2.5 MB • PDF</p>
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
                {selectedDPR.status === 'Under Review' && (
                  <>
                    <button
                      onClick={() => { handleRejectDPR(selectedDPR.id); setShowViewModal(false) }}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => { handleApproveDPR(selectedDPR.id); setShowViewModal(false) }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Approve DPR
                    </button>
                  </>
                )}
                <button
                  onClick={() => { setShowViewModal(false); setSelectedDPR(null) }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure to Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit DPR</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedDPR(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditDPR} className="p-6 space-y-6">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Version <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.version}
                      onChange={(e) => setFormData({...formData, version: e.target.value})}
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Submitted By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.submittedBy}
                      onChange={(e) => setFormData({...formData, submittedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">DPR Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Cost</label>
                    <input
                      type="text"
                      value={formData.estimatedCost}
                      onChange={(e) => setFormData({...formData, estimatedCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Scope</label>
                    <textarea
                      value={formData.scope}
                      onChange={(e) => setFormData({...formData, scope: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedDPR(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update DPR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}