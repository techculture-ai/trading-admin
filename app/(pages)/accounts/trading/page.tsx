"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChartLine, FaCheckCircle, FaClock, FaBan } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";
import ConfirmModal from "@/components/ConfirmModal";

const TradingAccountsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);

  const quickStats = [
    {
      label: "Total Trading Accounts",
      value: "12,450",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Traders",
      value: "8,234",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Pending Activation",
      value: "156",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Suspended",
      value: "60",
      icon: <FaBan className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const columns = [
    { key: "tradingId", label: "Trading ID", sortable: true },
    { key: "userName", label: "User Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "accountType", label: "Account Type", sortable: true },
    { key: "balance", label: "Available Balance", sortable: true },
    { key: "marginUsed", label: "Margin Used", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "lastTrade", label: "Last Trade", sortable: true },
  ];

  const tradingData = [
    {
      id: "TR001",
      tradingId: "TR001",
      userName: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      accountType: <StatusBadge status="Pro" type="success" />,
      balance: "₹2,45,000",
      marginUsed: "₹1,20,000",
      status: <StatusBadge status="Active" type="success" />,
      lastTrade: "2024-11-11 09:15",
    },
    {
      id: "TR002",
      tradingId: "TR002",
      userName: "Priya Sharma",
      email: "priya.sharma@email.com",
      accountType: <StatusBadge status="Basic" type="default" />,
      balance: "₹85,000",
      marginUsed: "₹25,000",
      status: <StatusBadge status="Active" type="success" />,
      lastTrade: "2024-11-11 08:30",
    },
    {
      id: "TR003",
      tradingId: "TR003",
      userName: "Amit Patel",
      email: "amit.patel@email.com",
      accountType: <StatusBadge status="Premium" type="info" />,
      balance: "₹5,20,000",
      marginUsed: "₹3,80,000",
      status: <StatusBadge status="Active" type="success" />,
      lastTrade: "2024-11-11 10:45",
    },
    {
      id: "TR004",
      tradingId: "TR004",
      userName: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      accountType: <StatusBadge status="Basic" type="default" />,
      balance: "₹15,000",
      marginUsed: "₹0",
      status: <StatusBadge status="Inactive" type="warning" />,
      lastTrade: "2024-10-15 14:20",
    },
    {
      id: "TR005",
      tradingId: "TR005",
      userName: "Vikram Singh",
      email: "vikram.singh@email.com",
      accountType: <StatusBadge status="Pro" type="success" />,
      balance: "₹1,20,000",
      marginUsed: "₹0",
      status: <StatusBadge status="Suspended" type="error" />,
      lastTrade: "2024-11-01 11:30",
    },
  ];

  const filterFields = [
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },
      ],
    },
    {
      name: "accountType",
      label: "Account Type",
      type: "select" as const,
      options: [
        { label: "Basic", value: "basic" },
        { label: "Pro", value: "pro" },
        { label: "Premium", value: "premium" },
      ],
    },
    {
      name: "minBalance",
      label: "Min Balance",
      type: "number" as const,
      placeholder: "Min balance",
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/accounts/trading/${id}`);
  };

  const handleEnable = (id: string) => {
    setSelectedAccount(id);
    setShowEnableModal(true);
  };

  const handleDisable = (id: string) => {
    setSelectedAccount(id);
    setShowDisableModal(true);
  };

  const confirmEnable = () => {
    console.log("Enabling trading:", selectedAccount);
    setShowEnableModal(false);
    setSelectedAccount(null);
  };

  const confirmDisable = () => {
    console.log("Disabling trading:", selectedAccount);
    setShowDisableModal(false);
    setSelectedAccount(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trading Accounts"
        description="Manage user trading accounts and balances"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <FaChartLine className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800">Market Hours</h4>
            <p className="text-sm text-blue-700">
              Trading is currently active. Monitor accounts for unusual
              activity.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={tradingData}
        onView={handleView}
        onEdit={handleEnable}
        onDelete={handleDisable}
      />

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={(filters) => console.log(filters)}
        onReset={() => console.log("Reset")}
      />

      <ConfirmModal
        isOpen={showEnableModal}
        onClose={() => setShowEnableModal(false)}
        onConfirm={confirmEnable}
        title="Enable Trading"
        message="Are you sure you want to enable trading for this account? The user will be able to place orders."
        confirmText="Enable"
        cancelText="Cancel"
        type="info"
      />

      <ConfirmModal
        isOpen={showDisableModal}
        onClose={() => setShowDisableModal(false)}
        onConfirm={confirmDisable}
        title="Suspend Trading"
        message="Are you sure you want to suspend trading for this account? The user will not be able to place new orders."
        confirmText="Suspend"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default TradingAccountsPage;

