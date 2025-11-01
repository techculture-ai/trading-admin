'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calculator, DollarSign, TrendingUp, Calendar, CheckCircle, Clock, Share2, Printer, Edit, Home } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface PricingDetails {
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
  area: string
  preferredLocationCharge: string
  gardenFacingCharge: string
  clubMembershipCharge: string
  gstPercentage: string
  discount: string
  registrationCharges: string
  maintenanceDeposit: string
  pricingInfo: {
    createdDate: string
    createdBy: string
    lastModified: string
    modifiedBy: string
    version: string
  }
  priceBreakdown: {
    component: string
    rate: string
    amount: string
  }[]
  priceHistory: {
    date: string
    basePrice: string
    changedBy: string
    reason: string
  }[]
  applicableUnits: {
    unitNo: string
    floor: number
    area: string
    isCorner: boolean
    calculatedPrice: string
  }[]
  timeline: {
    date: string
    event: string
    details: string
    performedBy: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function PricingDetailsPage() {
  const router = useRouter()
  const params = useParams()
    const isLoading = usePageLoading(1000)
  
  const [pricing] = useState<PricingDetails>({
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
    pricingInfo: {
      createdDate: '2024-01-01',
      createdBy: 'Admin - techculture-ai',
      lastModified: '2024-10-15',
      modifiedBy: 'Admin - techculture-ai',
      version: 'v2.0',
    },
    priceBreakdown: [
      { component: 'Base Price (1050 sq.ft @ ₹4,200/sq.ft)', rate: '₹4,200/sq.ft', amount: '₹44,10,000' },
      { component: 'Floor Rise Charge (above 3rd floor)', rate: '₹150/sq.ft', amount: '₹0' },
      { component: 'Corner Unit Charge', rate: '₹200/sq.ft', amount: '₹0' },
      { component: 'Parking Charges (1 slot)', rate: '₹2,00,000', amount: '₹2,00,000' },
      { component: 'Club Membership', rate: '₹50,000', amount: '₹50,000' },
      { component: 'Subtotal', rate: '-', amount: '₹46,60,000' },
      { component: 'GST (5%)', rate: '5%', amount: '₹2,33,000' },
      { component: 'Discount (5%)', rate: '5%', amount: '-₹2,33,000' },
      { component: 'Registration Charges', rate: '-', amount: '₹50,000' },
      { component: 'Maintenance Deposit', rate: '-', amount: '₹75,000' },
    ],
    priceHistory: [
      {
        date: '2024-10-15',
        basePrice: '₹4,200/sq.ft',
        changedBy: 'Admin - techculture-ai',
        reason: 'Market adjustment - 5% increase',
      },
      {
        date: '2024-07-01',
        basePrice: '₹4,000/sq.ft',
        changedBy: 'Admin - techculture-ai',
        reason: 'Mid-year revision',
      },
      {
        date: '2024-01-01',
        basePrice: '₹3,800/sq.ft',
        changedBy: 'Admin - techculture-ai',
        reason: 'Initial pricing',
      },
    ],
    applicableUnits: [
      { unitNo: 'A-0301', floor: 3, area: '1050 sq.ft', isCorner: false, calculatedPrice: '₹47,10,000' },
      { unitNo: 'A-0302', floor: 3, area: '1050 sq.ft', isCorner: true, calculatedPrice: '₹49,20,000' },
      { unitNo: 'A-0401', floor: 4, area: '1050 sq.ft', isCorner: false, calculatedPrice: '₹48,67,500' },
      { unitNo: 'A-0402', floor: 4, area: '1050 sq.ft', isCorner: true, calculatedPrice: '₹50,77,500' },
      { unitNo: 'B-0501', floor: 5, area: '1050 sq.ft', isCorner: false, calculatedPrice: '₹50,25,000' },
    ],
    timeline: [
      {
        date: '2024-10-31',
        event: 'Price Applied to Unit A-1205',
        details: 'Pricing rule applied to new booking',
        performedBy: 'Sales Officer - Priya Sharma',
      },
      {
        date: '2024-10-15',
        event: 'Price Revision',
        details: 'Base price updated from ₹4,000 to ₹4,200 per sq.ft',
        performedBy: 'Admin - techculture-ai',
      },
      {
        date: '2024-07-01',
        event: 'Mid-Year Revision',
        details: 'Pricing updated based on market conditions',
        performedBy: 'Admin - techculture-ai',
      },
      {
        date: '2024-01-01',
        event: 'Pricing Rule Created',
        details: 'Initial pricing rule established for 2 BHK units',
        performedBy: 'Admin - techculture-ai',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-31 09:57:09',
      action: 'Price Applied',
      performedBy: 'Sales Officer - Priya Sharma',
      details: 'Pricing rule applied to unit booking A-1205',
    },
    {
      id: 'AL-002',
      timestamp: '2024-10-15 10:30:00',
      action: 'Price Updated',
      performedBy: 'Admin - techculture-ai',
      details: 'Base price updated to ₹4,200/sq.ft',
    },
    {
      id: 'AL-003',
      timestamp: '2024-07-01 14:00:00',
      action: 'Price Revised',
      performedBy: 'Admin - techculture-ai',
      details: 'Mid-year price revision implemented',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-01 09:00:00',
      action: 'Pricing Created',
      performedBy: 'Admin - techculture-ai',
      details: 'Initial pricing rule created',
    },
  ])

  const handleExport = () => {
    const content = `
PRICING DETAILS REPORT
======================

Pricing ID: ${pricing.id}
Project: ${pricing.projectName}
Unit Type: ${pricing.unitType}
Status: ${pricing.status}

PRICING INFORMATION
===================
Base Price: ${pricing.basePrice}
Floor Rise Charge: ${pricing.floorRiseCharge}
Corner Charge: ${pricing.cornerCharge}
Parking Charge: ${pricing.parkingCharge}
Preferred Location: ${pricing.preferredLocationCharge}
Garden Facing: ${pricing.gardenFacingCharge}
Club Membership: ${pricing.clubMembershipCharge}
GST: ${pricing.gstPercentage}
Discount: ${pricing.discount}
Registration: ${pricing.registrationCharges}
Maintenance Deposit: ${pricing.maintenanceDeposit}

EFFECTIVE DATE
==============
From: ${new Date(pricing.effectiveDate).toLocaleDateString('en-IN')}

PRICE BREAKDOWN
===============
${pricing.priceBreakdown.map(item => `${item.component}: ${item.amount}`).join('\n')}

PRICE HISTORY
=============
${pricing.priceHistory.map(h => `${h.date} - ${h.basePrice}\n   Changed by: ${h.changedBy}\n   Reason: ${h.reason}`).join('\n\n')}

APPLICABLE UNITS
================
${pricing.applicableUnits.map(u => `Unit ${u.unitNo} (Floor ${u.floor})\n   Area: ${u.area}\n   Corner: ${u.isCorner ? 'Yes' : 'No'}\n   Price: ${u.calculatedPrice}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Pricing_${pricing.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Inactive':
        return 'bg-gray-100 text-gray-700'
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700'
      case 'Expired':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }
if (isLoading) {
    return <DetailsSkeleton />
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pricing Rule - {pricing.id}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {pricing.projectName} • {pricing.unitType}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(pricing.status)}`}>
            {pricing.status}
          </span>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm mb-2 text-green-100">Pricing Status</p>
            <h2 className="text-4xl font-bold">{pricing.status}</h2>
            <p className="text-sm mt-2 text-green-100">
              Base Price: {pricing.basePrice} • Effective from {new Date(pricing.effectiveDate).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Calculator size={40} className="text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Base Price</p>
              <h3 className="text-2xl font-bold text-gray-900">{pricing.basePrice}</h3>
              <p className="text-xs text-gray-500 mt-2">Per sq.ft</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Typical Unit Price</p>
              <h3 className="text-2xl font-bold text-green-600">{pricing.finalPrice}</h3>
              <p className="text-xs text-gray-500 mt-2">{pricing.area}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Home size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Version</p>
              <h3 className="text-2xl font-bold text-orange-600">{pricing.pricingInfo.version}</h3>
              <p className="text-xs text-gray-500 mt-2">Current version</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Applicable Units</p>
              <h3 className="text-2xl font-bold text-purple-600">{pricing.applicableUnits.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Units using this rule</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Pricing Information</h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Pricing ID</p>
            <p className="text-sm font-medium text-gray-900">{pricing.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project</p>
            <p className="text-sm font-medium text-gray-900">{pricing.projectName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Unit Type</p>
            <p className="text-sm font-medium text-gray-900">{pricing.unitType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Carpet Area</p>
            <p className="text-sm font-medium text-gray-900">{pricing.area}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Effective Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(pricing.effectiveDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Created Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(pricing.pricingInfo.createdDate).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Last Modified</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(pricing.pricingInfo.lastModified).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(pricing.status)}`}>
              {pricing.status}
            </span>
          </div>
        </div>
      </div>

      {/* Price Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Base Components</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Base Price</span>
              <span className="text-lg font-bold text-blue-600">{pricing.basePrice}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Floor Rise Charge</span>
              <span className="text-sm font-medium text-gray-900">{pricing.floorRiseCharge}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Corner Charge</span>
              <span className="text-sm font-medium text-gray-900">{pricing.cornerCharge}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Parking Charge</span>
              <span className="text-sm font-medium text-gray-900">{pricing.parkingCharge}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Components</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Preferred Location</span>
              <span className="text-sm font-medium text-gray-900">{pricing.preferredLocationCharge}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Garden Facing</span>
              <span className="text-sm font-medium text-gray-900">{pricing.gardenFacingCharge}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Club Membership</span>
              <span className="text-sm font-medium text-gray-900">{pricing.clubMembershipCharge}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">GST</span>
              <span className="text-sm font-medium text-gray-900">{pricing.gstPercentage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Price Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pricing.priceBreakdown.map((item, index) => (
                <tr key={index} className={item.component.includes('Subtotal') || item.component.includes('Total') ? 'bg-gray-50 font-semibold' : ''}>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.component}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.rate}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">{item.amount}</td>
                </tr>
              ))}
              <tr className="bg-green-50 border-t-2 border-green-200">
                <td className="px-6 py-4 text-sm font-bold text-gray-900">Final Price</td>
                <td className="px-6 py-4 text-sm"></td>
                <td className="px-6 py-4 text-right text-2xl font-bold text-green-600">{pricing.finalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Price History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Price History
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pricing.priceHistory.map((history, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{new Date(history.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    <p className="text-lg font-bold text-orange-600 mt-1">{history.basePrice}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {history.changedBy}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{history.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Applicable Units */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Applicable Units ({pricing.applicableUnits.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Corner Unit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Calculated Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pricing.applicableUnits.map((unit, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.unitNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{unit.floor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{unit.area}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {unit.isCorner ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">Yes</span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600">{unit.calculatedPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Pricing Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pricing.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== pricing.timeline.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-gray-900">{event.event}</p>
                  <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    <Calendar size={12} className="inline mr-1" />
                    {new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} • By {event.performedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Activity Log
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {auditLogs.map((log, index) => (
              <div key={log.id} className="flex items-start space-x-4 relative">
                {index !== auditLogs.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    By {log.performedBy} • {new Date(log.timestamp).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-5 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Pricing ID</p>
            <p className="text-sm font-bold text-gray-900">{pricing.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Base Price</p>
            <p className="text-lg font-bold text-blue-600">{pricing.basePrice}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Typical Price</p>
            <p className="text-lg font-bold text-green-600">{pricing.finalPrice}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Version</p>
            <p className="text-lg font-bold text-orange-600">{pricing.pricingInfo.version}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className="text-lg font-bold text-green-600">{pricing.status}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button 
          onClick={handleExport}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Download Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Pricing</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Calculator size={20} />
          <span>Calculate Price</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share</span>
        </button>
        <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print</span>
        </button>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Pricing</span>
        </button>
      </div>
    </div>
  )
}