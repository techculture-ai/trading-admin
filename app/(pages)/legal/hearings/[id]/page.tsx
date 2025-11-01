'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, Clock, User, MapPin, FileText, CheckCircle, AlertCircle, DollarSign, Share2, Printer, Edit, Gavel, Bell, Building } from 'lucide-react'

interface HearingDetails {
  id: string
  caseNo: string
  caseTitle: string
  court: string
  bench: string
  hearingDate: string
  hearingTime: string
  counsel: string
  purpose: string
  status: 'Scheduled' | 'Postponed' | 'Completed' | 'Cancelled' | 'Adjourned'
  caseId: string
  courtRoomNo: string
  judgeName: string
  previousDate: string
  nextDate: string
  remarks: string
  documents: string
  attendees: string
  hearingDetails: {
    caseType: string
    caseCategory: string
    caseValue: string
    filingDate: string
    plaintiff: string
    defendant: string
  }
  preparation: {
    item: string
    status: string
    assignedTo: string
    completedDate: string
  }[]
  hearingNotes: {
    date: string
    time: string
    note: string
    createdBy: string
  }[]
  outcome: {
    summary: string
    orderPassed: string
    nextAction: string
    dateOfOrder: string
  }
  participants: {
    role: string
    name: string
    organization: string
    contact: string
  }[]
  timeline: {
    date: string
    event: string
    details: string
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

export default function HearingDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [hearing] = useState<HearingDetails>({
    id: 'HEAR-001',
    caseNo: 'CIV/2024/045',
    caseTitle: 'ULB vs ABC Contractors Ltd.',
    court: 'District Court, Lucknow',
    bench: 'Court No. 5',
    hearingDate: '2024-10-28',
    hearingTime: '10:30',
    counsel: 'Adv. Rajesh Kumar',
    purpose: 'Evidence Recording',
    status: 'Scheduled',
    caseId: 'CASE-2024-001',
    courtRoomNo: 'Court Room No. 5',
    judgeName: 'Hon. Justice P.K. Sharma',
    previousDate: '2024-09-25',
    nextDate: '',
    remarks: 'Cross-examination of plaintiff witness. All relevant documents to be submitted before hearing. Witness must be present in court.',
    documents: 'Witness affidavit, supporting documents, evidence exhibits A-1 to A-5, previous hearing notes',
    attendees: 'Adv. Rajesh Kumar (Plaintiff Counsel), Adv. Suresh Verma (Defendant Counsel), Witness - Mr. Sharma',
    hearingDetails: {
      caseType: 'Civil',
      caseCategory: 'Contract Dispute',
      caseValue: '₹25,00,000',
      filingDate: '2024-01-15',
      plaintiff: 'Urban Local Body, Lucknow',
      defendant: 'ABC Contractors Ltd.',
    },
    preparation: [
      {
        item: 'Prepare witness examination questions',
        status: 'Completed',
        assignedTo: 'Adv. Rajesh Kumar',
        completedDate: '2024-10-26',
      },
      {
        item: 'Review previous hearing notes',
        status: 'Completed',
        assignedTo: 'Legal Team',
        completedDate: '2024-10-25',
      },
      {
        item: 'Organize evidence documents',
        status: 'Completed',
        assignedTo: 'Case Manager',
        completedDate: '2024-10-27',
      },
      {
        item: 'Brief witness on court proceedings',
        status: 'In Progress',
        assignedTo: 'Adv. Rajesh Kumar',
        completedDate: '',
      },
      {
        item: 'Prepare cross-examination counter points',
        status: 'Pending',
        assignedTo: 'Legal Team',
        completedDate: '',
      },
    ],
    hearingNotes: [
      {
        date: '2024-10-27',
        time: '15:30',
        note: 'Witness briefing completed. All documents reviewed and organized.',
        createdBy: 'Adv. Rajesh Kumar',
      },
      {
        date: '2024-10-26',
        time: '11:00',
        note: 'Examination questions prepared and reviewed with team.',
        createdBy: 'Legal Team',
      },
      {
        date: '2024-10-25',
        time: '14:00',
        note: 'Previous hearing notes reviewed. Key points identified for cross-examination.',
        createdBy: 'Case Manager',
      },
    ],
    outcome: {
      summary: 'To be updated after hearing',
      orderPassed: 'Pending',
      nextAction: 'Continue with cross-examination',
      dateOfOrder: '',
    },
    participants: [
      {
        role: 'Presiding Judge',
        name: 'Hon. Justice P.K. Sharma',
        organization: 'District Court, Lucknow',
        contact: '+91 522 2234567',
      },
      {
        role: 'Plaintiff Counsel',
        name: 'Adv. Rajesh Kumar',
        organization: 'Urban Local Body Legal Cell',
        contact: '+91 98765 43210',
      },
      {
        role: 'Defendant Counsel',
        name: 'Adv. Suresh Verma',
        organization: 'Verma & Associates',
        contact: '+91 98765 43211',
      },
      {
        role: 'Witness',
        name: 'Mr. Sharma',
        organization: 'ULB Engineering Department',
        contact: '+91 98765 43212',
      },
    ],
    timeline: [
      {
        date: '2024-10-27',
        event: 'Witness Briefing',
        details: 'Witness briefed on court proceedings and examination process',
        status: 'Completed',
      },
      {
        date: '2024-10-26',
        event: 'Document Preparation',
        details: 'All evidence documents organized and reviewed',
        status: 'Completed',
      },
      {
        date: '2024-10-25',
        event: 'Hearing Scheduled',
        details: 'Hearing date confirmed and notified to all parties',
        status: 'Completed',
      },
      {
        date: '2024-09-25',
        event: 'Previous Hearing',
        details: 'Plaintiff witness examined, cross-examination pending',
        status: 'Completed',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-27 15:30:00',
      action: 'Hearing Note Added',
      performedBy: 'Adv. Rajesh Kumar',
      details: 'Witness briefing completed note added',
    },
    {
      id: 'AL-002',
      timestamp: '2024-10-26 11:00:00',
      action: 'Preparation Updated',
      performedBy: 'Legal Team',
      details: 'Examination questions preparation marked as completed',
    },
    {
      id: 'AL-003',
      timestamp: '2024-10-25 14:00:00',
      action: 'Hearing Scheduled',
      performedBy: 'Court Registry',
      details: 'Hearing scheduled for 28 Oct 2024 at 10:30 AM',
    },
    {
      id: 'AL-004',
      timestamp: '2024-10-25 09:00:00',
      action: 'Documents Uploaded',
      performedBy: 'Case Manager',
      details: 'Evidence documents and witness affidavit uploaded',
    },
  ])

  const handleExport = () => {
    const content = `
HEARING DETAILS REPORT
======================

Hearing ID: ${hearing.id}
Case Number: ${hearing.caseNo}
Status: ${hearing.status}

HEARING INFORMATION
===================
Case Title: ${hearing.caseTitle}
Court: ${hearing.court}
Court Room: ${hearing.courtRoomNo}
Bench: ${hearing.bench}
Judge: ${hearing.judgeName}

HEARING SCHEDULE
================
Hearing Date: ${new Date(hearing.hearingDate).toLocaleDateString('en-IN')}
Hearing Time: ${hearing.hearingTime}
Purpose: ${hearing.purpose}
Previous Hearing: ${new Date(hearing.previousDate).toLocaleDateString('en-IN')}

CASE DETAILS
============
Case Type: ${hearing.hearingDetails.caseType}
Category: ${hearing.hearingDetails.caseCategory}
Case Value: ${hearing.hearingDetails.caseValue}
Filing Date: ${new Date(hearing.hearingDetails.filingDate).toLocaleDateString('en-IN')}
Plaintiff: ${hearing.hearingDetails.plaintiff}
Defendant: ${hearing.hearingDetails.defendant}

LEGAL COUNSEL
=============
Appearing Counsel: ${hearing.counsel}

PARTICIPANTS
============
${hearing.participants.map(p => `${p.role}: ${p.name}\n   Organization: ${p.organization}\n   Contact: ${p.contact}`).join('\n\n')}

REQUIRED DOCUMENTS
==================
${hearing.documents}

ATTENDEES
=========
${hearing.attendees}

HEARING PREPARATION
===================
${hearing.preparation.map(p => `${p.item}\n   Status: ${p.status}\n   Assigned To: ${p.assignedTo}\n   ${p.completedDate ? `Completed: ${p.completedDate}` : 'Pending'}`).join('\n\n')}

HEARING NOTES
=============
${hearing.hearingNotes.map(n => `${n.date} ${n.time} - ${n.createdBy}\n   ${n.note}`).join('\n\n')}

HEARING OUTCOME
===============
Summary: ${hearing.outcome.summary}
Order Passed: ${hearing.outcome.orderPassed}
Next Action: ${hearing.outcome.nextAction}

REMARKS
=======
${hearing.remarks}

TIMELINE
========
${hearing.timeline.map(t => `${t.date} - ${t.event}\n   ${t.details}\n   Status: ${t.status}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Hearing_${hearing.id}_${hearing.hearingDate}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-green-100 text-green-700'
      case 'Completed':
        return 'bg-blue-100 text-blue-700'
      case 'Postponed':
        return 'bg-orange-100 text-orange-700'
      case 'Adjourned':
        return 'bg-yellow-100 text-yellow-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Completed':
        return <CheckCircle size={40} className="text-blue-600" />
      case 'Postponed':
        return <Clock size={40} className="text-orange-600" />
      case 'Adjourned':
        return <Clock size={40} className="text-yellow-600" />
      case 'Cancelled':
        return <AlertCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const completedTasks = hearing.preparation.filter(p => p.status === 'Completed').length
  const totalTasks = hearing.preparation.length
  const preparationProgress = ((completedTasks / totalTasks) * 100).toFixed(0)

  const daysUntilHearing = Math.ceil((new Date(hearing.hearingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

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
            <h1 className="text-2xl font-bold text-gray-900">{hearing.caseTitle}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {hearing.caseNo} • {hearing.purpose} • {hearing.court}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(hearing.status)}`}>
            {hearing.status}
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
        hearing.status === 'Scheduled' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        hearing.status === 'Completed' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        hearing.status === 'Postponed' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        hearing.status === 'Adjourned' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              hearing.status === 'Scheduled' ? 'text-green-100' :
              hearing.status === 'Completed' ? 'text-blue-100' :
              hearing.status === 'Postponed' ? 'text-orange-100' :
              hearing.status === 'Adjourned' ? 'text-yellow-100' :
              'text-red-100'
            }`}>
              Hearing Status
            </p>
            <h2 className="text-4xl font-bold">{hearing.status}</h2>
            <p className={`text-sm mt-2 ${
              hearing.status === 'Scheduled' ? 'text-green-100' :
              hearing.status === 'Completed' ? 'text-blue-100' :
              hearing.status === 'Postponed' ? 'text-orange-100' :
              hearing.status === 'Adjourned' ? 'text-yellow-100' :
              'text-red-100'
            }`}>
              {new Date(hearing.hearingDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })} at {hearing.hearingTime} • {hearing.courtRoomNo}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(hearing.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Days Until Hearing</p>
              <h3 className="text-2xl font-bold text-gray-900">{daysUntilHearing > 0 ? daysUntilHearing : 'Today'}</h3>
              <p className="text-xs text-gray-500 mt-2">{daysUntilHearing > 0 ? 'Days remaining' : 'Hearing day'}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Hearing Time</p>
              <h3 className="text-2xl font-bold text-blue-600">{hearing.hearingTime}</h3>
              <p className="text-xs text-gray-500 mt-2">{hearing.courtRoomNo}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Preparation</p>
              <h3 className="text-2xl font-bold text-purple-600">{preparationProgress}%</h3>
              <p className="text-xs text-gray-500 mt-2">{completedTasks}/{totalTasks} tasks</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Participants</p>
              <h3 className="text-2xl font-bold text-green-600">{hearing.participants.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Attending</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Hearing Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Gavel size={20} className="mr-2" />
          Hearing Information
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Hearing ID</p>
            <p className="text-sm font-medium text-gray-900">{hearing.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Number</p>
            <p className="text-sm font-medium text-gray-900">{hearing.caseNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Case ID</p>
            <p className="text-sm font-medium text-gray-900">{hearing.caseId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Purpose</p>
            <p className="text-sm font-medium text-gray-900">{hearing.purpose}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Hearing Date</p>
            <p className="text-lg font-bold text-orange-600">
              {new Date(hearing.hearingDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Hearing Time</p>
            <p className="text-lg font-bold text-blue-600">{hearing.hearingTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Previous Hearing</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(hearing.previousDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(hearing.status)}`}>
              {hearing.status}
            </span>
          </div>
        </div>
      </div>

      {/* Court Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Court & Judicial Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Court</p>
            <p className="text-sm font-medium text-gray-900">{hearing.court}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Court Room</p>
            <p className="text-sm font-medium text-gray-900">{hearing.courtRoomNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Bench</p>
            <p className="text-sm font-medium text-gray-900">{hearing.bench}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Presiding Judge</p>
            <p className="text-sm font-medium text-gray-900">{hearing.judgeName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Legal Counsel</p>
            <p className="text-sm font-medium text-gray-900">{hearing.counsel}</p>
          </div>
        </div>
      </div>

      {/* Case Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Case Details</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Type</p>
            <p className="text-sm font-medium text-gray-900">{hearing.hearingDetails.caseType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Category</p>
            <p className="text-sm font-medium text-gray-900">{hearing.hearingDetails.caseCategory}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Value</p>
            <p className="text-lg font-bold text-green-600">{hearing.hearingDetails.caseValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Filing Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(hearing.hearingDetails.filingDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Plaintiff</p>
            <p className="text-sm font-medium text-gray-900">{hearing.hearingDetails.plaintiff}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Defendant</p>
            <p className="text-sm font-medium text-gray-900">{hearing.hearingDetails.defendant}</p>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Hearing Participants
        </h3>
        <div className="space-y-4">
          {hearing.participants.map((participant, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Role</p>
                  <p className="text-sm font-bold text-gray-900">{participant.role}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Organization</p>
                  <p className="text-sm font-medium text-gray-900">{participant.organization}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <p className="text-sm font-medium text-gray-900">{participant.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preparation Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Hearing Preparation</h3>
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${preparationProgress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{preparationProgress}%</span>
          </div>
        </div>
        <div className="space-y-3">
          {hearing.preparation.map((task, index) => (
            <div key={index} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-all">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  task.status === 'Completed' ? 'bg-green-100' :
                  task.status === 'In Progress' ? 'bg-blue-100' :
                  'bg-orange-100'
                }`}>
                  {task.status === 'Completed' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : task.status === 'In Progress' ? (
                    <Clock size={16} className="text-blue-600" />
                  ) : (
                    <AlertCircle size={16} className="text-orange-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.item}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Assigned to: {task.assignedTo}
                    {task.completedDate && ` • Completed: ${task.completedDate}`}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hearing Notes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FileText size={20} className="mr-2" />
          Hearing Notes
        </h3>
        <div className="space-y-4">
          {hearing.hearingNotes.map((note, index) => (
            <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">{note.createdBy}</p>
                <p className="text-xs text-gray-500">
                  {new Date(note.date).toLocaleDateString('en-IN', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })} • {note.time}
                </p>
              </div>
              <p className="text-sm text-gray-700">{note.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Required Documents
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {hearing.documents}
        </p>
      </div>

      {/* Attendees */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendees</h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {hearing.attendees}
        </p>
      </div>

      {/* Hearing Outcome */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Hearing Outcome</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Summary</p>
            <p className="text-sm font-medium text-gray-900">{hearing.outcome.summary}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Order Passed</p>
            <p className="text-sm font-medium text-gray-900">{hearing.outcome.orderPassed}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Next Action</p>
            <p className="text-sm font-medium text-gray-900">{hearing.outcome.nextAction}</p>
          </div>
        </div>
      </div>

      {/* Remarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Remarks & Instructions</h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          {hearing.remarks}
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Hearing Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {hearing.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== hearing.timeline.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        <Calendar size={12} className="inline mr-1" />
                        {new Date(event.date).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
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
            <p className="text-xs text-gray-600 mb-2">Hearing ID</p>
            <p className="text-lg font-bold text-gray-900">{hearing.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Date</p>
            <p className="text-sm font-bold text-orange-600">
              {new Date(hearing.hearingDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Time</p>
            <p className="text-lg font-bold text-blue-600">{hearing.hearingTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Progress</p>
            <p className="text-lg font-bold text-purple-600">{preparationProgress}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              hearing.status === 'Scheduled' ? 'text-green-600' :
              hearing.status === 'Completed' ? 'text-blue-600' :
              hearing.status === 'Postponed' ? 'text-orange-600' :
              hearing.status === 'Adjourned' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {hearing.status}
            </p>
          </div>
        </div>
      </div>

      {/* Reminder Alert */}
      {daysUntilHearing >= 0 && daysUntilHearing <= 3 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-3">
          <Bell size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-orange-900">Hearing Reminder</p>
            <p className="text-sm text-orange-700 mt-1">
              {daysUntilHearing === 0 
                ? 'Hearing is scheduled for today!' 
                : `Hearing is scheduled in ${daysUntilHearing} day${daysUntilHearing > 1 ? 's' : ''}. Ensure all preparations are completed.`}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button 
          onClick={handleExport}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Download Hearing Details</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Hearing</span>
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
          <span>Back to Calendar</span>
        </button>
      </div>
    </div>
  )
}