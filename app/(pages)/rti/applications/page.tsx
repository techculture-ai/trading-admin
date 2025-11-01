'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, FileText, X, Eye, Edit, Trash2, Phone, Mail } from 'lucide-react'

interface RTIApplication {
  id: string
  applicationNo: string
  applicantName: string
  applicantContact: string
  applicantEmail: string
  subject: string
  department: string
  receivedDate: string
  dueDate: string
  assignedTo: string
  fee: string
  status: 'Pending' | 'Responded' | 'Overdue' | 'Under Process' | 'Rejected'
  daysLeft: number
  applicantAddress?: string
  requestDetails?: string
  modeOfSubmission?: string
  paymentMode?: string
  bplCard?: boolean
}

const initialApplications: RTIApplication[] = [
  {
    id: 'RTI-2024-234',
    applicationNo: 'RTI/UP/2024/234',
    applicantName: 'Rajesh Kumar Singh',
    applicantContact: '+91 9876543210',
    applicantEmail: 'rajesh.kumar@example.com',
    subject: 'Information regarding land acquisition in Gomti Nagar',
    department: 'Land Acquisition',
    receivedDate: '2024-10-25',
    dueDate: '2024-11-24',
    assignedTo: 'PIO - Priya Sharma',
    fee: '₹10',
    status: 'Pending',
    daysLeft: 28,
    applicantAddress: 'Indira Nagar, Lucknow - 226016',
    requestDetails: 'Complete information about land acquisition process and compensation details for Plot No. 123 in Gomti Nagar area',
    modeOfSubmission: 'Online',
    paymentMode: 'Online Payment',
    bplCard: false,
  },
  {
    id: 'RTI-2024-233',
    applicationNo: 'RTI/UP/2024/233',
    applicantName: 'Priya Verma',
    applicantContact: '+91 9876543211',
    applicantEmail: 'priya.verma@example.com',
    subject: 'Details of tenders floated in 2024',
    department: 'Engineering',
    receivedDate: '2024-10-23',
    dueDate: '2024-11-22',
    assignedTo: 'PIO - Amit Singh',
    fee: '₹10',
    status: 'Responded',
    daysLeft: 0,
    applicantAddress: 'Hazratganj, Lucknow - 226001',
    requestDetails: 'List of all tenders floated by Engineering department in year 2024 with contract values',
    modeOfSubmission: 'Offline',
    paymentMode: 'Cash',
    bplCard: false,
  },
  {
    id: 'RTI-2024-232',
    applicationNo: 'RTI/UP/2024/232',
    applicantName: 'Amit Patel',
    applicantContact: '+91 9876543212',
    applicantEmail: 'amit.patel@example.com',
    subject: 'Budget allocation for FY 2024-25',
    department: 'Accounts',
    receivedDate: '2024-10-20',
    dueDate: '2024-11-19',
    assignedTo: 'PIO - Priya Sharma',
    fee: '₹10',
    status: 'Overdue',
    daysLeft: -2,
    applicantAddress: 'Aliganj, Lucknow - 226024',
    requestDetails: 'Department-wise budget allocation for financial year 2024-25',
    modeOfSubmission: 'Online',
    paymentMode: 'Online Payment',
    bplCard: false,
  },
]

const departments = ['Land Acquisition', 'Engineering', 'Accounts', 'HR', 'Legal', 'Administration', 'Health', 'Education', 'Public Works', 'Other']
const pios = ['PIO - Priya Sharma', 'PIO - Amit Singh', 'PIO - Rajesh Kumar', 'PIO - Neha Verma']
const submissionModes = ['Online', 'Offline', 'Post', 'Hand Delivery']
const paymentModes = ['Online Payment', 'Cash', 'DD', 'Cheque', 'Exempted (BPL)']

export default function RTIApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<RTIApplication[]>(initialApplications)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<RTIApplication | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    applicantName: '',
    applicantContact: '',
    applicantEmail: '',
    applicantAddress: '',
    subject: '',
    requestDetails: '',
    department: 'Land Acquisition',
    assignedTo: 'PIO - Priya Sharma',
    receivedDate: new Date().toISOString().split('T')[0],
    modeOfSubmission: 'Online',
    paymentMode: 'Online Payment',
    fee: '₹10',
    bplCard: false,
  })

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault()
    
    const receivedDate = new Date(formData.receivedDate)
    const dueDate = new Date(receivedDate)
    dueDate.setDate(dueDate.getDate() + 30)
    
    const newApplication: RTIApplication = {
      id: `RTI-2024-${String(applications.length + 235).padStart(3, '0')}`,
      applicationNo: `RTI/UP/2024/${String(applications.length + 235).padStart(3, '0')}`,
      ...formData,
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'Pending',
      daysLeft: 30,
    }
    setApplications([...applications, newApplication])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditApplication = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedApplication) return
    
    setApplications(applications.map(app => 
      app.id === selectedApplication.id 
        ? { ...app, ...formData }
        : app
    ))
    setShowEditModal(false)
    setSelectedApplication(null)
    resetForm()
  }

  const handleDeleteApplication = (id: string) => {
    if (confirm('Are you sure you want to delete this RTI application?')) {
      setApplications(applications.filter(app => app.id !== id))
    }
  }

  const handleViewApplication = (application: RTIApplication) => {
    router.push(`/rti/applications/${application.id}`)
  }

  const handleEditClick = (application: RTIApplication) => {
    setSelectedApplication(application)
    setFormData({
      applicantName: application.applicantName,
      applicantContact: application.applicantContact,
      applicantEmail: application.applicantEmail,
      applicantAddress: application.applicantAddress || '',
      subject: application.subject,
      requestDetails: application.requestDetails || '',
      department: application.department,
      assignedTo: application.assignedTo,
      receivedDate: application.receivedDate,
      modeOfSubmission: application.modeOfSubmission || 'Online',
      paymentMode: application.paymentMode || 'Online Payment',
      fee: application.fee,
      bplCard: application.bplCard || false,
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      applicantName: '',
      applicantContact: '',
      applicantEmail: '',
      applicantAddress: '',
      subject: '',
      requestDetails: '',
      department: 'Land Acquisition',
      assignedTo: 'PIO - Priya Sharma',
      receivedDate: new Date().toISOString().split('T')[0],
      modeOfSubmission: 'Online',
      paymentMode: 'Online Payment',
      fee: '₹10',
      bplCard: false,
    })
  }

  const handleExport = () => {
    const csv = [
      ['Application ID', 'Application No', 'Applicant Name', 'Contact', 'Subject', 'Department', 'Received Date', 'Due Date', 'Status'].join(','),
      ...filteredApplications.map(app => 
        [app.id, app.applicationNo, app.applicantName, app.applicantContact, app.subject, app.department, app.receivedDate, app.dueDate, app.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rti-applications.csv'
    a.click()
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalApplications = 234
  const pendingApplications = applications.filter(app => app.status === 'Pending').length
  const respondedApplications = 189
  const overdueApplications = applications.filter(app => app.status === 'Overdue').length
  const appeals = 12

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RTI Applications</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage all RTI applications</p>
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
            <span>Register Application</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Applications</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalApplications}</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-orange-500">
          <p className="text-sm text-gray-600 mb-2">Pending</p>
          <h3 className="text-3xl font-bold text-orange-600">{pendingApplications}</h3>
          <p className="text-xs text-gray-500 mt-2">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600 mb-2">Responded</p>
          <h3 className="text-3xl font-bold text-green-600">{respondedApplications}</h3>
          <p className="text-xs text-green-600 mt-2">{((respondedApplications / totalApplications) * 100).toFixed(0)}% completion</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Overdue</p>
          <h3 className="text-3xl font-bold text-red-600">{overdueApplications}</h3>
          <p className="text-xs text-gray-500 mt-2">Needs attention</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600 mb-2">Appeals</p>
          <h3 className="text-3xl font-bold text-blue-600">{appeals}</h3>
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
                      {['Pending', 'Responded', 'Overdue', 'Under Process', 'Rejected'].map(status => (
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
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicationNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Phone size={12} className="text-gray-400" />
                      <span>{app.applicantContact}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{app.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(app.receivedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(app.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
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
                      app.status === 'Under Process' ? 'bg-blue-100 text-blue-700' :
                      app.status === 'Rejected' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewApplication(app)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(app)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteApplication(app.id)}
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

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Register RTI Application</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddApplication} className="p-6 space-y-6">
              {/* Applicant Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName}
                      onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Rajesh Kumar Singh"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.applicantContact}
                      onChange={(e) => setFormData({...formData, applicantContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.applicantEmail}
                      onChange={(e) => setFormData({...formData, applicantEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="rajesh.kumar@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantAddress}
                      onChange={(e) => setFormData({...formData, applicantAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Indira Nagar, Lucknow"
                    />
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
                <div className="grid grid-cols-2 gap-4">
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
                      placeholder="Information regarding land acquisition in Gomti Nagar"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Request Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.requestDetails}
                      onChange={(e) => setFormData({...formData, requestDetails: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter detailed information request..."
                    />
                  </div>
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
                      Assigned To (PIO) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {pios.map(pio => (
                        <option key={pio} value={pio}>{pio}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Received Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.receivedDate}
                      onChange={(e) => setFormData({...formData, receivedDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mode of Submission <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.modeOfSubmission}
                      onChange={(e) => setFormData({...formData, modeOfSubmission: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {submissionModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.paymentMode}
                      onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {paymentModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Fee <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fee}
                      onChange={(e) => setFormData({...formData, fee: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹10"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.bplCard}
                        onChange={(e) => setFormData({...formData, bplCard: e.target.checked, fee: e.target.checked ? 'Exempted' : '₹10'})}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">Applicant holds BPL Card (Fee Exempted)</span>
                    </label>
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
                  Register Application
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
              <h2 className="text-xl font-bold text-gray-900">Edit RTI Application</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedApplication(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditApplication} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.applicantContact}
                      onChange={(e) => setFormData({...formData, applicantContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.applicantEmail}
                      onChange={(e) => setFormData({...formData, applicantEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantAddress}
                      onChange={(e) => setFormData({...formData, applicantAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Request Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.requestDetails}
                      onChange={(e) => setFormData({...formData, requestDetails: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
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
                      Assigned To (PIO) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {pios.map(pio => (
                        <option key={pio} value={pio}>{pio}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Received Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.receivedDate}
                      onChange={(e) => setFormData({...formData, receivedDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mode of Submission <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.modeOfSubmission}
                      onChange={(e) => setFormData({...formData, modeOfSubmission: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {submissionModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.paymentMode}
                      onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {paymentModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Fee <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fee}
                      onChange={(e) => setFormData({...formData, fee: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.bplCard}
                        onChange={(e) => setFormData({...formData, bplCard: e.target.checked, fee: e.target.checked ? 'Exempted' : '₹10'})}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">Applicant holds BPL Card (Fee Exempted)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedApplication(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}