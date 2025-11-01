'use client'

import { useState } from 'react'
import { Search, Plus, Download, Filter, X, MapPin, Calendar, User, FileText, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface Parcel {
  id: string
  surveyNo: string
  owner: string
  area: string
  location: string
  status: 'Acquired' | 'In Progress' | 'Pending'
  compensation: string
  date: string
  ownerContact: string
  documents: string[]
  coordinates?: string
}

const initialParcels: Parcel[] = [
  {
    id: 'PAR-001',
    surveyNo: 'SV-2024-001',
    owner: 'Ram Kumar Singh',
    area: '2.5 acres',
    location: 'Gomti Nagar, Lucknow',
    status: 'Acquired',
    compensation: '₹45,00,000',
    date: '15 Jan 2024',
    ownerContact: '+91 98765 43210',
    documents: ['Title Deed', 'Survey Report', 'NOC'],
    coordinates: '26.8467° N, 80.9462° E',
  },
  {
    id: 'PAR-002',
    surveyNo: 'SV-2024-002',
    owner: 'Shyam Mohan Verma',
    area: '1.8 acres',
    location: 'Hazratganj, Lucknow',
    status: 'In Progress',
    compensation: '₹32,00,000',
    date: '20 Jan 2024',
    ownerContact: '+91 98765 43211',
    documents: ['Title Deed', 'Survey Report'],
    coordinates: '26.8547° N, 80.9420° E',
  },
  {
    id: 'PAR-003',
    surveyNo: 'SV-2024-003',
    owner: 'Geeta Devi',
    area: '3.2 acres',
    location: 'Aliganj, Lucknow',
    status: 'Pending',
    compensation: '₹58,00,000',
    date: '25 Jan 2024',
    ownerContact: '+91 98765 43212',
    documents: ['Title Deed'],
    coordinates: '26.8947° N, 80.9820° E',
  },
]

export default function ParcelRegistryPage() {
  const [parcels, setParcels] = useState<Parcel[]>(initialParcels)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null)
  const [parcelToDelete, setParcelToDelete] = useState<Parcel | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const router = useRouter()
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    surveyNo: '',
    owner: '',
    ownerContact: '',
    area: '',
    location: '',
    status: 'Pending' as 'Acquired' | 'In Progress' | 'Pending',
    compensation: '',
    coordinates: '',
  })

  const handleAddParcel = (e: React.FormEvent) => {
    e.preventDefault()
    const newParcel: Parcel = {
      id: `PAR-${String(parcels.length + 1).padStart(3, '0')}`,
      ...formData,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      documents: ['Title Deed'],
    }
    setParcels([...parcels, newParcel])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditParcel = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedParcel) return
    
    setParcels(parcels.map(p => 
      p.id === selectedParcel.id 
        ? { ...p, ...formData }
        : p
    ))
    setShowEditModal(false)
    setSelectedParcel(null)
    resetForm()
  }

  const handleDeleteClick = (parcel: Parcel) => {
    setParcelToDelete(parcel)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (parcelToDelete) {
      setParcels(parcels.filter(p => p.id !== parcelToDelete.id))
      setShowDeleteModal(false)
      setParcelToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setParcelToDelete(null)
  }

  const handleViewParcel = (parcel: Parcel) => {
    router.push(`/land-acquisition/parcel-registry/${parcel.id}`)
  }

  const handleEditClick = (parcel: Parcel) => {
    setSelectedParcel(parcel)
    setFormData({
      surveyNo: parcel.surveyNo,
      owner: parcel.owner,
      ownerContact: parcel.ownerContact,
      area: parcel.area,
      location: parcel.location,
      status: parcel.status,
      compensation: parcel.compensation,
      coordinates: parcel.coordinates || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      surveyNo: '',
      owner: '',
      ownerContact: '',
      area: '',
      location: '',
      status: 'Pending',
      compensation: '',
      coordinates: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Parcel ID', 'Survey No', 'Owner', 'Area', 'Location', 'Status', 'Compensation', 'Date'].join(','),
      ...filteredParcels.map(p => 
        [p.id, p.surveyNo, p.owner, p.area, p.location, p.status, p.compensation, p.date].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'parcel-registry.csv'
    a.click()
  }

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || parcel.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Land Parcel Registry</h1>
          <p className="text-sm text-gray-600 mt-1">Manage all land parcels and acquisition records</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add New Parcel</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Parcels</p>
          <h3 className="text-3xl font-bold text-gray-900">{parcels.length}</h3>
          <p className="text-xs text-green-600 mt-2">+12 this month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Area</p>
          <h3 className="text-3xl font-bold text-gray-900">
            {parcels.reduce((sum, p) => sum + parseFloat(p.area), 0).toFixed(1)} acres
          </h3>
          <p className="text-xs text-gray-500 mt-2">Across all parcels</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Acquired Parcels</p>
          <h3 className="text-3xl font-bold text-green-600">
            {parcels.filter(p => p.status === 'Acquired').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Successfully acquired</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Acquisitions</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {parcels.filter(p => p.status === 'Pending').length}
          </h3>
          <p className="text-xs text-orange-600 mt-2">Requires action</p>
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
                  placeholder="Search parcels..."
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
                      {['all', 'Acquired', 'In Progress', 'Pending'].map((status) => (
                        <button
                          key={status}
                          onClick={() => { 
                            setFilterStatus(status === 'all' ? 'all' : status)
                            setShowFilterDropdown(false) 
                          }}
                          className={`block w-full text-left px-3 py-2 text-sm rounded ${
                            filterStatus === status 
                              ? 'bg-orange-500 text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {status === 'all' ? 'All Status' : status}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcel ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compensation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{parcel.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{parcel.surveyNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{parcel.area}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{parcel.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      parcel.status === 'Acquired' ? 'bg-green-100 text-green-700' :
                      parcel.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {parcel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{parcel.compensation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{parcel.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewParcel(parcel)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(parcel)}
                        className="text-orange-600 hover:text-orange-700 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(parcel)}
                        className="text-red-600 hover:text-red-700 transition-colors"
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && parcelToDelete && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md border border-gray-200 shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Parcel</h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                Are you sure you want to delete this parcel? This action cannot be undone.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Parcel ID:</span>
                  <span className="font-medium text-gray-900">{parcelToDelete.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Survey No:</span>
                  <span className="font-medium text-gray-900">{parcelToDelete.surveyNo}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Owner:</span>
                  <span className="font-medium text-gray-900">{parcelToDelete.owner}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-medium text-gray-900">{parcelToDelete.area}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{parcelToDelete.location}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete Parcel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Parcel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Parcel</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddParcel} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Survey Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.surveyNo}
                    onChange={(e) => setFormData({...formData, surveyNo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="SV-2024-001"
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
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.ownerContact}
                    onChange={(e) => setFormData({...formData, ownerContact: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (acres) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="2.5 acres"
                  />
                </div>
              </div>

              <div>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Acquired">Acquired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compensation Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.compensation}
                    onChange={(e) => setFormData({...formData, compensation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="₹45,00,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPS Coordinates
                </label>
                <input
                  type="text"
                  value={formData.coordinates}
                  onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="26.8467° N, 80.9462° E"
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
                  Add Parcel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Parcel Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Parcel</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedParcel(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditParcel} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Survey Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.surveyNo}
                    onChange={(e) => setFormData({...formData, surveyNo: e.target.value})}
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
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.ownerContact}
                    onChange={(e) => setFormData({...formData, ownerContact: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (acres) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Acquired">Acquired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compensation Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.compensation}
                    onChange={(e) => setFormData({...formData, compensation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPS Coordinates
                </label>
                <input
                  type="text"
                  value={formData.coordinates}
                  onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedParcel(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Parcel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}