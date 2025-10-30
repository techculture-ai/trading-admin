'use client'

import { Search, Filter, Download, Calendar, Clock } from 'lucide-react'

const hearings = [
  {
    id: 'HEAR-001',
    caseNo: 'CIV/2024/045',
    caseTitle: 'ULB vs ABC Contractors Ltd.',
    court: 'District Court, Lucknow',
    bench: 'Court No. 5',
    hearingDate: '28 Oct 2024',
    hearingTime: '10:30 AM',
    counsel: 'Adv. Rajesh Kumar',
    purpose: 'Evidence Recording',
    status: 'Scheduled',
  },
  {
    id: 'HEAR-002',
    caseNo: 'LAND/2024/023',
    caseTitle: 'Land Acquisition - Plot No. 456',
    court: 'High Court, Lucknow',
    bench: 'Hon. Justice M.K. Sharma',
    hearingDate: '30 Oct 2024',
    hearingTime: '02:00 PM',
    counsel: 'Adv. Priya Sharma',
    purpose: 'Final Arguments',
    status: 'Scheduled',
  },
  {
    id: 'HEAR-003',
    caseNo: 'ARB/2024/012',
    caseTitle: 'Contract Dispute - XYZ Developers',
    court: 'Arbitration Tribunal',
    bench: 'Arbitrator - Justice (Retd.) R.K. Singh',
    hearingDate: '05 Nov 2024',
    hearingTime: '11:00 AM',
    counsel: 'Adv. Amit Singh',
    purpose: 'Final Hearing',
    status: 'Scheduled',
  },
]

export default function HearingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hearing Calendar</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage court hearing schedules</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Download size={20} />
          <span>Export Calendar</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">This Week</p>
              <h3 className="text-3xl font-bold text-gray-900">12</h3>
              <p className="text-xs text-gray-500 mt-2">Hearings scheduled</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">This Month</p>
          <h3 className="text-3xl font-bold text-green-600">45</h3>
          <p className="text-xs text-gray-500 mt-2">Total hearings</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Upcoming (7 days)</p>
          <h3 className="text-3xl font-bold text-orange-600">8</h3>
          <p className="text-xs text-gray-500 mt-2">Need preparation</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Postponed</p>
          <h3 className="text-3xl font-bold text-red-600">5</h3>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Hearing Calendar - October 2024</h2>
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
            <p className="text-sm text-gray-500 mt-1">Monthly hearing schedule</p>
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
                  placeholder="Search hearings..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hearing ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Court</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bench</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hearing Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counsel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hearings.map((hearing) => (
                <tr key={hearing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hearing.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hearing.caseNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hearing.caseTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{hearing.court}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{hearing.bench}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{hearing.hearingDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} className="text-gray-400" />
                      <span>{hearing.hearingTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{hearing.counsel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{hearing.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {hearing.status}
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