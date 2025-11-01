'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, Phone, Mail, X, Eye, Edit, Trash2, Calendar } from 'lucide-react'

interface Lead {
  id: string
  leadNo: string
  name: string
  contact: string
  email: string
  interest: string
  source: string
  assignedTo: string
  visitDate: string
  status: 'Hot' | 'Warm' | 'Cold' | 'Converted' | 'Lost'
  lastContact: string
  address?: string
  budget?: string
  notes?: string
  followUpDate?: string
  alternateContact?: string
  profession?: string
  referredBy?: string
}

const initialLeads: Lead[] = [
  {
    id: 'LEAD-2024-001',
    leadNo: 'LD/2024/001',
    name: 'Rajesh Kumar Singh',
    contact: '+91 9876543210',
    email: 'rajesh.kumar@example.com',
    interest: '3BHK - Gomti Nagar Housing',
    source: 'Website',
    assignedTo: 'Sales Officer - Priya Sharma',
    visitDate: '2024-10-28',
    status: 'Hot',
    lastContact: '2 hours ago',
    address: 'Indira Nagar, Lucknow',
    budget: '₹50-60 Lakhs',
    notes: 'Very interested. Looking for immediate possession.',
    followUpDate: '2024-11-01',
    alternateContact: '+91 9876543213',
    profession: 'IT Professional',
    referredBy: 'Website - Google Search'
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
    visitDate: '2024-10-30',
    status: 'Warm',
    lastContact: '1 day ago',
    address: 'Hazratganj, Lucknow',
    budget: '₹30-40 Lakhs',
    notes: 'Interested but needs to discuss with family',
    followUpDate: '2024-11-02',
    alternateContact: '+91 9876543214',
    profession: 'Teacher',
    referredBy: 'Walk-in'
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
    visitDate: '',
    status: 'Cold',
    lastContact: '5 days ago',
    address: 'Aliganj, Lucknow',
    budget: '₹20-25 Lakhs',
    notes: 'Not urgent. Planning for next year.',
    followUpDate: '2024-11-10',
    alternateContact: '',
    profession: 'Business Owner',
    referredBy: 'Existing Customer - Mr. Sharma'
  },
]

const sources = ['Website', 'Walk-in', 'Referral', 'Phone Call', 'Email', 'Social Media', 'Campaign', 'Event', 'Other']
const interests = ['2BHK Apartment', '3BHK Apartment', '4BHK Apartment', 'Villa', 'Plot', 'Commercial Space', 'Penthouse', 'Studio Apartment']
const salesOfficers = ['Priya Sharma', 'Amit Singh', 'Rajesh Kumar', 'Neha Verma', 'Vikram Singh']

export default function LeadManagementPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    interest: '2BHK Apartment',
    source: 'Website',
    assignedTo: 'Priya Sharma',
    visitDate: '',
    address: '',
    budget: '',
    notes: '',
    followUpDate: '',
    alternateContact: '',
    profession: '',
    referredBy: '',
  })

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newLead: Lead = {
      id: `LEAD-2024-${String(leads.length + 1).padStart(3, '0')}`,
      leadNo: `LD/2024/${String(leads.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Cold',
      lastContact: 'Just now',
    }
    setLeads([...leads, newLead])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditLead = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLead) return
    
    setLeads(leads.map(l => 
      l.id === selectedLead.id 
        ? { ...l, ...formData }
        : l
    ))
    setShowEditModal(false)
    setSelectedLead(null)
    resetForm()
  }

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(l => l.id !== id))
    }
  }

  const handleViewLead = (lead: Lead) => {
    router.push(`/marketing/leads/${lead.id}`)
  }

  const handleEditClick = (lead: Lead) => {
    setSelectedLead(lead)
    setFormData({
      name: lead.name,
      contact: lead.contact,
      email: lead.email,
      interest: lead.interest,
      source: lead.source,
      assignedTo: lead.assignedTo.replace('Sales Officer - ', ''),
      visitDate: lead.visitDate,
      address: lead.address || '',
      budget: lead.budget || '',
      notes: lead.notes || '',
      followUpDate: lead.followUpDate || '',
      alternateContact: lead.alternateContact || '',
      profession: lead.profession || '',
      referredBy: lead.referredBy || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      email: '',
      interest: '2BHK Apartment',
      source: 'Website',
      assignedTo: 'Priya Sharma',
      visitDate: '',
      address: '',
      budget: '',
      notes: '',
      followUpDate: '',
      alternateContact: '',
      profession: '',
      referredBy: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Lead ID', 'Lead No', 'Name', 'Contact', 'Email', 'Interest', 'Source', 'Assigned To', 'Visit Date', 'Status'].join(','),
      ...filteredLeads.map(l => 
        [l.id, l.leadNo, l.name, l.contact, l.email, l.interest, l.source, l.assignedTo, l.visitDate, l.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads-report.csv'
    a.click()
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.leadNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contact.includes(searchTerm) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.interest.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalLeads = 456
  const hotLeads = leads.filter(l => l.status === 'Hot').length
  const warmLeads = leads.filter(l => l.status === 'Warm').length
  const coldLeads = leads.filter(l => l.status === 'Cold').length
  const convertedLeads = 88

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-sm text-gray-600 mt-1">Track and manage customer leads and follow-ups</p>
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
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Leads</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalLeads}</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600 mb-2">Hot Leads</p>
          <h3 className="text-3xl font-bold text-red-600">{hotLeads}</h3>
          <p className="text-xs text-gray-500 mt-2">High priority</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-orange-500">
          <p className="text-sm text-gray-600 mb-2">Warm Leads</p>
          <h3 className="text-3xl font-bold text-orange-600">{warmLeads}</h3>
          <p className="text-xs text-gray-500 mt-2">Medium priority</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600 mb-2">Cold Leads</p>
          <h3 className="text-3xl font-bold text-blue-600">{coldLeads}</h3>
          <p className="text-xs text-gray-500 mt-2">Low priority</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600 mb-2">Converted</p>
          <h3 className="text-3xl font-bold text-green-600">{convertedLeads}</h3>
          <p className="text-xs text-green-600 mt-2">{((convertedLeads / totalLeads) * 100).toFixed(0)}% conversion</p>
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
                      {['Hot', 'Warm', 'Cold', 'Converted', 'Lost'].map(status => (
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
              {filteredLeads.map((lead) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {lead.visitDate ? new Date(lead.visitDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      lead.status === 'Hot' ? 'bg-red-100 text-red-700' :
                      lead.status === 'Warm' ? 'bg-orange-100 text-orange-700' :
                      lead.status === 'Cold' ? 'bg-blue-100 text-blue-700' :
                      lead.status === 'Converted' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewLead(lead)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(lead)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
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

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Add New Lead</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddLead} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
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
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="rajesh.kumar@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alternate Contact
                    </label>
                    <input
                      type="tel"
                      value={formData.alternateContact}
                      onChange={(e) => setFormData({...formData, alternateContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+91 9876543213"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profession
                    </label>
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({...formData, profession: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="IT Professional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Indira Nagar, Lucknow"
                    />
                  </div>
                </div>
              </div>

              {/* Lead Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {interests.map(int => (
                        <option key={int} value={int}>{int}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹50-60 Lakhs"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {sources.map(src => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referred By
                    </label>
                    <input
                      type="text"
                      value={formData.referredBy}
                      onChange={(e) => setFormData({...formData, referredBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Website - Google Search"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned To <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {salesOfficers.map(officer => (
                        <option key={officer} value={officer}>{officer}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Visit Date
                    </label>
                    <input
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follow-up Date
                    </label>
                    <input
                      type="date"
                      value={formData.followUpDate}
                      onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes/Remarks
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter any additional notes..."
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
                  Add Lead
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
              <h2 className="text-xl font-bold text-gray-900">Edit Lead</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedLead(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditLead} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
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
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Contact</label>
                    <input
                      type="tel"
                      value={formData.alternateContact}
                      onChange={(e) => setFormData({...formData, alternateContact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                    <input
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({...formData, profession: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {interests.map(int => (
                        <option key={int} value={int}>{int}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {sources.map(src => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Referred By</label>
                    <input
                      type="text"
                      value={formData.referredBy}
                      onChange={(e) => setFormData({...formData, referredBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned To <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {salesOfficers.map(officer => (
                        <option key={officer} value={officer}>{officer}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Visit Date</label>
                    <input
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
                    <input
                      type="date"
                      value={formData.followUpDate}
                      onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes/Remarks</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedLead(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}