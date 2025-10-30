'use client'

import { MapPin, FileText, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function LandAcquisitionPage() {
  const stats = [
    { title: 'Total Land Parcels', value: '156', change: '+12', icon: MapPin, color: 'blue' },
    { title: 'Total Area', value: '342 acres', change: '+23 acres', icon: MapPin, color: 'green' },
    { title: 'Compensation Paid', value: '₹12.5 Cr', change: '+₹2.3 Cr', icon: DollarSign, color: 'orange' },
    { title: 'Pending Acquisitions', value: '23', change: '-5', icon: Clock, color: 'yellow' },
  ]

  const quickActions = [
    { title: 'Parcel Registry', href: '/land-acquisition/parcel-registry', icon: FileText },
    { title: 'Acquisition Workflows', href: '/land-acquisition/acquisition-workflows', icon: CheckCircle },
    { title: 'Compensation & Payment', href: '/land-acquisition/compensation-payment', icon: DollarSign },
    { title: 'Land Valuation', href: '/land-acquisition/land-valuation', icon: AlertCircle },
    { title: 'GIS View', href: '/land-acquisition/gis-view', icon: MapPin },
  ]

  const recentActivities = [
    { id: 1, action: 'New parcel added', parcel: 'PAR-156', date: '2 hours ago', status: 'success' },
    { id: 2, action: 'Compensation approved', parcel: 'PAR-145', date: '5 hours ago', status: 'success' },
    { id: 3, action: 'Valuation pending', parcel: 'PAR-134', date: '1 day ago', status: 'warning' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Land Acquisition Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage land parcels, acquisitions, and compensation</p>
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
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

      {/* Recent Activities */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.parcel}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}