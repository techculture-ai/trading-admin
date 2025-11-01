'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, DollarSign, User, FileText, Building, CheckCircle, Clock, AlertTriangle, TrendingUp, Briefcase } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface ContractDetails {
  id: string
  projectId: string
  projectName: string
  contractor: string
  contractValue: string
  startDate: string
  endDate: string
  duration: string
  status: 'Active' | 'Completed' | 'Pending' | 'Terminated'
  completionPerc: string
  contractType: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  description: string
  penalties: string
  retention: string
  contractorDetails: {
    name: string
    address: string
    registrationNo: string
    panNo: string
    gstNo: string
    establishedYear: string
  }
  projectDetails: {
    location: string
    projectHead: string
    estimatedCost: string
    scope: string
  }
  paymentTerms: {
    advancePayment: string
    paymentSchedule: string
    retentionRelease: string
  }
}

interface Milestone {
  id: string
  name: string
  targetDate: string
  status: 'Completed' | 'In Progress' | 'Pending' | 'Delayed'
  completionPerc: string
}

interface Payment {
  id: string
  date: string
  billNo: string
  amount: string
  status: string
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function ContractDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  // Mock data - in real app, fetch based on params.id
  const [contract] = useState<ContractDetails>({
    id: 'CON-2024-001',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    contractor: 'ABC Builders Ltd.',
    contractValue: '₹42,00,00,000',
    startDate: '2024-02-01',
    endDate: '2025-12-31',
    duration: '23 months',
    status: 'Active',
    completionPerc: '65%',
    contractType: 'Turnkey',
    contactPerson: 'Mr. Ramesh Kumar',
    contactEmail: 'ramesh@abcbuilders.com',
    contactPhone: '+91 98765 43210',
    description: 'Complete construction of 200 residential units including all civil, electrical, plumbing, and finishing works as per approved drawings and specifications.',
    penalties: '0.5% per week of delay up to maximum 10% of contract value',
    retention: '10% of contract value to be released after 12 months defect liability period',
    contractorDetails: {
      name: 'ABC Builders Ltd.',
      address: 'Plot No. 123, Industrial Area, Gomti Nagar, Lucknow - 226010',
      registrationNo: 'REG/UP/2020/12345',
      panNo: 'ABCDE1234F',
      gstNo: '09ABCDE1234F1Z5',
      establishedYear: '2005',
    },
    projectDetails: {
      location: 'Gomti Nagar, Lucknow, Uttar Pradesh',
      projectHead: 'Er. Suresh Chandra',
      estimatedCost: '₹45,00,00,000',
      scope: 'Design, construction, and handover of 200 residential units with all amenities',
    },
    paymentTerms: {
      advancePayment: '10% on signing of agreement',
      paymentSchedule: 'Monthly running bills based on work progress',
      retentionRelease: 'After completion of defect liability period',
    }
  })

  const [milestones] = useState<Milestone[]>([
    {
      id: 'MS-001',
      name: 'Foundation & Basement',
      targetDate: '2024-05-31',
      status: 'Completed',
      completionPerc: '100%',
    },
    {
      id: 'MS-002',
      name: 'Superstructure (Ground to 3rd Floor)',
      targetDate: '2024-10-31',
      status: 'Completed',
      completionPerc: '100%',
    },
    {
      id: 'MS-003',
      name: 'Finishing Works',
      targetDate: '2025-06-30',
      status: 'In Progress',
      completionPerc: '45%',
    },
    {
      id: 'MS-004',
      name: 'External Development',
      targetDate: '2025-10-31',
      status: 'Pending',
      completionPerc: '0%',
    },
    {
      id: 'MS-005',
      name: 'Final Handover',
      targetDate: '2025-12-31',
      status: 'Pending',
      completionPerc: '0%',
    },
  ])

  const [payments] = useState<Payment[]>([
    {
      id: 'PAY-001',
      date: '2024-02-15',
      billNo: 'Advance Payment',
      amount: '₹4,20,00,000',
      status: 'Paid',
    },
    {
      id: 'PAY-002',
      date: '2024-03-25',
      billNo: 'RB-001',
      amount: '₹3,50,00,000',
      status: 'Paid',
    },
    {
      id: 'PAY-003',
      date: '2024-05-20',
      billNo: 'RB-002',
      amount: '₹4,20,00,000',
      status: 'Paid',
    },
    {
      id: 'PAY-004',
      date: '2024-07-15',
      billNo: 'RB-003',
      amount: '₹3,80,00,000',
      status: 'Paid',
    },
    {
      id: 'PAY-005',
      date: '2024-09-10',
      billNo: 'RB-004',
      amount: '₹4,10,00,000',
      status: 'Paid',
    },
  ])

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-02-01 10:00:00',
      action: 'Contract Signed',
      performedBy: 'Chief Engineer',
      details: 'Contract agreement signed between LSDA and ABC Builders Ltd.',
    },
    {
      id: 'AL-002',
      timestamp: '2024-02-01 14:30:00',
      action: 'Work Order Issued',
      performedBy: 'Project Manager',
      details: 'Work order issued to commence construction activities',
    },
    {
      id: 'AL-003',
      timestamp: '2024-02-15 11:00:00',
      action: 'Advance Payment Released',
      performedBy: 'Finance Department',
      details: 'Advance payment of ₹4,20,00,000 released',
    },
    {
      id: 'AL-004',
      timestamp: '2024-05-31 16:00:00',
      action: 'Milestone Completed',
      performedBy: 'Site Engineer',
      details: 'Foundation & Basement work completed and verified',
    },
    {
      id: 'AL-005',
      timestamp: '2024-10-31 15:30:00',
      action: 'Milestone Completed',
      performedBy: 'Site Engineer',
      details: 'Superstructure work completed and verified',
    },
  ])

  const formatCurrency = (amount: string) => {
    return amount
  }

  const handleExport = () => {
    const content = `
Contract Details Report
=======================

Contract ID: ${contract.id}
Project: ${contract.projectName}
Contractor: ${contract.contractor}
Contract Type: ${contract.contractType}
Contract Value: ${contract.contractValue}
Status: ${contract.status}
Completion: ${contract.completionPerc}

Project Details
===============
Project ID: ${contract.projectId}
Location: ${contract.projectDetails.location}
Project Head: ${contract.projectDetails.projectHead}
Estimated Cost: ${contract.projectDetails.estimatedCost}
Scope: ${contract.projectDetails.scope}

Contractor Details
==================
Name: ${contract.contractorDetails.name}
Address: ${contract.contractorDetails.address}
Registration: ${contract.contractorDetails.registrationNo}
PAN: ${contract.contractorDetails.panNo}
GST: ${contract.contractorDetails.gstNo}
Established: ${contract.contractorDetails.establishedYear}

Contact Information
===================
Contact Person: ${contract.contactPerson}
Email: ${contract.contactEmail}
Phone: ${contract.contactPhone}

Contract Timeline
=================
Start Date: ${new Date(contract.startDate).toLocaleDateString('en-IN')}
End Date: ${new Date(contract.endDate).toLocaleDateString('en-IN')}
Duration: ${contract.duration}

Payment Terms
=============
Advance Payment: ${contract.paymentTerms.advancePayment}
Payment Schedule: ${contract.paymentTerms.paymentSchedule}
Retention Release: ${contract.paymentTerms.retentionRelease}

Milestones
==========
${milestones.map(m => `${m.name} - ${m.status} (${m.completionPerc})`).join('\n')}

Payment History
===============
${payments.map(p => `${p.date} - ${p.billNo}: ${p.amount} (${p.status})`).join('\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contract_details_${contract.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Completed':
        return 'bg-blue-100 text-blue-700'
      case 'Terminated':
        return 'bg-red-100 text-red-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Delayed':
        return 'bg-red-100 text-red-700'
      case 'Pending':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const totalPaid = payments.reduce((sum, p) => {
    const amount = parseFloat(p.amount.replace(/[^0-9]/g, ''))
    return sum + amount
  }, 0)

  const contractValueNum = parseFloat(contract.contractValue.replace(/[^0-9]/g, ''))
  const paidPercentage = ((totalPaid / contractValueNum) * 100).toFixed(1)

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
            <h1 className="text-2xl font-bold text-gray-900">{contract.id} - {contract.contractor}</h1>
            <p className="text-sm text-gray-600 mt-1">{contract.projectName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(contract.status)}`}>
            {contract.status}
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

      {/* Contract Value Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm mb-2">Total Contract Value</p>
            <h2 className="text-4xl font-bold">{contract.contractValue}</h2>
            <p className="text-orange-100 text-sm mt-2">{contract.contractType} Contract • {contract.duration}</p>
          </div>
          <div className="text-right">
            <div className="w-32 h-32">
              <svg viewBox="0 0 36 36" className="transform -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray={`${parseFloat(contract.completionPerc)}, 100`}
                />
              </svg>
            </div>
            <p className="text-2xl font-bold mt-2">{contract.completionPerc}</p>
            <p className="text-orange-100 text-sm">Completed</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Paid</p>
              <h3 className="text-xl font-bold text-green-600">₹{(totalPaid / 10000000).toFixed(2)} Cr</h3>
              <p className="text-xs text-gray-500 mt-2">{paidPercentage}% of contract value</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Remaining</p>
              <h3 className="text-xl font-bold text-orange-600">
                ₹{((contractValueNum - totalPaid) / 10000000).toFixed(2)} Cr
              </h3>
              <p className="text-xs text-gray-500 mt-2">{(100 - parseFloat(paidPercentage)).toFixed(1)}% pending</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Milestones</p>
              <h3 className="text-3xl font-bold text-gray-900">
                {milestones.filter(m => m.status === 'Completed').length}/{milestones.length}
              </h3>
              <p className="text-xs text-gray-500 mt-2">Completed</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Time Elapsed</p>
              <h3 className="text-3xl font-bold text-gray-900">
                {Math.round(parseFloat(contract.completionPerc))}%
              </h3>
              <p className="text-xs text-gray-500 mt-2">On schedule</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contract Information */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Contract Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Contract ID</p>
              <p className="text-sm font-medium text-gray-900">{contract.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Project ID</p>
              <p className="text-sm font-medium text-gray-900">{contract.projectId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Contract Type</p>
              <p className="text-sm font-medium text-gray-900">{contract.contractType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Contract Value</p>
              <p className="text-sm font-medium text-gray-900">{contract.contractValue}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Start Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(contract.startDate).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">End Date</p>
              <p className="text-sm font-medium text-gray-900 flex items-center">
                <Calendar size={14} className="mr-1" />
                {new Date(contract.endDate).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Duration</p>
              <p className="text-sm font-medium text-gray-900">{contract.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Completion</p>
              <p className="text-sm font-medium text-orange-600">{contract.completionPerc}</p>
            </div>
          </div>
        </div>

        {/* Contract Progress */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Physical Progress</span>
                <span className="font-medium text-gray-900">{contract.completionPerc}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: contract.completionPerc }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Financial Progress</span>
                <span className="font-medium text-gray-900">{paidPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${paidPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Status</p>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                {contract.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Briefcase size={20} className="mr-2" />
          Project Details
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Name</p>
            <p className="text-sm font-medium text-gray-900">{contract.projectName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-gray-900">{contract.projectDetails.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project Head</p>
            <p className="text-sm font-medium text-gray-900">{contract.projectDetails.projectHead}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimated Cost</p>
            <p className="text-sm font-medium text-gray-900">{contract.projectDetails.estimatedCost}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Scope of Work</p>
            <p className="text-sm font-medium text-gray-900">{contract.projectDetails.scope}</p>
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
            <p className="text-sm font-medium text-gray-900">{contract.contractorDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Registration No</p>
            <p className="text-sm font-medium text-gray-900">{contract.contractorDetails.registrationNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Established Year</p>
            <p className="text-sm font-medium text-gray-900">{contract.contractorDetails.establishedYear}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{contract.contractorDetails.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{contract.contractorDetails.panNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">GST Number</p>
            <p className="text-sm font-medium text-gray-900">{contract.contractorDetails.gstNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Contact Person</p>
            <p className="text-sm font-medium text-gray-900">{contract.contactPerson}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-900">{contract.contactEmail}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Phone</p>
            <p className="text-sm font-medium text-gray-900">{contract.contactPhone}</p>
          </div>
        </div>
      </div>

      {/* Contract Terms */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FileText size={20} className="mr-2" />
          Contract Terms & Conditions
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Contract Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">{contract.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-xs text-yellow-700 mb-2 flex items-center">
                <AlertTriangle size={14} className="mr-1" />
                Penalty Clause
              </p>
              <p className="text-sm font-medium text-yellow-900">{contract.penalties}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-700 mb-2 flex items-center">
                <DollarSign size={14} className="mr-1" />
                Retention Money
              </p>
              <p className="text-sm font-medium text-blue-900">{contract.retention}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Terms</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Advance Payment</p>
            <p className="text-sm font-medium text-gray-900">{contract.paymentTerms.advancePayment}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Payment Schedule</p>
            <p className="text-sm font-medium text-gray-900">{contract.paymentTerms.paymentSchedule}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Retention Release</p>
            <p className="text-sm font-medium text-gray-900">{contract.paymentTerms.retentionRelease}</p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Project Milestones</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {index !== milestones.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                    milestone.status === 'Completed' ? 'bg-green-100' :
                    milestone.status === 'In Progress' ? 'bg-blue-100' :
                    milestone.status === 'Delayed' ? 'bg-red-100' :
                    'bg-gray-100'
                  }`}>
                    <CheckCircle size={16} className={
                      milestone.status === 'Completed' ? 'text-green-600' :
                      milestone.status === 'In Progress' ? 'text-blue-600' :
                      milestone.status === 'Delayed' ? 'text-red-600' :
                      'text-gray-400'
                    } />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{milestone.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Target: {new Date(milestone.targetDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getMilestoneStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{milestone.completionPerc}</span>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          milestone.status === 'Completed' ? 'bg-green-500' :
                          milestone.status === 'In Progress' ? 'bg-blue-500' :
                          milestone.status === 'Delayed' ? 'bg-red-500' :
                          'bg-gray-300'
                        }`}
                        style={{ width: milestone.completionPerc }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(payment.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.billNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{payment.amount}</td>
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
            <span className="text-xl font-bold text-green-600">₹{(totalPaid / 10000000).toFixed(2)} Cr</span>
          </div>
        </div>
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
            <p className="text-xs text-gray-600 mb-2">Contract ID</p>
            <p className="text-lg font-bold text-gray-900">{contract.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Contract Value</p>
            <p className="text-lg font-bold text-orange-600">{contract.contractValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Completion</p>
            <p className="text-lg font-bold text-blue-600">{contract.completionPerc}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className="text-lg font-bold text-green-600">{contract.status}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Duration</p>
            <p className="text-lg font-bold text-gray-900">{contract.duration}</p>
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
          <span>Download Contract Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <FileText size={20} />
          <span>Print Contract</span>
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