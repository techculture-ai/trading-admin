"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const FNOPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const quickStats = [
    {
      label: "Total Contracts",
      value: "1,845",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Positions",
      value: "523",
      icon: <FaExchangeAlt className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Total Volume",
      value: "₹145 Cr",
      icon: <FaArrowUp className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Open Interest",
      value: "₹85 Cr",
      icon: <FaArrowDown className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const columns = [
    { key: "symbol", label: "Symbol", sortable: true },
    { key: "instrumentType", label: "Type", sortable: true },
    { key: "expiry", label: "Expiry", sortable: true },
    { key: "strikePrice", label: "Strike Price", sortable: true },
    { key: "ltp", label: "LTP", sortable: true },
    { key: "volume", label: "Volume", sortable: true },
    { key: "openInterest", label: "OI", sortable: true },
    { key: "change", label: "Change %", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const fnoData = [
    {
      id: "FNO001",
      symbol: "NIFTY",
      instrumentType: <StatusBadge status="Future" type="info" />,
      expiry: "2024-11-28",
      strikePrice: "-",
      ltp: "₹19,425.35",
      volume: "2.5M",
      openInterest: "1.2M",
      change: <StatusBadge status="+0.65%" type="success" />,
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "FNO002",
      symbol: "BANKNIFTY",
      instrumentType: <StatusBadge status="Future" type="info" />,
      expiry: "2024-11-28",
      strikePrice: "-",
      ltp: "₹44,280.50",
      volume: "1.8M",
      openInterest: "850K",
      change: <StatusBadge status="+0.42%" type="success" />,
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "FNO003",
      symbol: "NIFTY",
      instrumentType: <StatusBadge status="Call Option" type="success" />,
      expiry: "2024-11-28",
      strikePrice: "₹19,500",
      ltp: "₹125.50",
      volume: "5.2M",
      openInterest: "2.8M",
      change: <StatusBadge status="+2.15%" type="success" />,
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "FNO004",
      symbol: "NIFTY",
      instrumentType: <StatusBadge status="Put Option" type="error" />,
      expiry: "2024-11-28",
      strikePrice: "₹19,400",
      ltp: "₹98.75",
      volume: "4.8M",
      openInterest: "2.5M",
      change: <StatusBadge status="-1.25%" type="error" />,
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "FNO005",
      symbol: "RELIANCE",
      instrumentType: <StatusBadge status="Future" type="info" />,
      expiry: "2024-11-28",
      strikePrice: "-",
      ltp: "₹2,452.80",
      volume: "850K",
      openInterest: "420K",
      change: <StatusBadge status="+1.88%" type="success" />,
      status: <StatusBadge status="Active" type="success" />,
    },
  ];

  const filterFields = [
    {
      name: "instrumentType",
      label: "Instrument Type",
      type: "select" as const,
      options: [
        { label: "Futures", value: "future" },
        { label: "Call Options", value: "call" },
        { label: "Put Options", value: "put" },
      ],
    },
    {
      name: "symbol",
      label: "Symbol",
      type: "select" as const,
      options: [
        { label: "NIFTY", value: "nifty" },
        { label: "BANKNIFTY", value: "banknifty" },
        { label: "RELIANCE", value: "reliance" },
        { label: "HDFCBANK", value: "hdfcbank" },
      ],
    },
    {
      name: "expiry",
      label: "Expiry Date",
      type: "date" as const,
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/products/fno/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/products/fno/${id}/edit`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Futures & Options"
        description="Manage F&O contracts, positions, and market data"
        showAddButton={true}
        addButtonText="Add Contract"
        addButtonHref="/admin/products/fno/add"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      {/* Market Alert */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-900">F&O Market Open</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-gray-600">Total Turnover:</span>
              <span className="font-bold text-purple-600 ml-2">₹145 Cr</span>
            </div>
            <div>
              <span className="text-gray-600">PCR:</span>
              <span className="font-bold text-purple-600 ml-2">0.85</span>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={fnoData}
        onView={handleView}
        onEdit={handleEdit}
      />

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

export default FNOPage;
