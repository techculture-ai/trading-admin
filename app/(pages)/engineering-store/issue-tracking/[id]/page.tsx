'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Package, Calendar, User, FileText, CheckCircle, Clock, AlertCircle, Building, Share2, Printer } from 'lucide-react'

interface MaterialIssueDetails {
  id: string
  issueNo: string
  date: string
  projectId: string
  projectName: string
  materialName: string
  materialCode: string
  quantityIssued: string
  unit: string
  issuedTo: string
  issuedBy: string
  purpose: string
  status: 'Issued' | 'Pending Return' | 'Returned' | 'Cancelled'
  remarks: string
  returnDate?: string
  projectDetails: {
    location: string
    projectManager: string
    contractor: string
  }
  materialDetails: {
    category: string
    specification: string
    unitPrice: string
    totalValue: string
  }
  issueHistory: {
    date: string
    action: string
    performedBy: string
    quantity: string
    remarks: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function MaterialIssueDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [issue] = useState<MaterialIssueDetails>({
    id: 'ISS-ENG-001',
    issueNo: 'ISS/ENG/2024/001',
    date: '2025-10-25',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    materialName: 'Cement OPC 53 Grade',
    materialCode: 'MAT-001',
    quantityIssued: '500',
    unit: 'Bags',
    issuedTo: 'Site Engineer - Rajesh Sharma',
    issuedBy: 'Store Manager - Amit Kumar',
    purpose: 'Foundation Work - Block A',
    status: 'Issued',
    remarks: 'Material issued for urgent foundation work. Quality checked and approved for use.',
    projectDetails: {
      location: 'Gomti Nagar Extension, Lucknow',
      projectManager: 'Er. Suresh Chandra',
      contractor: 'ABC Builders Ltd.',
    },
    materialDetails: {
      category: 'Cement',
      specification: 'OPC 53 Grade - 50kg bags',
      unitPrice: '₹380',
      totalValue: '₹1,90,000',
    },
    issueHistory: [
      {
        date: '2025-10-20',
        action: 'Material Requisition',
        performedBy: 'Rajesh Sharma',
        quantity: '500 Bags',
        remarks: 'Material requisition submitted for foundation work',
      },
      {
        date: '2025-10-23',
        action: 'Requisition Approved',
        performedBy: 'Project Manager',
        quantity: '500 Bags',
        remarks: 'Requisition approved by project manager',
      },
      {
        date: '2025-10-25',
        action: 'Material Issued',
        performedBy: 'Amit Kumar',
        quantity: '500 Bags',
        remarks: 'Material issued from main store',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2025-10-20 09:00:00',
      action: 'Requisition Created',
      performedBy: 'Rajesh Sharma',
      details: 'Material requisition created for 500 bags of cement',
    },
    {
      id: 'AL-002',
      timestamp: '2025-10-23 14:30:00',
      action: 'Requisition Approved',
      performedBy: 'Project Manager',
      details: 'Material requisition approved for issuance',
    },
    {
      id: 'AL-003',
      timestamp: '2025-10-25 10:00:00',
      action: 'Material Issued',
      performedBy: 'Amit Kumar',
      details: 'Material issued to site engineer Rajesh Sharma',
    },
  ])

  const handleExport = () => {
    const content = `
Material Issue Report
=====================

Issue ID: ${issue.id}
Issue Number: ${issue.issueNo}
Status: ${issue.status}

Material Information
====================
Material Name: ${issue.materialName}
Material Code: ${issue.materialCode}
Category: ${issue.materialDetails.category}
Specification: ${issue.materialDetails.specification}
Quantity Issued: ${issue.quantityIssued} ${issue.unit}
Unit Price: ${issue.materialDetails.unitPrice}
Total Value: ${issue.materialDetails.totalValue}

Issue Details
=============
Issue Date: ${new Date(issue.date).toLocaleDateString('en-IN')}
Issued To: ${issue.issuedTo}
Issued By: ${issue.issuedBy}
Purpose: ${issue.purpose}

Project Details
===============
Project ID: ${issue.projectId}
Project Name: ${issue.projectName}
Location: ${issue.projectDetails.location}
Project Manager: ${issue.projectDetails.projectManager}
Contractor: ${issue.projectDetails.contractor}

Issue History
=============
${issue.issueHistory.map(h => `${h.date} - ${h.action} by ${h.performedBy}\n   Quantity: ${h.quantity}\n   ${h.remarks}`).join('\n\n')}

Remarks
=======
${issue.remarks}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `material_issue_${issue.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Issued':
        return 'bg-green-100 text-green-700'
      case 'Pending Return':
        return 'bg-orange-100 text-orange-700'
      case 'Returned':
        return 'bg-blue-100 text-blue-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Issued':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Pending Return':
        return <Clock size={40} className="text-orange-600" />
      case 'Returned':
        return <CheckCircle size={40} className="text-blue-600" />
      case 'Cancelled':
        return <AlertCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Material Issue {issue.issueNo}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {issue.materialName} • {issue.projectName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(issue.status)}`}>
            {issue.status}
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
        issue.status === 'Issued' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        issue.status === 'Pending Return' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        issue.status === 'Returned' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              issue.status === 'Issued' ? 'text-green-100' :
              issue.status === 'Pending Return' ? 'text-orange-100' :
              issue.status === 'Returned' ? 'text-blue-100' :
              'text-red-100'
            }`}>
              Material Issue Status
            </p>
            <h2 className="text-4xl font-bold">{issue.status}</h2>
            <p className={`text-sm mt-2 ${
              issue.status === 'Issued' ? 'text-green-100' :
              issue.status === 'Pending Return' ? 'text-orange-100' :
              issue.status === 'Returned' ? 'text-blue-100' :
              'text-red-100'
            }`}>
              {issue.quantityIssued} {issue.unit} • Value: {issue.materialDetails.totalValue}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(issue.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Quantity Issued</p>
              <h3 className="text-2xl font-bold text-gray-900">{issue.quantityIssued}</h3>
              <p className="text-xs text-gray-500 mt-2">{issue.unit}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Value</p>
              <h3 className="text-2xl font-bold text-blue-600">{issue.materialDetails.totalValue}</h3>
              <p className="text-xs text-gray-500 mt-2">@ {issue.materialDetails.unitPrice}/unit</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Issue Date</p>
              <h3 className="text-lg font-bold text-purple-600">
                {new Date(issue.date).toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </h3>
              <p className="text-xs text-gray-500 mt-2">Issued on</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Material Code</p>
              <h3 className="text-lg font-bold text-orange-600">{issue.materialCode}</h3>
              <p className="text-xs text-gray-500 mt-2">Reference</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Issue Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Issue Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Issue ID</p>
            <p className="text-sm font-medium text-gray-900">{issue.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Issue Number</p>
            <p className="text-sm font-medium text-gray-900">{issue.issueNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Issue Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(issue.date).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Issued To</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {issue.issuedTo}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Issued By</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {issue.issuedBy}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Purpose</p>
            <p className="text-sm font-medium text-gray-900">{issue.purpose}</p>
          </div>
        </div>
      </div>

      {/* Material Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Package size={20} className="mr-2" />
          Material Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Material Name</p>
            <p className="text-sm font-medium text-gray-900">{issue.materialName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Material Code</p>
            <p className="text-sm font-medium text-gray-900">{issue.materialCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Category</p>
            <p className="text-sm font-medium text-gray-900">{issue.materialDetails.category}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Specification</p>
            <p className="text-sm font-medium text-gray-900">{issue.materialDetails.specification}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Unit Price</p>
            <p className="text-sm font-medium text-gray-900">{issue.materialDetails.unitPrice}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Quantity Issued</p>
            <p className="text-sm font-medium text-gray-900">{issue.quantityIssued} {issue.unit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Value</p>
            <p className="text-lg font-bold text-green-600">{issue.materialDetails.totalValue}</p>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Project Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Project ID</p>
            <p className="text-sm font-medium text-gray-900">{issue.projectId}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Project Name</p>
            <p className="text-sm font-medium text-gray-900">{issue.projectName}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900">{issue.projectDetails.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Manager</p>
            <p className="text-sm font-medium text-gray-900">{issue.projectDetails.projectManager}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contractor</p>
            <p className="text-sm font-medium text-gray-900">{issue.projectDetails.contractor}</p>
          </div>
        </div>
      </div>

      {/* Issue History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Issue History
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {issue.issueHistory.map((history, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== issue.issueHistory.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-orange-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{history.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{history.remarks}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        By {history.performedBy} • Quantity: {history.quantity} • {new Date(history.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Remarks & Notes
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {issue.remarks}
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
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-green-600" />
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
            <p className="text-xs text-gray-600 mb-2">Issue ID</p>
            <p className="text-lg font-bold text-gray-900">{issue.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Material</p>
            <p className="text-sm font-bold text-blue-600">{issue.materialCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Quantity</p>
            <p className="text-lg font-bold text-green-600">{issue.quantityIssued} {issue.unit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Value</p>
            <p className="text-sm font-bold text-purple-600">{issue.materialDetails.totalValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              issue.status === 'Issued' ? 'text-green-600' :
              issue.status === 'Pending Return' ? 'text-orange-600' :
              issue.status === 'Returned' ? 'text-blue-600' :
              'text-red-600'
            }`}>
              {issue.status}
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