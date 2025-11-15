"use client";

import React, { useState, useEffect } from "react";
import { Clock, User, ArrowRight, X, Filter, Download } from "lucide-react";

interface Change {
  field: string;
  fieldLabel: string;
  oldValue: string;
  newValue: string;
}

interface AuditLog {
  _id: string;
  clientId: string;
  tradingCode: string;
  action: "UPDATE" | "CREATE" | "DELETE";
  editedBy: string;
  editedByEmail: string;
  changes: Change[];
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    timestamp: string;
  };
  createdAt: string;
}

interface AuditLogViewerProps {
  clientId: string;
  tradingCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditLogViewer({
  clientId,
  tradingCode,
  isOpen,
  onClose,
}: AuditLogViewerProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    editedBy: "",
    action: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (isOpen && clientId) {
      fetchAuditLogs();
    }
  }, [isOpen, clientId, page]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/audit-logs/client/${clientId}?page=${page}&limit=20`
      );
      const data = await response.json();

      if (response.ok) {
        setLogs(data.logs);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/audit-logs/export?clientId=${clientId}`
      );
      const data = await response.json();

      if (response.ok && data.data) {
        // Convert to CSV
        const headers = Object.keys(data.data[0]);
        const csvContent = [
          headers.join(","),
          ...data.data.map((row: any) =>
            headers.map((header) => `"${row[header] || ""}"`).join(",")
          ),
        ].join("\n");

        // Download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit-log-${tradingCode}-${new Date().toISOString()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting audit logs:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "UPDATE":
        return "bg-blue-100 text-blue-800";
      case "CREATE":
        return "bg-green-100 text-green-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Audit Log</h2>
            <p className="text-sm text-gray-600 mt-1">
              Trading Code: <span className="font-semibold">{tradingCode}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export to CSV"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle Filters"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="p-4 bg-gray-50 border-b">
            <div className="grid grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Edited By"
                value={filters.editedBy}
                onChange={(e) =>
                  setFilters({ ...filters, editedBy: e.target.value })
                }
                className="px-3 py-2 border rounded-lg text-sm"
              />
              <select
                value={filters.action}
                onChange={(e) =>
                  setFilters({ ...filters, action: e.target.value })
                }
                className="px-3 py-2 border rounded-lg text-sm"
              >
                <option value="">All Actions</option>
                <option value="UPDATE">Update</option>
                <option value="CREATE">Create</option>
                <option value="DELETE">Delete</option>
              </select>
              <input
                type="date"
                placeholder="Start Date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
                className="px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="date"
                placeholder="End Date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
                className="px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Clock className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">No audit logs found</p>
              <p className="text-sm mt-1">
                Changes to this client will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {logs.map((log) => (
                <div
                  key={log._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {/* Log Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{log.editedBy}</span>
                        {log.editedByEmail && (
                          <span className="text-gray-400">
                            ({log.editedByEmail})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(log.createdAt)}</span>
                    </div>
                  </div>

                  {/* Changes */}
                  {log.changes.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Changes ({log.changes.length})
                      </h4>
                      <div className="grid gap-3">
                        {log.changes.map((change, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                          >
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              {change.fieldLabel}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-red-50 border border-red-200 rounded px-3 py-2">
                                <span className="text-xs text-red-600 font-medium block mb-1">
                                  OLD VALUE
                                </span>
                                <span className="text-sm text-gray-900">
                                  {change.oldValue || "Empty"}
                                </span>
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-400 shrink-0" />
                              <div className="flex-1 bg-green-50 border border-green-200 rounded px-3 py-2">
                                <span className="text-xs text-green-600 font-medium block mb-1">
                                  NEW VALUE
                                </span>
                                <span className="text-sm text-gray-900">
                                  {change.newValue || "Empty"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  {log.metadata && (
                    <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                      {log.metadata.ipAddress && (
                        <span className="mr-4">
                          IP: {log.metadata.ipAddress}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
