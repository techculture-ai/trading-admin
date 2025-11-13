"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaChartPie,
  FaStar,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const StocksPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  // Quick Stats
  const quickStats = [
    {
      label: "Total Stocks",
      value: "2,845",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Gainers",
      value: "1,234",
      icon: <FaArrowUp className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Losers",
      value: "987",
      icon: <FaArrowDown className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Most Traded",
      value: "145",
      icon: <FaStar className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Table Columns
  const columns = [
    { key: "symbol", label: "Symbol", sortable: true },
    { key: "companyName", label: "Company Name", sortable: true },
    { key: "sector", label: "Sector", sortable: true },
    { key: "ltp", label: "LTP", sortable: true },
    { key: "change", label: "Change", sortable: true },
    { key: "changePercent", label: "Change %", sortable: true },
    { key: "volume", label: "Volume", sortable: true },
    { key: "marketCap", label: "Market Cap", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  // Sample Data
  const stocksData = [
    {
      id: "STK001",
      symbol: "RELIANCE",
      companyName: "Reliance Industries Ltd",
      sector: "Oil & Gas",
      ltp: "₹2,450.50",
      change: <span className="text-green-600 font-semibold">+45.25</span>,
      changePercent: <StatusBadge status="+1.88%" type="success" />,
      volume: "5.2M",
      marketCap: "₹16.5 Lakh Cr",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "STK002",
      symbol: "HDFCBANK",
      companyName: "HDFC Bank Ltd",
      sector: "Banking",
      ltp: "₹1,650.75",
      change: <span className="text-green-600 font-semibold">+22.50</span>,
      changePercent: <StatusBadge status="+1.38%" type="success" />,
      volume: "8.1M",
      marketCap: "₹12.2 Lakh Cr",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "STK003",
      symbol: "INFY",
      companyName: "Infosys Ltd",
      sector: "IT Services",
      ltp: "₹1,480.25",
      change: <span className="text-red-600 font-semibold">-15.75</span>,
      changePercent: <StatusBadge status="-1.05%" type="error" />,
      volume: "4.5M",
      marketCap: "₹6.1 Lakh Cr",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "STK004",
      symbol: "TCS",
      companyName: "Tata Consultancy Services Ltd",
      sector: "IT Services",
      ltp: "₹3,650.00",
      change: <span className="text-green-600 font-semibold">+58.25</span>,
      changePercent: <StatusBadge status="+1.62%" type="success" />,
      volume: "2.8M",
      marketCap: "₹13.3 Lakh Cr",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "STK005",
      symbol: "ITC",
      companyName: "ITC Ltd",
      sector: "FMCG",
      ltp: "₹415.50",
      change: <span className="text-red-600 font-semibold">-5.25</span>,
      changePercent: <StatusBadge status="-1.25%" type="error" />,
      volume: "12.4M",
      marketCap: "₹5.2 Lakh Cr",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "STK006",
      symbol: "WIPRO",
      companyName: "Wipro Ltd",
      sector: "IT Services",
      ltp: "₹450.75",
      change: <span className="text-green-600 font-semibold">+8.50</span>,
      changePercent: <StatusBadge status="+1.92%" type="success" />,
      volume: "6.7M",
      marketCap: "₹2.5 Lakh Cr",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "STK007",
      symbol: "TATAMOTORS",
      companyName: "Tata Motors Ltd",
      sector: "Automobile",
      ltp: "₹625.00",
      change: <span className="text-red-600 font-semibold">-12.25</span>,
      changePercent: <StatusBadge status="-1.92%" type="error" />,
      volume: "18.3M",
      marketCap: "₹2.3 Lakh Cr",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "STK008",
      symbol: "AXISBANK",
      companyName: "Axis Bank Ltd",
      sector: "Banking",
      ltp: "₹1,050.25",
      change: <span className="text-green-600 font-semibold">+18.75</span>,
      changePercent: <StatusBadge status="+1.82%" type="success" />,
      volume: "9.2M",
      marketCap: "₹3.2 Lakh Cr",
      status: <StatusBadge status="Active" type="success" />,
    },
  ];

  // Filter Fields
  const filterFields = [
    {
      name: "sector",
      label: "Sector",
      type: "select" as const,
      options: [
        { label: "Banking", value: "banking" },
        { label: "IT Services", value: "it" },
        { label: "Oil & Gas", value: "oil" },
        { label: "FMCG", value: "fmcg" },
        { label: "Automobile", value: "auto" },
      ],
    },
    {
      name: "priceRange",
      label: "Price Range",
      type: "select" as const,
      options: [
        { label: "Under ₹500", value: "under500" },
        { label: "₹500 - ₹1000", value: "500-1000" },
        { label: "₹1000 - ₹2000", value: "1000-2000" },
        { label: "Above ₹2000", value: "above2000" },
      ],
    },
    {
      name: "performance",
      label: "Performance",
      type: "select" as const,
      options: [
        { label: "Top Gainers", value: "gainers" },
        { label: "Top Losers", value: "losers" },
        { label: "Most Active", value: "active" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Active", value: "active" },
        { label: "Suspended", value: "suspended" },
      ],
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/products/stocks/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/products/stocks/${id}/edit`);
  };

  const handleExport = () => {
    console.log("Exporting stocks data...");
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
        title="Stocks Management"
        description="Manage stock listings, prices, and market data"
        showAddButton={true}
        addButtonText="Add Stock"
        addButtonHref="/admin/products/stocks/add"
        showExportButton={true}
        onExportClick={handleExport}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      {/* Quick Stats */}
      <QuickStats stats={quickStats} />

      {/* Market Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">
                Market Sentiment
              </p>
              <p className="text-2xl font-bold text-green-600 mt-1">Bullish</p>
            </div>
            <FaArrowUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Total Volume</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">₹45.2 Cr</p>
            </div>
            <FaChartLine className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">
                Advance/Decline
              </p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                1234/987
              </p>
            </div>
            <FaChartPie className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Stocks Table */}
      <DataTable
        columns={columns}
        data={stocksData}
        onView={handleView}
        onEdit={handleEdit}
      />

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

export default StocksPage;
