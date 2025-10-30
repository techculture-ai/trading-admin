'use client'

import { Home, DollarSign, TrendingUp, Users, FileText, Clock } from 'lucide-react'
import Link from 'next/link'

export default function PropertyDisposalPage() {
  const stats = [
    { title: 'Total Properties', value: '450', change: '+45', icon: Home, color: 'blue' },
    { title: 'Available Units', value: '123', change: '-12', icon: Home, color: 'green' },
    { title: 'Total Revenue', value: '₹85 Cr', change: '+₹12 Cr', icon: DollarSign, color: 'orange' },
    { title: 'Sold This Month', value: '28', change: '+8', icon: TrendingUp, color: 'purple' },
  ]

  const quickActions = [
    { title: 'Property Master', href: '/property-disposal/property-master', icon: Home },
    { title: 'Sale & Allotment', href: '/property-disposal/sale-allotment', icon: FileText },
    { title: 'Pricing Engine', href: '/property-disposal/pricing', icon: DollarSign },
    { title: 'Inventory Status', href: '/property-disposal/inventory', icon: Clock },
  ]

  const recentSales = [
    { id: 1, unit: 'A-101', project: 'Gomti Nagar Housing', buyer: 'Rajesh Kumar', amount: '₹45,00,000', date: '2 days ago', status: 'Completed' },
    { id: 2, unit: 'B-205', project: 'Hazratganj Apartments', buyer: 'Priya Sharma', amount: '₹62,00,000', date: '3 days ago', status: 'Under Process' },
    { id: 3, unit: 'C-302', project: 'Aliganj Residency', buyer: 'Amit Singh', amount: '₹38,00,000', date: '5 days ago', status: 'Completed' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Property Disposal Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage property inventory, sales, allotments, and revenue collection</p>
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

      {/* Recent Sales */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales & Allotments</h2>
        <div className="space-y-3">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Home size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{sale.unit} - {sale.project}</p>
                  <p className="text-xs text-gray-500">Buyer: {sale.buyer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{sale.amount}</p>
                  <p className="text-xs text-gray-500">{sale.date}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  sale.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {sale.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}