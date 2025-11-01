'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, Eye, Send, X, Edit, Trash2, FileText } from 'lucide-react'

interface RTIResponse {
  id: string
  applicationNo: string
  applicantName: string
  subject: string
  department: string
  responseDate: string
  respondedBy: string
  responseType: 'Complete Information' | 'Partial Information' | 'Information Denied' | 'Transferred'
  documentsProvided: number
  dispatchDate: string
  dispatchMode: string
  status: 'Dispatched' | 'Draft' | 'Pending Dispatch' | 'Returned'
  responseText?: string
  reasonForPartial?: string
  reasonForDenial?: string
  transferredTo?: string
  feesCharged?: string
  additionalFees?: string
  applicantEmail?: string
  applicantContact?: string
}

const initialResponses: RTIResponse[] = [
  {
    id: 'RESP-2024-233',
    applicationNo: 'RTI/UP/2024/233',
    applicantName: 'Priya Verma',
    subject: 'Details of tenders floated in 2024',
    department: 'Engineering',
    responseDate: '2024-11-15',
    respondedBy: 'PIO - Amit Singh',
    responseType: 'Complete Information',
    documentsProvided: 5,
    dispatchDate: '2024-11-16',
    dispatchMode: 'Email & Post',
    status: 'Dispatched',
    responseText: 'All requested information regarding tenders floated in 2024 is provided in attached documents.',
    feesCharged: '₹10',
    additionalFees: '₹50 (for copies)',
    applicantEmail: 'priya.verma@example.com',
    applicantContact: '+91 9876543211'
  },
  {
    id: 'RESP-2024-231',
    applicationNo: 'RTI/UP/2024/231',
    applicantName: 'Suresh Kumar',
    subject: 'Property allotment information',
    department: 'Property Disposal',
    responseDate: '2024-11-10',
    respondedBy: 'PIO - Priya Sharma',
    responseType: 'Complete Information',
    documentsProvided: 8,
    dispatchDate: '2024-11-11',
    dispatchMode: 'Email',
    status: 'Dispatched',
    responseText: 'Complete information regarding property allotment is provided.',
    feesCharged: '₹10',
    additionalFees: '₹80 (for copies)',
    applicantEmail: 'suresh.kumar@example.com',
    applicantContact: '+91 9876543210'
  },
  {
    id: 'RESP-2024-230',
    applicationNo: 'RTI/UP/2024/230',
    applicantName: 'Neha Gupta',
    subject: 'Employee recruitment details',
    department: 'Establishment',
    responseDate: '2024-11-08',
    respondedBy: 'PIO - Amit Singh',
    responseType: 'Partial Information',
    documentsProvided: 3,
    dispatchDate: '2024-11-09',
    dispatchMode: 'Post',
    status: 'Dispatched',
    responseText: 'Partial information provided. Some details are exempt under Section 8(1)(j).',
    reasonForPartial: 'Personal information of candidates is exempt under Section 8(1)(j) of RTI Act',
    feesCharged: '₹10',
    additionalFees: '₹30 (for copies)',
    applicantEmail: 'neha.gupta@example.com',
    applicantContact: '+91 9876543212'
  },
]

const responseTypes = ['Complete Information', 'Partial Information', 'Information Denied', 'Transferred']
const departments = ['Land Acquisition', 'Engineering', 'Accounts', 'HR', 'Legal', 'Administration', 'Property Disposal', 'Establishment', 'Other']
const pios = ['PIO - Priya Sharma', 'PIO - Amit Singh', 'PIO - Rajesh Kumar', 'PIO - Neha Verma']
const dispatchModes = ['Email', 'Post', 'Email & Post', 'Hand Delivery', 'Courier']

export default function RTIResponsesPage() {
  const router = useRouter()
  const [responses, setResponses] = useState<RTIResponse[]>(initialResponses)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedResponse, setSelectedResponse] = useState<RTIResponse | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    applicationNo: '',
    applicantName: '',
    applicantEmail: '',
    applicantContact: '',
    subject: '',
    department: 'Engineering',
    responseDate: new Date().toISOString().split('T')[0],
    respondedBy: 'PIO - Priya Sharma',
    responseType: 'Complete Information' as RTIResponse['responseType'],
    documentsProvided: 0,
    dispatchDate: '',
    dispatchMode: 'Email',
    responseText: '',
    reasonForPartial: '',
    reasonForDenial: '',
    transferredTo: '',
    feesCharged: '₹10',
    additionalFees: '',
  })

  const handleAddResponse = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newResponse: RTIResponse = {
      id: `RESP-2024-${String(responses.length + 234).padStart(3, '0')}`,
      ...formData,
      status: 'Draft',
    }
    setResponses([...responses, newResponse])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditResponse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedResponse) return
    
    setResponses(responses.map(resp => 
      resp.id === selectedResponse.id 
        ? { ...resp, ...formData }
        : resp
    ))
    setShowEditModal(false)
    setSelectedResponse(null)
    resetForm()
  }

  const handleDeleteResponse = (id: string) => {
    if (confirm('Are you sure you want to delete this response?')) {
      setResponses(responses.filter(resp => resp.id !== id))
    }
  }

  const handleViewResponse = (response: RTIResponse) => {
    router.push(`/rti/responses/${response.id}`)
  }

  const handleEditClick = (response: RTIResponse) => {
    setSelectedResponse(response)
    setFormData({
      applicationNo: response.applicationNo,
      applicantName: response.applicantName,
      applicantEmail: response.applicantEmail || '',
      applicantContact: response.applicantContact || '',
      subject: response.subject,
      department: response.department,
      responseDate: response.responseDate,
      respondedBy: response.respondedBy,
      responseType: response.responseType,
      documentsProvided: response.documentsProvided,
      dispatchDate: response.dispatchDate,
      dispatchMode: response.dispatchMode,
      responseText: response.responseText || '',
      reasonForPartial: response.reasonForPartial || '',
      reasonForDenial: response.reasonForDenial || '',
      transferredTo: response.transferredTo || '',
      feesCharged: response.feesCharged || '₹10',
      additionalFees: response.additionalFees || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      applicationNo: '',
      applicantName: '',
      applicantEmail: '',
      applicantContact: '',
      subject: '',
      department: 'Engineering',
      responseDate: new Date().toISOString().split('T')[0],
      respondedBy: 'PIO - Priya Sharma',
      responseType: 'Complete Information',
      documentsProvided: 0,
      dispatchDate: '',
      dispatchMode: 'Email',
      responseText: '',
      reasonForPartial: '',
      reasonForDenial: '',
      transferredTo: '',
      feesCharged: '₹10',
      additionalFees: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Response ID', 'Application No', 'Applicant', 'Subject', 'Department', 'Response Date', 'Response Type', 'Documents', 'Status'].join(','),
      ...filteredResponses.map(resp => 
        [resp.id, resp.applicationNo, resp.applicantName, resp.subject, resp.department, resp.responseDate, resp.responseType, resp.documentsProvided, resp.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rti-responses.csv'
    a.click()
  }

  const filteredResponses = responses.filter(resp => {
    const matchesSearch = resp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resp.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resp.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resp.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resp.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || resp.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalResponses = 189
  const completeInfo = responses.filter(r => r.responseType === 'Complete Information').length
  const partialInfo = responses.filter(r => r.responseType === 'Partial Information').length
  const avgResponseTime = 18

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RTI Responses</h1>
          <p className="text-sm text-gray-600 mt-1">Manage responses and information disclosure</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export Report</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus size={20} />
            <span>Draft Response</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Responses</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalResponses}</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Complete Information</p>
          <h3 className="text-3xl font-bold text-green-600">{completeInfo}</h3>
          <p className="text-xs text-gray-500 mt-2">{((completeInfo / totalResponses) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Partial Information</p>
          <h3 className="text-3xl font-bold text-orange-600">{partialInfo}</h3>
          <p className="text-xs text-gray-500 mt-2">{((partialInfo / totalResponses) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. Response Time</p>
          <h3 className="text-3xl font-bold text-blue-600">{avgResponseTime} days</h3>
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
                      {['Dispatched', 'Draft', 'Pending Dispatch', 'Returned'].map(status => (
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
              {filteredResponses.map((response) => (
                <tr key={response.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{response.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{response.applicationNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{response.applicantName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{response.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{response.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(response.responseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{response.respondedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      response.responseType === 'Complete Information' ? 'bg-green-100 text-green-700' :
                      response.responseType === 'Partial Information' ? 'bg-orange-100 text-orange-700' :
                      response.responseType === 'Information Denied' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {response.responseType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <FileText size={14} className="text-gray-400" />
                      <span>{response.documentsProvided} files</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(response.dispatchDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      response.status === 'Dispatched' ? 'bg-green-100 text-green-700' :
                      response.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                      response.status === 'Pending Dispatch' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {response.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewResponse(response)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(response)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteResponse(response.id)}
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

      {/* Add Response Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Draft RTI Response</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddResponse} className="p-6 space-y-6">
              {/* Application Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicationNo}
                      onChange={(e) => setFormData({...formData, applicationNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="RTI/UP/2024/234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Priya Verma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicant Email
                    </label>
                    <input
                      type="email"
                      value={formData.applicantEmail}
                      onChange={(e) => setFormData({...formData, applicantEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="priya.verma@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicant Contact
                    </label>
                    <input
                      type="tel"
                      value={formData.applicantContact}
                      onChange={(e) => setFormData({...formData, applicantContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Details of tenders floated in 2024"
                    />
                  </div>
                </div>
              </div>

              {/* Response Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responded By (PIO) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.respondedBy}
                      onChange={(e) => setFormData({...formData, respondedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {pios.map(pio => (
                        <option key={pio} value={pio}>{pio}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.responseDate}
                      onChange={(e) => setFormData({...formData, responseDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.responseType}
                      onChange={(e) => setFormData({...formData, responseType: e.target.value as RTIResponse['responseType']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {responseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Documents
                    </label>
                    <input
                      type="number"
                      value={formData.documentsProvided}
                      onChange={(e) => setFormData({...formData, documentsProvided: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dispatch Date
                    </label>
                    <input
                      type="date"
                      value={formData.dispatchDate}
                      onChange={(e) => setFormData({...formData, dispatchDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dispatch Mode
                    </label>
                    <select
                      value={formData.dispatchMode}
                      onChange={(e) => setFormData({...formData, dispatchMode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {dispatchModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Fees */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fees Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Fee Charged
                    </label>
                    <input
                      type="text"
                      value={formData.feesCharged}
                      onChange={(e) => setFormData({...formData, feesCharged: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Fees (Copies, etc.)
                    </label>
                    <input
                      type="text"
                      value={formData.additionalFees}
                      onChange={(e) => setFormData({...formData, additionalFees: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹50 (for copies)"
                    />
                  </div>
                </div>
              </div>

              {/* Response Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.responseText}
                  onChange={(e) => setFormData({...formData, responseText: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter detailed response to the RTI application..."
                />
              </div>

              {/* Conditional Fields */}
              {formData.responseType === 'Partial Information' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Partial Information
                  </label>
                  <textarea
                    value={formData.reasonForPartial}
                    onChange={(e) => setFormData({...formData, reasonForPartial: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Specify which sections of RTI Act apply..."
                  />
                </div>
              )}

              {formData.responseType === 'Information Denied' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Denial
                  </label>
                  <textarea
                    value={formData.reasonForDenial}
                    onChange={(e) => setFormData({...formData, reasonForDenial: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Specify exemption sections under RTI Act..."
                  />
                </div>
              )}

              {formData.responseType === 'Transferred' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transferred To
                  </label>
                  <input
                    type="text"
                    value={formData.transferredTo}
                    onChange={(e) => setFormData({...formData, transferredTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Department/Authority name"
                  />
                </div>
              )}

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
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Edit RTI Response</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedResponse(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditResponse} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicationNo}
                      onChange={(e) => setFormData({...formData, applicationNo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Email</label>
                    <input
                      type="email"
                      value={formData.applicantEmail}
                      onChange={(e) => setFormData({...formData, applicantEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Contact</label>
                    <input
                      type="tel"
                      value={formData.applicantContact}
                      onChange={(e) => setFormData({...formData, applicantContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responded By (PIO) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.respondedBy}
                      onChange={(e) => setFormData({...formData, respondedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {pios.map(pio => (
                        <option key={pio} value={pio}>{pio}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.responseDate}
                      onChange={(e) => setFormData({...formData, responseDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.responseType}
                      onChange={(e) => setFormData({...formData, responseType: e.target.value as RTIResponse['responseType']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {responseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Documents</label>
                    <input
                      type="number"
                      value={formData.documentsProvided}
                      onChange={(e) => setFormData({...formData, documentsProvided: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dispatch Date</label>
                    <input
                      type="date"
                      value={formData.dispatchDate}
                      onChange={(e) => setFormData({...formData, dispatchDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dispatch Mode</label>
                    <select
                      value={formData.dispatchMode}
                      onChange={(e) => setFormData({...formData, dispatchMode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {dispatchModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fees Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Fee Charged</label>
                    <input
                      type="text"
                      value={formData.feesCharged}
                      onChange={(e) => setFormData({...formData, feesCharged: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Fees</label>
                    <input
                      type="text"
                      value={formData.additionalFees}
                      onChange={(e) => setFormData({...formData, additionalFees: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.responseText}
                  onChange={(e) => setFormData({...formData, responseText: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {formData.responseType === 'Partial Information' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Partial Information</label>
                  <textarea
                    value={formData.reasonForPartial}
                    onChange={(e) => setFormData({...formData, reasonForPartial: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              {formData.responseType === 'Information Denied' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Denial</label>
                  <textarea
                    value={formData.reasonForDenial}
                    onChange={(e) => setFormData({...formData, reasonForDenial: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              {formData.responseType === 'Transferred' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transferred To</label>
                  <input
                    type="text"
                    value={formData.transferredTo}
                    onChange={(e) => setFormData({...formData, transferredTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedResponse(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}