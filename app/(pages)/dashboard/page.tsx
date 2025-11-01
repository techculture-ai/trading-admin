'use client'

import { useState, useEffect, useMemo } from 'react'
import { ShoppingCart, Users, RotateCcw, DollarSign, Download, Filter, Calendar, RefreshCw, Search, ChevronDown } from 'lucide-react'
import { usePageLoading } from '@/hooks/usePageLoading'
import {DetailsSkeleton} from '@/components/SkeletonLoader'
import StatCard from '@/components/dashboard/StatCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import IncomeChart from '@/components/dashboard/IncomeChart'
import RecentOrders from '@/components/dashboard/RecentOrders'

export default function SalesOverviewPage() {
  const isLoading = usePageLoading(1000)
  
  // State management
  const [dateRange, setDateRange] = useState({
    start: '2024-10-01',
    end: '2024-10-31'
  })
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('30days')
  const [refreshing, setRefreshing] = useState(false)
  
  // Complete dataset for different periods
  const [fullDataset] = useState({
    '7days': {
      totalSales: 580,
      newCustomers: 23,
      returnProducts: 12,
      totalRevenue: 1850000,
      lastPeriodSales: 545,
      lastPeriodCustomers: 19,
      lastPeriodReturns: 15,
      lastPeriodRevenue: 1720000,
      revenueChart: [
        { day: 'Mon', value: 18 },
        { day: 'Tue', value: 22 },
        { day: 'Wed', value: 25 },
        { day: 'Thu', value: 20 },
        { day: 'Fri', value: 28 },
        { day: 'Sat', value: 24 },
        { day: 'Sun', value: 19 },
      ],
      incomeChart: [
        { day: 'Mon', profit: 35, loss: 15 },
        { day: 'Tue', profit: 42, loss: 18 },
        { day: 'Wed', profit: 48, loss: 22 },
        { day: 'Thu', profit: 38, loss: 20 },
        { day: 'Fri', profit: 55, loss: 25 },
        { day: 'Sat', profit: 45, loss: 28 },
        { day: 'Sun', profit: 38, loss: 19 },
      ],
      orders: [
        { id: '#876815', date: '31 Oct 2024', customer: 'Rajesh Kumar', category: 'Unit A-101', status: 'Completed', items: 1, total: '₹45,00,000' },
        { id: '#876814', date: '30 Oct 2024', customer: 'Priya Sharma', category: 'Unit B-205', status: 'Pending', items: 1, total: '₹62,00,000' },
        { id: '#876813', date: '29 Oct 2024', customer: 'Amit Verma', category: 'Plot C-12', status: 'Processing', items: 1, total: '₹28,00,000' },
      ]
    },
    '30days': {
      totalSales: 2500,
      newCustomers: 110,
      returnProducts: 72,
      totalRevenue: 8220000,
      lastPeriodSales: 2345,
      lastPeriodCustomers: 89,
      lastPeriodReturns: 60,
      lastPeriodRevenue: 7600000,
      revenueChart: [
        { day: 'Fri', value: 20 },
        { day: 'Sat', value: 15 },
        { day: 'Sun', value: 25 },
        { day: 'Mon', value: 22 },
        { day: 'Tue', value: 18 },
        { day: 'Wed', value: 28 },
        { day: 'Thu', value: 20 },
      ],
      incomeChart: [
        { day: 'Fri', profit: 30, loss: 20 },
        { day: 'Sat', profit: 45, loss: 10 },
        { day: 'Sun', profit: 50, loss: 35 },
        { day: 'Mon', profit: 40, loss: 25 },
        { day: 'Tue', profit: 60, loss: 50 },
        { day: 'Wed', profit: 55, loss: 45 },
        { day: 'Thu', profit: 42, loss: 38 },
      ],
      orders: [
        { id: '#876809', date: '28 Oct 2024', customer: 'Oliver John Brown', category: 'Unit A-305', status: 'Pending', items: 1, total: '₹78,00,000' },
        { id: '#876808', date: '27 Oct 2024', customer: 'Noah James Smith', category: 'Commercial Unit B-12', status: 'Completed', items: 1, total: '₹96,00,000' },
        { id: '#876807', date: '26 Oct 2024', customer: 'Emma Wilson', category: 'Villa D-08', status: 'Processing', items: 1, total: '₹1,25,00,000' },
        { id: '#876806', date: '25 Oct 2024', customer: 'Liam Anderson', category: 'Plot E-15', status: 'Completed', items: 1, total: '₹35,00,000' },
        { id: '#876805', date: '24 Oct 2024', customer: 'Sophia Martinez', category: 'Unit C-201', status: 'Cancelled', items: 1, total: '₹52,00,000' },
      ]
    },
    '90days': {
      totalSales: 7850,
      newCustomers: 340,
      returnProducts: 189,
      totalRevenue: 24500000,
      lastPeriodSales: 7120,
      lastPeriodCustomers: 298,
      lastPeriodReturns: 210,
      lastPeriodRevenue: 22100000,
      revenueChart: [
        { day: 'Week 1', value: 22 },
        { day: 'Week 2', value: 28 },
        { day: 'Week 3', value: 25 },
        { day: 'Week 4', value: 30 },
        { day: 'Week 5', value: 27 },
        { day: 'Week 6', value: 24 },
        { day: 'Week 7', value: 26 },
      ],
      incomeChart: [
        { day: 'Week 1', profit: 42, loss: 28 },
        { day: 'Week 2', profit: 55, loss: 32 },
        { day: 'Week 3', profit: 48, loss: 35 },
        { day: 'Week 4', profit: 60, loss: 40 },
        { day: 'Week 5', profit: 52, loss: 38 },
        { day: 'Week 6', profit: 45, loss: 42 },
        { day: 'Week 7', profit: 50, loss: 36 },
      ],
      orders: [
        { id: '#876801', date: '20 Oct 2024', customer: 'James Davis', category: 'Penthouse A-15', status: 'Completed', items: 1, total: '₹2,50,00,000' },
        { id: '#876800', date: '18 Oct 2024', customer: 'Isabella Garcia', category: 'Commercial B-08', status: 'Completed', items: 1, total: '₹1,80,00,000' },
        { id: '#876799', date: '15 Oct 2024', customer: 'William Rodriguez', category: 'Villa C-03', status: 'Pending', items: 1, total: '₹1,45,00,000' },
        { id: '#876798', date: '12 Oct 2024', customer: 'Mia Hernandez', category: 'Unit D-105', status: 'Processing', items: 1, total: '₹68,00,000' },
        { id: '#876797', date: '08 Oct 2024', customer: 'Benjamin Lopez', category: 'Plot F-22', status: 'Completed', items: 1, total: '₹42,00,000' },
      ]
    },
    '1year': {
      totalSales: 32450,
      newCustomers: 1520,
      returnProducts: 890,
      totalRevenue: 98500000,
      lastPeriodSales: 28900,
      lastPeriodCustomers: 1345,
      lastPeriodReturns: 950,
      lastPeriodRevenue: 85200000,
      revenueChart: [
        { day: 'Jan', value: 18 },
        { day: 'Feb', value: 22 },
        { day: 'Mar', value: 25 },
        { day: 'Apr', value: 28 },
        { day: 'May', value: 24 },
        { day: 'Jun', value: 20 },
        { day: 'Jul', value: 26 },
      ],
      incomeChart: [
        { day: 'Jan', profit: 38, loss: 32 },
        { day: 'Feb', profit: 45, loss: 35 },
        { day: 'Mar', profit: 52, loss: 40 },
        { day: 'Apr', profit: 58, loss: 42 },
        { day: 'May', profit: 50, loss: 45 },
        { day: 'Jun', profit: 42, loss: 38 },
        { day: 'Jul', profit: 55, loss: 40 },
      ],
      orders: [
        { id: '#876750', date: '05 Oct 2024', customer: 'Charlotte Martinez', category: 'Tower A - Multiple Units', status: 'Completed', items: 5, total: '₹5,00,00,000' },
        { id: '#876745', date: '28 Sep 2024', customer: 'Alexander Wilson', category: 'Commercial Complex B', status: 'Completed', items: 3, total: '₹3,80,00,000' },
        { id: '#876740', date: '15 Sep 2024', customer: 'Amelia Anderson', category: 'Villas - Phase 2', status: 'Processing', items: 4, total: '₹4,20,00,000' },
        { id: '#876735', date: '02 Sep 2024', customer: 'Henry Thomas', category: 'Plots - Sector C', status: 'Completed', items: 8, total: '₹2,40,00,000' },
        { id: '#876730', date: '20 Aug 2024', customer: 'Evelyn Jackson', category: 'Premium Units', status: 'Completed', items: 2, total: '₹1,90,00,000' },
      ]
    }
  })

  // Current data based on selected period
  const [currentData, setCurrentData] = useState(fullDataset['30days'])

  // Calculate statistics
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0
    return (((current - previous) / previous) * 100).toFixed(1)
  }

  const stats = useMemo(() => ({
    totalSales: {
      value: currentData.totalSales,
      change: calculateChange(currentData.totalSales, currentData.lastPeriodSales),
      positive: currentData.totalSales > currentData.lastPeriodSales,
      lastMonth: currentData.lastPeriodSales.toString(),
    },
    newCustomers: {
      value: currentData.newCustomers,
      change: calculateChange(currentData.newCustomers, currentData.lastPeriodCustomers),
      positive: currentData.newCustomers > currentData.lastPeriodCustomers,
      lastMonth: currentData.lastPeriodCustomers.toString(),
    },
    returnProducts: {
      value: currentData.returnProducts,
      change: calculateChange(currentData.returnProducts, currentData.lastPeriodReturns),
      positive: currentData.returnProducts < currentData.lastPeriodReturns,
      lastMonth: currentData.lastPeriodReturns.toString(),
    },
    totalRevenue: {
      value: `₹${(currentData.totalRevenue / 100000).toFixed(2)}L`,
      change: calculateChange(currentData.totalRevenue, currentData.lastPeriodRevenue),
      positive: currentData.totalRevenue > currentData.lastPeriodRevenue,
      lastMonth: `₹${(currentData.lastPeriodRevenue / 100000).toFixed(2)}L`,
    },
  }), [currentData])

  // Handle period change
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
    const today = new Date()
    let startDate = new Date()

    switch (period) {
      case '7days':
        startDate.setDate(today.getDate() - 7)
        setCurrentData(fullDataset['7days'])
        break
      case '30days':
        startDate.setDate(today.getDate() - 30)
        setCurrentData(fullDataset['30days'])
        break
      case '90days':
        startDate.setDate(today.getDate() - 90)
        setCurrentData(fullDataset['90days'])
        break
      case '1year':
        startDate.setFullYear(today.getFullYear() - 1)
        setCurrentData(fullDataset['1year'])
        break
      default:
        startDate.setDate(today.getDate() - 30)
        setCurrentData(fullDataset['30days'])
    }

    setDateRange({
      start: startDate.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0]
    })
    setShowDatePicker(false)
  }

  // Handle custom date range
  const handleCustomDateRange = () => {
    const start = new Date(dateRange.start)
    const end = new Date(dateRange.end)
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff <= 7) {
      setSelectedPeriod('7days')
      setCurrentData(fullDataset['7days'])
    } else if (daysDiff <= 30) {
      setSelectedPeriod('30days')
      setCurrentData(fullDataset['30days'])
    } else if (daysDiff <= 90) {
      setSelectedPeriod('90days')
      setCurrentData(fullDataset['90days'])
    } else {
      setSelectedPeriod('1year')
      setCurrentData(fullDataset['1year'])
    }
    setShowDatePicker(false)
  }

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulate slight data variation
    const variation = Math.random() * 0.02 - 0.01 // -1% to +1%
    const newData = {
      ...currentData,
      totalSales: Math.round(currentData.totalSales * (1 + variation)),
      newCustomers: Math.round(currentData.newCustomers * (1 + variation)),
    }
    setCurrentData(newData)
    setRefreshing(false)
  }

  // Handle export
  const handleExport = () => {
    const csv = [
      ['Period', `${dateRange.start} to ${dateRange.end}`],
      [''],
      ['Metric', 'Current', 'Previous', 'Change'],
      ['Total Sales', stats.totalSales.value, stats.totalSales.lastMonth, `${stats.totalSales.change}%`],
      ['New Customers', stats.newCustomers.value, stats.newCustomers.lastMonth, `${stats.newCustomers.change}%`],
      ['Return Products', stats.returnProducts.value, stats.returnProducts.lastMonth, `${stats.returnProducts.change}%`],
      ['Total Revenue', stats.totalRevenue.value, stats.totalRevenue.lastMonth, `${stats.totalRevenue.change}%`],
      [''],
      ['Recent Orders'],
      ['Order ID', 'Date', 'Customer', 'Category', 'Status', 'Items', 'Total'],
      ...currentData.orders.map(order => 
        [order.id, order.date, order.customer, order.category, order.status, order.items, order.total]
      )
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales-overview-${dateRange.start}-to-${dateRange.end}.csv`
    a.click()
  }

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Overview</h1>
          <p className="text-sm text-gray-600 mt-1">Current User: techculture-ai • {new Date().toLocaleString('en-IN')}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all"
          >
            <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
            >
              <Calendar size={20} className="text-gray-600" />
              <span className="text-sm text-gray-700">
                {new Date(dateRange.start).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - {new Date(dateRange.end).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {showDatePicker && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Period</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { label: 'Last 7 days', value: '7days' },
                    { label: 'Last 30 days', value: '30days' },
                    { label: 'Last 90 days', value: '90days' },
                    { label: 'Last 1 year', value: '1year' },
                  ].map((period) => (
                    <button
                      key={period.value}
                      onClick={() => handlePeriodChange(period.value)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all ${
                        selectedPeriod === period.value
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Custom Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Start Date</label>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">End Date</label>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCustomDateRange}
                    className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={stats.totalSales.value.toString()}
          change={`${stats.totalSales.positive ? '+' : ''}${stats.totalSales.change}%`}
          lastMonth={stats.totalSales.lastMonth}
          icon={ShoppingCart}
          positive={stats.totalSales.positive}
        />
        <StatCard
          title="New Customer"
          value={stats.newCustomers.value.toString()}
          change={`${stats.newCustomers.positive ? '+' : ''}${stats.newCustomers.change}%`}
          lastMonth={stats.newCustomers.lastMonth}
          icon={Users}
          positive={stats.newCustomers.positive}
        />
        <StatCard
          title="Return Products"
          value={stats.returnProducts.value.toString()}
          change={`${stats.returnProducts.positive ? '-' : '+'}${Math.abs(parseFloat(String(stats.returnProducts.change)))}%`}
          lastMonth={stats.returnProducts.lastMonth}
          icon={RotateCcw}
          positive={stats.returnProducts.positive}
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue.value}
          change={`${stats.totalRevenue.positive ? '+' : ''}${stats.totalRevenue.change}%`}
          lastMonth={stats.totalRevenue.lastMonth}
          icon={DollarSign}
          positive={stats.totalRevenue.positive}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart 
          data={currentData.revenueChart} 
          period={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />
        <IncomeChart data={currentData.incomeChart} />
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={currentData.orders} />
    </div>
  )
}