'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, Download, BarChart3, Plus, Eye, Edit, Trash2, X, RefreshCw } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface InventoryItem {
  id: string
  projectName: string
  projectLocation: string
  totalUnits: number
  available: number
  sold: number
  reserved: number
  blocked: number
  availabilityPerc: string
  soldPerc: string
  unitTypes?: {
    type: string
    total: number
    available: number
    sold: number
  }[]
  priceRange?: string
  projectStatus?: string
  possession?: string
}

const initialInventory: InventoryItem[] = [
  {
    id: 'INV-001',
    projectName: 'Gomti Nagar Housing Scheme',
    projectLocation: 'Gomti Nagar, Lucknow',
    totalUnits: 150,
    available: 35,
    sold: 98,
    reserved: 12,
    blocked: 5,
    availabilityPerc: '23%',
    soldPerc: '65%',
    unitTypes: [
      { type: '2 BHK', total: 60, available: 15, sold: 40 },
      { type: '3 BHK', total: 70, available: 18, sold: 45 },
      { type: '4 BHK', total: 20, available: 2, sold: 13 },
    ],
    priceRange: '₹35-85 Lakhs',
    projectStatus: 'Under Construction',
    possession: 'Dec 2025',
  },
  {
    id: 'INV-002',
    projectName: 'Hazratganj Apartments',
    projectLocation: 'Hazratganj, Lucknow',
    totalUnits: 120,
    available: 42,
    sold: 68,
    reserved: 8,
    blocked: 2,
    availabilityPerc: '35%',
    soldPerc: '57%',
    unitTypes: [
      { type: '2 BHK', total: 50, available: 20, sold: 25 },
      { type: '3 BHK', total: 50, available: 18, sold: 28 },
      { type: 'Penthouse', total: 20, available: 4, sold: 15 },
    ],
    priceRange: '₹45-95 Lakhs',
    projectStatus: 'Ready to Move',
    possession: 'Immediate',
  },
  {
    id: 'INV-003',
    projectName: 'Aliganj Residency',
    projectLocation: 'Aliganj, Lucknow',
    totalUnits: 180,
    available: 46,
    sold: 123,
    reserved: 8,
    blocked: 3,
    availabilityPerc: '26%',
    soldPerc: '68%',
    unitTypes: [
      { type: '1 BHK', total: 40, available: 8, sold: 30 },
      { type: '2 BHK', total: 80, available: 22, sold: 52 },
      { type: '3 BHK', total: 60, available: 16, sold: 41 },
    ],
    priceRange: '₹25-75 Lakhs',
    projectStatus: 'Under Construction',
    possession: 'Jun 2026',
  },
]

const projectStatuses = ['Under Construction', 'Ready to Move', 'Pre-Launch', 'Completed']
const unitTypesList = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Penthouse', 'Villa', 'Plot']

export default function InventoryPage() {
  const router = useRouter()
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    projectName: '',
    projectLocation: '',
    totalUnits: 0,
    available: 0,
    sold: 0,
    reserved: 0,
    blocked: 0,
    priceRange: '',
    projectStatus: 'Under Construction',
    possession: '',
    unitTypes: [{ type: '2 BHK', total: 0, available: 0, sold: 0 }],
  })

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault()
    
    const totalUnits = formData.unitTypes.reduce((sum, unit) => sum + unit.total, 0)
    const available = formData.unitTypes.reduce((sum, unit) => sum + unit.available, 0)
    const sold = formData.unitTypes.reduce((sum, unit) => sum + unit.sold, 0)
    const reserved = formData.reserved
    const blocked = formData.blocked
    
    const availabilityPerc = ((available / totalUnits) * 100).toFixed(0) + '%'
    const soldPerc = ((sold / totalUnits) * 100).toFixed(0) + '%'
    
    const newItem: InventoryItem = {
      id: `INV-${String(inventory.length + 1).padStart(3, '0')}`,
      ...formData,
      totalUnits,
      available,
      sold,
      availabilityPerc,
      soldPerc,
    }
    
    setInventory([...inventory, newItem])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditInventory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem) return
    
    const totalUnits = formData.unitTypes.reduce((sum, unit) => sum + unit.total, 0)
    const available = formData.unitTypes.reduce((sum, unit) => sum + unit.available, 0)
    const sold = formData.unitTypes.reduce((sum, unit) => sum + unit.sold, 0)
    const availabilityPerc = ((available / totalUnits) * 100).toFixed(0) + '%'
    const soldPerc = ((sold / totalUnits) * 100).toFixed(0) + '%'
    
    setInventory(inventory.map(item => 
      item.id === selectedItem.id 
        ? { ...item, ...formData, totalUnits, available, sold, availabilityPerc, soldPerc }
        : item
    ))
    setShowEditModal(false)
    setSelectedItem(null)
    resetForm()
  }

  const handleDeleteInventory = (id: string) => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      setInventory(inventory.filter(item => item.id !== id))
    }
  }

  const handleViewInventory = (item: InventoryItem) => {
    router.push(`/property-disposal/inventory/${item.id}`)
  }

  const handleEditClick = (item: InventoryItem) => {
    setSelectedItem(item)
    setFormData({
      projectName: item.projectName,
      projectLocation: item.projectLocation,
      totalUnits: item.totalUnits,
      available: item.available,
      sold: item.sold,
      reserved: item.reserved,
      blocked: item.blocked,
      priceRange: item.priceRange || '',
      projectStatus: item.projectStatus || 'Under Construction',
      possession: item.possession || '',
      unitTypes: item.unitTypes || [{ type: '2 BHK', total: 0, available: 0, sold: 0 }],
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      projectName: '',
      projectLocation: '',
      totalUnits: 0,
      available: 0,
      sold: 0,
      reserved: 0,
      blocked: 0,
      priceRange: '',
      projectStatus: 'Under Construction',
      possession: '',
      unitTypes: [{ type: '2 BHK', total: 0, available: 0, sold: 0 }],
    })
  }

  const addUnitType = () => {
    setFormData({
      ...formData,
      unitTypes: [...formData.unitTypes, { type: '2 BHK', total: 0, available: 0, sold: 0 }]
    })
  }

  const removeUnitType = (index: number) => {
    const newUnitTypes = formData.unitTypes.filter((_, i) => i !== index)
    setFormData({ ...formData, unitTypes: newUnitTypes })
  }

  const updateUnitType = (index: number, field: string, value: any) => {
    const newUnitTypes = [...formData.unitTypes]
    newUnitTypes[index] = { ...newUnitTypes[index], [field]: value }
    setFormData({ ...formData, unitTypes: newUnitTypes })
  }

  const handleExport = () => {
    const csv = [
      ['Project Name', 'Location', 'Total Units', 'Available', 'Sold', 'Reserved', 'Blocked', 'Availability %', 'Sold %'].join(','),
      ...filteredInventory.map(item => 
        [item.projectName, item.projectLocation, item.totalUnits, item.available, item.sold, item.reserved, item.blocked, item.availabilityPerc, item.soldPerc].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'inventory-report.csv'
    a.click()
  }

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.projectLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || item.projectStatus === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalUnits = inventory.reduce((sum, item) => sum + item.totalUnits, 0)
  const totalAvailable = inventory.reduce((sum, item) => sum + item.available, 0)
  const totalSold = inventory.reduce((sum, item) => sum + item.sold, 0)
  const totalReserved = inventory.reduce((sum, item) => sum + item.reserved, 0)
  const totalBlocked = inventory.reduce((sum, item) => sum + item.blocked, 0)
if (isLoading) {
    return <DetailsSkeleton />
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Status</h1>
          <p className="text-sm text-gray-600 mt-1">Real-time property inventory and availability tracking</p>
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
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Units</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalUnits}</h3>
          <p className="text-xs text-gray-500 mt-2">All projects</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600 mb-2">Available</p>
          <h3 className="text-3xl font-bold text-green-600">{totalAvailable}</h3>
          <p className="text-xs text-gray-500 mt-2">{((totalAvailable / totalUnits) * 100).toFixed(0)}% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600 mb-2">Sold</p>
          <h3 className="text-3xl font-bold text-blue-600">{totalSold}</h3>
          <p className="text-xs text-gray-500 mt-2">{((totalSold / totalUnits) * 100).toFixed(0)}% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-orange-500">
          <p className="text-sm text-gray-600 mb-2">Reserved</p>
          <h3 className="text-3xl font-bold text-orange-600">{totalReserved}</h3>
          <p className="text-xs text-gray-500 mt-2">{((totalReserved / totalUnits) * 100).toFixed(0)}% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Blocked</p>
          <h3 className="text-3xl font-bold text-red-600">{totalBlocked}</h3>
          <p className="text-xs text-gray-500 mt-2">{((totalBlocked / totalUnits) * 100).toFixed(0)}% of total</p>
        </div>
      </div>

      {/* Inventory Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Project-wise Inventory Distribution</h2>
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 size={64} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Inventory Chart</p>
            <p className="text-sm text-gray-500 mt-2">Visual representation of project-wise inventory</p>
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
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reserved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blocked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Availability %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.totalUnits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{item.available}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.sold}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{item.reserved}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">{item.blocked}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.availabilityPerc}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: item.soldPerc }}></div>
                      </div>
                      <span>{item.soldPerc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewInventory(item)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteInventory(item.id)}
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Add Project Inventory</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddInventory} className="p-6 space-y-6">
              {/* Project Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({...formData, projectLocation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Gomti Nagar, Lucknow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <input
                      type="text"
                      value={formData.priceRange}
                      onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹35-85 Lakhs"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.projectStatus}
                      onChange={(e) => setFormData({...formData, projectStatus: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {projectStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Possession Date
                    </label>
                    <input
                      type="text"
                      value={formData.possession}
                      onChange={(e) => setFormData({...formData, possession: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Dec 2025"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Units */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Inventory</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reserved Units</label>
                    <input
                      type="number"
                      value={formData.reserved}
                      onChange={(e) => setFormData({...formData, reserved: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blocked Units</label>
                    <input
                      type="number"
                      value={formData.blocked}
                      onChange={(e) => setFormData({...formData, blocked: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Unit Types */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Unit Types</h3>
                  <button
                    type="button"
                    onClick={addUnitType}
                    className="flex items-center space-x-2 px-3 py-1 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    <Plus size={16} />
                    <span>Add Unit Type</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.unitTypes.map((unit, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
                          <select
                            value={unit.type}
                            onChange={(e) => updateUnitType(index, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            {unitTypesList.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Total</label>
                          <input
                            type="number"
                            value={unit.total}
                            onChange={(e) => updateUnitType(index, 'total', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Available</label>
                          <input
                            type="number"
                            value={unit.available}
                            onChange={(e) => updateUnitType(index, 'available', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Sold</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={unit.sold}
                              onChange={(e) => updateUnitType(index, 'sold', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                              placeholder="0"
                            />
                            {formData.unitTypes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeUnitType(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  Add Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Edit Project Inventory</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditInventory} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({...formData, projectLocation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <input
                      type="text"
                      value={formData.priceRange}
                      onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.projectStatus}
                      onChange={(e) => setFormData({...formData, projectStatus: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {projectStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Possession Date</label>
                    <input
                      type="text"
                      value={formData.possession}
                      onChange={(e) => setFormData({...formData, possession: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Inventory</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reserved Units</label>
                    <input
                      type="number"
                      value={formData.reserved}
                      onChange={(e) => setFormData({...formData, reserved: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blocked Units</label>
                    <input
                      type="number"
                      value={formData.blocked}
                      onChange={(e) => setFormData({...formData, blocked: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Unit Types</h3>
                  <button
                    type="button"
                    onClick={addUnitType}
                    className="flex items-center space-x-2 px-3 py-1 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    <Plus size={16} />
                    <span>Add Unit Type</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.unitTypes.map((unit, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
                          <select
                            value={unit.type}
                            onChange={(e) => updateUnitType(index, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            {unitTypesList.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Total</label>
                          <input
                            type="number"
                            value={unit.total}
                            onChange={(e) => updateUnitType(index, 'total', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Available</label>
                          <input
                            type="number"
                            value={unit.available}
                            onChange={(e) => updateUnitType(index, 'available', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Sold</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={unit.sold}
                              onChange={(e) => updateUnitType(index, 'sold', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            {formData.unitTypes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeUnitType(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}