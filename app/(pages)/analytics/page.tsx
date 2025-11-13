"use client";

import React, { useState } from "react";
import {
  FaUsers,
  FaChartLine,
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
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

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("30days");

  const stats = [
    {
      title: "Total Revenue",
      value: "₹45.2 Cr",
      change: "+15.3%",
      isPositive: true,
      icon: <FaRupeeSign className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Users",
      value: "12,450",
      change: "+8.2%",
      isPositive: true,
      icon: <FaUsers className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Trading Volume",
      value: "₹285 Cr",
      change: "+22.5%",
      isPositive: true,
      icon: <FaChartLine className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Avg. Order Value",
      value: "₹22,890",
      change: "-3.1%",
      isPositive: false,
      icon: <FaArrowDown className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 320000, brokerage: 180000, charges: 140000 },
    { month: "Feb", revenue: 385000, brokerage: 220000, charges: 165000 },
    { month: "Mar", revenue: 420000, brokerage: 245000, charges: 175000 },
    { month: "Apr", revenue: 468000, brokerage: 280000, charges: 188000 },
    { month: "May", revenue: 525000, brokerage: 315000, charges: 210000 },
    { month: "Jun", revenue: 580000, brokerage: 350000, charges: 230000 },
  ];

  const userActivityData = [
    { day: "Mon", active: 4200, new: 320 },
    { day: "Tue", active: 5100, new: 380 },
    { day: "Wed", active: 4800, new: 350 },
    { day: "Thu", active: 6200, new: 420 },
    { day: "Fri", active: 7100, new: 480 },
    { day: "Sat", active: 3200, new: 180 },
    { day: "Sun", active: 2800, new: 150 },
  ];

  const tradingSegmentData = [
    { name: "Stocks", value: 45, color: "#3B82F6" },
    { name: "F&O", value: 30, color: "#10B981" },
    { name: "Mutual Funds", value: 15, color: "#F59E0B" },
    { name: "IPO", value: 10, color: "#8B5CF6" },
  ];

  const topStocks = [
    { name: "RELIANCE", trades: 12450, volume: "₹45 Cr" },
    { name: "HDFCBANK", trades: 10230, volume: "₹38 Cr" },
    { name: "INFY", trades: 8920, volume: "₹32 Cr" },
    { name: "TCS", trades: 7650, volume: "₹28 Cr" },
    { name: "ITC", trades: 6340, volume: "₹22 Cr" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive platform analytics and insights
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
          {["7days", "30days", "90days", "1year"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                dateRange === range
                  ? "bg-[#fbc40c] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {range === "7days"
                ? "7 Days"
                : range === "30days"
                ? "30 Days"
                : range === "90days"
                ? "90 Days"
                : "1 Year"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Revenue Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={350}>
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

      {/* User Activity & Trading Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            User Activity (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userActivityData}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbc40c" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#fbc40c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#fbc40c"
                fillOpacity={1}
                fill="url(#colorActive)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Trading Segments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Trading Segments Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tradingSegmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {tradingSegmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Trading Stocks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Top Trading Stocks
        </h3>
        <div className="space-y-4">
          {topStocks.map((stock, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#fbc40c] rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{stock.name}</p>
                  <p className="text-sm text-gray-600">{stock.trades} trades</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{stock.volume}</p>
                <p className="text-sm text-green-600">Volume</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
