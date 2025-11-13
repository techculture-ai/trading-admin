"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaEye,
  FaEdit,
  FaBan,
  FaCheckCircle,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import ConfirmModal from "@/components/ConfirmModal";
import QuickStats from "@/components/QuickStats";

const UsersPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);

  // Quick Stats
  const quickStats = [
    {
      label: "Total Users",
      value: "15,234",
      icon: <FaUsers className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Users",
      value: "12,450",
      icon: <FaUserCheck className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Pending KYC",
      value: "1,234",
      icon: <FaUserClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Blocked Users",
      value: "156",
      icon: <FaUserTimes className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  // Table Columns
  const columns = [
    { key: "id", label: "User ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
    { key: "kycStatus", label: "KYC Status", sortable: true },
    { key: "accountStatus", label: "Account Status", sortable: true },
    { key: "tradingStatus", label: "Trading", sortable: true },
    { key: "joinedDate", label: "Joined Date", sortable: true },
  ];

  // Sample Data
  const usersData = [
    {
      id: "USR001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      kycStatus: <StatusBadge status="Verified" type="success" />,
      accountStatus: <StatusBadge status="Active" type="success" />,
      tradingStatus: <StatusBadge status="Enabled" type="info" />,
      joinedDate: "2024-01-15",
    },
    {
      id: "USR002",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43211",
      kycStatus: <StatusBadge status="Pending" type="warning" />,
      accountStatus: <StatusBadge status="Active" type="success" />,
      tradingStatus: <StatusBadge status="Disabled" type="default" />,
      joinedDate: "2024-02-20",
    },
    {
      id: "USR003",
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 98765 43212",
      kycStatus: <StatusBadge status="Verified" type="success" />,
      accountStatus: <StatusBadge status="Active" type="success" />,
      tradingStatus: <StatusBadge status="Enabled" type="info" />,
      joinedDate: "2024-03-10",
    },
    {
      id: "USR004",
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 98765 43213",
      kycStatus: <StatusBadge status="Rejected" type="error" />,
      accountStatus: <StatusBadge status="Inactive" type="default" />,
      tradingStatus: <StatusBadge status="Disabled" type="default" />,
      joinedDate: "2024-04-05",
    },
    {
      id: "USR005",
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 98765 43214",
      kycStatus: <StatusBadge status="Verified" type="success" />,
      accountStatus: <StatusBadge status="Blocked" type="error" />,
      tradingStatus: <StatusBadge status="Disabled" type="default" />,
      joinedDate: "2024-05-12",
    },
    {
      id: "USR006",
      name: "Anita Desai",
      email: "anita.desai@email.com",
      phone: "+91 98765 43215",
      kycStatus: <StatusBadge status="Verified" type="success" />,
      accountStatus: <StatusBadge status="Active" type="success" />,
      tradingStatus: <StatusBadge status="Enabled" type="info" />,
      joinedDate: "2024-06-18",
    },
    {
      id: "USR007",
      name: "Rahul Mehta",
      email: "rahul.mehta@email.com",
      phone: "+91 98765 43216",
      kycStatus: <StatusBadge status="Pending" type="warning" />,
      accountStatus: <StatusBadge status="Active" type="success" />,
      tradingStatus: <StatusBadge status="Disabled" type="default" />,
      joinedDate: "2024-07-22",
    },
    {
      id: "USR008",
      name: "Deepa Nair",
      email: "deepa.nair@email.com",
      phone: "+91 98765 43217",
      kycStatus: <StatusBadge status="Verified" type="success" />,
      accountStatus: <StatusBadge status="Active" type="success" />,
      tradingStatus: <StatusBadge status="Enabled" type="info" />,
      joinedDate: "2024-08-30",
    },
  ];

  // Filter Fields
  const filterFields = [
    {
      name: "kycStatus",
      label: "KYC Status",
      type: "select" as const,
      options: [
        { label: "Verified", value: "verified" },
        { label: "Pending", value: "pending" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "accountStatus",
      label: "Account Status",
      type: "select" as const,
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Blocked", value: "blocked" },
      ],
    },
    {
      name: "fromDate",
      label: "Joined From",
      type: "date" as const,
    },
    {
      name: "toDate",
      label: "Joined To",
      type: "date" as const,
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/users/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/users/${id}/edit`);
  };

  const handleBlock = (id: string) => {
    setSelectedUser(id);
    setShowBlockModal(true);
  };

  const confirmBlock = () => {
    console.log("Blocking user:", selectedUser);
    setShowBlockModal(false);
    setSelectedUser(null);
    // Add your block logic here
  };

  const handleExport = () => {
    console.log("Exporting users data...");
    // Add export logic
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    console.log("Applied filters:", filters);
    // Add filter logic
  };

  const handleResetFilters = () => {
    console.log("Resetting filters...");
    // Add reset logic
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="User Management"
        description="Manage all registered users, their KYC status, and trading permissions"
        showAddButton={false}
        showExportButton={true}
        onExportClick={handleExport}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      {/* Quick Stats */}
      <QuickStats stats={quickStats} />

      {/* Users Table */}
      <DataTable
        columns={columns}
        data={usersData}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleBlock}
      />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Block Confirmation Modal */}
      <ConfirmModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        onConfirm={confirmBlock}
        title="Block User"
        message="Are you sure you want to block this user? They will not be able to access their account or perform any trades."
        confirmText="Block User"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default UsersPage;
