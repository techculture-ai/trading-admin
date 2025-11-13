"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaIdCard, FaCheckCircle, FaClock, FaBan } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";
import ConfirmModal from "@/components/ConfirmModal";

const DematAccountsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const quickStats = [
    {
      label: "Total Demat Accounts",
      value: "15,234",
      icon: <FaIdCard className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Accounts",
      value: "14,120",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Pending Activation",
      value: "234",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Inactive/Blocked",
      value: "880",
      icon: <FaBan className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const columns = [
    { key: "dematId", label: "Demat ID", sortable: true },
    { key: "userName", label: "User Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "dpId", label: "DP ID", sortable: true },
    { key: "clientId", label: "Client ID", sortable: true },
    { key: "openingDate", label: "Opening Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "holdings", label: "Holdings", sortable: true },
  ];

  const dematData = [
    {
      id: "DM001",
      dematId: "DM001",
      userName: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      dpId: "IN300214",
      clientId: "12345678",
      openingDate: "2024-01-15",
      status: <StatusBadge status="Active" type="success" />,
      holdings: "₹12.5L",
    },
    {
      id: "DM002",
      dematId: "DM002",
      userName: "Priya Sharma",
      email: "priya.sharma@email.com",
      dpId: "IN300214",
      clientId: "23456789",
      openingDate: "2024-02-20",
      status: <StatusBadge status="Active" type="success" />,
      holdings: "₹8.2L",
    },
    {
      id: "DM003",
      dematId: "DM003",
      userName: "Amit Patel",
      email: "amit.patel@email.com",
      dpId: "IN300214",
      clientId: "34567890",
      openingDate: "2024-03-10",
      status: <StatusBadge status="Pending" type="warning" />,
      holdings: "₹0",
    },
    {
      id: "DM004",
      dematId: "DM004",
      userName: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      dpId: "IN300214",
      clientId: "45678901",
      openingDate: "2024-04-05",
      status: <StatusBadge status="Inactive" type="default" />,
      holdings: "₹15.8L",
    },
    {
      id: "DM005",
      dematId: "DM005",
      userName: "Vikram Singh",
      email: "vikram.singh@email.com",
      dpId: "IN300214",
      clientId: "56789012",
      openingDate: "2024-05-12",
      status: <StatusBadge status="Blocked" type="error" />,
      holdings: "₹5.4L",
    },
  ];

  const filterFields = [
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Inactive", value: "inactive" },
        { label: "Blocked", value: "blocked" },
      ],
    },
    {
      name: "fromDate",
      label: "Opening From",
      type: "date" as const,
    },
    {
      name: "toDate",
      label: "Opening To",
      type: "date" as const,
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/accounts/demat/${id}`);
  };

  const handleActivate = (id: string) => {
    setSelectedAccount(id);
    setShowActivateModal(true);
  };

  const handleDeactivate = (id: string) => {
    setSelectedAccount(id);
    setShowDeactivateModal(true);
  };

  const confirmActivate = () => {
    console.log("Activating account:", selectedAccount);
    setShowActivateModal(false);
    setSelectedAccount(null);
  };

  const confirmDeactivate = () => {
    console.log("Deactivating account:", selectedAccount);
    setShowDeactivateModal(false);
    setSelectedAccount(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Demat Accounts"
        description="Manage user demat accounts and holdings"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <DataTable
        columns={columns}
        data={dematData}
        onView={handleView}
        onEdit={handleActivate}
        onDelete={handleDeactivate}
      />

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={(filters) => console.log(filters)}
        onReset={() => console.log("Reset")}
      />

      <ConfirmModal
        isOpen={showActivateModal}
        onClose={() => setShowActivateModal(false)}
        onConfirm={confirmActivate}
        title="Activate Demat Account"
        message="Are you sure you want to activate this demat account? The user will be able to start trading."
        confirmText="Activate"
        cancelText="Cancel"
        type="info"
      />

      <ConfirmModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={confirmDeactivate}
        title="Deactivate Demat Account"
        message="Are you sure you want to deactivate this demat account? The user will not be able to trade."
        confirmText="Deactivate"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default DematAccountsPage;
