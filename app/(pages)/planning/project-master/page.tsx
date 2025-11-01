'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Download, X, Eye, Edit, Trash2, Calendar, MapPin, User, DollarSign, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'
import { DetailsSkeleton } from '@/components/SkeletonLoader'

interface Project {
  id: string
  name: string
  type: 'Residential' | 'Commercial' | 'Infrastructure' | 'Mixed Use'
  location: string
  estimatedCost: string
  startDate: string
  endDate: string
  status: 'Active' | 'Planning' | 'Completed' | 'On Hold'
  completion: string
  projectManager: string
  description?: string
  area?: string
  units?: string
  contractor?: string
}

const initialProjects: Project[] = [
  {
    id: 'PROJ-2024-001',
    name: 'Gomti Nagar Housing Scheme',
    type: 'Residential',
    location: 'Gomti Nagar, Lucknow',
    estimatedCost: '₹45,00,00,000',
    startDate: '2024-02-01',
    endDate: '2025-12-31',
    status: 'Active',
    completion: '35%',
    projectManager: 'Rajesh Sharma',
    description: 'Development of 200 residential units',
    area: '25 acres',
    units: '200',
    contractor: 'ABC Construction Pvt Ltd'
  },
  {
    id: 'PROJ-2024-002',
    name: 'Hazratganj Commercial Complex',
    type: 'Commercial',
    location: 'Hazratganj, Lucknow',
    estimatedCost: '₹78,00,00,000',
    startDate: '2024-03-15',
    endDate: '2026-06-30',
    status: 'Planning',
    completion: '15%',
    projectManager: 'Priya Verma',
    description: 'Multi-story commercial complex',
    area: '15 acres',
    units: '150',
    contractor: 'XYZ Builders Ltd'
  },
  {
    id: 'PROJ-2024-003',
    name: 'Aliganj Residential Project',
    type: 'Residential',
    location: 'Aliganj, Lucknow',
    estimatedCost: '₹35,00,00,000',
    startDate: '2024-01-10',
    endDate: '2025-08-31',
    status: 'Active',
    completion: '52%',
    projectManager: 'Amit Singh',
    description: 'Affordable housing project',
    area: '18 acres',
    units: '180',
    contractor: 'PQR Infrastructure'
  },
]

const projectTypes = ['Residential', 'Commercial', 'Infrastructure', 'Mixed Use']
const projectStatuses = ['Active', 'Planning', 'Completed', 'On Hold']

export default function ProjectMasterPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    name: '',
    type: 'Residential' as Project['type'],
    location: '',
    estimatedCost: '',
    startDate: '',
    endDate: '',
    status: 'Planning' as Project['status'],
    projectManager: '',
    description: '',
    area: '',
    units: '',
    contractor: '',
  })

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: Project = {
      id: `PROJ-${new Date().getFullYear()}-${String(projects.length + 1).padStart(3, '0')}`,
      ...formData,
      completion: '0%',
    }
    setProjects([...projects, newProject])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) return
    
    setProjects(projects.map(p => 
      p.id === selectedProject.id 
        ? { ...p, ...formData }
        : p
    ))
    setShowEditModal(false)
    setSelectedProject(null)
    resetForm()
  }

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const handleViewProject = (project: Project) => {
    router.push(`/planning/project-master/${project.id}`)
  }

  const handleEditClick = (project: Project) => {
    setSelectedProject(project)
    setFormData({
      name: project.name,
      type: project.type,
      location: project.location,
      estimatedCost: project.estimatedCost,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
      projectManager: project.projectManager,
      description: project.description || '',
      area: project.area || '',
      units: project.units || '',
      contractor: project.contractor || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Residential',
      location: '',
      estimatedCost: '',
      startDate: '',
      endDate: '',
      status: 'Planning',
      projectManager: '',
      description: '',
      area: '',
      units: '',
      contractor: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Project ID', 'Name', 'Type', 'Location', 'Est. Cost', 'Start Date', 'End Date', 'Status', 'Completion', 'PM'].join(','),
      ...filteredProjects.map(p => 
        [p.id, p.name, p.type, p.location, p.estimatedCost, p.startDate, p.endDate, p.status, p.completion, p.projectManager].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'projects-report.csv'
    a.click()
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Master</h1>
          <p className="text-sm text-gray-600 mt-1">Manage all projects and track their progress</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Projects</p>
          <h3 className="text-3xl font-bold text-gray-900">{projects.length}</h3>
          <p className="text-xs text-green-600 mt-2">+5 this month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Projects</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {projects.filter(p => p.status === 'Active').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">In execution</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Planning Phase</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {projects.filter(p => p.status === 'Planning').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Completed</p>
          <h3 className="text-3xl font-bold text-green-600">
            {projects.filter(p => p.status === 'Completed').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
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
                  placeholder="Search projects..."
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
                      {projectStatuses.map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Est. Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timeline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PM</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.estimatedCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{new Date(project.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    <div className="text-xs text-gray-500">{new Date(project.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === 'Active' ? 'bg-green-100 text-green-700' :
                      project.status === 'Planning' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'Completed' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: project.completion }}></div>
                      </div>
                      <span className="text-xs text-gray-600">{project.completion}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.projectManager}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewProject(project)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(project)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
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

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddProject} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Gomti Nagar Housing Scheme"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
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
                      {projectStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Gomti Nagar, Lucknow"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Area
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="25 acres"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Units
                    </label>
                    <input
                      type="text"
                      value={formData.units}
                      onChange={(e) => setFormData({...formData, units: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.estimatedCost}
                      onChange={(e) => setFormData({...formData, estimatedCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹45,00,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contractor
                    </label>
                    <input
                      type="text"
                      value={formData.contractor}
                      onChange={(e) => setFormData({...formData, contractor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="ABC Construction Pvt Ltd"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline & Management */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline & Management</h3>
                <div className="grid grid-cols-2 gap-4">
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
                      Project Manager <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectManager}
                      onChange={(e) => setFormData({...formData, projectManager: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Rajesh Sharma"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter project description..."
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar to Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Project</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedProject(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditProject} className="p-6 space-y-6">
              {/* Same form fields as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
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
                      {projectStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Area</label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Units</label>
                    <input
                      type="text"
                      value={formData.units}
                      onChange={(e) => setFormData({...formData, units: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Cost <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.estimatedCost}
                      onChange={(e) => setFormData({...formData, estimatedCost: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contractor</label>
                    <input
                      type="text"
                      value={formData.contractor}
                      onChange={(e) => setFormData({...formData, contractor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline & Management</h3>
                <div className="grid grid-cols-2 gap-4">
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
                      Project Manager <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectManager}
                      onChange={(e) => setFormData({...formData, projectManager: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
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
                  onClick={() => { setShowEditModal(false); setSelectedProject(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {showViewModal && selectedProject && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Project Details - {selectedProject.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedProject(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                  selectedProject.status === 'Active' ? 'bg-green-100 text-green-700' :
                  selectedProject.status === 'Planning' ? 'bg-blue-100 text-blue-700' :
                  selectedProject.status === 'Completed' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {selectedProject.status}
                </span>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Completion</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedProject.completion}</p>
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
                        strokeDasharray={`${parseFloat(selectedProject.completion)}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Project Overview */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Project Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project Name</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedProject.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project Type</label>
                    <p className="mt-1 text-gray-900">{selectedProject.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      Location
                    </label>
                    <p className="mt-1 text-gray-900">{selectedProject.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center">
                      <User size={14} className="mr-1" />
                      Project Manager
                    </label>
                    <p className="mt-1 text-gray-900">{selectedProject.projectManager}</p>
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
                    <label className="text-sm font-medium text-gray-500">Estimated Cost</label>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{selectedProject.estimatedCost}</p>
                  </div>
                  {selectedProject.contractor && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Contractor</label>
                      <p className="mt-1 text-gray-900">{selectedProject.contractor}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Specifications */}
              {(selectedProject.area || selectedProject.units) && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900">Project Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.area && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Total Area</label>
                        <p className="mt-1 text-gray-900">{selectedProject.area}</p>
                      </div>
                    )}
                    {selectedProject.units && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Number of Units</label>
                        <p className="mt-1 text-gray-900">{selectedProject.units}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Calendar size={18} className="mr-2 text-orange-500" />
                  Project Timeline
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(selectedProject.startDate).toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">End Date</label>
                    <p className="mt-1 text-gray-900">
                      {new Date(selectedProject.endDate).toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Project Progress</span>
                    <span className="font-medium text-gray-900">{selectedProject.completion}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: selectedProject.completion }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedProject.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Project Description</label>
                  <p className="mt-2 text-gray-700">{selectedProject.description}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => { setShowViewModal(false); handleEditClick(selectedProject) }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => { setShowViewModal(false); setSelectedProject(null) }}
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