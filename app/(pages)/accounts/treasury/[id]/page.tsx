'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, CreditCard, User, FileText, Clock, CheckCircle, AlertCircle, Building, RefreshCw, Database, Shield } from 'lucide-react'

interface TreasuryTransactionDetails {
  id: string
  transactionId: string
  date: string
  type: string
  description: string
  amount: number
  treasuryRef: string
  status: string
  pfmsStatus: string
  payeePayerName: string
  billVoucherNo: string
  bankName: string
  accountNo: string
  ifscCode: string
  sanctionedBy: string
  remarks: string
  createdBy: string
  lastSyncTime: string
  pfmsResponseCode: string
  pfmsResponseMessage: string
  payeePayerDetails: {
    name: string
    type: string
    address: string
    contact: string
    email: string
    panNo: string
    gstNo: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

interface SyncLog {
  id: string
  timestamp: string
  syncType: string
  status: string
  message: string
}

export default function TreasuryDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data - in real app, fetch based on params.id
  const [transaction] = useState<TreasuryTransactionDetails>({
    id: 'TRY-2024-001',
    transactionId: 'PFMS/2024/001',
    date: '2024-01-25',
    type: 'Payment',
    description: 'Contractor Payment - ABC Builders for Gomti Nagar Housing Scheme Phase 1 construction work as per Running Bill RB-05',
    amount: 25000000,
    treasuryRef: 'TRY-REF-2024-001',
    status: 'Processed',
    pfmsStatus: 'Success',
    payeePayerName: 'ABC Builders Ltd.',
    billVoucherNo: 'V/24/001',
    bankName: 'State Bank of India',
    accountNo: '1234567890',
    ifscCode: 'SBIN0001234',
    sanctionedBy: 'Finance Director',
    remarks: 'Payment processed successfully through PFMS. All verifications completed.',
    createdBy: 'Treasury Officer',
    lastSyncTime: '2024-01-25 15:30:00',
    pfmsResponseCode: 'SUCCESS_200',
    pfmsResponseMessage: 'Transaction processed successfully by PFMS',
    payeePayerDetails: {
      name: 'ABC Builders Ltd.',
      type: 'Contractor',
      address: 'Plot No. 45, Industrial Area, Lucknow - 226001',
      contact: '+91 9876543210',
      email: 'abc.builders@email.com',
      panNo: 'ABCDE1234F',
      gstNo: '09ABCDE1234F1Z5',
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-25 10:00:00',
      action: 'Transaction Created',
      performedBy: 'Treasury Officer',
      details: 'Treasury transaction entry created in the system',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-25 10:30:00',
      action: 'Sanctioned',
      performedBy: 'Finance Director',
      details: 'Transaction sanctioned for PFMS processing',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-25 11:00:00',
      action: 'PFMS Sync Initiated',
      performedBy: 'System',
      details: 'Transaction synced with PFMS gateway',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-25 11:15:00',
      action: 'PFMS Acknowledgement',
      performedBy: 'PFMS Gateway',
      details: 'Transaction acknowledged by PFMS',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-25 15:30:00',
      action: 'Processed',
      performedBy: 'PFMS Gateway',
      details: 'Payment processed successfully',
    },
  ])

  const [syncLogs] = useState<SyncLog[]>([
    {
      id: 'SL-001',
      timestamp: '2024-01-25 11:00:00',
      syncType: 'Initial Sync',
      status: 'Success',
      message: 'Transaction data sent to PFMS',
    },
    {
      id: 'SL-002',
      timestamp: '2024-01-25 11:15:00',
      syncType: 'Status Check',
      status: 'Success',
      message: 'Status: In Progress',
    },
    {
      id: 'SL-003',
      timestamp: '2024-01-25 12:00:00',
      syncType: 'Status Check',
      status: 'Success',
      message: 'Status: Processing',
    },
    {
      id: 'SL-004',
      timestamp: '2024-01-25 15:30:00',
      syncType: 'Final Sync',
      status: 'Success',
      message: 'Status: Processed - Payment Completed',
    },
  ])

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const handleExport = () => {
    const content = `
Treasury Transaction Details Report
====================================

Transaction ID: ${transaction.id}
PFMS Transaction ID: ${transaction.transactionId}
Treasury Reference: ${transaction.treasuryRef}
Date: ${new Date(transaction.date).toLocaleDateString('en-IN')}
Transaction Type: ${transaction.type}
Amount: ${formatCurrency(transaction.amount)}
Status: ${transaction.status}
PFMS Status: ${transaction.pfmsStatus}

Payee/Payer Details
===================
Name: ${transaction.payeePayerDetails.name}
Type: ${transaction.payeePayerDetails.type}
Address: ${transaction.payeePayerDetails.address}
Contact: ${transaction.payeePayerDetails.contact}
Email: ${transaction.payeePayerDetails.email}
PAN: ${transaction.payeePayerDetails.panNo}
GST: ${transaction.payeePayerDetails.gstNo}

Banking Details
===============
Bank Name: ${transaction.bankName}
Account No: ${transaction.accountNo}
IFSC Code: ${transaction.ifscCode}

PFMS Information
================
Response Code: ${transaction.pfmsResponseCode}
Response Message: ${transaction.pfmsResponseMessage}
Last Sync Time: ${transaction.lastSyncTime}

Description
===========
${transaction.description}

Remarks
=======
${transaction.remarks}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}

PFMS Sync Logs
==============
${syncLogs.map(log => `${log.timestamp} - ${log.syncType} [${log.status}]: ${log.message}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `treasury_transaction_${transaction.id}.txt`
    a.click()
  }

  const handleResync = () => {
    if (confirm('Do you want to re-sync this transaction with PFMS?')) {
      alert('Re-sync initiated with PFMS. This may take a few moments.')
      // In real app, call API to re-sync
    }
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
            <h1 className="text-2xl font-bold text-gray-900">{transaction.payeePayerName}</h1>
            <p className="text-sm text-gray-600 mt-1">{transaction.id} • {transaction.transactionId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${
            transaction.status === 'Reconciled' ? 'bg-green-100 text-green-700' :
            transaction.status === 'Processed' ? 'bg-blue-100 text-blue-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            {transaction.status}
          </span>
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${
            transaction.pfmsStatus === 'Success' ? 'bg-green-100 text-green-700' :
            transaction.pfmsStatus === 'Failed' ? 'bg-red-100 text-red-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            PFMS: {transaction.pfmsStatus}
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

      {/* PFMS Status Alert */}
      {transaction.pfmsStatus === 'Success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle size={20} className="text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-900">PFMS Transaction Successful</p>
            <p className="text-sm text-green-700">This transaction has been successfully processed by PFMS</p>
          </div>
        </div>
      )}

      {transaction.pfmsStatus === 'In Progress' && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center space-x-3">
          <Clock size={20} className="text-orange-600" />
          <div>
            <p className="text-sm font-medium text-orange-900">PFMS Processing</p>
            <p className="text-sm text-orange-700">This transaction is currently being processed by PFMS</p>
          </div>
        </div>
      )}

      {transaction.pfmsStatus === 'Failed' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle size={20} className="text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-900">PFMS Transaction Failed</p>
              <p className="text-sm text-red-700">This transaction failed during PFMS processing</p>
            </div>
          </div>
          <button 
            onClick={handleResync}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RefreshCw size={16} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Transaction Amount Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-2">Transaction Amount</p>
            <h2 className="text-4xl font-bold">{formatCurrency(transaction.amount)}</h2>
            <p className="text-blue-100 text-sm mt-2">{transaction.type} Transaction</p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Database size={40} />
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Information */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Transaction Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
              <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">PFMS Transaction ID</p>
              <p className="text-sm font-medium text-gray-900">{transaction.transactionId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Treasury Reference</p>
              <p className="text-sm font-medium text-gray-900">{transaction.treasuryRef}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Bill/Voucher No</p>
              <p className="text-sm font-medium text-gray-900">{transaction.billVoucherNo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(transaction.date).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction Type</p>
              <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Sanctioned By</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <User size={14} className="mr-1" />
                {transaction.sanctionedBy}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Created By</p>
              <p className="text-sm font-medium text-gray-900">{transaction.createdBy}</p>
            </div>
          </div>
        </div>

        {/* Transaction Status Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Status</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Created</p>
                <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 ${transaction.status !== 'Pending' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                transaction.status !== 'Pending' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <CheckCircle size={16} className={transaction.status !== 'Pending' ? 'text-blue-600' : 'text-gray-400'} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Processed</p>
                <p className="text-xs text-gray-500">
                  {transaction.status !== 'Pending' ? 'Completed' : 'Pending'}
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 ${transaction.status === 'Reconciled' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                transaction.status === 'Reconciled' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <CheckCircle size={16} className={transaction.status === 'Reconciled' ? 'text-green-600' : 'text-gray-400'} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Reconciled</p>
                <p className="text-xs text-gray-500">
                  {transaction.status === 'Reconciled' ? 'Completed' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PFMS Integration Details */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-6 flex items-center">
          <Shield size={20} className="mr-2" />
          PFMS Integration Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <p className="text-xs text-purple-700 mb-2">PFMS Status</p>
            <p className="text-lg font-semibold text-purple-900">{transaction.pfmsStatus}</p>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <p className="text-xs text-purple-700 mb-2">Response Code</p>
            <p className="text-lg font-semibold text-purple-900">{transaction.pfmsResponseCode}</p>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <p className="text-xs text-purple-700 mb-2">Last Sync Time</p>
            <p className="text-sm font-semibold text-purple-900">
              {new Date(transaction.lastSyncTime).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="col-span-3 bg-white bg-opacity-50 rounded-lg p-4">
            <p className="text-xs text-purple-700 mb-2">PFMS Response Message</p>
            <p className="text-sm font-medium text-purple-900">{transaction.pfmsResponseMessage}</p>
          </div>
        </div>
      </div>

      {/* Payee/Payer Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          {transaction.type === 'Payment' ? 'Payee' : 'Payer'} Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Name</p>
            <p className="text-sm font-medium text-gray-900">{transaction.payeePayerDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Type</p>
            <p className="text-sm font-medium text-gray-900">{transaction.payeePayerDetails.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact</p>
            <p className="text-sm font-medium text-gray-900">{transaction.payeePayerDetails.contact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-900">{transaction.payeePayerDetails.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{transaction.payeePayerDetails.panNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">GST Number</p>
            <p className="text-sm font-medium text-gray-900">{transaction.payeePayerDetails.gstNo}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{transaction.payeePayerDetails.address}</p>
          </div>
        </div>
      </div>

      {/* Banking Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Banking Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Bank Name</p>
            <p className="text-sm font-medium text-gray-900">{transaction.bankName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Account Number</p>
            <p className="text-sm font-medium text-gray-900">{transaction.accountNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">IFSC Code</p>
            <p className="text-sm font-medium text-gray-900">{transaction.ifscCode}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Transaction Description
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {transaction.description}
        </p>
      </div>

      {/* Remarks */}
      {transaction.remarks && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Remarks</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {transaction.remarks}
          </p>
        </div>
      )}

      {/* PFMS Sync Logs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <RefreshCw size={20} className="mr-2" />
            PFMS Synchronization Logs
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {syncLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    log.status === 'Success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {log.status === 'Success' ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <AlertCircle size={20} className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.syncType}</p>
                    <p className="text-sm text-gray-600">{log.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString('en-IN')}</p>
                  <span className={`text-xs font-medium ${
                    log.status === 'Success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {log.status}
                  </span>
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
        <div className="grid grid-cols-5 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Transaction ID</p>
            <p className="text-lg font-bold text-gray-900">{transaction.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Amount</p>
            <p className="text-lg font-bold text-blue-600">{formatCurrency(transaction.amount)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className="text-lg font-bold text-blue-600">{transaction.status}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">PFMS Status</p>
            <p className="text-lg font-bold text-green-600">{transaction.pfmsStatus}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Type</p>
            <p className="text-lg font-bold text-gray-900">{transaction.type}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button 
          onClick={handleResync}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
        >
          <RefreshCw size={20} />
          <span>Re-sync with PFMS</span>
        </button>
        <button 
          onClick={handleExport}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Download Report</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <FileText size={20} />
          <span>Print Details</span>
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