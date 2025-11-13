"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";

const PaymentsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

  const quickStats = [
    {
      label: "Total Transactions",
      value: "12,450",
      icon: <FaExchangeAlt className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Total Deposits",
      value: "₹45.2 Cr",
      icon: <FaArrowDown className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Total Withdrawals",
      value: "₹32.8 Cr",
      icon: <FaArrowUp className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Pending",
      value: "23",
      icon: <FaWallet className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const columns = [
    { key: "transactionId", label: "Transaction ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "method", label: "Payment Method", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "timestamp", label: "Date & Time", sortable: true },
  ];

  const transactionsData = [
    {
      id: "TXN001",
      transactionId: "TXN001",
      user: "Rajesh Kumar",
      type: <StatusBadge status="Deposit" type="success" />,
      amount: "₹50,000",
      method: "UPI",
      status: <StatusBadge status="Completed" type="success" />,
      timestamp: "2024-11-11 09:15:23",
    },
    {
      id: "TXN002",
      transactionId: "TXN002",
      user: "Priya Sharma",
      type: <StatusBadge status="Withdrawal" type="error" />,
      amount: "₹25,000",
      method: "Bank Transfer",
      status: <StatusBadge status="Pending" type="warning" />,
      timestamp: "2024-11-11 09:20:45",
    },
    {
      id: "TXN003",
      transactionId: "TXN003",
      user: "Amit Patel",
      type: <StatusBadge status="Deposit" type="success" />,
      amount: "₹1,00,000",
      method: "Net Banking",
      status: <StatusBadge status="Completed" type="success" />,
      timestamp: "2024-11-11 09:30:12",
    },
    {
      id: "TXN004",
      transactionId: "TXN004",
      user: "Sneha Reddy",
      type: <StatusBadge status="Withdrawal" type="error" />,
      amount: "₹75,000",
      method: "Bank Transfer",
      status: <StatusBadge status="Processing" type="info" />,
      timestamp: "2024-11-11 09:45:30",
    },
    {
      id: "TXN005",
      transactionId: "TXN005",
      user: "Vikram Singh",
      type: <StatusBadge status="Deposit" type="success" />,
      amount: "₹2,00,000",
      method: "UPI",
      status: <StatusBadge status="Completed" type="success" />,
      timestamp: "2024-11-11 10:15:18",
    },
  ];

  const filterFields = [
    {
      name: "type",
      label: "Transaction Type",
      type: "select" as const,
      options: [
        { label: "Deposit", value: "deposit" },
        { label: "Withdrawal", value: "withdrawal" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Completed", value: "completed" },
        { label: "Pending", value: "pending" },
        { label: "Processing", value: "processing" },
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
    router.push(`/admin/payments/${id}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Monitor and manage all payment transactions"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <DataTable
        columns={columns}
        data={transactionsData}
        onView={handleView}
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

export default PaymentsPage;
