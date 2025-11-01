'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Scale, Calendar, User, MapPin, FileText, CheckCircle, Clock, AlertCircle, DollarSign, Share2, Printer, Edit, Building, Gavel } from 'lucide-react'

interface CaseDetails {
  id: string
  caseNo: string
  caseType: string
  title: string
  court: string
  filingDate: string
  nextHearing: string
  counsel: string
  status: 'Active' | 'Closed' | 'Won' | 'Lost' | 'Settled' | 'Pending'
  stage: string
  plaintiff: string
  defendant: string
  caseValue: string
  description: string
  judgeName: string
  caseCategory: string
  caseDetails: {
    courtRoomNo: string
    benchType: string
    caseNature: string
    actsSections: string
    firstHearingDate: string
    registrationDate: string
    priority: string
  }
  parties: {
    role: string
    name: string
    address: string
    counsel: string
    contact: string
  }[]
  hearingHistory: {
    date: string
    purpose: string
    court: string
    judge: string
    outcome: string
    nextDate: string
    remarks: string
  }[]
  documents: {
    name: string
    type: string
    uploadedDate: string
    uploadedBy: string
    description: string
  }[]
  orders: {
    date: string
    orderType: string
    passedBy: string
    summary: string
    status: string
  }[]
  expenses: {
    date: string
    description: string
    amount: string
    category: string
    paidTo: string
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

export default function CaseDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [caseData] = useState<CaseDetails>({
    id: 'CASE-2024-001',
    caseNo: 'CIV/2024/045',
    caseType: 'Civil',
    title: 'ULB vs ABC Contractors Ltd.',
    court: 'District Court, Lucknow',
    filingDate: '2024-01-15',
    nextHearing: '2024-10-28',
    counsel: 'Adv. Rajesh Kumar',
    status: 'Active',
    stage: 'Evidence',
    plaintiff: 'Urban Local Body, Lucknow',
    defendant: 'ABC Contractors Ltd.',
    caseValue: '₹25,00,000',
    description: 'This case pertains to a contract breach and payment dispute between Urban Local Body, Lucknow and ABC Contractors Ltd. The dispute arose from non-completion of a construction project within the stipulated timeline and quality standards as per the agreement dated 15th March 2023.',
    judgeName: 'Hon. Justice P.K. Sharma',
    caseCategory: 'Contract Dispute',
    caseDetails: {
      courtRoomNo: 'Court Room No. 3',
      benchType: 'Single Bench',
      caseNature: 'Contractual',
      actsSections: 'Indian Contract Act, 1872 - Section 73, 74',
      firstHearingDate: '2024-02-20',
      registrationDate: '2024-01-15',
      priority: 'High',
    },
    parties: [
      {
        role: 'Plaintiff',
        name: 'Urban Local Body, Lucknow',
        address: 'Municipal Corporation Building, Hazratganj, Lucknow - 226001',
        counsel: 'Adv. Rajesh Kumar',
        contact: '+91 98765 43210',
      },
      {
        role: 'Defendant',
        name: 'ABC Contractors Ltd.',
        address: 'Plot No. 123, Industrial Area, Lucknow - 226010',
        counsel: 'Adv. Suresh Verma',
        contact: '+91 98765 43211',
      },
    ],
    hearingHistory: [
      {
        date: '2024-09-25',
        purpose: 'Evidence Recording',
        court: 'District Court, Lucknow',
        judge: 'Hon. Justice P.K. Sharma',
        outcome: 'Plaintiff witness examined',
        nextDate: '2024-10-28',
        remarks: 'Cross-examination pending',
      },
      {
        date: '2024-08-20',
        purpose: 'Document Verification',
        court: 'District Court, Lucknow',
        judge: 'Hon. Justice P.K. Sharma',
        outcome: 'Documents submitted and verified',
        nextDate: '2024-09-25',
        remarks: 'All documents found in order',
      },
      {
        date: '2024-07-15',
        purpose: 'Written Statement',
        court: 'District Court, Lucknow',
        judge: 'Hon. Justice P.K. Sharma',
        outcome: 'Defendant filed written statement',
        nextDate: '2024-08-20',
        remarks: 'Issues framed',
      },
      {
        date: '2024-05-10',
        purpose: 'First Hearing',
        court: 'District Court, Lucknow',
        judge: 'Hon. Justice P.K. Sharma',
        outcome: 'Notice issued to defendant',
        nextDate: '2024-07-15',
        remarks: 'Defendant appeared through counsel',
      },
      {
        date: '2024-02-20',
        purpose: 'Case Admission',
        court: 'District Court, Lucknow',
        judge: 'Hon. Justice P.K. Sharma',
        outcome: 'Case admitted for hearing',
        nextDate: '2024-05-10',
        remarks: 'Case number allotted',
      },
    ],
    documents: [
      {
        name: 'Plaint Copy.pdf',
        type: 'Plaint',
        uploadedDate: '2024-01-15',
        uploadedBy: 'Adv. Rajesh Kumar',
        description: 'Original plaint filed by plaintiff',
      },
      {
        name: 'Written Statement.pdf',
        type: 'Written Statement',
        uploadedDate: '2024-07-15',
        uploadedBy: 'Adv. Suresh Verma',
        description: 'Written statement filed by defendant',
      },
      {
        name: 'Contract Agreement.pdf',
        type: 'Contract',
        uploadedDate: '2024-01-15',
        uploadedBy: 'Adv. Rajesh Kumar',
        description: 'Original contract agreement dated 15/03/2023',
      },
      {
        name: 'Payment Records.pdf',
        type: 'Financial Document',
        uploadedDate: '2024-01-15',
        uploadedBy: 'Adv. Rajesh Kumar',
        description: 'Payment records and bank statements',
      },
      {
        name: 'Site Inspection Report.pdf',
        type: 'Expert Report',
        uploadedDate: '2024-08-20',
        uploadedBy: 'Court Commissioner',
        description: 'Site inspection report by court-appointed expert',
      },
      {
        name: 'Witness Affidavit - 1.pdf',
        type: 'Affidavit',
        uploadedDate: '2024-09-25',
        uploadedBy: 'Adv. Rajesh Kumar',
        description: 'Affidavit of plaintiff witness',
      },
    ],
    orders: [
      {
        date: '2024-09-25',
        orderType: 'Interlocutory Order',
        passedBy: 'Hon. Justice P.K. Sharma',
        summary: 'Order for cross-examination of plaintiff witness on next date',
        status: 'Active',
      },
      {
        date: '2024-08-20',
        orderType: 'Document Verification',
        passedBy: 'Hon. Justice P.K. Sharma',
        summary: 'All documents verified and marked as evidence',
        status: 'Completed',
      },
      {
        date: '2024-07-15',
        orderType: 'Issue Framing',
        passedBy: 'Hon. Justice P.K. Sharma',
        summary: 'Issues framed and evidence recording commenced',
        status: 'Completed',
      },
      {
        date: '2024-02-20',
        orderType: 'Admission Order',
        passedBy: 'Hon. Justice P.K. Sharma',
        summary: 'Case admitted for hearing and case number allotted',
        status: 'Completed',
      },
    ],
    expenses: [
      {
        date: '2024-09-25',
        description: 'Witness Travel Expenses',
        amount: '₹5,000',
        category: 'Witness Expenses',
        paidTo: 'Witness - Mr. Sharma',
      },
      {
        date: '2024-08-20',
        description: 'Document Copying & Certification',
        amount: '₹2,500',
        category: 'Court Fees',
        paidTo: 'Court Office',
      },
      {
        date: '2024-08-15',
        description: 'Site Inspection Fees',
        amount: '₹15,000',
        category: 'Expert Fees',
        paidTo: 'Court Commissioner',
      },
      {
        date: '2024-07-15',
        description: 'Legal Counsel Fees',
        amount: '₹50,000',
        category: 'Advocate Fees',
        paidTo: 'Adv. Rajesh Kumar',
      },
      {
        date: '2024-01-15',
        description: 'Court Filing Fees',
        amount: '₹25,000',
        category: 'Court Fees',
        paidTo: 'District Court, Lucknow',
      },
    ],
    timeline: [
      {
        date: '2024-09-25',
        event: 'Evidence Recording',
        details: 'Plaintiff witness examined in court',
        status: 'Completed',
      },
      {
        date: '2024-08-20',
        event: 'Document Verification',
        details: 'All documents verified and marked',
        status: 'Completed',
      },
      {
        date: '2024-07-15',
        event: 'Written Statement Filed',
        details: 'Defendant filed written statement',
        status: 'Completed',
      },
      {
        date: '2024-05-10',
        event: 'First Hearing',
        details: 'Initial hearing conducted',
        status: 'Completed',
      },
      {
        date: '2024-02-20',
        event: 'Case Admission',
        details: 'Case admitted for hearing',
        status: 'Completed',
      },
      {
        date: '2024-01-15',
        event: 'Case Filed',
        details: 'Plaint filed in District Court',
        status: 'Completed',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-09-25 11:00:00',
      action: 'Hearing Conducted',
      performedBy: 'Court Registry',
      details: 'Evidence recording - Plaintiff witness examined',
    },
    {
      id: 'AL-002',
      timestamp: '2024-08-20 14:30:00',
      action: 'Documents Verified',
      performedBy: 'Court Registry',
      details: 'All submitted documents verified and marked',
    },
    {
      id: 'AL-003',
      timestamp: '2024-07-15 10:00:00',
      action: 'Written Statement Filed',
      performedBy: 'Adv. Suresh Verma',
      details: 'Defendant filed written statement',
    },
    {
      id: 'AL-004',
      timestamp: '2024-05-10 09:30:00',
      action: 'First Hearing',
      performedBy: 'Court Registry',
      details: 'First hearing conducted - Notice issued to defendant',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-15 15:00:00',
      action: 'Case Filed',
      performedBy: 'Adv. Rajesh Kumar',
      details: 'Case filed in District Court, Lucknow',
    },
  ])

  const handleExport = () => {
    const content = `
CASE DETAILS REPORT
===================

Case Number: ${caseData.caseNo}
Case ID: ${caseData.id}
Status: ${caseData.status}

CASE INFORMATION
================
Case Type: ${caseData.caseType}
Case Category: ${caseData.caseCategory}
Title: ${caseData.title}
Case Value: ${caseData.caseValue}
Court: ${caseData.court}
Court Room: ${caseData.caseDetails.courtRoomNo}
Judge: ${caseData.judgeName}
Current Stage: ${caseData.stage}

CASE DETAILS
============
Bench Type: ${caseData.caseDetails.benchType}
Case Nature: ${caseData.caseDetails.caseNature}
Acts & Sections: ${caseData.caseDetails.actsSections}
Priority: ${caseData.caseDetails.priority}

IMPORTANT DATES
===============
Filing Date: ${new Date(caseData.filingDate).toLocaleDateString('en-IN')}
Registration Date: ${new Date(caseData.caseDetails.registrationDate).toLocaleDateString('en-IN')}
First Hearing: ${new Date(caseData.caseDetails.firstHearingDate).toLocaleDateString('en-IN')}
Next Hearing: ${new Date(caseData.nextHearing).toLocaleDateString('en-IN')}

PARTIES
=======
${caseData.parties.map(p => `${p.role}: ${p.name}\n   Address: ${p.address}\n   Counsel: ${p.counsel}\n   Contact: ${p.contact}`).join('\n\n')}

HEARING HISTORY
===============
${caseData.hearingHistory.map(h => `${h.date} - ${h.purpose}\n   Outcome: ${h.outcome}\n   Next Date: ${h.nextDate}\n   Remarks: ${h.remarks}`).join('\n\n')}

COURT ORDERS
============
${caseData.orders.map(o => `${o.date} - ${o.orderType}\n   Passed By: ${o.passedBy}\n   Summary: ${o.summary}\n   Status: ${o.status}`).join('\n\n')}

EXPENSES
========
${caseData.expenses.map(e => `${e.date} - ${e.description}\n   Amount: ${e.amount}\n   Category: ${e.category}\n   Paid To: ${e.paidTo}`).join('\n\n')}

CASE DESCRIPTION
================
${caseData.description}

DOCUMENTS
=========
${caseData.documents.map(d => `${d.name} (${d.type})\n   Uploaded: ${d.uploadedDate} by ${d.uploadedBy}\n   ${d.description}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Case_${caseData.caseNo.replace(/\//g, '_')}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Won':
        return 'bg-blue-100 text-blue-700'
      case 'Lost':
        return 'bg-red-100 text-red-700'
      case 'Settled':
        return 'bg-purple-100 text-purple-700'
      case 'Closed':
        return 'bg-gray-100 text-gray-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Won':
        return <CheckCircle size={40} className="text-blue-600" />
      case 'Lost':
        return <AlertCircle size={40} className="text-red-600" />
      case 'Settled':
        return <CheckCircle size={40} className="text-purple-600" />
      case 'Closed':
        return <CheckCircle size={40} className="text-gray-600" />
      case 'Pending':
        return <Clock size={40} className="text-orange-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const totalExpenses = caseData.expenses.reduce((sum, e) => 
    sum + parseFloat(e.amount.replace(/[^0-9]/g, '')), 0
  )

  const caseDuration = Math.ceil((new Date().getTime() - new Date(caseData.filingDate).getTime()) / (1000 * 60 * 60 * 24))

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
            <h1 className="text-2xl font-bold text-gray-900">{caseData.title}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {caseData.caseNo} • {caseData.caseType} • {caseData.court}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(caseData.status)}`}>
            {caseData.status}
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
        caseData.status === 'Active' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        caseData.status === 'Won' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        caseData.status === 'Lost' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        caseData.status === 'Settled' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
        caseData.status === 'Closed' ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              caseData.status === 'Active' ? 'text-green-100' :
              caseData.status === 'Won' ? 'text-blue-100' :
              caseData.status === 'Lost' ? 'text-red-100' :
              caseData.status === 'Settled' ? 'text-purple-100' :
              caseData.status === 'Closed' ? 'text-gray-100' :
              'text-orange-100'
            }`}>
              Case Status - {caseData.stage}
            </p>
            <h2 className="text-4xl font-bold">{caseData.status}</h2>
            <p className={`text-sm mt-2 ${
              caseData.status === 'Active' ? 'text-green-100' :
              caseData.status === 'Won' ? 'text-blue-100' :
              caseData.status === 'Lost' ? 'text-red-100' :
              caseData.status === 'Settled' ? 'text-purple-100' :
              caseData.status === 'Closed' ? 'text-gray-100' :
              'text-orange-100'
            }`}>
              Next Hearing: {new Date(caseData.nextHearing).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })} • Case Value: {caseData.caseValue}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(caseData.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Case Duration</p>
              <h3 className="text-2xl font-bold text-gray-900">{caseDuration} Days</h3>
              <p className="text-xs text-gray-500 mt-2">Since filing</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Hearings</p>
              <h3 className="text-2xl font-bold text-purple-600">{caseData.hearingHistory.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Conducted</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gavel size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Expenses</p>
              <h3 className="text-2xl font-bold text-orange-600">₹{(totalExpenses / 100000).toFixed(2)} L</h3>
              <p className="text-xs text-gray-500 mt-2">All categories</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Documents</p>
              <h3 className="text-2xl font-bold text-green-600">{caseData.documents.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Filed</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Case Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Scale size={20} className="mr-2" />
          Case Information
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Number</p>
            <p className="text-sm font-medium text-gray-900">{caseData.caseNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Case ID</p>
            <p className="text-sm font-medium text-gray-900">{caseData.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Type</p>
            <p className="text-sm font-medium text-gray-900">{caseData.caseType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Category</p>
            <p className="text-sm font-medium text-gray-900">{caseData.caseCategory}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Value</p>
            <p className="text-lg font-bold text-green-600">{caseData.caseValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Stage</p>
            <p className="text-sm font-medium text-gray-900">{caseData.stage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Priority</p>
            <p className="text-sm font-medium text-gray-900">{caseData.caseDetails.priority}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Case Nature</p>
            <p className="text-sm font-medium text-gray-900">{caseData.caseDetails.caseNature}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Acts & Sections</p>
            <p className="text-sm font-medium text-gray-900">{caseData.caseDetails.actsSections}</p>
          </div>
        </div>
      </div>

      {/* Court Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Court Details
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Court</p>
            <p className="text-sm font-medium text-gray-900">{caseData.court}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Court Room</p>
            <p className="text-sm font-medium text-gray-900">{caseData.caseDetails.courtRoomNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Bench Type</p>
            <p className="text-sm font-medium text-gray-900">{caseData.caseDetails.benchType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Judge</p>
            <p className="text-sm font-medium text-gray-900">{caseData.judgeName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Filing Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(caseData.filingDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Registration Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(caseData.caseDetails.registrationDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">First Hearing</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(caseData.caseDetails.firstHearingDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Next Hearing</p>
            <p className="text-lg font-bold text-orange-600">
              {new Date(caseData.nextHearing).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Parties Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Parties Information
        </h3>
        <div className="space-y-6">
          {caseData.parties.map((party, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Role</p>
                  <p className="text-sm font-bold text-gray-900">{party.role}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-medium text-gray-900">{party.name}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {party.address}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Legal Counsel</p>
                  <p className="text-sm font-medium text-gray-900">{party.counsel}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <p className="text-sm font-medium text-gray-900">{party.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hearing History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Gavel size={20} className="mr-2" />
            Hearing History ({caseData.hearingHistory.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Outcome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {caseData.hearingHistory.map((hearing, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(hearing.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hearing.purpose}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{hearing.judge}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{hearing.outcome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                    {new Date(hearing.nextDate).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{hearing.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Court Orders */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Court Orders ({caseData.orders.length})</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {caseData.orders.map((order, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{order.orderType}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Date: {new Date(order.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })} • Passed By: {order.passedBy}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    order.status === 'Active' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 rounded p-3">{order.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Case Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {caseData.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== caseData.timeline.length - 1 && (
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

      {/* Expenses */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <DollarSign size={20} className="mr-2" />
            Case Expenses (Total: ₹{totalExpenses.toLocaleString('en-IN')})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid To</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {caseData.expenses.map((expense, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(expense.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{expense.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{expense.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expense.paidTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText size={20} className="mr-2" />
            Case Documents ({caseData.documents.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {caseData.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.type} • Uploaded: {new Date(doc.uploadedDate).toLocaleDateString('en-IN')} by {doc.uploadedBy}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{doc.description}</p>
                </div>
              </div>
              <button className="ml-4 text-orange-600 hover:text-orange-700">
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Case Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Case Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {caseData.description}
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
            <p className="text-xs text-gray-600 mb-2">Case Number</p>
            <p className="text-lg font-bold text-gray-900">{caseData.caseNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Duration</p>
            <p className="text-lg font-bold text-blue-600">{caseDuration} Days</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Hearings</p>
            <p className="text-lg font-bold text-purple-600">{caseData.hearingHistory.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Expenses</p>
            <p className="text-sm font-bold text-orange-600">₹{(totalExpenses / 100000).toFixed(2)} L</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              caseData.status === 'Active' ? 'text-green-600' :
              caseData.status === 'Won' ? 'text-blue-600' :
              caseData.status === 'Lost' ? 'text-red-600' :
              caseData.status === 'Settled' ? 'text-purple-600' :
              caseData.status === 'Closed' ? 'text-gray-600' :
              'text-orange-600'
            }`}>
              {caseData.status}
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
          <span>Download Case Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Case</span>
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
          <span>Back to Registry</span>
        </button>
      </div>
    </div>
  )
}