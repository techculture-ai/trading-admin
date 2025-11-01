'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calculator, DollarSign, Calendar, User, FileText, CheckCircle, Clock, AlertCircle, TrendingUp, Share2, Printer, Edit, BarChart3, XCircle } from 'lucide-react'
import { usePageLoading } from '@/hooks/usePageLoading'
import { DetailsSkeleton } from '@/components/SkeletonLoader'

interface EstimateDetails {
  id: string
  projectId: string
  projectName: string
  materialCost: string
  labourCost: string
  equipmentCost: string
  overheads: string
  contingency: string
  totalCost: string
  status: 'Approved' | 'Under Review' | 'Pending' | 'Rejected'
  estimatedBy: string
  date: string
  description: string
  validity: string
  costBreakdown: {
    category: string
    description: string
    quantity: string
    unit: string
    rate: string
    amount: string
  }[]
  varianceAnalysis: {
    category: string
    estimated: string
    actual: string
    variance: string
    variancePercent: string
  }[]
  approvalDetails: {
    approvedBy?: string
    approvedDate?: string
    reviewedBy?: string
    reviewComments?: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function ResourceEstimationDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  
  // Mock data - in real app, fetch based on params.id
  const [estimate] = useState<EstimateDetails>({
    id: 'EST-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    materialCost: '₹25,00,00,000',
    labourCost: '₹12,00,00,000',
    equipmentCost: '₹5,00,00,000',
    overheads: '₹3,00,00,000',
    contingency: '₹2,00,00,000',
    totalCost: '₹47,00,00,000',
    status: 'Approved',
    estimatedBy: 'Rajesh Sharma',
    date: '2024-01-10',
    description: 'Complete cost estimation for the Gomti Nagar Housing Scheme project including all materials, labour, equipment, and overhead costs. This estimate is based on current market rates and includes a contingency buffer of 4.3% for unforeseen expenses.',
    validity: '2024-06-30',
    costBreakdown: [
      {
        category: 'Material - Cement',
        description: 'Portland Cement (OPC 53 Grade)',
        quantity: '50,000',
        unit: 'bags',
        rate: '₹400',
        amount: '₹2,00,00,000',
      },
      {
        category: 'Material - Steel',
        description: 'TMT Steel Bars (Fe 500)',
        quantity: '5,000',
        unit: 'MT',
        rate: '₹50,000',
        amount: '₹25,00,00,000',
      },
      {
        category: 'Material - Aggregates',
        description: 'Coarse & Fine Aggregates',
        quantity: '25,000',
        unit: 'cum',
        rate: '₹1,200',
        amount: '₹3,00,00,000',
      },
      {
        category: 'Material - Bricks',
        description: 'First Class Bricks',
        quantity: '10,00,000',
        unit: 'nos',
        rate: '₹8',
        amount: '₹80,00,000',
      },
      {
        category: 'Labour - Skilled',
        description: 'Masons, Carpenters, Electricians',
        quantity: '500',
        unit: 'person-days',
        rate: '₹1,500',
        amount: '₹7,50,00,000',
      },
      {
        category: 'Labour - Unskilled',
        description: 'General Labour',
        quantity: '1,000',
        unit: 'person-days',
        rate: '₹600',
        amount: '₹6,00,00,000',
      },
      {
        category: 'Equipment - Excavator',
        description: 'Excavation & Earth Moving',
        quantity: '200',
        unit: 'hours',
        rate: '₹3,500',
        amount: '₹70,00,000',
      },
      {
        category: 'Equipment - Concrete Mixer',
        description: 'Concrete Mixing Equipment',
        quantity: '300',
        unit: 'hours',
        rate: '₹2,000',
        amount: '₹60,00,000',
      },
      {
        category: 'Equipment - Crane',
        description: 'Tower Crane Rental',
        quantity: '180',
        unit: 'days',
        rate: '₹15,000',
        amount: '₹2,70,00,000',
      },
      {
        category: 'Overheads - Site Office',
        description: 'Site Office & Administration',
        quantity: '24',
        unit: 'months',
        rate: '₹75,000',
        amount: '₹1,80,00,000',
      },
      {
        category: 'Overheads - Utilities',
        description: 'Water, Electricity, etc.',
        quantity: '24',
        unit: 'months',
        rate: '₹50,000',
        amount: '₹1,20,00,000',
      },
    ],
    varianceAnalysis: [
      {
        category: 'Material Cost',
        estimated: '₹25,00,00,000',
        actual: '₹24,50,00,000',
        variance: '-₹50,00,000',
        variancePercent: '-2.0%',
      },
      {
        category: 'Labour Cost',
        estimated: '₹12,00,00,000',
        actual: '₹12,80,00,000',
        variance: '+₹80,00,000',
        variancePercent: '+6.7%',
      },
      {
        category: 'Equipment Cost',
        estimated: '₹5,00,00,000',
        actual: '₹4,90,00,000',
        variance: '-₹10,00,000',
        variancePercent: '-2.0%',
      },
      {
        category: 'Overheads',
        estimated: '₹3,00,00,000',
        actual: '₹3,10,00,000',
        variance: '+₹10,00,000',
        variancePercent: '+3.3%',
      },
    ],
    approvalDetails: {
      approvedBy: 'Chief Financial Officer',
      approvedDate: '2024-01-15',
      reviewedBy: 'Project Director',
      reviewComments: 'Estimate reviewed and found reasonable based on current market conditions. Approved for implementation.',
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-10 09:00:00',
      action: 'Estimate Created',
      performedBy: 'Rajesh Sharma',
      details: 'New resource estimate created for Gomti Nagar Housing Scheme',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-10 14:30:00',
      action: 'Cost Breakdown Added',
      performedBy: 'Rajesh Sharma',
      details: 'Detailed cost breakdown with 11 line items added',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-12 11:00:00',
      action: 'Technical Review',
      performedBy: 'Project Director',
      details: 'Estimate reviewed by technical team for accuracy',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-14 15:00:00',
      action: 'Financial Review',
      performedBy: 'Finance Team',
      details: 'Cost estimates verified against market rates',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-15 10:00:00',
      action: 'Estimate Approved',
      performedBy: 'Chief Financial Officer',
      details: 'Resource estimate approved for project execution',
    },
  ])

  const handleExport = () => {
    const content = `
Resource Estimation Report
===========================

Estimate ID: ${estimate.id}
Project ID: ${estimate.projectId}
Status: ${estimate.status}

Project Information
===================
Project Name: ${estimate.projectName}
Estimated By: ${estimate.estimatedBy}
Estimate Date: ${new Date(estimate.date).toLocaleDateString('en-IN')}
Valid Until: ${new Date(estimate.validity).toLocaleDateString('en-IN')}

Cost Summary
============
Material Cost: ${estimate.materialCost}
Labour Cost: ${estimate.labourCost}
Equipment Cost: ${estimate.equipmentCost}
Overheads: ${estimate.overheads}
Contingency: ${estimate.contingency}
-----------------------------------------
Total Estimated Cost: ${estimate.totalCost}

Detailed Cost Breakdown
========================
${estimate.costBreakdown.map(item => 
  `${item.category}\n  ${item.description}\n  Quantity: ${item.quantity} ${item.unit} @ ${item.rate}\n  Amount: ${item.amount}`
).join('\n\n')}

Variance Analysis
=================
${estimate.varianceAnalysis.map(v => 
  `${v.category}:\n  Estimated: ${v.estimated}\n  Actual: ${v.actual}\n  Variance: ${v.variance} (${v.variancePercent})`
).join('\n\n')}

Approval Details
================
${estimate.status === 'Approved' ? 
  `Approved By: ${estimate.approvalDetails.approvedBy}\nApproved Date: ${estimate.approvalDetails.approvedDate}\nReviewed By: ${estimate.approvalDetails.reviewedBy}\nComments: ${estimate.approvalDetails.reviewComments}` 
  : 'Status: Pending Approval'}

Description
===========
${estimate.description}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `estimate_${estimate.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700'
      case 'Under Review':
        return 'bg-blue-100 text-blue-700'
      case 'Pending':
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
      case 'Under Review':
        return <Clock size={40} className="text-blue-600" />
      case 'Pending':
        return <AlertCircle size={40} className="text-orange-600" />
      case 'Rejected':
        return <XCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const totalCost = parseFloat(estimate.totalCost.replace(/[^0-9]/g, '')) || 0
  const materialCost = parseFloat(estimate.materialCost.replace(/[^0-9]/g, '')) || 0
  const labourCost = parseFloat(estimate.labourCost.replace(/[^0-9]/g, '')) || 0
  const equipmentCost = parseFloat(estimate.equipmentCost.replace(/[^0-9]/g, '')) || 0
  const overheadsCost = parseFloat(estimate.overheads.replace(/[^0-9]/g, '')) || 0

  const materialPercent = ((materialCost / totalCost) * 100).toFixed(1)
  const labourPercent = ((labourCost / totalCost) * 100).toFixed(1)
  const equipmentPercent = ((equipmentCost / totalCost) * 100).toFixed(1)
  const overheadsPercent = ((overheadsCost / totalCost) * 100).toFixed(1)

  const daysUntilExpiry = Math.ceil((new Date(estimate.validity).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

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
            <h1 className="text-2xl font-bold text-gray-900">Resource Estimate {estimate.id}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {estimate.projectName} • Bill of Quantities
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(estimate.status)}`}>
            {estimate.status}
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
      <div className={`rounded-lg p-8 text-white ${
        estimate.status === 'Approved' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        estimate.status === 'Under Review' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        estimate.status === 'Rejected' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              estimate.status === 'Approved' ? 'text-green-100' :
              estimate.status === 'Under Review' ? 'text-blue-100' :
              estimate.status === 'Rejected' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              Total Estimated Cost
            </p>
            <h2 className="text-4xl font-bold">{estimate.totalCost}</h2>
            <p className={`text-sm mt-2 ${
              estimate.status === 'Approved' ? 'text-green-100' :
              estimate.status === 'Under Review' ? 'text-blue-100' :
              estimate.status === 'Rejected' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              ₹{(totalCost / 10000000).toFixed(2)} Crores • Valid until {new Date(estimate.validity).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(estimate.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Material Cost</p>
              <h3 className="text-2xl font-bold text-blue-600">{estimate.materialCost}</h3>
              <p className="text-xs text-gray-500 mt-2">{materialPercent}% of total</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Labour Cost</p>
              <h3 className="text-2xl font-bold text-green-600">{estimate.labourCost}</h3>
              <p className="text-xs text-gray-500 mt-2">{labourPercent}% of total</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Equipment Cost</p>
              <h3 className="text-2xl font-bold text-purple-600">{estimate.equipmentCost}</h3>
              <p className="text-xs text-gray-500 mt-2">{equipmentPercent}% of total</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Overheads</p>
              <h3 className="text-2xl font-bold text-orange-600">{estimate.overheads}</h3>
              <p className="text-xs text-gray-500 mt-2">{overheadsPercent}% of total</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Cost Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 size={20} className="mr-2" />
          Cost Distribution
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Material Cost', value: estimate.materialCost, percent: materialPercent, color: 'bg-blue-500' },
            { label: 'Labour Cost', value: estimate.labourCost, percent: labourPercent, color: 'bg-green-500' },
            { label: 'Equipment Cost', value: estimate.equipmentCost, percent: equipmentPercent, color: 'bg-purple-500' },
            { label: 'Overheads', value: estimate.overheads, percent: overheadsPercent, color: 'bg-orange-500' },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 ${item.color} rounded`}></div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900">{item.value}</span>
                  <span className="text-gray-500 min-w-[50px] text-right">{item.percent}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`${item.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estimate Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Estimate Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimate ID</p>
            <p className="text-sm font-medium text-gray-900">{estimate.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project ID</p>
            <p className="text-sm font-medium text-gray-900">{estimate.projectId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Name</p>
            <p className="text-sm font-medium text-gray-900">{estimate.projectName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimated By</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {estimate.estimatedBy}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimate Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(estimate.date).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Valid Until</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {new Date(estimate.validity).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
              {daysUntilExpiry > 0 && (
                <span className="ml-2 text-xs text-orange-600">({daysUntilExpiry} days remaining)</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign size={20} className="mr-2" />
          Cost Summary
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-gray-900">Material Cost</span>
            <span className="text-lg font-bold text-blue-600">{estimate.materialCost}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <span className="text-sm font-medium text-gray-900">Labour Cost</span>
            <span className="text-lg font-bold text-green-600">{estimate.labourCost}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <span className="text-sm font-medium text-gray-900">Equipment Cost</span>
            <span className="text-lg font-bold text-purple-600">{estimate.equipmentCost}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
            <span className="text-sm font-medium text-gray-900">Overheads</span>
            <span className="text-lg font-bold text-orange-600">{estimate.overheads}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <span className="text-sm font-medium text-gray-900">Contingency</span>
            <span className="text-lg font-bold text-yellow-600">{estimate.contingency}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg border-2 border-green-300 mt-4">
            <span className="text-base font-bold text-green-900">Total Estimated Cost</span>
            <span className="text-2xl font-bold text-green-900">{estimate.totalCost}</span>
          </div>
        </div>
      </div>

      {/* Detailed Cost Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calculator size={20} className="mr-2" />
            Detailed Cost Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {estimate.costBreakdown.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.rate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Variance Analysis */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Variance Analysis (Estimated vs Actual)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estimated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variance %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {estimate.varianceAnalysis.map((item, index) => {
                const isPositive = item.variance.startsWith('+')
                const isNegative = item.variance.startsWith('-')
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.estimated}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.actual}</td>
                    <td className={`px-6 py-4 text-sm font-medium ${
                      isNegative ? 'text-green-600' : isPositive ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {item.variance}
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold ${
                      isNegative ? 'text-green-600' : isPositive ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {item.variancePercent}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Details */}
      {estimate.status === 'Approved' && estimate.approvalDetails.approvedBy && (
        <div className="bg-green-50 rounded-lg border-2 border-green-200 p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Approval Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-green-700 mb-1">Approved By</p>
              <p className="text-sm font-medium text-green-900">{estimate.approvalDetails.approvedBy}</p>
            </div>
            <div>
              <p className="text-xs text-green-700 mb-1">Approval Date</p>
              <p className="text-sm font-medium text-green-900">
                {estimate.approvalDetails.approvedDate && new Date(estimate.approvalDetails.approvedDate).toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-green-700 mb-1">Reviewed By</p>
              <p className="text-sm font-medium text-green-900">{estimate.approvalDetails.reviewedBy}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-green-700 mb-1">Review Comments</p>
              <p className="text-sm text-green-800">{estimate.approvalDetails.reviewComments}</p>
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Estimate Description & Notes
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {estimate.description}
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
            <p className="text-xs text-gray-600 mb-2">Estimate ID</p>
            <p className="text-lg font-bold text-gray-900">{estimate.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Cost</p>
            <p className="text-sm font-bold text-green-600">{estimate.totalCost}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Material %</p>
            <p className="text-lg font-bold text-blue-600">{materialPercent}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Labour %</p>
            <p className="text-lg font-bold text-green-600">{labourPercent}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              estimate.status === 'Approved' ? 'text-green-600' :
              estimate.status === 'Under Review' ? 'text-blue-600' :
              estimate.status === 'Rejected' ? 'text-red-600' :
              'text-orange-600'
            }`}>
              {estimate.status}
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
          <span>Download BOQ</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Estimate</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print</span>
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