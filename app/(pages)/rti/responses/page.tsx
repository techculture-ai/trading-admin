'use client'

import { Search, Plus, Filter, Download, Eye, Send } from 'lucide-react'

const responses = [
  {
    id: 'RESP-2024-233',
    applicationNo: 'RTI/UP/2024/233',
    applicantName: 'Priya Verma',
    subject: 'Details of tenders floated in 2024',
    department: 'Engineering',
    responseDate: '15 Nov 2024',
    respondedBy: 'PIO - Amit Singh',
    responseType: 'Complete Information',
    documentsProvided: 5,
    dispatchDate: '16 Nov 2024',
    dispatchMode: 'Email & Post',
    status: 'Dispatched',
  },
  {
    id: 'RESP-2024-231',
    applicationNo: 'RTI/UP/2024/231',
    applicantName: 'Suresh Kumar',
    subject: 'Property allotment information',
    department: 'Property Disposal',
    responseDate: '10 Nov 2024',
    respondedBy: 'PIO - Priya Sharma',
    responseType: 'Complete Information',
    documentsProvided: 8,
    dispatchDate: '11 Nov 2024',
    dispatchMode: 'Email',
    status: 'Dispatched',
  },
  {
    id: 'RESP-2024-230',
    applicationNo: 'RTI/UP/2024/230',
    applicantName: 'Neha Gupta',
    subject: 'Employee recruitment details',
    department: 'Establishment',
    responseDate: '08 Nov 2024',
    respondedBy: 'PIO - Amit Singh',
    responseType: 'Partial Information',
    documentsProvided: 3,
    dispatchDate: '09 Nov 2024',
    dispatchMode: 'Post',
    status: 'Dispatched',
  },
]

export default function RTIResponsesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RTI Responses</h1>
          <p className="text-sm text-gray-600 mt-1">Manage responses and information disclosure</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Draft Response</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Responses</p>
          <h3 className="text-3xl font-bold text-gray-900">189</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Complete Information</p>
          <h3 className="text-3xl font-bold text-green-600">156</h3>
          <p className="text-xs text-gray-500 mt-2">82.5%</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Partial Information</p>
          <h3 className="text-3xl font-bold text-orange-600">28</h3>
          <p className="text-xs text-gray-500 mt-2">14.8%</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Response Time</p>
          <h3 className="text-3xl font-bold text-blue-600">18 days</h3>
          <p className="text-xs text-green-600 mt-2">Within SLA</p>
        </div>
      </div>

      {/* Response Type Distribution */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Type Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Complete Information</p>
            <p className="text-2xl font-bold text-green-600">156</p>
            <p className="text-xs text-gray-500 mt-1">82.5%</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Partial Information</p>
            <p className="text-2xl font-bold text-orange-600">28</p>
            <p className="text-xs text-gray-500 mt-1">14.8%</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Information Denied</p>
            <p className="text-2xl font-bold text-red-600">3</p>
            <p className="text-xs text-gray-500 mt-1">1.6%</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Transferred</p>
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-xs text-gray-500 mt-1">1.1%</p>
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
                  placeholder="Search responses..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Response ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Response Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responded By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Response Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dispatch Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responses.map((response) => (
                <tr key={response.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{response.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{response.applicationNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{response.applicantName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{response.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{response.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{response.responseDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{response.respondedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      response.responseType === 'Complete Information' ? 'bg-green-100 text-green-700' :
                      response.responseType === 'Partial Information' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {response.responseType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye size={14} className="text-gray-400" />
                      <span>{response.documentsProvided} files</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{response.dispatchDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {response.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">View Response</button>
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