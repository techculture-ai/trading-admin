'use client'

import { Wrench, Package, TrendingUp, AlertTriangle, FileText, Truck } from 'lucide-react'
import Link from 'next/link'

export default function EngineeringStorePage() {
  const stats = [
    { title: 'Total Materials', value: '856', change: '+34', icon: Package, color: 'blue' },
    { title: 'Stock Value', value: '₹2.5 Cr', change: '+₹0.3 Cr', icon: TrendingUp, color: 'green' },
    { title: 'Critical Items', value: '15', change: '-3', icon: AlertTriangle, color: 'orange' },
    { title: 'Pending Issues', value: '8', change: '-2', icon: Wrench, color: 'red' },
  ]

  const quickActions = [
    { title: 'Material Master', href: '/engineering-store/material-master', icon: Package },
    { title: 'Issue Tracking', href: '/engineering-store/issue-tracking', icon: Wrench },
  ]

  const recentActivities = [
    { id: 1, type: 'Material In', item: 'Cement - OPC 53 Grade', quantity: '500 bags', date: '1 hour ago', status: 'Received' },
    { id: 2, type: 'Material Issue', item: 'Steel Bars - 12mm', quantity: '250 pcs', date: '3 hours ago', status: 'Issued' },
    { id: 3, type: 'Quality Test', item: 'Concrete Cubes', quantity: '15 samples', date: '5 hours ago', status: 'Testing' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Engineering Store Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage construction materials, quality testing, and site issuances</p>
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

      {/* Material Categories */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Material Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Cement</p>
            <p className="text-2xl font-bold text-gray-900">2,500</p>
            <p className="text-xs text-gray-500 mt-1">Bags</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Steel</p>
            <p className="text-2xl font-bold text-gray-900">850</p>
            <p className="text-xs text-gray-500 mt-1">Tons</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Aggregates</p>
            <p className="text-2xl font-bold text-gray-900">1,200</p>
            <p className="text-xs text-gray-500 mt-1">Cu.M.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Others</p>
            <p className="text-2xl font-bold text-gray-900">456</p>
            <p className="text-xs text-gray-500 mt-1">Items</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'Material In' ? 'bg-green-100' :
                  activity.type === 'Material Issue' ? 'bg-blue-100' : 'bg-orange-100'
                }`}>
                  {activity.type === 'Material In' ? <Truck size={20} className="text-green-600" /> :
                   activity.type === 'Material Issue' ? <Package size={20} className="text-blue-600" /> :
                   <FileText size={20} className="text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-xs text-gray-500">{activity.item} • {activity.quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-xs text-gray-500">{activity.date}</span>
                <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}