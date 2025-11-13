"use client";

import React, { useState } from "react";
import {
  FaUsers,
  FaChartLine,
  FaRupeeSign,
  FaFileInvoiceDollar,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import StatsCard from "@/components/dashboard/StatsCard";
import DataTable from "@/components/dashboard/DataTable";

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState("7days");

  // Stats Data
  const stats = [
    {
      title: "Total Users",
      value: "15,234",
      change: "+12.5%",
      isPositive: true,
      icon: <FaUsers className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Traders",
      value: "8,457",
      change: "+8.2%",
      isPositive: true,
      icon: <FaChartLine className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Total Trading Volume",
      value: "₹45.2 Cr",
      change: "+15.3%",
      isPositive: true,
      icon: <FaRupeeSign className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Revenue (MTD)",
      value: "₹12.8 L",
      change: "-3.1%",
      isPositive: false,
      icon: <FaFileInvoiceDollar className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  // Quick Stats
  const quickStats = [
    {
      label: "KYC Pending",
      value: "23",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Withdrawals",
      value: "12",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Support Tickets",
      value: "34",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "New IPOs",
      value: "3",
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  // Trading Volume Chart Data
  const tradingVolumeData = [
    { date: "Mon", volume: 4200, trades: 320 },
    { date: "Tue", volume: 5100, trades: 380 },
    { date: "Wed", volume: 4800, trades: 350 },
    { date: "Thu", volume: 6200, trades: 420 },
    { date: "Fri", volume: 7100, trades: 480 },
    { date: "Sat", volume: 3200, trades: 180 },
    { date: "Sun", volume: 2800, trades: 150 },
  ];

  // User Growth Data
  const userGrowthData = [
    { month: "Jan", users: 4200 },
    { month: "Feb", users: 5400 },
    { month: "Mar", users: 6800 },
    { month: "Apr", users: 8200 },
    { month: "May", users: 10500 },
    { month: "Jun", users: 12800 },
    { month: "Jul", users: 15234 },
  ];

  // Product Distribution
  const productData = [
    { name: "Stocks", value: 45, color: "#3B82F6" },
    { name: "F&O", value: 30, color: "#10B981" },
    { name: "Mutual Funds", value: 15, color: "#F59E0B" },
    { name: "IPO", value: 10, color: "#8B5CF6" },
  ];

  // Revenue Data
  const revenueData = [
    { month: "Jan", brokerage: 120000, charges: 30000 },
    { month: "Feb", brokerage: 145000, charges: 35000 },
    { month: "Mar", brokerage: 165000, charges: 42000 },
    { month: "Apr", brokerage: 189000, charges: 48000 },
    { month: "May", brokerage: 210000, charges: 55000 },
    { month: "Jun", brokerage: 235000, charges: 62000 },
    { month: "Jul", brokerage: 280000, charges: 70000 },
  ];

  // Top Performers
  const topPerformers = [
    {
      name: "Reliance Industries",
      symbol: "RELIANCE",
      volume: "₹2.5 Cr",
      change: "+5.2%",
      isPositive: true,
    },
    {
      name: "HDFC Bank",
      symbol: "HDFCBANK",
      volume: "₹1.8 Cr",
      change: "+3.8%",
      isPositive: true,
    },
    {
      name: "Infosys",
      symbol: "INFY",
      volume: "₹1.5 Cr",
      change: "-2.1%",
      isPositive: false,
    },
    {
      name: "TCS",
      symbol: "TCS",
      volume: "₹1.3 Cr",
      change: "+4.5%",
      isPositive: true,
    },
    {
      name: "ITC",
      symbol: "ITC",
      volume: "₹1.1 Cr",
      change: "+2.8%",
      isPositive: true,
    },
  ];

  // Recent Activities
  const recentActivities = [
    {
      user: "Rajesh Kumar",
      action: "Opened Demat Account",
      time: "2 mins ago",
      type: "account",
      status: "success",
    },
    {
      user: "Priya Sharma",
      action: "Placed Order - 100 RELIANCE",
      time: "5 mins ago",
      type: "trade",
      status: "success",
    },
    {
      user: "Amit Patel",
      action: "Completed KYC Verification",
      time: "12 mins ago",
      type: "kyc",
      status: "success",
    },
    {
      user: "Sneha Reddy",
      action: "Started SIP - ₹5000/month",
      time: "18 mins ago",
      type: "sip",
      status: "pending",
    },
    {
      user: "Vikram Singh",
      action: "Applied for IPO",
      time: "25 mins ago",
      type: "ipo",
      status: "pending",
    },
  ];

  // Recent Trades Data for DataTable
  const recentTradesColumns = [
    { key: "id", label: "Trade ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const recentTradesData = [
    {
      id: "TRD001",
      user: "John Doe",
      stock: "RELIANCE",
      type: "BUY",
      quantity: 100,
      price: "₹2,450",
      status: "Completed",
    },
    {
      id: "TRD002",
      user: "Jane Smith",
      stock: "HDFCBANK",
      type: "SELL",
      quantity: 50,
      price: "₹1,650",
      status: "Completed",
    },
    {
      id: "TRD003",
      user: "Mike Johnson",
      stock: "INFY",
      type: "BUY",
      quantity: 75,
      price: "₹1,480",
      status: "Pending",
    },
    {
      id: "TRD004",
      user: "Sarah Williams",
      stock: "TCS",
      type: "BUY",
      quantity: 120,
      price: "₹3,650",
      status: "Completed",
    },
    {
      id: "TRD005",
      user: "David Brown",
      stock: "ITC",
      type: "SELL",
      quantity: 200,
      price: "₹415",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          {["Today", "7days", "30days", "90days"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                dateRange === range
                  ? "bg-[#fbc40c] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {range === "Today"
                ? "Today"
                : range === "7days"
                ? "7 Days"
                : range === "30days"
                ? "30 Days"
                : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} rounded-lg p-4 flex items-center justify-between`}
          >
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <FaClock className={`w-8 h-8 ${stat.color} opacity-50`} />
          </div>
        ))}
      </div>

      {/* Main Stats Cards - Using StatsCard Component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trading Volume Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Trading Volume (Last 7 Days)
            </h3>
            <Link
              href="/admin/analytics"
              className="text-sm text-[#fbc40c] hover:text-[#D68108] font-semibold"
            >
              View Details →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={tradingVolumeData}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbc40c" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#fbc40c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#fbc40c"
                fillOpacity={1}
                fill="url(#colorVolume)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
            <Link
              href="/admin/users"
              className="text-sm text-[#fbc40c] hover:text-[#D68108] font-semibold"
            >
              View All Users →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Revenue Breakdown
            </h3>
            <Link
              href="/admin/payments"
              className="text-sm text-[#fbc40c] hover:text-[#D68108] font-semibold"
            >
              View Payments →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Bar dataKey="brokerage" fill="#fbc40c" name="Brokerage" />
              <Bar dataKey="charges" fill="#10B981" name="Other Charges" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Product Distribution
            </h3>
            <Link
              href="/admin/products/stocks"
              className="text-sm text-[#fbc40c] hover:text-[#D68108] font-semibold"
            >
              View Products →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Stocks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Top Performing Stocks
            </h3>
            <Link
              href="/admin/products/stocks"
              className="text-sm text-[#fbc40c] hover:text-[#D68108] font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {topPerformers.map((stock, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {stock.name}
                  </p>
                  <p className="text-xs text-gray-500">{stock.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {stock.volume}
                  </p>
                  <p
                    className={`text-xs font-semibold ${
                      stock.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Recent Activities
            </h3>
            <Link
              href="/admin/users"
              className="text-sm text-[#fbc40c] hover:text-[#D68108] font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "account"
                      ? "bg-blue-100 text-blue-600"
                      : activity.type === "trade"
                      ? "bg-green-100 text-green-600"
                      : activity.type === "kyc"
                      ? "bg-purple-100 text-purple-600"
                      : activity.type === "sip"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-pink-100 text-pink-600"
                  }`}
                >
                  {activity.status === "success" ? (
                    <FaCheckCircle className="w-3 h-3" />
                  ) : (
                    <FaClock className="w-3 h-3" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {activity.user}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trades - Using DataTable Component (Compact Version) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Trades</h3>
            <Link
              href="/admin/trades"
              className="text-sm text-[#fbc40c] hover:text-[#D68108] font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentTradesData.slice(0, 5).map((trade, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500">
                    {trade.id}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      trade.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {trade.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {trade.stock}
                    </p>
                    <p className="text-xs text-gray-500">{trade.user}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        trade.type === "BUY" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {trade.type} {trade.quantity}
                    </p>
                    <p className="text-xs text-gray-600">{trade.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Recent Trades Table - Using DataTable Component */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          All Recent Trades
        </h3>
        <DataTable
          columns={recentTradesColumns}
          data={recentTradesData}
          onView={(id) => console.log("View:", id)}
          onEdit={(id) => console.log("Edit:", id)}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
