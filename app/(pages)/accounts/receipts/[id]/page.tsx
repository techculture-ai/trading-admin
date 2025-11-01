'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, CreditCard, User, FileText, Building, Check, DollarSign, Phone, Mail, MapPin } from 'lucide-react'

interface ReceiptDetails {
  id: string
  receiptNo: string
  date: string
  receiptType: string
  description: string
  payer: string
  amount: number
  paymentMode: string
  status: string
  transactionRef: string
  bankName: string
  chequeNo: string
  chequeDate: string
  depositDate: string
  remarks: string
  createdBy: string
  payerDetails: {
    name: string
    address: string
    contact: string
    email: string
    panNo: string
    aadharNo: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function ReceiptsDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data - in real app, fetch based on params.id
  const [receipt] = useState<ReceiptDetails>({
    id: 'RCP-2024-001',
    receiptNo: 'RCP/24/001',
    date: '2024-01-25',
    receiptType: 'Property Sale',
    description: 'Sale of Unit A-101, Gomti Nagar - Full payment for residential unit including registration charges and amenities',
    payer: 'Rajesh Kumar Singh',
    amount: 4500000,
    paymentMode: 'Online Transfer',
    status: 'Cleared',
    transactionRef: 'TXN2024012500123',
    bankName: 'State Bank of India',
    chequeNo: '-',
    chequeDate: '-',
    depositDate: '2024-01-25',
    remarks: 'Full payment received. Property registration in progress.',
    createdBy: 'Accounts Manager',
    payerDetails: {
      name: 'Rajesh Kumar Singh',
      address: 'House No. 123, Sector 5, Gomti Nagar, Lucknow - 226010',
      contact: '+91 9876543210',
      email: 'rajesh.kumar@email.com',
      panNo: 'ABCDE1234F',
      aadharNo: 'XXXX-XXXX-1234',
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-25 10:00:00',
      action: 'Created',
      performedBy: 'Accounts Manager',
      details: 'Receipt entry created in the system',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-25 10:30:00',
      action: 'Payment Received',
      performedBy: 'Treasury Officer',
      details: 'Payment received via online transfer',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-25 11:00:00',
      action: 'Verified',
      performedBy: 'Senior Accountant',
      details: 'Payment verification completed',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-25 14:30:00',
      action: 'Cleared',
      performedBy: 'Finance Director',
      details: 'Receipt cleared and approved',
    },
  ])

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const handleExport = () => {
    const content = `
Receipt Details Report
======================

Receipt ID: ${receipt.id}
Receipt No: ${receipt.receiptNo}
Date: ${new Date(receipt.date).toLocaleDateString('en-IN')}
Receipt Type: ${receipt.receiptType}
Amount: ${formatCurrency(receipt.amount)}
Status: ${receipt.status}

Payer Details
=============
Name: ${receipt.payerDetails.name}
Address: ${receipt.payerDetails.address}
Contact: ${receipt.payerDetails.contact}
Email: ${receipt.payerDetails.email}
PAN: ${receipt.payerDetails.panNo}
Aadhar: ${receipt.payerDetails.aadharNo}

Payment Details
===============
Payment Mode: ${receipt.paymentMode}
Bank Name: ${receipt.bankName}
Transaction Ref: ${receipt.transactionRef}
Deposit Date: ${receipt.depositDate}

Description
===========
${receipt.description}

Remarks
=======
${receipt.remarks}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipt_details_${receipt.id}.txt`
    a.click()
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
            <h1 className="text-2xl font-bold text-gray-900">{receipt.payer}</h1>
            <p className="text-sm text-gray-600 mt-1">{receipt.id} • {receipt.receiptNo}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${
            receipt.status === 'Cleared' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {receipt.status}
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

      {/* Receipt Amount Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm mb-2">Total Receipt Amount</p>
            <h2 className="text-4xl font-bold">{formatCurrency(receipt.amount)}</h2>
            <p className="text-green-100 text-sm mt-2">{receipt.receiptType}</p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <DollarSign size={40} />
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Receipt Information */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Receipt Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Receipt ID</p>
              <p className="text-sm font-medium text-gray-900">{receipt.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Receipt Number</p>
              <p className="text-sm font-medium text-gray-900">{receipt.receiptNo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Receipt Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(receipt.date).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Receipt Type</p>
              <p className="text-sm font-medium text-gray-900">{receipt.receiptType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Payment Mode</p>
              <p className="text-sm font-medium text-gray-900">{receipt.paymentMode}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Created By</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <User size={14} className="mr-1" />
                {receipt.createdBy}
              </p>
            </div>
          </div>
        </div>

        {/* Receipt Status Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Receipt Status</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Created</p>
                <p className="text-xs text-gray-500">{new Date(receipt.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Received</p>
                <p className="text-xs text-gray-500">Verified</p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 ${receipt.status === 'Cleared' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                receipt.status === 'Cleared' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Check size={16} className={receipt.status === 'Cleared' ? 'text-green-600' : 'text-gray-400'} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Cleared</p>
                <p className="text-xs text-gray-500">
                  {receipt.status === 'Cleared' ? 'Completed' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payer Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Payer Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <User size={12} className="mr-1" />
              Name
            </p>
            <p className="text-sm font-medium text-gray-900">{receipt.payerDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <Phone size={12} className="mr-1" />
              Contact Number
            </p>
            <p className="text-sm font-medium text-gray-900">{receipt.payerDetails.contact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <Mail size={12} className="mr-1" />
              Email Address
            </p>
            <p className="text-sm font-medium text-gray-900">{receipt.payerDetails.email}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <MapPin size={12} className="mr-1" />
              Address
            </p>
            <p className="text-sm font-medium text-gray-900">{receipt.payerDetails.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{receipt.payerDetails.panNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Aadhar Number</p>
            <p className="text-sm font-medium text-gray-900">{receipt.payerDetails.aadharNo}</p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <CreditCard size={20} className="mr-2" />
          Payment Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Mode</p>
            <p className="text-sm font-medium text-gray-900">{receipt.paymentMode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Bank Name</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Building size={14} className="mr-1" />
              {receipt.bankName}
            </p>
          </div>
          {receipt.transactionRef !== '-' && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction Reference</p>
              <p className="text-sm font-medium text-gray-900">{receipt.transactionRef}</p>
            </div>
          )}
          {receipt.chequeNo !== '-' && (
            <>
              <div>
                <p className="text-xs text-gray-500 mb-1">Cheque Number</p>
                <p className="text-sm font-medium text-gray-900">{receipt.chequeNo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Cheque Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(receipt.chequeDate).toLocaleDateString('en-IN')}
                </p>
              </div>
            </>
          )}
          {receipt.depositDate !== '-' && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Deposit Date</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(receipt.depositDate).toLocaleDateString('en-IN')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Amount Breakdown */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-6">Amount Breakdown</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4">
            <span className="text-base font-semibold text-green-900">Total Received Amount</span>
            <span className="text-3xl font-bold text-green-600">{formatCurrency(receipt.amount)}</span>
          </div>
          <div className="pt-4 border-t border-green-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white bg-opacity-50 rounded-lg p-3">
                <p className="text-xs text-green-700 mb-1">Receipt Type</p>
                <p className="text-sm font-semibold text-green-900">{receipt.receiptType}</p>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-3">
                <p className="text-xs text-green-700 mb-1">Payment Method</p>
                <p className="text-sm font-semibold text-green-900">{receipt.paymentMode}</p>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-3">
                <p className="text-xs text-green-700 mb-1">Status</p>
                <p className="text-sm font-semibold text-green-900">{receipt.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Receipt Description
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {receipt.description}
        </p>
      </div>

      {/* Remarks */}
      {receipt.remarks && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Remarks</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {receipt.remarks}
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
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <Check size={16} className="text-green-600" />
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

      {/* Tax Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Tax & Legal Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">PAN Number</p>
            <p className="text-lg font-semibold text-gray-900">{receipt.payerDetails.panNo}</p>
            <p className="text-xs text-gray-500 mt-2">Permanent Account Number</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Aadhar Number</p>
            <p className="text-lg font-semibold text-gray-900">{receipt.payerDetails.aadharNo}</p>
            <p className="text-xs text-gray-500 mt-2">Unique Identification Number</p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Receipt ID</p>
            <p className="text-lg font-bold text-gray-900">{receipt.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Amount</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(receipt.amount)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className="text-lg font-bold text-green-600">{receipt.status}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Receipt Type</p>
            <p className="text-lg font-bold text-gray-900">{receipt.receiptType}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Download size={20} />
          <span>Download Receipt</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <FileText size={20} />
          <span>Print Receipt</span>
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