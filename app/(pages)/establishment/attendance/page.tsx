'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, Calendar, UserCheck, X, Eye, Edit, Trash2, Clock } from 'lucide-react'

interface AttendanceRecord {
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
  overtime?: string
  remarks?: string
}

const initialRecords: AttendanceRecord[] = [
  {
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
    remarks: 'Regular attendance'
  },
  {
    id: 'ATT-002',
    employeeCode: 'EMP/2024/002',
    employeeName: 'Priya Verma',
    department: 'Accounts',
    designation: 'Accountant',
    date: '2025-10-25',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    workingHours: '9h 00m',
    status: 'Present',
    remarks: 'On time'
  },
  {
    id: 'ATT-003',
    employeeCode: 'EMP/2024/003',
    employeeName: 'Amit Singh',
    department: 'Engineering',
    designation: 'Junior Engineer',
    date: '2025-10-25',
    checkIn: '-',
    checkOut: '-',
    workingHours: '-',
    status: 'Leave',
    remarks: 'Sick leave approved'
  },
]

const departments = ['Engineering', 'Accounts', 'HR', 'Admin', 'Operations', 'Quality Control']
const designations = ['Site Engineer', 'Junior Engineer', 'Senior Engineer', 'Accountant', 'Manager', 'Supervisor', 'Technician']

export default function AttendanceManagementPage() {
  const router = useRouter()
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    employeeCode: '',
    employeeName: '',
    department: 'Engineering',
    designation: 'Site Engineer',
    date: new Date().toISOString().split('T')[0],
    checkIn: '',
    checkOut: '',
    status: 'Present' as AttendanceRecord['status'],
    overtime: '',
    remarks: '',
  })

  const calculateWorkingHours = () => {
    if (!formData.checkIn || !formData.checkOut) return '-'
    
    const [checkInHour, checkInMin] = formData.checkIn.split(':').map(Number)
    const [checkOutHour, checkOutMin] = formData.checkOut.split(':').map(Number)
    
    const checkInMinutes = checkInHour * 60 + checkInMin
    const checkOutMinutes = checkOutHour * 60 + checkOutMin
    const diffMinutes = checkOutMinutes - checkInMinutes
    
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    
    return `${hours}h ${minutes}m`
  }

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault()
    const workingHours = calculateWorkingHours()
    
    const newRecord: AttendanceRecord = {
      id: `ATT-${String(records.length + 1).padStart(3, '0')}`,
      ...formData,
      workingHours,
    }
    setRecords([...records, newRecord])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditRecord = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRecord) return
    
    const workingHours = calculateWorkingHours()
    
    setRecords(records.map(rec => 
      rec.id === selectedRecord.id 
        ? { ...rec, ...formData, workingHours }
        : rec
    ))
    setShowEditModal(false)
    setSelectedRecord(null)
    resetForm()
  }

  const handleDeleteRecord = (id: string) => {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      setRecords(records.filter(rec => rec.id !== id))
    }
  }

  const handleViewRecord = (record: AttendanceRecord) => {
    router.push(`/establishment/attendance/${record.id}`)
  }

  const handleEditClick = (record: AttendanceRecord) => {
    setSelectedRecord(record)
    setFormData({
      employeeCode: record.employeeCode,
      employeeName: record.employeeName,
      department: record.department,
      designation: record.designation,
      date: record.date,
      checkIn: record.checkIn !== '-' ? record.checkIn : '',
      checkOut: record.checkOut !== '-' ? record.checkOut : '',
      status: record.status,
      overtime: record.overtime || '',
      remarks: record.remarks || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      employeeCode: '',
      employeeName: '',
      department: 'Engineering',
      designation: 'Site Engineer',
      date: new Date().toISOString().split('T')[0],
      checkIn: '',
      checkOut: '',
      status: 'Present',
      overtime: '',
      remarks: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Attendance ID', 'Employee Code', 'Name', 'Department', 'Date', 'Check In', 'Check Out', 'Working Hours', 'Status'].join(','),
      ...filteredRecords.map(r => 
        [r.id, r.employeeCode, r.employeeName, r.department, r.date, r.checkIn, r.checkOut, r.workingHours, r.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attendance-report.csv'
    a.click()
  }

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalStrength = 245
  const presentCount = records.filter(r => r.status === 'Present').length
  const leaveCount = records.filter(r => r.status === 'Leave').length
  const absentCount = records.filter(r => r.status === 'Absent').length
  const lateCount = records.filter(r => r.status === 'Late').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance & Leave Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track employee attendance and manage leave applications</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus size={20} />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Total Strength</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalStrength}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCheck size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600 mb-2">Present</p>
          <h3 className="text-3xl font-bold text-green-600">{presentCount}</h3>
          <p className="text-xs text-gray-500 mt-2">{((presentCount / totalStrength) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-orange-500">
          <p className="text-sm text-gray-600 mb-2">On Leave</p>
          <h3 className="text-3xl font-bold text-orange-600">{leaveCount}</h3>
          <p className="text-xs text-gray-500 mt-2">{((leaveCount / totalStrength) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Absent</p>
          <h3 className="text-3xl font-bold text-red-600">{absentCount}</h3>
          <p className="text-xs text-gray-500 mt-2">{((absentCount / totalStrength) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600 mb-2">Late Arrivals</p>
          <h3 className="text-3xl font-bold text-blue-600">{lateCount}</h3>
          <p className="text-xs text-gray-500 mt-2">{((lateCount / totalStrength) * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Attendance Overview - October 2025</h2>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Today</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
          <div className="text-center">
            <Calendar size={48} className="text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Calendar View</p>
            <p className="text-sm text-gray-500 mt-1">Monthly attendance calendar</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search attendance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                {showFilterDropdown && (
                  <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <button
                        onClick={() => { setFilterStatus('all'); setShowFilterDropdown(false) }}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        All Status
                      </button>
                      {['Present', 'Leave', 'Absent', 'Half Day', 'Late'].map(status => (
                        <button
                          key={status}
                          onClick={() => { setFilterStatus(status); setShowFilterDropdown(false) }}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Working Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.employeeCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(record.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.workingHours}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      record.status === 'Present' ? 'bg-green-100 text-green-700' :
                      record.status === 'Leave' ? 'bg-orange-100 text-orange-700' :
                      record.status === 'Late' ? 'bg-blue-100 text-blue-700' :
                      record.status === 'Half Day' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewRecord(record)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(record)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteRecord(record.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Attendance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Mark Attendance</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddRecord} className="p-6 space-y-6">
              {/* Employee Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.employeeCode}
                      onChange={(e) => setFormData({...formData, employeeCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="EMP/2024/001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.employeeName}
                      onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Rajesh Kumar Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {designations.map(des => (
                        <option key={des} value={des}>{des}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Attendance Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Present">Present</option>
                      <option value="Leave">Leave</option>
                      <option value="Absent">Absent</option>
                      <option value="Half Day">Half Day</option>
                      <option value="Late">Late</option>
                    </select>
                  </div>
                  {formData.status !== 'Leave' && formData.status !== 'Absent' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check In Time
                        </label>
                        <input
                          type="time"
                          value={formData.checkIn}
                          onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check Out Time
                        </label>
                        <input
                          type="time"
                          value={formData.checkOut}
                          onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Overtime (if any)
                        </label>
                        <input
                          type="text"
                          value={formData.overtime}
                          onChange={(e) => setFormData({...formData, overtime: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="1h 30m"
                        />
                      </div>
                    </>
                  )}
                  <div className={formData.status !== 'Leave' && formData.status !== 'Absent' ? '' : 'col-span-2'}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter any remarks..."
                    />
                  </div>
                </div>
              </div>

              {formData.checkIn && formData.checkOut && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Calculated Working Hours:</span>
                    <span className="text-2xl font-bold text-green-600">{calculateWorkingHours()}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Mark Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar to Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Edit Attendance</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedRecord(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditRecord} className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.employeeCode}
                      onChange={(e) => setFormData({...formData, employeeCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.employeeName}
                      onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {designations.map(des => (
                        <option key={des} value={des}>{des}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Present">Present</option>
                      <option value="Leave">Leave</option>
                      <option value="Absent">Absent</option>
                      <option value="Half Day">Half Day</option>
                      <option value="Late">Late</option>
                    </select>
                  </div>
                  {formData.status !== 'Leave' && formData.status !== 'Absent' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check In Time
                        </label>
                        <input
                          type="time"
                          value={formData.checkIn}
                          onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check Out Time
                        </label>
                        <input
                          type="time"
                          value={formData.checkOut}
                          onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Overtime (if any)
                        </label>
                        <input
                          type="text"
                          value={formData.overtime}
                          onChange={(e) => setFormData({...formData, overtime: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="1h 30m"
                        />
                      </div>
                    </>
                  )}
                  <div className={formData.status !== 'Leave' && formData.status !== 'Absent' ? '' : 'col-span-2'}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {formData.checkIn && formData.checkOut && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Calculated Working Hours:</span>
                    <span className="text-2xl font-bold text-green-600">{calculateWorkingHours()}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedRecord(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}