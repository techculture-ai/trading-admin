'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, Home, Eye, Edit, Trash2, X } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface Property {
  id: string
  unitNo: string
  projectName: string
  projectId: string
  type: string
  carpetArea: string
  builtUpArea: string
  superBuiltUpArea?: string
  floor: string
  facing: string
  price: string
  status: 'Available' | 'Sold' | 'Reserved' | 'Blocked' | 'Under Construction'
  possessionDate: string
  towerBlock?: string
  parkingSlots?: number
  balconies?: number
  bathrooms?: number
  bedrooms?: number
  isCornerUnit?: boolean
  hasGardenView?: boolean
  registryNumber?: string
  khataNumber?: string
}

const initialProperties: Property[] = [
  {
    id: 'PROP-2024-001',
    unitNo: 'A-101',
    projectName: 'Gomti Nagar Housing Scheme',
    projectId: 'PROJ-001',
    type: '2BHK',
    carpetArea: '950 sq.ft',
    builtUpArea: '1150 sq.ft',
    superBuiltUpArea: '1250 sq.ft',
    floor: '1st Floor',
    facing: 'East',
    price: '₹45,00,000',
    status: 'Sold',
    possessionDate: '2024-12-30',
    towerBlock: 'Tower A',
    parkingSlots: 1,
    balconies: 2,
    bathrooms: 2,
    bedrooms: 2,
    isCornerUnit: false,
    hasGardenView: true,
    registryNumber: 'REG/2024/001',
    khataNumber: 'KH-12345',
  },
  {
    id: 'PROP-2024-002',
    unitNo: 'B-205',
    projectName: 'Hazratganj Apartments',
    projectId: 'PROJ-002',
    type: '3BHK',
    carpetArea: '1250 sq.ft',
    builtUpArea: '1450 sq.ft',
    superBuiltUpArea: '1600 sq.ft',
    floor: '2nd Floor',
    facing: 'North',
    price: '₹62,00,000',
    status: 'Available',
    possessionDate: '2025-03-31',
    towerBlock: 'Tower B',
    parkingSlots: 2,
    balconies: 3,
    bathrooms: 3,
    bedrooms: 3,
    isCornerUnit: true,
    hasGardenView: false,
    registryNumber: '',
    khataNumber: 'KH-12346',
  },
  {
    id: 'PROP-2024-003',
    unitNo: 'C-302',
    projectName: 'Aliganj Residency',
    projectId: 'PROJ-003',
    type: '2BHK',
    carpetArea: '875 sq.ft',
    builtUpArea: '1050 sq.ft',
    superBuiltUpArea: '1150 sq.ft',
    floor: '3rd Floor',
    facing: 'West',
    price: '₹38,00,000',
    status: 'Reserved',
    possessionDate: '2025-01-15',
    towerBlock: 'Tower C',
    parkingSlots: 1,
    balconies: 2,
    bathrooms: 2,
    bedrooms: 2,
    isCornerUnit: false,
    hasGardenView: false,
    registryNumber: '',
    khataNumber: 'KH-12347',
  },
]

const projects = ['Gomti Nagar Housing Scheme', 'Hazratganj Apartments', 'Aliganj Residency']
const unitTypes = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Penthouse', 'Villa', 'Plot']
const facingOptions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']
const floorOptions = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', '6th Floor', '7th Floor', '8th Floor', '9th Floor', '10th Floor', '11th Floor', '12th Floor', '13th Floor', '14th Floor', '15th Floor']

export default function PropertyMasterPage() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    unitNo: '',
    projectName: 'Gomti Nagar Housing Scheme',
    projectId: 'PROJ-001',
    type: '2 BHK',
    carpetArea: '',
    builtUpArea: '',
    superBuiltUpArea: '',
    floor: 'Ground Floor',
    facing: 'North',
    price: '',
    possessionDate: '',
    towerBlock: '',
    parkingSlots: 1,
    balconies: 2,
    bathrooms: 2,
    bedrooms: 2,
    isCornerUnit: false,
    hasGardenView: false,
    registryNumber: '',
    khataNumber: '',
  })

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newProperty: Property = {
      id: `PROP-2024-${String(properties.length + 1).padStart(3, '0')}`,
      ...formData,
      carpetArea: `${formData.carpetArea} sq.ft`,
      builtUpArea: `${formData.builtUpArea} sq.ft`,
      superBuiltUpArea: formData.superBuiltUpArea ? `${formData.superBuiltUpArea} sq.ft` : '',
      price: `₹${formData.price}`,
      status: 'Available',
    }
    
    setProperties([...properties, newProperty])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditProperty = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProperty) return
    
    setProperties(properties.map(prop => 
      prop.id === selectedProperty.id 
        ? { 
            ...prop, 
            ...formData,
            carpetArea: `${formData.carpetArea} sq.ft`,
            builtUpArea: `${formData.builtUpArea} sq.ft`,
            superBuiltUpArea: formData.superBuiltUpArea ? `${formData.superBuiltUpArea} sq.ft` : '',
            price: `₹${formData.price}`,
          }
        : prop
    ))
    setShowEditModal(false)
    setSelectedProperty(null)
    resetForm()
  }

  const handleDeleteProperty = (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(prop => prop.id !== id))
    }
  }

  const handleViewProperty = (property: Property) => {
    router.push(`/property-disposal/property-master/${property.id}`)
  }

  const handleEditClick = (property: Property) => {
    setSelectedProperty(property)
    setFormData({
      unitNo: property.unitNo,
      projectName: property.projectName,
      projectId: property.projectId,
      type: property.type,
      carpetArea: property.carpetArea.replace(' sq.ft', ''),
      builtUpArea: property.builtUpArea.replace(' sq.ft', ''),
      superBuiltUpArea: property.superBuiltUpArea?.replace(' sq.ft', '') || '',
      floor: property.floor,
      facing: property.facing,
      price: property.price.replace(/[^0-9]/g, ''),
      possessionDate: property.possessionDate,
      towerBlock: property.towerBlock || '',
      parkingSlots: property.parkingSlots || 1,
      balconies: property.balconies || 2,
      bathrooms: property.bathrooms || 2,
      bedrooms: property.bedrooms || 2,
      isCornerUnit: property.isCornerUnit || false,
      hasGardenView: property.hasGardenView || false,
      registryNumber: property.registryNumber || '',
      khataNumber: property.khataNumber || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      unitNo: '',
      projectName: 'Gomti Nagar Housing Scheme',
      projectId: 'PROJ-001',
      type: '2 BHK',
      carpetArea: '',
      builtUpArea: '',
      superBuiltUpArea: '',
      floor: 'Ground Floor',
      facing: 'North',
      price: '',
      possessionDate: '',
      towerBlock: '',
      parkingSlots: 1,
      balconies: 2,
      bathrooms: 2,
      bedrooms: 2,
      isCornerUnit: false,
      hasGardenView: false,
      registryNumber: '',
      khataNumber: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Property ID', 'Unit No', 'Project', 'Type', 'Carpet Area', 'Floor', 'Facing', 'Price', 'Status'].join(','),
      ...filteredProperties.map(prop => 
        [prop.id, prop.unitNo, prop.projectName, prop.type, prop.carpetArea, prop.floor, prop.facing, prop.price, prop.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'property-master.csv'
    a.click()
  }

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prop.unitNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prop.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prop.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || prop.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalProperties = 450
  const availableProperties = properties.filter(p => p.status === 'Available').length
  const soldProperties = 289
  const reservedProperties = properties.filter(p => p.status === 'Reserved').length
  if (isLoading) {
    return <DetailsSkeleton />
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Master</h1>
          <p className="text-sm text-gray-600 mt-1">Manage complete property inventory and unit details</p>
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
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Properties</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalProperties}</h3>
          <p className="text-xs text-gray-500 mt-2">All units</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Available</p>
          <h3 className="text-3xl font-bold text-green-600">{availableProperties}</h3>
          <p className="text-xs text-gray-500 mt-2">Ready for sale</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Sold</p>
          <h3 className="text-3xl font-bold text-blue-600">{soldProperties}</h3>
          <p className="text-xs text-gray-500 mt-2">{((soldProperties / totalProperties) * 100).toFixed(1)}% sold</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Reserved</p>
          <h3 className="text-3xl font-bold text-orange-600">{reservedProperties}</h3>
          <p className="text-xs text-gray-500 mt-2">Booking in progress</p>
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
                  placeholder="Search properties..."
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
                      {['Available', 'Sold', 'Reserved', 'Blocked', 'Under Construction'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carpet Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Facing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.unitNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.carpetArea}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.floor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.facing}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{property.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      property.status === 'Sold' ? 'bg-blue-100 text-blue-700' :
                      property.status === 'Available' ? 'bg-green-100 text-green-700' :
                      property.status === 'Reserved' ? 'bg-orange-100 text-orange-700' :
                      property.status === 'Blocked' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewProperty(property)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(property)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProperty(property.id)}
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

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Add New Property</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddProperty} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unitNo}
                      onChange={(e) => setFormData({...formData, unitNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="A-101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {unitTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tower/Block
                    </label>
                    <input
                      type="text"
                      value={formData.towerBlock}
                      onChange={(e) => setFormData({...formData, towerBlock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Tower A"
                    />
                  </div>
                </div>
              </div>

              {/* Area Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Area Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carpet Area (sq.ft) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.carpetArea}
                      onChange={(e) => setFormData({...formData, carpetArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="950"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Built-up Area (sq.ft) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.builtUpArea}
                      onChange={(e) => setFormData({...formData, builtUpArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Super Built-up Area (sq.ft)
                    </label>
                    <input
                      type="number"
                      value={formData.superBuiltUpArea}
                      onChange={(e) => setFormData({...formData, superBuiltUpArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1250"
                    />
                  </div>
                </div>
              </div>

              {/* Unit Configuration */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Unit Configuration</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Balconies
                    </label>
                    <input
                      type="number"
                      value={formData.balconies}
                      onChange={(e) => setFormData({...formData, balconies: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parking Slots
                    </label>
                    <input
                      type="number"
                      value={formData.parkingSlots}
                      onChange={(e) => setFormData({...formData, parkingSlots: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Floor <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.floor}
                      onChange={(e) => setFormData({...formData, floor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {floorOptions.map(floor => (
                        <option key={floor} value={floor}>{floor}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facing <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.facing}
                      onChange={(e) => setFormData({...formData, facing: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {facingOptions.map(facing => (
                        <option key={facing} value={facing}>{facing}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.isCornerUnit}
                          onChange={(e) => setFormData({...formData, isCornerUnit: e.target.checked})}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">Corner Unit</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.hasGardenView}
                          onChange={(e) => setFormData({...formData, hasGardenView: e.target.checked})}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">Garden View</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Documents */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="4500000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Possession Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.possessionDate}
                      onChange={(e) => setFormData({...formData, possessionDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registry Number
                    </label>
                    <input
                      type="text"
                      value={formData.registryNumber}
                      onChange={(e) => setFormData({...formData, registryNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="REG/2024/001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Khata Number
                    </label>
                    <input
                      type="text"
                      value={formData.khataNumber}
                      onChange={(e) => setFormData({...formData, khataNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="KH-12345"
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
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Property Modal - Same structure as Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Edit Property</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedProperty(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditProperty} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unitNo}
                      onChange={(e) => setFormData({...formData, unitNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.projectName}
                      onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {unitTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tower/Block</label>
                    <input
                      type="text"
                      value={formData.towerBlock}
                      onChange={(e) => setFormData({...formData, towerBlock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Area Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carpet Area (sq.ft) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.carpetArea}
                      onChange={(e) => setFormData({...formData, carpetArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Built-up Area (sq.ft) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.builtUpArea}
                      onChange={(e) => setFormData({...formData, builtUpArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Super Built-up Area (sq.ft)</label>
                    <input
                      type="number"
                      value={formData.superBuiltUpArea}
                      onChange={(e) => setFormData({...formData, superBuiltUpArea: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Unit Configuration</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Balconies</label>
                    <input
                      type="number"
                      value={formData.balconies}
                      onChange={(e) => setFormData({...formData, balconies: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parking Slots</label>
                    <input
                      type="number"
                      value={formData.parkingSlots}
                      onChange={(e) => setFormData({...formData, parkingSlots: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Floor <span className="text-red-500">*</span></label>
                    <select
                      value={formData.floor}
                      onChange={(e) => setFormData({...formData, floor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {floorOptions.map(floor => (
                        <option key={floor} value={floor}>{floor}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facing <span className="text-red-500">*</span></label>
                    <select
                      value={formData.facing}
                      onChange={(e) => setFormData({...formData, facing: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {facingOptions.map(facing => (
                        <option key={facing} value={facing}>{facing}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.isCornerUnit}
                          onChange={(e) => setFormData({...formData, isCornerUnit: e.target.checked})}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">Corner Unit</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.hasGardenView}
                          onChange={(e) => setFormData({...formData, hasGardenView: e.target.checked})}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">Garden View</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Possession Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      required
                      value={formData.possessionDate}
                      onChange={(e) => setFormData({...formData, possessionDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registry Number</label>
                    <input
                      type="text"
                      value={formData.registryNumber}
                      onChange={(e) => setFormData({...formData, registryNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Khata Number</label>
                    <input
                      type="text"
                      value={formData.khataNumber}
                      onChange={(e) => setFormData({...formData, khataNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedProperty(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}