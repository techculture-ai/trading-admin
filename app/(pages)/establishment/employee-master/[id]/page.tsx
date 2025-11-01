'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, User, Mail, Phone, Calendar, MapPin, Building, Briefcase, DollarSign, CheckCircle, Clock, FileText, Share2, Printer, Edit, Award, TrendingUp } from 'lucide-react'

interface EmployeeDetails {
  id: string
  employeeCode: string
  name: string
  designation: string
  department: string
  joiningDate: string
  mobile: string
  email: string
  status: 'Active' | 'On Leave' | 'Retired' | 'Inactive'
  dateOfBirth: string
  gender: string
  address: string
  emergencyContact: string
  qualification: string
  salary: string
  employeeInfo: {
    bloodGroup: string
    maritalStatus: string
    nationality: string
    reportingManager: string
    employeeType: string
    probationPeriod: string
  }
  bankDetails: {
    bankName: string
    accountNumber: string
    ifscCode: string
    panNumber: string
    aadharNumber: string
  }
  leaveBalance: {
    casualLeave: number
    sickLeave: number
    earnedLeave: number
    totalLeave: number
    leaveTaken: number
  }
  attendance: {
    totalPresent: number
    totalAbsent: number
    totalLate: number
    attendancePercentage: string
  }
  performanceMetrics: {
    projectsCompleted: number
    tasksCompleted: number
    efficiency: string
    rating: string
  }
  employmentHistory: {
    date: string
    action: string
    details: string
    department: string
  }[]
  documents: {
    name: string
    type: string
    uploadedDate: string
    size: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function EmployeeDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [employee] = useState<EmployeeDetails>({
    id: 'EMP-001',
    employeeCode: 'EMP/2024/001',
    name: 'Rajesh Kumar Sharma',
    designation: 'Executive Engineer',
    department: 'Engineering',
    joiningDate: '2020-01-15',
    mobile: '+91 9876543210',
    email: 'rajesh.sharma@example.com',
    status: 'Active',
    dateOfBirth: '1985-05-20',
    gender: 'Male',
    address: 'House No. 123, Gomti Nagar Extension, Lucknow, Uttar Pradesh - 226010',
    emergencyContact: '+91 9876543211',
    qualification: 'B.Tech in Civil Engineering, IIT Kanpur',
    salary: '₹85,000',
    employeeInfo: {
      bloodGroup: 'B+',
      maritalStatus: 'Married',
      nationality: 'Indian',
      reportingManager: 'Er. Suresh Chandra (Chief Engineer)',
      employeeType: 'Permanent',
      probationPeriod: 'Completed (6 months)',
    },
    bankDetails: {
      bankName: 'State Bank of India',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      panNumber: 'ABCDE1234F',
      aadharNumber: '1234 5678 9012',
    },
    leaveBalance: {
      casualLeave: 8,
      sickLeave: 10,
      earnedLeave: 12,
      totalLeave: 30,
      leaveTaken: 8,
    },
    attendance: {
      totalPresent: 220,
      totalAbsent: 5,
      totalLate: 12,
      attendancePercentage: '88%',
    },
    performanceMetrics: {
      projectsCompleted: 15,
      tasksCompleted: 145,
      efficiency: '92%',
      rating: '4.5/5',
    },
    employmentHistory: [
      {
        date: '2024-01-15',
        action: 'Salary Increment',
        details: 'Annual increment of 10%',
        department: 'Engineering',
      },
      {
        date: '2023-01-15',
        action: 'Promotion',
        details: 'Promoted to Executive Engineer',
        department: 'Engineering',
      },
      {
        date: '2022-06-01',
        action: 'Department Transfer',
        details: 'Transferred to Engineering Department',
        department: 'Engineering',
      },
      {
        date: '2020-07-15',
        action: 'Confirmation',
        details: 'Probation period completed successfully',
        department: 'Technical',
      },
      {
        date: '2020-01-15',
        action: 'Joining',
        details: 'Joined as Senior Engineer',
        department: 'Technical',
      },
    ],
    documents: [
      {
        name: 'Aadhar Card.pdf',
        type: 'Identity Proof',
        uploadedDate: '2020-01-15',
        size: '245 KB',
      },
      {
        name: 'PAN Card.pdf',
        type: 'Identity Proof',
        uploadedDate: '2020-01-15',
        size: '180 KB',
      },
      {
        name: 'Degree Certificate.pdf',
        type: 'Educational',
        uploadedDate: '2020-01-15',
        size: '1.2 MB',
      },
      {
        name: 'Experience Letter.pdf',
        type: 'Experience',
        uploadedDate: '2020-01-15',
        size: '320 KB',
      },
      {
        name: 'Passport Photo.jpg',
        type: 'Photo',
        uploadedDate: '2020-01-15',
        size: '85 KB',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-30 10:00:00',
      action: 'Profile Updated',
      performedBy: 'HR Manager',
      details: 'Contact information updated',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-15 09:00:00',
      action: 'Salary Revised',
      performedBy: 'Finance Manager',
      details: 'Annual increment processed',
    },
    {
      id: 'AL-003',
      timestamp: '2023-12-20 14:30:00',
      action: 'Performance Review',
      performedBy: 'Chief Engineer',
      details: 'Annual performance review completed - Rating: 4.5/5',
    },
    {
      id: 'AL-004',
      timestamp: '2023-01-15 11:00:00',
      action: 'Promotion',
      performedBy: 'Management',
      details: 'Promoted to Executive Engineer',
    },
  ])

  const handleExport = () => {
    const content = `
Employee Profile Report
========================

Employee ID: ${employee.id}
Employee Code: ${employee.employeeCode}
Status: ${employee.status}

Personal Information
====================
Name: ${employee.name}
Date of Birth: ${new Date(employee.dateOfBirth).toLocaleDateString('en-IN')}
Gender: ${employee.gender}
Blood Group: ${employee.employeeInfo.bloodGroup}
Marital Status: ${employee.employeeInfo.maritalStatus}
Nationality: ${employee.employeeInfo.nationality}

Contact Information
===================
Mobile: ${employee.mobile}
Email: ${employee.email}
Address: ${employee.address}
Emergency Contact: ${employee.emergencyContact}

Employment Details
==================
Designation: ${employee.designation}
Department: ${employee.department}
Employee Type: ${employee.employeeInfo.employeeType}
Joining Date: ${new Date(employee.joiningDate).toLocaleDateString('en-IN')}
Reporting Manager: ${employee.employeeInfo.reportingManager}
Qualification: ${employee.qualification}
Salary: ${employee.salary}

Bank Details
============
Bank Name: ${employee.bankDetails.bankName}
Account Number: ${employee.bankDetails.accountNumber}
IFSC Code: ${employee.bankDetails.ifscCode}
PAN Number: ${employee.bankDetails.panNumber}
Aadhar Number: ${employee.bankDetails.aadharNumber}

Leave Balance
=============
Casual Leave: ${employee.leaveBalance.casualLeave} days
Sick Leave: ${employee.leaveBalance.sickLeave} days
Earned Leave: ${employee.leaveBalance.earnedLeave} days
Total Available: ${employee.leaveBalance.totalLeave} days
Leave Taken: ${employee.leaveBalance.leaveTaken} days

Attendance Summary
==================
Total Present: ${employee.attendance.totalPresent} days
Total Absent: ${employee.attendance.totalAbsent} days
Total Late: ${employee.attendance.totalLate} days
Attendance Percentage: ${employee.attendance.attendancePercentage}

Performance Metrics
===================
Projects Completed: ${employee.performanceMetrics.projectsCompleted}
Tasks Completed: ${employee.performanceMetrics.tasksCompleted}
Efficiency: ${employee.performanceMetrics.efficiency}
Rating: ${employee.performanceMetrics.rating}

Employment History
==================
${employee.employmentHistory.map(h => `${h.date} - ${h.action}\n   ${h.details}\n   Department: ${h.department}`).join('\n\n')}

Documents
=========
${employee.documents.map(d => `${d.name} (${d.type})\n   Uploaded: ${d.uploadedDate} | Size: ${d.size}`).join('\n\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `employee_${employee.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'On Leave':
        return 'bg-orange-100 text-orange-700'
      case 'Retired':
        return 'bg-gray-100 text-gray-700'
      case 'Inactive':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle size={40} className="text-green-600" />
      case 'On Leave':
        return <Clock size={40} className="text-orange-600" />
      case 'Retired':
        return <User size={40} className="text-gray-600" />
      case 'Inactive':
        return <User size={40} className="text-red-600" />
      default:
        return <User size={40} className="text-gray-600" />
    }
  }

  const experienceYears = Math.floor((new Date().getTime() - new Date(employee.joiningDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
  const age = Math.floor((new Date().getTime() - new Date(employee.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365))

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
            <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {employee.employeeCode} • {employee.designation} • {employee.department}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(employee.status)}`}>
            {employee.status}
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
        employee.status === 'Active' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        employee.status === 'On Leave' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        employee.status === 'Retired' ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              employee.status === 'Active' ? 'text-green-100' :
              employee.status === 'On Leave' ? 'text-orange-100' :
              employee.status === 'Retired' ? 'text-gray-100' :
              'text-red-100'
            }`}>
              Employee Status
            </p>
            <h2 className="text-4xl font-bold">{employee.status}</h2>
            <p className={`text-sm mt-2 ${
              employee.status === 'Active' ? 'text-green-100' :
              employee.status === 'On Leave' ? 'text-orange-100' :
              employee.status === 'Retired' ? 'text-gray-100' :
              'text-red-100'
            }`}>
              Experience: {experienceYears} years • Salary: {employee.salary}/month
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(employee.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Experience</p>
              <h3 className="text-2xl font-bold text-gray-900">{experienceYears} Years</h3>
              <p className="text-xs text-gray-500 mt-2">Since {new Date(employee.joiningDate).getFullYear()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Attendance</p>
              <h3 className="text-2xl font-bold text-blue-600">{employee.attendance.attendancePercentage}</h3>
              <p className="text-xs text-gray-500 mt-2">This year</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Performance</p>
              <h3 className="text-2xl font-bold text-purple-600">{employee.performanceMetrics.rating}</h3>
              <p className="text-xs text-gray-500 mt-2">Rating</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Leave Balance</p>
              <h3 className="text-2xl font-bold text-orange-600">{employee.leaveBalance.totalLeave}</h3>
              <p className="text-xs text-gray-500 mt-2">Days available</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Personal Information
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Full Name</p>
            <p className="text-sm font-medium text-gray-900">{employee.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(employee.dateOfBirth).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })} ({age} years)
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Gender</p>
            <p className="text-sm font-medium text-gray-900">{employee.gender}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Blood Group</p>
            <p className="text-sm font-medium text-gray-900">{employee.employeeInfo.bloodGroup}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Marital Status</p>
            <p className="text-sm font-medium text-gray-900">{employee.employeeInfo.maritalStatus}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Nationality</p>
            <p className="text-sm font-medium text-gray-900">{employee.employeeInfo.nationality}</p>
          </div>
          <div className="col-span-3">
            <p className="text-xs text-gray-500 mb-1">Qualification</p>
            <p className="text-sm font-medium text-gray-900">{employee.qualification}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Phone size={20} className="mr-2" />
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Mobile Number</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Phone size={14} className="mr-1 text-green-600" />
              {employee.mobile}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Mail size={14} className="mr-1 text-blue-600" />
              {employee.email}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1 text-red-600" />
              {employee.address}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Emergency Contact</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Phone size={14} className="mr-1 text-orange-600" />
              {employee.emergencyContact}
            </p>
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Briefcase size={20} className="mr-2" />
          Employment Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Employee Code</p>
            <p className="text-sm font-medium text-gray-900">{employee.employeeCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Designation</p>
            <p className="text-sm font-medium text-gray-900">{employee.designation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Department</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Building size={14} className="mr-1" />
              {employee.department}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Employee Type</p>
            <p className="text-sm font-medium text-gray-900">{employee.employeeInfo.employeeType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Joining Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(employee.joiningDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Probation Period</p>
            <p className="text-sm font-medium text-gray-900">{employee.employeeInfo.probationPeriod}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Reporting Manager</p>
            <p className="text-sm font-medium text-gray-900">{employee.employeeInfo.reportingManager}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Monthly Salary</p>
            <p className="text-lg font-bold text-green-600 flex items-center">
              <DollarSign size={16} className="mr-1" />
              {employee.salary}
            </p>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign size={20} className="mr-2" />
          Bank & KYC Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Bank Name</p>
            <p className="text-sm font-medium text-gray-900">{employee.bankDetails.bankName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Account Number</p>
            <p className="text-sm font-medium text-gray-900">{employee.bankDetails.accountNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">IFSC Code</p>
            <p className="text-sm font-medium text-gray-900">{employee.bankDetails.ifscCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{employee.bankDetails.panNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Aadhar Number</p>
            <p className="text-sm font-medium text-gray-900">{employee.bankDetails.aadharNumber}</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp size={20} className="mr-2" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Projects Completed</p>
            <p className="text-3xl font-bold text-blue-900">{employee.performanceMetrics.projectsCompleted}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Tasks Completed</p>
            <p className="text-3xl font-bold text-green-900">{employee.performanceMetrics.tasksCompleted}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-700 mb-2">Efficiency</p>
            <p className="text-3xl font-bold text-purple-900">{employee.performanceMetrics.efficiency}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-700 mb-2">Performance Rating</p>
            <p className="text-3xl font-bold text-orange-900">{employee.performanceMetrics.rating}</p>
          </div>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Leave Balance</h3>
        <div className="grid grid-cols-5 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Casual Leave</p>
            <p className="text-2xl font-bold text-gray-900">{employee.leaveBalance.casualLeave}</p>
            <p className="text-xs text-gray-500 mt-1">days available</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Sick Leave</p>
            <p className="text-2xl font-bold text-gray-900">{employee.leaveBalance.sickLeave}</p>
            <p className="text-xs text-gray-500 mt-1">days available</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Earned Leave</p>
            <p className="text-2xl font-bold text-gray-900">{employee.leaveBalance.earnedLeave}</p>
            <p className="text-xs text-gray-500 mt-1">days available</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Total Available</p>
            <p className="text-2xl font-bold text-blue-900">{employee.leaveBalance.totalLeave}</p>
            <p className="text-xs text-blue-600 mt-1">days total</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-700 mb-2">Leave Taken</p>
            <p className="text-2xl font-bold text-red-900">{employee.leaveBalance.leaveTaken}</p>
            <p className="text-xs text-red-600 mt-1">days this year</p>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Attendance Summary (This Year)</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Total Present</p>
            <p className="text-3xl font-bold text-green-900">{employee.attendance.totalPresent}</p>
            <p className="text-xs text-green-600 mt-1">days</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-700 mb-2">Total Absent</p>
            <p className="text-3xl font-bold text-red-900">{employee.attendance.totalAbsent}</p>
            <p className="text-xs text-red-600 mt-1">days</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-700 mb-2">Late Arrivals</p>
            <p className="text-3xl font-bold text-orange-900">{employee.attendance.totalLate}</p>
            <p className="text-xs text-orange-600 mt-1">days</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Attendance %</p>
            <p className="text-3xl font-bold text-blue-900">{employee.attendance.attendancePercentage}</p>
            <p className="text-xs text-blue-600 mt-1">overall</p>
          </div>
        </div>
      </div>

      {/* Employment History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Employment History</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {employee.employmentHistory.map((history, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== employee.employmentHistory.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-orange-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{history.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{history.details}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <p className="text-xs text-gray-500">
                          Date: {new Date(history.date).toLocaleDateString('en-IN', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </p>
                        <p className="text-xs text-gray-500">Department: {history.department}</p>
                      </div>
                    </div>
                  </div>
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
            Documents ({employee.documents.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {employee.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.type} • {doc.size} • Uploaded: {new Date(doc.uploadedDate).toLocaleDateString('en-IN')}
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
            <p className="text-xs text-gray-600 mb-2">Employee ID</p>
            <p className="text-lg font-bold text-gray-900">{employee.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Experience</p>
            <p className="text-lg font-bold text-blue-600">{experienceYears} Years</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Attendance</p>
            <p className="text-lg font-bold text-green-600">{employee.attendance.attendancePercentage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Rating</p>
            <p className="text-lg font-bold text-purple-600">{employee.performanceMetrics.rating}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              employee.status === 'Active' ? 'text-green-600' :
              employee.status === 'On Leave' ? 'text-orange-600' :
              employee.status === 'Retired' ? 'text-gray-600' :
              'text-red-600'
            }`}>
              {employee.status}
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
          <span>Download Profile</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Profile</span>
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