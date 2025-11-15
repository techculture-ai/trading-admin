"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FaUpload,
  FaFileAlt,
  FaUsers,
  FaCheckCircle,
  FaTimes,
  FaDownload,
  FaSpinner,
  FaEdit,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import EnhancedDataTable from "@/components/EnhancedDataTable";
import QuickStats from "@/components/QuickStats";
import ConfirmModal from "@/components/ConfirmModal";
import { FilterCondition } from "@/components/AdvancedFilter";
import ViewClientModal from "@/components/ViewClientModal";
import EditClientModal from "@/components/EditClientModal";

interface ClientData {
  id?: string;
  _id?: string;
  [key: string]: any;
  isRead?: boolean;
}

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  visible?: boolean;
}

const ClientsPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [clients, setClients] = useState<ClientData[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [columnOrder, setColumnOrder] = useState<Column[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMultipleDeleteModal, setShowMultipleDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<ClientData | null>(null);

  // Pagination and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [uploadMode, setUploadMode] = useState<"create" | "update">("create");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ show: false, message: "", type: "success" });

  // Backend URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/clients";

  // Toast notification helper
  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Fetch clients from backend
  const fetchClients = async (
    filters: FilterCondition[] = [],
    search: string = "",
    page: number = 1,
    limit: number = 100
  ) => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search,
        filters: JSON.stringify(filters),
      });

      const response = await fetch(`${API_URL}?${params}`);
      const result = await response.json();

      if (result.clients) {
        const transformedData = result.clients.map((client: any) => ({
          id: client._id,
          _id: client._id,
          isRead: client.isRead || false,
          ...client,
        }));

        setClients(transformedData);
        setTotalRecords(result.totalRecords || 0);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      showToast("Failed to fetch clients", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize columns and load data - ONLY ONCE
  useEffect(() => {
    // Fixed columns definition
    const fixedColumns: Column[] = [
      {
        key: "tradingCode",
        label: "Trading Code",
        sortable: true,
        visible: true,
      },
      { key: "owner", label: "Owner", sortable: true, visible: true },
      { key: "name", label: "Name", sortable: true, visible: true },
      {
        key: "mobileNo",
        label: "Mobile No",
        sortable: true,
        visible: true,
      },
      {
        key: "emailId",
        label: "Email ID",
        sortable: true,
        visible: true,
      },
      {
        key: "dpClientId",
        label: "DP Client ID",
        sortable: true,
        visible: true,
      },
      {
        key: "branchCode",
        label: "Branch Code",
        sortable: true,
        visible: true,
      },
      {
        key: "activeExchange",
        label: "Active Exchange",
        sortable: true,
        visible: true,
      },
      {
        key: "rmtlCode",
        label: "RMTL Code",
        sortable: true,
        visible: true,
      },
      {
        key: "investorType",
        label: "Investor Type",
        sortable: true,
        visible: true,
      },
      {
        key: "accountOpenDate",
        label: "A/c Open Date",
        sortable: true,
        visible: true,
      },
      {
        key: "accountStatus",
        label: "Account Status",
        sortable: true,
        visible: true,
      },
      {
        key: "firstTradeDate",
        label: "First Trade Date",
        sortable: true,
        visible: true,
      },
      {
        key: "holdingValue",
        label: "Holding Value",
        sortable: true,
        visible: true,
      },
      {
        key: "ledgerBalance",
        label: "Ledger Balance",
        sortable: true,
        visible: true,
      },
      {
        key: "lastTradeDate",
        label: "Last Trade Date",
        sortable: true,
        visible: true,
      },
      {
        key: "ytdBrok",
        label: "YTD Brok.",
        sortable: true,
        visible: true,
      },
      {
        key: "poaDdpi",
        label: "POA/DDPI",
        sortable: true,
        visible: true,
      },
      { key: "nominee", label: "Nominee", sortable: true, visible: true },
      {
        key: "annualIncome",
        label: "Annual Income",
        sortable: true,
        visible: true,
      },
      {
        key: "occupation",
        label: "Occupation",
        sortable: true,
        visible: true,
      },
      { key: "city", label: "City", sortable: true, visible: true },
      { key: "state", label: "State", sortable: true, visible: true },
      {
        key: "lastLoginDate",
        label: "Last Login Date",
        sortable: true,
        visible: true,
      },
      {
        key: "callingStatus",
        label: "Calling Status",
        sortable: true,
        visible: true,
      },
      {
        key: "nextFollowUpDate",
        label: "Next Follow up Date",
        sortable: true,
        visible: true,
      },
      { key: "remarks", label: "Remarks", sortable: true, visible: true },
    ];

    // Load saved column order from localStorage
    const savedOrder = localStorage.getItem("clientsColumnOrder");
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setColumnOrder(parsedOrder);
        setColumns(parsedOrder);
      } catch (error) {
        console.error("Error parsing saved column order:", error);
        setColumns(fixedColumns);
      }
    } else {
      setColumns(fixedColumns);
    }

    // Fetch initial data
    fetchClients([], "", 1, 100);
  }, []); // Empty dependency array - runs only once

  const handleColumnOrderChange = (newColumns: Column[]) => {
    setColumns(newColumns);
    setColumnOrder(newColumns);
    localStorage.setItem("clientsColumnOrder", JSON.stringify(newColumns));
  };

  const displayColumns = columnOrder.length > 0 ? columnOrder : columns;

  // Quick Stats
  const quickStats = [
    {
      label: "Total Clients",
      value: totalRecords.toString(),
      icon: <FaUsers className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Current Page",
      value: clients.length.toString(),
      icon: <FaFileAlt className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Active Records",
      value: totalRecords.toString(),
      icon: <FaCheckCircle className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Data Columns",
      value: columns.length.toString(),
      icon: <FaFileAlt className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  // Handle filter change from table
  const handleFilterChange = (
    conditions: FilterCondition[],
    search: string
  ) => {
    setFilterConditions(conditions);
    setSearchTerm(search);
    setCurrentPage(1);
    fetchClients(conditions, search, 1, itemsPerPage);
  };

  // Check if filters are active
  const hasActiveFilters =
    filterConditions.length > 0 || searchTerm.trim() !== "";

  // Handle page change
  const handlePageChange = (newPage: number) => {
    fetchClients(filterConditions, searchTerm, newPage, itemsPerPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
    fetchClients(filterConditions, searchTerm, 1, newLimit);
  };

  const handleToggleRead = async (id: string, isRead: boolean) => {
    try {
      const response = await fetch(`${API_URL}/${id}/read-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });

      if (response.ok) {
        setClients(
          clients.map((client) =>
            client.id === id || client._id === id
              ? { ...client, isRead }
              : client
          )
        );
        showToast(isRead ? "Marked as read" : "Marked as unread", "success");
      } else {
        const error = await response.json();
        showToast(`Failed to update status: ${error.message}`, "error");
      }
    } catch (error) {
      console.error("Toggle read error:", error);
      showToast("Failed to update read status", "error");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    mode: "create" | "update" = "create"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      showToast("Please upload a CSV file", "error");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setUploadStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const endpoint =
        mode === "update" ? `${API_URL}/update-csv` : `${API_URL}/upload`;

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.status === 202) {
        showToast(
          result.message || "Processing large file in background...",
          "info"
        );
        setUploadStatus("success");

        setTimeout(() => {
          showToast("Refreshing data...", "info");
          fetchClients(filterConditions, searchTerm, 1, itemsPerPage);
        }, 5000);

        setTimeout(() => {
          fetchClients(filterConditions, searchTerm, 1, itemsPerPage);
        }, 30000);
      } else if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      } else {
        setUploadStatus("success");

        let message = "";
        if (mode === "update") {
          message = `Updated ${result.updatedRecords || 0} record(s), Added ${
            result.insertedRecords || 0
          } new record(s)`;
        } else {
          message = `Successfully uploaded ${result.newRecords} new record(s)`;
          if (result.duplicatesSkipped > 0) {
            message += `. ${result.duplicatesSkipped} duplicate(s) skipped`;
          }
        }

        showToast(message, "success");

        // Show column info for update mode
        if (mode === "update" && result.summary) {
          setTimeout(() => {
            showToast(
              `Updated ${result.summary.columnsInCSV} column(s) only. Other columns unchanged.`,
              "info"
            );
          }, 2000);
        }

        // Handle duplicate file download (only for create mode)
        if (
          mode === "create" &&
          result.duplicateFile &&
          result.duplicateFile.downloadUrl
        ) {
          setTimeout(() => {
            if (
              confirm(
                `Found ${result.duplicatesSkipped} duplicate records. Download duplicate records file?`
              )
            ) {
              const filename = result.duplicateFile.filename;
              const link = document.createElement("a");
              link.href = `${process.env.NEXT_PUBLIC_API_URL}/clients/duplicates/${filename}`;
              link.download = `duplicate_records_${Date.now()}.csv`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }, 2000);
        }

        await fetchClients(filterConditions, searchTerm, 1, itemsPerPage);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => setUploadStatus("idle"), 3000);
      setShowUploadModal(false);
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      showToast(error.message || "Upload failed. Please try again.", "error");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUploadModal) {
        const target = event.target as HTMLElement;
        if (!target.closest(".relative")) {
          setShowUploadModal(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUploadModal]);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      showToast("Preparing export...", "info");

      const response = await fetch(`${API_URL}/export`);

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `clients_${Date.now()}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      showToast("Export completed successfully", "success");
    } catch (error) {
      console.error("Export error:", error);
      showToast("Failed to export data", "error");
    } finally {
      setIsExporting(false);
    }
  };

  const handleView = (id: string) => {
    const client = clients.find((c) => c.id === id || c._id === id);
    if (client) {
      setEditData(client);
      setShowViewModal(true);
    }
  };

  const handleEdit = (id: string) => {
    const client = clients.find((c) => c.id === id || c._id === id);
    if (client) {
      setEditData({ ...client });
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async (updatedData: ClientData) => {
    try {
      setIsUpdating(true);

      const { id, _id, isRead, uploadedAt, lastModified, uploadedBy, ...data } =
        updatedData;
      const mongoId = _id || id;

      const response = await fetch(`${API_URL}/${mongoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          editedBy: "Admin User", // TODO: Replace with actual logged-in user name
          editedByEmail: "admin@example.com", // TODO: Replace with actual user email
          ipAddress: "", // Optional: Add if you have user IP tracking
          userAgent: navigator.userAgent,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setClients(
          clients.map((client) =>
            client.id === mongoId || client._id === mongoId
              ? updatedData
              : client
          )
        );
        setShowEditModal(false);
        setEditData(null);
        // Show changes count in toast if available
        const changesMsg = result.changesLogged
          ? ` (${result.changesLogged} changes logged)`
          : "";
        showToast(`Client updated successfully${changesMsg}`, "success");
      } else {
        const error = await response.json();
        showToast(`Update failed: ${error.message}`, "error");
      }
    } catch (error) {
      console.error("Update error:", error);
      showToast("Failed to update client", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = (id: string) => {
    setSelectedClient(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedClient) {
      try {
        setIsDeleting(true);

        const response = await fetch(`${API_URL}/${selectedClient}`, {
          method: "DELETE",
        });

        if (response.ok) {
          showToast("Client deleted successfully", "success");
          await fetchClients(
            filterConditions,
            searchTerm,
            currentPage,
            itemsPerPage
          );
          setShowDeleteModal(false);
          setSelectedClient(null);
        } else {
          const error = await response.json();
          showToast(`Delete failed: ${error.message}`, "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        showToast("Failed to delete client", "error");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleMultipleDelete = (ids: string[]) => {
    setSelectedClients(ids);
    setShowMultipleDeleteModal(true);
  };

  const confirmMultipleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await fetch(`${API_URL}/delete-multiple`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedClients }),
      });

      if (response.ok) {
        const result = await response.json();
        showToast(
          `Successfully deleted ${result.deletedCount} client(s)`,
          "success"
        );
        await fetchClients(
          filterConditions,
          searchTerm,
          currentPage,
          itemsPerPage
        );
        setShowMultipleDeleteModal(false);
        setSelectedClients([]);
      } else {
        const error = await response.json();
        showToast(`Delete failed: ${error.message}`, "error");
      }
    } catch (error) {
      console.error("Multiple delete error:", error);
      showToast("Failed to delete clients", "error");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {toast.type === "success" && <FaCheckCircle className="w-5 h-5" />}
          {toast.type === "error" && <FaTimes className="w-5 h-5" />}
          {toast.type === "info" && (
            <FaSpinner className="w-5 h-5 animate-spin" />
          )}
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Loading Overlay */}
      {(isLoading || isDeleting) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4">
            <FaSpinner className="w-12 h-12 text-[#fbc40c] animate-spin" />
            <p className="text-lg font-semibold text-gray-900">
              {isDeleting ? "Deleting..." : "Loading..."}
            </p>
          </div>
        </div>
      )}

      {/* Page Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Clients Management
          </h1>
          <p className="text-gray-600 mt-1">
            Upload, manage, and export client data via CSV
          </p>
        </div>

        {/* Upload CSV Button */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={(e) => handleFileUpload(e, uploadMode)}
            className="hidden"
          />

          {/* Upload Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowUploadModal(!showUploadModal)}
              className="px-6 py-3 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg font-semibold flex items-center gap-2 shadow-sm"
              disabled={uploadStatus === "uploading"}
            >
              {uploadStatus === "uploading" ? (
                <>
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FaUpload className="w-5 h-5" />
                  Upload CSV
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {showUploadModal && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-50">
                <div className="p-2">
                  <button
                    onClick={() => {
                      setUploadMode("update");
                      setShowUploadModal(false);
                      fileInputRef.current?.click();
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 rounded-lg transition-colors flex items-start gap-3 mt-2"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEdit className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Update Existing Records
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Update by Trading Code. Only specified columns will be
                        updated.
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setUploadMode("create");
                      setShowUploadModal(false);
                      fileInputRef.current?.click();
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors flex items-start gap-3"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUpload className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Create New Records
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Upload new clients. Duplicates will be skipped.
                      </div>
                    </div>
                  </button>
                </div>

                <div className="border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg">
                  <p className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-blue-600">💡</span>
                    <span>
                      <strong>Tip:</strong> For updates, include only Trading
                      Code + columns you want to change.
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {clients.length > 0 && <QuickStats stats={quickStats} />}

      {/* Data Table */}
      {isLoading && clients.length === 0 && !hasActiveFilters ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FaSpinner className="w-16 h-16 text-[#fbc40c] animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Loading Data...
          </h3>
          <p className="text-gray-600">Please wait while we fetch your data</p>
        </div>
      ) : totalRecords > 0 || clients.length > 0 || hasActiveFilters ? (
        <EnhancedDataTable
          columns={displayColumns}
          data={clients}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMultipleDelete={handleMultipleDelete}
          onExport={handleExport}
          onToggleRead={handleToggleRead}
          onColumnOrderChange={handleColumnOrderChange}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalRecords={totalRecords}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          isLoading={isLoading}
        />
      ) : (
        // Only show "Upload CSV" if truly no data AND no filters active
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FaFileAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-600 mb-4">
            Upload a CSV file to view and manage client data
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg font-semibold inline-flex items-center gap-2"
          >
            <FaUpload className="w-5 h-5" />
            Upload Your First CSV
          </button>
        </div>
      )}

      {/* View Modal */}
      <ViewClientModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setEditData(null);
        }}
        clientData={editData}
      />

      {/* Edit Modal */}
      <EditClientModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditData(null);
        }}
        clientData={editData}
        onSave={handleSaveEdit}
        isUpdating={isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Client"
        message="Are you sure you want to delete this client? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        type="danger"
      />

      {/* Multiple Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showMultipleDeleteModal}
        onClose={() => !isDeleting && setShowMultipleDeleteModal(false)}
        onConfirm={confirmMultipleDelete}
        title="Delete Multiple Clients"
        message={`Are you sure you want to delete ${selectedClients.length} client(s)? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete All"}
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default ClientsPage;
