'use client'

import { useState } from 'react'
import { Search, Plus, Filter, X, TrendingUp, MapPin, Calendar, FileText, Eye, Edit, Trash2, CheckCircle, Clock } from 'lucide-react'

interface Valuation {
  id: string
  parcelId: string
  location: string
  area: string
  guidanceValue: string
  marketValue: string
  assessedValue: string
  totalValue: string
  valuationDate: string
  valuedBy: string
  status: 'Approved' | 'Pending Review' | 'Rejected'
  method: string
  remarks?: string
  coordinates?: string
  comparables?: Array<{
    location: string
    rate: string
    distance: string
  }>
}

const initialValuations: Valuation[] = [
  {
    id: 'VAL-001',
    parcelId: 'PAR-145',
    location: 'Gomti Nagar, Lucknow',
    area: '2.5 acres',
    guidanceValue: '₹15,00,000/acre',
    marketValue: '₹16,00,000/acre',
    assessedValue: '₹16,00,000/acre',
    totalValue: '₹40,00,000',
    valuationDate: '10 Jan 2024',
    valuedBy: 'Rajesh Sharma',
    status: 'Approved',
    method: 'Market Comparison',
    remarks: 'Based on recent sales in the area',
    coordinates: '26.8467° N, 80.9462° E',
    comparables: [
      { location: 'Gomti Nagar Ext', rate: '₹15,50,000/acre', distance: '0.5 km' },
      { location: 'Viraj Khand', rate: '₹16,20,000/acre', distance: '1.2 km' },
    ]
  },
  {
    id: 'VAL-002',
    parcelId: 'PAR-146',
    location: 'Hazratganj, Lucknow',
    area: '3.2 acres',
    guidanceValue: '₹18,00,000/acre',
    marketValue: '₹20,00,000/acre',
    assessedValue: '₹19,00,000/acre',
    totalValue: '₹60,80,000',
    valuationDate: '12 Jan 2024',
    valuedBy: 'Priya Verma',
    status: 'Pending Review',
    method: 'Income Capitalization',
    coordinates: '26.8547° N, 80.9420° E',
    comparables: [
      { location: 'Hazratganj Central', rate: '₹19,50,000/acre', distance: '0.3 km' },
    ]
  },
]

const valuationMethods = [
  'Market Comparison',
  'Income Capitalization',
  'Cost Approach',
  'Development Method',
  'Residual Method'
]

export default function LandValuationPage() {
  const [valuations, setValuations] = useState<Valuation[]>(initialValuations)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedValuation, setSelectedValuation] = useState<Valuation | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    parcelId: '',
    location: '',
    area: '',
    guidanceValue: '',
    marketValue: '',
    assessedValue: '',
    valuedBy: '',
    method: 'Market Comparison',
    remarks: '',
    coordinates: '',
  })

  const calculateTotalValue = () => {
    const area = parseFloat(formData.area.replace(/[^0-9.]/g, '')) || 0
    const assessedRate = parseFloat(formData.assessedValue.replace(/[^0-9]/g, '')) || 0
    return area * assessedRate
  }

  const handleAddValuation = (e: React.FormEvent) => {
    e.preventDefault()
    const total = calculateTotalValue()
    const newValuation: Valuation = {
      id: `VAL-${String(valuations.length + 1).padStart(3, '0')}`,
      ...formData,
      totalValue: `₹${total.toLocaleString('en-IN')}`,
      valuationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending Review',
      comparables: []
    }
    setValuations([...valuations, newValuation])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditValuation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedValuation) return
    
    const total = calculateTotalValue()
    setValuations(valuations.map(v => 
      v.id === selectedValuation.id 
        ? { ...v, ...formData, totalValue: `₹${total.toLocaleString('en-IN')}` }
        : v
    ))
    setShowEditModal(false)
    setSelectedValuation(null)
    resetForm()
  }

  const handleApproveValuation = (id: string) => {
    setValuations(valuations.map(v => 
      v.id === id ? { ...v, status: 'Approved' as const } : v
    ))
  }

  const handleRejectValuation = (id: string) => {
    if (confirm('Are you sure you want to reject this valuation?')) {
      setValuations(valuations.map(v => 
        v.id === id ? { ...v, status: 'Rejected' as const } : v
      ))
    }
  }

  const handleDeleteValuation = (id: string) => {
    if (confirm('Are you sure you want to delete this valuation?')) {
      setValuations(valuations.filter(v => v.id !== id))
    }
  }

  const handleViewValuation = (valuation: Valuation) => {
    setSelectedValuation(valuation)
    setShowViewModal(true)
  }

  const handleEditClick = (valuation: Valuation) => {
    setSelectedValuation(valuation)
    setFormData({
      parcelId: valuation.parcelId,
      location: valuation.location,
      area: valuation.area,
      guidanceValue: valuation.guidanceValue,
      marketValue: valuation.marketValue,
      assessedValue: valuation.assessedValue,
      valuedBy: valuation.valuedBy,
      method: valuation.method,
      remarks: valuation.remarks || '',
      coordinates: valuation.coordinates || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      parcelId: '',
      location: '',
      area: '',
      guidanceValue: '',
      marketValue: '',
      assessedValue: '',
      valuedBy: '',
      method: 'Market Comparison',
      remarks: '',
      coordinates: '',
    })
  }

  const filteredValuations = valuations.filter(valuation => {
    const matchesSearch = valuation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         valuation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         valuation.parcelId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || valuation.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const avgMarketValue = valuations.reduce((sum, v) => {
    const rate = parseFloat(v.marketValue.replace(/[^0-9]/g, '')) || 0
    return sum + rate
  }, 0) / valuations.length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Land Valuation</h1>
          <p className="text-sm text-gray-600 mt-1">Assess and manage land valuations and market benchmarks</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Valuation</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Market Value</p>
          <h3 className="text-2xl font-bold text-gray-900">₹{(avgMarketValue / 100000).toFixed(1)}L/acre</h3>
          <div className="flex items-center mt-2">
            <TrendingUp size={14} className="text-green-600 mr-1" />
            <span className="text-xs text-green-600">+12% YoY</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Valuations</p>
          <h3 className="text-3xl font-bold text-gray-900">{valuations.length}</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Review</p>
          <h3 className="text-3xl font-bold text-orange-600">
            {valuations.filter(v => v.status === 'Pending Review').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Approved</p>
          <h3 className="text-3xl font-bold text-green-600">
            {valuations.filter(v => v.status === 'Approved').length}
          </h3>
          <p className="text-xs text-gray-500 mt-2">Completed</p>
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
                  placeholder="Search valuations..."
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
                        onClick={() => { setFilterStatus('Approved'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Pending Review'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Pending Review
                      </button>
                      <button
                        onClick={() => { setFilterStatus('Rejected'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Rejected
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valuation ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parcel ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guidance Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assessed Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredValuations.map((val) => (
                <tr key={val.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{val.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{val.parcelId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{val.area}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{val.guidanceValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{val.marketValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{val.assessedValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{val.totalValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      val.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                      val.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {val.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewValuation(val)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {val.status === 'Pending Review' && (
                        <>
                          <button 
                            onClick={() => handleApproveValuation(val.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            onClick={() => handleEditClick(val)}
                            className="text-orange-600 hover:text-orange-700"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleDeleteValuation(val.id)}
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

      {/* Add Valuation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Add New Valuation</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddValuation} className="p-6 space-y-6">
              {/* Property Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
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
                      Area <span className="text-red-500">*</span>
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
                  <div className="col-span-2">
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
                </div>
              </div>

              {/* Valuation Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Valuation Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guidance Value (per acre) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guidanceValue}
                      onChange={(e) => setFormData({...formData, guidanceValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹15,00,000/acre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Value (per acre) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.marketValue}
                      onChange={(e) => setFormData({...formData, marketValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹16,00,000/acre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assessed Value (per acre) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.assessedValue}
                      onChange={(e) => setFormData({...formData, assessedValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹16,00,000/acre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valuation Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.method}
                      onChange={(e) => setFormData({...formData, method: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {valuationMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valued By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.valuedBy}
                      onChange={(e) => setFormData({...formData, valuedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Rajesh Sharma"
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Estimated Total Value:</span>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{calculateTotalValue().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks / Notes
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter any additional remarks or notes..."
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
                  Add Valuation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar to Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Valuation</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedValuation(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditValuation} className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
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
                      Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Valuation Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guidance Value (per acre) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guidanceValue}
                      onChange={(e) => setFormData({...formData, guidanceValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Value (per acre) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.marketValue}
                      onChange={(e) => setFormData({...formData, marketValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assessed Value (per acre) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.assessedValue}
                      onChange={(e) => setFormData({...formData, assessedValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valuation Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.method}
                      onChange={(e) => setFormData({...formData, method: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {valuationMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valued By <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.valuedBy}
                      onChange={(e) => setFormData({...formData, valuedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Estimated Total Value:</span>
                    <span className="text-xl font-bold text-gray-900">
                      ₹{calculateTotalValue().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
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
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedValuation(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Valuation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Valuation Modal */}
      {showViewModal && selectedValuation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Valuation Details - {selectedValuation.id}</h2>
              <button 
                onClick={() => { setShowViewModal(false); setSelectedValuation(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedValuation.status === 'Approved' ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : selectedValuation.status === 'Rejected' ? (
                    <X size={24} className="text-red-600" />
                  ) : (
                    <Clock size={24} className="text-orange-600" />
                  )}
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedValuation.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                    selectedValuation.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedValuation.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">Valued on {selectedValuation.valuationDate}</span>
              </div>

              {/* Property Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <MapPin size={18} className="mr-2" />
                  Property Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Parcel ID</label>
                    <p className="mt-1 text-gray-900 font-medium">{selectedValuation.parcelId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Area</label>
                    <p className="mt-1 text-gray-900">{selectedValuation.area}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p className="mt-1 text-gray-900">{selectedValuation.location}</p>
                  </div>
                  {selectedValuation.coordinates && (
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-500">GPS Coordinates</label>
                      <p className="mt-1 text-gray-900">{selectedValuation.coordinates}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Valuation Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <FileText size={18} className="mr-2" />
                  Valuation Assessment
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Guidance Value (per acre):</span>
                    <span className="text-sm font-medium text-gray-900">{selectedValuation.guidanceValue}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Market Value (per acre):</span>
                    <span className="text-sm font-medium text-gray-900">{selectedValuation.marketValue}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Assessed Value (per acre):</span>
                    <span className="text-sm font-medium text-gray-900">{selectedValuation.assessedValue}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-semibold text-gray-900">Total Assessed Value:</span>
                    <span className="text-2xl font-bold text-gray-900">{selectedValuation.totalValue}</span>
                  </div>
                </div>
              </div>

              {/* Method & Valuer */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-500">Valuation Method</label>
                  <p className="mt-2 text-gray-900 font-medium">{selectedValuation.method}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-500">Valued By</label>
                  <p className="mt-2 text-gray-900 font-medium">{selectedValuation.valuedBy}</p>
                </div>
              </div>

              {/* Comparables */}
              {selectedValuation.comparables && selectedValuation.comparables.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Comparable Sales</h3>
                  <div className="space-y-2">
                    {selectedValuation.comparables.map((comp, index) => (
                      <div key={index} className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{comp.location}</p>
                          <p className="text-xs text-gray-500">{comp.distance} away</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{comp.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Remarks */}
              {selectedValuation.remarks && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-900">Remarks / Notes</label>
                  <p className="mt-2 text-gray-700">{selectedValuation.remarks}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {selectedValuation.status === 'Pending Review' && (
                  <>
                    <button
                      onClick={() => { handleRejectValuation(selectedValuation.id); setShowViewModal(false) }}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => { handleApproveValuation(selectedValuation.id); setShowViewModal(false) }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Approve Valuation
                    </button>
                  </>
                )}
                <button
                  onClick={() => { setShowViewModal(false); setSelectedValuation(null) }}
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