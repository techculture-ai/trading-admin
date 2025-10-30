'use client'

import { ClipboardList, FileText, Calculator, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function PlanningPage() {
  const stats = [
    { title: 'Active Projects', value: '45', change: '+5', icon: ClipboardList, color: 'blue' },
    { title: 'DPRs Approved', value: '34', change: '+8', icon: CheckCircle, color: 'green' },
    { title: 'Pending Clearances', value: '12', change: '-3', icon: Clock, color: 'orange' },
    { title: 'Total Budget', value: '₹125 Cr', change: '+₹15 Cr', icon: Calculator, color: 'purple' },
  ]

  const quickActions = [
    { title: 'Project Master', href: '/planning/project-master', icon: ClipboardList },
    { title: 'DPR & Design', href: '/planning/dpr-design', icon: FileText },
    { title: 'Resource Estimation', href: '/planning/resource-estimation', icon: Calculator },
    { title: 'Clearances & NOCs', href: '/planning/clearances', icon: CheckCircle },
  ]

  const recentProjects = [
    { id: 1, name: 'Gomti Nagar Housing Scheme', dpr: 'DPR-2024-045', status: 'DPR Approved', date: '2 days ago' },
    { id: 2, name: 'Hazratganj Commercial Complex', dpr: 'DPR-2024-046', status: 'Under Review', date: '5 days ago' },
    { id: 3, name: 'Aliganj Residential Project', dpr: 'DPR-2024-047', status: 'Pending Clearance', date: '1 week ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Planning Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage project planning, DPR approvals, and resource estimation</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Recent Projects */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h2>
        <div className="space-y-3">
          {recentProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ClipboardList size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{project.name}</p>
                  <p className="text-xs text-gray-500">{project.dpr}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{project.status}</span>
                <p className="text-xs text-gray-500 mt-1">{project.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}