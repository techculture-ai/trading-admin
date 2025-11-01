'use client'

import { useState } from 'react'
import { Search, Plus, Filter, X, Calendar, User, CheckCircle, Clock, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'
import { DetailsSkeleton } from '@/components/SkeletonLoader'

interface Workflow {
  id: string
  parcelId: string
  owner: string
  stage: string
  status: 'In Progress' | 'Pending Approval' | 'Completed' | 'Overdue'
  startDate: string
  dueDate: string
  assignee: string
  description?: string
  documents?: string[]
  history?: Array<{
    stage: string
    date: string
    status: string
    notes: string
  }>
}

const initialWorkflows: Workflow[] = [
  {
    id: 'WF-001',
    parcelId: 'PAR-145',
    owner: 'Ram Kumar Singh',
    stage: 'Notice Issuance',
    status: 'In Progress',
    startDate: '15 Jan 2024',
    dueDate: '30 Jan 2024',
    assignee: 'Rajesh Sharma',
    description: 'Initial notice issued to landowner',
    documents: ['Notice Copy', 'Acknowledgement'],
    history: [
      { stage: 'Initiated', date: '15 Jan 2024', status: 'Completed', notes: 'Workflow started' },
      { stage: 'Notice Issuance', date: '16 Jan 2024', status: 'In Progress', notes: 'Notice sent to owner' }
    ]
  },
  {
    id: 'WF-002',
    parcelId: 'PAR-146',
    owner: 'Geeta Devi',
    stage: 'Compensation Determination',
    status: 'Pending Approval',
    startDate: '18 Jan 2024',
    dueDate: '05 Feb 2024',
    assignee: 'Priya Verma',
    description: 'Awaiting compensation approval',
    documents: ['Valuation Report', 'Compensation Proposal'],
    history: [
      { stage: 'Initiated', date: '18 Jan 2024', status: 'Completed', notes: 'Workflow started' },
      { stage: 'Valuation', date: '20 Jan 2024', status: 'Completed', notes: 'Land valued' },
      { stage: 'Compensation Determination', date: '22 Jan 2024', status: 'Pending', notes: 'Awaiting approval' }
    ]
  },
  {
    id: 'WF-003',
    parcelId: 'PAR-147',
    owner: 'Suresh Kumar',
    stage: 'Mutation',
    status: 'Completed',
    startDate: '10 Jan 2024',
    dueDate: '25 Jan 2024',
    assignee: 'Amit Singh',
    description: 'Mutation process completed successfully',
    documents: ['Mutation Certificate', 'Registry Copy'],
    history: [
      { stage: 'Initiated', date: '10 Jan 2024', status: 'Completed', notes: 'Workflow started' },
      { stage: 'Documentation', date: '12 Jan 2024', status: 'Completed', notes: 'Documents verified' },
      { stage: 'Mutation', date: '25 Jan 2024', status: 'Completed', notes: 'Mutation completed' }
    ]
  },
]

const workflowStages = [
  'Initiated',
  'Notice Issuance',
  'Objection Handling',
  'Valuation',
  'Compensation Determination',
  'Payment Processing',
  'Possession',
  'Mutation',
  'Completed'
]

export default function AcquisitionWorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    parcelId: '',
    owner: '',
    stage: 'Initiated',
    status: 'In Progress' as Workflow['status'],
    dueDate: '',
    assignee: '',
    description: '',
  })

  const handleAddWorkflow = (e: React.FormEvent) => {
    e.preventDefault()
    const newWorkflow: Workflow = {
      id: `WF-${String(workflows.length + 1).padStart(3, '0')}`,
      ...formData,
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      documents: [],
      history: [{
        stage: 'Initiated',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Completed',
        notes: 'Workflow started'
      }]
    }
    setWorkflows([...workflows, newWorkflow])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditWorkflow = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedWorkflow) return
    
    setWorkflows(workflows.map(w => 
      w.id === selectedWorkflow.id 
        ? { ...w, ...formData }
        : w
    ))
    setShowEditModal(false)
    setSelectedWorkflow(null)
    resetForm()
  }

  const handleDeleteWorkflow = (id: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter(w => w.id !== id))
    }
  }

  const handleViewWorkflow = (workflow: Workflow) => {
    router.push(`/land-acquisition/acquisition-workflows/${workflow.id}`)
  }

  const handleEditClick = (workflow: Workflow) => {
    setSelectedWorkflow(workflow)
    setFormData({
      parcelId: workflow.parcelId,
      owner: workflow.owner,
      stage: workflow.stage,
      status: workflow.status,
      dueDate: workflow.dueDate,
      assignee: workflow.assignee,
      description: workflow.description || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      parcelId: '',
      owner: '',
      stage: 'Initiated',
      status: 'In Progress',
      dueDate: '',
      assignee: '',
      description: '',
    })
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.parcelId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || workflow.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status: Workflow['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle size={20} className="text-green-600" />
      case 'In Progress':
        return <Clock size={20} className="text-blue-600" />
      case 'Pending Approval':
        return <AlertCircle size={20} className="text-orange-600" />
      case 'Overdue':
        return <AlertCircle size={20} className="text-red-600" />
    }
  }

  if (isLoading) {
      return <DetailsSkeleton />
    }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Acquisition Workflows</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage land acquisition process stages</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Start New Workflow</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Workflows</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {workflows.filter(w => w.status === 'In Progress').length}
          </h3>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Approval</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {workflows.filter(w => w.status === 'Pending Approval').length}
          </h3>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Completed</p>
          <h3 className="text-3xl font-bold text-green-600">
            {workflows.filter(w => w.status === 'Completed').length}
          </h3>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Overdue</p>
          <h3 className="text-3xl font-bold text-red-600">
            {workflows.filter(w => w.status === 'Overdue').length}
          </h3>
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
                  placeholder="Search workflows..."
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
                        onClick={() => { setFilterStatus('In Progress'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Pending Approval'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Pending Approval
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Completed'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Completed
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workflow ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parcel ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkflows.map((workflow) => (
                <tr key={workflow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workflow.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{workflow.parcelId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{workflow.stage}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(workflow.status)}
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        workflow.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        workflow.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        workflow.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{workflow.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{workflow.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{workflow.assignee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewWorkflow(workflow)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(workflow)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteWorkflow(workflow.id)}
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

      {/* Add Workflow Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Start New Workflow</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddWorkflow} className="p-6 space-y-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workflow Stage <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({...formData, stage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {workflowStages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.assignee}
                    onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Rajesh Sharma"
                  />
                </div>
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
                  placeholder="Enter workflow description..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
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
                  Start Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Workflow Modal */}
      {showViewModal && selectedWorkflow && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Workflow Details - {selectedWorkflow.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedWorkflow(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedWorkflow.status)}
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedWorkflow.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    selectedWorkflow.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    selectedWorkflow.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedWorkflow.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">Started on {selectedWorkflow.startDate}</span>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Parcel ID</label>
                  <p className="mt-1 text-gray-900 font-medium">{selectedWorkflow.parcelId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Owner</label>
                  <p className="mt-1 text-gray-900">{selectedWorkflow.owner}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Stage</label>
                  <p className="mt-1 text-gray-900 font-medium">{selectedWorkflow.stage}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Assignee</label>
                  <p className="mt-1 text-gray-900">{selectedWorkflow.assignee}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Due Date</label>
                  <p className="mt-1 text-gray-900">{selectedWorkflow.dueDate}</p>
                </div>
              </div>

              {/* Description */}
              {selectedWorkflow.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Description</label>
                  <p className="mt-2 text-gray-700">{selectedWorkflow.description}</p>
                </div>
              )}

              {/* Workflow History */}
              {selectedWorkflow.history && selectedWorkflow.history.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Workflow History</h3>
                  <div className="space-y-4">
                    {selectedWorkflow.history.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.status === 'Completed' ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {item.status === 'Completed' ? 
                              <CheckCircle size={16} className="text-green-600" /> : 
                              <Clock size={16} className="text-blue-600" />
                            }
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{item.stage}</h4>
                            <span className="text-xs text-gray-500">{item.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
                          <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                            item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => { setShowViewModal(false); handleEditClick(selectedWorkflow) }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Edit Workflow
                </button>
                <button
                  onClick={() => { setShowViewModal(false); setSelectedWorkflow(null) }}
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
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Workflow</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedWorkflow(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditWorkflow} className="p-6 space-y-4">
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workflow Stage <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({...formData, stage: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {workflowStages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.assignee}
                    onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
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
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedWorkflow(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}