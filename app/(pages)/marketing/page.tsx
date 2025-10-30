'use client'

import { Megaphone, Users, TrendingUp, Target, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function MarketingPage() {
  const stats = [
    { title: 'Active Campaigns', value: '12', change: '+3', icon: Megaphone, color: 'blue' },
    { title: 'Total Leads', value: '456', change: '+45', icon: Users, color: 'green' },
    { title: 'Conversion Rate', value: '32%', change: '+5%', icon: TrendingUp, color: 'orange' },
    { title: 'Site Visits', value: '234', change: '+23', icon: Target, color: 'purple' },
  ]

  const quickActions = [
    { title: 'Campaigns', href: '/marketing/campaigns', icon: Megaphone },
    { title: 'Lead Management', href: '/marketing/leads', icon: Users },
  ]

  const recentLeads = [
    { id: 1, name: 'Rajesh Kumar', interest: '3BHK - Gomti Nagar', source: 'Website', date: '2 hours ago', status: 'Hot' },
    { id: 2, name: 'Priya Sharma', interest: '2BHK - Hazratganj', source: 'Walk-in', date: '5 hours ago', status: 'Warm' },
    { id: 3, name: 'Amit Singh', interest: 'Plot - Aliganj', source: 'Referral', date: '1 day ago', status: 'Cold' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Marketing Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage marketing campaigns, leads, and customer engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-green-600 mt-2">{stat.change} this month</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <stat.icon size={24} className="text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all"
            >
              <action.icon size={32} className="text-orange-500 mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">{action.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Digital Campaigns</p>
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-xs text-gray-500 mt-1">Active campaigns</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Print Media</p>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-500 mt-1">Active campaigns</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Events</p>
            <p className="text-2xl font-bold text-gray-900">1</p>
            <p className="text-xs text-gray-500 mt-1">Upcoming</p>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h2>
        <div className="space-y-3">
          {recentLeads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.interest} • Source: {lead.source}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-xs text-gray-500">{lead.date}</span>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  lead.status === 'Hot' ? 'bg-red-100 text-red-700' :
                  lead.status === 'Warm' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {lead.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}