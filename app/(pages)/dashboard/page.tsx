import StatCard from '@/components/dashboard/StatCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import IncomeChart from '@/components/dashboard/IncomeChart'
import RecentOrders from '@/components/dashboard/RecentOrders'
import { ShoppingCart, Users, RotateCcw, DollarSign } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales Overview</h1>
        <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-700">April 10, 2026 - May 11, 2026</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value="2500"
          change="+4.6%"
          lastMonth="2345"
          icon={ShoppingCart}
          positive={true}
        />
        <StatCard
          title="New Customer"
          value="110"
          change="+7.3%"
          lastMonth="89"
          icon={Users}
          positive={true}
        />
        <StatCard
          title="Return Products"
          value="72"
          change="-6.6%"
          lastMonth="60"
          icon={RotateCcw}
          positive={false}
        />
        <StatCard
          title="Total Revenue"
          value="$8,220.64"
          change=""
          lastMonth="$600.00"
          icon={DollarSign}
          positive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <IncomeChart />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  )
}