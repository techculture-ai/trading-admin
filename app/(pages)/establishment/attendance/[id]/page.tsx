'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Calendar, Clock, User, Building, CheckCircle, AlertCircle, FileText, Share2, Printer, TrendingUp, Edit } from 'lucide-react'

interface AttendanceDetails {
  id: string
  employeeCode: string
  employeeName: string
  department: string
  designation: string
  date: string
  checkIn: string
  checkOut: string
  workingHours: string
  status: 'Present' | 'Leave' | 'Absent' | 'Half Day' | 'Late'
  overtime: string
  remarks: string
  employeeInfo: {
    email: string
    phone: string
    joiningDate: string
    reportingManager: string
    shiftTiming: string
  }
  attendanceSummary: {
    totalPresent: number
    totalLeave: number
    totalAbsent: number
    totalLate: number
    attendancePercentage: string
  }
  monthlyAttendance: {
    date: string
    checkIn: string
    checkOut: string
    workingHours: string
    status: string
  }[]
  leaveBalance: {
    casualLeave: number
    sickLeave: number
    earnedLeave: number
    totalLeave: number
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function AttendanceDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [attendance] = useState<AttendanceDetails>({
    id: 'ATT-001',
    employeeCode: 'EMP/2024/001',
    employeeName: 'Rajesh Kumar Sharma',
    department: 'Engineering',
    designation: 'Site Engineer',
    date: '2025-10-25',
    checkIn: '09:15 AM',
    checkOut: '06:30 PM',
    workingHours: '9h 15m',
    status: 'Present',
    overtime: '0h 15m',
    remarks: 'Regular attendance - Completed on-site inspection of Block A foundation work',
    employeeInfo: {
      email: 'rajesh.sharma@construction.com',
      phone: '+91 98765 43210',
      joiningDate: '2024-01-15',
      reportingManager: 'Er. Suresh Chandra',
      shiftTiming: '09:00 AM - 06:00 PM',
    },
    attendanceSummary: {
      totalPresent: 22,
      totalLeave: 2,
      totalAbsent: 1,
      totalLate: 3,
      attendancePercentage: '88%',
    },
    monthlyAttendance: [
      {
        date: '2025-10-25',
        checkIn: '09:15 AM',
        checkOut: '06:30 PM',
        workingHours: '9h 15m',
        status: 'Present',
      },
      {
        date: '2025-10-24',
        checkIn: '09:00 AM',
        checkOut: '06:00 PM',
        workingHours: '9h 00m',
        status: 'Present',
      },
      {
        date: '2025-10-23',
        checkIn: '09:30 AM',
        checkOut: '06:15 PM',
        workingHours: '8h 45m',
        status: 'Late',
      },
      {
        date: '2025-10-22',
        checkIn: '09:00 AM',
        checkOut: '06:00 PM',
        workingHours: '9h 00m',
        status: 'Present',
      },
      {
        date: '2025-10-21',
        checkIn: '-',
        checkOut: '-',
        workingHours: '-',
        status: 'Leave',
      },
    ],
    leaveBalance: {
      casualLeave: 8,
      sickLeave: 10,
      earnedLeave: 12,
      totalLeave: 30,
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2025-10-25 09:15:00',
      action: 'Check In',
      performedBy: 'Rajesh Kumar Sharma',
      details: 'Employee checked in at 09:15 AM',
    },
    {
      id: 'AL-002',
      timestamp: '2025-10-25 18:30:00',
      action: 'Check Out',
      performedBy: 'Rajesh Kumar Sharma',
      details: 'Employee checked out at 06:30 PM',
    },
    {
      id: 'AL-003',
      timestamp: '2025-10-25 18:35:00',
      action: 'Attendance Verified',
      performedBy: 'HR Manager',
      details: 'Attendance record verified and approved',
    },
  ])

  const handleExport = () => {
    const content = `
Attendance Details Report
=========================

Attendance ID: ${attendance.id}
Employee Code: ${attendance.employeeCode}
Status: ${attendance.status}

Employee Information
====================
Name: ${attendance.employeeName}
Department: ${attendance.department}
Designation: ${attendance.designation}
Email: ${attendance.employeeInfo.email}
Phone: ${attendance.employeeInfo.phone}
Joining Date: ${new Date(attendance.employeeInfo.joiningDate).toLocaleDateString('en-IN')}
Reporting Manager: ${attendance.employeeInfo.reportingManager}
Shift Timing: ${attendance.employeeInfo.shiftTiming}

Attendance Details
==================
Date: ${new Date(attendance.date).toLocaleDateString('en-IN')}
Check In: ${attendance.checkIn}
Check Out: ${attendance.checkOut}
Working Hours: ${attendance.workingHours}
Overtime: ${attendance.overtime}
Status: ${attendance.status}

Monthly Summary
===============
Total Present: ${attendance.attendanceSummary.totalPresent} days
Total Leave: ${attendance.attendanceSummary.totalLeave} days
Total Absent: ${attendance.attendanceSummary.totalAbsent} days
Total Late: ${attendance.attendanceSummary.totalLate} days
Attendance Percentage: ${attendance.attendanceSummary.attendancePercentage}

Leave Balance
=============
Casual Leave: ${attendance.leaveBalance.casualLeave} days
Sick Leave: ${attendance.leaveBalance.sickLeave} days
Earned Leave: ${attendance.leaveBalance.earnedLeave} days
Total Available: ${attendance.leaveBalance.totalLeave} days

Recent Attendance
=================
${attendance.monthlyAttendance.map(a => `${a.date} - ${a.status}\n   Check In: ${a.checkIn} | Check Out: ${a.checkOut}\n   Working Hours: ${a.workingHours}`).join('\n\n')}

Remarks
=======
${attendance.remarks}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance_${attendance.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-700'
      case 'Leave':
        return 'bg-orange-100 text-orange-700'
      case 'Late':
        return 'bg-blue-100 text-blue-700'
      case 'Half Day':
        return 'bg-yellow-100 text-yellow-700'
      case 'Absent':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Leave':
        return <AlertCircle size={40} className="text-orange-600" />
      case 'Late':
        return <Clock size={40} className="text-blue-600" />
      case 'Half Day':
        return <Clock size={40} className="text-yellow-600" />
      case 'Absent':
        return <AlertCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
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
            <h1 className="text-2xl font-bold text-gray-900">Attendance Record {attendance.id}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {attendance.employeeName} • {attendance.department}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(attendance.status)}`}>
            {attendance.status}
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
        attendance.status === 'Present' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        attendance.status === 'Leave' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        attendance.status === 'Late' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        attendance.status === 'Half Day' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              attendance.status === 'Present' ? 'text-green-100' :
              attendance.status === 'Leave' ? 'text-orange-100' :
              attendance.status === 'Late' ? 'text-blue-100' :
              attendance.status === 'Half Day' ? 'text-yellow-100' :
              'text-red-100'
            }`}>
              Attendance Status
            </p>
            <h2 className="text-4xl font-bold">{attendance.status}</h2>
            <p className={`text-sm mt-2 ${
              attendance.status === 'Present' ? 'text-green-100' :
              attendance.status === 'Leave' ? 'text-orange-100' :
              attendance.status === 'Late' ? 'text-blue-100' :
              attendance.status === 'Half Day' ? 'text-yellow-100' :
              'text-red-100'
            }`}>
              Date: {new Date(attendance.date).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })} • Working Hours: {attendance.workingHours}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(attendance.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Check In Time</p>
              <h3 className="text-2xl font-bold text-gray-900">{attendance.checkIn}</h3>
              <p className="text-xs text-gray-500 mt-2">Shift: {attendance.employeeInfo.shiftTiming.split(' - ')[0]}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Check Out Time</p>
              <h3 className="text-2xl font-bold text-blue-600">{attendance.checkOut}</h3>
              <p className="text-xs text-gray-500 mt-2">Shift: {attendance.employeeInfo.shiftTiming.split(' - ')[1]}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Working Hours</p>
              <h3 className="text-2xl font-bold text-purple-600">{attendance.workingHours}</h3>
              <p className="text-xs text-gray-500 mt-2">Today's total</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Overtime</p>
              <h3 className="text-2xl font-bold text-orange-600">{attendance.overtime}</h3>
              <p className="text-xs text-gray-500 mt-2">Extra hours</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
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
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Employee Code</p>
            <p className="text-sm font-medium text-gray-900">{attendance.employeeCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Employee Name</p>
            <p className="text-sm font-medium text-gray-900">{attendance.employeeName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Department</p>
            <p className="text-sm font-medium text-gray-900">{attendance.department}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Designation</p>
            <p className="text-sm font-medium text-gray-900">{attendance.designation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-900">{attendance.employeeInfo.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Phone</p>
            <p className="text-sm font-medium text-gray-900">{attendance.employeeInfo.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Joining Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(attendance.employeeInfo.joiningDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Reporting Manager</p>
            <p className="text-sm font-medium text-gray-900">{attendance.employeeInfo.reportingManager}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Shift Timing</p>
            <p className="text-sm font-medium text-gray-900">{attendance.employeeInfo.shiftTiming}</p>
          </div>
        </div>
      </div>

      {/* Attendance Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Calendar size={20} className="mr-2" />
          Attendance Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Attendance ID</p>
            <p className="text-sm font-medium text-gray-900">{attendance.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(attendance.date).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(attendance.status)}`}>
              {attendance.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Check In</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Clock size={14} className="mr-1 text-green-600" />
              {attendance.checkIn}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Check Out</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Clock size={14} className="mr-1 text-blue-600" />
              {attendance.checkOut}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Working Hours</p>
            <p className="text-lg font-bold text-purple-600">{attendance.workingHours}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Overtime</p>
            <p className="text-lg font-bold text-orange-600">{attendance.overtime}</p>
          </div>
        </div>
      </div>

      {/* Monthly Attendance Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp size={20} className="mr-2" />
          Monthly Attendance Summary
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Total Present</p>
            <p className="text-3xl font-bold text-green-900">{attendance.attendanceSummary.totalPresent}</p>
            <p className="text-xs text-green-600 mt-1">days</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-700 mb-2">Total Leave</p>
            <p className="text-3xl font-bold text-orange-900">{attendance.attendanceSummary.totalLeave}</p>
            <p className="text-xs text-orange-600 mt-1">days</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-700 mb-2">Total Absent</p>
            <p className="text-3xl font-bold text-red-900">{attendance.attendanceSummary.totalAbsent}</p>
            <p className="text-xs text-red-600 mt-1">days</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Attendance %</p>
            <p className="text-3xl font-bold text-blue-900">{attendance.attendanceSummary.attendancePercentage}</p>
            <p className="text-xs text-blue-600 mt-1">this month</p>
          </div>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Leave Balance</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Casual Leave</p>
            <p className="text-2xl font-bold text-gray-900">{attendance.leaveBalance.casualLeave}</p>
            <p className="text-xs text-gray-500 mt-1">days available</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Sick Leave</p>
            <p className="text-2xl font-bold text-gray-900">{attendance.leaveBalance.sickLeave}</p>
            <p className="text-xs text-gray-500 mt-1">days available</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Earned Leave</p>
            <p className="text-2xl font-bold text-gray-900">{attendance.leaveBalance.earnedLeave}</p>
            <p className="text-xs text-gray-500 mt-1">days available</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Total Available</p>
            <p className="text-2xl font-bold text-blue-900">{attendance.leaveBalance.totalLeave}</p>
            <p className="text-xs text-blue-600 mt-1">days total</p>
          </div>
        </div>
      </div>

      {/* Recent Attendance */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Attendance (Last 5 Days)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Working Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance.monthlyAttendance.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.workingHours}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Remarks & Notes
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {attendance.remarks}
        </p>
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
            <p className="text-xs text-gray-600 mb-2">Attendance ID</p>
            <p className="text-lg font-bold text-gray-900">{attendance.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Employee</p>
            <p className="text-sm font-bold text-blue-600">{attendance.employeeCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Working Hours</p>
            <p className="text-lg font-bold text-purple-600">{attendance.workingHours}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Attendance %</p>
            <p className="text-lg font-bold text-green-600">{attendance.attendanceSummary.attendancePercentage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              attendance.status === 'Present' ? 'text-green-600' :
              attendance.status === 'Leave' ? 'text-orange-600' :
              attendance.status === 'Late' ? 'text-blue-600' :
              attendance.status === 'Half Day' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {attendance.status}
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
          <span>Edit Attendance</span>
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