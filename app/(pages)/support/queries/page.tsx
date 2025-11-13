"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaQuestionCircle,
  FaReply,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const QueriesPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const quickStats = [
    {
      label: "New Queries",
      value: "16",
      icon: <FaQuestionCircle className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Pending Response",
      value: "8",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Replied Today",
      value: "32",
      icon: <FaReply className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Resolved",
      value: "234",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const columns = [
    { key: "queryId", label: "Query ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "query", label: "Query", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "createdDate", label: "Date", sortable: true },
  ];

  const queriesData = [
    {
      id: "QRY001",
      queryId: "QRY001",
      user: "Rajesh Kumar",
      email: "rajesh@email.com",
      query: "How to start SIP in mutual funds?",
      category: <StatusBadge status="Mutual Funds" type="info" />,
      status: <StatusBadge status="New" type="warning" />,
      createdDate: "2024-11-11 09:15",
    },
    {
      id: "QRY002",
      queryId: "QRY002",
      user: "Priya Sharma",
      email: "priya@email.com",
      query: "What are the charges for F&O trading?",
      category: <StatusBadge status="Trading" type="default" />,
      status: <StatusBadge status="Replied" type="success" />,
      createdDate: "2024-11-11 08:30",
    },
    {
      id: "QRY003",
      queryId: "QRY003",
      user: "Amit Patel",
      email: "amit@email.com",
      query: "IPO application process?",
      category: <StatusBadge status="IPO" type="info" />,
      status: <StatusBadge status="Pending" type="warning" />,
      createdDate: "2024-11-11 07:45",
    },
  ];

  const filterFields = [
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "New", value: "new" },
        { label: "Pending", value: "pending" },
        { label: "Replied", value: "replied" },
        { label: "Resolved", value: "resolved" },
      ],
    },
    {
      name: "category",
      label: "Category",
      type: "select" as const,
      options: [
        { label: "Trading", value: "trading" },
        { label: "Mutual Funds", value: "mutual_funds" },
        { label: "IPO", value: "ipo" },
        { label: "Account", value: "account" },
      ],
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/support/queries/${id}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Queries"
        description="Respond to general customer queries and questions"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <DataTable columns={columns} data={queriesData} onView={handleView} />

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

export default QueriesPage;
