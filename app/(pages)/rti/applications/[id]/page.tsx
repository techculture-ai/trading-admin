'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, FileText, Calendar, User, MapPin, Phone, Mail, CheckCircle, Clock, AlertCircle, DollarSign, Share2, Printer, Edit, Bell, MessageSquare } from 'lucide-react'

interface RTIApplicationDetails {
  id: string
  applicationNo: string
  applicantName: string
  applicantContact: string
  applicantEmail: string
  subject: string
  department: string
  receivedDate: string
  dueDate: string
  assignedTo: string
  fee: string
  status: 'Pending' | 'Responded' | 'Overdue' | 'Under Process' | 'Rejected'
  daysLeft: number
  applicantAddress: string
  requestDetails: string
  modeOfSubmission: string
  paymentMode: string
  bplCard: boolean
  applicationInfo: {
    registeredDate: string
    registeredBy: string
    priority: string
    language: string
    applicationType: string
  }
  pio: {
    name: string
    designation: string
    department: string
    contact: string
    email: string
  }
  responseDetails: {
    responseDate: string
    responseMode: string
    responseStatus: string
    informationProvided: string
    feesCharged: string
    responseBy: string
  }
  timeline: {
    date: string
    event: string
    details: string
    performedBy: string
    status: string
  }[]
  communications: {
    date: string
    type: string
    subject: string
    message: string
    sentBy: string
    sentTo: string
  }[]
  documents: {
    name: string
    type: string
    uploadedDate: string
    uploadedBy: string
    description: string
  }[]
  appeals: {
    appealDate: string
    appealType: string
    appealAuthority: string
    appealStatus: string
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

export default function RTIApplicationDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [application] = useState<RTIApplicationDetails>({
    id: 'RTI-2024-234',
    applicationNo: 'RTI/UP/2024/234',
    applicantName: 'Rajesh Kumar Singh',
    applicantContact: '+91 9876543210',
    applicantEmail: 'rajesh.kumar@example.com',
    subject: 'Information regarding land acquisition in Gomti Nagar',
    department: 'Land Acquisition',
    receivedDate: '2024-10-25',
    dueDate: '2024-11-24',
    assignedTo: 'PIO - Priya Sharma',
    fee: '₹10',
    status: 'Pending',
    daysLeft: 28,
    applicantAddress: 'House No. 123, Sector A, Indira Nagar, Lucknow - 226016, Uttar Pradesh',
    requestDetails: 'I request the following information under the Right to Information Act, 2005:\n\n1. Complete details of land acquisition process for Plot No. 123 in Gomti Nagar, Extension Area\n2. Compensation amount decided and paid for the said plot\n3. Copy of notification issued for land acquisition\n4. Details of beneficiaries of acquired land\n5. Current status of the acquired land\n\nI request this information to be provided in certified copies.',
    modeOfSubmission: 'Online',
    paymentMode: 'Online Payment',
    bplCard: false,
    applicationInfo: {
      registeredDate: '2024-10-25',
      registeredBy: 'System - Online Portal',
      priority: 'Normal',
      language: 'English',
      applicationType: 'Regular RTI',
    },
    pio: {
      name: 'Priya Sharma',
      designation: 'Public Information Officer',
      department: 'Land Acquisition Department',
      contact: '+91 98765 43220',
      email: 'pio.landacq@ulb.gov.in',
    },
    responseDetails: {
      responseDate: '',
      responseMode: 'Pending',
      responseStatus: 'Under Process',
      informationProvided: 'Processing',
      feesCharged: '₹10',
      responseBy: '',
    },
    timeline: [
      {
        date: '2024-10-28',
        event: 'Forwarded to Concerned Department',
        details: 'Application forwarded to Land Records Section for compilation of information',
        performedBy: 'PIO - Priya Sharma',
        status: 'Completed',
      },
      {
        date: '2024-10-26',
        event: 'Assigned to PIO',
        details: 'Application assigned to Public Information Officer for processing',
        performedBy: 'RTI Cell - Admin',
        status: 'Completed',
      },
      {
        date: '2024-10-25',
        event: 'Application Received',
        details: 'RTI application received through online portal and registered',
        performedBy: 'System - Online Portal',
        status: 'Completed',
      },
    ],
    communications: [
      {
        date: '2024-10-28',
        type: 'Email',
        subject: 'RTI Application - Additional Clarification Required',
        message: 'Dear Applicant, We need clarification on Plot No. 123 exact location. Please provide cross streets or landmark.',
        sentBy: 'PIO - Priya Sharma',
        sentTo: 'Rajesh Kumar Singh',
      },
      {
        date: '2024-10-26',
        type: 'SMS',
        subject: 'RTI Application Acknowledgement',
        message: 'Your RTI application RTI/UP/2024/234 has been registered. Due date: 24 Nov 2024',
        sentBy: 'System - Auto',
        sentTo: 'Rajesh Kumar Singh',
      },
      {
        date: '2024-10-25',
        type: 'Email',
        subject: 'RTI Application Receipt',
        message: 'Thank you for submitting your RTI application. Your application number is RTI/UP/2024/234.',
        sentBy: 'System - Auto',
        sentTo: 'Rajesh Kumar Singh',
      },
    ],
    documents: [
      {
        name: 'RTI_Application_Form.pdf',
        type: 'Application Form',
        uploadedDate: '2024-10-25',
        uploadedBy: 'Rajesh Kumar Singh',
        description: 'Filled RTI application form',
      },
      {
        name: 'ID_Proof_Aadhaar.pdf',
        type: 'Identity Proof',
        uploadedDate: '2024-10-25',
        uploadedBy: 'Rajesh Kumar Singh',
        description: 'Aadhaar card copy for identity verification',
      },
      {
        name: 'Payment_Receipt.pdf',
        type: 'Payment Proof',
        uploadedDate: '2024-10-25',
        uploadedBy: 'System - Online Portal',
        description: 'Online payment receipt for RTI fee',
      },
      {
        name: 'Location_Map.pdf',
        type: 'Supporting Document',
        uploadedDate: '2024-10-28',
        uploadedBy: 'Rajesh Kumar Singh',
        description: 'Map showing Plot No. 123 location',
      },
    ],
    appeals: []
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-28 14:30:00',
      action: 'Forwarded to Department',
      performedBy: 'PIO - Priya Sharma',
      details: 'Application forwarded to Land Records Section',
    },
    {
      id: 'AL-002',
      timestamp: '2024-10-28 11:00:00',
      action: 'Clarification Email Sent',
      performedBy: 'PIO - Priya Sharma',
      details: 'Email sent to applicant requesting additional details',
    },
    {
      id: 'AL-003',
      timestamp: '2024-10-26 16:00:00',
      action: 'PIO Assigned',
      performedBy: 'RTI Cell - Admin',
      details: 'Application assigned to PIO - Priya Sharma',
    },
    {
      id: 'AL-004',
      timestamp: '2024-10-26 10:00:00',
      action: 'Acknowledgement Sent',
      performedBy: 'System - Auto',
      details: 'SMS and Email acknowledgement sent to applicant',
    },
    {
      id: 'AL-005',
      timestamp: '2024-10-25 15:30:00',
      action: 'Payment Verified',
      performedBy: 'System - Payment Gateway',
      details: 'Online payment of ₹10 verified successfully',
    },
    {
      id: 'AL-006',
      timestamp: '2024-10-25 15:25:00',
      action: 'Application Registered',
      performedBy: 'System - Online Portal',
      details: 'RTI application RTI/UP/2024/234 registered in system',
    },
  ])

  const handleExport = () => {
    const content = `
RTI APPLICATION DETAILS
=======================

Application Number: ${application.applicationNo}
Application ID: ${application.id}
Status: ${application.status}

APPLICANT INFORMATION
=====================
Name: ${application.applicantName}
Contact: ${application.applicantContact}
Email: ${application.applicantEmail}
Address: ${application.applicantAddress}

APPLICATION DETAILS
===================
Subject: ${application.subject}
Department: ${application.department}
Received Date: ${new Date(application.receivedDate).toLocaleDateString('en-IN')}
Due Date: ${new Date(application.dueDate).toLocaleDateString('en-IN')}
Days Remaining: ${application.daysLeft}
Mode of Submission: ${application.modeOfSubmission}
Payment Mode: ${application.paymentMode}
Fee: ${application.fee}
BPL Card Holder: ${application.bplCard ? 'Yes' : 'No'}

PUBLIC INFORMATION OFFICER
==========================
Name: ${application.pio.name}
Designation: ${application.pio.designation}
Department: ${application.pio.department}
Contact: ${application.pio.contact}
Email: ${application.pio.email}

INFORMATION REQUEST
===================
${application.requestDetails}

RESPONSE DETAILS
================
Response Date: ${application.responseDetails.responseDate || 'Pending'}
Response Mode: ${application.responseDetails.responseMode}
Response Status: ${application.responseDetails.responseStatus}
Information Provided: ${application.responseDetails.informationProvided}
Fees Charged: ${application.responseDetails.feesCharged}

TIMELINE
========
${application.timeline.map(t => `${t.date} - ${t.event}\n   ${t.details}\n   By: ${t.performedBy}\n   Status: ${t.status}`).join('\n\n')}

COMMUNICATIONS
==============
${application.communications.map(c => `${c.date} - ${c.type}\n   Subject: ${c.subject}\n   From: ${c.sentBy}\n   To: ${c.sentTo}\n   Message: ${c.message}`).join('\n\n')}

DOCUMENTS
=========
${application.documents.map(d => `${d.name} (${d.type})\n   Uploaded: ${d.uploadedDate} by ${d.uploadedBy}\n   ${d.description}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `RTI_${application.applicationNo.replace(/\//g, '_')}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Responded':
        return 'bg-green-100 text-green-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      case 'Under Process':
        return 'bg-blue-100 text-blue-700'
      case 'Rejected':
        return 'bg-gray-100 text-gray-700'
      case 'Overdue':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Responded':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Pending':
        return <Clock size={40} className="text-orange-600" />
      case 'Under Process':
        return <Clock size={40} className="text-blue-600" />
      case 'Rejected':
        return <AlertCircle size={40} className="text-gray-600" />
      case 'Overdue':
        return <AlertCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const applicationAge = Math.ceil((new Date().getTime() - new Date(application.receivedDate).getTime()) / (1000 * 60 * 60 * 24))

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
            <h1 className="text-2xl font-bold text-gray-900">RTI Application - {application.applicationNo}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {application.applicantName} • {application.department}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(application.status)}`}>
            {application.status}
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
        application.status === 'Responded' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        application.status === 'Pending' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        application.status === 'Under Process' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        application.status === 'Rejected' ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              application.status === 'Responded' ? 'text-green-100' :
              application.status === 'Pending' ? 'text-orange-100' :
              application.status === 'Under Process' ? 'text-blue-100' :
              application.status === 'Rejected' ? 'text-gray-100' :
              'text-red-100'
            }`}>
              Application Status
            </p>
            <h2 className="text-4xl font-bold">{application.status}</h2>
            <p className={`text-sm mt-2 ${
              application.status === 'Responded' ? 'text-green-100' :
              application.status === 'Pending' ? 'text-orange-100' :
              application.status === 'Under Process' ? 'text-blue-100' :
              application.status === 'Rejected' ? 'text-gray-100' :
              'text-red-100'
            }`}>
              Due Date: {new Date(application.dueDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })} • {application.daysLeft > 0 ? `${application.daysLeft} days remaining` : `${Math.abs(application.daysLeft)} days overdue`}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(application.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Application Age</p>
              <h3 className="text-2xl font-bold text-gray-900">{applicationAge} Days</h3>
              <p className="text-xs text-gray-500 mt-2">Since registration</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Days Remaining</p>
              <h3 className={`text-2xl font-bold ${application.daysLeft < 0 ? 'text-red-600' : application.daysLeft <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
                {application.daysLeft > 0 ? application.daysLeft : Math.abs(application.daysLeft)}
              </h3>
              <p className="text-xs text-gray-500 mt-2">{application.daysLeft < 0 ? 'Overdue' : 'To respond'}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Communications</p>
              <h3 className="text-2xl font-bold text-purple-600">{application.communications.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Total messages</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Documents</p>
              <h3 className="text-2xl font-bold text-green-600">{application.documents.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Uploaded</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-green-600" />
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
            <p className="text-sm font-medium text-gray-900">{application.applicantName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Phone size={14} className="mr-1 text-green-600" />
              {application.applicantContact}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Mail size={14} className="mr-1 text-orange-600" />
              {application.applicantEmail}
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1 text-red-600" />
              {application.applicantAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Details</h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Application Number</p>
            <p className="text-sm font-medium text-gray-900">{application.applicationNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Application ID</p>
            <p className="text-sm font-medium text-gray-900">{application.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Department</p>
            <p className="text-sm font-medium text-gray-900">{application.department}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Priority</p>
            <p className="text-sm font-medium text-gray-900">{application.applicationInfo.priority}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Received Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(application.receivedDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Due Date</p>
            <p className="text-lg font-bold text-orange-600">
              {new Date(application.dueDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Mode of Submission</p>
            <p className="text-sm font-medium text-gray-900">{application.modeOfSubmission}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Language</p>
            <p className="text-sm font-medium text-gray-900">{application.applicationInfo.language}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Mode</p>
            <p className="text-sm font-medium text-gray-900">{application.paymentMode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Application Fee</p>
            <p className="text-lg font-bold text-green-600">{application.fee}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">BPL Card Holder</p>
            <p className="text-sm font-medium text-gray-900">{application.bplCard ? 'Yes (Fee Exempted)' : 'No'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
              {application.status}
            </span>
          </div>
          <div className="col-span-4">
            <p className="text-xs text-gray-500 mb-1">Subject</p>
            <p className="text-sm font-medium text-gray-900">{application.subject}</p>
          </div>
        </div>
      </div>

      {/* Public Information Officer */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Public Information Officer (PIO)</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Name</p>
            <p className="text-sm font-bold text-blue-900">{application.pio.name}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-700 mb-2">Designation</p>
            <p className="text-sm font-bold text-purple-900">{application.pio.designation}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Department</p>
            <p className="text-sm font-bold text-green-900">{application.pio.department}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-700 mb-2">Contact</p>
            <p className="text-sm font-bold text-orange-900 flex items-center">
              <Phone size={14} className="mr-1" />
              {application.pio.contact}
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200 col-span-2">
            <p className="text-xs text-red-700 mb-2">Email</p>
            <p className="text-sm font-bold text-red-900 flex items-center">
              <Mail size={14} className="mr-1" />
              {application.pio.email}
            </p>
          </div>
        </div>
      </div>

      {/* Information Request */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Information Request
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
            {application.requestDetails}
          </pre>
        </div>
      </div>

      {/* Response Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Response Details</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Response Status</p>
            <p className="text-sm font-medium text-gray-900">{application.responseDetails.responseStatus}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Response Mode</p>
            <p className="text-sm font-medium text-gray-900">{application.responseDetails.responseMode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Fees Charged</p>
            <p className="text-sm font-medium text-gray-900">{application.responseDetails.feesCharged}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Response Date</p>
            <p className="text-sm font-medium text-gray-900">
              {application.responseDetails.responseDate || 'Not yet responded'}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Information Provided</p>
            <p className="text-sm font-medium text-gray-900">{application.responseDetails.informationProvided}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Application Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {application.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== application.timeline.length - 1 && (
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

      {/* Communications */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare size={20} className="mr-2" />
            Communications ({application.communications.length})
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {application.communications.map((comm, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{comm.subject}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(comm.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })} • {comm.type}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {comm.type}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{comm.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>From: {comm.sentBy}</span>
                  <span>To: {comm.sentTo}</span>
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
            Documents ({application.documents.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {application.documents.map((doc, index) => (
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

      {/* Appeals (if any) */}
      {application.appeals.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Appeals</h3>
          <div className="space-y-4">
            {application.appeals.map((appeal, index) => (
              <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Appeal Date</p>
                    <p className="text-sm font-medium text-gray-900">{appeal.appealDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Appeal Type</p>
                    <p className="text-sm font-medium text-gray-900">{appeal.appealType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Appeal Authority</p>
                    <p className="text-sm font-medium text-gray-900">{appeal.appealAuthority}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p className="text-sm font-medium text-gray-900">{appeal.appealStatus}</p>
                  </div>
                  <div className="col-span-4">
                    <p className="text-xs text-gray-500 mb-1">Remarks</p>
                    <p className="text-sm font-medium text-gray-900">{appeal.remarks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
            <p className="text-xs text-gray-600 mb-2">Application No.</p>
            <p className="text-sm font-bold text-gray-900">{application.applicationNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Age</p>
            <p className="text-lg font-bold text-blue-600">{applicationAge} Days</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Days Left</p>
            <p className={`text-lg font-bold ${application.daysLeft < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {application.daysLeft > 0 ? application.daysLeft : Math.abs(application.daysLeft)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Fee</p>
            <p className="text-lg font-bold text-green-600">{application.fee}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              application.status === 'Responded' ? 'text-green-600' :
              application.status === 'Pending' ? 'text-orange-600' :
              application.status === 'Under Process' ? 'text-blue-600' :
              application.status === 'Rejected' ? 'text-gray-600' :
              'text-red-600'
            }`}>
              {application.status}
            </p>
          </div>
        </div>
      </div>

      {/* Reminder Alert */}
      {application.daysLeft >= 0 && application.daysLeft <= 7 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-3">
          <Bell size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-orange-900">Response Due Soon</p>
            <p className="text-sm text-orange-700 mt-1">
              {application.daysLeft === 0 
                ? 'Response is due today!' 
                : `Response is due in ${application.daysLeft} day${application.daysLeft > 1 ? 's' : ''}. Please ensure timely response.`}
            </p>
          </div>
        </div>
      )}

      {application.daysLeft < 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Overdue Application</p>
            <p className="text-sm text-red-700 mt-1">
              This application is overdue by {Math.abs(application.daysLeft)} day(s). Immediate action required.
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
          <span>Download Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Update Status</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <MessageSquare size={20} />
          <span>Send Communication</span>
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
          <span>Back to Applications</span>
        </button>
      </div>
    </div>
  )
}