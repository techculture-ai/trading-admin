'use client'

import { FileText, Clock, CheckCircle, AlertCircle, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function RTIPage() {
  const stats = [
    { title: 'Total Applications', value: '234', change: '+23', icon: FileText, color: 'blue' },
    { title: 'Pending', value: '45', change: '-8', icon: Clock, color: 'orange' },
    { title: 'Responded', value: '189', change: '+31', icon: CheckCircle, color: 'green' },
    { title: 'Overdue', value: '8', change: '-2', icon: AlertCircle, color: 'red' },
  ]

  const quickActions = [
    { title: 'Applications', href: '/rti/applications', icon: FileText },
    { title: 'Responses', href: '/rti/responses', icon: CheckCircle },
  ]

  const recentApplications = [
    { id: 1, appNo: 'RTI/2024/234', applicant: 'Rajesh Kumar', subject: 'Land Acquisition Details', date: '25 Oct 2024', status: 'Pending', sla: '5 days left' },
    { id: 2, appNo: 'RTI/2024/233', applicant: 'Priya Sharma', subject: 'Tender Information', date: '23 Oct 2024', status: 'Responded', sla: 'Completed' },
    { id: 3, appNo: 'RTI/2024/232', applicant: 'Amit Singh', subject: 'Budget Allocation', date: '20 Oct 2024', status: 'Overdue', sla: '2 days overdue' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">RTI Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage Right to Information applications and responses</p>
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

      {/* SLA Compliance */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">SLA Compliance (30 Days)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Within SLA</p>
            <p className="text-2xl font-bold text-green-600">189</p>
            <p className="text-xs text-gray-500 mt-1">81% compliance</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Due Soon (7 days)</p>
            <p className="text-2xl font-bold text-orange-600">45</p>
            <p className="text-xs text-gray-500 mt-1">Needs action</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Overdue</p>
            <p className="text-2xl font-bold text-red-600">8</p>
            <p className="text-xs text-gray-500 mt-1">Immediate attention</p>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h2>
        <div className="space-y-3">
          {recentApplications.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  app.status === 'Pending' ? 'bg-orange-100' :
                  app.status === 'Responded' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <FileText size={20} className={
                    app.status === 'Pending' ? 'text-orange-600' :
                    app.status === 'Responded' ? 'text-green-600' : 'text-red-600'
                  } />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{app.appNo}</p>
                  <p className="text-xs text-gray-500">{app.applicant} • {app.subject}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-xs text-gray-500">{app.date}</p>
                  <p className={`text-xs font-medium ${
                    app.status === 'Overdue' ? 'text-red-600' : 'text-gray-600'
                  }`}>{app.sla}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  app.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                  app.status === 'Responded' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}