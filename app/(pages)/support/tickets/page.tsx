"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import QuickStats from "@/components/QuickStats";
import ConfirmModal from "@/components/ConfirmModal";

const TicketsPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const quickStats = [
    {
      label: "Open Tickets",
      value: "18",
      icon: <FaTicketAlt className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "In Progress",
      value: "12",
      icon: <FaClock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Resolved Today",
      value: "45",
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "High Priority",
      value: "5",
      icon: <FaExclamationCircle className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const columns = [
    { key: "ticketId", label: "Ticket ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "subject", label: "Subject", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "priority", label: "Priority", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "assignedTo", label: "Assigned To", sortable: true },
    { key: "createdDate", label: "Created", sortable: true },
  ];

  const ticketsData = [
    {
      id: "TKT001",
      ticketId: "TKT001",
      user: "Rajesh Kumar",
      subject: "Unable to place order",
      category: <StatusBadge status="Trading" type="info" />,
      priority: <StatusBadge status="High" type="error" />,
      status: <StatusBadge status="Open" type="warning" />,
      assignedTo: "Support Team 1",
      createdDate: "2024-11-11 09:15",
    },
    {
      id: "TKT002",
      ticketId: "TKT002",
      user: "Priya Sharma",
      subject: "KYC verification issue",
      category: <StatusBadge status="KYC" type="default" />,
      priority: <StatusBadge status="Medium" type="warning" />,
      status: <StatusBadge status="In Progress" type="info" />,
      assignedTo: "KYC Team",
      createdDate: "2024-11-11 08:30",
    },
    {
      id: "TKT003",
      ticketId: "TKT003",
      user: "Amit Patel",
      subject: "Withdrawal not received",
      category: <StatusBadge status="Payment" type="success" />,
      priority: <StatusBadge status="High" type="error" />,
      status: <StatusBadge status="Open" type="warning" />,
      assignedTo: "Payment Team",
      createdDate: "2024-11-11 07:45",
    },
    {
      id: "TKT004",
      ticketId: "TKT004",
      user: "Sneha Reddy",
      subject: "Account login problem",
      category: <StatusBadge status="Technical" type="default" />,
      priority: <StatusBadge status="Low" type="default" />,
      status: <StatusBadge status="Resolved" type="success" />,
      assignedTo: "Tech Support",
      createdDate: "2024-11-10 16:20",
    },
    {
      id: "TKT005",
      ticketId: "TKT005",
      user: "Vikram Singh",
      subject: "IPO application failed",
      category: <StatusBadge status="IPO" type="info" />,
      priority: <StatusBadge status="Medium" type="warning" />,
      status: <StatusBadge status="In Progress" type="info" />,
      assignedTo: "IPO Team",
      createdDate: "2024-11-10 14:30",
    },
  ];

  const filterFields = [
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Open", value: "open" },
        { label: "In Progress", value: "in_progress" },
        { label: "Resolved", value: "resolved" },
        { label: "Closed", value: "closed" },
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
      name: "category",
      label: "Category",
      type: "select" as const,
      options: [
        { label: "Trading", value: "trading" },
        { label: "KYC", value: "kyc" },
        { label: "Payment", value: "payment" },
        { label: "Technical", value: "technical" },
        { label: "IPO", value: "ipo" },
      ],
    },
    {
      name: "fromDate",
      label: "From Date",
      type: "date" as const,
    },
  ];

  const handleView = (id: string) => {
    router.push(`/admin/support/tickets/${id}`);
  };

  const handleReply = (id: string) => {
    setSelectedTicket(id);
    setShowReplyModal(true);
  };

  const submitReply = () => {
    console.log("Reply to ticket:", selectedTicket, reply);
    setShowReplyModal(false);
    setSelectedTicket(null);
    setReply("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Tickets"
        description="Manage and respond to customer support tickets"
        showExportButton={true}
        onExportClick={() => console.log("Export")}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      <QuickStats stats={quickStats} />

      {/* Alert */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <FaExclamationCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-800">
              5 High Priority Tickets
            </h4>
            <p className="text-sm text-red-700">
              These tickets require immediate attention. Average response time:
              2 hours.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={ticketsData}
        onView={handleView}
        onEdit={handleReply}
      />

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={(filters) => console.log(filters)}
        onReset={() => console.log("Reset")}
      />

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                Reply to Ticket
              </h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Reply
              </label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20"
                placeholder="Type your reply here..."
              ></textarea>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowReplyModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={submitReply}
                className="flex-1 px-4 py-2 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg font-semibold"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
