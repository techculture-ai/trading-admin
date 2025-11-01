'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, User, FileText, CheckCircle, Clock, AlertCircle, MapPin, Building, Briefcase, TrendingUp, File } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface WorkflowDetails {
  id: string
  parcelId: string
  owner: string
  stage: string
  status: 'In Progress' | 'Pending Approval' | 'Completed' | 'Overdue'
  startDate: string
  dueDate: string
  assignee: string
  description: string
  documents: string[]
  history: Array<{
    stage: string
    date: string
    status: string
    notes: string
  }>
  parcelDetails: {
    location: string
    area: string
    surveyNo: string
    khataNo: string
    village: string
    district: string
  }
  ownerDetails: {
    name: string
    address: string
    contact: string
    email: string
    aadharNo: string
    panNo: string
  }
  workflow: {
    initiatedBy: string
    currentAssignee: string
    priority: string
    estimatedCompletion: string
    actualCompletion: string
  }
}

interface StageProgress {
  name: string
  status: 'Completed' | 'In Progress' | 'Pending' | 'Skipped'
  startDate: string
  endDate: string
  assignee: string
  notes: string
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function AcquisitionWorkflowDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  
  // Mock data - in real app, fetch based on params.id
  const [workflow] = useState<WorkflowDetails>({
    id: 'WF-001',
    parcelId: 'PAR-145',
    owner: 'Ram Kumar Singh',
    stage: 'Notice Issuance',
    status: 'In Progress',
    startDate: '15 Jan 2024',
    dueDate: '30 Jan 2024',
    assignee: 'Rajesh Sharma',
    description: 'Land acquisition workflow for infrastructure development project. Initial notice has been issued to the landowner and acknowledgement is pending.',
    documents: ['Notice Copy', 'Acknowledgement', 'Survey Report', 'Ownership Certificate'],
    history: [
      { 
        stage: 'Initiated', 
        date: '15 Jan 2024', 
        status: 'Completed', 
        notes: 'Workflow started by Land Acquisition Officer' 
      },
      { 
        stage: 'Notice Issuance', 
        date: '16 Jan 2024', 
        status: 'In Progress', 
        notes: 'Notice sent to owner via registered post' 
      }
    ],
    parcelDetails: {
      location: 'Gomti Nagar Extension, Lucknow',
      area: '2.5 Acres',
      surveyNo: 'SUR-2024-145',
      khataNo: 'KH-456',
      village: 'Gomti Nagar',
      district: 'Lucknow',
    },
    ownerDetails: {
      name: 'Ram Kumar Singh',
      address: 'House No. 123, Gomti Nagar, Lucknow - 226010',
      contact: '+91 9876543210',
      email: 'ramkumar@email.com',
      aadharNo: 'XXXX-XXXX-1234',
      panNo: 'ABCDE1234F',
    },
    workflow: {
      initiatedBy: 'Land Acquisition Officer',
      currentAssignee: 'Rajesh Sharma',
      priority: 'High',
      estimatedCompletion: '30 Jan 2024',
      actualCompletion: '-',
    }
  })

  const [stageProgress] = useState<StageProgress[]>([
    {
      name: 'Initiated',
      status: 'Completed',
      startDate: '15 Jan 2024',
      endDate: '15 Jan 2024',
      assignee: 'Land Acquisition Officer',
      notes: 'Workflow started for parcel acquisition',
    },
    {
      name: 'Notice Issuance',
      status: 'In Progress',
      startDate: '16 Jan 2024',
      endDate: '-',
      assignee: 'Rajesh Sharma',
      notes: 'Notice sent to landowner',
    },
    {
      name: 'Objection Handling',
      status: 'Pending',
      startDate: '-',
      endDate: '-',
      assignee: 'Not Assigned',
      notes: 'Awaiting owner response',
    },
    {
      name: 'Valuation',
      status: 'Pending',
      startDate: '-',
      endDate: '-',
      assignee: 'Not Assigned',
      notes: 'Land valuation pending',
    },
    {
      name: 'Compensation Determination',
      status: 'Pending',
      startDate: '-',
      endDate: '-',
      assignee: 'Not Assigned',
      notes: 'Compensation calculation pending',
    },
    {
      name: 'Payment Processing',
      status: 'Pending',
      startDate: '-',
      endDate: '-',
      assignee: 'Not Assigned',
      notes: 'Payment release pending',
    },
    {
      name: 'Possession',
      status: 'Pending',
      startDate: '-',
      endDate: '-',
      assignee: 'Not Assigned',
      notes: 'Land possession pending',
    },
    {
      name: 'Mutation',
      status: 'Pending',
      startDate: '-',
      endDate: '-',
      assignee: 'Not Assigned',
      notes: 'Property mutation pending',
    },
  ])

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-15 10:00:00',
      action: 'Workflow Initiated',
      performedBy: 'Land Acquisition Officer',
      details: 'New acquisition workflow started for parcel PAR-145',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-15 14:30:00',
      action: 'Assignee Updated',
      performedBy: 'System Admin',
      details: 'Workflow assigned to Rajesh Sharma',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-16 09:00:00',
      action: 'Stage Updated',
      performedBy: 'Rajesh Sharma',
      details: 'Moved to Notice Issuance stage',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-16 11:30:00',
      action: 'Document Uploaded',
      performedBy: 'Rajesh Sharma',
      details: 'Notice copy uploaded to workflow',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-16 15:00:00',
      action: 'Notice Dispatched',
      performedBy: 'Rajesh Sharma',
      details: 'Notice sent via registered post',
    },
  ])

  const handleExport = () => {
    const content = `
Acquisition Workflow Report
============================

Workflow ID: ${workflow.id}
Parcel ID: ${workflow.parcelId}
Current Stage: ${workflow.stage}
Status: ${workflow.status}

Owner Details
=============
Name: ${workflow.ownerDetails.name}
Address: ${workflow.ownerDetails.address}
Contact: ${workflow.ownerDetails.contact}
Email: ${workflow.ownerDetails.email}
Aadhar: ${workflow.ownerDetails.aadharNo}
PAN: ${workflow.ownerDetails.panNo}

Parcel Details
==============
Location: ${workflow.parcelDetails.location}
Area: ${workflow.parcelDetails.area}
Survey No: ${workflow.parcelDetails.surveyNo}
Khata No: ${workflow.parcelDetails.khataNo}
Village: ${workflow.parcelDetails.village}
District: ${workflow.parcelDetails.district}

Workflow Information
====================
Initiated By: ${workflow.workflow.initiatedBy}
Current Assignee: ${workflow.workflow.currentAssignee}
Priority: ${workflow.workflow.priority}
Start Date: ${workflow.startDate}
Due Date: ${workflow.dueDate}
Estimated Completion: ${workflow.workflow.estimatedCompletion}

Stage Progress
==============
${stageProgress.map(s => `${s.name}: ${s.status} (${s.assignee})`).join('\n')}

Documents
=========
${workflow.documents.join('\n')}

Description
===========
${workflow.description}

Workflow History
================
${workflow.history.map(h => `${h.date} - ${h.stage} (${h.status}): ${h.notes}`).join('\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `workflow_${workflow.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Pending Approval':
        return 'bg-orange-100 text-orange-700'
      case 'Overdue':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle size={40} className="text-green-600" />
      case 'In Progress':
        return <Clock size={40} className="text-blue-600" />
      case 'Pending Approval':
      case 'Overdue':
        return <AlertCircle size={40} className="text-orange-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Pending':
        return 'bg-gray-100 text-gray-700'
      case 'Skipped':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const completedStages = stageProgress.filter(s => s.status === 'Completed').length
  const totalStages = stageProgress.length
  const progressPercentage = ((completedStages / totalStages) * 100).toFixed(0)

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
            <h1 className="text-2xl font-bold text-gray-900">Workflow {workflow.id}</h1>
            <p className="text-sm text-gray-600 mt-1">Parcel {workflow.parcelId} • Owner: {workflow.owner}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(workflow.status)}`}>
            {workflow.status}
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

      {/* Status Card */}
      <div className={`rounded-lg p-8 text-white ${
        workflow.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        workflow.status === 'In Progress' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        workflow.status === 'Overdue' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              workflow.status === 'Completed' ? 'text-green-100' :
              workflow.status === 'In Progress' ? 'text-blue-100' :
              workflow.status === 'Overdue' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              Current Stage
            </p>
            <h2 className="text-4xl font-bold">{workflow.stage}</h2>
            <p className={`text-sm mt-2 ${
              workflow.status === 'Completed' ? 'text-green-100' :
              workflow.status === 'In Progress' ? 'text-blue-100' :
              workflow.status === 'Overdue' ? 'text-red-100' :
              'text-orange-100'
            }`}>
              Progress: {completedStages}/{totalStages} stages • {progressPercentage}%
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(workflow.status)}
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Workflow Progress</p>
              <h3 className="text-3xl font-bold text-blue-600">{progressPercentage}%</h3>
              <p className="text-xs text-gray-500 mt-2">{completedStages} of {totalStages} completed</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Priority</p>
              <h3 className="text-2xl font-bold text-orange-600">{workflow.workflow.priority}</h3>
              <p className="text-xs text-gray-500 mt-2">Workflow priority</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Documents</p>
              <h3 className="text-3xl font-bold text-purple-600">{workflow.documents.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Attached files</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <File size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Days Elapsed</p>
              <h3 className="text-3xl font-bold text-gray-900">15</h3>
              <p className="text-xs text-gray-500 mt-2">Since {workflow.startDate}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Workflow Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Workflow ID</p>
            <p className="text-sm font-medium text-gray-900">{workflow.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Parcel ID</p>
            <p className="text-sm font-medium text-gray-900">{workflow.parcelId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Stage</p>
            <p className="text-sm font-medium text-gray-900">{workflow.stage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Initiated By</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {workflow.workflow.initiatedBy}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Assignee</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {workflow.workflow.currentAssignee}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Priority Level</p>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              workflow.workflow.priority === 'High' ? 'bg-red-100 text-red-700' :
              workflow.workflow.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {workflow.workflow.priority}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Start Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {workflow.startDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Due Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {workflow.dueDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimated Completion</p>
            <p className="text-sm font-medium text-gray-900">{workflow.workflow.estimatedCompletion}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Completion Status</span>
            <span className="font-medium text-gray-900">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progressPercentage}%` }}
            >
              {parseFloat(progressPercentage) > 10 && (
                <span className="text-xs text-white font-medium">{progressPercentage}%</span>
              )}
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{completedStages} stages completed</span>
            <span>{totalStages - completedStages} stages remaining</span>
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
            <p className="text-sm font-medium text-gray-900">{workflow.parcelDetails.surveyNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Khata Number</p>
            <p className="text-sm font-medium text-gray-900">{workflow.parcelDetails.khataNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Area</p>
            <p className="text-sm font-medium text-gray-900">{workflow.parcelDetails.area}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Village</p>
            <p className="text-sm font-medium text-gray-900">{workflow.parcelDetails.village}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">District</p>
            <p className="text-sm font-medium text-gray-900">{workflow.parcelDetails.district}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1" />
              {workflow.parcelDetails.location}
            </p>
          </div>
        </div>
      </div>

      {/* Owner Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Owner Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Owner Name</p>
            <p className="text-sm font-medium text-gray-900">{workflow.ownerDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
            <p className="text-sm font-medium text-gray-900">{workflow.ownerDetails.contact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900">{workflow.ownerDetails.email}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{workflow.ownerDetails.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{workflow.ownerDetails.panNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Aadhar Number</p>
            <p className="text-sm font-medium text-gray-900">{workflow.ownerDetails.aadharNo}</p>
          </div>
        </div>
      </div>

      {/* Stage Progress Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Briefcase size={20} className="mr-2" />
            Workflow Stages
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {stageProgress.map((stage, index) => (
              <div key={index} className="relative">
                {index !== stageProgress.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                    stage.status === 'Completed' ? 'bg-green-100' :
                    stage.status === 'In Progress' ? 'bg-blue-100' :
                    stage.status === 'Skipped' ? 'bg-yellow-100' :
                    'bg-gray-100'
                  }`}>
                    {stage.status === 'Completed' ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : stage.status === 'In Progress' ? (
                      <Clock size={16} className="text-blue-600" />
                    ) : (
                      <Clock size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{stage.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {stage.status === 'Completed' || stage.status === 'In Progress' ? 
                            `Started: ${stage.startDate}${stage.endDate !== '-' ? ` • Completed: ${stage.endDate}` : ''}` :
                            'Not Started'
                          }
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Assignee</p>
                          <p className="text-sm font-medium text-gray-900">{stage.assignee}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStageStatusColor(stage.status)}`}>
                          {stage.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 bg-gray-50 rounded p-2">{stage.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <File size={20} className="mr-2" />
          Attached Documents ({workflow.documents.length})
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {workflow.documents.map((doc, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                  <File size={20} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc}</p>
                  <p className="text-xs text-gray-500">PDF Document</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Workflow Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {workflow.description}
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
            <p className="text-xs text-gray-600 mb-2">Workflow ID</p>
            <p className="text-lg font-bold text-gray-900">{workflow.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Current Stage</p>
            <p className="text-lg font-bold text-blue-600">{workflow.stage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Progress</p>
            <p className="text-lg font-bold text-orange-600">{progressPercentage}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              workflow.status === 'Completed' ? 'text-green-600' :
              workflow.status === 'In Progress' ? 'text-blue-600' :
              workflow.status === 'Overdue' ? 'text-red-600' :
              'text-orange-600'
            }`}>
              {workflow.status}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Priority</p>
            <p className="text-lg font-bold text-red-600">{workflow.workflow.priority}</p>
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
          <span>Print Workflow</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <User size={20} />
          <span>Reassign</span>
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