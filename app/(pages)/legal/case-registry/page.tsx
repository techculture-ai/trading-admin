'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, Scale, X, Eye, Edit, Trash2, Calendar } from 'lucide-react'

interface CaseRecord {
  id: string
  caseNo: string
  caseType: string
  title: string
  court: string
  filingDate: string
  nextHearing: string
  counsel: string
  status: 'Active' | 'Closed' | 'Won' | 'Lost' | 'Settled' | 'Pending'
  stage: string
  plaintiff?: string
  defendant?: string
  caseValue?: string
  description?: string
  judgeName?: string
  caseCategory?: string
}

const initialCases: CaseRecord[] = [
  {
    id: 'CASE-2024-001',
    caseNo: 'CIV/2024/045',
    caseType: 'Civil',
    title: 'ULB vs ABC Contractors Ltd.',
    court: 'District Court, Lucknow',
    filingDate: '2024-01-15',
    nextHearing: '2024-10-28',
    counsel: 'Adv. Rajesh Kumar',
    status: 'Active',
    stage: 'Evidence',
    plaintiff: 'Urban Local Body, Lucknow',
    defendant: 'ABC Contractors Ltd.',
    caseValue: '₹25,00,000',
    description: 'Contract breach and payment dispute',
    judgeName: 'Hon. Justice P.K. Sharma',
    caseCategory: 'Contract Dispute'
  },
  {
    id: 'CASE-2024-002',
    caseNo: 'LAND/2024/023',
    caseType: 'Land Dispute',
    title: 'Land Acquisition - Plot No. 456',
    court: 'High Court, Lucknow',
    filingDate: '2024-02-20',
    nextHearing: '2024-10-30',
    counsel: 'Adv. Priya Sharma',
    status: 'Active',
    stage: 'Arguments',
    plaintiff: 'Urban Development Authority',
    defendant: 'Local Landowners Group',
    caseValue: '₹1,50,00,000',
    description: 'Land acquisition for public project',
    judgeName: 'Hon. Justice R.K. Verma',
    caseCategory: 'Land Acquisition'
  },
  {
    id: 'CASE-2024-003',
    caseNo: 'ARB/2024/012',
    caseType: 'Arbitration',
    title: 'Contract Dispute - XYZ Developers',
    court: 'Arbitration Tribunal',
    filingDate: '2024-03-10',
    nextHearing: '2024-11-05',
    counsel: 'Adv. Amit Singh',
    status: 'Active',
    stage: 'Final Hearing',
    plaintiff: 'Municipal Corporation',
    defendant: 'XYZ Developers Pvt. Ltd.',
    caseValue: '₹75,00,000',
    description: 'Construction contract arbitration',
    judgeName: 'Arbitrator: Justice (Retd.) S.N. Mishra',
    caseCategory: 'Arbitration'
  },
]

const caseTypes = ['Civil', 'Criminal', 'Land Dispute', 'Arbitration', 'Contract Dispute', 'Service Matter', 'Revenue', 'Constitutional', 'Other']
const stages = ['Filing', 'Evidence', 'Arguments', 'Final Hearing', 'Judgement Reserved', 'Judgement Pronounced', 'Appeal', 'Execution']
const courts = ['District Court, Lucknow', 'High Court, Lucknow', 'Supreme Court', 'Arbitration Tribunal', 'Consumer Forum', 'Labour Court', 'Other']

export default function CaseRegistryPage() {
  const router = useRouter()
  const [cases, setCases] = useState<CaseRecord[]>(initialCases)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    caseNo: '',
    caseType: 'Civil',
    title: '',
    court: 'District Court, Lucknow',
    filingDate: '',
    nextHearing: '',
    counsel: '',
    stage: 'Filing',
    plaintiff: '',
    defendant: '',
    caseValue: '',
    description: '',
    judgeName: '',
    caseCategory: '',
  })

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newCase: CaseRecord = {
      id: `CASE-2024-${String(cases.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Active',
    }
    setCases([...cases, newCase])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditCase = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCase) return
    
    setCases(cases.map(c => 
      c.id === selectedCase.id 
        ? { ...c, ...formData }
        : c
    ))
    setShowEditModal(false)
    setSelectedCase(null)
    resetForm()
  }

  const handleDeleteCase = (id: string) => {
    if (confirm('Are you sure you want to delete this case record?')) {
      setCases(cases.filter(c => c.id !== id))
    }
  }

  const handleViewCase = (caseRecord: CaseRecord) => {
    router.push(`/legal/case-registry/${caseRecord.id}`)
  }

  const handleEditClick = (caseRecord: CaseRecord) => {
    setSelectedCase(caseRecord)
    setFormData({
      caseNo: caseRecord.caseNo,
      caseType: caseRecord.caseType,
      title: caseRecord.title,
      court: caseRecord.court,
      filingDate: caseRecord.filingDate,
      nextHearing: caseRecord.nextHearing,
      counsel: caseRecord.counsel,
      stage: caseRecord.stage,
      plaintiff: caseRecord.plaintiff || '',
      defendant: caseRecord.defendant || '',
      caseValue: caseRecord.caseValue || '',
      description: caseRecord.description || '',
      judgeName: caseRecord.judgeName || '',
      caseCategory: caseRecord.caseCategory || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      caseNo: '',
      caseType: 'Civil',
      title: '',
      court: 'District Court, Lucknow',
      filingDate: '',
      nextHearing: '',
      counsel: '',
      stage: 'Filing',
      plaintiff: '',
      defendant: '',
      caseValue: '',
      description: '',
      judgeName: '',
      caseCategory: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Case ID', 'Case No', 'Type', 'Title', 'Court', 'Filing Date', 'Next Hearing', 'Counsel', 'Stage', 'Status'].join(','),
      ...filteredCases.map(c => 
        [c.id, c.caseNo, c.caseType, c.title, c.court, c.filingDate, c.nextHearing, c.counsel, c.stage, c.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'case-registry.csv'
    a.click()
  }

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.counsel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || caseItem.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalCases = 156
  const activeCases = cases.filter(c => c.status === 'Active').length
  const casesWon = 89
  const casesLost = 22

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Registry</h1>
          <p className="text-sm text-gray-600 mt-1">Manage all legal cases and litigation records</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus size={20} />
            <span>Add Case</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Cases</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalCases}</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Cases</p>
          <h3 className="text-3xl font-bold text-orange-600">{activeCases}</h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Cases Won</p>
          <h3 className="text-3xl font-bold text-green-600">{casesWon}</h3>
          <p className="text-xs text-green-600 mt-2">{((casesWon / totalCases) * 100).toFixed(0)}% success rate</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Cases Lost</p>
          <h3 className="text-3xl font-bold text-red-600">{casesLost}</h3>
          <p className="text-xs text-gray-500 mt-2">{((casesLost / totalCases) * 100).toFixed(0)}% loss rate</p>
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
                      {['Active', 'Closed', 'Won', 'Lost', 'Settled', 'Pending'].map(status => (
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
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{caseItem.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{caseItem.caseNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.caseType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{caseItem.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.court}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(caseItem.filingDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                    {new Date(caseItem.nextHearing).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.counsel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{caseItem.stage}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      caseItem.status === 'Active' ? 'bg-green-100 text-green-700' :
                      caseItem.status === 'Won' ? 'bg-blue-100 text-blue-700' :
                      caseItem.status === 'Lost' ? 'bg-red-100 text-red-700' :
                      caseItem.status === 'Settled' ? 'bg-purple-100 text-purple-700' :
                      caseItem.status === 'Closed' ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewCase(caseItem)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(caseItem)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCase(caseItem.id)}
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

      {/* Add Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Add New Case</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddCase} className="p-6 space-y-6">
              {/* Basic Case Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Case Information</h3>
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
                      Case Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.caseType}
                      onChange={(e) => setFormData({...formData, caseType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {caseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="ULB vs ABC Contractors Ltd."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Category
                    </label>
                    <input
                      type="text"
                      value={formData.caseCategory}
                      onChange={(e) => setFormData({...formData, caseCategory: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Contract Dispute"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Value
                    </label>
                    <input
                      type="text"
                      value={formData.caseValue}
                      onChange={(e) => setFormData({...formData, caseValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹25,00,000"
                    />
                  </div>
                </div>
              </div>

              {/* Parties Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Parties Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plaintiff/Petitioner
                    </label>
                    <input
                      type="text"
                      value={formData.plaintiff}
                      onChange={(e) => setFormData({...formData, plaintiff: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Urban Local Body, Lucknow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Defendant/Respondent
                    </label>
                    <input
                      type="text"
                      value={formData.defendant}
                      onChange={(e) => setFormData({...formData, defendant: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="ABC Contractors Ltd."
                    />
                  </div>
                </div>
              </div>

              {/* Court & Legal Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Court & Legal Details</h3>
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
                      Case Stage <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({...formData, stage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filing Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.filingDate}
                      onChange={(e) => setFormData({...formData, filingDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next Hearing Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.nextHearing}
                      onChange={(e) => setFormData({...formData, nextHearing: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter detailed case description..."
                />
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
                  Add Case
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
              <h2 className="text-xl font-bold text-gray-900">Edit Case</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedCase(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditCase} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Case Information</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.caseType}
                      onChange={(e) => setFormData({...formData, caseType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {caseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Case Category</label>
                    <input
                      type="text"
                      value={formData.caseCategory}
                      onChange={(e) => setFormData({...formData, caseCategory: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Case Value</label>
                    <input
                      type="text"
                      value={formData.caseValue}
                      onChange={(e) => setFormData({...formData, caseValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Parties Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plaintiff/Petitioner</label>
                    <input
                      type="text"
                      value={formData.plaintiff}
                      onChange={(e) => setFormData({...formData, plaintiff: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Defendant/Respondent</label>
                    <input
                      type="text"
                      value={formData.defendant}
                      onChange={(e) => setFormData({...formData, defendant: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Court & Legal Details</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Judge Name</label>
                    <input
                      type="text"
                      value={formData.judgeName}
                      onChange={(e) => setFormData({...formData, judgeName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Stage <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({...formData, stage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filing Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.filingDate}
                      onChange={(e) => setFormData({...formData, filingDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Next Hearing Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.nextHearing}
                      onChange={(e) => setFormData({...formData, nextHearing: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Case Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedCase(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}