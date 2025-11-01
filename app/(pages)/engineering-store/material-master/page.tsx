'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, X, Eye, Edit, Trash2, Package, AlertTriangle } from 'lucide-react'

interface Material {
  id: string
  materialCode: string
  materialName: string
  category: string
  unit: string
  currentStock: number
  reorderLevel: number
  specification: string
  unitPrice: string
  totalValue: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  supplier?: string
  location?: string
  description?: string
}

const initialMaterials: Material[] = [
  {
    id: 'MAT-ENG-001',
    materialCode: 'CEM-OPC-53',
    materialName: 'Cement OPC 53 Grade',
    category: 'Cement',
    unit: 'Bag (50 kg)',
    currentStock: 2500,
    reorderLevel: 500,
    specification: 'IS 12269:2013',
    unitPrice: '₹420',
    totalValue: '₹10,50,000',
    status: 'In Stock',
    supplier: 'Ambuja Cement Ltd.',
    location: 'Warehouse A - Section 1',
    description: 'Ordinary Portland Cement 53 Grade for structural work'
  },
  {
    id: 'MAT-ENG-002',
    materialCode: 'STL-TMT-12',
    materialName: 'Steel TMT Bars 12mm',
    category: 'Steel',
    unit: 'Ton',
    currentStock: 45,
    reorderLevel: 50,
    specification: 'IS 1786:2008',
    unitPrice: '₹58,000',
    totalValue: '₹26,10,000',
    status: 'Low Stock',
    supplier: 'TATA Steel',
    location: 'Warehouse B - Section 3',
    description: 'Thermo-Mechanically Treated steel bars for reinforcement'
  },
  {
    id: 'MAT-ENG-003',
    materialCode: 'AGG-20MM',
    materialName: 'Aggregate 20mm',
    category: 'Aggregates',
    unit: 'Cu.M.',
    currentStock: 850,
    reorderLevel: 200,
    specification: 'IS 383:2016',
    unitPrice: '₹1,200',
    totalValue: '₹10,20,000',
    status: 'In Stock',
    supplier: 'Local Quarry Suppliers',
    location: 'Open Storage Yard 1',
    description: 'Coarse aggregate 20mm for concrete mix'
  },
]

const categories = ['Cement', 'Steel', 'Aggregates', 'Bricks', 'Sand', 'Paint', 'Electrical', 'Plumbing', 'Hardware', 'Other']
const units = ['Bag (50 kg)', 'Ton', 'Cu.M.', 'Sq.M.', 'Nos', 'Kgs', 'Ltrs', 'Meters', 'Bundle', 'Box']

export default function MaterialMasterPage() {
  const router = useRouter()
  const [materials, setMaterials] = useState<Material[]>(initialMaterials)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    materialCode: '',
    materialName: '',
    category: 'Cement',
    unit: 'Bag (50 kg)',
    currentStock: '',
    reorderLevel: '',
    specification: '',
    unitPrice: '',
    supplier: '',
    location: '',
    description: '',
  })

  const calculateTotalValue = () => {
    const stock = parseFloat(formData.currentStock) || 0
    const price = parseFloat(formData.unitPrice.replace(/[^0-9]/g, '')) || 0
    return stock * price
  }

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault()
    const totalValue = calculateTotalValue()
    const stock = parseFloat(formData.currentStock) || 0
    const reorder = parseFloat(formData.reorderLevel) || 0
    
    const newMaterial: Material = {
      id: `MAT-ENG-${String(materials.length + 1).padStart(3, '0')}`,
      ...formData,
      currentStock: stock,
      reorderLevel: reorder,
      totalValue: `₹${totalValue.toLocaleString('en-IN')}`,
      status: stock === 0 ? 'Out of Stock' : stock <= reorder ? 'Low Stock' : 'In Stock',
    }
    setMaterials([...materials, newMaterial])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditMaterial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMaterial) return
    
    const totalValue = calculateTotalValue()
    const stock = parseFloat(formData.currentStock) || 0
    const reorder = parseFloat(formData.reorderLevel) || 0
    
    setMaterials(materials.map(mat => 
      mat.id === selectedMaterial.id 
        ? { 
            ...mat, 
            ...formData,
            currentStock: stock,
            reorderLevel: reorder,
            totalValue: `₹${totalValue.toLocaleString('en-IN')}`,
            status: stock === 0 ? 'Out of Stock' : stock <= reorder ? 'Low Stock' : 'In Stock',
          }
        : mat
    ))
    setShowEditModal(false)
    setSelectedMaterial(null)
    resetForm()
  }

  const handleDeleteMaterial = (id: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(mat => mat.id !== id))
    }
  }

  const handleViewMaterial = (material: Material) => {
    router.push(`/engineering-store/material-master/${material.id}`)
  }

  const handleEditClick = (material: Material) => {
    setSelectedMaterial(material)
    setFormData({
      materialCode: material.materialCode,
      materialName: material.materialName,
      category: material.category,
      unit: material.unit,
      currentStock: material.currentStock.toString(),
      reorderLevel: material.reorderLevel.toString(),
      specification: material.specification,
      unitPrice: material.unitPrice,
      supplier: material.supplier || '',
      location: material.location || '',
      description: material.description || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      materialCode: '',
      materialName: '',
      category: 'Cement',
      unit: 'Bag (50 kg)',
      currentStock: '',
      reorderLevel: '',
      specification: '',
      unitPrice: '',
      supplier: '',
      location: '',
      description: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Material ID', 'Code', 'Name', 'Category', 'Unit', 'Stock', 'Reorder Level', 'Specification', 'Unit Price', 'Total Value', 'Status'].join(','),
      ...filteredMaterials.map(m => 
        [m.id, m.materialCode, m.materialName, m.category, m.unit, m.currentStock, m.reorderLevel, m.specification, m.unitPrice, m.totalValue, m.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'material-master.csv'
    a.click()
  }

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.materialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || material.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalStockValue = materials.reduce((sum, m) => 
    sum + (parseFloat(m.totalValue.replace(/[^0-9]/g, '')) || 0), 0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Material Master</h1>
          <p className="text-sm text-gray-600 mt-1">Manage construction materials and specifications</p>
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
            <span>Add Material</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Materials</p>
          <h3 className="text-3xl font-bold text-gray-900">{materials.length}</h3>
          <p className="text-xs text-gray-500 mt-2">All categories</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Stock Value</p>
          <h3 className="text-2xl font-bold text-green-600">₹{(totalStockValue / 10000000).toFixed(2)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Current valuation</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Low Stock Items</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {materials.filter(m => m.status === 'Low Stock').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Below reorder level</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Out of Stock</p>
          <h3 className="text-3xl font-bold text-red-600">
            {materials.filter(m => m.status === 'Out of Stock').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Requires ordering</p>
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
                  placeholder="Search materials..."
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
                      {['In Stock', 'Low Stock', 'Out of Stock'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMaterials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.materialCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.materialName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.currentStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.reorderLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{material.specification}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.unitPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{material.totalValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      material.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                      material.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {material.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewMaterial(material)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(material)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteMaterial(material.id)}
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

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Material</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddMaterial} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
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
                      placeholder="CEM-OPC-53"
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
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.specification}
                      onChange={(e) => setFormData({...formData, specification: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="IS 12269:2013"
                    />
                  </div>
                </div>
              </div>

              {/* Stock Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.currentStock}
                      onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reorder Level <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.reorderLevel}
                      onChange={(e) => setFormData({...formData, reorderLevel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unitPrice}
                      onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹420"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Warehouse A - Section 1"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Ambuja Cement Ltd."
                    />
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
                      placeholder="Enter material description..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Estimated Total Value:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{calculateTotalValue().toLocaleString('en-IN')}
                  </span>
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
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar to Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Material</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedMaterial(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditMaterial} className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
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
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.specification}
                      onChange={(e) => setFormData({...formData, specification: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.currentStock}
                      onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reorder Level <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.reorderLevel}
                      onChange={(e) => setFormData({...formData, reorderLevel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unitPrice}
                      onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Estimated Total Value:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{calculateTotalValue().toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedMaterial(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}