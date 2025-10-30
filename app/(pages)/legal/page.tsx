'use client'

import { Scale, FileText, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function LegalPage() {
  const stats = [
    { title: 'Total Cases', value: '156', change: '+12', icon: Scale, color: 'blue' },
    { title: 'Active Cases', value: '45', change: '-5', icon: FileText, color: 'orange' },
    { title: 'Cases Won', value: '89', change: '+8', icon: CheckCircle, color: 'green' },
    { title: 'Pending Hearings', value: '23', change: '+3', icon: Clock, color: 'red' },
  ]

  const quickActions = [
    { title: 'Case Registry', href: '/legal/case-registry', icon: Scale },
    { title: 'Hearing Calendar', href: '/legal/hearings', icon: Clock },
  ]

  const upcomingHearings = [
    { id: 1, caseNo: 'CIV/2024/045', parties: 'ULB vs ABC Contractor', court: 'District Court', date: '28 Oct 2024', time: '10:30 AM' },
    { id: 2, caseNo: 'LAND/2024/023', parties: 'Land Acquisition - Plot 456', court: 'High Court', date: '30 Oct 2024', time: '02:00 PM' },
    { id: 3, caseNo: 'ARB/2024/012', parties: 'Arbitration - XYZ Developers', court: 'Arbitration Tribunal', date: '05 Nov 2024', time: '11:00 AM' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Legal Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage legal cases, litigation, and compliance matters</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-green-600 mt-2">{stat.change} this year</p>
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

      {/* Case Statistics */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Case Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Civil Cases</p>
            <p className="text-2xl font-bold text-gray-900">67</p>
            <p className="text-xs text-gray-500 mt-1">43% of total</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Land Disputes</p>
            <p className="text-2xl font-bold text-gray-900">45</p>
            <p className="text-xs text-gray-500 mt-1">29% of total</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Arbitration</p>
            <p className="text-2xl font-bold text-gray-900">28</p>
            <p className="text-xs text-gray-500 mt-1">18% of total</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Contract Disputes</p>
            <p className="text-2xl font-bold text-gray-900">16</p>
            <p className="text-xs text-gray-500 mt-1">10% of total</p>
          </div>
        </div>
      </div>

      {/* Upcoming Hearings */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Hearings</h2>
        <div className="space-y-3">
          {upcomingHearings.map((hearing) => (
            <div key={hearing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Scale size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{hearing.caseNo}</p>
                  <p className="text-xs text-gray-500">{hearing.parties} • {hearing.court}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{hearing.date}</p>
                <p className="text-xs text-gray-500">{hearing.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}