'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, FileText, CheckCircle, Clock, AlertCircle, XCircle, Calendar, User, Building, DollarSign, Upload, Printer, Share2, File } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface DPRDetails {
  id: string
  projectId: string
  projectName: string
  version: string
  submittedBy: string
  submittedDate: string
  reviewedBy: string
  status: 'Approved' | 'Under Review' | 'Revision Required' | 'Rejected'
  approvalDate: string
  documents: number
  description: string
  estimatedCost: string
  scope: string
  remarks: string
  projectDetails: {
    location: string
    contractor: string
    consultant: string
    projectType: string
    duration: string
    startDate: string
    completionDate: string
  }
  technicalSpecifications: {
    builtUpArea: string
    numberOfFloors: string
    parkingCapacity: string
    greenArea: string
    utilities: string[]
  }
  financialBreakdown: {
    item: string
    amount: string
    percentage: string
  }[]
  reviewHistory: {
    date: string
    action: string
    reviewer: string
    comments: string
    status: string
  }[]
  attachedDocuments: {
    name: string
    type: string
    size: string
    uploadedBy: string
    uploadedDate: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function DPRDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  
  // Mock data - in real app, fetch based on params.id
  const [dpr] = useState<DPRDetails>({
    id: 'DPR-2024-045',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    version: 'v2.1',
    submittedBy: 'Rajesh Sharma',
    submittedDate: '2024-01-15',
    reviewedBy: 'Dr. Suresh Kumar',
    status: 'Approved',
    approvalDate: '2024-01-22',
    documents: 5,
    description: 'Detailed Project Report for the development of integrated housing scheme in Gomti Nagar area. The project encompasses residential units, community facilities, green spaces, and supporting infrastructure. This DPR includes comprehensive technical, financial, and environmental assessments.',
    estimatedCost: '₹45,00,00,000',
    scope: 'Construction of 200 residential units with modern amenities including community center, parks, internal roads, drainage system, water supply network, electrical distribution, and sewerage treatment plant.',
    remarks: 'All technical specifications have been approved. The project meets all statutory requirements and environmental norms. Financial viability confirmed by the finance committee.',
    projectDetails: {
      location: 'Gomti Nagar Extension, Lucknow, Uttar Pradesh',
      contractor: 'ABC Builders & Developers Ltd.',
      consultant: 'XYZ Engineering Consultants',
      projectType: 'Residential Housing Development',
      duration: '24 months',
      startDate: '2024-02-01',
      completionDate: '2026-01-31',
    },
    technicalSpecifications: {
      builtUpArea: '1,50,000 sq ft',
      numberOfFloors: 'G+3 Floors',
      parkingCapacity: '300 vehicles',
      greenArea: '25,000 sq ft',
      utilities: ['Water Supply', 'Electricity', 'Sewerage', 'Drainage', 'Gas Pipeline', 'Internet/Cable']
    },
    financialBreakdown: [
      {
        item: 'Civil Construction',
        amount: '₹28,00,00,000',
        percentage: '62.2%',
      },
      {
        item: 'Electrical Works',
        amount: '₹5,50,00,000',
        percentage: '12.2%',
      },
      {
        item: 'Plumbing & Sanitation',
        amount: '₹4,00,00,000',
        percentage: '8.9%',
      },
      {
        item: 'Landscaping & Green Area',
        amount: '₹2,50,00,000',
        percentage: '5.6%',
      },
      {
        item: 'Roads & Infrastructure',
        amount: '₹3,00,00,000',
        percentage: '6.7%',
      },
      {
        item: 'Contingency & Others',
        amount: '₹2,00,00,000',
        percentage: '4.4%',
      },
    ],
    reviewHistory: [
      {
        date: '2024-01-15',
        action: 'DPR Submitted',
        reviewer: 'System',
        comments: 'DPR version 2.1 submitted for review',
        status: 'Under Review',
      },
      {
        date: '2024-01-16',
        action: 'Technical Review',
        reviewer: 'Chief Engineer',
        comments: 'Technical specifications verified and approved',
        status: 'Under Review',
      },
      {
        date: '2024-01-18',
        action: 'Financial Review',
        reviewer: 'Finance Committee',
        comments: 'Cost estimates reviewed and found reasonable',
        status: 'Under Review',
      },
      {
        date: '2024-01-20',
        action: 'Environmental Clearance',
        reviewer: 'Environmental Officer',
        comments: 'Environmental impact assessment approved',
        status: 'Under Review',
      },
      {
        date: '2024-01-22',
        action: 'Final Approval',
        reviewer: 'Dr. Suresh Kumar',
        comments: 'DPR approved for implementation',
        status: 'Approved',
      },
    ],
    attachedDocuments: [
      {
        name: 'Technical Drawings.pdf',
        type: 'PDF',
        size: '15.2 MB',
        uploadedBy: 'Rajesh Sharma',
        uploadedDate: '2024-01-15',
      },
      {
        name: 'Cost Estimation.xlsx',
        type: 'Excel',
        size: '2.8 MB',
        uploadedBy: 'Rajesh Sharma',
        uploadedDate: '2024-01-15',
      },
      {
        name: 'Site Plan.dwg',
        type: 'AutoCAD',
        size: '8.5 MB',
        uploadedBy: 'Rajesh Sharma',
        uploadedDate: '2024-01-15',
      },
      {
        name: 'Environmental Impact Assessment.pdf',
        type: 'PDF',
        size: '5.3 MB',
        uploadedBy: 'Rajesh Sharma',
        uploadedDate: '2024-01-15',
      },
      {
        name: 'Project Timeline.pdf',
        type: 'PDF',
        size: '1.9 MB',
        uploadedBy: 'Rajesh Sharma',
        uploadedDate: '2024-01-15',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-15 10:00:00',
      action: 'DPR Created',
      performedBy: 'Rajesh Sharma',
      details: 'New DPR version 2.1 created for Gomti Nagar Housing Scheme',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-15 14:30:00',
      action: 'Documents Uploaded',
      performedBy: 'Rajesh Sharma',
      details: '5 technical documents uploaded to DPR',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-16 09:00:00',
      action: 'Technical Review Started',
      performedBy: 'Chief Engineer',
      details: 'Technical specifications review initiated',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-18 11:00:00',
      action: 'Financial Review Completed',
      performedBy: 'Finance Committee',
      details: 'Cost estimates approved by finance committee',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-20 15:30:00',
      action: 'Environmental Clearance Obtained',
      performedBy: 'Environmental Officer',
      details: 'Environmental impact assessment approved',
    },
    {
      id: 'AL-006',
      timestamp: '2024-01-22 10:00:00',
      action: 'DPR Approved',
      performedBy: 'Dr. Suresh Kumar',
      details: 'DPR approved for project implementation',
    },
  ])

  const handleExport = () => {
    const content = `
Detailed Project Report (DPR)
==============================

DPR ID: ${dpr.id}
Project ID: ${dpr.projectId}
Version: ${dpr.version}
Status: ${dpr.status}

Project Information
===================
Project Name: ${dpr.projectName}
Location: ${dpr.projectDetails.location}
Project Type: ${dpr.projectDetails.projectType}
Duration: ${dpr.projectDetails.duration}

Project Timeline
================
Start Date: ${new Date(dpr.projectDetails.startDate).toLocaleDateString('en-IN')}
Completion Date: ${new Date(dpr.projectDetails.completionDate).toLocaleDateString('en-IN')}

Financial Details
=================
Total Estimated Cost: ${dpr.estimatedCost}

Cost Breakdown:
${dpr.financialBreakdown.map(item => `${item.item}: ${item.amount} (${item.percentage})`).join('\n')}

Technical Specifications
========================
Built-Up Area: ${dpr.technicalSpecifications.builtUpArea}
Number of Floors: ${dpr.technicalSpecifications.numberOfFloors}
Parking Capacity: ${dpr.technicalSpecifications.parkingCapacity}
Green Area: ${dpr.technicalSpecifications.greenArea}
Utilities: ${dpr.technicalSpecifications.utilities.join(', ')}

Project Stakeholders
====================
Contractor: ${dpr.projectDetails.contractor}
Consultant: ${dpr.projectDetails.consultant}
Submitted By: ${dpr.submittedBy}
Reviewed By: ${dpr.reviewedBy}

Project Scope
=============
${dpr.scope}

Description
===========
${dpr.description}

Remarks
=======
${dpr.remarks}

Review History
==============
${dpr.reviewHistory.map(r => `${r.date} - ${r.action} by ${r.reviewer}\n   ${r.comments} (Status: ${r.status})`).join('\n\n')}

Attached Documents (${dpr.documents})
=====================
${dpr.attachedDocuments.map(d => `${d.name} (${d.type}, ${d.size}) - Uploaded by ${d.uploadedBy} on ${d.uploadedDate}`).join('\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `DPR_${dpr.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700'
      case 'Under Review':
        return 'bg-blue-100 text-blue-700'
      case 'Revision Required':
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
      case 'Revision Required':
        return <AlertCircle size={40} className="text-orange-600" />
      case 'Rejected':
        return <XCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const totalCost = parseFloat(dpr.estimatedCost.replace(/[^0-9]/g, '')) || 0
  const daysToCompletion = Math.ceil((new Date(dpr.projectDetails.completionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

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
            <h1 className="text-2xl font-bold text-gray-900">DPR {dpr.id}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {dpr.projectName} • Version {dpr.version}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(dpr.status)}`}>
            {dpr.status}
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
        dpr.status === 'Approved' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        dpr.status === 'Under Review' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        dpr.status === 'Rejected' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              dpr.status === 'Approved' ? 'text-green-100' :
              dpr.status === 'Under Review' ? 'text-blue-100' :
              dpr.status === 'Rejected' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              DPR Status
            </p>
            <h2 className="text-4xl font-bold">{dpr.status}</h2>
            <p className={`text-sm mt-2 ${
              dpr.status === 'Approved' ? 'text-green-100' :
              dpr.status === 'Under Review' ? 'text-blue-100' :
              dpr.status === 'Rejected' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              Estimated Cost: {dpr.estimatedCost} • Duration: {dpr.projectDetails.duration}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(dpr.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Estimated Cost</p>
              <h3 className="text-2xl font-bold text-green-600">{dpr.estimatedCost}</h3>
              <p className="text-xs text-gray-500 mt-2">Total budget</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Project Duration</p>
              <h3 className="text-2xl font-bold text-blue-600">{dpr.projectDetails.duration}</h3>
              <p className="text-xs text-gray-500 mt-2">Timeline</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Documents</p>
              <h3 className="text-2xl font-bold text-purple-600">{dpr.documents}</h3>
              <p className="text-xs text-gray-500 mt-2">Attached files</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Days to Completion</p>
              <h3 className="text-2xl font-bold text-orange-600">{daysToCompletion > 0 ? daysToCompletion : 0}</h3>
              <p className="text-xs text-gray-500 mt-2">Remaining days</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* DPR Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">DPR Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">DPR ID</p>
            <p className="text-sm font-medium text-gray-900">{dpr.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project ID</p>
            <p className="text-sm font-medium text-gray-900">{dpr.projectId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Version</p>
            <p className="text-sm font-medium text-gray-900">{dpr.version}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Submitted By</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {dpr.submittedBy}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Submission Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(dpr.submittedDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Reviewed By</p>
            <p className="text-sm font-medium text-gray-900">{dpr.reviewedBy}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Approval Date</p>
            <p className="text-sm font-medium text-gray-900">
              {dpr.approvalDate !== '-' 
                ? new Date(dpr.approvalDate).toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })
                : 'Pending'
              }
            </p>
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
            <p className="text-xs text-gray-500 mb-1">Project Name</p>
            <p className="text-sm font-medium text-gray-900">{dpr.projectName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Type</p>
            <p className="text-sm font-medium text-gray-900">{dpr.projectDetails.projectType}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900">{dpr.projectDetails.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contractor</p>
            <p className="text-sm font-medium text-gray-900">{dpr.projectDetails.contractor}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Consultant</p>
            <p className="text-sm font-medium text-gray-900">{dpr.projectDetails.consultant}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Duration</p>
            <p className="text-sm font-medium text-gray-900">{dpr.projectDetails.duration}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Start Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(dpr.projectDetails.startDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Completion Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(dpr.projectDetails.completionDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Specifications</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Built-Up Area</p>
            <p className="text-sm font-medium text-gray-900">{dpr.technicalSpecifications.builtUpArea}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Number of Floors</p>
            <p className="text-sm font-medium text-gray-900">{dpr.technicalSpecifications.numberOfFloors}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Parking Capacity</p>
            <p className="text-sm font-medium text-gray-900">{dpr.technicalSpecifications.parkingCapacity}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Green Area</p>
            <p className="text-sm font-medium text-gray-900">{dpr.technicalSpecifications.greenArea}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-2">Utilities & Amenities</p>
            <div className="flex flex-wrap gap-2">
              {dpr.technicalSpecifications.utilities.map((utility, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {utility}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign size={20} className="mr-2" />
          Cost Breakdown
        </h3>
        <div className="space-y-3">
          {dpr.financialBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.item}</p>
                <p className="text-xs text-gray-500 mt-1">{item.percentage} of total budget</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{item.amount}</p>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-green-100 rounded-lg border-2 border-green-200 mt-4">
            <p className="text-base font-bold text-green-900">Total Estimated Cost</p>
            <p className="text-2xl font-bold text-green-900">{dpr.estimatedCost}</p>
          </div>
        </div>
      </div>

      {/* Project Scope */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Scope</h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {dpr.scope}
        </p>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Project Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {dpr.description}
        </p>
      </div>

      {/* Remarks */}
      {dpr.remarks && (
        <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            Official Remarks
          </h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            {dpr.remarks}
          </p>
        </div>
      )}

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
            {dpr.reviewHistory.map((review, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== dpr.reviewHistory.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                  review.status === 'Approved' ? 'bg-green-100' :
                  review.status === 'Under Review' ? 'bg-blue-100' :
                  review.status === 'Revision Required' ? 'bg-orange-100' :
                  'bg-gray-100'
                }`}>
                  {review.status === 'Approved' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : review.status === 'Under Review' ? (
                    <Clock size={16} className="text-blue-600" />
                  ) : (
                    <AlertCircle size={16} className="text-orange-600" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{review.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{review.comments}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        By {review.reviewer} • {new Date(review.date).toLocaleDateString('en-IN', { 
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

      {/* Attached Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <File size={20} className="mr-2" />
            Attached Documents ({dpr.documents})
          </h3>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-orange-600 hover:text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-50">
            <Download size={16} />
            <span>Download All</span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {dpr.attachedDocuments.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.type} • {doc.size} • Uploaded by {doc.uploadedBy} on {new Date(doc.uploadedDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
              <button className="ml-4 text-orange-600 hover:text-orange-700">
                <Download size={20} />
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
            <p className="text-xs text-gray-600 mb-2">DPR ID</p>
            <p className="text-lg font-bold text-gray-900">{dpr.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Version</p>
            <p className="text-lg font-bold text-blue-600">{dpr.version}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Cost</p>
            <p className="text-sm font-bold text-green-600">{dpr.estimatedCost}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Duration</p>
            <p className="text-lg font-bold text-purple-600">{dpr.projectDetails.duration}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              dpr.status === 'Approved' ? 'text-green-600' :
              dpr.status === 'Under Review' ? 'text-blue-600' :
              dpr.status === 'Rejected' ? 'text-red-600' :
              'text-orange-600'
            }`}>
              {dpr.status}
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
          <span>Download DPR</span>
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