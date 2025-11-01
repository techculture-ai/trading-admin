'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, MapPin, User, FileText, DollarSign, Calendar, TrendingUp, CheckCircle, Clock, X as XIcon, Building, Navigation, Ruler, BarChart3 } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface ValuationDetails {
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
  remarks: string
  coordinates: string
  parcelDetails: {
    surveyNo: string
    khataNo: string
    village: string
    district: string
    zone: string
    landUse: string
    ownerName: string
  }
  valuationBreakdown: {
    description: string
    perAcre: string
    total: string
  }[]
  comparables: {
    location: string
    rate: string
    distance: string
    date: string
    area: string
  }[]
  marketAnalysis: {
    factor: string
    weight: string
    impact: string
  }[]
  approvalDetails: {
    approvedBy?: string
    approvedDate?: string
    rejectedBy?: string
    rejectedDate?: string
    rejectionReason?: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function LandValuationDetailsPage() {
  const router = useRouter()
  const params = useParams()
    const isLoading = usePageLoading(1000)
  
  // Mock data - in real app, fetch based on params.id
  const [valuation] = useState<ValuationDetails>({
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
    remarks: 'Land valuation based on recent sales in the vicinity. Market conditions are favorable with high demand for residential plots in the area. Three comparable sales were analyzed, all showing similar price trends.',
    coordinates: '26.8467° N, 80.9462° E',
    parcelDetails: {
      surveyNo: 'SUR-2024-145',
      khataNo: 'KH-456',
      village: 'Gomti Nagar',
      district: 'Lucknow',
      zone: 'Zone A (North)',
      landUse: 'Residential',
      ownerName: 'Ram Kumar Singh',
    },
    valuationBreakdown: [
      {
        description: 'Base Market Value',
        perAcre: '₹14,00,000',
        total: '₹35,00,000',
      },
      {
        description: 'Location Premium',
        perAcre: '₹1,50,000',
        total: '₹3,75,000',
      },
      {
        description: 'Accessibility Factor',
        perAcre: '₹50,000',
        total: '₹1,25,000',
      },
    ],
    comparables: [
      {
        location: 'Gomti Nagar Extension',
        rate: '₹15,50,000/acre',
        distance: '0.5 km',
        date: '05 Jan 2024',
        area: '2.0 acres',
      },
      {
        location: 'Viraj Khand',
        rate: '₹16,20,000/acre',
        distance: '1.2 km',
        date: '08 Jan 2024',
        area: '3.5 acres',
      },
      {
        location: 'Vikas Nagar',
        rate: '₹15,80,000/acre',
        distance: '0.8 km',
        date: '03 Jan 2024',
        area: '1.8 acres',
      },
    ],
    marketAnalysis: [
      {
        factor: 'Location & Accessibility',
        weight: '30%',
        impact: 'High',
      },
      {
        factor: 'Infrastructure Development',
        weight: '25%',
        impact: 'High',
      },
      {
        factor: 'Market Demand',
        weight: '20%',
        impact: 'Medium',
      },
      {
        factor: 'Land Use & Zoning',
        weight: '15%',
        impact: 'Medium',
      },
      {
        factor: 'Future Growth Potential',
        weight: '10%',
        impact: 'High',
      },
    ],
    approvalDetails: {
      approvedBy: 'Chief Valuation Officer',
      approvedDate: '12 Jan 2024',
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-10 09:00:00',
      action: 'Valuation Initiated',
      performedBy: 'Rajesh Sharma',
      details: 'Land valuation process started for parcel PAR-145',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-10 10:30:00',
      action: 'Site Visit Completed',
      performedBy: 'Rajesh Sharma',
      details: 'Physical inspection and measurement of land completed',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-10 14:00:00',
      action: 'Comparable Sales Analyzed',
      performedBy: 'Rajesh Sharma',
      details: 'Three comparable sales in vicinity analyzed for market rate',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-10 16:00:00',
      action: 'Valuation Report Submitted',
      performedBy: 'Rajesh Sharma',
      details: 'Final valuation report submitted for review',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-12 11:00:00',
      action: 'Valuation Approved',
      performedBy: 'Chief Valuation Officer',
      details: 'Valuation report reviewed and approved',
    },
  ])

  const handleExport = () => {
    const content = `
Land Valuation Report
=====================

Valuation ID: ${valuation.id}
Parcel ID: ${valuation.parcelId}
Status: ${valuation.status}

Property Details
================
Location: ${valuation.location}
Coordinates: ${valuation.coordinates}
Area: ${valuation.area}
Survey No: ${valuation.parcelDetails.surveyNo}
Khata No: ${valuation.parcelDetails.khataNo}
Village: ${valuation.parcelDetails.village}
District: ${valuation.parcelDetails.district}
Zone: ${valuation.parcelDetails.zone}
Land Use: ${valuation.parcelDetails.landUse}
Owner: ${valuation.parcelDetails.ownerName}

Valuation Details
=================
Valuation Date: ${valuation.valuationDate}
Valuation Method: ${valuation.method}
Valued By: ${valuation.valuedBy}

Guidance Value: ${valuation.guidanceValue}
Market Value: ${valuation.marketValue}
Assessed Value: ${valuation.assessedValue}
Total Assessed Value: ${valuation.totalValue}

Valuation Breakdown
===================
${valuation.valuationBreakdown.map(b => `${b.description}: ${b.perAcre} per acre (Total: ${b.total})`).join('\n')}

Comparable Sales
================
${valuation.comparables.map(c => `${c.location} (${c.distance}): ${c.rate} - ${c.area} - ${c.date}`).join('\n')}

Market Analysis
===============
${valuation.marketAnalysis.map(m => `${m.factor} (Weight: ${m.weight}): ${m.impact} Impact`).join('\n')}

Approval Details
================
${valuation.status === 'Approved' ? `Approved By: ${valuation.approvalDetails.approvedBy}\nApproved Date: ${valuation.approvalDetails.approvedDate}` : 
valuation.status === 'Rejected' ? `Rejected By: ${valuation.approvalDetails.rejectedBy}\nRejected Date: ${valuation.approvalDetails.rejectedDate}\nReason: ${valuation.approvalDetails.rejectionReason}` :
'Status: Pending Review'}

Remarks
=======
${valuation.remarks}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `valuation_${valuation.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700'
      case 'Pending Review':
        return 'bg-orange-100 text-orange-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Pending Review':
        return <Clock size={40} className="text-orange-600" />
      case 'Rejected':
        return <XIcon size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-green-600 font-semibold'
      case 'Medium':
        return 'text-blue-600 font-medium'
      case 'Low':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const guidanceVal = parseFloat(valuation.guidanceValue.replace(/[^0-9]/g, '')) || 0
  const marketVal = parseFloat(valuation.marketValue.replace(/[^0-9]/g, '')) || 0
  const variance = ((marketVal - guidanceVal) / guidanceVal * 100).toFixed(1)


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
            <h1 className="text-2xl font-bold text-gray-900">Valuation {valuation.id}</h1>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <MapPin size={14} className="mr-1" />
              {valuation.location} • Parcel: {valuation.parcelId}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(valuation.status)}`}>
            {valuation.status}
          </span>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Valuation Card */}
      <div className={`rounded-lg p-8 text-white ${
        valuation.status === 'Approved' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        valuation.status === 'Rejected' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              valuation.status === 'Approved' ? 'text-green-100' :
              valuation.status === 'Rejected' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              Total Assessed Value
            </p>
            <h2 className="text-4xl font-bold">{valuation.totalValue}</h2>
            <p className={`text-sm mt-2 ${
              valuation.status === 'Approved' ? 'text-green-100' :
              valuation.status === 'Rejected' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              {valuation.area} • {valuation.assessedValue} per acre • Method: {valuation.method}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(valuation.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Guidance Value</p>
              <h3 className="text-xl font-bold text-gray-900">{valuation.guidanceValue}</h3>
              <p className="text-xs text-gray-500 mt-2">Government rate</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Market Value</p>
              <h3 className="text-xl font-bold text-green-600">{valuation.marketValue}</h3>
              <p className="text-xs text-gray-500 mt-2">Current market rate</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Assessed Value</p>
              <h3 className="text-xl font-bold text-purple-600">{valuation.assessedValue}</h3>
              <p className="text-xs text-gray-500 mt-2">Final assessment</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Variance</p>
              <h3 className={`text-2xl font-bold ${parseFloat(variance) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {parseFloat(variance) >= 0 ? '+' : ''}{variance}%
              </h3>
              <p className="text-xs text-gray-500 mt-2">vs guidance value</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Valuation Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Valuation Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Valuation ID</p>
            <p className="text-sm font-medium text-gray-900">{valuation.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Parcel ID</p>
            <p className="text-sm font-medium text-gray-900">{valuation.parcelId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Land Area</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Ruler size={14} className="mr-1" />
              {valuation.area}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Valuation Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {valuation.valuationDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Valued By</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {valuation.valuedBy}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Valuation Method</p>
            <p className="text-sm font-medium text-gray-900">{valuation.method}</p>
          </div>
        </div>
      </div>

      {/* Parcel Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <MapPin size={20} className="mr-2" />
          Parcel Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Survey Number</p>
            <p className="text-sm font-medium text-gray-900">{valuation.parcelDetails.surveyNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Khata Number</p>
            <p className="text-sm font-medium text-gray-900">{valuation.parcelDetails.khataNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Owner Name</p>
            <p className="text-sm font-medium text-gray-900">{valuation.parcelDetails.ownerName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Village</p>
            <p className="text-sm font-medium text-gray-900">{valuation.parcelDetails.village}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">District</p>
            <p className="text-sm font-medium text-gray-900">{valuation.parcelDetails.district}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Zone</p>
            <p className="text-sm font-medium text-gray-900">{valuation.parcelDetails.zone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Land Use</p>
            <p className="text-sm font-medium text-gray-900">{valuation.parcelDetails.landUse}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">GPS Coordinates</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Navigation size={14} className="mr-1" />
              {valuation.coordinates}
            </p>
          </div>
        </div>
      </div>

      {/* Valuation Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign size={20} className="mr-2" />
          Valuation Breakdown
        </h3>
        <div className="space-y-3">
          {valuation.valuationBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.description}</p>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Per Acre</p>
                  <p className="text-sm font-medium text-gray-900">{item.perAcre}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-sm font-bold text-gray-900">{item.total}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-orange-100 rounded-lg border-2 border-orange-200 mt-4">
            <p className="text-base font-bold text-orange-900">Final Assessed Value</p>
            <p className="text-2xl font-bold text-orange-900">{valuation.totalValue}</p>
          </div>
        </div>
      </div>

      {/* Comparable Sales */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Building size={20} className="mr-2" />
            Comparable Sales Analysis
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate per Acre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sale Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {valuation.comparables.map((comp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{comp.location}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">{comp.rate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{comp.distance}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{comp.area}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{comp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 size={20} className="mr-2" />
          Market Analysis Factors
        </h3>
        <div className="space-y-3">
          {valuation.marketAnalysis.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{factor.factor}</p>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center px-4">
                  <p className="text-xs text-gray-500 mb-1">Weight</p>
                  <p className="text-sm font-semibold text-blue-600">{factor.weight}</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-xs text-gray-500 mb-1">Impact</p>
                  <p className={`text-sm ${getImpactColor(factor.impact)}`}>{factor.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval Details */}
      {(valuation.status === 'Approved' || valuation.status === 'Rejected') && (
        <div className={`rounded-lg border-2 p-6 ${
          valuation.status === 'Approved' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
        }`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            {valuation.status === 'Approved' ? (
              <>
                <CheckCircle size={20} className="mr-2 text-green-600" />
                <span className="text-green-900">Approval Details</span>
              </>
            ) : (
              <>
                <XIcon size={20} className="mr-2 text-red-600" />
                <span className="text-red-900">Rejection Details</span>
              </>
            )}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {valuation.status === 'Approved' ? (
              <>
                <div>
                  <p className={`text-xs mb-1 ${valuation.status === 'Approved' ? 'text-green-700' : 'text-red-700'}`}>
                    Approved By
                  </p>
                  <p className={`text-sm font-medium ${valuation.status === 'Approved' ? 'text-green-900' : 'text-red-900'}`}>
                    {valuation.approvalDetails.approvedBy}
                  </p>
                </div>
                <div>
                  <p className={`text-xs mb-1 ${valuation.status === 'Approved' ? 'text-green-700' : 'text-red-700'}`}>
                    Approved Date
                  </p>
                  <p className={`text-sm font-medium ${valuation.status === 'Approved' ? 'text-green-900' : 'text-red-900'}`}>
                    {valuation.approvalDetails.approvedDate}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs text-red-700 mb-1">Rejected By</p>
                  <p className="text-sm font-medium text-red-900">{valuation.approvalDetails.rejectedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-red-700 mb-1">Rejected Date</p>
                  <p className="text-sm font-medium text-red-900">{valuation.approvalDetails.rejectedDate}</p>
                </div>
                {valuation.approvalDetails.rejectionReason && (
                  <div className="col-span-2">
                    <p className="text-xs text-red-700 mb-1">Rejection Reason</p>
                    <p className="text-sm font-medium text-red-900">{valuation.approvalDetails.rejectionReason}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Remarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Valuation Remarks & Observations
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {valuation.remarks}
        </p>
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
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-orange-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        By {log.performedBy} • {new Date(log.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
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
            <p className="text-xs text-gray-600 mb-2">Valuation ID</p>
            <p className="text-lg font-bold text-gray-900">{valuation.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Area</p>
            <p className="text-lg font-bold text-blue-600">{valuation.area}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Rate per Acre</p>
            <p className="text-lg font-bold text-green-600">{valuation.assessedValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Value</p>
            <p className="text-lg font-bold text-purple-600">{valuation.totalValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              valuation.status === 'Approved' ? 'text-green-600' :
              valuation.status === 'Rejected' ? 'text-red-600' :
              'text-orange-600'
            }`}>
              {valuation.status}
            </p>
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
          <FileText size={20} />
          <span>Print Valuation</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Navigation size={20} />
          <span>View on Map</span>
        </button>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </button>
      </div>
    </div>
  )
}