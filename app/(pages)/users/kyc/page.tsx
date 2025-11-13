"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserCheck,
  FaClock,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEye,
  FaDownload,
  FaIdCard,
  FaMapMarkerAlt,
  FaFileAlt,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FilterPanel from "@/components/FilterPanel";
import ConfirmModal from "@/components/ConfirmModal";
import QuickStats from "@/components/QuickStats";

const KYCVerificationPage = () => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedKYC, setSelectedKYC] = useState<string | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Quick Stats
  const quickStats = [
    {
      label: "Pending Verification",
      value: "23",
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
      label: "Rejected",
      value: "8",
      icon: <FaTimes className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Under Review",
      value: "12",
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Table Columns
  const columns = [
    { key: "applicationId", label: "Application ID", sortable: true },
    { key: "userName", label: "User Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "documentType", label: "Document Type", sortable: true },
    { key: "submittedDate", label: "Submitted Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "priority", label: "Priority", sortable: true },
  ];

  // Sample Data
  const kycData = [
    {
      id: "KYC001",
      applicationId: "KYC001",
      userName: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      documentType: "Aadhaar + PAN",
      submittedDate: "2024-11-10 14:30",
      status: <StatusBadge status="Pending" type="warning" />,
      priority: <StatusBadge status="High" type="error" />,
    },
    {
      id: "KYC002",
      applicationId: "KYC002",
      userName: "Priya Sharma",
      email: "priya.sharma@email.com",
      documentType: "PAN + Passport",
      submittedDate: "2024-11-10 12:15",
      status: <StatusBadge status="Under Review" type="info" />,
      priority: <StatusBadge status="Medium" type="warning" />,
    },
    {
      id: "KYC003",
      applicationId: "KYC003",
      userName: "Amit Patel",
      email: "amit.patel@email.com",
      documentType: "Aadhaar + Driving License",
      submittedDate: "2024-11-09 18:45",
      status: <StatusBadge status="Pending" type="warning" />,
      priority: <StatusBadge status="High" type="error" />,
    },
    {
      id: "KYC004",
      applicationId: "KYC004",
      userName: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      documentType: "PAN + Voter ID",
      submittedDate: "2024-11-09 16:20",
      status: <StatusBadge status="Approved" type="success" />,
      priority: <StatusBadge status="Low" type="default" />,
    },
    {
      id: "KYC005",
      applicationId: "KYC005",
      userName: "Vikram Singh",
      email: "vikram.singh@email.com",
      documentType: "Aadhaar + PAN",
      submittedDate: "2024-11-08 11:30",
      status: <StatusBadge status="Rejected" type="error" />,
      priority: <StatusBadge status="Medium" type="warning" />,
    },
  ];

  // Filter Fields
  const filterFields = [
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Pending", value: "pending" },
        { label: "Under Review", value: "review" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
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
      name: "documentType",
      label: "Document Type",
      type: "select" as const,
      options: [
        { label: "Aadhaar", value: "aadhaar" },
        { label: "PAN", value: "pan" },
        { label: "Passport", value: "passport" },
        { label: "Driving License", value: "dl" },
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
    setSelectedKYC(id);
    setShowDetailsModal(true);
  };

  const handleApprove = (id: string) => {
    setSelectedKYC(id);
    setShowApproveModal(true);
  };

  const handleReject = (id: string) => {
    setSelectedKYC(id);
    setShowRejectModal(true);
  };

  const confirmApprove = () => {
    console.log("Approving KYC:", selectedKYC);
    setShowApproveModal(false);
    setSelectedKYC(null);
    // Add your approve logic here
  };

  const confirmReject = () => {
    console.log("Rejecting KYC:", selectedKYC);
    setShowRejectModal(false);
    setSelectedKYC(null);
    // Add your reject logic here
  };

  const handleExport = () => {
    console.log("Exporting KYC data...");
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    console.log("Applied filters:", filters);
  };

  const handleResetFilters = () => {
    console.log("Resetting filters...");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="KYC Verification"
        description="Review and verify user KYC documents for account activation"
        showExportButton={true}
        onExportClick={handleExport}
        showFilterButton={true}
        onFilterClick={() => setShowFilters(true)}
      />

      {/* Quick Stats */}
      <QuickStats stats={quickStats} />

      {/* Alert Box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800">
              23 Pending Verifications
            </h4>
            <p className="text-sm text-yellow-700">
              You have pending KYC applications awaiting review. Please process
              them to enable user trading.
            </p>
          </div>
        </div>
      </div>

      {/* KYC Table */}
      <DataTable
        columns={columns}
        data={kycData}
        onView={handleView}
        onEdit={handleApprove}
        onDelete={handleReject}
      />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        fields={filterFields}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {/* Approve Confirmation Modal */}
      <ConfirmModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={confirmApprove}
        title="Approve KYC"
        message="Are you sure you want to approve this KYC application? The user will be able to start trading immediately."
        confirmText="Approve"
        cancelText="Cancel"
        type="info"
      />

      {/* Reject Confirmation Modal */}
      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={confirmReject}
        title="Reject KYC"
        message="Are you sure you want to reject this KYC application? Please provide a reason for rejection."
        confirmText="Reject"
        cancelText="Cancel"
        type="danger"
      />

      {/* KYC Details Modal */}
      {showDetailsModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                <h3 className="text-2xl font-bold text-gray-900">
                  KYC Application Details
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Application ID
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      KYC001
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      User Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      Rajesh Kumar
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Email
                    </label>
                    <p className="text-gray-900">rajesh.kumar@email.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Phone
                    </label>
                    <p className="text-gray-900">+91 98765 43210</p>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaFileAlt className="w-5 h-5 text-[#fbc40c]" />
                    Submitted Documents
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    {/* PAN Card */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FaIdCard className="w-5 h-5 text-blue-600" />
                        <h5 className="font-semibold text-gray-900">
                          PAN Card
                        </h5>
                      </div>
                      <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                        <p className="text-gray-500">Document Preview</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-semibold">PAN:</span> ABCDE1234F
                        </p>
                        <p>
                          <span className="font-semibold">Name:</span> Rajesh
                          Kumar
                        </p>
                      </div>
                      <button className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                        <FaDownload className="w-4 h-4" />
                        Download
                      </button>
                    </div>

                    {/* Aadhaar Card */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FaIdCard className="w-5 h-5 text-green-600" />
                        <h5 className="font-semibold text-gray-900">
                          Aadhaar Card
                        </h5>
                      </div>
                      <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                        <p className="text-gray-500">Document Preview</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-semibold">Aadhaar:</span> XXXX
                          XXXX 1234
                        </p>
                        <p>
                          <span className="font-semibold">Name:</span> Rajesh
                          Kumar
                        </p>
                      </div>
                      <button className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                        <FaDownload className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address Proof */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="w-5 h-5 text-[#fbc40c]" />
                    Address Details
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">
                      123, MG Road, Bangalore, Karnataka - 560001
                    </p>
                  </div>
                </div>

                {/* Verification Notes */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    Verification Notes
                  </h4>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20"
                    rows={4}
                    placeholder="Add notes about the verification..."
                  ></textarea>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleReject(selectedKYC!);
                  }}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <FaTimes className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleApprove(selectedKYC!);
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <FaCheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KYCVerificationPage;
