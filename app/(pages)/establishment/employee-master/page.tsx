'use client'

import { Search, Plus, Filter, Download, Users } from 'lucide-react'

const employees = [
  {
    id: 'EMP-001',
    employeeCode: 'EMP/2024/001',
    name: 'Rajesh Kumar Sharma',
    designation: 'Executive Engineer',
    department: 'Engineering',
    joiningDate: '15 Jan 2020',
    mobile: '+91 9876543210',
    email: 'rajesh.sharma@example.com',
    status: 'Active',
  },
  {
    id: 'EMP-002',
    employeeCode: 'EMP/2024/002',
    name: 'Priya Verma',
    designation: 'Assistant Accountant',
    department: 'Accounts',
    joiningDate: '20 Mar 2021',
    mobile: '+91 9876543211',
    email: 'priya.verma@example.com',
    status: 'Active',
  },
  {
    id: 'EMP-003',
    employeeCode: 'EMP/2024/003',
    name: 'Amit Singh',
    designation: 'Junior Engineer',
    department: 'Engineering',
    joiningDate: '10 Jul 2022',
    mobile: '+91 9876543212',
    email: 'amit.singh@example.com',
    status: 'Active',
  },
]

export default function EmployeeMasterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Master</h1>
          <p className="text-sm text-gray-600 mt-1">Manage complete employee records and information</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Employees</p>
          <h3 className="text-3xl font-bold text-gray-900">245</h3>
          <p className="text-xs text-green-600 mt-2">+12 this year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active</p>
          <h3 className="text-3xl font-bold text-green-600">232</h3>
          <p className="text-xs text-gray-500 mt-2">94.7% active</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">On Leave</p>
          <h3 className="text-3xl font-bold text-orange-600">8</h3>
          <p className="text-xs text-gray-500 mt-2">Currently</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Retired This Year</p>
          <h3 className="text-3xl font-bold text-gray-600">5</h3>
          <p className="text-xs text-gray-500 mt-2">2024</p>
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
                  placeholder="Search employees..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joining Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.employeeCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.joiningDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">View Profile</button>
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