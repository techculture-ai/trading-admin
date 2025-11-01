'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, Download, Calendar, Clock, Plus, X, Eye, Edit, Trash2, Bell } from 'lucide-react'

interface HearingRecord {
  id: string
  caseNo: string
  caseTitle: string
  court: string
  bench: string
  hearingDate: string
  hearingTime: string
  counsel: string
  purpose: string
  status: 'Scheduled' | 'Postponed' | 'Completed' | 'Cancelled' | 'Adjourned'
  caseId?: string
  courtRoomNo?: string
  judgeName?: string
  previousDate?: string
  nextDate?: string
  remarks?: string
  documents?: string
  attendees?: string
}

const initialHearings: HearingRecord[] = [
  {
    id: 'HEAR-001',
    caseNo: 'CIV/2024/045',
    caseTitle: 'ULB vs ABC Contractors Ltd.',
    court: 'District Court, Lucknow',
    bench: 'Court No. 5',
    hearingDate: '2024-10-28',
    hearingTime: '10:30',
    counsel: 'Adv. Rajesh Kumar',
    purpose: 'Evidence Recording',
    status: 'Scheduled',
    caseId: 'CASE-2024-001',
    courtRoomNo: 'Court Room No. 5',
    judgeName: 'Hon. Justice P.K. Sharma',
    previousDate: '2024-09-25',
    remarks: 'Cross-examination of plaintiff witness',
    documents: 'Witness affidavit, supporting documents',
    attendees: 'Adv. Rajesh Kumar, Adv. Suresh Verma'
  },
  {
    id: 'HEAR-002',
    caseNo: 'LAND/2024/023',
    caseTitle: 'Land Acquisition - Plot No. 456',
    court: 'High Court, Lucknow',
    bench: 'Hon. Justice M.K. Sharma',
    hearingDate: '2024-10-30',
    hearingTime: '14:00',
    counsel: 'Adv. Priya Sharma',
    purpose: 'Final Arguments',
    status: 'Scheduled',
    caseId: 'CASE-2024-002',
    courtRoomNo: 'Court Room No. 12',
    judgeName: 'Hon. Justice M.K. Sharma',
    previousDate: '2024-09-20',
    remarks: 'Final arguments to be concluded',
    documents: 'Written submissions, case law compilations',
    attendees: 'Adv. Priya Sharma, Adv. Vikram Singh'
  },
  {
    id: 'HEAR-003',
    caseNo: 'ARB/2024/012',
    caseTitle: 'Contract Dispute - XYZ Developers',
    court: 'Arbitration Tribunal',
    bench: 'Arbitrator - Justice (Retd.) R.K. Singh',
    hearingDate: '2024-11-05',
    hearingTime: '11:00',
    counsel: 'Adv. Amit Singh',
    purpose: 'Final Hearing',
    status: 'Scheduled',
    caseId: 'CASE-2024-003',
    courtRoomNo: 'Arbitration Room 2',
    judgeName: 'Arbitrator: Justice (Retd.) R.K. Singh',
    previousDate: '2024-10-10',
    remarks: 'Final arbitration hearing',
    documents: 'Contract documents, expert reports',
    attendees: 'Adv. Amit Singh, Adv. Neha Kapoor'
  },
]

const purposes = ['Evidence Recording', 'Final Arguments', 'Interim Application', 'Document Verification', 'Witness Examination', 'Cross-Examination', 'Final Hearing', 'Status Hearing', 'Other']
const courts = ['District Court, Lucknow', 'High Court, Lucknow', 'Supreme Court', 'Arbitration Tribunal', 'Consumer Forum', 'Labour Court', 'Other']

export default function HearingCalendarPage() {
  const router = useRouter()
  const [hearings, setHearings] = useState<HearingRecord[]>(initialHearings)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedHearing, setSelectedHearing] = useState<HearingRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    caseNo: '',
    caseTitle: '',
    court: 'District Court, Lucknow',
    bench: '',
    hearingDate: '',
    hearingTime: '',
    counsel: '',
    purpose: 'Evidence Recording',
    caseId: '',
    courtRoomNo: '',
    judgeName: '',
    previousDate: '',
    nextDate: '',
    remarks: '',
    documents: '',
    attendees: '',
  })

  const handleAddHearing = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newHearing: HearingRecord = {
      id: `HEAR-${String(hearings.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Scheduled',
    }
    setHearings([...hearings, newHearing])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditHearing = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedHearing) return
    
    setHearings(hearings.map(h => 
      h.id === selectedHearing.id 
        ? { ...h, ...formData }
        : h
    ))
    setShowEditModal(false)
    setSelectedHearing(null)
    resetForm()
  }

  const handleDeleteHearing = (id: string) => {
    if (confirm('Are you sure you want to delete this hearing?')) {
      setHearings(hearings.filter(h => h.id !== id))
    }
  }

  const handleViewHearing = (hearing: HearingRecord) => {
    router.push(`/legal/hearings/${hearing.id}`)
  }

  const handleEditClick = (hearing: HearingRecord) => {
    setSelectedHearing(hearing)
    setFormData({
      caseNo: hearing.caseNo,
      caseTitle: hearing.caseTitle,
      court: hearing.court,
      bench: hearing.bench,
      hearingDate: hearing.hearingDate,
      hearingTime: hearing.hearingTime,
      counsel: hearing.counsel,
      purpose: hearing.purpose,
      caseId: hearing.caseId || '',
      courtRoomNo: hearing.courtRoomNo || '',
      judgeName: hearing.judgeName || '',
      previousDate: hearing.previousDate || '',
      nextDate: hearing.nextDate || '',
      remarks: hearing.remarks || '',
      documents: hearing.documents || '',
      attendees: hearing.attendees || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      caseNo: '',
      caseTitle: '',
      court: 'District Court, Lucknow',
      bench: '',
      hearingDate: '',
      hearingTime: '',
      counsel: '',
      purpose: 'Evidence Recording',
      caseId: '',
      courtRoomNo: '',
      judgeName: '',
      previousDate: '',
      nextDate: '',
      remarks: '',
      documents: '',
      attendees: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Hearing ID', 'Case No', 'Title', 'Court', 'Date', 'Time', 'Counsel', 'Purpose', 'Status'].join(','),
      ...filteredHearings.map(h => 
        [h.id, h.caseNo, h.caseTitle, h.court, h.hearingDate, h.hearingTime, h.counsel, h.purpose, h.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hearing-calendar.csv'
    a.click()
  }

  const filteredHearings = hearings.filter(hearing => {
    const matchesSearch = hearing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hearing.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hearing.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hearing.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hearing.counsel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || hearing.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const thisWeekHearings = 12
  const thisMonthHearings = 45
  const upcomingHearings = 8
  const postponedHearings = 5

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hearing Calendar</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage court hearing schedules</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export Calendar</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus size={20} />
            <span>Add Hearing</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">This Week</p>
              <h3 className="text-3xl font-bold text-gray-900">{thisWeekHearings}</h3>
              <p className="text-xs text-gray-500 mt-2">Hearings scheduled</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">This Month</p>
          <h3 className="text-3xl font-bold text-green-600">{thisMonthHearings}</h3>
          <p className="text-xs text-gray-500 mt-2">Total hearings</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Upcoming (7 days)</p>
          <h3 className="text-3xl font-bold text-orange-600">{upcomingHearings}</h3>
          <p className="text-xs text-gray-500 mt-2">Need preparation</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Postponed</p>
          <h3 className="text-3xl font-bold text-red-600">{postponedHearings}</h3>
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
                      {['Scheduled', 'Postponed', 'Completed', 'Cancelled', 'Adjourned'].map(status => (
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
              {filteredHearings.map((hearing) => (
                <tr key={hearing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hearing.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hearing.caseNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hearing.caseTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{hearing.court}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{hearing.bench}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                    {new Date(hearing.hearingDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} className="text-gray-400" />
                      <span>{hearing.hearingTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{hearing.counsel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{hearing.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      hearing.status === 'Scheduled' ? 'bg-green-100 text-green-700' :
                      hearing.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                      hearing.status === 'Postponed' ? 'bg-orange-100 text-orange-700' :
                      hearing.status === 'Adjourned' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {hearing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewHearing(hearing)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(hearing)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteHearing(hearing.id)}
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

      {/* Add Hearing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Add New Hearing</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddHearing} className="p-6 space-y-6">
              {/* Case Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.caseNo}
                      onChange={(e) => setFormData({...formData, caseNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="CIV/2024/045"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case ID
                    </label>
                    <input
                      type="text"
                      value={formData.caseId}
                      onChange={(e) => setFormData({...formData, caseId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="CASE-2024-001"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.caseTitle}
                      onChange={(e) => setFormData({...formData, caseTitle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="ULB vs ABC Contractors Ltd."
                    />
                  </div>
                </div>
              </div>

              {/* Court Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Court Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Court <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.court}
                      onChange={(e) => setFormData({...formData, court: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {courts.map(court => (
                        <option key={court} value={court}>{court}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bench/Court Room <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.bench}
                      onChange={(e) => setFormData({...formData, bench: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Court No. 5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Court Room Number
                    </label>
                    <input
                      type="text"
                      value={formData.courtRoomNo}
                      onChange={(e) => setFormData({...formData, courtRoomNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Court Room No. 5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judge Name
                    </label>
                    <input
                      type="text"
                      value={formData.judgeName}
                      onChange={(e) => setFormData({...formData, judgeName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Hon. Justice P.K. Sharma"
                    />
                  </div>
                </div>
              </div>

              {/* Hearing Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hearing Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hearing Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.hearingDate}
                      onChange={(e) => setFormData({...formData, hearingDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hearing Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.hearingTime}
                      onChange={(e) => setFormData({...formData, hearingTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {purposes.map(purpose => (
                        <option key={purpose} value={purpose}>{purpose}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Counsel <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.counsel}
                      onChange={(e) => setFormData({...formData, counsel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Adv. Rajesh Kumar"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Hearing Date
                    </label>
                    <input
                      type="date"
                      value={formData.previousDate}
                      onChange={(e) => setFormData({...formData, previousDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next Hearing Date (if known)
                    </label>
                    <input
                      type="date"
                      value={formData.nextDate}
                      onChange={(e) => setFormData({...formData, nextDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attendees
                    </label>
                    <input
                      type="text"
                      value={formData.attendees}
                      onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Adv. Rajesh Kumar, Adv. Suresh Verma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Documents
                    </label>
                    <input
                      type="text"
                      value={formData.documents}
                      onChange={(e) => setFormData({...formData, documents: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Witness affidavit, supporting documents"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks/Notes
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter any remarks or notes..."
                    />
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
                  Add Hearing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure */}
      {showEditModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Edit Hearing</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedHearing(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditHearing} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.caseNo}
                      onChange={(e) => setFormData({...formData, caseNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Case ID</label>
                    <input
                      type="text"
                      value={formData.caseId}
                      onChange={(e) => setFormData({...formData, caseId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.caseTitle}
                      onChange={(e) => setFormData({...formData, caseTitle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Court Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Court <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.court}
                      onChange={(e) => setFormData({...formData, court: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {courts.map(court => (
                        <option key={court} value={court}>{court}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bench/Court Room <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.bench}
                      onChange={(e) => setFormData({...formData, bench: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Court Room Number</label>
                    <input
                      type="text"
                      value={formData.courtRoomNo}
                      onChange={(e) => setFormData({...formData, courtRoomNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Judge Name</label>
                    <input
                      type="text"
                      value={formData.judgeName}
                      onChange={(e) => setFormData({...formData, judgeName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hearing Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hearing Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.hearingDate}
                      onChange={(e) => setFormData({...formData, hearingDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hearing Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.hearingTime}
                      onChange={(e) => setFormData({...formData, hearingTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {purposes.map(purpose => (
                        <option key={purpose} value={purpose}>{purpose}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Counsel <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.counsel}
                      onChange={(e) => setFormData({...formData, counsel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Hearing Date</label>
                    <input
                      type="date"
                      value={formData.previousDate}
                      onChange={(e) => setFormData({...formData, previousDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Next Hearing Date</label>
                    <input
                      type="date"
                      value={formData.nextDate}
                      onChange={(e) => setFormData({...formData, nextDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                    <input
                      type="text"
                      value={formData.attendees}
                      onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Required Documents</label>
                    <input
                      type="text"
                      value={formData.documents}
                      onChange={(e) => setFormData({...formData, documents: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks/Notes</label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedHearing(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Hearing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}