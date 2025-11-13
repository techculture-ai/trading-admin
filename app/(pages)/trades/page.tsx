"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const TradesPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  // Quick Stats
  const quickStats = [
    {
      label: "Total Trades Today",
      value: "1,234",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Total Volume",
      value: "₹45.2 Cr",
      icon: <FaArrowUp className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Pending Orders",
      value: "45",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Completed Trades",
      value: "1,189",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  // Table Columns
  const columns = [
    { key: "tradeId", label: "Trade ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "stock", label: "Stock/Symbol", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "totalValue", label: "Total Value", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "timestamp", label: "Date & Time", sortable: true },
  ];

  // Sample Data
  const tradesData = [
    {
      id: "TRD001",
      tradeId: "TRD001",
      user: "Rajesh Kumar",
      stock: "RELIANCE",
      type: <StatusBadge status="BUY" type="success" />,
      quantity: "100",
      price: "₹2,450.50",
      totalValue: "₹2,45,050",
      status: <StatusBadge status="Executed" type="success" />,
      timestamp: "2024-11-11 09:15:23",
    },
    {
      id: "TRD002",
      tradeId: "TRD002",
      user: "Priya Sharma",
      stock: "HDFCBANK",
      type: <StatusBadge status="SELL" type="error" />,
      quantity: "50",
      price: "₹1,650.75",
      totalValue: "₹82,537",
      status: <StatusBadge status="Executed" type="success" />,
      timestamp: "2024-11-11 09:18:45",
    },
    {
      id: "TRD003",
      tradeId: "TRD003",
      user: "Amit Patel",
      stock: "INFY",
      type: <StatusBadge status="BUY" type="success" />,
      quantity: "75",
      price: "₹1,480.25",
      totalValue: "₹1,11,018",
      status: <StatusBadge status="Pending" type="warning" />,
      timestamp: "2024-11-11 09:22:10",
    },
    {
      id: "TRD004",
      tradeId: "TRD004",
      user: "Sneha Reddy",
      stock: "TCS",
      type: <StatusBadge status="BUY" type="success" />,
      quantity: "120",
      price: "₹3,650.00",
      totalValue: "₹4,38,000",
      status: <StatusBadge status="Executed" type="success" />,
      timestamp: "2024-11-11 09:30:55",
    },
    {
      id: "TRD005",
      tradeId: "TRD005",
      user: "Vikram Singh",
      stock: "ITC",
      type: <StatusBadge status="SELL" type="error" />,
      quantity: "200",
      price: "₹415.50",
      totalValue: "₹83,100",
      status: <StatusBadge status="Executed" type="success" />,
      timestamp: "2024-11-11 09:35:12",
    },
    {
      id: "TRD006",
      tradeId: "TRD006",
      user: "Anita Desai",
      stock: "WIPRO",
      type: <StatusBadge status="BUY" type="success" />,
      quantity: "150",
      price: "₹450.75",
      totalValue: "₹67,612",
      status: <StatusBadge status="Cancelled" type="default" />,
      timestamp: "2024-11-11 09:40:33",
    },
    {
      id: "TRD007",
      tradeId: "TRD007",
      user: "Rahul Mehta",
      stock: "TATAMOTORS",
      type: <StatusBadge status="BUY" type="success" />,
      quantity: "80",
      price: "₹625.00",
      totalValue: "₹50,000",
      status: <StatusBadge status="Pending" type="warning" />,
      timestamp: "2024-11-11 09:45:18",
    },
    {
      id: "TRD008",
      tradeId: "TRD008",
      user: "Deepa Nair",
      stock: "AXISBANK",
      type: <StatusBadge status="SELL" type="error" />,
      quantity: "60",
      price: "₹1,050.25",
      totalValue: "₹63,015",
      status: <StatusBadge status="Executed" type="success" />,
      timestamp: "2024-11-11 09:52:41",
    },
  ];

  // Filter Fields
  const filterFields = [
    {
      name: "tradeType",
      label: "Trade Type",
      type: "select" as const,
      options: [
        { label: "Buy", value: "buy" },
        { label: "Sell", value: "sell" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Executed", value: "executed" },
        { label: "Pending", value: "pending" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      name: "stock",
      label: "Stock Symbol",
      type: "text" as const,
      placeholder: "Enter stock symbol",
    },
    {
      name: "fromDate",
      label: "From Date",
      type: "date" as const,
    },
    {
      name: "toDate",
      label: "To Date",
      type: "date" as const,
    },
    {
      name: "minAmount",
      label: "Min Amount",
      type: "number" as const,
      placeholder: "Min amount",
    },
    {
      name: "maxAmount",
      label: "Max Amount",
      type: "number" as const,
      placeholder: "Max amount",
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/trades/${id}`);
  };

  const handleExport = () => {
    console.log("Exporting trades data...");
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    console.log("Applied filters:", filters);
  };

  const handleResetFilters = () => {
    console.log("Resetting filters...");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Trade Management"
        description="Monitor and manage all trading activities across the platform"
        showExportButton={true}
        onExportClick={handleExport}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      {/* Quick Stats */}
      <QuickStats stats={quickStats} />

      {/* Live Market Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-900">Market is Open</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-gray-600">NIFTY 50:</span>
              <span className="font-bold text-green-600 ml-2">19,425.35</span>
              <span className="text-green-600 ml-2">+125.40 (+0.65%)</span>
            </div>
            <div>
              <span className="text-gray-600">SENSEX:</span>
              <span className="font-bold text-green-600 ml-2">65,280.45</span>
              <span className="text-green-600 ml-2">+385.20 (+0.59%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trades Table */}
      <DataTable columns={columns} data={tradesData} onView={handleView} />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </div>
  );
};

export default TradesPage;
