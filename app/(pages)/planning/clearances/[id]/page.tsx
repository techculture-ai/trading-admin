'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, FileText, CheckCircle, Clock, XCircle, AlertCircle, Calendar, User, Building, Phone, Mail, Upload, Printer, Share2 } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface ClearanceDetails {
  id: string
  projectId: string
  projectName: string
  clearanceType: string
  authority: string
  applicationDate: string
  approvalDate: string
  validUpto: string
  status: 'Approved' | 'Pending' | 'Under Review' | 'Rejected' | 'Expired'
  documents: number
  applicationNumber: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  remarks: string
  conditions: string[]
  projectDetails: {
    location: string
    contractor: string
    projectHead: string
    estimatedCost: string
    startDate: string
    completionDate: string
  }
  applicationDetails: {
    submittedBy: string
    submitterDesignation: string
    submitterContact: string
    submitterEmail: string
  }
  reviewHistory: {
    date: string
    action: string
    officer: string
    remarks: string
    status: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function ClearanceDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  
  // Mock data - in real app, fetch based on params.id
  const [clearance] = useState<ClearanceDetails>({
    id: 'CLR-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    clearanceType: 'Environmental Clearance',
    authority: 'UP Pollution Control Board',
    applicationDate: '2024-01-05',
    approvalDate: '2024-01-20',
    validUpto: '2027-01-20',
    status: 'Approved',
    documents: 8,
    applicationNumber: 'EC/2024/001',
    contactPerson: 'Dr. R.K. Sharma',
    contactEmail: 'rk.sharma@uppcb.gov.in',
    contactPhone: '+91 522 2237771',
    remarks: 'All environmental norms have been complied with as per the guidelines. The project has implemented necessary pollution control measures and waste management systems. Regular monitoring and compliance reporting will be mandatory.',
    conditions: [
      'Regular monitoring of air quality required on site',
      'Annual compliance report must be submitted by December 31st',
      'Effluent treatment plant to be operational before project start',
      'Green belt development mandatory along project boundaries',
      'Waste segregation and disposal as per municipal guidelines'
    ],
    projectDetails: {
      location: 'Gomti Nagar, Lucknow, Uttar Pradesh',
      contractor: 'ABC Builders Ltd.',
      projectHead: 'Er. Suresh Chandra',
      estimatedCost: '₹150 Crores',
      startDate: '2024-02-01',
      completionDate: '2026-01-31',
    },
    applicationDetails: {
      submittedBy: 'Rajesh Kumar',
      submitterDesignation: 'Project Manager',
      submitterContact: '+91 98765 43210',
      submitterEmail: 'rajesh.kumar@abcbuilders.com',
    },
    reviewHistory: [
      {
        date: '2024-01-05',
        action: 'Application Submitted',
        officer: 'System',
        remarks: 'Application received and registered',
        status: 'Pending',
      },
      {
        date: '2024-01-08',
        action: 'Initial Review',
        officer: 'Sr. Environmental Officer',
        remarks: 'Documents verified, sent for technical evaluation',
        status: 'Under Review',
      },
      {
        date: '2024-01-12',
        action: 'Site Inspection',
        officer: 'Environmental Inspector',
        remarks: 'Site inspection completed, compliance verified',
        status: 'Under Review',
      },
      {
        date: '2024-01-18',
        action: 'Technical Review Complete',
        officer: 'Chief Technical Officer',
        remarks: 'All technical parameters meet requirements',
        status: 'Under Review',
      },
      {
        date: '2024-01-20',
        action: 'Clearance Approved',
        officer: 'Dr. R.K. Sharma',
        remarks: 'Environmental clearance granted for 3 years',
        status: 'Approved',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-05 10:00:00',
      action: 'Application Submitted',
      performedBy: 'Rajesh Kumar',
      details: 'New clearance application submitted for Environmental Clearance',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-05 14:30:00',
      action: 'Documents Uploaded',
      performedBy: 'Rajesh Kumar',
      details: '8 documents uploaded to support the application',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-08 09:00:00',
      action: 'Initial Review Started',
      performedBy: 'Sr. Environmental Officer',
      details: 'Application moved to initial review stage',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-12 11:00:00',
      action: 'Site Inspection Completed',
      performedBy: 'Environmental Inspector',
      details: 'On-site verification and compliance check completed',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-18 15:30:00',
      action: 'Technical Review Completed',
      performedBy: 'Chief Technical Officer',
      details: 'Technical parameters reviewed and approved',
    },
    {
      id: 'AL-006',
      timestamp: '2024-01-20 10:00:00',
      action: 'Clearance Approved',
      performedBy: 'Dr. R.K. Sharma',
      details: 'Environmental clearance approved valid until 2027-01-20',
    },
  ])

  const handleExport = () => {
    const content = `
Clearance Details Report
=========================

Clearance ID: ${clearance.id}
Application Number: ${clearance.applicationNumber}
Status: ${clearance.status}

Clearance Information
=====================
Clearance Type: ${clearance.clearanceType}
Authority: ${clearance.authority}
Project Name: ${clearance.projectName}
Project ID: ${clearance.projectId}

Timeline
========
Application Date: ${new Date(clearance.applicationDate).toLocaleDateString('en-IN')}
Approval Date: ${clearance.approvalDate !== '-' ? new Date(clearance.approvalDate).toLocaleDateString('en-IN') : 'Pending'}
Valid Until: ${clearance.validUpto !== '-' ? new Date(clearance.validUpto).toLocaleDateString('en-IN') : 'N/A'}

Project Details
===============
Location: ${clearance.projectDetails.location}
Contractor: ${clearance.projectDetails.contractor}
Project Head: ${clearance.projectDetails.projectHead}
Estimated Cost: ${clearance.projectDetails.estimatedCost}
Start Date: ${new Date(clearance.projectDetails.startDate).toLocaleDateString('en-IN')}
Completion Date: ${new Date(clearance.projectDetails.completionDate).toLocaleDateString('en-IN')}

Authority Contact
=================
Contact Person: ${clearance.contactPerson}
Email: ${clearance.contactEmail}
Phone: ${clearance.contactPhone}

Application Submitted By
========================
Name: ${clearance.applicationDetails.submittedBy}
Designation: ${clearance.applicationDetails.submitterDesignation}
Contact: ${clearance.applicationDetails.submitterContact}
Email: ${clearance.applicationDetails.submitterEmail}

Clearance Conditions
====================
${clearance.conditions.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Remarks
=======
${clearance.remarks}

Review History
==============
${clearance.reviewHistory.map(r => `${r.date} - ${r.action} by ${r.officer}\n   ${r.remarks} (Status: ${r.status})`).join('\n\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clearance_${clearance.id}.txt`
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
      case 'Expired':
        return 'bg-gray-100 text-gray-700'
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
        return <Clock size={40} className="text-orange-600" />
      case 'Rejected':
        return <XCircle size={40} className="text-red-600" />
      case 'Expired':
        return <AlertCircle size={40} className="text-gray-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const daysUntilExpiry = clearance.validUpto !== '-' 
    ? Math.ceil((new Date(clearance.validUpto).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null


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
            <h1 className="text-2xl font-bold text-gray-900">Clearance {clearance.id}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {clearance.clearanceType} • Application No: {clearance.applicationNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(clearance.status)}`}>
            {clearance.status}
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
        clearance.status === 'Approved' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        clearance.status === 'Under Review' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        clearance.status === 'Rejected' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        clearance.status === 'Expired' ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              clearance.status === 'Approved' ? 'text-green-100' :
              clearance.status === 'Under Review' ? 'text-blue-100' :
              clearance.status === 'Rejected' ? 'text-red-100' :
              clearance.status === 'Expired' ? 'text-gray-100' :
              'text-orange-100'
            }`}>
              Clearance Status
            </p>
            <h2 className="text-4xl font-bold">{clearance.status}</h2>
            <p className={`text-sm mt-2 ${
              clearance.status === 'Approved' ? 'text-green-100' :
              clearance.status === 'Under Review' ? 'text-blue-100' :
              clearance.status === 'Rejected' ? 'text-red-100' :
              clearance.status === 'Expired' ? 'text-gray-100' :
              'text-orange-100'
            }`}>
              {clearance.clearanceType} • {clearance.authority}
              {daysUntilExpiry && daysUntilExpiry > 0 && ` • Valid for ${daysUntilExpiry} more days`}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(clearance.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Application Date</p>
              <h3 className="text-lg font-bold text-gray-900">
                {new Date(clearance.applicationDate).toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </h3>
              <p className="text-xs text-gray-500 mt-2">Submitted</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Approval Date</p>
              <h3 className="text-lg font-bold text-green-600">
                {clearance.approvalDate !== '-' 
                  ? new Date(clearance.approvalDate).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })
                  : 'Pending'
                }
              </h3>
              <p className="text-xs text-gray-500 mt-2">Approved on</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Valid Until</p>
              <h3 className="text-lg font-bold text-purple-600">
                {clearance.validUpto !== '-'
                  ? new Date(clearance.validUpto).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })
                  : 'N/A'
                }
              </h3>
              <p className="text-xs text-gray-500 mt-2">Expiry date</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Documents</p>
              <h3 className="text-2xl font-bold text-orange-600">{clearance.documents}</h3>
              <p className="text-xs text-gray-500 mt-2">Attached files</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Application Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Clearance ID</p>
            <p className="text-sm font-medium text-gray-900">{clearance.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Application Number</p>
            <p className="text-sm font-medium text-gray-900">{clearance.applicationNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Clearance Type</p>
            <p className="text-sm font-medium text-gray-900">{clearance.clearanceType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project ID</p>
            <p className="text-sm font-medium text-gray-900">{clearance.projectId}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Project Name</p>
            <p className="text-sm font-medium text-gray-900">{clearance.projectName}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Issuing Authority</p>
            <p className="text-sm font-medium text-gray-900">{clearance.authority}</p>
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
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900">{clearance.projectDetails.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimated Cost</p>
            <p className="text-sm font-medium text-gray-900">{clearance.projectDetails.estimatedCost}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contractor</p>
            <p className="text-sm font-medium text-gray-900">{clearance.projectDetails.contractor}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Head</p>
            <p className="text-sm font-medium text-gray-900">{clearance.projectDetails.projectHead}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Duration</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(clearance.projectDetails.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} - {new Date(clearance.projectDetails.completionDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Authority Contact */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Authority Contact Information
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Person</p>
            <p className="text-sm font-medium text-gray-900">{clearance.contactPerson}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <Mail size={12} className="mr-1" />
              Email
            </p>
            <p className="text-sm font-medium text-gray-900">{clearance.contactEmail}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <Phone size={12} className="mr-1" />
              Phone
            </p>
            <p className="text-sm font-medium text-gray-900">{clearance.contactPhone}</p>
          </div>
        </div>
      </div>

      {/* Application Submitted By */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Application Submitted By
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Name</p>
            <p className="text-sm font-medium text-gray-900">{clearance.applicationDetails.submittedBy}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Designation</p>
            <p className="text-sm font-medium text-gray-900">{clearance.applicationDetails.submitterDesignation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact</p>
            <p className="text-sm font-medium text-gray-900">{clearance.applicationDetails.submitterContact}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-900">{clearance.applicationDetails.submitterEmail}</p>
          </div>
        </div>
      </div>

      {/* Clearance Conditions */}
      {clearance.conditions && clearance.conditions.length > 0 && (
        <div className="bg-yellow-50 rounded-lg border-2 border-yellow-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2 text-yellow-600" />
            Clearance Conditions & Compliance Requirements
          </h3>
          <ul className="space-y-3">
            {clearance.conditions.map((condition, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700 flex-1">{condition}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Remarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Official Remarks & Notes
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {clearance.remarks}
        </p>
      </div>

      {/* Review History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Review & Approval Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {clearance.reviewHistory.map((review, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== clearance.reviewHistory.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                  review.status === 'Approved' ? 'bg-green-100' :
                  review.status === 'Under Review' ? 'bg-blue-100' :
                  review.status === 'Pending' ? 'bg-orange-100' :
                  'bg-gray-100'
                }`}>
                  {review.status === 'Approved' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : review.status === 'Under Review' ? (
                    <Clock size={16} className="text-blue-600" />
                  ) : (
                    <Clock size={16} className="text-orange-600" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{review.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{review.remarks}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        By {review.officer} • {new Date(review.date).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText size={20} className="mr-2" />
            Attached Documents ({clearance.documents})
          </h3>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-orange-600 hover:text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-50">
            <Download size={16} />
            <span>Download All</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(clearance.documents)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {i === 0 ? 'Application Form' :
                     i === 1 ? 'Project Drawings' :
                     i === 2 ? 'Environmental Impact Assessment' :
                     i === 3 ? 'Site Plan' :
                     i === 4 ? 'NOC from Fire Department' :
                     i === 5 ? 'Building Plan Approval' :
                     i === 6 ? 'Pollution Control Measures' :
                     `Supporting Document ${i + 1}`}.pdf
                  </p>
                  <p className="text-xs text-gray-500">{(Math.random() * 3 + 0.5).toFixed(1)} MB • PDF</p>
                </div>
              </div>
              <button className="ml-3 text-orange-600 hover:text-orange-700">
                <Download size={18} />
              </button>
            </div>
          ))}
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
            <p className="text-xs text-gray-600 mb-2">Clearance ID</p>
            <p className="text-lg font-bold text-gray-900">{clearance.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Type</p>
            <p className="text-sm font-bold text-blue-600">{clearance.clearanceType.split(' ')[0]}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              clearance.status === 'Approved' ? 'text-green-600' :
              clearance.status === 'Under Review' ? 'text-blue-600' :
              clearance.status === 'Rejected' ? 'text-red-600' :
              clearance.status === 'Expired' ? 'text-gray-600' :
              'text-orange-600'
            }`}>
              {clearance.status}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Documents</p>
            <p className="text-lg font-bold text-purple-600">{clearance.documents}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Validity</p>
            <p className="text-sm font-bold text-orange-600">
              {daysUntilExpiry && daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : 'N/A'}
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
          <span>Download Certificate</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Upload size={20} />
          <span>Upload Documents</span>
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