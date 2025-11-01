'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, X, Eye, Edit, Trash2, Package, Calendar, User } from 'lucide-react'

interface MaterialIssue {
  id: string
  issueNo: string
  date: string
  projectId: string
  projectName: string
  materialName: string
  materialCode: string
  quantityIssued: string
  unit: string
  issuedTo: string
  issuedBy: string
  purpose: string
  status: 'Issued' | 'Pending Return' | 'Returned' | 'Cancelled'
  remarks?: string
  returnDate?: string
}

const initialIssues: MaterialIssue[] = [
  {
    id: 'ISS-ENG-001',
    issueNo: 'ISS/ENG/2024/001',
    date: '2025-10-25',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    materialName: 'Cement OPC 53 Grade',
    materialCode: 'MAT-001',
    quantityIssued: '500',
    unit: 'Bags',
    issuedTo: 'Site Engineer - Rajesh Sharma',
    issuedBy: 'Store Manager - Amit Kumar',
    purpose: 'Foundation Work - Block A',
    status: 'Issued',
    remarks: 'Material issued for urgent foundation work'
  },
  {
    id: 'ISS-ENG-002',
    issueNo: 'ISS/ENG/2024/002',
    date: '2025-10-24',
    projectId: 'PROJ-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    materialName: 'Steel TMT Bars 12mm',
    materialCode: 'MAT-002',
    quantityIssued: '5',
    unit: 'Tons',
    issuedTo: 'Site Engineer - Priya Verma',
    issuedBy: 'Store Manager - Amit Kumar',
    purpose: 'Column Construction',
    status: 'Issued',
  },
  {
    id: 'ISS-ENG-003',
    issueNo: 'ISS/ENG/2024/003',
    date: '2025-10-26',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    materialName: 'Aggregate 20mm',
    materialCode: 'MAT-003',
    quantityIssued: '100',
    unit: 'Cu.M.',
    issuedTo: 'Site Engineer - Rajesh Sharma',
    issuedBy: 'Store Manager - Amit Kumar',
    purpose: 'Concrete Work',
    status: 'Pending Return',
  },
]

export default function MaterialIssueTrackingPage() {
  const router = useRouter()
  const [issues, setIssues] = useState<MaterialIssue[]>(initialIssues)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState<MaterialIssue | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    materialName: '',
    materialCode: '',
    quantityIssued: '',
    unit: 'Bags',
    issuedTo: '',
    issuedBy: '',
    purpose: '',
    remarks: '',
  })

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault()
    const newIssue: MaterialIssue = {
      id: `ISS-ENG-${String(issues.length + 1).padStart(3, '0')}`,
      issueNo: `ISS/ENG/2024/${String(issues.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      ...formData,
      status: 'Issued',
    }
    setIssues([...issues, newIssue])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditIssue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedIssue) return
    
    setIssues(issues.map(issue => 
      issue.id === selectedIssue.id 
        ? { ...issue, ...formData }
        : issue
    ))
    setShowEditModal(false)
    setSelectedIssue(null)
    resetForm()
  }

  const handleDeleteIssue = (id: string) => {
    if (confirm('Are you sure you want to delete this material issue?')) {
      setIssues(issues.filter(issue => issue.id !== id))
    }
  }

  const handleViewIssue = (issue: MaterialIssue) => {
    router.push(`/engineering-store/issue-tracking/${issue.id}`)
  }

  const handleEditClick = (issue: MaterialIssue) => {
    setSelectedIssue(issue)
    setFormData({
      projectId: issue.projectId,
      projectName: issue.projectName,
      materialName: issue.materialName,
      materialCode: issue.materialCode,
      quantityIssued: issue.quantityIssued,
      unit: issue.unit,
      issuedTo: issue.issuedTo,
      issuedBy: issue.issuedBy,
      purpose: issue.purpose,
      remarks: issue.remarks || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      projectId: '',
      projectName: '',
      materialName: '',
      materialCode: '',
      quantityIssued: '',
      unit: 'Bags',
      issuedTo: '',
      issuedBy: '',
      purpose: '',
      remarks: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Issue ID', 'Issue No', 'Date', 'Project', 'Material', 'Quantity', 'Unit', 'Issued To', 'Purpose', 'Status'].join(','),
      ...filteredIssues.map(i => 
        [i.id, i.issueNo, i.date, i.projectName, i.materialName, i.quantityIssued, i.unit, i.issuedTo, i.purpose, i.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'material-issues.csv'
    a.click()
  }

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.issueNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.materialName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || issue.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const units = ['Bags', 'Tons', 'Cu.M.', 'Sq.M.', 'Nos', 'Kgs', 'Ltrs', 'Meters']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Material Issue Tracking</h1>
          <p className="text-sm text-gray-600 mt-1">Track material issuances to construction sites</p>
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
            <span>Issue Material</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Issues (Oct 2025)</p>
          <h3 className="text-3xl font-bold text-gray-900">{issues.length}</h3>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Value Issued</p>
          <h3 className="text-2xl font-bold text-blue-600">₹45 L</h3>
          <p className="text-xs text-gray-500 mt-2">October 2025</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Issues</p>
          <h3 className="text-3xl font-bold text-green-600">
            {issues.filter(i => i.status === 'Issued').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Issued to sites</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Returns</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {issues.filter(i => i.status === 'Pending Return').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Needs reconciliation</p>
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
                  placeholder="Search issues..."
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
                      {['Issued', 'Pending Return', 'Returned', 'Cancelled'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity Issued</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issued To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.issueNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(issue.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.materialName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {issue.quantityIssued} {issue.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.issuedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      issue.status === 'Issued' ? 'bg-green-100 text-green-700' :
                      issue.status === 'Pending Return' ? 'bg-orange-100 text-orange-700' :
                      issue.status === 'Returned' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewIssue(issue)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(issue)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteIssue(issue.id)}
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

      {/* Add Issue Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Issue Material</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddIssue} className="p-6 space-y-6">
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

              {/* Material Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.materialCode}
                      onChange={(e) => setFormData({...formData, materialCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="MAT-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.materialName}
                      onChange={(e) => setFormData({...formData, materialName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Cement OPC 53 Grade"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity Issued <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.quantityIssued}
                      onChange={(e) => setFormData({...formData, quantityIssued: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issued To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.issuedTo}
                      onChange={(e) => setFormData({...formData, issuedTo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Site Engineer - Rajesh Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issued By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.issuedBy}
                      onChange={(e) => setFormData({...formData, issuedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Store Manager - Amit Kumar"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Foundation Work - Block A"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter any additional remarks..."
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
                  Issue Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar to Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Material Issue</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedIssue(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditIssue} className="p-6 space-y-6">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.materialCode}
                      onChange={(e) => setFormData({...formData, materialCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.materialName}
                      onChange={(e) => setFormData({...formData, materialName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity Issued <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.quantityIssued}
                      onChange={(e) => setFormData({...formData, quantityIssued: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issued To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.issuedTo}
                      onChange={(e) => setFormData({...formData, issuedTo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issued By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.issuedBy}
                      onChange={(e) => setFormData({...formData, issuedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedIssue(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}