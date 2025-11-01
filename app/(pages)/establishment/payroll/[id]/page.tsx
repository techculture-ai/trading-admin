'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, DollarSign, Calendar, User, Building, CheckCircle, Clock, FileText, Share2, Printer, Edit, TrendingUp, AlertCircle } from 'lucide-react'

interface PayrollDetails {
  id: string
  employeeCode: string
  employeeName: string
  designation: string
  department: string
  basicSalary: string
  allowances: string
  deductions: string
  netSalary: string
  month: string
  year: string
  status: 'Processed' | 'Pending' | 'Paid' | 'On Hold'
  paymentDate: string
  payrollPeriod: {
    startDate: string
    endDate: string
    workingDays: number
    presentDays: number
    leaveDays: number
    holidays: number
  }
  earningsBreakdown: {
    basicSalary: string
    hra: string
    da: string
    ta: string
    specialAllowance: string
    overtimePay: string
    bonus: string
  }
  deductionsBreakdown: {
    pf: string
    esi: string
    professionalTax: string
    incomeTax: string
    insurance: string
    loans: string
    other: string
  }
  bankDetails: {
    bankName: string
    accountNumber: string
    ifscCode: string
    paymentMode: string
  }
  employeeDetails: {
    panNumber: string
    uanNumber: string
    esiNumber: string
    joiningDate: string
    employmentType: string
  }
  ytdSummary: {
    grossEarnings: string
    totalDeductions: string
    netPay: string
    taxPaid: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function PayrollDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [payroll] = useState<PayrollDetails>({
    id: 'PAY-001',
    employeeCode: 'EMP/2024/001',
    employeeName: 'Rajesh Kumar Sharma',
    designation: 'Executive Engineer',
    department: 'Engineering',
    basicSalary: '₹85,000',
    allowances: '₹25,000',
    deductions: '₹8,500',
    netSalary: '₹1,01,500',
    month: 'October',
    year: '2025',
    status: 'Processed',
    paymentDate: '2025-10-30',
    payrollPeriod: {
      startDate: '2025-10-01',
      endDate: '2025-10-31',
      workingDays: 26,
      presentDays: 26,
      leaveDays: 0,
      holidays: 5,
    },
    earningsBreakdown: {
      basicSalary: '₹85,000',
      hra: '₹15,000',
      da: '₹5,000',
      ta: '₹5,000',
      specialAllowance: '₹0',
      overtimePay: '₹0',
      bonus: '₹0',
    },
    deductionsBreakdown: {
      pf: '₹4,250',
      esi: '₹0',
      professionalTax: '₹200',
      incomeTax: '₹3,000',
      insurance: '₹1,050',
      loans: '₹0',
      other: '₹0',
    },
    bankDetails: {
      bankName: 'State Bank of India',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      paymentMode: 'Bank Transfer',
    },
    employeeDetails: {
      panNumber: 'ABCDE1234F',
      uanNumber: 'UAN123456789',
      esiNumber: 'ESI987654321',
      joiningDate: '2020-01-15',
      employmentType: 'Permanent',
    },
    ytdSummary: {
      grossEarnings: '₹11,00,000',
      totalDeductions: '₹85,000',
      netPay: '₹10,15,000',
      taxPaid: '₹30,000',
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2025-10-25 09:00:00',
      action: 'Payroll Generated',
      performedBy: 'Payroll Manager',
      details: 'Monthly payroll generated for October 2025',
    },
    {
      id: 'AL-002',
      timestamp: '2025-10-26 14:30:00',
      action: 'Payroll Verified',
      performedBy: 'Finance Manager',
      details: 'Payroll calculations verified and approved',
    },
    {
      id: 'AL-003',
      timestamp: '2025-10-28 10:00:00',
      action: 'Payroll Processed',
      performedBy: 'HR Manager',
      details: 'Payroll marked as processed',
    },
    {
      id: 'AL-004',
      timestamp: '2025-10-30 11:00:00',
      action: 'Payment Initiated',
      performedBy: 'Accounts Department',
      details: 'Salary payment initiated to employee bank account',
    },
  ])

  const handleExport = () => {
    const content = `
PAYROLL SLIP
============

Payroll ID: ${payroll.id}
Month: ${payroll.month} ${payroll.year}
Status: ${payroll.status}

EMPLOYEE INFORMATION
====================
Employee Code: ${payroll.employeeCode}
Name: ${payroll.employeeName}
Designation: ${payroll.designation}
Department: ${payroll.department}
PAN Number: ${payroll.employeeDetails.panNumber}
UAN Number: ${payroll.employeeDetails.uanNumber}
Joining Date: ${new Date(payroll.employeeDetails.joiningDate).toLocaleDateString('en-IN')}
Employment Type: ${payroll.employeeDetails.employmentType}

PAYROLL PERIOD
==============
Period: ${new Date(payroll.payrollPeriod.startDate).toLocaleDateString('en-IN')} to ${new Date(payroll.payrollPeriod.endDate).toLocaleDateString('en-IN')}
Working Days: ${payroll.payrollPeriod.workingDays}
Present Days: ${payroll.payrollPeriod.presentDays}
Leave Days: ${payroll.payrollPeriod.leaveDays}
Holidays: ${payroll.payrollPeriod.holidays}

EARNINGS
========
Basic Salary:         ${payroll.earningsBreakdown.basicSalary}
HRA:                  ${payroll.earningsBreakdown.hra}
DA:                   ${payroll.earningsBreakdown.da}
TA:                   ${payroll.earningsBreakdown.ta}
Special Allowance:    ${payroll.earningsBreakdown.specialAllowance}
Overtime Pay:         ${payroll.earningsBreakdown.overtimePay}
Bonus:                ${payroll.earningsBreakdown.bonus}
-------------------------------------------
Total Earnings:       ${payroll.basicSalary} + ${payroll.allowances}

DEDUCTIONS
==========
PF:                   ${payroll.deductionsBreakdown.pf}
ESI:                  ${payroll.deductionsBreakdown.esi}
Professional Tax:     ${payroll.deductionsBreakdown.professionalTax}
Income Tax:           ${payroll.deductionsBreakdown.incomeTax}
Insurance:            ${payroll.deductionsBreakdown.insurance}
Loans:                ${payroll.deductionsBreakdown.loans}
Other Deductions:     ${payroll.deductionsBreakdown.other}
-------------------------------------------
Total Deductions:     ${payroll.deductions}

NET PAY
=======
Gross Salary:         ${payroll.basicSalary} + ${payroll.allowances}
Total Deductions:     ${payroll.deductions}
-------------------------------------------
NET SALARY:           ${payroll.netSalary}

BANK DETAILS
============
Bank Name:            ${payroll.bankDetails.bankName}
Account Number:       ${payroll.bankDetails.accountNumber}
IFSC Code:            ${payroll.bankDetails.ifscCode}
Payment Mode:         ${payroll.bankDetails.paymentMode}
Payment Date:         ${new Date(payroll.paymentDate).toLocaleDateString('en-IN')}

YEAR TO DATE SUMMARY
====================
Gross Earnings:       ${payroll.ytdSummary.grossEarnings}
Total Deductions:     ${payroll.ytdSummary.totalDeductions}
Net Pay:              ${payroll.ytdSummary.netPay}
Tax Paid:             ${payroll.ytdSummary.taxPaid}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}

-------------------------------------------
This is a computer-generated payslip and does not require a signature.
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `payslip_${payroll.id}_${payroll.month}_${payroll.year}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processed':
        return 'bg-green-100 text-green-700'
      case 'Paid':
        return 'bg-blue-100 text-blue-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      case 'On Hold':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processed':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Paid':
        return <CheckCircle size={40} className="text-blue-600" />
      case 'Pending':
        return <Clock size={40} className="text-orange-600" />
      case 'On Hold':
        return <AlertCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const totalEarnings = parseFloat(payroll.basicSalary.replace(/[^0-9]/g, '')) + parseFloat(payroll.allowances.replace(/[^0-9]/g, ''))
  const attendancePercentage = ((payroll.payrollPeriod.presentDays / payroll.payrollPeriod.workingDays) * 100).toFixed(1)

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
            <h1 className="text-2xl font-bold text-gray-900">Payroll Slip - {payroll.id}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {payroll.employeeName} • {payroll.month} {payroll.year}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(payroll.status)}`}>
            {payroll.status}
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
        payroll.status === 'Processed' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        payroll.status === 'Paid' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        payroll.status === 'Pending' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              payroll.status === 'Processed' ? 'text-green-100' :
              payroll.status === 'Paid' ? 'text-blue-100' :
              payroll.status === 'Pending' ? 'text-orange-100' :
              'text-red-100'
            }`}>
              Net Salary - {payroll.month} {payroll.year}
            </p>
            <h2 className="text-4xl font-bold">{payroll.netSalary}</h2>
            <p className={`text-sm mt-2 ${
              payroll.status === 'Processed' ? 'text-green-100' :
              payroll.status === 'Paid' ? 'text-blue-100' :
              payroll.status === 'Pending' ? 'text-orange-100' :
              'text-red-100'
            }`}>
              Payment Date: {new Date(payroll.paymentDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(payroll.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Basic Salary</p>
              <h3 className="text-2xl font-bold text-gray-900">{payroll.basicSalary}</h3>
              <p className="text-xs text-gray-500 mt-2">Monthly basic</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Allowances</p>
              <h3 className="text-2xl font-bold text-green-600">{payroll.allowances}</h3>
              <p className="text-xs text-gray-500 mt-2">All allowances</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Deductions</p>
              <h3 className="text-2xl font-bold text-red-600">{payroll.deductions}</h3>
              <p className="text-xs text-gray-500 mt-2">All deductions</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Attendance</p>
              <h3 className="text-2xl font-bold text-purple-600">{attendancePercentage}%</h3>
              <p className="text-xs text-gray-500 mt-2">{payroll.payrollPeriod.presentDays}/{payroll.payrollPeriod.workingDays} days</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Employee Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Employee Information
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Employee Code</p>
            <p className="text-sm font-medium text-gray-900">{payroll.employeeCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Employee Name</p>
            <p className="text-sm font-medium text-gray-900">{payroll.employeeName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Designation</p>
            <p className="text-sm font-medium text-gray-900">{payroll.designation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Department</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Building size={14} className="mr-1" />
              {payroll.department}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{payroll.employeeDetails.panNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">UAN Number</p>
            <p className="text-sm font-medium text-gray-900">{payroll.employeeDetails.uanNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Joining Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(payroll.employeeDetails.joiningDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Employment Type</p>
            <p className="text-sm font-medium text-gray-900">{payroll.employeeDetails.employmentType}</p>
          </div>
        </div>
      </div>

      {/* Payroll Period */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Calendar size={20} className="mr-2" />
          Payroll Period - {payroll.month} {payroll.year}
        </h3>
        <div className="grid grid-cols-5 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Period Start</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(payroll.payrollPeriod.startDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Period End</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(payroll.payrollPeriod.endDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Working Days</p>
            <p className="text-lg font-bold text-gray-900">{payroll.payrollPeriod.workingDays}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Present Days</p>
            <p className="text-lg font-bold text-green-600">{payroll.payrollPeriod.presentDays}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Leave Days</p>
            <p className="text-lg font-bold text-orange-600">{payroll.payrollPeriod.leaveDays}</p>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp size={20} className="mr-2 text-green-600" />
          Earnings Breakdown
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Basic Salary', value: payroll.earningsBreakdown.basicSalary },
            { label: 'House Rent Allowance (HRA)', value: payroll.earningsBreakdown.hra },
            { label: 'Dearness Allowance (DA)', value: payroll.earningsBreakdown.da },
            { label: 'Transport Allowance (TA)', value: payroll.earningsBreakdown.ta },
            { label: 'Special Allowance', value: payroll.earningsBreakdown.specialAllowance },
            { label: 'Overtime Pay', value: payroll.earningsBreakdown.overtimePay },
            { label: 'Bonus', value: payroll.earningsBreakdown.bonus },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">{item.label}</span>
              <span className="text-sm font-bold text-green-600">{item.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg border-2 border-green-300 mt-4">
            <span className="text-base font-bold text-green-900">Total Earnings</span>
            <span className="text-2xl font-bold text-green-900">₹{totalEarnings.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Deductions Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <AlertCircle size={20} className="mr-2 text-red-600" />
          Deductions Breakdown
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Provident Fund (PF)', value: payroll.deductionsBreakdown.pf },
            { label: 'Employee State Insurance (ESI)', value: payroll.deductionsBreakdown.esi },
            { label: 'Professional Tax', value: payroll.deductionsBreakdown.professionalTax },
            { label: 'Income Tax (TDS)', value: payroll.deductionsBreakdown.incomeTax },
            { label: 'Insurance Premium', value: payroll.deductionsBreakdown.insurance },
            { label: 'Loan Deduction', value: payroll.deductionsBreakdown.loans },
            { label: 'Other Deductions', value: payroll.deductionsBreakdown.other },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">{item.label}</span>
              <span className="text-sm font-bold text-red-600">{item.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-100 to-red-200 rounded-lg border-2 border-red-300 mt-4">
            <span className="text-base font-bold text-red-900">Total Deductions</span>
            <span className="text-2xl font-bold text-red-900">{payroll.deductions}</span>
          </div>
        </div>
      </div>

      {/* Net Salary Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300 p-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-6">Net Salary Calculation</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-blue-900">Gross Earnings</span>
            <span className="text-xl font-bold text-blue-900">₹{totalEarnings.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-blue-900">Total Deductions</span>
            <span className="text-xl font-bold text-blue-900">- {payroll.deductions}</span>
          </div>
          <div className="border-t-2 border-blue-300 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-blue-900">NET SALARY</span>
              <span className="text-3xl font-bold text-blue-900">{payroll.netSalary}</span>
            </div>
            <p className="text-sm text-blue-700 mt-2 text-right">
              (Rupees {new Intl.NumberFormat('en-IN').format(parseFloat(payroll.netSalary.replace(/[^0-9]/g, '')))} only)
            </p>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign size={20} className="mr-2" />
          Bank & Payment Details
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Bank Name</p>
            <p className="text-sm font-medium text-gray-900">{payroll.bankDetails.bankName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Account Number</p>
            <p className="text-sm font-medium text-gray-900">{payroll.bankDetails.accountNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">IFSC Code</p>
            <p className="text-sm font-medium text-gray-900">{payroll.bankDetails.ifscCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Mode</p>
            <p className="text-sm font-medium text-gray-900">{payroll.bankDetails.paymentMode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(payroll.paymentDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Year to Date Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Year to Date Summary ({payroll.year})</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Gross Earnings (YTD)</p>
            <p className="text-2xl font-bold text-green-900">{payroll.ytdSummary.grossEarnings}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-700 mb-2">Total Deductions (YTD)</p>
            <p className="text-2xl font-bold text-red-900">{payroll.ytdSummary.totalDeductions}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Net Pay (YTD)</p>
            <p className="text-2xl font-bold text-blue-900">{payroll.ytdSummary.netPay}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-700 mb-2">Tax Paid (YTD)</p>
            <p className="text-2xl font-bold text-purple-900">{payroll.ytdSummary.taxPaid}</p>
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
            <p className="text-xs text-gray-600 mb-2">Payroll ID</p>
            <p className="text-lg font-bold text-gray-900">{payroll.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Period</p>
            <p className="text-sm font-bold text-blue-600">{payroll.month} {payroll.year}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Gross Salary</p>
            <p className="text-sm font-bold text-green-600">₹{totalEarnings.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Net Salary</p>
            <p className="text-lg font-bold text-purple-600">{payroll.netSalary}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              payroll.status === 'Processed' ? 'text-green-600' :
              payroll.status === 'Paid' ? 'text-blue-600' :
              payroll.status === 'Pending' ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {payroll.status}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This is a computer-generated payslip and does not require a physical signature. 
          All calculations are subject to statutory compliance and company policies. For any queries, please contact the HR Department.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button 
          onClick={handleExport}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Download Payslip</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Payroll</span>
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
          <span>Back to List</span>
        </button>
      </div>
    </div>
  )
}