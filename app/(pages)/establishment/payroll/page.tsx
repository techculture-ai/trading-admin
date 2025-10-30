'use client'

import { Search, Plus, Filter, Download, DollarSign } from 'lucide-react'

const payrollRecords = [
  {
    id: 'PAY-001',
    employeeCode: 'EMP/2024/001',
    employeeName: 'Rajesh Kumar Sharma',
    designation: 'Executive Engineer',
    basicSalary: '₹85,000',
    allowances: '₹25,000',
    deductions: '₹8,500',
    netSalary: '₹1,01,500',
    month: 'October 2025',
    status: 'Processed',
  },
  {
    id: 'PAY-002',
    employeeCode: 'EMP/2024/002',
    employeeName: 'Priya Verma',
    designation: 'Assistant Accountant',
    basicSalary: '₹45,000',
    allowances: '₹12,000',
    deductions: '₹4,500',
    netSalary: '₹52,500',
    month: 'October 2025',
    status: 'Processed',
  },
  {
    id: 'PAY-003',
    employeeCode: 'EMP/2024/003',
    employeeName: 'Amit Singh',
    designation: 'Junior Engineer',
    basicSalary: '₹35,000',
    allowances: '₹10,000',
    deductions: '₹3,500',
    netSalary: '₹41,500',
    month: 'October 2025',
    status: 'Pending',
  },
]

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-sm text-gray-600 mt-1">Process employee salaries and manage payroll</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export Payroll</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Process Payroll</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Payroll (Oct 2025)</p>
          <h3 className="text-2xl font-bold text-gray-900">₹1.2 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">245 employees</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Basic Salary</p>
          <h3 className="text-2xl font-bold text-blue-600">₹0.85 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">70.8% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Allowances</p>
          <h3 className="text-2xl font-bold text-green-600">₹0.28 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">23.3% of total</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Deductions</p>
          <h3 className="text-2xl font-bold text-red-600">₹0.07 Cr</h3>
          <p className="text-xs text-gray-500 mt-2">5.8% of total</p>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payroll Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Processed</p>
            <p className="text-2xl font-bold text-green-600">232</p>
            <p className="text-xs text-gray-500 mt-1">94.7% completed</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-orange-600">13</p>
            <p className="text-xs text-gray-500 mt-1">5.3% pending</p>
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
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                <Filter size={16} />
                <span>Filter</span>
              </button>
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
              {payrollRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.employeeCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.basicSalary}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{record.allowances}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{record.deductions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{record.netSalary}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      record.status === 'Processed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">View Slip</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}