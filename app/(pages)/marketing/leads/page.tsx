'use client'

import { Search, Plus, Filter, Download, Phone, Mail } from 'lucide-react'

const leads = [
  {
    id: 'LEAD-2024-001',
    leadNo: 'LD/2024/001',
    name: 'Rajesh Kumar Singh',
    contact: '+91 9876543210',
    email: 'rajesh.kumar@example.com',
    interest: '3BHK - Gomti Nagar Housing',
    source: 'Website',
    assignedTo: 'Sales Officer - Priya Sharma',
    visitDate: '28 Oct 2024',
    status: 'Hot',
    lastContact: '2 hours ago',
  },
  {
    id: 'LEAD-2024-002',
    leadNo: 'LD/2024/002',
    name: 'Priya Verma',
    contact: '+91 9876543211',
    email: 'priya.verma@example.com',
    interest: '2BHK - Hazratganj Apartments',
    source: 'Walk-in',
    assignedTo: 'Sales Officer - Amit Singh',
    visitDate: '30 Oct 2024',
    status: 'Warm',
    lastContact: '1 day ago',
  },
  {
    id: 'LEAD-2024-003',
    leadNo: 'LD/2024/003',
    name: 'Amit Patel',
    contact: '+91 9876543212',
    email: 'amit.patel@example.com',
    interest: 'Plot - Aliganj',
    source: 'Referral',
    assignedTo: 'Sales Officer - Priya Sharma',
    visitDate: '-',
    status: 'Cold',
    lastContact: '5 days ago',
  },
]

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage customer leads and follow-ups</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Leads</p>
          <h3 className="text-3xl font-bold text-gray-900">456</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Hot Leads</p>
          <h3 className="text-3xl font-bold text-red-600">89</h3>
          <p className="text-xs text-gray-500 mt-2">High priority</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-orange-500">
          <p className="text-sm text-gray-600 mb-2">Warm Leads</p>
          <h3 className="text-3xl font-bold text-orange-600">156</h3>
          <p className="text-xs text-gray-500 mt-2">Medium priority</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600 mb-2">Cold Leads</p>
          <h3 className="text-3xl font-bold text-blue-600">123</h3>
          <p className="text-xs text-gray-500 mt-2">Low priority</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600 mb-2">Converted</p>
          <h3 className="text-3xl font-bold text-green-600">88</h3>
          <p className="text-xs text-green-600 mt-2">19% conversion</p>
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
                  placeholder="Search leads..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visit Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.leadNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Phone size={12} className="text-gray-400" />
                      <span>{lead.contact}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Mail size={12} className="text-gray-400" />
                      <span>{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.interest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.visitDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      lead.status === 'Hot' ? 'bg-red-100 text-red-700' :
                      lead.status === 'Warm' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-600 hover:text-orange-700">Follow Up</button>
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