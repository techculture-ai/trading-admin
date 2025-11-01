'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, CreditCard, User, FileText, Clock, CheckCircle, AlertCircle, Building } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface PayableDetails {
  id: string
  voucherNo: string
  date: string
  paymentType: string
  description: string
  payee: string
  amount: number
  dueDate: string
  status: string
  paymentDate: string
  paymentMode: string
  transactionRef: string
  approvedBy: string
  remarks: string
  payeeDetails: {
    name: string
    accountNo: string
    ifscCode: string
    bankName: string
    branch: string
    panNo: string
    gstNo: string
    address: string
    contact: string
    email: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function PayablesDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  // Mock data - in real app, fetch based on params.id
  const [payable] = useState<PayableDetails>({
    id: 'PAY-2024-001',
    voucherNo: 'V/24/001',
    date: '2024-01-20',
    paymentType: 'Contractor Payment',
    description: 'Running Bill RB-05 - ABC Builders for Gomti Nagar Housing Scheme Phase 1 construction work',
    payee: 'ABC Builders Ltd.',
    amount: 25000000,
    dueDate: '2024-01-30',
    status: 'Paid',
    paymentDate: '2024-01-25',
    paymentMode: 'NEFT',
    transactionRef: 'TXN202401250001',
    approvedBy: 'Finance Director',
    remarks: 'Payment completed on time. All deductions applied as per contract.',
    payeeDetails: {
      name: 'ABC Builders Ltd.',
      accountNo: '1234567890',
      ifscCode: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Gomti Nagar Branch',
      panNo: 'ABCDE1234F',
      gstNo: '09ABCDE1234F1Z5',
      address: 'Plot No. 45, Industrial Area, Lucknow - 226001',
      contact: '+91 9876543210',
      email: 'abc.builders@email.com',
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-20 10:30:00',
      action: 'Created',
      performedBy: 'Accounts Manager',
      details: 'Payment entry created in the system',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-21 14:15:00',
      action: 'Verified',
      performedBy: 'Senior Accountant',
      details: 'Bill verification completed',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-22 11:00:00',
      action: 'Approved',
      performedBy: 'Finance Director',
      details: 'Payment approved for processing',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-25 09:45:00',
      action: 'Paid',
      performedBy: 'Treasury Officer',
      details: 'Payment processed via NEFT',
    },
  ])

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const handleExport = () => {
    const content = `
Payment Details Report
======================

Payment ID: ${payable.id}
Voucher No: ${payable.voucherNo}
Date: ${new Date(payable.date).toLocaleDateString('en-IN')}
Payment Type: ${payable.paymentType}
Amount: ${formatCurrency(payable.amount)}
Status: ${payable.status}

Payee Details
=============
Name: ${payable.payeeDetails.name}
Account No: ${payable.payeeDetails.accountNo}
IFSC Code: ${payable.payeeDetails.ifscCode}
Bank: ${payable.payeeDetails.bankName}
Branch: ${payable.payeeDetails.branch}
PAN: ${payable.payeeDetails.panNo}
GST: ${payable.payeeDetails.gstNo}
Address: ${payable.payeeDetails.address}
Contact: ${payable.payeeDetails.contact}
Email: ${payable.payeeDetails.email}

Description
===========
${payable.description}

Remarks
=======
${payable.remarks}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `payment_details_${payable.id}.txt`
    a.click()
  }

  const isOverdue = new Date(payable.dueDate) < new Date() && payable.status !== 'Paid'
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
            <h1 className="text-2xl font-bold text-gray-900">{payable.payee}</h1>
            <p className="text-sm text-gray-600 mt-1">{payable.id} • {payable.voucherNo}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${
            payable.status === 'Paid' ? 'bg-green-100 text-green-700' :
            payable.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            {payable.status}
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

      {/* Alert for Overdue */}
      {isOverdue && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle size={20} className="text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-900">Payment Overdue</p>
            <p className="text-sm text-red-700">This payment was due on {new Date(payable.dueDate).toLocaleDateString('en-IN')}</p>
          </div>
        </div>
      )}

      {/* Payment Amount Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm mb-2">Total Payment Amount</p>
            <h2 className="text-4xl font-bold">{formatCurrency(payable.amount)}</h2>
            <p className="text-orange-100 text-sm mt-2">{payable.paymentType}</p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <CreditCard size={40} />
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Information */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Payment ID</p>
              <p className="text-sm font-medium text-gray-900">{payable.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Voucher Number</p>
              <p className="text-sm font-medium text-gray-900">{payable.voucherNo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Payment Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(payable.date).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Due Date</p>
              <p className={`text-sm font-medium flex items-center ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                <Clock size={14} className="mr-1" />
                {new Date(payable.dueDate).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Payment Type</p>
              <p className="text-sm font-medium text-gray-900">{payable.paymentType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Approved By</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <User size={14} className="mr-1" />
                {payable.approvedBy}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Status Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
          <div className="space-y-4">
            <div className={`flex items-center space-x-3 ${payable.status !== 'Pending Approval' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                payable.status !== 'Pending Approval' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <CheckCircle size={16} className={payable.status !== 'Pending Approval' ? 'text-green-600' : 'text-gray-400'} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Created</p>
                <p className="text-xs text-gray-500">{new Date(payable.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 ${payable.status === 'Approved' || payable.status === 'Paid' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                payable.status === 'Approved' || payable.status === 'Paid' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <CheckCircle size={16} className={payable.status === 'Approved' || payable.status === 'Paid' ? 'text-blue-600' : 'text-gray-400'} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Approved</p>
                <p className="text-xs text-gray-500">
                  {payable.status === 'Approved' || payable.status === 'Paid' ? 'Approved' : 'Pending'}
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 ${payable.status === 'Paid' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                payable.status === 'Paid' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <CheckCircle size={16} className={payable.status === 'Paid' ? 'text-green-600' : 'text-gray-400'} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Paid</p>
                <p className="text-xs text-gray-500">
                  {payable.status === 'Paid' ? new Date(payable.paymentDate).toLocaleDateString('en-IN') : 'Not yet paid'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payee Bank Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Payee Bank Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Bank Name</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.bankName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Branch</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.branch}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Account Number</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.accountNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">IFSC Code</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.ifscCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.panNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">GST Number</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.gstNo}</p>
          </div>
        </div>
      </div>

      {/* Payee Contact Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payee Contact Details</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.contact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.email}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{payable.payeeDetails.address}</p>
          </div>
        </div>
      </div>

      {/* Payment Transaction Details */}
      {payable.status === 'Paid' && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-6 flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Payment Transaction Details
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-green-700 mb-1">Payment Date</p>
              <p className="text-sm font-medium text-green-900">
                {new Date(payable.paymentDate).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-green-700 mb-1">Payment Mode</p>
              <p className="text-sm font-medium text-green-900">{payable.paymentMode}</p>
            </div>
            <div>
              <p className="text-xs text-green-700 mb-1">Transaction Reference</p>
              <p className="text-sm font-medium text-green-900">{payable.transactionRef}</p>
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Description</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {payable.description}
        </p>
      </div>

      {/* Remarks */}
      {payable.remarks && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Remarks</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {payable.remarks}
          </p>
        </div>
      )}

      {/* Audit Trail */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText size={20} className="mr-2" />
            Audit Trail
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
        <div className="grid grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Payment ID</p>
            <p className="text-lg font-bold text-gray-900">{payable.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Amount</p>
            <p className="text-lg font-bold text-orange-600">{formatCurrency(payable.amount)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className="text-lg font-bold text-green-600">{payable.status}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Approved By</p>
            <p className="text-lg font-bold text-gray-900">{payable.approvedBy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}