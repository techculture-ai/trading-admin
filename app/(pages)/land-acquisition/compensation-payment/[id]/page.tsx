'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, User, FileText, DollarSign, CheckCircle, Clock, Building, CreditCard, MapPin, Phone, Mail, TrendingUp } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface CompensationDetails {
  id: string
  parcelId: string
  owner: string
  ownerContact: string
  landArea: string
  marketValue: string
  solatium: string
  interest: string
  totalCompensation: string
  paidAmount: string
  pendingAmount: string
  status: 'Paid' | 'Partial' | 'Pending'
  paymentDate: string
  paymentMode: string
  transactionId: string
  bankDetails: {
    accountName: string
    accountNumber: string
    bankName: string
    ifscCode: string
  }
  ownerDetails: {
    name: string
    address: string
    contact: string
    email: string
    aadharNo: string
    panNo: string
  }
  parcelDetails: {
    surveyNo: string
    khataNo: string
    village: string
    district: string
    location: string
  }
  compensationBreakdown: {
    description: string
    amount: string
    percentage: string
  }[]
  paymentHistory: {
    id: string
    date: string
    amount: string
    mode: string
    transactionId: string
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

export default function CompensationPaymentDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  
  // Mock data - in real app, fetch based on params.id
  const [compensation] = useState<CompensationDetails>({
    id: 'COMP-001',
    parcelId: 'PAR-145',
    owner: 'Ram Kumar Singh',
    ownerContact: '+91 98765 43210',
    landArea: '2.5 acres',
    marketValue: '₹40,00,000',
    solatium: '₹12,00,000',
    interest: '₹3,00,000',
    totalCompensation: '₹55,00,000',
    paidAmount: '₹55,00,000',
    pendingAmount: '₹0',
    status: 'Paid',
    paymentDate: '20 Jan 2024',
    paymentMode: 'Bank Transfer',
    transactionId: 'TXN2024001',
    bankDetails: {
      accountName: 'Ram Kumar Singh',
      accountNumber: '1234567890',
      bankName: 'State Bank of India',
      ifscCode: 'SBIN0001234'
    },
    ownerDetails: {
      name: 'Ram Kumar Singh',
      address: 'House No. 123, Village Gomti Nagar, Lucknow - 226010',
      contact: '+91 98765 43210',
      email: 'ramkumar@email.com',
      aadharNo: 'XXXX-XXXX-1234',
      panNo: 'ABCDE1234F',
    },
    parcelDetails: {
      surveyNo: 'SUR-2024-145',
      khataNo: 'KH-456',
      village: 'Gomti Nagar',
      district: 'Lucknow',
      location: 'Gomti Nagar Extension, Lucknow',
    },
    compensationBreakdown: [
      {
        description: 'Market Value',
        amount: '₹40,00,000',
        percentage: '72.7%',
      },
      {
        description: 'Solatium (30% of Market Value)',
        amount: '₹12,00,000',
        percentage: '21.8%',
      },
      {
        description: 'Interest',
        amount: '₹3,00,000',
        percentage: '5.5%',
      },
    ],
    paymentHistory: [
      {
        id: 'PAY-001',
        date: '20 Jan 2024',
        amount: '₹55,00,000',
        mode: 'Bank Transfer',
        transactionId: 'TXN2024001',
        status: 'Success',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-10 10:00:00',
      action: 'Compensation Calculated',
      performedBy: 'Land Valuation Officer',
      details: 'Compensation amount calculated and recorded in system',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-12 14:30:00',
      action: 'Approval Requested',
      performedBy: 'Assistant Land Acquisition Officer',
      details: 'Compensation approval request submitted',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-15 11:00:00',
      action: 'Compensation Approved',
      performedBy: 'Land Acquisition Officer',
      details: 'Compensation amount approved for payment',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-18 09:30:00',
      action: 'Bank Details Verified',
      performedBy: 'Accounts Department',
      details: 'Beneficiary bank account details verified',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-20 10:00:00',
      action: 'Payment Processed',
      performedBy: 'Treasury Officer',
      details: 'Payment of ₹55,00,000 processed successfully',
    },
  ])

  const handleExport = () => {
    const content = `
Compensation Payment Details Report
====================================

Compensation ID: ${compensation.id}
Parcel ID: ${compensation.parcelId}
Status: ${compensation.status}

Owner Details
=============
Name: ${compensation.ownerDetails.name}
Address: ${compensation.ownerDetails.address}
Contact: ${compensation.ownerDetails.contact}
Email: ${compensation.ownerDetails.email}
Aadhar: ${compensation.ownerDetails.aadharNo}
PAN: ${compensation.ownerDetails.panNo}

Parcel Details
==============
Survey No: ${compensation.parcelDetails.surveyNo}
Khata No: ${compensation.parcelDetails.khataNo}
Village: ${compensation.parcelDetails.village}
District: ${compensation.parcelDetails.district}
Location: ${compensation.parcelDetails.location}
Land Area: ${compensation.landArea}

Compensation Breakdown
======================
${compensation.compensationBreakdown.map(item => `${item.description}: ${item.amount} (${item.percentage})`).join('\n')}

Total Compensation: ${compensation.totalCompensation}
Paid Amount: ${compensation.paidAmount}
Pending Amount: ${compensation.pendingAmount}

Bank Details
============
Account Name: ${compensation.bankDetails.accountName}
Account Number: ${compensation.bankDetails.accountNumber}
Bank Name: ${compensation.bankDetails.bankName}
IFSC Code: ${compensation.bankDetails.ifscCode}

Payment Information
===================
Payment Date: ${compensation.paymentDate}
Payment Mode: ${compensation.paymentMode}
Transaction ID: ${compensation.transactionId}

Payment History
===============
${compensation.paymentHistory.map(p => `${p.date} - ${p.amount} (${p.mode}) - ${p.transactionId} - ${p.status}`).join('\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compensation_${compensation.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700'
      case 'Partial':
        return 'bg-blue-100 text-blue-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Partial':
        return <Clock size={40} className="text-blue-600" />
      case 'Pending':
        return <Clock size={40} className="text-orange-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const totalPaid = parseFloat(compensation.paidAmount.replace(/[^0-9]/g, '')) || 0
  const totalComp = parseFloat(compensation.totalCompensation.replace(/[^0-9]/g, '')) || 0
  const paymentPercentage = ((totalPaid / totalComp) * 100).toFixed(1)


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
            <h1 className="text-2xl font-bold text-gray-900">Compensation {compensation.id}</h1>
            <p className="text-sm text-gray-600 mt-1">Parcel {compensation.parcelId} • Owner: {compensation.owner}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(compensation.status)}`}>
            {compensation.status}
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

      {/* Compensation Amount Card */}
      <div className={`rounded-lg p-8 text-white ${
        compensation.status === 'Paid' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        compensation.status === 'Partial' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              compensation.status === 'Paid' ? 'text-green-100' :
              compensation.status === 'Partial' ? 'text-blue-100' :
              'text-orange-100'
            }`}>
              Total Compensation Amount
            </p>
            <h2 className="text-4xl font-bold">{compensation.totalCompensation}</h2>
            <p className={`text-sm mt-2 ${
              compensation.status === 'Paid' ? 'text-green-100' :
              compensation.status === 'Partial' ? 'text-blue-100' :
              'text-orange-100'
            }`}>
              Paid: {compensation.paidAmount} • Pending: {compensation.pendingAmount}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(compensation.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Market Value</p>
              <h3 className="text-2xl font-bold text-gray-900">{compensation.marketValue}</h3>
              <p className="text-xs text-gray-500 mt-2">Base amount</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Solatium</p>
              <h3 className="text-2xl font-bold text-purple-600">{compensation.solatium}</h3>
              <p className="text-xs text-gray-500 mt-2">30% of market value</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Interest</p>
              <h3 className="text-2xl font-bold text-orange-600">{compensation.interest}</h3>
              <p className="text-xs text-gray-500 mt-2">Accrued interest</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Payment Status</p>
              <h3 className="text-2xl font-bold text-green-600">{paymentPercentage}%</h3>
              <p className="text-xs text-gray-500 mt-2">Disbursed</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Amount Disbursed</span>
            <span className="font-medium text-gray-900">{paymentPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                compensation.status === 'Paid' ? 'bg-green-500' :
                compensation.status === 'Partial' ? 'bg-blue-500' :
                'bg-orange-500'
              }`}
              style={{ width: `${paymentPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Paid: {compensation.paidAmount}</span>
            <span>Pending: {compensation.pendingAmount}</span>
          </div>
        </div>
      </div>

      {/* Compensation Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compensation Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Compensation ID</p>
            <p className="text-sm font-medium text-gray-900">{compensation.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Parcel ID</p>
            <p className="text-sm font-medium text-gray-900">{compensation.parcelId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Land Area</p>
            <p className="text-sm font-medium text-gray-900">{compensation.landArea}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Status</p>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(compensation.status)}`}>
              {compensation.status}
            </span>
          </div>
          {compensation.paymentDate !== '-' && (
            <>
              <div>
                <p className="text-xs text-gray-500 mb-1">Payment Date</p>
                <p className="text-sm font-medium text-gray-900 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {compensation.paymentDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Payment Mode</p>
                <p className="text-sm font-medium text-gray-900">{compensation.paymentMode}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                <p className="text-sm font-medium text-gray-900">{compensation.transactionId}</p>
              </div>
            </>
          )}
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
            <p className="text-sm font-medium text-gray-900">{compensation.ownerDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <Phone size={12} className="mr-1" />
              Contact Number
            </p>
            <p className="text-sm font-medium text-gray-900">{compensation.ownerDetails.contact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <Mail size={12} className="mr-1" />
              Email Address
            </p>
            <p className="text-sm font-medium text-gray-900">{compensation.ownerDetails.email}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{compensation.ownerDetails.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{compensation.ownerDetails.panNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Aadhar Number</p>
            <p className="text-sm font-medium text-gray-900">{compensation.ownerDetails.aadharNo}</p>
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
            <p className="text-sm font-medium text-gray-900">{compensation.parcelDetails.surveyNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Khata Number</p>
            <p className="text-sm font-medium text-gray-900">{compensation.parcelDetails.khataNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Land Area</p>
            <p className="text-sm font-medium text-gray-900">{compensation.landArea}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Village</p>
            <p className="text-sm font-medium text-gray-900">{compensation.parcelDetails.village}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">District</p>
            <p className="text-sm font-medium text-gray-900">{compensation.parcelDetails.district}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1" />
              {compensation.parcelDetails.location}
            </p>
          </div>
        </div>
      </div>

      {/* Compensation Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compensation Breakdown</h3>
        <div className="space-y-4">
          {compensation.compensationBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.description}</p>
                <p className="text-xs text-gray-500 mt-1">{item.percentage} of total</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{item.amount}</p>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-orange-100 rounded-lg border-2 border-orange-200">
            <p className="text-base font-bold text-orange-900">Total Compensation</p>
            <p className="text-2xl font-bold text-orange-900">{compensation.totalCompensation}</p>
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Beneficiary Bank Account Details
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 mb-2">Account Holder Name</p>
            <p className="text-lg font-semibold text-blue-900">{compensation.bankDetails.accountName}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 mb-2">Account Number</p>
            <p className="text-lg font-semibold text-blue-900">{compensation.bankDetails.accountNumber}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 mb-2">Bank Name</p>
            <p className="text-lg font-semibold text-blue-900">{compensation.bankDetails.bankName}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 mb-2">IFSC Code</p>
            <p className="text-lg font-semibold text-blue-900">{compensation.bankDetails.ifscCode}</p>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <CreditCard size={20} className="mr-2" />
            Payment History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {compensation.paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.mode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Total Paid:</span>
            <span className="text-xl font-bold text-green-600">{compensation.paidAmount}</span>
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
            <p className="text-xs text-gray-600 mb-2">Compensation ID</p>
            <p className="text-lg font-bold text-gray-900">{compensation.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Amount</p>
            <p className="text-lg font-bold text-blue-600">{compensation.totalCompensation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Paid</p>
            <p className="text-lg font-bold text-green-600">{compensation.paidAmount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Pending</p>
            <p className="text-lg font-bold text-orange-600">{compensation.pendingAmount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              compensation.status === 'Paid' ? 'text-green-600' :
              compensation.status === 'Partial' ? 'text-blue-600' :
              'text-orange-600'
            }`}>
              {compensation.status}
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
          <FileText size={20} />
          <span>Print Receipt</span>
        </button>
        {compensation.status !== 'Paid' && (
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <CreditCard size={20} />
            <span>Process Payment</span>
          </button>
        )}
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