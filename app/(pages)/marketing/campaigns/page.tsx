'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Filter, Download, Megaphone, X, Eye, Edit, Trash2, TrendingUp } from 'lucide-react'

interface Campaign {
  id: string
  campaignName: string
  type: string
  channel: string
  startDate: string
  endDate: string
  budget: string
  spent: string
  leads: number
  conversions: number
  roi: string
  status: 'Active' | 'Planned' | 'Completed' | 'Paused' | 'Cancelled'
  targetAudience?: string
  description?: string
  objectives?: string
  manager?: string
  platform?: string
  creatives?: string
}

const initialCampaigns: Campaign[] = [
  {
    id: 'CAMP-2024-001',
    campaignName: 'Gomti Nagar Housing - Diwali Offer',
    type: 'Digital',
    channel: 'Social Media, Google Ads',
    startDate: '2024-10-01',
    endDate: '2024-10-31',
    budget: '₹5,00,000',
    spent: '₹3,50,000',
    leads: 89,
    conversions: 23,
    roi: '340%',
    status: 'Active',
    targetAudience: 'Families, Age 30-50, Income 10L+',
    description: 'Special Diwali offer for premium housing units in Gomti Nagar',
    objectives: 'Generate 100 qualified leads, Achieve 25 conversions',
    manager: 'Priya Sharma',
    platform: 'Facebook, Instagram, Google Ads',
    creatives: 'Video ads, Banner ads, Social media posts'
  },
  {
    id: 'CAMP-2024-002',
    campaignName: 'Hazratganj Commercial - Print Campaign',
    type: 'Print Media',
    channel: 'Newspapers, Magazines',
    startDate: '2024-10-15',
    endDate: '2024-11-15',
    budget: '₹3,00,000',
    spent: '₹2,10,000',
    leads: 45,
    conversions: 12,
    roi: '280%',
    status: 'Active',
    targetAudience: 'Business Owners, Age 35-60',
    description: 'Premium commercial space promotion in Hazratganj',
    objectives: 'Generate 50 quality leads, Achieve 15 conversions',
    manager: 'Rajesh Kumar',
    platform: 'Times of India, Hindustan Times, Business Magazines',
    creatives: 'Full page ads, Half page ads'
  },
  {
    id: 'CAMP-2024-003',
    campaignName: 'Property Expo 2024',
    type: 'Event',
    channel: 'Exhibition',
    startDate: '2024-11-05',
    endDate: '2024-11-07',
    budget: '₹8,00,000',
    spent: '₹2,00,000',
    leads: 12,
    conversions: 3,
    roi: '-',
    status: 'Planned',
    targetAudience: 'Property Investors, Home Buyers',
    description: 'Annual property expo showcasing all projects',
    objectives: 'Generate 200 leads, Achieve brand visibility',
    manager: 'Amit Singh',
    platform: 'Physical Event, Sahara Ganj Mall',
    creatives: 'Booth design, Brochures, Presentation materials'
  },
]

const campaignTypes = ['Digital', 'Print Media', 'Event', 'Radio', 'Television', 'Outdoor', 'Email', 'SMS', 'Telemarketing', 'Hybrid']
const channels = ['Social Media', 'Google Ads', 'Newspapers', 'Magazines', 'Radio', 'TV', 'Billboards', 'Email', 'SMS', 'Events', 'Direct Mail']

export default function CampaignsPage() {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const [formData, setFormData] = useState({
    campaignName: '',
    type: 'Digital',
    channel: '',
    startDate: '',
    endDate: '',
    budget: '',
    targetAudience: '',
    description: '',
    objectives: '',
    manager: '',
    platform: '',
    creatives: '',
  })

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newCampaign: Campaign = {
      id: `CAMP-2024-${String(campaigns.length + 1).padStart(3, '0')}`,
      ...formData,
      spent: '₹0',
      leads: 0,
      conversions: 0,
      roi: '-',
      status: 'Planned',
    }
    setCampaigns([...campaigns, newCampaign])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditCampaign = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCampaign) return
    
    setCampaigns(campaigns.map(c => 
      c.id === selectedCampaign.id 
        ? { ...c, ...formData }
        : c
    ))
    setShowEditModal(false)
    setSelectedCampaign(null)
    resetForm()
  }

  const handleDeleteCampaign = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id))
    }
  }

  const handleViewCampaign = (campaign: Campaign) => {
    router.push(`/marketing/campaigns/${campaign.id}`)
  }

  const handleEditClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setFormData({
      campaignName: campaign.campaignName,
      type: campaign.type,
      channel: campaign.channel,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      budget: campaign.budget,
      targetAudience: campaign.targetAudience || '',
      description: campaign.description || '',
      objectives: campaign.objectives || '',
      manager: campaign.manager || '',
      platform: campaign.platform || '',
      creatives: campaign.creatives || '',
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      campaignName: '',
      type: 'Digital',
      channel: '',
      startDate: '',
      endDate: '',
      budget: '',
      targetAudience: '',
      description: '',
      objectives: '',
      manager: '',
      platform: '',
      creatives: '',
    })
  }

  const handleExport = () => {
    const csv = [
      ['Campaign ID', 'Name', 'Type', 'Channel', 'Start Date', 'End Date', 'Budget', 'Spent', 'Leads', 'Conversions', 'ROI', 'Status'].join(','),
      ...filteredCampaigns.map(c => 
        [c.id, c.campaignName, c.type, c.channel, c.startDate, c.endDate, c.budget, c.spent, c.leads, c.conversions, c.roi, c.status].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'campaigns-report.csv'
    a.click()
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.channel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalCampaigns = 45
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length
  const totalBudget = '₹45 L'
  const avgROI = '320%'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-sm text-gray-600 mt-1">Plan and track marketing campaigns</p>
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
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Campaigns</p>
          <h3 className="text-3xl font-bold text-gray-900">{totalCampaigns}</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Campaigns</p>
          <h3 className="text-3xl font-bold text-green-600">{activeCampaigns}</h3>
          <p className="text-xs text-gray-500 mt-2">Currently running</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Budget</p>
          <h3 className="text-2xl font-bold text-blue-600">{totalBudget}</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. ROI</p>
          <h3 className="text-3xl font-bold text-orange-600">{avgROI}</h3>
          <p className="text-xs text-green-600 mt-2">Above target</p>
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
                  placeholder="Search campaigns..."
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
                      {['Active', 'Planned', 'Completed', 'Paused', 'Cancelled'].map(status => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.campaignName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{new Date(campaign.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    <div className="text-xs text-gray-500">{new Date(campaign.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">{campaign.spent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.leads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{campaign.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{campaign.roi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                      campaign.status === 'Planned' ? 'bg-blue-100 text-blue-700' :
                      campaign.status === 'Completed' ? 'bg-purple-100 text-purple-700' :
                      campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleViewCampaign(campaign)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(campaign)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCampaign(campaign.id)}
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

      {/* Add Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900">Create New Campaign</h2>
              <button 
                onClick={() => { setShowAddModal(false); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddCampaign} className="p-6 space-y-6">
              {/* Campaign Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.campaignName}
                      onChange={(e) => setFormData({...formData, campaignName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Gomti Nagar Housing - Diwali Offer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {campaignTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Channel <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.channel}
                      onChange={(e) => setFormData({...formData, channel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Social Media, Google Ads"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform/Medium
                    </label>
                    <input
                      type="text"
                      value={formData.platform}
                      onChange={(e) => setFormData({...formData, platform: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Facebook, Instagram, Google Ads"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Manager
                    </label>
                    <input
                      type="text"
                      value={formData.manager}
                      onChange={(e) => setFormData({...formData, manager: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Priya Sharma"
                    />
                  </div>
                </div>
              </div>

              {/* Campaign Duration & Budget */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration & Budget</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="₹5,00,000"
                    />
                  </div>
                </div>
              </div>

              {/* Campaign Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Families, Age 30-50, Income 10L+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter campaign description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Objectives
                    </label>
                    <textarea
                      value={formData.objectives}
                      onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Generate 100 qualified leads, Achieve 25 conversions"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Creatives/Materials
                    </label>
                    <input
                      type="text"
                      value={formData.creatives}
                      onChange={(e) => setFormData({...formData, creatives: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Video ads, Banner ads, Social media posts"
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
                  Create Campaign
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
              <h2 className="text-xl font-bold text-gray-900">Edit Campaign</h2>
              <button 
                onClick={() => { setShowEditModal(false); setSelectedCampaign(null); resetForm() }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditCampaign} className="p-6 space-y-6">
              {/* Same form structure as Add Modal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.campaignName}
                      onChange={(e) => setFormData({...formData, campaignName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {campaignTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Channel <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.channel}
                      onChange={(e) => setFormData({...formData, channel: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform/Medium</label>
                    <input
                      type="text"
                      value={formData.platform}
                      onChange={(e) => setFormData({...formData, platform: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Manager</label>
                    <input
                      type="text"
                      value={formData.manager}
                      onChange={(e) => setFormData({...formData, manager: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration & Budget</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objectives</label>
                    <textarea
                      value={formData.objectives}
                      onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Creatives/Materials</label>
                    <input
                      type="text"
                      value={formData.creatives}
                      onChange={(e) => setFormData({...formData, creatives: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setSelectedCampaign(null); resetForm() }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Update Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}