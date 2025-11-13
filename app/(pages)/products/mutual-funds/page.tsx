"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChartPie, FaArrowUp, FaStar, FaUsers } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const MutualFundsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const quickStats = [
    {
      label: "Total Funds",
      value: "2,450",
      icon: <FaChartPie className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Investors",
      value: "12,340",
      icon: <FaUsers className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Top Performers",
      value: "234",
      icon: <FaArrowUp className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "5-Star Rated",
      value: "145",
      icon: <FaStar className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const columns = [
    { key: "fundName", label: "Fund Name", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "nav", label: "NAV", sortable: true },
    { key: "returns1Y", label: "1Y Return", sortable: true },
    { key: "returns3Y", label: "3Y Return", sortable: true },
    { key: "aum", label: "AUM", sortable: true },
    { key: "rating", label: "Rating", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const fundsData = [
    {
      id: "MF001",
      fundName: "HDFC Top 100 Fund",
      category: "Large Cap",
      nav: "₹845.50",
      returns1Y: <StatusBadge status="+15.2%" type="success" />,
      returns3Y: <StatusBadge status="+18.5%" type="success" />,
      aum: "₹12,450 Cr",
      rating: "⭐⭐⭐⭐⭐",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "MF002",
      fundName: "ICICI Bluechip Fund",
      category: "Large Cap",
      nav: "₹762.25",
      returns1Y: <StatusBadge status="+14.8%" type="success" />,
      returns3Y: <StatusBadge status="+17.2%" type="success" />,
      aum: "₹8,920 Cr",
      rating: "⭐⭐⭐⭐",
      status: <StatusBadge status="Active" type="success" />,
    },
    {
      id: "MF003",
      fundName: "SBI Small Cap Fund",
      category: "Small Cap",
      nav: "₹124.75",
      returns1Y: <StatusBadge status="+22.5%" type="success" />,
      returns3Y: <StatusBadge status="+25.8%" type="success" />,
      aum: "₹3,450 Cr",
      rating: "⭐⭐⭐⭐⭐",
      status: <StatusBadge status="Active" type="success" />,
    },
  ];

  const filterFields = [
    {
      name: "category",
      label: "Category",
      type: "select" as const,
      options: [
        { label: "Large Cap", value: "large_cap" },
        { label: "Mid Cap", value: "mid_cap" },
        { label: "Small Cap", value: "small_cap" },
        { label: "Multi Cap", value: "multi_cap" },
        { label: "Debt", value: "debt" },
        { label: "Hybrid", value: "hybrid" },
      ],
    },
    {
      name: "rating",
      label: "Rating",
      type: "select" as const,
      options: [
        { label: "5 Star", value: "5" },
        { label: "4 Star", value: "4" },
        { label: "3 Star", value: "3" },
      ],
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/products/mutual-funds/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/products/mutual-funds/${id}/edit`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mutual Funds"
        description="Manage mutual fund listings and investor data"
        showAddButton={true}
        addButtonText="Add Fund"
        addButtonHref="/admin/products/mutual-funds/add"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <DataTable
        columns={columns}
        data={fundsData}
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

export default MutualFundsPage;
