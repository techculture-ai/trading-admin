"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const DepositsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const quickStats = [
    {
      label: "Total Deposits Today",
      value: "234",
      icon: <FaMoneyBillWave className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Amount Deposited",
      value: "₹45.2L",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Pending Verification",
      value: "8",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Failed Deposits",
      value: "2",
      icon: <FaTimes className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const columns = [
    { key: "depositId", label: "Deposit ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "method", label: "Payment Method", sortable: true },
    { key: "transactionId", label: "Transaction ID", sortable: true },
    { key: "timestamp", label: "Date & Time", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const depositsData = [
    {
      id: "DEP001",
      depositId: "DEP001",
      user: "Rajesh Kumar",
      amount: "₹50,000",
      method: "UPI",
      transactionId: "UPI2024111109152345",
      timestamp: "2024-11-11 09:15:23",
      status: <StatusBadge status="Completed" type="success" />,
    },
    {
      id: "DEP002",
      depositId: "DEP002",
      user: "Priya Sharma",
      amount: "₹1,00,000",
      method: "Net Banking",
      transactionId: "NB2024111108304567",
      timestamp: "2024-11-11 08:30:45",
      status: <StatusBadge status="Completed" type="success" />,
    },
    {
      id: "DEP003",
      depositId: "DEP003",
      user: "Amit Patel",
      amount: "₹25,000",
      method: "UPI",
      transactionId: "UPI2024111110451289",
      timestamp: "2024-11-11 10:45:12",
      status: <StatusBadge status="Pending" type="warning" />,
    },
    {
      id: "DEP004",
      depositId: "DEP004",
      user: "Sneha Reddy",
      amount: "₹75,000",
      method: "Bank Transfer",
      transactionId: "NEFT2024111007203456",
      timestamp: "2024-11-10 07:20:30",
      status: <StatusBadge status="Failed" type="error" />,
    },
  ];

  const filterFields = [
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Completed", value: "completed" },
        { label: "Pending", value: "pending" },
        { label: "Failed", value: "failed" },
      ],
    },
    {
      name: "method",
      label: "Payment Method",
      type: "select" as const,
      options: [
        { label: "UPI", value: "upi" },
        { label: "Net Banking", value: "netbanking" },
        { label: "Bank Transfer", value: "bank_transfer" },
      ],
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
  ];

  const handleView = (id: string) => {
    router.push(`/admin/payments/deposits/${id}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deposit History"
        description="Monitor all deposit transactions and their status"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <DataTable columns={columns} data={depositsData} onView={handleView} />

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

export default DepositsPage;
