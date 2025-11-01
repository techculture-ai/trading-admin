'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Calculator, X, Eye, Edit, Trash2, CheckCircle, Clock, TrendingUp, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'
import { DetailsSkeleton } from '@/components/SkeletonLoader'

interface Estimate {
  id: string
  projectId: string
  projectName: string
  materialCost: string
  labourCost: string
  equipmentCost: string
  overheads: string
  contingency?: string
  totalCost: string
  status: 'Approved' | 'Under Review' | 'Pending' | 'Rejected'
  estimatedBy: string
  date: string
  description?: string
  validity?: string
}

const initialEstimates: Estimate[] = [
  {
    id: 'EST-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    materialCost: '₹25,00,00,000',
    labourCost: '₹12,00,00,000',
    equipmentCost: '₹5,00,00,000',
    overheads: '₹3,00,00,000',
    contingency: '₹2,00,00,000',
    totalCost: '₹47,00,00,000',
    status: 'Approved',
    estimatedBy: 'Rajesh Sharma',
    date: '2024-01-10',
    description: 'Complete cost estimation for housing project',
    validity: '2024-06-30'
  },
  {
    id: 'EST-2024-002',
    projectId: 'PROJ-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    materialCost: '₹45,00,00,000',
    labourCost: '₹20,00,00,000',
    equipmentCost: '₹8,00,00,000',
    overheads: '₹5,00,00,000',
    contingency: '₹3,00,00,000',
    totalCost: '₹81,00,00,000',
    status: 'Under Review',
    estimatedBy: 'Priya Verma',
    date: '2024-01-18',
    description: 'Commercial complex resource estimation',
    validity: '2024-07-15'
  },
]

export default function ResourceEstimationPage() {
  const [estimates, setEstimates] = useState<Estimate[]>(initialEstimates)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()  
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    materialCost: '',
    labourCost: '',
    equipmentCost: '',
    overheads: '',
    contingency: '',
    estimatedBy: '',
    description: '',
    validity: '',
  })

  const calculateTotalCost = () => {
    const material = parseFloat(formData.materialCost.replace(/[^0-9]/g, '')) || 0
    const labour = parseFloat(formData.labourCost.replace(/[^0-9]/g, '')) || 0
    const equipment = parseFloat(formData.equipmentCost.replace(/[^0-9]/g, '')) || 0
    const overhead = parseFloat(formData.overheads.replace(/[^0-9]/g, '')) || 0
    const contingencyAmt = parseFloat(formData.contingency.replace(/[^0-9]/g, '')) || 0
    return material + labour + equipment + overhead + contingencyAmt
  }

  const handleAddEstimate = (e: React.FormEvent) => {
    e.preventDefault()
    const total = calculateTotalCost()
    const newEstimate: Estimate = {
      id: `EST-${new Date().getFullYear()}-${String(estimates.length + 1).padStart(3, '0')}`,
      ...formData,
      totalCost: `₹${total.toLocaleString('en-IN')}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    }
    setEstimates([...estimates, newEstimate])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditEstimate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEstimate) return
    
    const total = calculateTotalCost()
    setEstimates(estimates.map(est => 
      est.id === selectedEstimate.id 
        ? { ...est, ...formData, totalCost: `₹${total.toLocaleString('en-IN')}` }
        : est
    ))
    setShowEditModal(false)
    setSelectedEstimate(null)
    resetForm()
  }

  const handleDeleteEstimate = (id: string) => {
    if (confirm('Are you sure you want to delete this estimate?')) {
      setEstimates(estimates.filter(est => est.id !== id))
    }
  }

  const handleApproveEstimate = (id: string) => {
    setEstimates(estimates.map(est => 
      est.id === id ? { ...est, status: 'Approved' as const } : est
    ))
  }

  const handleViewEstimate = (estimate: Estimate) => {
    router.push(`/planning/resource-estimation/${estimate.id}`)
  }

  const handleEditClick = (estimate: Estimate) => {
    setSelectedEstimate(estimate)
    setFormData({
      projectId: estimate.projectId,
      projectName: estimate.projectName,
      materialCost: estimate.materialCost,
      labourCost: estimate.labourCost,
      equipmentCost: estimate.equipmentCost,
      overheads: estimate.overheads,
      contingency: estimate.contingency || '',
      estimatedBy: estimate.estimatedBy,
      description: estimate.description || '',
      validity: estimate.validity || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      projectId: '',
      projectName: '',
      materialCost: '',
      labourCost: '',
      equipmentCost: '',
      overheads: '',
      contingency: '',
      estimatedBy: '',
      description: '',
      validity: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Estimate ID', 'Project', 'Material', 'Labour', 'Equipment', 'Overheads', 'Total', 'Status'].join(','),
      ...filteredEstimates.map(e => 
        [e.id, e.projectName, e.materialCost, e.labourCost, e.equipmentCost, e.overheads, e.totalCost, e.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resource-estimates.csv'
    a.click()
  }

  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = estimate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estimate.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estimate.estimatedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || estimate.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalEstimatedCost = estimates.reduce((sum, e) => 
    sum + (parseFloat(e.totalCost.replace(/[^0-9]/g, '')) || 0), 0
  )

  const avgMaterialPercentage = estimates.reduce((sum, e) => {
    const total = parseFloat(e.totalCost.replace(/[^0-9]/g, '')) || 1
    const material = parseFloat(e.materialCost.replace(/[^0-9]/g, '')) || 0
    return sum + (material / total * 100)
  }, 0) / estimates.length || 0

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Estimation</h1>
          <p className="text-sm text-gray-600 mt-1">Manage cost and resource estimates for projects</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Create Estimate</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Estimates</p>
          <h3 className="text-3xl font-bold text-gray-900">{estimates.length}</h3>
          <p className="text-xs text-gray-500 mt-2">All projects</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Estimated Cost</p>
          <h3 className="text-2xl font-bold text-gray-900">₹{(totalEstimatedCost / 10000000).toFixed(1)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Approved budgets</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Approval</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {estimates.filter(e => e.status === 'Pending' || e.status === 'Under Review').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Awaiting review</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Variance</p>
          <h3 className="text-3xl font-bold text-green-600">±5%</h3>
          <p className="text-xs text-gray-500 mt-2">Estimate vs Actual</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Average Cost Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Calculator size={32} className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Material Cost</p>
              <p className="text-xl font-bold text-gray-900">{avgMaterialPercentage.toFixed(0)}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <Calculator size={32} className="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Labour Cost</p>
              <p className="text-xl font-bold text-gray-900">27%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
            <Calculator size={32} className="text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Equipment Cost</p>
              <p className="text-xl font-bold text-gray-900">11%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <Calculator size={32} className="text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Overheads</p>
              <p className="text-xl font-bold text-gray-900">7%</p>
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
                  placeholder="Search estimates..."
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
                      {['Approved', 'Under Review', 'Pending', 'Rejected'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estimate ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Labour Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipment Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overheads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEstimates.map((estimate) => (
                <tr key={estimate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{estimate.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estimate.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{estimate.materialCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{estimate.labourCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{estimate.equipmentCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{estimate.overheads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{estimate.totalCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      estimate.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                      estimate.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                      estimate.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {estimate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewEstimate(estimate)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View BOQ"
                      >
                        <Eye size={16} />
                      </button>
                      {estimate.status !== 'Approved' && (
                        <>
                          <button 
                            onClick={() => handleApproveEstimate(estimate.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            onClick={() => handleEditClick(estimate)}
                            className="text-orange-600 hover:text-orange-700"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleDeleteEstimate(estimate.id)}
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

      {/* Add Estimate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Create New Estimate</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddEstimate} className="p-6 space-y-6">
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
                      Estimated By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.estimatedBy}
                      onChange={(e) => setFormData({...formData, estimatedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Rajesh Sharma"
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
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter estimate description..."
                    />
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.materialCost}
                      onChange={(e) => setFormData({...formData, materialCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹25,00,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Labour Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.labourCost}
                      onChange={(e) => setFormData({...formData, labourCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹12,00,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.equipmentCost}
                      onChange={(e) => setFormData({...formData, equipmentCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹5,00,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overheads <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.overheads}
                      onChange={(e) => setFormData({...formData, overheads: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹3,00,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contingency (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.contingency}
                      onChange={(e) => setFormData({...formData, contingency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹2,00,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valid Until
                    </label>
                    <input
                      type="date"
                      value={formData.validity}
                      onChange={(e) => setFormData({...formData, validity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Estimated Cost:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{calculateTotalCost().toLocaleString('en-IN')}
                    </span>
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
                  Create Estimate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Estimate Modal */}
      {showViewModal && selectedEstimate && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Bill of Quantities - {selectedEstimate.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedEstimate(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedEstimate.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                  selectedEstimate.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                  selectedEstimate.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {selectedEstimate.status}
                </span>
                <span className="text-sm text-gray-500">
                  Estimated on {new Date(selectedEstimate.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* Project Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project ID</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedEstimate.projectId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project Name</label>
                    <p className="mt-1 text-gray-900">{selectedEstimate.projectName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Estimated By</label>
                    <p className="mt-1 text-gray-900">{selectedEstimate.estimatedBy}</p>
                  </div>
                  {selectedEstimate.validity && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Valid Until</label>
                      <p className="mt-1 text-gray-900">
                        {new Date(selectedEstimate.validity).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Calculator size={18} className="mr-2 text-orange-500" />
                  Cost Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm text-gray-600">Material Cost:</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedEstimate.materialCost}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm text-gray-600">Labour Cost:</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedEstimate.labourCost}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded"></div>
                      <span className="text-sm text-gray-600">Equipment Cost:</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedEstimate.equipmentCost}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span className="text-sm text-gray-600">Overheads:</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{selectedEstimate.overheads}</span>
                  </div>
                  {selectedEstimate.contingency && (
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <span className="text-sm text-gray-600">Contingency:</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{selectedEstimate.contingency}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-semibold text-gray-900">Total Estimated Cost:</span>
                    <span className="text-2xl font-bold text-gray-900">{selectedEstimate.totalCost}</span>
                  </div>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Cost Distribution</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Material', value: selectedEstimate.materialCost, color: 'bg-blue-500' },
                    { label: 'Labour', value: selectedEstimate.labourCost, color: 'bg-green-500' },
                    { label: 'Equipment', value: selectedEstimate.equipmentCost, color: 'bg-orange-500' },
                    { label: 'Overheads', value: selectedEstimate.overheads, color: 'bg-purple-500' },
                  ].map((item, index) => {
                    const total = parseFloat(selectedEstimate.totalCost.replace(/[^0-9]/g, '')) || 1
                    const amount = parseFloat(item.value.replace(/[^0-9]/g, '')) || 0
                    const percentage = (amount / total * 100).toFixed(1)
                    
                    return (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-medium text-gray-900">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Description */}
              {selectedEstimate.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Description</label>
                  <p className="mt-2 text-gray-700">{selectedEstimate.description}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {selectedEstimate.status !== 'Approved' && (
                  <button
                    onClick={() => { handleApproveEstimate(selectedEstimate.id); setShowViewModal(false) }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Approve Estimate
                  </button>
                )}
                <button
                  onClick={() => { setShowViewModal(false); setSelectedEstimate(null) }}
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
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Estimate</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedEstimate(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditEstimate} className="p-6 space-y-6">
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
                      Estimated By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.estimatedBy}
                      onChange={(e) => setFormData({...formData, estimatedBy: e.target.value})}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.materialCost}
                      onChange={(e) => setFormData({...formData, materialCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Labour Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.labourCost}
                      onChange={(e) => setFormData({...formData, labourCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.equipmentCost}
                      onChange={(e) => setFormData({...formData, equipmentCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overheads <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.overheads}
                      onChange={(e) => setFormData({...formData, overheads: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contingency</label>
                    <input
                      type="text"
                      value={formData.contingency}
                      onChange={(e) => setFormData({...formData, contingency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
                    <input
                      type="date"
                      value={formData.validity}
                      onChange={(e) => setFormData({...formData, validity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Estimated Cost:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{calculateTotalCost().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedEstimate(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Estimate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}