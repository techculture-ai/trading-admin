'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Camera, MapPin, X, Eye, Edit, Trash2, Upload, Download, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/usePageLoading'
import { DetailsSkeleton } from '@/components/SkeletonLoader'

interface SiteProgress {
  id: string
  projectId: string
  projectName: string
  location: string
  plannedProgress: string
  actualProgress: string
  variance: string
  lastUpdated: string
  supervisor: string
  status: 'On Track' | 'Ahead of Schedule' | 'Behind Schedule' | 'Critical'
  photos: number
  workforce?: number
  equipment?: string
  remarks?: string
  issues?: string[]
}

const initialSiteProgress: SiteProgress[] = [
  {
    id: 'SP-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    location: 'Gomti Nagar, Lucknow',
    plannedProgress: '70%',
    actualProgress: '65%',
    variance: '-5%',
    lastUpdated: '2 hours ago',
    supervisor: 'Rajesh Sharma',
    status: 'On Track',
    photos: 12,
    workforce: 45,
    equipment: '2 Cranes, 3 Mixers, 1 Excavator',
    remarks: 'Minor delay due to material shortage',
    issues: ['Cement delivery delayed by 2 days']
  },
  {
    id: 'SP-2024-002',
    projectId: 'PROJ-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    location: 'Hazratganj, Lucknow',
    plannedProgress: '50%',
    actualProgress: '42%',
    variance: '-8%',
    lastUpdated: '1 day ago',
    supervisor: 'Priya Verma',
    status: 'Behind Schedule',
    photos: 8,
    workforce: 38,
    equipment: '1 Crane, 2 Mixers',
    remarks: 'Weather impact on construction',
    issues: ['Heavy rain for 3 days', 'Labor shortage']
  },
  {
    id: 'SP-2024-003',
    projectId: 'PROJ-2024-003',
    projectName: 'Aliganj Residential Project',
    location: 'Aliganj, Lucknow',
    plannedProgress: '75%',
    actualProgress: '78%',
    variance: '+3%',
    lastUpdated: '4 hours ago',
    supervisor: 'Amit Singh',
    status: 'Ahead of Schedule',
    photos: 15,
    workforce: 52,
    equipment: '3 Cranes, 4 Mixers, 2 Excavators',
    remarks: 'Excellent progress, on schedule',
    issues: []
  },
]

export default function SiteProgressPage() {
  const [siteProgress, setSiteProgress] = useState<SiteProgress[]>(initialSiteProgress)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [selectedSite, setSelectedSite] = useState<SiteProgress | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    location: '',
    plannedProgress: '',
    actualProgress: '',
    supervisor: '',
    workforce: '',
    equipment: '',
    remarks: '',
  })

  const calculateVariance = () => {
    const planned = parseFloat(formData.plannedProgress) || 0
    const actual = parseFloat(formData.actualProgress) || 0
    const variance = actual - planned
    return variance >= 0 ? `+${variance}%` : `${variance}%`
  }

  const determineStatus = (): SiteProgress['status'] => {
    const variance = parseFloat(calculateVariance())
    if (variance >= 5) return 'Ahead of Schedule'
    if (variance <= -10) return 'Critical'
    if (variance < 0) return 'Behind Schedule'
    return 'On Track'
  }

  const handleAddSiteEntry = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: SiteProgress = {
      id: `SP-${new Date().getFullYear()}-${String(siteProgress.length + 1).padStart(3, '0')}`,
      ...formData,
      plannedProgress: `${formData.plannedProgress}%`,
      actualProgress: `${formData.actualProgress}%`,
      variance: calculateVariance(),
      lastUpdated: 'Just now',
      status: determineStatus(),
      photos: 0,
      workforce: parseInt(formData.workforce) || 0,
      issues: []
    }
    setSiteProgress([...siteProgress, newEntry])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditSiteEntry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSite) return
    
    setSiteProgress(siteProgress.map(s => 
      s.id === selectedSite.id 
        ? { 
            ...s, 
            ...formData,
            plannedProgress: `${formData.plannedProgress}%`,
            actualProgress: `${formData.actualProgress}%`,
            variance: calculateVariance(),
            status: determineStatus(),
            workforce: parseInt(formData.workforce) || 0,
            lastUpdated: 'Just now'
          }
        : s
    ))
    setShowEditModal(false)
    setSelectedSite(null)
    resetForm()
  }

  const handleDeleteSiteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this site entry?')) {
      setSiteProgress(siteProgress.filter(s => s.id !== id))
    }
  }

  const handleViewSite = (site: SiteProgress) => {
    router.push(`/construction/site-progress/${site.id}`)
  }

  const handleEditClick = (site: SiteProgress) => {
    setSelectedSite(site)
    setFormData({
      projectId: site.projectId,
      projectName: site.projectName,
      location: site.location,
      plannedProgress: site.plannedProgress.replace('%', ''),
      actualProgress: site.actualProgress.replace('%', ''),
      supervisor: site.supervisor,
      workforce: site.workforce?.toString() || '',
      equipment: site.equipment || '',
      remarks: site.remarks || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      projectId: '',
      projectName: '',
      location: '',
      plannedProgress: '',
      actualProgress: '',
      supervisor: '',
      workforce: '',
      equipment: '',
      remarks: '',
    })
  }

  const filteredSiteProgress = siteProgress.filter(site => {
    const matchesSearch = site.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || site.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusIcon = (status: SiteProgress['status']) => {
    switch (status) {
      case 'On Track':
        return <CheckCircle size={20} className="text-green-600" />
      case 'Ahead of Schedule':
        return <TrendingUp size={20} className="text-blue-600" />
      case 'Behind Schedule':
        return <AlertTriangle size={20} className="text-orange-600" />
      case 'Critical':
        return <AlertTriangle size={20} className="text-red-600" />
    }
  }

  const avgProgress = siteProgress.reduce((sum, s) => 
    sum + parseFloat(s.actualProgress), 0
  ) / siteProgress.length || 0

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Progress Monitoring</h1>
          <p className="text-sm text-gray-600 mt-1">Track daily site progress and work completion</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Site Entry</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Sites</p>
          <h3 className="text-3xl font-bold text-gray-900">{siteProgress.length}</h3>
          <p className="text-xs text-gray-500 mt-2">Ongoing construction</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Progress</p>
          <h3 className="text-3xl font-bold text-green-600">{avgProgress.toFixed(0)}%</h3>
          <p className="text-xs text-green-600 mt-2">+5% this month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">On Schedule</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {siteProgress.filter(s => s.status === 'On Track' || s.status === 'Ahead of Schedule').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">
            {((siteProgress.filter(s => s.status === 'On Track' || s.status === 'Ahead of Schedule').length / siteProgress.length) * 100).toFixed(0)}% of sites
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Behind Schedule</p>
          <h3 className="text-3xl font-bold text-red-600">
            {siteProgress.filter(s => s.status === 'Behind Schedule' || s.status === 'Critical').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Needs attention</p>
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
                  placeholder="Search sites..."
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
                      {['On Track', 'Ahead of Schedule', 'Behind Schedule', 'Critical'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Site ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Planned Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supervisor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Photos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSiteProgress.map((site) => (
                <tr key={site.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{site.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{site.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{site.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{site.plannedProgress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{site.actualProgress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${
                      site.variance.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    } font-medium`}>
                      {site.variance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(site.status)}
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        site.status === 'On Track' ? 'bg-green-100 text-green-700' :
                        site.status === 'Ahead of Schedule' ? 'bg-blue-100 text-blue-700' :
                        site.status === 'Behind Schedule' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {site.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{site.supervisor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button 
                      onClick={() => { setSelectedSite(site); setShowPhotoModal(true) }}
                      className="flex items-center space-x-1 text-orange-600 hover:text-orange-700"
                    >
                      <Camera size={14} />
                      <span>{site.photos}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewSite(site)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(site)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSiteEntry(site.id)}
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

      {/* Add Site Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add Site Progress Entry</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddSiteEntry} className="p-6 space-y-6">
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
                      Supervisor <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.supervisor}
                      onChange={(e) => setFormData({...formData, supervisor: e.target.value})}
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

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Planned Progress (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.plannedProgress}
                      onChange={(e) => setFormData({...formData, plannedProgress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Actual Progress (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.actualProgress}
                      onChange={(e) => setFormData({...formData, actualProgress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="65"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workforce Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.workforce}
                      onChange={(e) => setFormData({...formData, workforce: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="45"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment Details
                    </label>
                    <input
                      type="text"
                      value={formData.equipment}
                      onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="2 Cranes, 3 Mixers"
                    />
                  </div>
                </div>

                {formData.plannedProgress && formData.actualProgress && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Variance:</span>
                      <span className={`text-xl font-bold ${
                        calculateVariance().startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {calculateVariance()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        determineStatus() === 'On Track' ? 'bg-green-100 text-green-700' :
                        determineStatus() === 'Ahead of Schedule' ? 'bg-blue-100 text-blue-700' :
                        determineStatus() === 'Behind Schedule' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {determineStatus()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks / Notes
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter any remarks or observations..."
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
                  Add Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Site Modal */}
      {showViewModal && selectedSite && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Site Progress - {selectedSite.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedSite(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedSite.status)}
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedSite.status === 'On Track' ? 'bg-green-100 text-green-700' :
                    selectedSite.status === 'Ahead of Schedule' ? 'bg-blue-100 text-blue-700' :
                    selectedSite.status === 'Behind Schedule' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedSite.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">Last updated: {selectedSite.lastUpdated}</span>
              </div>

              {/* Project Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Site ID</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedSite.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project ID</label>
                    <p className="mt-1 text-gray-900">{selectedSite.projectId}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Project Name</label>
                    <p className="mt-1 text-gray-900">{selectedSite.projectName}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      Location
                    </label>
                    <p className="mt-1 text-gray-900">{selectedSite.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Supervisor</label>
                    <p className="mt-1 text-gray-900">{selectedSite.supervisor}</p>
                  </div>
                  {selectedSite.workforce && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Workforce</label>
                      <p className="mt-1 text-gray-900">{selectedSite.workforce} workers</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Progress Analysis</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Planned Progress</label>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{selectedSite.plannedProgress}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Actual Progress</label>
                    <p className="mt-1 text-2xl font-bold text-blue-600">{selectedSite.actualProgress}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Variance</label>
                    <p className={`mt-1 text-2xl font-bold ${
                      selectedSite.variance.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedSite.variance}
                    </p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Planned Progress</span>
                      <span className="font-medium">{selectedSite.plannedProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: selectedSite.plannedProgress }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Actual Progress</span>
                      <span className="font-medium">{selectedSite.actualProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: selectedSite.actualProgress }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              {selectedSite.equipment && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Equipment Deployed</label>
                  <p className="mt-2 text-gray-700">{selectedSite.equipment}</p>
                </div>
              )}

              {/* Issues */}
              {selectedSite.issues && selectedSite.issues.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertTriangle size={18} className="mr-2 text-red-600" />
                    Issues & Challenges
                  </h3>
                  <ul className="space-y-2">
                    {selectedSite.issues.map((issue, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <span className="text-red-600">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Remarks */}
              {selectedSite.remarks && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Remarks</label>
                  <p className="mt-2 text-gray-700">{selectedSite.remarks}</p>
                </div>
              )}

              {/* Photos */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Camera size={18} className="mr-2" />
                    Site Photos ({selectedSite.photos})
                  </h3>
                  <button 
                    onClick={() => setShowPhotoModal(true)}
                    className="text-sm text-orange-600 hover:text-orange-700 flex items-center space-x-1"
                  >
                    <Upload size={16} />
                    <span>Upload Photos</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(selectedSite.photos)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <Camera size={24} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => { setShowViewModal(false); handleEditClick(selectedSite) }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Edit Entry
                </button>
                <button
                  onClick={() => { setShowViewModal(false); setSelectedSite(null) }}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Upload Modal */}
      {showPhotoModal && selectedSite && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Upload Site Photos - {selectedSite.id}</h2>
              <button 
                onClick={() => setShowPhotoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop photos here, or click to browse
                </p>
                <p className="text-xs text-gray-500">Supported formats: JPG, PNG (Max 5MB each)</p>
                <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Browse Photos
                </button>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Upload Photos
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
              <h2 className="text-xl font-bold text-gray-900">Edit Site Progress</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedSite(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSiteEntry} className="p-6 space-y-6">
              {/* Same form as Add Modal */}
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
                      Supervisor <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.supervisor}
                      onChange={(e) => setFormData({...formData, supervisor: e.target.value})}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Planned Progress (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.plannedProgress}
                      onChange={(e) => setFormData({...formData, plannedProgress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Actual Progress (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.actualProgress}
                      onChange={(e) => setFormData({...formData, actualProgress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Workforce Count</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.workforce}
                      onChange={(e) => setFormData({...formData, workforce: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Details</label>
                    <input
                      type="text"
                      value={formData.equipment}
                      onChange={(e) => setFormData({...formData, equipment: e.target.value})}
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
                  onClick={() => { setShowEditModal(false); setSelectedSite(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}