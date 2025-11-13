"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaChartLine,
  FaSync,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import ConfirmModal from "@/components/ConfirmModal";
import QuickStats from "@/components/QuickStats";

const OrdersPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Quick Stats
  const quickStats = [
    {
      label: "Pending Orders",
      value: "45",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Executed Today",
      value: "1,234",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Cancelled",
      value: "23",
      icon: <FaTimes className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Partially Filled",
      value: "12",
      icon: <FaSync className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  // Table Columns
  const columns = [
    { key: "orderId", label: "Order ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "orderType", label: "Order Type", sortable: true },
    { key: "type", label: "Buy/Sell", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "timestamp", label: "Time", sortable: true },
  ];

  // Sample Data
  const ordersData = [
    {
      id: "ORD001",
      orderId: "ORD001",
      user: "Rajesh Kumar",
      stock: "RELIANCE",
      orderType: <StatusBadge status="Market" type="info" />,
      type: <StatusBadge status="BUY" type="success" />,
      quantity: "100",
      price: "₹2,450.50",
      status: <StatusBadge status="Pending" type="warning" />,
      timestamp: "09:15:23",
    },
    {
      id: "ORD002",
      orderId: "ORD002",
      user: "Priya Sharma",
      stock: "HDFCBANK",
      orderType: <StatusBadge status="Limit" type="default" />,
      type: <StatusBadge status="SELL" type="error" />,
      quantity: "50",
      price: "₹1,650.00",
      status: <StatusBadge status="Executed" type="success" />,
      timestamp: "09:18:45",
    },
    {
      id: "ORD003",
      orderId: "ORD003",
      user: "Amit Patel",
      stock: "INFY",
      orderType: <StatusBadge status="Stop Loss" type="warning" />,
      type: <StatusBadge status="BUY" type="success" />,
      quantity: "75",
      price: "₹1,480.00",
      status: <StatusBadge status="Pending" type="warning" />,
      timestamp: "09:22:10",
    },
    {
      id: "ORD004",
      orderId: "ORD004",
      user: "Sneha Reddy",
      stock: "TCS",
      orderType: <StatusBadge status="Market" type="info" />,
      type: <StatusBadge status="BUY" type="success" />,
      quantity: "120",
      price: "₹3,650.00",
      status: <StatusBadge status="Executed" type="success" />,
      timestamp: "09:30:55",
    },
    {
      id: "ORD005",
      orderId: "ORD005",
      user: "Vikram Singh",
      stock: "ITC",
      orderType: <StatusBadge status="Limit" type="default" />,
      type: <StatusBadge status="SELL" type="error" />,
      quantity: "200",
      price: "₹415.50",
      status: <StatusBadge status="Cancelled" type="default" />,
      timestamp: "09:35:12",
    },
  ];

  // Filter Fields
  const filterFields = [
    {
      name: "orderType",
      label: "Order Type",
      type: "select" as const,
      options: [
        { label: "Market", value: "market" },
        { label: "Limit", value: "limit" },
        { label: "Stop Loss", value: "stop_loss" },
      ],
    },
    {
      name: "tradeType",
      label: "Buy/Sell",
      type: "select" as const,
      options: [
        { label: "Buy", value: "buy" },
        { label: "Sell", value: "sell" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Pending", value: "pending" },
        { label: "Executed", value: "executed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Partially Filled", value: "partial" },
      ],
    },
  ];

  const handleView = (id: string) => {
    setSelectedOrder(id);
    setShowDetailsModal(true);
  };

  const handleCancel = (id: string) => {
    setSelectedOrder(id);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    console.log("Cancelling order:", selectedOrder);
    setShowCancelModal(false);
    setSelectedOrder(null);
  };

  const handleExport = () => {
    console.log("Exporting orders data...");
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    console.log("Applied filters:", filters);
  };

  const handleResetFilters = () => {
    console.log("Resetting filters...");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders Management"
        description="Monitor and manage all pending and executed orders"
        showExportButton={true}
        onExportClick={handleExport}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      <DataTable
        columns={columns}
        data={ordersData}
        onView={handleView}
        onDelete={handleCancel}
      />

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Cancel Order"
        cancelText="Keep Order"
        type="danger"
      />

      {/* Order Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                Order Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Order ID
                  </label>
                  <p className="text-lg font-semibold text-gray-900">ORD001</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    User
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    Rajesh Kumar
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Stock
                  </label>
                  <p className="text-gray-900">RELIANCE</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Type
                  </label>
                  <p className="text-gray-900">BUY - Market Order</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Quantity
                  </label>
                  <p className="text-gray-900">100 shares</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Price
                  </label>
                  <p className="text-gray-900">₹2,450.50</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
