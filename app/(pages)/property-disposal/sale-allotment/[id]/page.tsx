'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Users, Home, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, Share2, Printer, Edit, FileText, CreditCard, User, MapPin, Building } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface AllotmentDetails {
  id: string
  applicationNo: string
  unitNo: string
  projectName: string
  projectId: string
  applicantName: string
  applicantContact: string
  applicantEmail: string
  applicantAddress: string
  category: 'General' | 'EWS' | 'LIG' | 'MIG' | 'HIG' | 'SC/ST' | 'OBC'
  allotmentDate: string
  price: string
  amountPaid: string
  status: 'Completed' | 'Payment Pending' | 'Documentation Pending' | 'Registry Pending' | 'Cancelled'
  possessionDate: string
  bookingAmount: string
  installmentsPaid: number
  totalInstallments: number
  registryNumber: string
  documentStatus: string
  allotmentInfo: {
    createdDate: string
    createdBy: string
    lastModified: string
    modifiedBy: string
    allotmentLetter: string
    agreementDate: string
  }
  unitDetails: {
    type: string
    carpetArea: string
    floor: string
    facing: string
    towerBlock: string
  }
  applicantDetails: {
    aadhaarNumber: string
    panNumber: string
    occupation: string
    annualIncome: string
    nationality: string
    maritalStatus: string
  }
  paymentSchedule: {
    installmentNo: number
    dueDate: string
    amount: string
    paidDate: string
    status: 'Paid' | 'Pending' | 'Overdue'
    transactionId: string
  }[]
  documents: {
    name: string
    type: string
    uploadedDate: string
    uploadedBy: string
    size: string
    verified: boolean
  }[]
  timeline: {
    date: string
    event: string
    details: string
    performedBy: string
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

export default function SaleAllotmentDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  const [allotment] = useState<AllotmentDetails>({
    id: 'ALLOT-2024-001',
    applicationNo: 'APP-2024-156',
    unitNo: 'A-101',
    projectName: 'Gomti Nagar Housing Scheme',
    projectId: 'PROJ-001',
    applicantName: 'Rajesh Kumar Singh',
    applicantContact: '+91 9876543210',
    applicantEmail: 'rajesh.kumar@example.com',
    applicantAddress: 'House No. 123, Sector A, Indira Nagar, Lucknow - 226016, Uttar Pradesh',
    category: 'General',
    allotmentDate: '2024-01-15',
    price: '₹45,00,000',
    amountPaid: '₹45,00,000',
    status: 'Completed',
    possessionDate: '2024-12-30',
    bookingAmount: '₹5,00,000',
    installmentsPaid: 10,
    totalInstallments: 10,
    registryNumber: 'REG/2024/001',
    documentStatus: 'Completed',
    allotmentInfo: {
      createdDate: '2024-01-15',
      createdBy: 'Sales Officer - Priya Sharma',
      lastModified: '2024-08-20',
      modifiedBy: 'Registry Officer',
      allotmentLetter: 'ALLOT/2024/001',
      agreementDate: '2024-01-20',
    },
    unitDetails: {
      type: '2BHK',
      carpetArea: '950 sq.ft',
      floor: '1st Floor',
      facing: 'East',
      towerBlock: 'Tower A',
    },
    applicantDetails: {
      aadhaarNumber: 'XXXX-XXXX-1234',
      panNumber: 'ABCDE1234F',
      occupation: 'Software Engineer',
      annualIncome: '₹12,00,000',
      nationality: 'Indian',
      maritalStatus: 'Married',
    },
    paymentSchedule: [
      {
        installmentNo: 1,
        dueDate: '2024-01-15',
        amount: '₹5,00,000',
        paidDate: '2024-01-15',
        status: 'Paid',
        transactionId: 'TXN001234567',
      },
      {
        installmentNo: 2,
        dueDate: '2024-02-15',
        amount: '₹4,00,000',
        paidDate: '2024-02-14',
        status: 'Paid',
        transactionId: 'TXN001234568',
      },
      {
        installmentNo: 3,
        dueDate: '2024-03-15',
        amount: '₹4,00,000',
        paidDate: '2024-03-15',
        status: 'Paid',
        transactionId: 'TXN001234569',
      },
      {
        installmentNo: 4,
        dueDate: '2024-04-15',
        amount: '₹4,00,000',
        paidDate: '2024-04-13',
        status: 'Paid',
        transactionId: 'TXN001234570',
      },
      {
        installmentNo: 5,
        dueDate: '2024-05-15',
        amount: '₹4,00,000',
        paidDate: '2024-05-15',
        status: 'Paid',
        transactionId: 'TXN001234571',
      },
      {
        installmentNo: 6,
        dueDate: '2024-06-15',
        amount: '₹4,00,000',
        paidDate: '2024-06-14',
        status: 'Paid',
        transactionId: 'TXN001234572',
      },
      {
        installmentNo: 7,
        dueDate: '2024-07-15',
        amount: '₹4,00,000',
        paidDate: '2024-07-15',
        status: 'Paid',
        transactionId: 'TXN001234573',
      },
      {
        installmentNo: 8,
        dueDate: '2024-08-15',
        amount: '₹4,00,000',
        paidDate: '2024-08-12',
        status: 'Paid',
        transactionId: 'TXN001234574',
      },
      {
        installmentNo: 9,
        dueDate: '2024-09-15',
        amount: '₹4,00,000',
        paidDate: '2024-09-15',
        status: 'Paid',
        transactionId: 'TXN001234575',
      },
      {
        installmentNo: 10,
        dueDate: '2024-10-15',
        amount: '₹8,00,000',
        paidDate: '2024-10-14',
        status: 'Paid',
        transactionId: 'TXN001234576',
      },
    ],
    documents: [
      {
        name: 'Allotment_Letter.pdf',
        type: 'Allotment Letter',
        uploadedDate: '2024-01-15',
        uploadedBy: 'Sales Officer - Priya Sharma',
        size: '856 KB',
        verified: true,
      },
      {
        name: 'Sale_Agreement.pdf',
        type: 'Sale Agreement',
        uploadedDate: '2024-01-20',
        uploadedBy: 'Legal Officer',
        size: '1.8 MB',
        verified: true,
      },
      {
        name: 'Aadhaar_Card.pdf',
        type: 'Identity Proof',
        uploadedDate: '2024-01-15',
        uploadedBy: 'Rajesh Kumar Singh',
        size: '256 KB',
        verified: true,
      },
      {
        name: 'PAN_Card.pdf',
        type: 'Identity Proof',
        uploadedDate: '2024-01-15',
        uploadedBy: 'Rajesh Kumar Singh',
        size: '198 KB',
        verified: true,
      },
      {
        name: 'Income_Certificate.pdf',
        type: 'Income Proof',
        uploadedDate: '2024-01-15',
        uploadedBy: 'Rajesh Kumar Singh',
        size: '512 KB',
        verified: true,
      },
      {
        name: 'Payment_Receipts.pdf',
        type: 'Payment Proof',
        uploadedDate: '2024-10-14',
        uploadedBy: 'Accounts Department',
        size: '2.4 MB',
        verified: true,
      },
      {
        name: 'Registry_Documents.pdf',
        type: 'Registry',
        uploadedDate: '2024-08-20',
        uploadedBy: 'Registry Officer',
        size: '3.2 MB',
        verified: true,
      },
    ],
    timeline: [
      {
        date: '2024-10-31',
        event: 'Current Status',
        details: 'All payments completed. Property ready for possession.',
        performedBy: 'System',
        status: 'Current',
      },
      {
        date: '2024-10-14',
        event: 'Final Payment Received',
        details: 'Final installment of ₹8,00,000 received. Total amount paid: ₹45,00,000',
        performedBy: 'Accounts Department',
        status: 'Completed',
      },
      {
        date: '2024-08-20',
        event: 'Registry Completed',
        details: 'Property registry completed. Registry Number: REG/2024/001',
        performedBy: 'Registry Officer',
        status: 'Completed',
      },
      {
        date: '2024-08-15',
        event: 'Registry Initiated',
        details: 'Registry process initiated at Sub-Registrar Office',
        performedBy: 'Legal Officer',
        status: 'Completed',
      },
      {
        date: '2024-01-20',
        event: 'Sale Agreement Signed',
        details: 'Sale agreement signed between buyer and developer',
        performedBy: 'Legal Officer',
        status: 'Completed',
      },
      {
        date: '2024-01-15',
        event: 'Allotment Letter Issued',
        details: 'Allotment letter issued to Rajesh Kumar Singh for Unit A-101',
        performedBy: 'Sales Officer - Priya Sharma',
        status: 'Completed',
      },
      {
        date: '2024-01-15',
        event: 'Booking Amount Received',
        details: 'Booking amount of ₹5,00,000 received',
        performedBy: 'Accounts Department',
        status: 'Completed',
      },
      {
        date: '2024-01-10',
        event: 'Application Submitted',
        details: 'Application APP-2024-156 submitted for Unit A-101',
        performedBy: 'Rajesh Kumar Singh',
        status: 'Completed',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-31 10:12:39',
      action: 'Status Viewed',
      performedBy: 'techculture-ai',
      details: 'Allotment details viewed',
    },
    {
      id: 'AL-002',
      timestamp: '2024-10-14 14:30:00',
      action: 'Payment Received',
      performedBy: 'Accounts Department',
      details: 'Final installment payment of ₹8,00,000 received',
    },
    {
      id: 'AL-003',
      timestamp: '2024-08-20 11:00:00',
      action: 'Registry Completed',
      performedBy: 'Registry Officer',
      details: 'Property registry completed successfully',
    },
    {
      id: 'AL-004',
      timestamp: '2024-08-20 10:30:00',
      action: 'Status Updated',
      performedBy: 'Registry Officer',
      details: 'Status changed from Registry Pending to Completed',
    },
    {
      id: 'AL-005',
      timestamp: '2024-08-15 16:00:00',
      action: 'Registry Initiated',
      performedBy: 'Legal Officer',
      details: 'Registry process initiated',
    },
    {
      id: 'AL-006',
      timestamp: '2024-01-20 14:00:00',
      action: 'Agreement Signed',
      performedBy: 'Legal Officer',
      details: 'Sale agreement signed and uploaded',
    },
    {
      id: 'AL-007',
      timestamp: '2024-01-15 10:00:00',
      action: 'Allotment Created',
      performedBy: 'Sales Officer - Priya Sharma',
      details: 'Allotment created for Unit A-101',
    },
  ])

  const handleExport = () => {
    const content = `
SALE & ALLOTMENT DETAILS REPORT
================================

Allotment ID: ${allotment.id}
Application Number: ${allotment.applicationNo}
Unit Number: ${allotment.unitNo}
Status: ${allotment.status}

APPLICANT INFORMATION
=====================
Name: ${allotment.applicantName}
Contact: ${allotment.applicantContact}
Email: ${allotment.applicantEmail}
Address: ${allotment.applicantAddress}
Category: ${allotment.category}

PERSONAL DETAILS
================
Aadhaar Number: ${allotment.applicantDetails.aadhaarNumber}
PAN Number: ${allotment.applicantDetails.panNumber}
Occupation: ${allotment.applicantDetails.occupation}
Annual Income: ${allotment.applicantDetails.annualIncome}
Nationality: ${allotment.applicantDetails.nationality}
Marital Status: ${allotment.applicantDetails.maritalStatus}

UNIT DETAILS
============
Project: ${allotment.projectName}
Unit No: ${allotment.unitNo}
Type: ${allotment.unitDetails.type}
Tower/Block: ${allotment.unitDetails.towerBlock}
Floor: ${allotment.unitDetails.floor}
Facing: ${allotment.unitDetails.facing}
Carpet Area: ${allotment.unitDetails.carpetArea}

FINANCIAL INFORMATION
=====================
Total Price: ${allotment.price}
Amount Paid: ${allotment.amountPaid}
Booking Amount: ${allotment.bookingAmount}
Total Installments: ${allotment.totalInstallments}
Installments Paid: ${allotment.installmentsPaid}
Payment Status: ${allotment.status}

IMPORTANT DATES
===============
Application Date: ${new Date(allotment.allotmentInfo.createdDate).toLocaleDateString('en-IN')}
Allotment Date: ${new Date(allotment.allotmentDate).toLocaleDateString('en-IN')}
Agreement Date: ${new Date(allotment.allotmentInfo.agreementDate).toLocaleDateString('en-IN')}
Possession Date: ${new Date(allotment.possessionDate).toLocaleDateString('en-IN')}

LEGAL INFORMATION
=================
Allotment Letter No: ${allotment.allotmentInfo.allotmentLetter}
Registry Number: ${allotment.registryNumber}
Document Status: ${allotment.documentStatus}

PAYMENT SCHEDULE
================
${allotment.paymentSchedule.map(p => `Installment ${p.installmentNo}:
   Due Date: ${new Date(p.dueDate).toLocaleDateString('en-IN')}
   Amount: ${p.amount}
   Paid Date: ${p.paidDate ? new Date(p.paidDate).toLocaleDateString('en-IN') : 'Not Paid'}
   Status: ${p.status}
   Transaction ID: ${p.transactionId || 'N/A'}`).join('\n\n')}

DOCUMENTS
=========
${allotment.documents.map(doc => `${doc.name} (${doc.type}) - ${doc.size}
   Uploaded: ${doc.uploadedDate} by ${doc.uploadedBy}
   Verified: ${doc.verified ? 'Yes' : 'No'}`).join('\n\n')}

TIMELINE
========
${allotment.timeline.map(t => `${t.date} - ${t.event}
   ${t.details}
   By: ${t.performedBy}
   Status: ${t.status}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}
   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Allotment_${allotment.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'Payment Pending':
        return 'bg-orange-100 text-orange-700'
      case 'Documentation Pending':
        return 'bg-blue-100 text-blue-700'
      case 'Registry Pending':
        return 'bg-purple-100 text-purple-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Payment Pending':
        return <Clock size={40} className="text-orange-600" />
      case 'Documentation Pending':
        return <FileText size={40} className="text-blue-600" />
      case 'Registry Pending':
        return <FileText size={40} className="text-purple-600" />
      case 'Cancelled':
        return <AlertCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const paymentProgress = (allotment.installmentsPaid / allotment.totalInstallments) * 100
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
            <h1 className="text-2xl font-bold text-gray-900">Allotment - {allotment.id}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {allotment.applicantName} • Unit {allotment.unitNo} • {allotment.projectName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(allotment.status)}`}>
            {allotment.status}
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
        allotment.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        allotment.status === 'Payment Pending' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        allotment.status === 'Documentation Pending' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        allotment.status === 'Registry Pending' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              allotment.status === 'Completed' ? 'text-green-100' :
              allotment.status === 'Payment Pending' ? 'text-orange-100' :
              allotment.status === 'Documentation Pending' ? 'text-blue-100' :
              allotment.status === 'Registry Pending' ? 'text-purple-100' :
              'text-red-100'
            }`}>
              Allotment Status
            </p>
            <h2 className="text-4xl font-bold">{allotment.status}</h2>
            <p className={`text-sm mt-2 ${
              allotment.status === 'Completed' ? 'text-green-100' :
              allotment.status === 'Payment Pending' ? 'text-orange-100' :
              allotment.status === 'Documentation Pending' ? 'text-blue-100' :
              allotment.status === 'Registry Pending' ? 'text-purple-100' :
              'text-red-100'
            }`}>
              {allotment.installmentsPaid} of {allotment.totalInstallments} installments paid • {allotment.amountPaid} received
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(allotment.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Price</p>
              <h3 className="text-2xl font-bold text-gray-900">{allotment.price}</h3>
              <p className="text-xs text-gray-500 mt-2">Agreed amount</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Amount Paid</p>
              <h3 className="text-2xl font-bold text-green-600">{allotment.amountPaid}</h3>
              <p className="text-xs text-gray-500 mt-2">{paymentProgress.toFixed(0)}% completed</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Installments</p>
              <h3 className="text-2xl font-bold text-orange-600">{allotment.installmentsPaid}/{allotment.totalInstallments}</h3>
              <p className="text-xs text-gray-500 mt-2">Paid on time</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Possession</p>
              <h3 className="text-sm font-bold text-purple-600">
                {new Date(allotment.possessionDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </h3>
              <p className="text-xs text-gray-500 mt-2">Expected date</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Home size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Progress</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Amount</span>
            <span className="font-bold text-gray-900">{allotment.price}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full flex items-center justify-center text-xs text-white font-medium"
              style={{ width: `${paymentProgress}%` }}
            >
              {paymentProgress.toFixed(0)}%
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Amount Paid: {allotment.amountPaid}</span>
            <span className="text-gray-600">Balance: ₹{(parseInt(allotment.price.replace(/[^0-9]/g, '')) - parseInt(allotment.amountPaid.replace(/[^0-9]/g, ''))).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Applicant & Unit Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <User size={20} className="mr-2" />
            Applicant Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Name</p>
              <p className="text-sm font-medium text-gray-900">{allotment.applicantName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Contact</p>
                <p className="text-sm font-medium text-gray-900">{allotment.applicantContact}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900">{allotment.applicantEmail}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Address</p>
              <p className="text-sm font-medium text-gray-900">{allotment.applicantAddress}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Category</p>
                <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                  {allotment.category}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Occupation</p>
                <p className="text-sm font-medium text-gray-900">{allotment.applicantDetails.occupation}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Building size={20} className="mr-2" />
            Unit Details
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Unit Number</p>
                <p className="text-sm font-medium text-gray-900">{allotment.unitNo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <p className="text-sm font-medium text-gray-900">{allotment.unitDetails.type}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Project</p>
              <p className="text-sm font-medium text-gray-900">{allotment.projectName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Tower/Block</p>
                <p className="text-sm font-medium text-gray-900">{allotment.unitDetails.towerBlock}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Floor</p>
                <p className="text-sm font-medium text-gray-900">{allotment.unitDetails.floor}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Facing</p>
                <p className="text-sm font-medium text-gray-900">{allotment.unitDetails.facing}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Carpet Area</p>
                <p className="text-sm font-medium text-gray-900">{allotment.unitDetails.carpetArea}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Details</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Aadhaar Number</p>
            <p className="text-sm font-bold text-blue-900">{allotment.applicantDetails.aadhaarNumber}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">PAN Number</p>
            <p className="text-sm font-bold text-green-900">{allotment.applicantDetails.panNumber}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-700 mb-2">Annual Income</p>
            <p className="text-sm font-bold text-purple-900">{allotment.applicantDetails.annualIncome}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-700 mb-2">Nationality</p>
            <p className="text-sm font-bold text-orange-900">{allotment.applicantDetails.nationality}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-700 mb-2">Marital Status</p>
            <p className="text-sm font-bold text-red-900">{allotment.applicantDetails.maritalStatus}</p>
          </div>
        </div>
      </div>

      {/* Legal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FileText size={20} className="mr-2" />
          Legal Information
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Application No.</p>
            <p className="text-sm font-medium text-gray-900">{allotment.applicationNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Allotment Letter No.</p>
            <p className="text-sm font-medium text-gray-900">{allotment.allotmentInfo.allotmentLetter}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Registry Number</p>
            <p className="text-sm font-medium text-blue-600">{allotment.registryNumber || 'Pending'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Document Status</p>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
              allotment.documentStatus === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {allotment.documentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <CreditCard size={20} className="mr-2" />
            Payment Schedule ({allotment.installmentsPaid} of {allotment.totalInstallments} paid)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Installment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allotment.paymentSchedule.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Installment {payment.installmentNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(payment.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.transactionId || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      payment.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
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
            Documents ({allotment.documents.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {allotment.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  doc.verified ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  <FileText size={24} className={doc.verified ? 'text-green-600' : 'text-orange-600'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    {doc.verified && (
                      <CheckCircle size={16} className="text-green-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.type} • {doc.size} • Uploaded: {new Date(doc.uploadedDate).toLocaleDateString('en-IN')} by {doc.uploadedBy}
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

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Allotment Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {allotment.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== allotment.timeline.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                  event.status === 'Current' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <CheckCircle size={16} className={event.status === 'Current' ? 'text-blue-600' : 'text-green-600'} />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-gray-900">{event.event}</p>
                  <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    <Calendar size={12} className="inline mr-1" />
                    {new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} • By {event.performedBy}
                  </p>
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
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    By {log.performedBy} • {new Date(log.timestamp).toLocaleString('en-IN')}
                  </p>
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
            <p className="text-xs text-gray-600 mb-2">Allotment ID</p>
            <p className="text-sm font-bold text-gray-900">{allotment.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Unit Number</p>
            <p className="text-lg font-bold text-blue-600">{allotment.unitNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Price</p>
            <p className="text-lg font-bold text-gray-900">{allotment.price}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Payment Status</p>
            <p className="text-lg font-bold text-green-600">{paymentProgress.toFixed(0)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-sm font-bold ${
              allotment.status === 'Completed' ? 'text-green-600' :
              allotment.status === 'Payment Pending' ? 'text-orange-600' :
              allotment.status === 'Documentation Pending' ? 'text-blue-600' :
              allotment.status === 'Registry Pending' ? 'text-purple-600' :
              'text-red-600'
            }`}>
              {allotment.status}
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
          <Edit size={20} />
          <span>Edit Allotment</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <CreditCard size={20} />
          <span>Record Payment</span>
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
          <span>Back to Allotments</span>
        </button>
      </div>
    </div>
  )
}