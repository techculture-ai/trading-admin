'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, ShoppingCart, X, Eye, Edit, Trash2, Calendar } from 'lucide-react'

interface ProcurementOrder {
  id: string
  poNumber: string
  vendor: string
  vendorContact: string
  category: string
  orderDate: string
  deliveryDate: string
  totalAmount: string
  status: 'Delivered' | 'In Transit' | 'Pending' | 'Cancelled' | 'Partial'
  items: number
  paymentTerms?: string
  shippingAddress?: string
  remarks?: string
  itemsList?: {
    itemName: string
    quantity: number
    unit: string
    unitPrice: string
    totalPrice: string
  }[]
}

const initialProcurements: ProcurementOrder[] = [
  {
    id: 'PO-GS-001',
    poNumber: 'PO/GS/2024/001',
    vendor: 'ABC Stationery Mart',
    vendorContact: '+91 9876543210',
    category: 'Stationery',
    orderDate: '2025-10-20',
    deliveryDate: '2025-10-30',
    totalAmount: '₹2,50,000',
    status: 'Delivered',
    items: 12,
    paymentTerms: 'Net 30 days',
    shippingAddress: 'Main Office, Lucknow',
    remarks: 'Regular monthly order',
    itemsList: [
      { itemName: 'A4 Paper', quantity: 200, unit: 'Ream', unitPrice: '₹350', totalPrice: '₹70,000' },
      { itemName: 'Ball Pens', quantity: 500, unit: 'Box', unitPrice: '₹120', totalPrice: '₹60,000' },
    ]
  },
  {
    id: 'PO-GS-002',
    poNumber: 'PO/GS/2024/002',
    vendor: 'XYZ IT Solutions',
    vendorContact: '+91 9876543211',
    category: 'IT Consumables',
    orderDate: '2025-10-22',
    deliveryDate: '2025-11-05',
    totalAmount: '₹1,80,000',
    status: 'In Transit',
    items: 8,
    paymentTerms: 'Advance 50%',
    shippingAddress: 'IT Department, Lucknow',
    remarks: 'Urgent requirement',
    itemsList: [
      { itemName: 'Printer Cartridges', quantity: 50, unit: 'Piece', unitPrice: '₹2,500', totalPrice: '₹1,25,000' },
    ]
  },
  {
    id: 'PO-GS-003',
    poNumber: 'PO/GS/2024/003',
    vendor: 'Modern Furniture Co.',
    vendorContact: '+91 9876543212',
    category: 'Furniture',
    orderDate: '2025-10-24',
    deliveryDate: '2025-11-10',
    totalAmount: '₹4,50,000',
    status: 'Pending',
    items: 15,
    paymentTerms: 'Net 45 days',
    shippingAddress: 'Main Office, Lucknow',
    remarks: 'New office setup',
    itemsList: [
      { itemName: 'Office Chairs', quantity: 30, unit: 'Piece', unitPrice: '₹12,000', totalPrice: '₹3,60,000' },
    ]
  },
]

const categories = ['Stationery', 'IT Consumables', 'Furniture', 'Electrical', 'Plumbing', 'Hardware', 'Safety Equipment', 'Cleaning Supplies', 'Other']
const paymentTermsList = ['Immediate', 'Net 15 days', 'Net 30 days', 'Net 45 days', 'Net 60 days', 'Advance 25%', 'Advance 50%', 'Advance 100%']

export default function GeneralStoreProcurementPage() {
  const router = useRouter()
  const [procurements, setProcurements] = useState<ProcurementOrder[]>(initialProcurements)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPO, setSelectedPO] = useState<ProcurementOrder | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    vendor: '',
    vendorContact: '',
    category: 'Stationery',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    totalAmount: '',
    paymentTerms: 'Net 30 days',
    shippingAddress: '',
    remarks: '',
    items: '1',
  })

  const handleAddPO = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newPO: ProcurementOrder = {
      id: `PO-GS-${String(procurements.length + 1).padStart(3, '0')}`,
      poNumber: `PO/GS/2024/${String(procurements.length + 1).padStart(3, '0')}`,
      ...formData,
      items: parseInt(formData.items) || 1,
      status: 'Pending',
    }
    setProcurements([...procurements, newPO])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditPO = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPO) return
    
    setProcurements(procurements.map(po => 
      po.id === selectedPO.id 
        ? { ...po, ...formData, items: parseInt(formData.items) || 1 }
        : po
    ))
    setShowEditModal(false)
    setSelectedPO(null)
    resetForm()
  }

  const handleDeletePO = (id: string) => {
    if (confirm('Are you sure you want to delete this purchase order?')) {
      setProcurements(procurements.filter(po => po.id !== id))
    }
  }

  const handleViewPO = (po: ProcurementOrder) => {
    router.push(`/general-store/procurement/${po.id}`)
  }

  const handleEditClick = (po: ProcurementOrder) => {
    setSelectedPO(po)
    setFormData({
      vendor: po.vendor,
      vendorContact: po.vendorContact,
      category: po.category,
      orderDate: po.orderDate,
      deliveryDate: po.deliveryDate,
      totalAmount: po.totalAmount,
      paymentTerms: po.paymentTerms || 'Net 30 days',
      shippingAddress: po.shippingAddress || '',
      remarks: po.remarks || '',
      items: po.items.toString(),
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      vendor: '',
      vendorContact: '',
      category: 'Stationery',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      totalAmount: '',
      paymentTerms: 'Net 30 days',
      shippingAddress: '',
      remarks: '',
      items: '1',
    })
  }

  const handleExport = () => {
    const csv = [
      ['PO ID', 'PO Number', 'Vendor', 'Category', 'Order Date', 'Delivery Date', 'Total Amount', 'Items', 'Status'].join(','),
      ...filteredProcurements.map(p => 
        [p.id, p.poNumber, p.vendor, p.category, p.orderDate, p.deliveryDate, p.totalAmount, p.items, p.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'procurement-orders.csv'
    a.click()
  }

  const filteredProcurements = procurements.filter(po => {
    const matchesSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || po.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalPOValue = procurements.reduce((sum, po) => 
    sum + (parseFloat(po.totalAmount.replace(/[^0-9]/g, '')) || 0), 0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Procurement Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage purchase orders and vendor transactions</p>
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
            <span>Create PO</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total POs (2024)</p>
          <h3 className="text-3xl font-bold text-gray-900">{procurements.length}</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Value</p>
          <h3 className="text-2xl font-bold text-green-600">₹{(totalPOValue / 10000000).toFixed(2)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">Procurement spend</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active POs</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {procurements.filter(p => p.status === 'In Transit' || p.status === 'Pending').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Delivery</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {procurements.filter(p => p.status === 'Pending').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Awaiting receipt</p>
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
                  placeholder="Search purchase orders..."
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
                      {['Delivered', 'In Transit', 'Pending', 'Partial', 'Cancelled'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProcurements.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{po.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{po.poNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{po.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(po.orderDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(po.deliveryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{po.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{po.items} items</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      po.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      po.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                      po.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                      po.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewPO(po)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(po)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeletePO(po.id)}
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

      {/* Add PO Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Create Purchase Order</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddPO} className="p-6 space-y-6">
              {/* Vendor Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.vendor}
                      onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="ABC Stationery Mart"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vendor Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.vendorContact}
                      onChange={(e) => setFormData({...formData, vendorContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 9876543210"
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
                </div>
              </div>

              {/* Order Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.orderDate}
                      onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Delivery Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.totalAmount}
                      onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹2,50,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Items <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.items}
                      onChange={(e) => setFormData({...formData, items: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Terms <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {paymentTermsList.map(term => (
                        <option key={term} value={term}>{term}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      value={formData.shippingAddress}
                      onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Main Office, Lucknow"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter any additional remarks..."
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
                  Create Purchase Order
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
              <h2 className="text-xl font-bold text-gray-900">Edit Purchase Order</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedPO(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditPO} className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.vendor}
                      onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vendor Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.vendorContact}
                      onChange={(e) => setFormData({...formData, vendorContact: e.target.value})}
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
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.orderDate}
                      onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Delivery Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.totalAmount}
                      onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Items <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.items}
                      onChange={(e) => setFormData({...formData, items: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Terms <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {paymentTermsList.map(term => (
                        <option key={term} value={term}>{term}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                    <input
                      type="text"
                      value={formData.shippingAddress}
                      onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedPO(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}