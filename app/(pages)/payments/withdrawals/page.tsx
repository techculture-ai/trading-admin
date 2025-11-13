"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaMoneyBillWave,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import ConfirmModal from "@/components/ConfirmModal";
import QuickStats from "@/components/QuickStats";

const WithdrawalsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<string | null>(
    null
  );
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const quickStats = [
    {
      label: "Pending Approvals",
      value: "12",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Approved Today",
      value: "45",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Total Amount (Pending)",
      value: "₹12.5L",
      icon: <FaMoneyBillWave className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Rejected",
      value: "3",
      icon: <FaTimes className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const columns = [
    { key: "withdrawalId", label: "Withdrawal ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "bankAccount", label: "Bank Account", sortable: true },
    { key: "requestDate", label: "Request Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "priority", label: "Priority", sortable: true },
  ];

  const withdrawalsData = [
    {
      id: "WD001",
      withdrawalId: "WD001",
      user: "Rajesh Kumar",
      amount: "₹50,000",
      bankAccount: "HDFC ***1234",
      requestDate: "2024-11-11 09:15:23",
      status: <StatusBadge status="Pending" type="warning" />,
      priority: <StatusBadge status="High" type="error" />,
    },
    {
      id: "WD002",
      withdrawalId: "WD002",
      user: "Priya Sharma",
      amount: "₹25,000",
      bankAccount: "ICICI ***5678",
      requestDate: "2024-11-11 08:30:45",
      status: <StatusBadge status="Approved" type="success" />,
      priority: <StatusBadge status="Medium" type="warning" />,
    },
    {
      id: "WD003",
      withdrawalId: "WD003",
      user: "Amit Patel",
      amount: "₹1,00,000",
      bankAccount: "SBI ***9012",
      requestDate: "2024-11-11 10:45:12",
      status: <StatusBadge status="Pending" type="warning" />,
      priority: <StatusBadge status="High" type="error" />,
    },
    {
      id: "WD004",
      withdrawalId: "WD004",
      user: "Sneha Reddy",
      amount: "₹15,000",
      bankAccount: "Axis ***3456",
      requestDate: "2024-11-10 16:20:30",
      status: <StatusBadge status="Rejected" type="error" />,
      priority: <StatusBadge status="Low" type="default" />,
    },
  ];

  const filterFields = [
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "Processing", value: "processing" },
      ],
    },
    {
      name: "priority",
      label: "Priority",
      type: "select" as const,
      options: [
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" },
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
    router.push(`/admin/payments/withdrawals/${id}`);
  };

  const handleApprove = (id: string) => {
    setSelectedWithdrawal(id);
    setShowApproveModal(true);
  };

  const handleReject = (id: string) => {
    setSelectedWithdrawal(id);
    setShowRejectModal(true);
  };

  const confirmApprove = () => {
    console.log("Approving withdrawal:", selectedWithdrawal);
    setShowApproveModal(false);
    setSelectedWithdrawal(null);
  };

  const confirmReject = () => {
    console.log("Rejecting withdrawal:", selectedWithdrawal);
    setShowRejectModal(false);
    setSelectedWithdrawal(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Withdrawal Requests"
        description="Review and approve withdrawal requests from users"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      {/* Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <FaClock className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800">
              12 Pending Withdrawals
            </h4>
            <p className="text-sm text-yellow-700">
              Total amount pending for approval: ₹12,50,000
            </p>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={withdrawalsData}
        onView={handleView}
        onEdit={handleApprove}
        onDelete={handleReject}
      />

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={(filters) => console.log(filters)}
        onReset={() => console.log("Reset")}
      />

      <ConfirmModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={confirmApprove}
        title="Approve Withdrawal"
        message="Are you sure you want to approve this withdrawal? The amount will be transferred to the user's bank account."
        confirmText="Approve"
        cancelText="Cancel"
        type="info"
      />

      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={confirmReject}
        title="Reject Withdrawal"
        message="Are you sure you want to reject this withdrawal? Please provide a reason for rejection."
        confirmText="Reject"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default WithdrawalsPage;
