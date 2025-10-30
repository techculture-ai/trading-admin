'use client'

import { Building2, FileText, CheckCircle, DollarSign, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export default function ConstructionPage() {
  const stats = [
    { title: 'Active Projects', value: '28', change: '+3', icon: Building2, color: 'blue' },
    { title: 'Total Contractors', value: '45', change: '+5', icon: Users, color: 'green' },
    { title: 'Pending Bills', value: '23', change: '-8', icon: DollarSign, color: 'orange' },
    { title: 'Quality Tests', value: '156', change: '+12', icon: CheckCircle, color: 'purple' },
  ]

  const quickActions = [
    { title: 'Project & Contracts', href: '/construction/project-contracts', icon: FileText },
    { title: 'Site Progress', href: '/construction/site-progress', icon: Building2 },
    { title: 'Quality Assurance', href: '/construction/quality-assurance', icon: CheckCircle },
    { title: 'Bill Processing', href: '/construction/bill-processing', icon: DollarSign },
  ]

  const ongoingProjects = [
    { id: 1, name: 'Gomti Nagar Housing Scheme', contractor: 'ABC Builders Ltd.', progress: '65%', status: 'On Track' },
    { id: 2, name: 'Hazratganj Commercial Complex', contractor: 'XYZ Construction', progress: '42%', status: 'Delayed' },
    { id: 3, name: 'Aliganj Residential Project', contractor: 'PQR Developers', progress: '78%', status: 'On Track' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Construction Management</h1>
        <p className="text-sm text-gray-600 mt-1">Monitor and manage construction projects, contractors, and quality</p>
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

      {/* Ongoing Projects */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ongoing Projects</h2>
        <div className="space-y-3">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Building2 size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{project.name}</p>
                  <p className="text-xs text-gray-500">{project.contractor}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{project.progress}</p>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: project.progress }}></div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  project.status === 'On Track' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}