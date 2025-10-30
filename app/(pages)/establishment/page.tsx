'use client'

import { Users, UserCheck, Calendar, DollarSign, Award, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function EstablishmentPage() {
  const stats = [
    { title: 'Total Employees', value: '245', change: '+12', icon: Users, color: 'blue' },
    { title: 'Present Today', value: '232', change: '94.7%', icon: UserCheck, color: 'green' },
    { title: 'Monthly Payroll', value: '₹1.2 Cr', change: '+₹0.1 Cr', icon: DollarSign, color: 'orange' },
    { title: 'Vacancies', value: '18', change: '-3', icon: Briefcase, color: 'purple' },
  ]

  const quickActions = [
    { title: 'Employee Master', href: '/establishment/employee-master', icon: Users },
    { title: 'Attendance & Leave', href: '/establishment/attendance', icon: Calendar },
    { title: 'Payroll', href: '/establishment/payroll', icon: DollarSign },
  ]

  const recentActivities = [
    { id: 1, type: 'New Joining', employee: 'Amit Kumar', designation: 'Assistant Engineer', date: '2 days ago' },
    { id: 2, type: 'Leave Approved', employee: 'Priya Sharma', designation: 'Accountant', date: '3 days ago' },
    { id: 3, type: 'Transfer', employee: 'Rajesh Singh', designation: 'Junior Engineer', date: '5 days ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Establishment Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage employee records, attendance, payroll, and HR operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-green-600 mt-2">{stat.change}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Department-wise Strength */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Strength</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Engineering</p>
            <p className="text-2xl font-bold text-gray-900">89</p>
            <p className="text-xs text-gray-500 mt-1">36% of total</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Accounts</p>
            <p className="text-2xl font-bold text-gray-900">45</p>
            <p className="text-xs text-gray-500 mt-1">18% of total</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Administration</p>
            <p className="text-2xl font-bold text-gray-900">67</p>
            <p className="text-xs text-gray-500 mt-1">27% of total</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Legal</p>
            <p className="text-2xl font-bold text-gray-900">44</p>
            <p className="text-xs text-gray-500 mt-1">18% of total</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                  <p className="text-xs text-gray-500">{activity.employee} - {activity.designation}</p>
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