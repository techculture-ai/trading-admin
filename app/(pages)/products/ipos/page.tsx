"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRocket, FaClock, FaCheckCircle, FaUsers } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const IPOsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const quickStats = [
    {
      label: "Upcoming IPOs",
      value: "3",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Open IPOs",
      value: "5",
      icon: <FaRocket className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Applications",
      value: "12,450",
      icon: <FaUsers className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Closed IPOs",
      value: "45",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const columns = [
    { key: "companyName", label: "Company Name", sortable: true },
    { key: "issueSize", label: "Issue Size", sortable: true },
    { key: "priceRange", label: "Price Range", sortable: true },
    { key: "openDate", label: "Open Date", sortable: true },
    { key: "closeDate", label: "Close Date", sortable: true },
    { key: "subscription", label: "Subscription", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const iposData = [
    {
      id: "IPO001",
      companyName: "TechCorp India Ltd",
      issueSize: "₹2,500 Cr",
      priceRange: "₹450 - ₹500",
      openDate: "2024-11-15",
      closeDate: "2024-11-20",
      subscription: <StatusBadge status="2.5x" type="success" />,
      status: <StatusBadge status="Open" type="success" />,
    },
    {
      id: "IPO002",
      companyName: "Green Energy Solutions",
      issueSize: "₹1,800 Cr",
      priceRange: "₹320 - ₹350",
      openDate: "2024-11-18",
      closeDate: "2024-11-22",
      subscription: <StatusBadge status="Coming Soon" type="info" />,
      status: <StatusBadge status="Upcoming" type="warning" />,
    },
    {
      id: "IPO003",
      companyName: "HealthPlus Pharma",
      issueSize: "₹3,200 Cr",
      priceRange: "₹680 - ₹720",
      openDate: "2024-11-05",
      closeDate: "2024-11-10",
      subscription: <StatusBadge status="15.8x" type="success" />,
      status: <StatusBadge status="Closed" type="default" />,
    },
  ];

  const filterFields = [
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Upcoming", value: "upcoming" },
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/products/ipos/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/products/ipos/${id}/edit`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="IPO Management"
        description="Manage IPO listings and track applications"
        showAddButton={true}
        addButtonText="Add IPO"
        addButtonHref="/admin/products/ipos/add"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <FaRocket className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800">3 Upcoming IPOs</h4>
            <p className="text-sm text-blue-700">
              New IPO applications will open in the next 7 days.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={iposData}
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

export default IPOsPage;
