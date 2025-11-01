'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, Package, X, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react'

interface InventoryItem {
  id: string
  itemCode: string
  itemName: string
  category: string
  unit: string
  currentStock: number
  reorderLevel: number
  maxStock: number
  unitPrice: string
  totalValue: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  supplier?: string
  location?: string
  description?: string
  lastPurchaseDate?: string
  lastIssueDate?: string
}

const initialInventory: InventoryItem[] = [
  {
    id: 'INV-GS-001',
    itemCode: 'STAT-001',
    itemName: 'A4 Paper (500 Sheets)',
    category: 'Stationery',
    unit: 'Ream',
    currentStock: 450,
    reorderLevel: 100,
    maxStock: 1000,
    unitPrice: '₹350',
    totalValue: '₹1,57,500',
    status: 'In Stock',
    supplier: 'JK Paper Ltd.',
    location: 'Store Room A - Shelf 1',
    description: 'Premium quality A4 size copier paper, 500 sheets per ream',
    lastPurchaseDate: '2025-10-15',
    lastIssueDate: '2025-10-28'
  },
  {
    id: 'INV-GS-002',
    itemCode: 'IT-045',
    itemName: 'HP Printer Cartridge',
    category: 'IT Consumables',
    unit: 'Piece',
    currentStock: 25,
    reorderLevel: 30,
    maxStock: 100,
    unitPrice: '₹2,500',
    totalValue: '₹62,500',
    status: 'Low Stock',
    supplier: 'HP India',
    location: 'Store Room B - Cabinet 3',
    description: 'Original HP Black Ink Cartridge for LaserJet printers',
    lastPurchaseDate: '2025-10-10',
    lastIssueDate: '2025-10-25'
  },
  {
    id: 'INV-GS-003',
    itemCode: 'FURN-023',
    itemName: 'Office Chair Executive',
    category: 'Furniture',
    unit: 'Piece',
    currentStock: 45,
    reorderLevel: 10,
    maxStock: 100,
    unitPrice: '₹12,000',
    totalValue: '₹5,40,000',
    status: 'In Stock',
    supplier: 'Godrej Interio',
    location: 'Warehouse - Section C',
    description: 'High back executive chair with lumbar support',
    lastPurchaseDate: '2025-09-20',
    lastIssueDate: '2025-10-20'
  },
]

const categories = ['Stationery', 'IT Consumables', 'Furniture', 'Electrical', 'Plumbing', 'Hardware', 'Safety Equipment', 'Cleaning Supplies', 'Office Supplies', 'Other']
const units = ['Piece', 'Ream', 'Box', 'Packet', 'Set', 'Dozen', 'Bundle', 'Meter', 'Liter', 'Kilogram']

export default function GeneralStoreInventoryPage() {
  const router = useRouter()
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    category: 'Stationery',
    unit: 'Piece',
    currentStock: '',
    reorderLevel: '',
    maxStock: '',
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

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    const totalValue = calculateTotalValue()
    const stock = parseFloat(formData.currentStock) || 0
    const reorder = parseFloat(formData.reorderLevel) || 0
    
    const newItem: InventoryItem = {
      id: `INV-GS-${String(inventory.length + 1).padStart(3, '0')}`,
      ...formData,
      currentStock: stock,
      reorderLevel: reorder,
      maxStock: parseFloat(formData.maxStock) || 0,
      totalValue: `₹${totalValue.toLocaleString('en-IN')}`,
      status: stock === 0 ? 'Out of Stock' : stock <= reorder ? 'Low Stock' : 'In Stock',
      lastPurchaseDate: new Date().toISOString().split('T')[0],
    }
    setInventory([...inventory, newItem])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem) return
    
    const totalValue = calculateTotalValue()
    const stock = parseFloat(formData.currentStock) || 0
    const reorder = parseFloat(formData.reorderLevel) || 0
    
    setInventory(inventory.map(item => 
      item.id === selectedItem.id 
        ? { 
            ...item, 
            ...formData,
            currentStock: stock,
            reorderLevel: reorder,
            maxStock: parseFloat(formData.maxStock) || 0,
            totalValue: `₹${totalValue.toLocaleString('en-IN')}`,
            status: stock === 0 ? 'Out of Stock' : stock <= reorder ? 'Low Stock' : 'In Stock',
          }
        : item
    ))
    setShowEditModal(false)
    setSelectedItem(null)
    resetForm()
  }

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id))
    }
  }

  const handleViewItem = (item: InventoryItem) => {
    router.push(`/general-store/inventory/${item.id}`)
  }

  const handleEditClick = (item: InventoryItem) => {
    setSelectedItem(item)
    setFormData({
      itemCode: item.itemCode,
      itemName: item.itemName,
      category: item.category,
      unit: item.unit,
      currentStock: item.currentStock.toString(),
      reorderLevel: item.reorderLevel.toString(),
      maxStock: item.maxStock.toString(),
      unitPrice: item.unitPrice,
      supplier: item.supplier || '',
      location: item.location || '',
      description: item.description || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      itemCode: '',
      itemName: '',
      category: 'Stationery',
      unit: 'Piece',
      currentStock: '',
      reorderLevel: '',
      maxStock: '',
      unitPrice: '',
      supplier: '',
      location: '',
      description: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Inventory ID', 'Item Code', 'Item Name', 'Category', 'Unit', 'Current Stock', 'Reorder Level', 'Unit Price', 'Total Value', 'Status'].join(','),
      ...filteredInventory.map(i => 
        [i.id, i.itemCode, i.itemName, i.category, i.unit, i.currentStock, i.reorderLevel, i.unitPrice, i.totalValue, i.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'general-store-inventory.csv'
    a.click()
  }

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalStockValue = inventory.reduce((sum, i) => 
    sum + (parseFloat(i.totalValue.replace(/[^0-9]/g, '')) || 0), 0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">General Store Inventory</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage office supplies and consumables</p>
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
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Items</p>
          <h3 className="text-3xl font-bold text-gray-900">{inventory.length}</h3>
          <p className="text-xs text-gray-500 mt-2">All categories</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Stock Value</p>
          <h3 className="text-2xl font-bold text-green-600">₹{(totalStockValue / 100000).toFixed(2)} L</h3>
          <p className="text-xs text-gray-500 mt-2">Current valuation</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Low Stock Items</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {inventory.filter(i => i.status === 'Low Stock').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Below reorder level</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Out of Stock</p>
          <h3 className="text-3xl font-bold text-red-600">
            {inventory.filter(i => i.status === 'Out of Stock').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Needs urgent order</p>
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
                  placeholder="Search inventory..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inventory ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.itemCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.currentStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.reorderLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unitPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{item.totalValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                      item.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewItem(item)}
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
                        onClick={() => handleDeleteItem(item.id)}
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

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Add New Item</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddItem} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.itemCode}
                      onChange={(e) => setFormData({...formData, itemCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="STAT-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.itemName}
                      onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="A4 Paper (500 Sheets)"
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
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter item description..."
                    />
                  </div>
                </div>
              </div>

              {/* Stock Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h3>
                <div className="grid grid-cols-3 gap-4">
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
                      placeholder="450"
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
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Stock Level
                    </label>
                    <input
                      type="number"
                      value={formData.maxStock}
                      onChange={(e) => setFormData({...formData, maxStock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1000"
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
                      placeholder="₹350"
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
                      placeholder="Store Room A - Shelf 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="JK Paper Ltd."
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
                  Add Item
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
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Edit Item</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditItem} className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.itemCode}
                      onChange={(e) => setFormData({...formData, itemCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.itemName}
                      onChange={(e) => setFormData({...formData, itemName: e.target.value})}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h3>
                <div className="grid grid-cols-3 gap-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Stock Level</label>
                    <input
                      type="number"
                      value={formData.maxStock}
                      onChange={(e) => setFormData({...formData, maxStock: e.target.value})}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) => setFormData({...formData, supplier: e.target.value})}
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
                  onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}