'use client'

import { Search, Plus, Filter, Download } from 'lucide-react'

const issues = [
  {
    id: 'ISS-ENG-001',
    issueNo: 'ISS/ENG/2024/001',
    date: '25 Oct 2025',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    materialName: 'Cement OPC 53 Grade',
    quantityIssued: '500 Bags',
    issuedTo: 'Site Engineer - Rajesh Sharma',
    purpose: 'Foundation Work - Block A',
    status: 'Issued',
  },
  {
    id: 'ISS-ENG-002',
    issueNo: 'ISS/ENG/2024/002',
    date: '24 Oct 2025',
    projectId: 'PROJ-2024-002',
    projectName: 'Hazratganj Commercial Complex',
    materialName: 'Steel TMT Bars 12mm',
    quantityIssued: '5 Tons',
    issuedTo: 'Site Engineer - Priya Verma',
    purpose: 'Column Construction',
    status: 'Issued',
  },
  {
    id: 'ISS-ENG-003',
    issueNo: 'ISS/ENG/2024/003',
    date: '26 Oct 2025',
    projectId: 'PROJ-2024-001',
    projectName: 'Gomti Nagar Housing Scheme',
    materialName: 'Aggregate 20mm',
    quantityIssued: '100 Cu.M.',
    issuedTo: 'Site Engineer - Rajesh Sharma',
    purpose: 'Concrete Work',
    status: 'Pending Return',
  },
]

export default function IssueTrackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Material Issue Tracking</h1>
          <p className="text-sm text-gray-600 mt-1">Track material issuances to construction sites</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Issue Material</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Issues (Oct 2025)</p>
          <h3 className="text-3xl font-bold text-gray-900">234</h3>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Value Issued</p>
          <h3 className="text-2xl font-bold text-blue-600">₹45 L</h3>
          <p className="text-xs text-gray-500 mt-2">October 2025</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Issues</p>
          <h3 className="text-3xl font-bold text-green-600">189</h3>
          <p className="text-xs text-gray-500 mt-2">Issued to sites</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Pending Returns</p>
          <h3 className="text-3xl font-bold text-orange-600">8</h3>
          <p className="text-xs text-gray-500 mt-2">Needs reconciliation</p>
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
                  placeholder="Search issues..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity Issued</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issued To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.issueNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.materialName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.quantityIssued}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.issuedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      issue.status === 'Issued' ? 'bg-green-100 text-green-700' :
                      issue.status === 'Pending Return' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">View Details</button>
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