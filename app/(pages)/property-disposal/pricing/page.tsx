'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, TrendingUp, Calculator, Download, Eye, Edit, Trash2, X } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface PricingRule {
  id: string
  projectName: string
  projectId: string
  unitType: string
  basePrice: string
  floorRiseCharge: string
  cornerCharge: string
  parkingCharge: string
  finalPrice: string
  effectiveDate: string
  status: 'Active' | 'Inactive' | 'Scheduled' | 'Expired'
  area?: string
  preferredLocationCharge?: string
  gardenFacingCharge?: string
  clubMembershipCharge?: string
  gstPercentage?: string
  discount?: string
  registrationCharges?: string
  maintenanceDeposit?: string
}

const initialPricings: PricingRule[] = [
  {
    id: 'PRICE-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    projectId: 'PROJ-001',
    unitType: '2BHK',
    basePrice: '₹4,200/sq.ft',
    floorRiseCharge: '₹150/sq.ft',
    cornerCharge: '₹200/sq.ft',
    parkingCharge: '₹2,00,000',
    finalPrice: '₹45,00,000',
    effectiveDate: '2024-01-01',
    status: 'Active',
    area: '1050 sq.ft',
    preferredLocationCharge: '₹100/sq.ft',
    gardenFacingCharge: '₹150/sq.ft',
    clubMembershipCharge: '₹50,000',
    gstPercentage: '5%',
    discount: '5%',
    registrationCharges: '₹50,000',
    maintenanceDeposit: '₹75,000',
  },
  {
    id: 'PRICE-2024-002',
    projectName: 'Hazratganj Apartments',
    projectId: 'PROJ-002',
    unitType: '3BHK',
    basePrice: '₹4,800/sq.ft',
    floorRiseCharge: '₹200/sq.ft',
    cornerCharge: '₹250/sq.ft',
    parkingCharge: '₹2,50,000',
    finalPrice: '₹62,00,000',
    effectiveDate: '2024-01-15',
    status: 'Active',
    area: '1450 sq.ft',
    preferredLocationCharge: '₹120/sq.ft',
    gardenFacingCharge: '₹180/sq.ft',
    clubMembershipCharge: '₹75,000',
    gstPercentage: '5%',
    discount: '3%',
    registrationCharges: '₹75,000',
    maintenanceDeposit: '₹1,00,000',
  },
]

const projects = ['Gomti Nagar Housing Scheme', 'Hazratganj Apartments', 'Aliganj Residency']
const unitTypes = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Penthouse', 'Villa']

export default function PricingEnginePage() {
  const router = useRouter()
  const [pricings, setPricings] = useState<PricingRule[]>(initialPricings)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [selectedPricing, setSelectedPricing] = useState<PricingRule | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const isLoading = usePageLoading(1000)

  const [formData, setFormData] = useState({
    projectName: 'Gomti Nagar Housing Scheme',
    projectId: 'PROJ-001',
    unitType: '2 BHK',
    area: '',
    basePrice: '',
    floorRiseCharge: '',
    cornerCharge: '',
    parkingCharge: '',
    preferredLocationCharge: '',
    gardenFacingCharge: '',
    clubMembershipCharge: '',
    gstPercentage: '5',
    discount: '0',
    registrationCharges: '',
    maintenanceDeposit: '',
    effectiveDate: new Date().toISOString().split('T')[0],
  })

  const [calculatorData, setCalculatorData] = useState({
    project: '',
    unitType: '',
    area: '',
    floor: '',
    isCorner: false,
    hasPreferredLocation: false,
    isGardenFacing: false,
    parkingSlots: 1,
  })

  const [calculatedPrice, setCalculatedPrice] = useState<any>(null)

  const handleAddPricing = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newPricing: PricingRule = {
      id: `PRICE-2024-${String(pricings.length + 1).padStart(3, '0')}`,
      ...formData,
      basePrice: `₹${formData.basePrice}/sq.ft`,
      floorRiseCharge: `₹${formData.floorRiseCharge}/sq.ft`,
      cornerCharge: `₹${formData.cornerCharge}/sq.ft`,
      parkingCharge: `₹${formData.parkingCharge}`,
      preferredLocationCharge: `₹${formData.preferredLocationCharge}/sq.ft`,
      gardenFacingCharge: `₹${formData.gardenFacingCharge}/sq.ft`,
      clubMembershipCharge: `₹${formData.clubMembershipCharge}`,
      registrationCharges: `₹${formData.registrationCharges}`,
      maintenanceDeposit: `₹${formData.maintenanceDeposit}`,
      gstPercentage: `${formData.gstPercentage}%`,
      discount: `${formData.discount}%`,
      area: `${formData.area} sq.ft`,
      finalPrice: '₹0', // Will be calculated
      status: 'Active',
    }
    
    setPricings([...pricings, newPricing])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditPricing = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPricing) return
    
    setPricings(pricings.map(pricing => 
      pricing.id === selectedPricing.id 
        ? { 
            ...pricing, 
            ...formData,
            basePrice: `₹${formData.basePrice}/sq.ft`,
            floorRiseCharge: `₹${formData.floorRiseCharge}/sq.ft`,
            cornerCharge: `₹${formData.cornerCharge}/sq.ft`,
            parkingCharge: `₹${formData.parkingCharge}`,
            area: `${formData.area} sq.ft`,
          }
        : pricing
    ))
    setShowEditModal(false)
    setSelectedPricing(null)
    resetForm()
  }

  const handleDeletePricing = (id: string) => {
    if (confirm('Are you sure you want to delete this pricing rule?')) {
      setPricings(pricings.filter(p => p.id !== id))
    }
  }

  const handleViewPricing = (pricing: PricingRule) => {
    router.push(`/property-disposal/pricing/${pricing.id}`)
  }

  const handleEditClick = (pricing: PricingRule) => {
    setSelectedPricing(pricing)
    setFormData({
      projectName: pricing.projectName,
      projectId: pricing.projectId,
      unitType: pricing.unitType,
      area: pricing.area?.replace(' sq.ft', '') || '',
      basePrice: pricing.basePrice.replace(/[^0-9]/g, ''),
      floorRiseCharge: pricing.floorRiseCharge.replace(/[^0-9]/g, ''),
      cornerCharge: pricing.cornerCharge.replace(/[^0-9]/g, ''),
      parkingCharge: pricing.parkingCharge.replace(/[^0-9]/g, ''),
      preferredLocationCharge: pricing.preferredLocationCharge?.replace(/[^0-9]/g, '') || '',
      gardenFacingCharge: pricing.gardenFacingCharge?.replace(/[^0-9]/g, '') || '',
      clubMembershipCharge: pricing.clubMembershipCharge?.replace(/[^0-9]/g, '') || '',
      gstPercentage: pricing.gstPercentage?.replace('%', '') || '5',
      discount: pricing.discount?.replace('%', '') || '0',
      registrationCharges: pricing.registrationCharges?.replace(/[^0-9]/g, '') || '',
      maintenanceDeposit: pricing.maintenanceDeposit?.replace(/[^0-9]/g, '') || '',
      effectiveDate: pricing.effectiveDate,
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      projectName: 'Gomti Nagar Housing Scheme',
      projectId: 'PROJ-001',
      unitType: '2 BHK',
      area: '',
      basePrice: '',
      floorRiseCharge: '',
      cornerCharge: '',
      parkingCharge: '',
      preferredLocationCharge: '',
      gardenFacingCharge: '',
      clubMembershipCharge: '',
      gstPercentage: '5',
      discount: '0',
      registrationCharges: '',
      maintenanceDeposit: '',
      effectiveDate: new Date().toISOString().split('T')[0],
    })
  }

  const calculatePrice = () => {
    const area = parseFloat(calculatorData.area) || 0
    const floor = parseInt(calculatorData.floor) || 0
    const basePrice = 4200 // Sample base price
    const floorRise = 150
    const cornerCharge = 200
    const preferredLocationCharge = 100
    const gardenFacingCharge = 150
    const parkingCharge = 200000
    
    let totalPrice = area * basePrice
    
    // Floor rise charges (after 3rd floor)
    if (floor > 3) {
      totalPrice += area * floorRise * (floor - 3)
    }
    
    // Corner charges
    if (calculatorData.isCorner) {
      totalPrice += area * cornerCharge
    }
    
    // Preferred location
    if (calculatorData.hasPreferredLocation) {
      totalPrice += area * preferredLocationCharge
    }
    
    // Garden facing
    if (calculatorData.isGardenFacing) {
      totalPrice += area * gardenFacingCharge
    }
    
    // Parking
    totalPrice += parkingCharge * calculatorData.parkingSlots
    
    // GST
    const gst = totalPrice * 0.05
    const totalWithGST = totalPrice + gst
    
    setCalculatedPrice({
      basePrice: totalPrice,
      gst: gst,
      total: totalWithGST,
      breakdown: {
        baseAmount: area * basePrice,
        floorRiseAmount: floor > 3 ? area * floorRise * (floor - 3) : 0,
        cornerAmount: calculatorData.isCorner ? area * cornerCharge : 0,
        preferredLocationAmount: calculatorData.hasPreferredLocation ? area * preferredLocationCharge : 0,
        gardenFacingAmount: calculatorData.isGardenFacing ? area * gardenFacingCharge : 0,
        parkingAmount: parkingCharge * calculatorData.parkingSlots,
      }
    })
  }

  const handleExport = () => {
    const csv = [
      ['Price ID', 'Project', 'Unit Type', 'Base Price', 'Floor Rise', 'Corner Charge', 'Parking', 'Effective Date', 'Status'].join(','),
      ...filteredPricings.map(p => 
        [p.id, p.projectName, p.unitType, p.basePrice, p.floorRiseCharge, p.cornerCharge, p.parkingCharge, p.effectiveDate, p.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pricing-rules.csv'
    a.click()
  }

  const filteredPricings = pricings.filter(pricing => {
    const matchesSearch = pricing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pricing.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pricing.unitType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || pricing.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const avgPrice = 4500
  const totalProjects = 15
  const discountsApplied = 45
  const avgDiscount = 7.5
if (isLoading) {
    return <DetailsSkeleton />
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pricing Engine</h1>
          <p className="text-sm text-gray-600 mt-1">Manage property pricing, escalations, and discounts</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowCalculator(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Calculator size={20} />
            <span>Price Calculator</span>
          </button>
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
            <span>Add Price Rule</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Avg. Price/Sq.ft</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{avgPrice.toLocaleString()}</h3>
              <div className="flex items-center mt-2">
                <TrendingUp size={14} className="text-green-600 mr-1" />
                <span className="text-xs text-green-600">+8% YoY</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Projects</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalProjects}</h3>
          <p className="text-xs text-gray-500 mt-2">With active pricing</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Discounts Applied</p>
          <h3 className="text-3xl font-bold text-orange-600">{discountsApplied}</h3>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Discount</p>
          <h3 className="text-3xl font-bold text-gray-900">{avgDiscount}%</h3>
          <p className="text-xs text-gray-500 mt-2">Standard discount</p>
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
                  placeholder="Search pricing rules..."
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
                      {['Active', 'Inactive', 'Scheduled', 'Expired'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor Rise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Corner Charge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Effective Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPricings.map((pricing) => (
                <tr key={pricing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pricing.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pricing.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.unitType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pricing.basePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.floorRiseCharge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.cornerCharge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pricing.parkingCharge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(pricing.effectiveDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      pricing.status === 'Active' ? 'bg-green-100 text-green-700' :
                      pricing.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                      pricing.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {pricing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewPricing(pricing)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(pricing)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeletePricing(pricing.id)}
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

      {/* Price Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Price Calculator</h2>
              <button 
                onClick={() => { setShowCalculator(false); setCalculatedPrice(null) }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <select
                    value={calculatorData.project}
                    onChange={(e) => setCalculatorData({...calculatorData, project: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
                  <select
                    value={calculatorData.unitType}
                    onChange={(e) => setCalculatorData({...calculatorData, unitType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Type</option>
                    {unitTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area (sq.ft)</label>
                  <input
                    type="number"
                    value={calculatorData.area}
                    onChange={(e) => setCalculatorData({...calculatorData, area: e.target.value})}
                    placeholder="Enter area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floor Number</label>
                  <input
                    type="number"
                    value={calculatorData.floor}
                    onChange={(e) => setCalculatorData({...calculatorData, floor: e.target.value})}
                    placeholder="Enter floor"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parking Slots</label>
                  <input
                    type="number"
                    value={calculatorData.parkingSlots}
                    onChange={(e) => setCalculatorData({...calculatorData, parkingSlots: parseInt(e.target.value) || 1})}
                    placeholder="Number of slots"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={calculatorData.isCorner}
                    onChange={(e) => setCalculatorData({...calculatorData, isCorner: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Corner Unit (Additional ₹200/sq.ft)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={calculatorData.hasPreferredLocation}
                    onChange={(e) => setCalculatorData({...calculatorData, hasPreferredLocation: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Preferred Location (Additional ₹100/sq.ft)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={calculatorData.isGardenFacing}
                    onChange={(e) => setCalculatorData({...calculatorData, isGardenFacing: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Garden Facing (Additional ₹150/sq.ft)</span>
                </label>
              </div>

              <button
                onClick={calculatePrice}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Calculate Price
              </button>

              {calculatedPrice && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Amount:</span>
                      <span className="font-medium">₹{calculatedPrice.breakdown.baseAmount.toLocaleString('en-IN')}</span>
                    </div>
                    {calculatedPrice.breakdown.floorRiseAmount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Floor Rise Charges:</span>
                        <span className="font-medium">₹{calculatedPrice.breakdown.floorRiseAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {calculatedPrice.breakdown.cornerAmount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Corner Charges:</span>
                        <span className="font-medium">₹{calculatedPrice.breakdown.cornerAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {calculatedPrice.breakdown.preferredLocationAmount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Preferred Location:</span>
                        <span className="font-medium">₹{calculatedPrice.breakdown.preferredLocationAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {calculatedPrice.breakdown.gardenFacingAmount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Garden Facing:</span>
                        <span className="font-medium">₹{calculatedPrice.breakdown.gardenFacingAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Parking Charges:</span>
                      <span className="font-medium">₹{calculatedPrice.breakdown.parkingAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{calculatedPrice.basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GST (5%):</span>
                      <span className="font-medium">₹{calculatedPrice.gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t-2 border-gray-400 pt-3 flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-600">₹{calculatedPrice.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Modal - Continued in next response due to length */}
      {/* Add Pricing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Add Pricing Rule</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddPricing} className="p-6 space-y-6">
              {/* Project Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
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
                      value={formData.unitType}
                      onChange={(e) => setFormData({...formData, unitType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {unitTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carpet Area (sq.ft) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1050"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Effective Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.effectiveDate}
                      onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Base Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Base Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price (per sq.ft) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.basePrice}
                        onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="4200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Floor Rise Charge (per sq.ft)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.floorRiseCharge}
                        onChange={(e) => setFormData({...formData, floorRiseCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="150"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Corner Charge (per sq.ft)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.cornerCharge}
                        onChange={(e) => setFormData({...formData, cornerCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parking Charge (per slot)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.parkingCharge}
                        onChange={(e) => setFormData({...formData, parkingCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="200000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Charges */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Charges</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Location Charge (per sq.ft)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.preferredLocationCharge}
                        onChange={(e) => setFormData({...formData, preferredLocationCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Garden Facing Charge (per sq.ft)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.gardenFacingCharge}
                        onChange={(e) => setFormData({...formData, gardenFacingCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="150"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Club Membership Charge
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.clubMembershipCharge}
                        onChange={(e) => setFormData({...formData, clubMembershipCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="50000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Charges
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.registrationCharges}
                        onChange={(e) => setFormData({...formData, registrationCharges: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="50000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintenance Deposit
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.maintenanceDeposit}
                        onChange={(e) => setFormData({...formData, maintenanceDeposit: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="75000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax & Discount */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax & Discount</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GST Percentage <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        value={formData.gstPercentage}
                        onChange={(e) => setFormData({...formData, gstPercentage: e.target.value})}
                        className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard Discount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => setFormData({...formData, discount: e.target.value})}
                        className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="5"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
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
                  Add Pricing Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Same structure as Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Edit Pricing Rule</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedPricing(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditPricing} className="p-6 space-y-6">
              {/* Same form fields as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="grid grid-cols-2 gap-4">
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
                      value={formData.unitType}
                      onChange={(e) => setFormData({...formData, unitType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {unitTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Carpet Area (sq.ft) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Effective Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.effectiveDate}
                      onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Base Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price (per sq.ft) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        required
                        value={formData.basePrice}
                        onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Floor Rise Charge (per sq.ft)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.floorRiseCharge}
                        onChange={(e) => setFormData({...formData, floorRiseCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Corner Charge (per sq.ft)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.cornerCharge}
                        onChange={(e) => setFormData({...formData, cornerCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parking Charge (per slot)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.parkingCharge}
                        onChange={(e) => setFormData({...formData, parkingCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Charges</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Location Charge (per sq.ft)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.preferredLocationCharge}
                        onChange={(e) => setFormData({...formData, preferredLocationCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Garden Facing Charge (per sq.ft)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.gardenFacingCharge}
                        onChange={(e) => setFormData({...formData, gardenFacingCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Club Membership Charge
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.clubMembershipCharge}
                        onChange={(e) => setFormData({...formData, clubMembershipCharge: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Charges
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.registrationCharges}
                        onChange={(e) => setFormData({...formData, registrationCharges: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintenance Deposit
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.maintenanceDeposit}
                        onChange={(e) => setFormData({...formData, maintenanceDeposit: e.target.value})}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax & Discount</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GST Percentage <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        value={formData.gstPercentage}
                        onChange={(e) => setFormData({...formData, gstPercentage: e.target.value})}
                        className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard Discount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => setFormData({...formData, discount: e.target.value})}
                        className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedPricing(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Pricing Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    
    </div>
  )
}