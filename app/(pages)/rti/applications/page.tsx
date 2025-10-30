'use client'

import { Search, Plus, Filter, Download, FileText } from 'lucide-react'

const applications = [
  {
    id: 'RTI-2024-234',
    applicationNo: 'RTI/UP/2024/234',
    applicantName: 'Rajesh Kumar Singh',
    applicantContact: '+91 9876543210',
    applicantEmail: 'rajesh.kumar@example.com',
    subject: 'Information regarding land acquisition in Gomti Nagar',
    department: 'Land Acquisition',
    receivedDate: '25 Oct 2024',
    dueDate: '24 Nov 2024',
    assignedTo: 'PIO - Priya Sharma',
    fee: '₹10',
    status: 'Pending',
    daysLeft: 28,
  },
  {
    id: 'RTI-2024-233',
    applicationNo: 'RTI/UP/2024/233',
    applicantName: 'Priya Verma',
    applicantContact: '+91 9876543211',
    applicantEmail: 'priya.verma@example.com',
    subject: 'Details of tenders floated in 2024',
    department: 'Engineering',
    receivedDate: '23 Oct 2024',
    dueDate: '22 Nov 2024',
    assignedTo: 'PIO - Amit Singh',
    fee: '₹10',
    status: 'Responded',
    daysLeft: 0,
  },
  {
    id: 'RTI-2024-232',
    applicationNo: 'RTI/UP/2024/232',
    applicantName: 'Amit Patel',
    applicantContact: '+91 9876543212',
    applicantEmail: 'amit.patel@example.com',
    subject: 'Budget allocation for FY 2024-25',
    department: 'Accounts',
    receivedDate: '20 Oct 2024',
    dueDate: '19 Nov 2024',
    assignedTo: 'PIO - Priya Sharma',
    fee: '₹10',
    status: 'Overdue',
    daysLeft: -2,
  },
]

export default function RTIApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RTI Applications</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage all RTI applications</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Register Application</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Applications</p>
          <h3 className="text-3xl font-bold text-gray-900">234</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-orange-500">
          <p className="text-sm text-gray-600 mb-2">Pending</p>
          <h3 className="text-3xl font-bold text-orange-600">45</h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600 mb-2">Responded</p>
          <h3 className="text-3xl font-bold text-green-600">189</h3>
          <p className="text-xs text-green-600 mt-2">81% completion</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Overdue</p>
          <h3 className="text-3xl font-bold text-red-600">8</h3>
          <p className="text-xs text-gray-500 mt-2">Needs attention</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600 mb-2">Appeals</p>
          <h3 className="text-3xl font-bold text-blue-600">12</h3>
          <p className="text-xs text-gray-500 mt-2">First appeal</p>
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
                  placeholder="Search applications..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Received Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Left</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicationNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.applicantContact}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{app.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.receivedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-medium ${
                      app.daysLeft < 0 ? 'text-red-600' :
                      app.daysLeft <= 7 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {app.daysLeft < 0 ? `${Math.abs(app.daysLeft)} days overdue` :
                       app.daysLeft === 0 ? 'Completed' :
                       `${app.daysLeft} days`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      app.status === 'Responded' ? 'bg-green-100 text-green-700' :
                      app.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">Process</button>
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