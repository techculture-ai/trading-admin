'use client'

import { useState } from 'react'
import { Search, Plus, Filter, FileText, X, Eye, Edit, Trash2, Download, Calendar, DollarSign, User, CheckCircle, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'
import { DetailsSkeleton } from '@/components/SkeletonLoader'

interface Contract {
  id: string
  projectId: string
  projectName: string
  contractor: string
  contractValue: string
  startDate: string
  endDate: string
  duration: string
  status: 'Active' | 'Completed' | 'Pending' | 'Terminated'
  completionPerc: string
  contractType?: string
  contactPerson?: string
  contactEmail?: string
  contactPhone?: string
  description?: string
  penalties?: string
  retention?: string
}

const initialContracts: Contract[] = [
  {
    id: 'CON-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    contractor: 'ABC Builders Ltd.',
    contractValue: '₹42,00,00,000',
    startDate: '2024-02-01',
    endDate: '2025-12-31',
    duration: '23 months',
    status: 'Active',
    completionPerc: '65%',
    contractType: 'Turnkey',
    contactPerson: 'Mr. Ramesh Kumar',
    contactEmail: 'ramesh@abcbuilders.com',
    contactPhone: '+91 98765 43210',
    description: 'Complete construction of 200 residential units',
    penalties: '0.5% per week of delay',
    retention: '10% of contract value'
  },
  {
    id: 'CON-2024-002',
    projectId: 'PROJ-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    contractor: 'XYZ Construction Co.',
    contractValue: '₹75,00,00,000',
    startDate: '2024-03-15',
    endDate: '2026-06-30',
    duration: '27 months',
    status: 'Active',
    completionPerc: '42%',
    contractType: 'Item Rate',
    contactPerson: 'Mrs. Priya Singh',
    contactEmail: 'priya@xyzconstruction.com',
    contactPhone: '+91 98765 43211',
    description: 'Commercial complex with shopping and office spaces',
    penalties: '1% per week of delay',
    retention: '10% of contract value'
  },
  {
    id: 'CON-2024-003',
    projectId: 'PROJ-2024-003',
    projectName: 'Aliganj Residential Project',
    contractor: 'PQR Developers',
    contractValue: '₹32,00,00,000',
    startDate: '2024-01-10',
    endDate: '2025-08-31',
    duration: '19 months',
    status: 'Active',
    completionPerc: '78%',
    contractType: 'Lump Sum',
    contactPerson: 'Mr. Suresh Verma',
    contactEmail: 'suresh@pqrdev.com',
    contactPhone: '+91 98765 43212',
    description: 'Affordable housing project - 180 units',
    penalties: '0.75% per week of delay',
    retention: '5% of contract value'
  },
]

const contractTypes = ['Turnkey', 'Item Rate', 'Lump Sum', 'Cost Plus', 'BOT']
const contractStatuses = ['Active', 'Completed', 'Pending', 'Terminated']

export default function ProjectContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>(initialContracts)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    contractor: '',
    contractValue: '',
    startDate: '',
    endDate: '',
    contractType: 'Turnkey',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    penalties: '',
    retention: '',
  })

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return ''
    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
    return `${months} months`
  }

  const handleAddContract = (e: React.FormEvent) => {
    e.preventDefault()
    const newContract: Contract = {
      id: `CON-${new Date().getFullYear()}-${String(contracts.length + 1).padStart(3, '0')}`,
      ...formData,
      duration: calculateDuration(),
      status: 'Pending',
      completionPerc: '0%',
    }
    setContracts([...contracts, newContract])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditContract = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedContract) return
    
    setContracts(contracts.map(c => 
      c.id === selectedContract.id 
        ? { ...c, ...formData, duration: calculateDuration() }
        : c
    ))
    setShowEditModal(false)
    setSelectedContract(null)
    resetForm()
  }

  const handleDeleteContract = (id: string) => {
    if (confirm('Are you sure you want to delete this contract?')) {
      setContracts(contracts.filter(c => c.id !== id))
    }
  }

  const handleViewContract = (contract: Contract) => {
    router.push(`/construction/project-contracts/${contract.id}`)
  }

  const handleEditClick = (contract: Contract) => {
    setSelectedContract(contract)
    setFormData({
      projectId: contract.projectId,
      projectName: contract.projectName,
      contractor: contract.contractor,
      contractValue: contract.contractValue,
      startDate: contract.startDate,
      endDate: contract.endDate,
      contractType: contract.contractType || 'Turnkey',
      contactPerson: contract.contactPerson || '',
      contactEmail: contract.contactEmail || '',
      contactPhone: contract.contactPhone || '',
      description: contract.description || '',
      penalties: contract.penalties || '',
      retention: contract.retention || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      projectId: '',
      projectName: '',
      contractor: '',
      contractValue: '',
      startDate: '',
      endDate: '',
      contractType: 'Turnkey',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      description: '',
      penalties: '',
      retention: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Contract ID', 'Project', 'Contractor', 'Value', 'Start Date', 'End Date', 'Duration', 'Status', 'Completion'].join(','),
      ...filteredContracts.map(c => 
        [c.id, c.projectName, c.contractor, c.contractValue, c.startDate, c.endDate, c.duration, c.status, c.completionPerc].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contracts-report.csv'
    a.click()
  }

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || contract.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalContractValue = contracts.reduce((sum, c) => 
    sum + (parseFloat(c.contractValue.replace(/[^0-9]/g, '')) || 0), 0
  )
  if (isLoading) {
    return <DetailsSkeleton />
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project & Contracts Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage construction contracts and contractor agreements</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add New Contract</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Contracts</p>
          <h3 className="text-3xl font-bold text-gray-900">{contracts.length}</h3>
          <p className="text-xs text-gray-500 mt-2">Active contracts</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Contract Value</p>
          <h3 className="text-2xl font-bold text-gray-900">₹{(totalContractValue / 10000000).toFixed(0)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Overall value</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Completed Contracts</p>
          <h3 className="text-3xl font-bold text-green-600">
            {contracts.filter(c => c.status === 'Completed').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Awards</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {contracts.filter(c => c.status === 'Pending').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Under evaluation</p>
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
                  placeholder="Search contracts..."
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
                      {contractStatuses.map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contractor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contract.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contract.contractor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.contractValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(contract.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(contract.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contract.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      contract.status === 'Active' ? 'bg-green-100 text-green-700' :
                      contract.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                      contract.status === 'Terminated' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: contract.completionPerc }}></div>
                      </div>
                      <span className="text-xs text-gray-600">{contract.completionPerc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewContract(contract)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(contract)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteContract(contract.id)}
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

      {/* Add Contract Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Contract</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddContract} className="p-6 space-y-6">
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
                      Contract Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.contractType}
                      onChange={(e) => setFormData({...formData, contractType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {contractTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
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

              {/* Contractor Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contractor Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contractor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contractor}
                      onChange={(e) => setFormData({...formData, contractor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="ABC Builders Ltd."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Mr. Ramesh Kumar"
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
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="contact@abcbuilders.com"
                    />
                  </div>
                </div>
              </div>

              {/* Contract Terms */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contract Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contractValue}
                      onChange={(e) => setFormData({...formData, contractValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹42,00,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retention Money
                    </label>
                    <input
                      type="text"
                      value={formData.retention}
                      onChange={(e) => setFormData({...formData, retention: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="10% of contract value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Penalty Clause
                    </label>
                    <input
                      type="text"
                      value={formData.penalties}
                      onChange={(e) => setFormData({...formData, penalties: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0.5% per week of delay"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter contract description and scope of work..."
                />
              </div>

              {formData.startDate && formData.endDate && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Contract Duration:</span>
                    <span className="text-lg font-bold text-gray-900">{calculateDuration()}</span>
                  </div>
                </div>
              )}

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
                  Add Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Contract Modal */}
      {showViewModal && selectedContract && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Contract Details - {selectedContract.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedContract(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status & Progress */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedContract.status === 'Active' ? 'bg-green-100 text-green-700' :
                  selectedContract.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                  selectedContract.status === 'Terminated' ? 'bg-red-100 text-red-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {selectedContract.status}
                </span>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Completion</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedContract.completionPerc}</p>
                  </div>
                  <div className="w-24 h-24">
                    <svg viewBox="0 0 36 36" className="transform -rotate-90">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                        strokeDasharray={`${parseFloat(selectedContract.completionPerc)}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Contract Overview */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Contract Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contract ID</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedContract.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contract Type</label>
                    <p className="mt-1 text-gray-900">{selectedContract.contractType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project ID</label>
                    <p className="mt-1 text-gray-900">{selectedContract.projectId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project Name</label>
                    <p className="mt-1 text-gray-900">{selectedContract.projectName}</p>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <DollarSign size={18} className="mr-2 text-orange-500" />
                  Financial Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contract Value</label>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{selectedContract.contractValue}</p>
                  </div>
                  {selectedContract.retention && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Retention Money</label>
                      <p className="mt-1 text-gray-900">{selectedContract.retention}</p>
                    </div>
                  )}
                  {selectedContract.penalties && (
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-500">Penalty Clause</label>
                      <p className="mt-1 text-gray-900">{selectedContract.penalties}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contractor Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <User size={18} className="mr-2 text-orange-500" />
                  Contractor Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contractor Name</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedContract.contractor}</p>
                  </div>
                  {selectedContract.contactPerson && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Contact Person</label>
                      <p className="mt-1 text-gray-900">{selectedContract.contactPerson}</p>
                    </div>
                  )}
                  {selectedContract.contactEmail && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="mt-1 text-gray-900">{selectedContract.contactEmail}</p>
                    </div>
                  )}
                  {selectedContract.contactPhone && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="mt-1 text-gray-900">{selectedContract.contactPhone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Calendar size={18} className="mr-2 text-orange-500" />
                  Contract Timeline
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(selectedContract.startDate).toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">End Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(selectedContract.endDate).toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Duration</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedContract.duration}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Contract Progress</span>
                    <span className="font-medium text-gray-900">{selectedContract.completionPerc}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: selectedContract.completionPerc }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedContract.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Contract Description</label>
                  <p className="mt-2 text-gray-700">{selectedContract.description}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => { setShowViewModal(false); handleEditClick(selectedContract) }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Edit Contract
                </button>
                <button
                  onClick={() => { setShowViewModal(false); setSelectedContract(null) }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar to Add Modal with pre-filled data */}
      {showEditModal && ( 
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Contract</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedContract(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditContract} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
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
                      Contract Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.contractType}
                      onChange={(e) => setFormData({...formData, contractType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {contractTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contractor Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contractor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contractor}
                      onChange={(e) => setFormData({...formData, contractor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contract Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contractValue}
                      onChange={(e) => setFormData({...formData, contractValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Retention Money</label>
                    <input
                      type="text"
                      value={formData.retention}
                      onChange={(e) => setFormData({...formData, retention: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Penalty Clause</label>
                    <input
                      type="text"
                      value={formData.penalties}
                      onChange={(e) => setFormData({...formData, penalties: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contract Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedContract(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}