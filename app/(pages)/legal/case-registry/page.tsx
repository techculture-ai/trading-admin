'use client'

import { Search, Plus, Filter, Download } from 'lucide-react'

const cases = [
  {
    id: 'CASE-2024-001',
    caseNo: 'CIV/2024/045',
    caseType: 'Civil',
    title: 'ULB vs ABC Contractors Ltd.',
    court: 'District Court, Lucknow',
    filingDate: '15 Jan 2024',
    nextHearing: '28 Oct 2024',
    counsel: 'Adv. Rajesh Kumar',
    status: 'Active',
    stage: 'Evidence',
  },
  {
    id: 'CASE-2024-002',
    caseNo: 'LAND/2024/023',
    caseType: 'Land Dispute',
    title: 'Land Acquisition - Plot No. 456',
    court: 'High Court, Lucknow',
    filingDate: '20 Feb 2024',
    nextHearing: '30 Oct 2024',
    counsel: 'Adv. Priya Sharma',
    status: 'Active',
    stage: 'Arguments',
  },
  {
    id: 'CASE-2024-003',
    caseNo: 'ARB/2024/012',
    caseType: 'Arbitration',
    title: 'Contract Dispute - XYZ Developers',
    court: 'Arbitration Tribunal',
    filingDate: '10 Mar 2024',
    nextHearing: '05 Nov 2024',
    counsel: 'Adv. Amit Singh',
    status: 'Active',
    stage: 'Final Hearing',
  },
]

export default function CaseRegistryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Registry</h1>
          <p className="text-sm text-gray-600 mt-1">Manage all legal cases and litigation records</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Add Case</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Cases</p>
          <h3 className="text-3xl font-bold text-gray-900">156</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Cases</p>
          <h3 className="text-3xl font-bold text-orange-600">45</h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Cases Won</p>
          <h3 className="text-3xl font-bold text-green-600">89</h3>
          <p className="text-xs text-green-600 mt-2">57% success rate</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Cases Lost</p>
          <h3 className="text-3xl font-bold text-red-600">22</h3>
          <p className="text-xs text-gray-500 mt-2">14% loss rate</p>
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
                  placeholder="Search cases..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Court</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Filing Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Hearing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counsel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{caseItem.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{caseItem.caseNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.caseType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{caseItem.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.court}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.filingDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{caseItem.nextHearing}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.counsel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.stage}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {caseItem.status}
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