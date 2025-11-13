"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaPercentage,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const PositionsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const quickStats = [
    {
      label: "Total Positions",
      value: "1,245",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Profitable",
      value: "823",
      icon: <FaArrowUp className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Loss Making",
      value: "422",
      icon: <FaArrowDown className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Total P&L",
      value: "₹12.8L",
      icon: <FaPercentage className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const columns = [
    { key: "positionId", label: "Position ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "avgPrice", label: "Avg Price", sortable: true },
    { key: "ltp", label: "LTP", sortable: true },
    { key: "pnl", label: "P&L", sortable: true },
    { key: "pnlPercent", label: "P&L %", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const positionsData = [
    {
      id: "POS001",
      positionId: "POS001",
      user: "Rajesh Kumar",
      stock: "RELIANCE",
      quantity: "100",
      avgPrice: "₹2,400.00",
      ltp: "₹2,450.50",
      pnl: <span className="text-green-600 font-semibold">+₹5,050</span>,
      pnlPercent: <StatusBadge status="+2.10%" type="success" />,
      status: <StatusBadge status="Open" type="info" />,
    },
    {
      id: "POS002",
      positionId: "POS002",
      user: "Priya Sharma",
      stock: "HDFCBANK",
      quantity: "50",
      avgPrice: "₹1,680.00",
      ltp: "₹1,650.75",
      pnl: <span className="text-red-600 font-semibold">-₹1,462</span>,
      pnlPercent: <StatusBadge status="-1.74%" type="error" />,
      status: <StatusBadge status="Open" type="info" />,
    },
    {
      id: "POS003",
      positionId: "POS003",
      user: "Amit Patel",
      stock: "INFY",
      quantity: "75",
      avgPrice: "₹1,465.00",
      ltp: "₹1,480.25",
      pnl: <span className="text-green-600 font-semibold">+₹1,143</span>,
      pnlPercent: <StatusBadge status="+1.04%" type="success" />,
      status: <StatusBadge status="Open" type="info" />,
    },
  ];

  const filterFields = [
    {
      name: "profitLoss",
      label: "Profit/Loss",
      type: "select" as const,
      options: [
        { label: "Profitable", value: "profit" },
        { label: "Loss Making", value: "loss" },
      ],
    },
    {
      name: "stock",
      label: "Stock",
      type: "text" as const,
      placeholder: "Enter stock symbol",
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/trades/positions/${id}`);
  };

  const handleExport = () => {
    console.log("Exporting positions data...");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Open Positions"
        description="Monitor all active trading positions and their P&L"
        showExportButton={true}
        onExportClick={handleExport}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <DataTable columns={columns} data={positionsData} onView={handleView} />

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={(filters) => console.log(filters)}
        onReset={() => console.log("Reset")}
      />
    </div>
  );
};

export default PositionsPage;
