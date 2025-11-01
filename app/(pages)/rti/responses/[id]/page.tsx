'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, FileText, Calendar, User, Mail, Phone, CheckCircle, Clock, AlertCircle, Send, Share2, Printer, Edit, MessageSquare } from 'lucide-react'

interface RTIResponseDetails {
  id: string
  applicationNo: string
  applicantName: string
  subject: string
  department: string
  responseDate: string
  respondedBy: string
  responseType: 'Complete Information' | 'Partial Information' | 'Information Denied' | 'Transferred'
  documentsProvided: number
  dispatchDate: string
  dispatchMode: string
  status: 'Dispatched' | 'Draft' | 'Pending Dispatch' | 'Returned'
  responseText: string
  reasonForPartial: string
  reasonForDenial: string
  transferredTo: string
  feesCharged: string
  additionalFees: string
  applicantEmail: string
  applicantContact: string
  applicantAddress: string
  responseInfo: {
    draftedDate: string
    draftedBy: string
    approvedDate: string
    approvedBy: string
    language: string
    pageCount: number
  }
  pio: {
    name: string
    designation: string
    department: string
    contact: string
    email: string
  }
  applicationDetails: {
    receivedDate: string
    dueDate: string
    requestDetails: string
    modeOfSubmission: string
  }
  documents: {
    name: string
    type: string
    size: string
    uploadedDate: string
    uploadedBy: string
    description: string
  }[]
  timeline: {
    date: string
    event: string
    details: string
    performedBy: string
    status: string
  }[]
  dispatchDetails: {
    trackingNumber: string
    courierService: string
    dispatchedTo: string
    deliveryDate: string
    deliveryStatus: string
    acknowledgement: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function RTIResponseDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [response] = useState<RTIResponseDetails>({
    id: 'RESP-2024-233',
    applicationNo: 'RTI/UP/2024/233',
    applicantName: 'Priya Verma',
    subject: 'Details of tenders floated in 2024',
    department: 'Engineering',
    responseDate: '2024-11-15',
    respondedBy: 'PIO - Amit Singh',
    responseType: 'Complete Information',
    documentsProvided: 5,
    dispatchDate: '2024-11-16',
    dispatchMode: 'Email & Post',
    status: 'Dispatched',
    responseText: `Dear Ms. Priya Verma,

This is in response to your RTI application dated 23rd October 2024, application number RTI/UP/2024/233, regarding details of tenders floated by the Engineering Department in the year 2024.

The requested information is provided as follows:

1. COMPLETE LIST OF TENDERS - YEAR 2024:
   A detailed list of all tenders floated by the Engineering Department in 2024 is provided in Annexure-I (attached document: Tender_List_2024.pdf).

2. TENDER DOCUMENTATION:
   Complete tender documents for all major tenders (value above ₹10 lakhs) are provided in Annexure-II through Annexure-V.

3. CONTRACT AWARDS:
   Details of awarded contracts, winning bidders, and contract values are provided in Annexure-VI (attached document: Contract_Awards_2024.pdf).

4. TENDER PROCESS TIMELINE:
   Timeline and process flow for each tender is included in the respective tender documentation.

All requested information is complete and provided without any exemptions under the RTI Act, 2005.

Please find attached five (5) documents containing the complete information requested.

If you require any clarification or have additional queries, you may contact the undersigned.

Yours sincerely,
Amit Singh
Public Information Officer
Engineering Department
Urban Local Body, Lucknow`,
    reasonForPartial: '',
    reasonForDenial: '',
    transferredTo: '',
    feesCharged: '₹10',
    additionalFees: '₹50 (for 25 pages @ ₹2/page)',
    applicantEmail: 'priya.verma@example.com',
    applicantContact: '+91 9876543211',
    applicantAddress: 'House No. 456, Sector B, Hazratganj, Lucknow - 226001, Uttar Pradesh',
    responseInfo: {
      draftedDate: '2024-11-10',
      draftedBy: 'Assistant PIO - Rahul Gupta',
      approvedDate: '2024-11-15',
      approvedBy: 'PIO - Amit Singh',
      language: 'English',
      pageCount: 25,
    },
    pio: {
      name: 'Amit Singh',
      designation: 'Public Information Officer',
      department: 'Engineering Department',
      contact: '+91 98765 43221',
      email: 'pio.engineering@ulb.gov.in',
    },
    applicationDetails: {
      receivedDate: '2024-10-23',
      dueDate: '2024-11-22',
      requestDetails: 'Complete details of all tenders floated by Engineering Department in year 2024, including tender documents, awarded contracts, and contract values.',
      modeOfSubmission: 'Offline',
    },
    documents: [
      {
        name: 'Response_Letter_RTI_233.pdf',
        type: 'Response Letter',
        size: '256 KB',
        uploadedDate: '2024-11-15',
        uploadedBy: 'PIO - Amit Singh',
        description: 'Official response letter to applicant',
      },
      {
        name: 'Tender_List_2024.pdf',
        type: 'Information Document',
        size: '1.2 MB',
        uploadedDate: '2024-11-15',
        uploadedBy: 'Assistant PIO - Rahul Gupta',
        description: 'Complete list of tenders floated in 2024',
      },
      {
        name: 'Contract_Awards_2024.pdf',
        type: 'Information Document',
        size: '856 KB',
        uploadedDate: '2024-11-15',
        uploadedBy: 'Assistant PIO - Rahul Gupta',
        description: 'Details of awarded contracts with contract values',
      },
      {
        name: 'Tender_Doc_Road_Construction.pdf',
        type: 'Tender Document',
        size: '2.4 MB',
        uploadedDate: '2024-11-15',
        uploadedBy: 'Assistant PIO - Rahul Gupta',
        description: 'Tender document for road construction project',
      },
      {
        name: 'Tender_Doc_Bridge_Repair.pdf',
        type: 'Tender Document',
        size: '1.8 MB',
        uploadedDate: '2024-11-15',
        uploadedBy: 'Assistant PIO - Rahul Gupta',
        description: 'Tender document for bridge repair project',
      },
    ],
    timeline: [
      {
        date: '2024-11-16',
        event: 'Response Dispatched',
        details: 'Response dispatched to applicant via Email & Post',
        performedBy: 'PIO Office',
        status: 'Completed',
      },
      {
        date: '2024-11-15',
        event: 'Response Approved & Signed',
        details: 'Response approved and digitally signed by PIO',
        performedBy: 'PIO - Amit Singh',
        status: 'Completed',
      },
      {
        date: '2024-11-14',
        event: 'Documents Compiled',
        details: 'All requested documents compiled and verified',
        performedBy: 'Assistant PIO - Rahul Gupta',
        status: 'Completed',
      },
      {
        date: '2024-11-10',
        event: 'Response Drafted',
        details: 'Response letter drafted after collecting information',
        performedBy: 'Assistant PIO - Rahul Gupta',
        status: 'Completed',
      },
      {
        date: '2024-11-05',
        event: 'Information Collected',
        details: 'Required information collected from Engineering Department',
        performedBy: 'Engineering Section',
        status: 'Completed',
      },
      {
        date: '2024-10-26',
        event: 'Assigned to PIO',
        details: 'Application assigned to PIO for processing',
        performedBy: 'RTI Cell - Admin',
        status: 'Completed',
      },
      {
        date: '2024-10-23',
        event: 'Application Received',
        details: 'RTI application received through offline mode',
        performedBy: 'RTI Cell',
        status: 'Completed',
      },
    ],
    dispatchDetails: {
      trackingNumber: 'IN654321789',
      courierService: 'India Post - Speed Post',
      dispatchedTo: 'Priya Verma, House No. 456, Sector B, Hazratganj, Lucknow - 226001',
      deliveryDate: '2024-11-18',
      deliveryStatus: 'Delivered',
      acknowledgement: 'Received and signed by applicant',
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-11-16 10:30:00',
      action: 'Response Dispatched',
      performedBy: 'PIO Office',
      details: 'Response dispatched to applicant via Email & Post',
    },
    {
      id: 'AL-002',
      timestamp: '2024-11-16 09:00:00',
      action: 'Email Sent',
      performedBy: 'System - Auto',
      details: 'Response email sent to priya.verma@example.com',
    },
    {
      id: 'AL-003',
      timestamp: '2024-11-15 16:30:00',
      action: 'Response Approved',
      performedBy: 'PIO - Amit Singh',
      details: 'Response approved and digitally signed',
    },
    {
      id: 'AL-004',
      timestamp: '2024-11-15 11:00:00',
      action: 'Additional Fees Calculated',
      performedBy: 'System - Auto',
      details: 'Additional fees of ₹50 calculated for 25 pages',
    },
    {
      id: 'AL-005',
      timestamp: '2024-11-14 15:00:00',
      action: 'Documents Uploaded',
      performedBy: 'Assistant PIO - Rahul Gupta',
      details: 'All 5 response documents uploaded to system',
    },
    {
      id: 'AL-006',
      timestamp: '2024-11-10 14:00:00',
      action: 'Response Drafted',
      performedBy: 'Assistant PIO - Rahul Gupta',
      details: 'Response letter drafted and saved',
    },
  ])

  const handleExport = () => {
    const content = `
RTI RESPONSE DETAILS
====================

Response ID: ${response.id}
Application Number: ${response.applicationNo}
Status: ${response.status}

APPLICANT INFORMATION
=====================
Name: ${response.applicantName}
Contact: ${response.applicantContact}
Email: ${response.applicantEmail}
Address: ${response.applicantAddress}

APPLICATION DETAILS
===================
Subject: ${response.subject}
Department: ${response.department}
Received Date: ${new Date(response.applicationDetails.receivedDate).toLocaleDateString('en-IN')}
Due Date: ${new Date(response.applicationDetails.dueDate).toLocaleDateString('en-IN')}
Mode of Submission: ${response.applicationDetails.modeOfSubmission}

REQUEST DETAILS
===============
${response.applicationDetails.requestDetails}

RESPONSE INFORMATION
====================
Response Type: ${response.responseType}
Response Date: ${new Date(response.responseDate).toLocaleDateString('en-IN')}
Responded By: ${response.respondedBy}
Documents Provided: ${response.documentsProvided}
Page Count: ${response.responseInfo.pageCount}
Language: ${response.responseInfo.language}

PUBLIC INFORMATION OFFICER
==========================
Name: ${response.pio.name}
Designation: ${response.pio.designation}
Department: ${response.pio.department}
Contact: ${response.pio.contact}
Email: ${response.pio.email}

FEES INFORMATION
================
Application Fee: ${response.feesCharged}
Additional Fees: ${response.additionalFees}

RESPONSE TEXT
=============
${response.responseText}

DISPATCH DETAILS
================
Dispatch Date: ${new Date(response.dispatchDate).toLocaleDateString('en-IN')}
Dispatch Mode: ${response.dispatchMode}
Tracking Number: ${response.dispatchDetails.trackingNumber}
Courier Service: ${response.dispatchDetails.courierService}
Delivery Date: ${new Date(response.dispatchDetails.deliveryDate).toLocaleDateString('en-IN')}
Delivery Status: ${response.dispatchDetails.deliveryStatus}
Acknowledgement: ${response.dispatchDetails.acknowledgement}

DOCUMENTS PROVIDED
==================
${response.documents.map(d => `${d.name} (${d.type}) - ${d.size}\n   ${d.description}\n   Uploaded: ${d.uploadedDate} by ${d.uploadedBy}`).join('\n\n')}

TIMELINE
========
${response.timeline.map(t => `${t.date} - ${t.event}\n   ${t.details}\n   By: ${t.performedBy}\n   Status: ${t.status}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `RTI_Response_${response.applicationNo.replace(/\//g, '_')}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Dispatched':
        return 'bg-green-100 text-green-700'
      case 'Draft':
        return 'bg-gray-100 text-gray-700'
      case 'Pending Dispatch':
        return 'bg-orange-100 text-orange-700'
      case 'Returned':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Dispatched':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Draft':
        return <Clock size={40} className="text-gray-600" />
      case 'Pending Dispatch':
        return <Clock size={40} className="text-orange-600" />
      case 'Returned':
        return <AlertCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const getResponseTypeColor = (type: string) => {
    switch (type) {
      case 'Complete Information':
        return 'bg-green-100 text-green-700'
      case 'Partial Information':
        return 'bg-orange-100 text-orange-700'
      case 'Information Denied':
        return 'bg-red-100 text-red-700'
      case 'Transferred':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const responseAge = Math.ceil((new Date().getTime() - new Date(response.responseDate).getTime()) / (1000 * 60 * 60 * 24))
  const processingTime = Math.ceil((new Date(response.responseDate).getTime() - new Date(response.applicationDetails.receivedDate).getTime()) / (1000 * 60 * 60 * 24))

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
            <h1 className="text-2xl font-bold text-gray-900">RTI Response - {response.applicationNo}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {response.applicantName} • {response.department}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(response.status)}`}>
            {response.status}
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
        response.status === 'Dispatched' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        response.status === 'Draft' ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
        response.status === 'Pending Dispatch' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              response.status === 'Dispatched' ? 'text-green-100' :
              response.status === 'Draft' ? 'text-gray-100' :
              response.status === 'Pending Dispatch' ? 'text-orange-100' :
              'text-red-100'
            }`}>
              Response Status - {response.responseType}
            </p>
            <h2 className="text-4xl font-bold">{response.status}</h2>
            <p className={`text-sm mt-2 ${
              response.status === 'Dispatched' ? 'text-green-100' :
              response.status === 'Draft' ? 'text-gray-100' :
              response.status === 'Pending Dispatch' ? 'text-orange-100' :
              'text-red-100'
            }`}>
              Response Date: {new Date(response.responseDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })} • {response.documentsProvided} documents provided
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(response.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Processing Time</p>
              <h3 className="text-2xl font-bold text-gray-900">{processingTime} Days</h3>
              <p className="text-xs text-gray-500 mt-2">To respond</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Documents</p>
              <h3 className="text-2xl font-bold text-orange-600">{response.documentsProvided}</h3>
              <p className="text-xs text-gray-500 mt-2">{response.responseInfo.pageCount} pages</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Response Type</p>
              <h3 className="text-sm font-bold text-green-600">{response.responseType}</h3>
              <p className="text-xs text-gray-500 mt-2">Information type</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Dispatch Status</p>
              <h3 className="text-sm font-bold text-purple-600">{response.dispatchDetails.deliveryStatus}</h3>
              <p className="text-xs text-gray-500 mt-2">Via {response.dispatchMode}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Send size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Applicant Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Applicant Information
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Name</p>
            <p className="text-sm font-medium text-gray-900">{response.applicantName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Phone size={14} className="mr-1 text-green-600" />
              {response.applicantContact}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Mail size={14} className="mr-1 text-orange-600" />
              {response.applicantEmail}
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{response.applicantAddress}</p>
          </div>
        </div>
      </div>

      {/* Application & Response Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Application & Response Details</h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Response ID</p>
            <p className="text-sm font-medium text-gray-900">{response.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Application Number</p>
            <p className="text-sm font-medium text-gray-900">{response.applicationNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Department</p>
            <p className="text-sm font-medium text-gray-900">{response.department}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Response Type</p>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getResponseTypeColor(response.responseType)}`}>
              {response.responseType}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Application Received</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(response.applicationDetails.receivedDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Response Date</p>
            <p className="text-sm font-medium text-orange-600">
              {new Date(response.responseDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Dispatch Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(response.dispatchDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Processing Time</p>
            <p className="text-lg font-bold text-blue-600">{processingTime} Days</p>
          </div>
          <div className="col-span-4">
            <p className="text-xs text-gray-500 mb-1">Subject</p>
            <p className="text-sm font-medium text-gray-900">{response.subject}</p>
          </div>
        </div>
      </div>

      {/* Public Information Officer */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Public Information Officer (PIO)</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Name</p>
            <p className="text-sm font-bold text-blue-900">{response.pio.name}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-700 mb-2">Designation</p>
            <p className="text-sm font-bold text-purple-900">{response.pio.designation}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Department</p>
            <p className="text-sm font-bold text-green-900">{response.pio.department}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-700 mb-2">Contact</p>
            <p className="text-sm font-bold text-orange-900 flex items-center">
              <Phone size={14} className="mr-1" />
              {response.pio.contact}
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200 col-span-2">
            <p className="text-xs text-red-700 mb-2">Email</p>
            <p className="text-sm font-bold text-red-900 flex items-center">
              <Mail size={14} className="mr-1" />
              {response.pio.email}
            </p>
          </div>
        </div>
      </div>

      {/* Information Request */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Information Request</h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            {response.applicationDetails.requestDetails}
          </p>
        </div>
      </div>

      {/* Response Text */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Response Letter
        </h3>
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
            {response.responseText}
          </pre>
        </div>
      </div>

      {/* Response Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Response Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Drafted Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(response.responseInfo.draftedDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Drafted By</p>
            <p className="text-sm font-medium text-gray-900">{response.responseInfo.draftedBy}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Approved Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(response.responseInfo.approvedDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Approved By</p>
            <p className="text-sm font-medium text-gray-900">{response.responseInfo.approvedBy}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Language</p>
            <p className="text-sm font-medium text-gray-900">{response.responseInfo.language}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Pages</p>
            <p className="text-lg font-bold text-blue-600">{response.responseInfo.pageCount}</p>
          </div>
        </div>
      </div>

      {/* Fees Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Fees Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Application Fee</p>
            <p className="text-2xl font-bold text-green-900">{response.feesCharged}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-700 mb-2">Additional Fees</p>
            <p className="text-2xl font-bold text-orange-900">{response.additionalFees || 'None'}</p>
          </div>
        </div>
      </div>

      {/* Dispatch Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Send size={20} className="mr-2" />
          Dispatch Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Dispatch Mode</p>
            <p className="text-sm font-medium text-gray-900">{response.dispatchMode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
            <p className="text-sm font-medium text-blue-600">{response.dispatchDetails.trackingNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Courier Service</p>
            <p className="text-sm font-medium text-gray-900">{response.dispatchDetails.courierService}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Delivery Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(response.dispatchDetails.deliveryDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Delivery Status</p>
            <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              {response.dispatchDetails.deliveryStatus}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Acknowledgement</p>
            <p className="text-sm font-medium text-gray-900">{response.dispatchDetails.acknowledgement}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Dispatched To</p>
            <p className="text-sm font-medium text-gray-900">{response.dispatchDetails.dispatchedTo}</p>
          </div>
        </div>
      </div>

      {/* Documents Provided */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText size={20} className="mr-2" />
            Documents Provided ({response.documents.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {response.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.type} • {doc.size} • Uploaded: {new Date(doc.uploadedDate).toLocaleDateString('en-IN')} by {doc.uploadedBy}
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

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Response Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {response.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== response.timeline.length - 1 && (
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
                        })} • By {event.performedBy}
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
            <p className="text-xs text-gray-600 mb-2">Response ID</p>
            <p className="text-sm font-bold text-gray-900">{response.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Processing Time</p>
            <p className="text-lg font-bold text-blue-600">{processingTime} Days</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Documents</p>
            <p className="text-lg font-bold text-orange-600">{response.documentsProvided}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Response Type</p>
            <p className="text-sm font-bold text-green-600">{response.responseType.split(' ')[0]}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              response.status === 'Dispatched' ? 'text-green-600' :
              response.status === 'Draft' ? 'text-gray-600' :
              response.status === 'Pending Dispatch' ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {response.status}
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
          <span>Download Response</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Response</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Send size={20} />
          <span>Resend</span>
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
          <span>Back to Responses</span>
        </button>
      </div>
    </div>
  )
}