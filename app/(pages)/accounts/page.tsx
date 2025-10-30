'use client'

import { Calculator, DollarSign, TrendingUp, FileText, CreditCard, Wallet } from 'lucide-react'
import Link from 'next/link'

export default function AccountsPage() {
  const stats = [
    { title: 'Total Budget', value: '₹125 Cr', change: '+₹15 Cr', icon: Wallet, color: 'blue' },
    { title: 'Expenditure', value: '₹78 Cr', change: '+₹8 Cr', icon: TrendingUp, color: 'red' },
    { title: 'Revenue', value: '₹92 Cr', change: '+₹12 Cr', icon: DollarSign, color: 'green' },
    { title: 'Pending Payments', value: '₹15 Cr', change: '-₹3 Cr', icon: CreditCard, color: 'orange' },
  ]

  const quickActions = [
    { title: 'Budgeting', href: '/accounts/budgeting', icon: Calculator },
    { title: 'Receipts & Revenue', href: '/accounts/receipts', icon: DollarSign },
    { title: 'Payables', href: '/accounts/payables', icon: CreditCard },
    { title: 'Treasury Integration', href: '/accounts/treasury', icon: Wallet },
  ]

  const recentTransactions = [
    { id: 1, type: 'Receipt', description: 'Property Sale - Unit A-101', amount: '₹45,00,000', date: '2 hours ago', status: 'Completed' },
    { id: 2, type: 'Payment', description: 'Contractor Payment - ABC Builders', amount: '₹2,50,00,000', date: '5 hours ago', status: 'Processed' },
    { id: 3, type: 'Receipt', description: 'Lease Rent - Commercial Plot', amount: '₹12,00,000', date: '1 day ago', status: 'Completed' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounts Module</h1>
        <p className="text-sm text-gray-600 mt-1">Manage budgets, revenues, expenditures, and financial reporting</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-green-600 mt-2">{stat.change} this FY</p>
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

      {/* Budget Utilization */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Utilization (FY 2024-25)</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Capital Expenditure</span>
              <span className="text-sm font-medium text-gray-900">62% Utilized</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Revenue Expenditure</span>
              <span className="text-sm font-medium text-gray-900">58% Utilized</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '58%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Administrative Expenses</span>
              <span className="text-sm font-medium text-gray-900">45% Utilized</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-orange-500 h-3 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'Receipt' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'Receipt' ? (
                    <TrendingUp size={20} className="text-green-600" />
                  ) : (
                    <CreditCard size={20} className="text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.type} • {transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <p className={`text-sm font-bold ${
                  transaction.type === 'Receipt' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'Receipt' ? '+' : '-'}{transaction.amount}
                </p>
                <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}