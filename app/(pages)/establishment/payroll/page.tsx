'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, DollarSign, X, Eye, Edit, Trash2, CheckCircle, Calendar } from 'lucide-react'

interface PayrollRecord {
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
  paymentDate?: string
  hra?: string
  da?: string
  ta?: string
  pf?: string
  tax?: string
  insurance?: string
  workingDays?: number
  presentDays?: number
}

const initialRecords: PayrollRecord[] = [
  {
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
    hra: '₹15,000',
    da: '₹5,000',
    ta: '₹5,000',
    pf: '₹4,250',
    tax: '₹3,000',
    insurance: '₹1,250',
    workingDays: 26,
    presentDays: 26
  },
  {
    id: 'PAY-002',
    employeeCode: 'EMP/2024/002',
    employeeName: 'Priya Verma',
    designation: 'Assistant Accountant',
    department: 'Accounts',
    basicSalary: '₹45,000',
    allowances: '₹12,000',
    deductions: '₹4,500',
    netSalary: '₹52,500',
    month: 'October',
    year: '2025',
    status: 'Processed',
    paymentDate: '2025-10-30',
    hra: '₹8,000',
    da: '₹2,000',
    ta: '₹2,000',
    pf: '₹2,250',
    tax: '₹1,500',
    insurance: '₹750',
    workingDays: 26,
    presentDays: 26
  },
  {
    id: 'PAY-003',
    employeeCode: 'EMP/2024/003',
    employeeName: 'Amit Singh',
    designation: 'Junior Engineer',
    department: 'Engineering',
    basicSalary: '₹35,000',
    allowances: '₹10,000',
    deductions: '₹3,500',
    netSalary: '₹41,500',
    month: 'October',
    year: '2025',
    status: 'Pending',
    hra: '₹6,000',
    da: '₹2,000',
    ta: '₹2,000',
    pf: '₹1,750',
    tax: '₹1,000',
    insurance: '₹750',
    workingDays: 26,
    presentDays: 24
  },
]

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const years = ['2025', '2024', '2023']

export default function PayrollManagementPage() {
  const router = useRouter()
  const [records, setRecords] = useState<PayrollRecord[]>(initialRecords)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    employeeCode: '',
    employeeName: '',
    designation: '',
    department: '',
    basicSalary: '',
    month: 'October',
    year: '2025',
    hra: '',
    da: '',
    ta: '',
    pf: '',
    tax: '',
    insurance: '',
    workingDays: '26',
    presentDays: '26',
    paymentDate: '',
  })

  const calculateAllowances = () => {
    const hra = parseFloat(formData.hra.replace(/[^0-9]/g, '')) || 0
    const da = parseFloat(formData.da.replace(/[^0-9]/g, '')) || 0
    const ta = parseFloat(formData.ta.replace(/[^0-9]/g, '')) || 0
    return hra + da + ta
  }

  const calculateDeductions = () => {
    const pf = parseFloat(formData.pf.replace(/[^0-9]/g, '')) || 0
    const tax = parseFloat(formData.tax.replace(/[^0-9]/g, '')) || 0
    const insurance = parseFloat(formData.insurance.replace(/[^0-9]/g, '')) || 0
    return pf + tax + insurance
  }

  const calculateNetSalary = () => {
    const basic = parseFloat(formData.basicSalary.replace(/[^0-9]/g, '')) || 0
    const allowances = calculateAllowances()
    const deductions = calculateDeductions()
    return basic + allowances - deductions
  }

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault()
    const allowances = calculateAllowances()
    const deductions = calculateDeductions()
    const netSalary = calculateNetSalary()
    
    const newRecord: PayrollRecord = {
      id: `PAY-${String(records.length + 1).padStart(3, '0')}`,
      ...formData,
      workingDays: parseInt(formData.workingDays) || 0,
      presentDays: parseInt(formData.presentDays) || 0,
      allowances: `₹${allowances.toLocaleString('en-IN')}`,
      deductions: `₹${deductions.toLocaleString('en-IN')}`,
      netSalary: `₹${netSalary.toLocaleString('en-IN')}`,
      status: 'Pending',
    }
    setRecords([...records, newRecord])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditRecord = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRecord) return
    
    const allowances = calculateAllowances()
    const deductions = calculateDeductions()
    const netSalary = calculateNetSalary()
    
    setRecords(records.map(rec => 
      rec.id === selectedRecord.id 
        ? { 
            ...rec, 
            ...formData,
            workingDays: parseInt(formData.workingDays) || 0,
            presentDays: parseInt(formData.presentDays) || 0,
            allowances: `₹${allowances.toLocaleString('en-IN')}`,
            deductions: `₹${deductions.toLocaleString('en-IN')}`,
            netSalary: `₹${netSalary.toLocaleString('en-IN')}`,
          }
        : rec
    ))
    setShowEditModal(false)
    setSelectedRecord(null)
    resetForm()
  }

  const handleDeleteRecord = (id: string) => {
    if (confirm('Are you sure you want to delete this payroll record?')) {
      setRecords(records.filter(rec => rec.id !== id))
    }
  }

  const handleViewRecord = (record: PayrollRecord) => {
    router.push(`/establishment/payroll/${record.id}`)
  }

  const handleEditClick = (record: PayrollRecord) => {
    setSelectedRecord(record)
    setFormData({
      employeeCode: record.employeeCode,
      employeeName: record.employeeName,
      designation: record.designation,
      department: record.department,
      basicSalary: record.basicSalary,
      month: record.month,
      year: record.year,
      hra: record.hra || '',
      da: record.da || '',
      ta: record.ta || '',
      pf: record.pf || '',
      tax: record.tax || '',
      insurance: record.insurance || '',
      workingDays: record.workingDays?.toString() || '26',
      presentDays: record.presentDays?.toString() || '26',
      paymentDate: record.paymentDate || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      employeeCode: '',
      employeeName: '',
      designation: '',
      department: '',
      basicSalary: '',
      month: 'October',
      year: '2025',
      hra: '',
      da: '',
      ta: '',
      pf: '',
      tax: '',
      insurance: '',
      workingDays: '26',
      presentDays: '26',
      paymentDate: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Payroll ID', 'Employee Code', 'Name', 'Designation', 'Basic Salary', 'Allowances', 'Deductions', 'Net Salary', 'Month', 'Status'].join(','),
      ...filteredRecords.map(r => 
        [r.id, r.employeeCode, r.employeeName, r.designation, r.basicSalary, r.allowances, r.deductions, r.netSalary, `${r.month} ${r.year}`, r.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'payroll-report.csv'
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

  const totalPayroll = records.reduce((sum, r) => 
    sum + (parseFloat(r.netSalary.replace(/[^0-9]/g, '')) || 0), 0
  )
  const totalBasic = records.reduce((sum, r) => 
    sum + (parseFloat(r.basicSalary.replace(/[^0-9]/g, '')) || 0), 0
  )
  const totalAllowances = records.reduce((sum, r) => 
    sum + (parseFloat(r.allowances.replace(/[^0-9]/g, '')) || 0), 0
  )
  const totalDeductions = records.reduce((sum, r) => 
    sum + (parseFloat(r.deductions.replace(/[^0-9]/g, '')) || 0), 0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-sm text-gray-600 mt-1">Process employee salaries and manage payroll</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export Payroll</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus size={20} />
            <span>Process Payroll</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Payroll (Oct 2025)</p>
          <h3 className="text-2xl font-bold text-gray-900">₹{(totalPayroll / 10000000).toFixed(2)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">{records.length} employees</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Basic Salary</p>
          <h3 className="text-2xl font-bold text-blue-600">₹{(totalBasic / 10000000).toFixed(2)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">{((totalBasic / totalPayroll) * 100).toFixed(1)}% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Allowances</p>
          <h3 className="text-2xl font-bold text-green-600">₹{(totalAllowances / 10000000).toFixed(2)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">{((totalAllowances / totalPayroll) * 100).toFixed(1)}% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Deductions</p>
          <h3 className="text-2xl font-bold text-red-600">₹{(totalDeductions / 10000000).toFixed(2)} Cr</h3>
          <p className="text-xs text-gray-500 mt-2">{((totalDeductions / totalPayroll) * 100).toFixed(1)}% of total</p>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payroll Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Processed</p>
            <p className="text-2xl font-bold text-green-600">
              {records.filter(r => r.status === 'Processed' || r.status === 'Paid').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {((records.filter(r => r.status === 'Processed' || r.status === 'Paid').length / records.length) * 100).toFixed(1)}% completed
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-orange-600">
              {records.filter(r => r.status === 'Pending').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {((records.filter(r => r.status === 'Pending').length / records.length) * 100).toFixed(1)}% pending
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Payment Status</p>
            <p className="text-lg font-semibold text-gray-900">Scheduled</p>
            <p className="text-xs text-gray-500 mt-1">30 Oct 2025</p>
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
                  placeholder="Search payroll..."
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
                      {['Processed', 'Pending', 'Paid', 'On Hold'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payroll ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Basic Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allowances</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.basicSalary}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{record.allowances}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{record.deductions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{record.netSalary}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.month} {record.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      record.status === 'Processed' ? 'bg-green-100 text-green-700' :
                      record.status === 'Paid' ? 'bg-blue-100 text-blue-700' :
                      record.status === 'On Hold' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewRecord(record)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Slip"
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

      {/* Add Payroll Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Process Payroll</h2>
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
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Executive Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Engineering"
                    />
                  </div>
                </div>
              </div>

              {/* Period & Attendance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Period & Attendance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Month <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({...formData, month: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Working Days <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.workingDays}
                      onChange={(e) => setFormData({...formData, workingDays: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="26"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Present Days <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.presentDays}
                      onChange={(e) => setFormData({...formData, presentDays: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="26"
                    />
                  </div>
                </div>
              </div>

              {/* Salary Components */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Components</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Basic Salary <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.basicSalary}
                      onChange={(e) => setFormData({...formData, basicSalary: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹85,000"
                    />
                  </div>
                </div>
              </div>

              {/* Allowances */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Allowances</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">HRA</label>
                    <input
                      type="text"
                      value={formData.hra}
                      onChange={(e) => setFormData({...formData, hra: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹15,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DA</label>
                    <input
                      type="text"
                      value={formData.da}
                      onChange={(e) => setFormData({...formData, da: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹5,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">TA</label>
                    <input
                      type="text"
                      value={formData.ta}
                      onChange={(e) => setFormData({...formData, ta: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹5,000"
                    />
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deductions</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PF</label>
                    <input
                      type="text"
                      value={formData.pf}
                      onChange={(e) => setFormData({...formData, pf: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹4,250"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax</label>
                    <input
                      type="text"
                      value={formData.tax}
                      onChange={(e) => setFormData({...formData, tax: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹3,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                    <input
                      type="text"
                      value={formData.insurance}
                      onChange={(e) => setFormData({...formData, insurance: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹1,250"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Date */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                    <input
                      type="date"
                      value={formData.paymentDate}
                      onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Basic Salary:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.basicSalary || '₹0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Allowances:</span>
                    <span className="text-sm font-medium text-green-600">
                      ₹{calculateAllowances().toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Deductions:</span>
                    <span className="text-sm font-medium text-red-600">
                      ₹{calculateDeductions().toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-base font-semibold text-gray-900">Net Salary:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{calculateNetSalary().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

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
                  Process Payroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure */}
      {showEditModal && selectedRecord && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Edit Payroll</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedRecord(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditRecord} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
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
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Period & Attendance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({...formData, month: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                    <input
                      type="number"
                      value={formData.workingDays}
                      onChange={(e) => setFormData({...formData, workingDays: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Present Days</label>
                    <input
                      type="number"
                      value={formData.presentDays}
                      onChange={(e) => setFormData({...formData, presentDays: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Components</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Basic Salary</label>
                    <input
                      type="text"
                      value={formData.basicSalary}
                      onChange={(e) => setFormData({...formData, basicSalary: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Allowances</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">HRA</label>
                    <input
                      type="text"
                      value={formData.hra}
                      onChange={(e) => setFormData({...formData, hra: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DA</label>
                    <input
                      type="text"
                      value={formData.da}
                      onChange={(e) => setFormData({...formData, da: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">TA</label>
                    <input
                      type="text"
                      value={formData.ta}
                      onChange={(e) => setFormData({...formData, ta: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deductions</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PF</label>
                    <input
                      type="text"
                      value={formData.pf}
                      onChange={(e) => setFormData({...formData, pf: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax</label>
                    <input
                      type="text"
                      value={formData.tax}
                      onChange={(e) => setFormData({...formData, tax: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                    <input
                      type="text"
                      value={formData.insurance}
                      onChange={(e) => setFormData({...formData, insurance: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                    <input
                      type="date"
                      value={formData.paymentDate}
                      onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Basic Salary:</span>
                    <span className="text-sm font-medium text-gray-900">{formData.basicSalary || '₹0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Allowances:</span>
                    <span className="text-sm font-medium text-green-600">
                      ₹{calculateAllowances().toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Deductions:</span>
                    <span className="text-sm font-medium text-red-600">
                      ₹{calculateDeductions().toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-base font-semibold text-gray-900">Net Salary:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{calculateNetSalary().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

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
                  Update Payroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}