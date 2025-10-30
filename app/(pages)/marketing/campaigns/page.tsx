'use client'

import { Search, Plus, Filter, Download, Megaphone } from 'lucide-react'

const campaigns = [
  {
    id: 'CAMP-2024-001',
    campaignName: 'Gomti Nagar Housing - Diwali Offer',
    type: 'Digital',
    channel: 'Social Media, Google Ads',
    startDate: '01 Oct 2024',
    endDate: '31 Oct 2024',
    budget: '₹5,00,000',
    spent: '₹3,50,000',
    leads: 89,
    conversions: 23,
    roi: '340%',
    status: 'Active',
  },
  {
    id: 'CAMP-2024-002',
    campaignName: 'Hazratganj Commercial - Print Campaign',
    type: 'Print Media',
    channel: 'Newspapers, Magazines',
    startDate: '15 Oct 2024',
    endDate: '15 Nov 2024',
    budget: '₹3,00,000',
    spent: '₹2,10,000',
    leads: 45,
    conversions: 12,
    roi: '280%',
    status: 'Active',
  },
  {
    id: 'CAMP-2024-003',
    campaignName: 'Property Expo 2024',
    type: 'Event',
    channel: 'Exhibition',
    startDate: '05 Nov 2024',
    endDate: '07 Nov 2024',
    budget: '₹8,00,000',
    spent: '₹2,00,000',
    leads: 12,
    conversions: 3,
    roi: '-',
    status: 'Planned',
  },
]

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-sm text-gray-600 mt-1">Plan and track marketing campaigns</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus size={20} />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Campaigns</p>
          <h3 className="text-3xl font-bold text-gray-900">45</h3>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Active Campaigns</p>
          <h3 className="text-3xl font-bold text-green-600">12</h3>
          <p className="text-xs text-gray-500 mt-2">Currently running</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total Budget</p>
          <h3 className="text-2xl font-bold text-blue-600">₹45 L</h3>
          <p className="text-xs text-gray-500 mt-2">This year</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Avg. ROI</p>
          <h3 className="text-3xl font-bold text-orange-600">320%</h3>
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
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.campaignName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{campaign.startDate}</div>
                    <div className="text-xs text-gray-500">{campaign.endDate}</div>
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
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status}
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