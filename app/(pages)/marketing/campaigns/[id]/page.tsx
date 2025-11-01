'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Megaphone, Calendar, User, TrendingUp, FileText, CheckCircle, Clock, AlertCircle, DollarSign, Share2, Printer, Edit, BarChart3, Target, Users } from 'lucide-react'

interface CampaignDetails {
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
  targetAudience: string
  description: string
  objectives: string
  manager: string
  platform: string
  creatives: string
  campaignMetrics: {
    impressions: number
    clicks: number
    ctr: string
    cpc: string
    cpl: string
    conversionRate: string
    engagement: number
  }
  performanceByChannel: {
    channel: string
    budget: string
    spent: string
    leads: number
    conversions: number
    roi: string
  }[]
  leadsBySource: {
    source: string
    leads: number
    conversions: number
    conversionRate: string
  }[]
  timeline: {
    date: string
    event: string
    details: string
    status: string
  }[]
  expenses: {
    date: string
    category: string
    description: string
    amount: string
    approvedBy: string
  }[]
  creativeAssets: {
    name: string
    type: string
    uploadedDate: string
    uploadedBy: string
    status: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function CampaignDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [campaign] = useState<CampaignDetails>({
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
    targetAudience: 'Families, Age 30-50, Income 10L+, Located in Lucknow & NCR',
    description: 'Special Diwali promotional campaign for premium housing units in Gomti Nagar. Targeting affluent families looking for luxury apartments with festive discounts and offers. Campaign includes digital marketing across social media platforms and Google search network.',
    objectives: 'Generate 100 qualified leads, Achieve 25 conversions, Increase brand awareness by 40%, Build email database of 500+ prospects',
    manager: 'Priya Sharma',
    platform: 'Facebook, Instagram, Google Ads, YouTube',
    creatives: 'Video ads (15s, 30s), Banner ads (5 sizes), Social media posts, Landing page, Email templates',
    campaignMetrics: {
      impressions: 450000,
      clicks: 12500,
      ctr: '2.78%',
      cpc: '₹28',
      cpl: '₹3,933',
      conversionRate: '25.84%',
      engagement: 8900,
    },
    performanceByChannel: [
      {
        channel: 'Facebook Ads',
        budget: '₹2,00,000',
        spent: '₹1,50,000',
        leads: 45,
        conversions: 12,
        roi: '320%',
      },
      {
        channel: 'Instagram Ads',
        budget: '₹1,50,000',
        spent: '₹1,10,000',
        leads: 28,
        conversions: 7,
        roi: '290%',
      },
      {
        channel: 'Google Ads',
        budget: '₹1,00,000',
        spent: '₹65,000',
        leads: 12,
        conversions: 3,
        roi: '420%',
      },
      {
        channel: 'YouTube Ads',
        budget: '₹50,000',
        spent: '₹25,000',
        leads: 4,
        conversions: 1,
        roi: '380%',
      },
    ],
    leadsBySource: [
      {
        source: 'Facebook Lead Forms',
        leads: 35,
        conversions: 10,
        conversionRate: '28.57%',
      },
      {
        source: 'Instagram Stories',
        leads: 22,
        conversions: 6,
        conversionRate: '27.27%',
      },
      {
        source: 'Google Search Ads',
        leads: 18,
        conversions: 5,
        conversionRate: '27.78%',
      },
      {
        source: 'Website Landing Page',
        leads: 14,
        conversions: 2,
        conversionRate: '14.29%',
      },
    ],
    timeline: [
      {
        date: '2024-10-28',
        event: 'Performance Review',
        details: 'Mid-campaign performance review conducted. All channels performing above target.',
        status: 'Completed',
      },
      {
        date: '2024-10-20',
        event: 'Creative Refresh',
        details: 'New creative variants launched based on initial performance data.',
        status: 'Completed',
      },
      {
        date: '2024-10-15',
        event: 'Budget Optimization',
        details: 'Budget reallocated to better performing channels.',
        status: 'Completed',
      },
      {
        date: '2024-10-10',
        event: 'Campaign Review',
        details: 'First week performance review. Initial results positive.',
        status: 'Completed',
      },
      {
        date: '2024-10-05',
        event: 'A/B Testing Started',
        details: 'Started A/B testing for ad creatives and landing pages.',
        status: 'Completed',
      },
      {
        date: '2024-10-01',
        event: 'Campaign Launch',
        details: 'Campaign officially launched across all digital platforms.',
        status: 'Completed',
      },
    ],
    expenses: [
      {
        date: '2024-10-25',
        category: 'Ad Spend',
        description: 'Facebook & Instagram Ads - Week 4',
        amount: '₹85,000',
        approvedBy: 'Priya Sharma',
      },
      {
        date: '2024-10-20',
        category: 'Creative Production',
        description: 'New video ad variants',
        amount: '₹25,000',
        approvedBy: 'Priya Sharma',
      },
      {
        date: '2024-10-18',
        category: 'Ad Spend',
        description: 'Google Ads - Week 3',
        amount: '₹45,000',
        approvedBy: 'Priya Sharma',
      },
      {
        date: '2024-10-12',
        category: 'Ad Spend',
        description: 'Social Media Ads - Week 2',
        amount: '₹90,000',
        approvedBy: 'Priya Sharma',
      },
      {
        date: '2024-10-05',
        category: 'Ad Spend',
        description: 'Initial Ad Launch - All Platforms',
        amount: '₹75,000',
        approvedBy: 'Priya Sharma',
      },
      {
        date: '2024-09-28',
        category: 'Setup & Creative',
        description: 'Landing page development & initial creatives',
        amount: '₹30,000',
        approvedBy: 'Priya Sharma',
      },
    ],
    creativeAssets: [
      {
        name: 'Diwali_Video_15s.mp4',
        type: 'Video Ad',
        uploadedDate: '2024-09-28',
        uploadedBy: 'Creative Team',
        status: 'Active',
      },
      {
        name: 'Diwali_Video_30s.mp4',
        type: 'Video Ad',
        uploadedDate: '2024-09-28',
        uploadedBy: 'Creative Team',
        status: 'Active',
      },
      {
        name: 'Banner_1200x628.jpg',
        type: 'Image Ad',
        uploadedDate: '2024-09-28',
        uploadedBy: 'Creative Team',
        status: 'Active',
      },
      {
        name: 'Banner_1080x1080.jpg',
        type: 'Image Ad',
        uploadedDate: '2024-09-28',
        uploadedBy: 'Creative Team',
        status: 'Active',
      },
      {
        name: 'Landing_Page_Template.html',
        type: 'Landing Page',
        uploadedDate: '2024-09-28',
        uploadedBy: 'Web Team',
        status: 'Active',
      },
      {
        name: 'Email_Template_v1.html',
        type: 'Email',
        uploadedDate: '2024-09-28',
        uploadedBy: 'Marketing Team',
        status: 'Active',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-28 14:30:00',
      action: 'Performance Review',
      performedBy: 'Priya Sharma',
      details: 'Mid-campaign performance review conducted',
    },
    {
      id: 'AL-002',
      timestamp: '2024-10-20 11:00:00',
      action: 'Creative Updated',
      performedBy: 'Creative Team',
      details: 'New video ad variants uploaded and launched',
    },
    {
      id: 'AL-003',
      timestamp: '2024-10-15 16:00:00',
      action: 'Budget Adjusted',
      performedBy: 'Priya Sharma',
      details: 'Budget reallocated across channels based on performance',
    },
    {
      id: 'AL-004',
      timestamp: '2024-10-10 10:00:00',
      action: 'Weekly Review',
      performedBy: 'Priya Sharma',
      details: 'First week performance review completed',
    },
    {
      id: 'AL-005',
      timestamp: '2024-10-01 09:00:00',
      action: 'Campaign Launched',
      performedBy: 'Priya Sharma',
      details: 'Campaign officially launched across all platforms',
    },
  ])

  const handleExport = () => {
    const content = `
CAMPAIGN PERFORMANCE REPORT
===========================

Campaign ID: ${campaign.id}
Campaign Name: ${campaign.campaignName}
Status: ${campaign.status}

CAMPAIGN OVERVIEW
=================
Type: ${campaign.type}
Channel: ${campaign.channel}
Platform: ${campaign.platform}
Start Date: ${new Date(campaign.startDate).toLocaleDateString('en-IN')}
End Date: ${new Date(campaign.endDate).toLocaleDateString('en-IN')}
Campaign Manager: ${campaign.manager}

BUDGET & SPEND
==============
Total Budget: ${campaign.budget}
Amount Spent: ${campaign.spent}
Remaining: ₹${(parseFloat(campaign.budget.replace(/[^0-9]/g, '')) - parseFloat(campaign.spent.replace(/[^0-9]/g, ''))).toLocaleString('en-IN')}

PERFORMANCE METRICS
===================
Total Leads: ${campaign.leads}
Conversions: ${campaign.conversions}
Conversion Rate: ${campaign.campaignMetrics.conversionRate}
ROI: ${campaign.roi}
Impressions: ${campaign.campaignMetrics.impressions.toLocaleString('en-IN')}
Clicks: ${campaign.campaignMetrics.clicks.toLocaleString('en-IN')}
CTR: ${campaign.campaignMetrics.ctr}
CPC: ${campaign.campaignMetrics.cpc}
CPL: ${campaign.campaignMetrics.cpl}
Engagement: ${campaign.campaignMetrics.engagement.toLocaleString('en-IN')}

TARGET AUDIENCE
===============
${campaign.targetAudience}

CAMPAIGN OBJECTIVES
===================
${campaign.objectives}

PERFORMANCE BY CHANNEL
======================
${campaign.performanceByChannel.map(p => `${p.channel}:\n   Budget: ${p.budget}\n   Spent: ${p.spent}\n   Leads: ${p.leads}\n   Conversions: ${p.conversions}\n   ROI: ${p.roi}`).join('\n\n')}

LEADS BY SOURCE
===============
${campaign.leadsBySource.map(l => `${l.source}:\n   Leads: ${l.leads}\n   Conversions: ${l.conversions}\n   Conversion Rate: ${l.conversionRate}`).join('\n\n')}

CAMPAIGN DESCRIPTION
====================
${campaign.description}

CREATIVE ASSETS
===============
${campaign.creativeAssets.map(c => `${c.name} (${c.type})\n   Uploaded: ${c.uploadedDate} by ${c.uploadedBy}\n   Status: ${c.status}`).join('\n\n')}

EXPENSES
========
${campaign.expenses.map(e => `${e.date} - ${e.category}\n   ${e.description}\n   Amount: ${e.amount}\n   Approved By: ${e.approvedBy}`).join('\n\n')}

TIMELINE
========
${campaign.timeline.map(t => `${t.date} - ${t.event}\n   ${t.details}\n   Status: ${t.status}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Campaign_${campaign.id}_Report.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Completed':
        return 'bg-blue-100 text-blue-700'
      case 'Planned':
        return 'bg-purple-100 text-purple-700'
      case 'Paused':
        return 'bg-yellow-100 text-yellow-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Completed':
        return <CheckCircle size={40} className="text-blue-600" />
      case 'Planned':
        return <Clock size={40} className="text-purple-600" />
      case 'Paused':
        return <Clock size={40} className="text-yellow-600" />
      case 'Cancelled':
        return <AlertCircle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const budgetRemaining = parseFloat(campaign.budget.replace(/[^0-9]/g, '')) - parseFloat(campaign.spent.replace(/[^0-9]/g, ''))
  const budgetUtilization = ((parseFloat(campaign.spent.replace(/[^0-9]/g, '')) / parseFloat(campaign.budget.replace(/[^0-9]/g, ''))) * 100).toFixed(1)
  
  const campaignDuration = Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24))
  const daysRemaining = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const totalExpenses = campaign.expenses.reduce((sum, e) => 
    sum + parseFloat(e.amount.replace(/[^0-9]/g, '')), 0
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.campaignName}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {campaign.type} Campaign • {campaign.channel}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Status Card */}
      <div className={`rounded-lg p-8 text-white ${
        campaign.status === 'Active' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        campaign.status === 'Completed' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        campaign.status === 'Planned' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
        campaign.status === 'Paused' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              campaign.status === 'Active' ? 'text-green-100' :
              campaign.status === 'Completed' ? 'text-blue-100' :
              campaign.status === 'Planned' ? 'text-purple-100' :
              campaign.status === 'Paused' ? 'text-yellow-100' :
              'text-red-100'
            }`}>
              Campaign Status
            </p>
            <h2 className="text-4xl font-bold">{campaign.status}</h2>
            <p className={`text-sm mt-2 ${
              campaign.status === 'Active' ? 'text-green-100' :
              campaign.status === 'Completed' ? 'text-blue-100' :
              campaign.status === 'Planned' ? 'text-purple-100' :
              campaign.status === 'Paused' ? 'text-yellow-100' :
              'text-red-100'
            }`}>
              ROI: {campaign.roi} • {campaign.leads} Leads • {campaign.conversions} Conversions
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(campaign.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Leads</p>
              <h3 className="text-2xl font-bold text-gray-900">{campaign.leads}</h3>
              <p className="text-xs text-gray-500 mt-2">Generated</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Conversions</p>
              <h3 className="text-2xl font-bold text-green-600">{campaign.conversions}</h3>
              <p className="text-xs text-gray-500 mt-2">{campaign.campaignMetrics.conversionRate} rate</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">ROI</p>
              <h3 className="text-2xl font-bold text-orange-600">{campaign.roi}</h3>
              <p className="text-xs text-gray-500 mt-2">Return on investment</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Days Remaining</p>
              <h3 className="text-2xl font-bold text-purple-600">{daysRemaining > 0 ? daysRemaining : 0}</h3>
              <p className="text-xs text-gray-500 mt-2">of {campaignDuration} days</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Megaphone size={20} className="mr-2" />
          Campaign Overview
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Campaign ID</p>
            <p className="text-sm font-medium text-gray-900">{campaign.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Campaign Type</p>
            <p className="text-sm font-medium text-gray-900">{campaign.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Channel</p>
            <p className="text-sm font-medium text-gray-900">{campaign.channel}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Campaign Manager</p>
            <p className="text-sm font-medium text-gray-900">{campaign.manager}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Start Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(campaign.startDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">End Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(campaign.endDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Duration</p>
            <p className="text-sm font-medium text-gray-900">{campaignDuration} days</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
          </div>
          <div className="col-span-4">
            <p className="text-xs text-gray-500 mb-1">Platform</p>
            <p className="text-sm font-medium text-gray-900">{campaign.platform}</p>
          </div>
        </div>
      </div>

      {/* Budget & Spend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign size={20} className="mr-2" />
          Budget & Spend
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 mb-2">Total Budget</p>
              <p className="text-2xl font-bold text-blue-900">{campaign.budget}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-xs text-orange-700 mb-2">Amount Spent</p>
              <p className="text-2xl font-bold text-orange-900">{campaign.spent}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 mb-2">Remaining</p>
              <p className="text-2xl font-bold text-green-900">₹{budgetRemaining.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Budget Utilization</span>
              <span className="font-medium text-gray-900">{budgetUtilization}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${budgetUtilization}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 size={20} className="mr-2" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Impressions</p>
            <p className="text-xl font-bold text-gray-900">{campaign.campaignMetrics.impressions.toLocaleString('en-IN')}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Clicks</p>
            <p className="text-xl font-bold text-gray-900">{campaign.campaignMetrics.clicks.toLocaleString('en-IN')}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">CTR</p>
            <p className="text-xl font-bold text-blue-600">{campaign.campaignMetrics.ctr}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Engagement</p>
            <p className="text-xl font-bold text-gray-900">{campaign.campaignMetrics.engagement.toLocaleString('en-IN')}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">CPC</p>
            <p className="text-xl font-bold text-gray-900">{campaign.campaignMetrics.cpc}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">CPL</p>
            <p className="text-xl font-bold text-gray-900">{campaign.campaignMetrics.cpl}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Conversion Rate</p>
            <p className="text-xl font-bold text-green-600">{campaign.campaignMetrics.conversionRate}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">ROI</p>
            <p className="text-xl font-bold text-orange-600">{campaign.roi}</p>
          </div>
        </div>
      </div>

      {/* Performance by Channel */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Performance by Channel</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaign.performanceByChannel.map((channel, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{channel.channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{channel.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">{channel.spent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{channel.leads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{channel.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{channel.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leads by Source */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Leads by Source</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaign.leadsBySource.map((source, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{source.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{source.leads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{source.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">{source.conversionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Target Audience */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target size={20} className="mr-2" />
          Target Audience
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 border border-blue-200 rounded-lg p-4">
          {campaign.targetAudience}
        </p>
      </div>

      {/* Campaign Objectives */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Objectives</h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-green-50 border border-green-200 rounded-lg p-4">
          {campaign.objectives}
        </p>
      </div>

      {/* Campaign Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Campaign Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {campaign.description}
        </p>
      </div>

      {/* Creative Assets */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText size={20} className="mr-2" />
            Creative Assets ({campaign.creativeAssets.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {campaign.creativeAssets.map((asset, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {asset.type} • Uploaded: {new Date(asset.uploadedDate).toLocaleDateString('en-IN')} by {asset.uploadedBy}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  asset.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {asset.status}
                </span>
                <button className="text-orange-600 hover:text-orange-700">
                  <Download size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Expenses */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Expenses (Total: ₹{totalExpenses.toLocaleString('en-IN')})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approved By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaign.expenses.map((expense, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(expense.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{expense.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{expense.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{expense.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Campaign Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaign.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== campaign.timeline.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        <Calendar size={12} className="inline mr-1" />
                        {new Date(event.date).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Activity Log
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {auditLogs.map((log, index) => (
              <div key={log.id} className="flex items-start space-x-4 relative">
                {index !== auditLogs.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        By {log.performedBy} • {new Date(log.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-5 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Campaign ID</p>
            <p className="text-lg font-bold text-gray-900">{campaign.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Leads</p>
            <p className="text-lg font-bold text-blue-600">{campaign.leads}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Conversions</p>
            <p className="text-lg font-bold text-green-600">{campaign.conversions}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">ROI</p>
            <p className="text-lg font-bold text-orange-600">{campaign.roi}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              campaign.status === 'Active' ? 'text-green-600' :
              campaign.status === 'Completed' ? 'text-blue-600' :
              campaign.status === 'Planned' ? 'text-purple-600' :
              campaign.status === 'Paused' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {campaign.status}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button 
          onClick={handleExport}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Download Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Campaign</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print</span>
        </button>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Campaigns</span>
        </button>
      </div>
    </div>
  )
}