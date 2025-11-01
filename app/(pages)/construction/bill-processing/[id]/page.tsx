'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, User, FileText, Building, CheckCircle, DollarSign, Briefcase, Clock, AlertCircle } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface BillDetails {
  id: string
  contractId: string
  projectName: string
  contractor: string
  billType: string
  billNo: string
  billAmount: number
  workDone: number
  deductions: number
  netPayable: number
  submissionDate: string
  status: string
  approvedBy: string
  workDescription: string
  deductionDetails: string
  paymentDate: string
  contractorDetails: {
    name: string
    address: string
    contact: string
    email: string
    panNo: string
    gstNo: string
    registrationNo: string
  }
  projectDetails: {
    name: string
    location: string
    projectHead: string
    estimatedCost: number
    startDate: string
    endDate: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

interface DeductionItem {
  id: string
  description: string
  amount: number
  percentage: number
}

export default function BillDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  // Mock data - in real app, fetch based on params.id
  const [bill] = useState<BillDetails>({
    id: 'BILL-2024-001',
    contractId: 'CON-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    contractor: 'ABC Builders Ltd.',
    billType: 'Running Bill',
    billNo: 'RB-05',
    billAmount: 2500000,
    workDone: 2500000,
    deductions: 125000,
    netPayable: 2375000,
    submissionDate: '2024-01-15',
    status: 'Approved',
    approvedBy: 'Rajesh Sharma',
    workDescription: 'Foundation and basement construction work completed as per approved drawings. All structural work including RCC columns, beams, and slab work completed. Quality tests passed for concrete strength.',
    deductionDetails: 'GST @ 18%, Labour Cess @ 1%, Security Deposit @ 5%',
    paymentDate: '2024-01-20',
    contractorDetails: {
      name: 'ABC Builders Ltd.',
      address: 'Plot No. 123, Industrial Area, Gomti Nagar, Lucknow - 226010',
      contact: '+91 9876543210',
      email: 'abc.builders@email.com',
      panNo: 'ABCDE1234F',
      gstNo: '09ABCDE1234F1Z5',
      registrationNo: 'REG/UP/2020/12345',
    },
    projectDetails: {
      name: 'Gomti Nagar Housing Scheme',
      location: 'Gomti Nagar, Lucknow',
      projectHead: 'Er. Ramesh Kumar',
      estimatedCost: 50000000,
      startDate: '2023-06-01',
      endDate: '2025-05-31',
    }
  })

  const [deductionItems] = useState<DeductionItem[]>([
    {
      id: 'DED-001',
      description: 'GST @ 18%',
      amount: 45000,
      percentage: 1.8,
    },
    {
      id: 'DED-002',
      description: 'Labour Cess @ 1%',
      amount: 25000,
      percentage: 1.0,
    },
    {
      id: 'DED-003',
      description: 'Security Deposit @ 5%',
      amount: 55000,
      percentage: 2.2,
    },
  ])

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-15 10:00:00',
      action: 'Bill Submitted',
      performedBy: 'ABC Builders Ltd.',
      details: 'Running Bill RB-05 submitted for verification',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-16 14:30:00',
      action: 'Under Verification',
      performedBy: 'Junior Engineer',
      details: 'Bill forwarded to Junior Engineer for technical verification',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-17 11:00:00',
      action: 'Technical Verification Completed',
      performedBy: 'Junior Engineer',
      details: 'Measurements verified and found correct',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-18 16:45:00',
      action: 'Approved',
      performedBy: 'Rajesh Sharma',
      details: 'Bill approved for payment processing',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-20 09:30:00',
      action: 'Payment Processed',
      performedBy: 'Accounts Department',
      details: 'Payment released to contractor',
    },
  ])

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const handleExport = () => {
    const content = `
Bill Details Report
===================

Bill ID: ${bill.id}
Bill Number: ${bill.billNo}
Contract ID: ${bill.contractId}
Bill Type: ${bill.billType}
Submission Date: ${new Date(bill.submissionDate).toLocaleDateString('en-IN')}
Status: ${bill.status}

Project Details
===============
Project Name: ${bill.projectDetails.name}
Location: ${bill.projectDetails.location}
Project Head: ${bill.projectDetails.projectHead}
Estimated Cost: ${formatCurrency(bill.projectDetails.estimatedCost)}

Contractor Details
==================
Name: ${bill.contractorDetails.name}
Address: ${bill.contractorDetails.address}
Contact: ${bill.contractorDetails.contact}
Email: ${bill.contractorDetails.email}
PAN: ${bill.contractorDetails.panNo}
GST: ${bill.contractorDetails.gstNo}
Registration: ${bill.contractorDetails.registrationNo}

Financial Summary
=================
Bill Amount: ${formatCurrency(bill.billAmount)}
Work Done: ${formatCurrency(bill.workDone)}
Total Deductions: ${formatCurrency(bill.deductions)}
Net Payable: ${formatCurrency(bill.netPayable)}

Deduction Breakdown
===================
${deductionItems.map(item => `${item.description}: ${formatCurrency(item.amount)} (${item.percentage}%)`).join('\n')}

Work Description
================
${bill.workDescription}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bill_details_${bill.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700'
      case 'Approved':
        return 'bg-blue-100 text-blue-700'
      case 'Under Verification':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

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
            <h1 className="text-2xl font-bold text-gray-900">{bill.billNo} - {bill.contractor}</h1>
            <p className="text-sm text-gray-600 mt-1">{bill.id} • {bill.projectName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(bill.status)}`}>
            {bill.status}
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

      {/* Bill Amount Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm mb-2">Net Payable Amount</p>
            <h2 className="text-4xl font-bold">{formatCurrency(bill.netPayable)}</h2>
            <p className="text-orange-100 text-sm mt-2">{bill.billType} • Bill No: {bill.billNo}</p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <DollarSign size={40} />
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bill Information */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Bill Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Bill ID</p>
              <p className="text-sm font-medium text-gray-900">{bill.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Contract ID</p>
              <p className="text-sm font-medium text-gray-900">{bill.contractId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Bill Number</p>
              <p className="text-sm font-medium text-gray-900">{bill.billNo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Bill Type</p>
              <p className="text-sm font-medium text-gray-900">{bill.billType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Submission Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(bill.submissionDate).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Approved By</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <User size={14} className="mr-1" />
                {bill.approvedBy}
              </p>
            </div>
            {bill.paymentDate !== '-' && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Payment Date</p>
                <p className="text-sm font-medium text-green-600 flex items-center">
                  <CheckCircle size={14} className="mr-1" />
                  {new Date(bill.paymentDate).toLocaleDateString('en-IN')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bill Status Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill Status</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Submitted</p>
                <p className="text-xs text-gray-500">{new Date(bill.submissionDate).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 ${bill.status !== 'Pending' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                bill.status !== 'Pending' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <CheckCircle size={16} className={bill.status !== 'Pending' ? 'text-blue-600' : 'text-gray-400'} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Approved</p>
                <p className="text-xs text-gray-500">
                  {bill.status !== 'Pending' ? 'Completed' : 'Pending'}
                </p>
              </div>
            </div>
            <div className={`flex items-center space-x-3 ${bill.status === 'Paid' ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                bill.status === 'Paid' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <CheckCircle size={16} className={bill.status === 'Paid' ? 'text-green-600' : 'text-gray-400'} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Paid</p>
                <p className="text-xs text-gray-500">
                  {bill.status === 'Paid' ? new Date(bill.paymentDate).toLocaleDateString('en-IN') : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign size={20} className="mr-2" />
          Financial Summary
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 mb-2">Bill Amount</p>
            <p className="text-2xl font-bold text-blue-900">{formatCurrency(bill.billAmount)}</p>
            <p className="text-xs text-blue-600 mt-1">Gross Amount</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700 mb-2">Work Done</p>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(bill.workDone)}</p>
            <p className="text-xs text-green-600 mt-1">Completed Work Value</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-xs text-red-700 mb-2">Deductions</p>
            <p className="text-2xl font-bold text-red-900">{formatCurrency(bill.deductions)}</p>
            <p className="text-xs text-red-600 mt-1">{((bill.deductions / bill.billAmount) * 100).toFixed(2)}% of Bill Amount</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-xs text-orange-700 mb-2">Net Payable</p>
            <p className="text-2xl font-bold text-orange-900">{formatCurrency(bill.netPayable)}</p>
            <p className="text-xs text-orange-600 mt-1">Final Payment</p>
          </div>
        </div>
      </div>

      {/* Deduction Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Deduction Breakdown</h3>
        <div className="space-y-3">
          {deductionItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.description}</p>
                <p className="text-xs text-gray-500">{item.percentage}% of Bill Amount</p>
              </div>
              <p className="text-lg font-bold text-red-600">{formatCurrency(item.amount)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-red-100 rounded-lg border-2 border-red-200">
            <p className="text-base font-bold text-red-900">Total Deductions</p>
            <p className="text-xl font-bold text-red-900">{formatCurrency(bill.deductions)}</p>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Briefcase size={20} className="mr-2" />
          Project Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Name</p>
            <p className="text-sm font-medium text-gray-900">{bill.projectDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900">{bill.projectDetails.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Head</p>
            <p className="text-sm font-medium text-gray-900">{bill.projectDetails.projectHead}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimated Cost</p>
            <p className="text-sm font-medium text-gray-900">{formatCurrency(bill.projectDetails.estimatedCost)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Duration</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(bill.projectDetails.startDate).toLocaleDateString('en-IN')} - {new Date(bill.projectDetails.endDate).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Contractor Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Contractor Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Contractor Name</p>
            <p className="text-sm font-medium text-gray-900">{bill.contractorDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
            <p className="text-sm font-medium text-gray-900">{bill.contractorDetails.contact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900">{bill.contractorDetails.email}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{bill.contractorDetails.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Registration No</p>
            <p className="text-sm font-medium text-gray-900">{bill.contractorDetails.registrationNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{bill.contractorDetails.panNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">GST Number</p>
            <p className="text-sm font-medium text-gray-900">{bill.contractorDetails.gstNo}</p>
          </div>
        </div>
      </div>

      {/* Work Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Work Description
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {bill.workDescription}
        </p>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
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
            <p className="text-xs text-gray-600 mb-2">Bill ID</p>
            <p className="text-lg font-bold text-gray-900">{bill.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Bill Amount</p>
            <p className="text-lg font-bold text-blue-600">{formatCurrency(bill.billAmount)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Deductions</p>
            <p className="text-lg font-bold text-red-600">{formatCurrency(bill.deductions)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Net Payable</p>
            <p className="text-lg font-bold text-orange-600">{formatCurrency(bill.netPayable)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className="text-lg font-bold text-green-600">{bill.status}</p>
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
          <span>Download Bill Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <FileText size={20} />
          <span>Print Bill</span>
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