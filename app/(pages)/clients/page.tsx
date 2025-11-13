"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUpload,
  FaFileAlt,
  FaUsers,
  FaCheckCircle,
  FaTimes,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import EnhancedDataTable from "@/components/EnhancedDataTable";
import QuickStats from "@/components/QuickStats";
import ConfirmModal from "@/components/ConfirmModal";

interface ClientData {
  id: string;
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

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ show: false, message: "", type: "success" });

  // Backend URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/clients";

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const savedOrder = localStorage.getItem("clientsColumnOrder");
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setColumnOrder(parsedOrder);
      } catch (error) {
        console.error("Error parsing saved column order:", error);
      }
    }
  }, []);


  const handleColumnOrderChange = (newColumns: Column[]) => {
    setColumns(newColumns);
    setColumnOrder(newColumns);
    localStorage.setItem("clientsColumnOrder", JSON.stringify(newColumns));
  };


  const displayColumns = columnOrder.length > 0 ? columnOrder : columns;

  // Toast notification helper
  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Quick Stats
  const quickStats = [
    {
      label: "Total Clients",
      value: clients.length.toString(),
      icon: <FaUsers className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "CSV Uploads",
      value: clients.length > 0 ? "1" : "0",
      icon: <FaFileAlt className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Active Records",
      value: clients.length.toString(),
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

  // Fetch clients from backend
  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.clients) {
        // Fixed columns
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
          { key: "emailId", label: "Email ID", sortable: true, visible: true },
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
          { key: "ytdBrok", label: "YTD Brok.", sortable: true, visible: true },
          { key: "poaDdpi", label: "POA/DDPI", sortable: true, visible: true },
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

        // Use saved order if available, otherwise use default
        if (columnOrder.length === 0) {
          setColumns(fixedColumns);
        } else {
          setColumns(columnOrder);
        }

        const transformedData = result.clients.map((client: any) => ({
          id: client._id,
          _id: client._id,
          isRead: client.isRead || false,
          ...client,
        }));

        setClients(transformedData);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      showToast("Failed to fetch clients", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRead = async (id: string, isRead: boolean) => {
    try {
      const response = await fetch(`${API_URL}/${id}/read-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });

      if (response.ok) {
        // Update local state immediately
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

  // Handle File Upload
 const handleFileUpload = async (
   event: React.ChangeEvent<HTMLInputElement>
 ) => {
   const file = event.target.files?.[0];
   if (!file) return;

   if (!file.name.endsWith(".csv")) {
     showToast("Please upload a CSV file", "error");
     // Reset file input
     if (fileInputRef.current) {
       fileInputRef.current.value = "";
     }
     return;
   }

   setUploadStatus("uploading");

   try {
     const formData = new FormData();
     formData.append("file", file);

     const response = await fetch(`${API_URL}/upload`, {
       method: "POST",
       body: formData,
     });

     const result = await response.json();

     if (!response.ok) {
        throw new Error(result.message || "Upload failed");
     }

     console.log("Data uploaded successfully:", result);

     setUploadStatus("success");

     // Show detailed success message
     let message = `Successfully uploaded ${result.newRecords} new record(s)`;
     if (result.duplicatesSkipped > 0) {
       message += `. ${result.duplicatesSkipped} duplicate(s) skipped`;
     }

     showToast(message, result.duplicatesSkipped > 0 ? "info" : "success");

     // Handle duplicate file download if available
     if (result.duplicateFile && result.duplicateFile.downloadUrl) {
       setTimeout(() => {
         showToast(
           `${result.duplicatesSkipped} duplicate records found. Click to download.`,
           "info"
         );

         // Automatically download the duplicate file
         const downloadDuplicates = () => {
           const filename = result.duplicateFile.filename;
           const link = document.createElement("a");
           link.href = `${process.env.NEXT_PUBLIC_API_URL}/clients/duplicates/${filename}`;
           link.download = `duplicate_records_${Date.now()}.csv`;
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
         };

         // Show a button or automatically download
         if (
           confirm(
             `Found ${result.duplicatesSkipped} duplicate records. Download duplicate records file?`
           )
         ) {
           downloadDuplicates();
         }
       }, 2000);
     }

     await fetchClients();

     // Reset file input to allow same file upload again
     if (fileInputRef.current) {
       fileInputRef.current.value = "";
     }

     setTimeout(() => setUploadStatus("idle"), 3000);
   } catch (error: any) {
     console.error("Upload error:", error);
     setUploadStatus("error");
     showToast(error.message || "Upload failed. Please try again.", "error");

     // Reset file input on error
     if (fileInputRef.current) {
       fileInputRef.current.value = "";
     }

     setTimeout(() => setUploadStatus("idle"), 3000);
   }
 };

  // Export to CSV
  const handleExport = async () => {
    try {
      setIsExporting(true);
      showToast("Preparing export...", "info");

      const response = await fetch(`${API_URL}/export`);

      if (!response.ok) {
        console.error("Export response not ok:", response);
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

  // Handle View
  const handleView = (id: string) => {
    const client = clients.find((c) => c.id === id || c._id === id);
    if (client) {
      setEditData(client);
      setShowViewModal(true);
    }
  };

  // Handle Edit
  const handleEdit = (id: string) => {
    const client = clients.find((c) => c.id === id || c._id === id);
    if (client) {
      setEditData({ ...client });
      setShowEditModal(true);
    }
  };

  // Save Edit
  const handleSaveEdit = async () => {
    if (editData) {
      try {
        setIsUpdating(true);

        const { id, _id, ...data } = editData;
        const mongoId = _id || id;

        const response = await fetch(`${API_URL}/${mongoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });

        if (response.ok) {
          setClients(
            clients.map((client) =>
              client.id === mongoId || client._id === mongoId
                ? editData
                : client
            )
          );
          setShowEditModal(false);
          setEditData(null);
          showToast("Client updated successfully", "success");
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
    }
  };

  // Handle Delete
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
          const updatedClients = clients.filter(
            (client) =>
              client.id !== selectedClient && client._id !== selectedClient
          );

          setClients(updatedClients);
          setShowDeleteModal(false);
          setSelectedClient(null);
          showToast("Client deleted successfully", "success");
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

  // Handle Multiple Delete
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

        const updatedClients = clients.filter(
          (client) =>
            !selectedClients.includes(client.id) &&
            !selectedClients.includes(client._id || "")
        );

        setClients(updatedClients);
        setShowMultipleDeleteModal(false);
        setSelectedClients([]);

        showToast(
          `Successfully deleted ${result.deletedCount} client(s)`,
          "success"
        );
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
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      {clients.length > 0 && <QuickStats stats={quickStats} />}

      {/* Data Table */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FaSpinner className="w-16 h-16 text-[#fbc40c] animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Loading Data...
          </h3>
          <p className="text-gray-600">Please wait while we fetch your data</p>
        </div>
      ) : clients.length > 0 ? (
        <EnhancedDataTable
          columns={columns}
          data={clients}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMultipleDelete={handleMultipleDelete}
          onExport={handleExport}
          onToggleRead={handleToggleRead}
          onColumnOrderChange={handleColumnOrderChange}
        />
      ) : (
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
      {showViewModal && editData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-bold text-gray-900">
                Client Details
              </h3>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setEditData(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(editData)
                  .filter(([key]) => key !== "id" && key !== "_id")
                  .map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-3">
                      <label className="text-sm font-semibold text-gray-600">
                        {key
                          .split("_")
                          .map(
                            (word: string) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </label>
                      <p className="text-gray-900 mt-1">
                        {(value as string) || "-"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setEditData(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-bold text-gray-900">Edit Client</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditData(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
                disabled={isUpdating}
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(editData)
                  .filter(([key]) => key !== "id" && key !== "_id")
                  .map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {key
                          .split("_")
                          .map(
                            (word: string) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </label>
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) =>
                          setEditData({ ...editData, [key]: e.target.value })
                        }
                        disabled={isUpdating}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 disabled:bg-gray-100"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditData(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium disabled:opacity-50"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
