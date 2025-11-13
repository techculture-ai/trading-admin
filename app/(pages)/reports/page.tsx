"use client";

import React, { useState } from "react";
import { FaFileAlt, FaDownload, FaCalendar, FaChartBar } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import QuickStats from "@/components/QuickStats";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("trading");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const quickStats = [
    {
      label: "Generated Today",
      value: "12",
      icon: <FaFileAlt className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Scheduled Reports",
      value: "5",
      icon: <FaCalendar className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Downloads (MTD)",
      value: "234",
      icon: <FaDownload className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Custom Reports",
      value: "18",
      icon: <FaChartBar className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const reportTypes = [
    {
      id: "trading",
      name: "Trading Report",
      description: "Comprehensive trading activity report",
      icon: "📊",
    },
    {
      id: "user",
      name: "User Report",
      description: "User registration and activity report",
      icon: "👥",
    },
    {
      id: "revenue",
      name: "Revenue Report",
      description: "Revenue and brokerage earnings report",
      icon: "💰",
    },
    {
      id: "kyc",
      name: "KYC Report",
      description: "KYC verification status report",
      icon: "✅",
    },
    {
      id: "payment",
      name: "Payment Report",
      description: "Deposits and withdrawals report",
      icon: "💳",
    },
    {
      id: "compliance",
      name: "Compliance Report",
      description: "Regulatory compliance report",
      icon: "⚖️",
    },
  ];

  const recentReports = [
    {
      name: "Trading Report - November 2024",
      date: "2024-11-11",
      size: "2.4 MB",
      status: "Ready",
    },
    {
      name: "User Activity Report - October 2024",
      date: "2024-11-10",
      size: "1.8 MB",
      status: "Ready",
    },
    {
      name: "Revenue Report - Q3 2024",
      date: "2024-11-08",
      size: "3.2 MB",
      status: "Ready",
    },
  ];

  const handleGenerateReport = () => {
    console.log("Generating report:", selectedReport, fromDate, toDate);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate and download various business reports"
      />

      <QuickStats stats={quickStats} />

      {/* Report Generator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Generate New Report
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c]"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.icon} {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c]"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          className="px-6 py-3 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg font-semibold flex items-center gap-2"
        >
          <FaChartBar className="w-5 h-5" />
          Generate Report
        </button>
      </div>

      {/* Report Types Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Report Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="text-4xl mb-3">{report.icon}</div>
              <h4 className="font-bold text-gray-900 mb-2">{report.name}</h4>
              <p className="text-sm text-gray-600">{report.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Reports</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {recentReports.map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b border-gray-200 last:border-0"
            >
              <div className="flex items-center gap-4">
                <FaFileAlt className="w-6 h-6 text-[#fbc40c]" />
                <div>
                  <p className="font-semibold text-gray-900">{report.name}</p>
                  <p className="text-sm text-gray-600">
                    {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                <FaDownload className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
