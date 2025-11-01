'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Download, TrendingUp, X, Eye, Edit, Trash2, FileText, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'
import { DetailsSkeleton } from '@/components/SkeletonLoader'

interface Budget {
  id: string
  budgetHead: string
  department: string
  allocatedBudget: number
  utilizedBudget: number
  availableBudget: number
  utilizationPerc: number
  status: string
  financialYear: string
  approvedBy: string
  approvalDate: string
  description: string
  remarks: string
}

const initialBudgets: Budget[] = [
  {
    id: 'BUD-2024-001',
    budgetHead: 'Construction - Capital',
    department: 'Engineering',
    allocatedBudget: 500000000,
    utilizedBudget: 310000000,
    availableBudget: 190000000,
    utilizationPerc: 62,
    status: 'Active',
    financialYear: 'FY 2024-25',
    approvedBy: 'Finance Minister',
    approvalDate: '2024-04-01',
    description: 'Capital budget for construction projects',
    remarks: 'Quarterly review scheduled',
  },
  {
    id: 'BUD-2024-002',
    budgetHead: 'Land Acquisition',
    department: 'Land',
    allocatedBudget: 300000000,
    utilizedBudget: 185000000,
    availableBudget: 115000000,
    utilizationPerc: 62,
    status: 'Active',
    financialYear: 'FY 2024-25',
    approvedBy: 'Finance Minister',
    approvalDate: '2024-04-01',
    description: 'Budget for land acquisition and compensation',
    remarks: 'On track',
  },
  {
    id: 'BUD-2024-003',
    budgetHead: 'Administrative Expenses',
    department: 'Admin',
    allocatedBudget: 80000000,
    utilizedBudget: 36000000,
    availableBudget: 44000000,
    utilizationPerc: 45,
    status: 'Active',
    financialYear: 'FY 2024-25',
    approvedBy: 'Finance Minister',
    approvalDate: '2024-04-01',
    description: 'Administrative and operational expenses',
    remarks: 'Under budget',
  },
]

export default function BudgetManagementPage() {
  const router = useRouter()
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const isLoading = usePageLoading(800) // Minimum 800ms




  const [formData, setFormData] = useState({
    budgetHead: '',
    department: '',
    allocatedBudget: '',
    utilizedBudget: '',
    financialYear: 'FY 2024-25',
    approvedBy: '',
    approvalDate: '',
    description: '',
    remarks: '',
    status: 'Active',
  })

  const resetForm = () => {
    setFormData({
      budgetHead: '',
      department: '',
      allocatedBudget: '',
      utilizedBudget: '',
      financialYear: 'FY 2024-25',
      approvedBy: '',
      approvalDate: '',
      description: '',
      remarks: '',
      status: 'Active',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateBudgetMetrics = (allocated: number, utilized: number) => {
    const available = allocated - utilized
    const utilizationPerc = allocated > 0 ? Math.round((utilized / allocated) * 100) : 0
    return { available, utilizationPerc }
  }

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault()
    const allocated = parseFloat(formData.allocatedBudget) || 0
    const utilized = parseFloat(formData.utilizedBudget) || 0
    const { available, utilizationPerc } = calculateBudgetMetrics(allocated, utilized)

    const newBudget: Budget = {
      id: `BUD-2024-${String(budgets.length + 1).padStart(3, '0')}`,
      budgetHead: formData.budgetHead,
      department: formData.department,
      allocatedBudget: allocated,
      utilizedBudget: utilized,
      availableBudget: available,
      utilizationPerc,
      status: formData.status,
      financialYear: formData.financialYear,
      approvedBy: formData.approvedBy,
      approvalDate: formData.approvalDate,
      description: formData.description,
      remarks: formData.remarks,
    }

    setBudgets([...budgets, newBudget])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditBudget = (budget: Budget) => {
    setSelectedBudget(budget)
    setFormData({
      budgetHead: budget.budgetHead,
      department: budget.department,
      allocatedBudget: budget.allocatedBudget.toString(),
      utilizedBudget: budget.utilizedBudget.toString(),
      financialYear: budget.financialYear,
      approvedBy: budget.approvedBy,
      approvalDate: budget.approvalDate,
      description: budget.description,
      remarks: budget.remarks,
      status: budget.status,
    })
    setShowEditModal(true)
  }

  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBudget) return

    const allocated = parseFloat(formData.allocatedBudget) || 0
    const utilized = parseFloat(formData.utilizedBudget) || 0
    const { available, utilizationPerc } = calculateBudgetMetrics(allocated, utilized)

    const updatedBudgets = budgets.map(budget =>
      budget.id === selectedBudget.id
        ? {
            ...budget,
            budgetHead: formData.budgetHead,
            department: formData.department,
            allocatedBudget: allocated,
            utilizedBudget: utilized,
            availableBudget: available,
            utilizationPerc,
            status: formData.status,
            financialYear: formData.financialYear,
            approvedBy: formData.approvedBy,
            approvalDate: formData.approvalDate,
            description: formData.description,
            remarks: formData.remarks,
          }
        : budget
    )

    setBudgets(updatedBudgets)
    setShowEditModal(false)
    resetForm()
    setSelectedBudget(null)
  }

  const handleDeleteBudget = (budgetId: string) => {
    if (confirm('Are you sure you want to delete this budget head?')) {
      setBudgets(budgets.filter(budget => budget.id !== budgetId))
    }
  }

  const handleViewDetails = (budget: Budget) => {
    // Navigate to details page
    router.push(`/accounts/budgeting/${budget.id}`)
  }

  const handleViewModal = (budget: Budget) => {
    setSelectedBudget(budget)
    // setShowViewModal(true)
    router.push(`/accounts/budgeting/${budget.id}`)
  }

  const handleExport = () => {
    const csvContent = [
      ['Budget ID', 'Budget Head', 'Department', 'Allocated', 'Utilized', 'Available', 'Utilization %', 'Status'],
      ...filteredBudgets.map(budget => [
        budget.id,
        budget.budgetHead,
        budget.department,
        budget.allocatedBudget,
        budget.utilizedBudget,
        budget.availableBudget,
        budget.utilizationPerc + '%',
        budget.status,
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `budget_report_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredBudgets = budgets.filter(budget => {
    const matchesSearch = 
      budget.budgetHead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || budget.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocatedBudget, 0)
  const totalUtilized = budgets.reduce((sum, b) => sum + b.utilizedBudget, 0)
  const totalAvailable = budgets.reduce((sum, b) => sum + b.availableBudget, 0)
  const overallUtilization = totalAllocated > 0 ? Math.round((totalUtilized / totalAllocated) * 100) : 0


  if (isLoading) {
  return <DetailsSkeleton /> // or <TableSkeleton /> or <PageLoader />
}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage annual budgets and allocations</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus size={20} />
            <span>Add Budget Head</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Budget (FY 24-25)</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {formatCurrency(totalAllocated)}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Annual allocation</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Utilized</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {formatCurrency(totalUtilized)}
          </h3>
          <p className="text-xs text-gray-500 mt-2">{overallUtilization}% utilized</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Available</p>
          <h3 className="text-3xl font-bold text-green-600">
            {formatCurrency(totalAvailable)}
          </h3>
          <p className="text-xs text-gray-500 mt-2">{100 - overallUtilization}% remaining</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Budget Heads</p>
          <h3 className="text-3xl font-bold text-orange-600">{budgets.length}</h3>
          <p className="text-xs text-gray-500 mt-2">Active heads</p>
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
                  placeholder="Search budget heads..."
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
                        onClick={() => { setFilterStatus('Active'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Active' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Inactive'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Inactive' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Inactive
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Closed'); setShowFilterMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-50 ${filterStatus === 'Closed' ? 'bg-orange-50 text-orange-600' : ''}`}
                      >
                        Closed
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget Head</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allocated Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilized Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilization %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBudgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{budget.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{budget.budgetHead}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{budget.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(budget.allocatedBudget)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {formatCurrency(budget.utilizedBudget)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    {formatCurrency(budget.availableBudget)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className={`h-2 rounded-full ${
                            budget.utilizationPerc > 90 ? 'bg-red-500' :
                            budget.utilizationPerc > 75 ? 'bg-orange-500' :
                            'bg-blue-500'
                          }`}
                          style={{ width: `${budget.utilizationPerc}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-600 w-10">{budget.utilizationPerc}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      budget.status === 'Active' ? 'bg-green-100 text-green-700' :
                      budget.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {budget.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewModal(budget)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Quick View"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditBudget(budget)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleViewDetails(budget)}
                        className="text-purple-600 hover:text-purple-700"
                        title="View Details"
                      >
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Budget Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Budget Head</h2>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddBudget} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget Head</label>
                  <input
                    type="text"
                    name="budgetHead"
                    value={formData.budgetHead}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Construction - Capital"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Department</option>
                    <option>Engineering</option>
                    <option>Land</option>
                    <option>Admin</option>
                    <option>Finance</option>
                    <option>Planning</option>
                    <option>HR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year</label>
                  <select
                    name="financialYear"
                    value={formData.financialYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>FY 2024-25</option>
                    <option>FY 2025-26</option>
                    <option>FY 2026-27</option>
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
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allocated Budget (₹)</label>
                  <input
                    type="number"
                    name="allocatedBudget"
                    value={formData.allocatedBudget}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Utilized Budget (₹)</label>
                  <input
                    type="number"
                    name="utilizedBudget"
                    value={formData.utilizedBudget}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                  <input
                    type="text"
                    name="approvedBy"
                    value={formData.approvedBy}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Authority name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approval Date</label>
                  <input
                    type="date"
                    name="approvalDate"
                    value={formData.approvalDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Budget head description..."
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
                  Add Budget Head
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Budget Modal */}
      {showEditModal && selectedBudget && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Budget Head - {selectedBudget.id}</h2>
              <button onClick={() => { setShowEditModal(false); resetForm(); setSelectedBudget(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateBudget} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget Head</label>
                  <input
                    type="text"
                    name="budgetHead"
                    value={formData.budgetHead}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Department</option>
                    <option>Engineering</option>
                    <option>Land</option>
                    <option>Admin</option>
                    <option>Finance</option>
                    <option>Planning</option>
                    <option>HR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year</label>
                  <select
                    name="financialYear"
                    value={formData.financialYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>FY 2024-25</option>
                    <option>FY 2025-26</option>
                    <option>FY 2026-27</option>
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
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allocated Budget (₹)</label>
                  <input
                    type="number"
                    name="allocatedBudget"
                    value={formData.allocatedBudget}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Utilized Budget (₹)</label>
                  <input
                    type="number"
                    name="utilizedBudget"
                    value={formData.utilizedBudget}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                  <input
                    type="text"
                    name="approvedBy"
                    value={formData.approvedBy}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approval Date</label>
                  <input
                    type="date"
                    name="approvalDate"
                    value={formData.approvalDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
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
                  onClick={() => { setShowEditModal(false); resetForm(); setSelectedBudget(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Budget Head
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showViewModal && selectedBudget && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Budget Details - {selectedBudget.id}</h2>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-between items-start">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedBudget.status === 'Active' ? 'bg-green-100 text-green-700' :
                  selectedBudget.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedBudget.status}
                </span>
                <button 
                  onClick={() => handleViewDetails(selectedBudget)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <FileText size={16} />
                  <span>View Full Details</span>
                </button>
              </div>

              {/* Budget Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Budget Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Budget ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBudget.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Budget Head</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBudget.budgetHead}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBudget.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Financial Year</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBudget.financialYear}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Approval Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Approved By</p>
                      <p className="text-sm font-medium text-gray-900">{selectedBudget.approvedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Approval Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedBudget.approvalDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Financial Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Allocated Budget</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(selectedBudget.allocatedBudget)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Utilized Budget</span>
                    <span className="text-sm font-medium text-blue-600">
                      {formatCurrency(selectedBudget.utilizedBudget)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Available Budget</span>
                    <span className="text-sm font-medium text-green-600">
                      {formatCurrency(selectedBudget.availableBudget)}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-semibold text-gray-900">Utilization</span>
                      <span className="text-lg font-bold text-blue-600">{selectedBudget.utilizationPerc}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          selectedBudget.utilizationPerc > 90 ? 'bg-red-500' :
                          selectedBudget.utilizationPerc > 75 ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`}
                        style={{ width: `${selectedBudget.utilizationPerc}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedBudget.description}
                </p>
              </div>

              {/* Remarks */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Remarks</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  {selectedBudget.remarks}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}