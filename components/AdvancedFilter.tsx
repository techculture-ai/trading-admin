"use client";

import React, { useState, useEffect } from "react";
import {
  FaFilter,
  FaTimes,
  FaPlus,
  FaSave,
  FaFolderOpen,
  FaTrash,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";

export interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  logicalOperator?: "AND" | "OR";
}

interface Column {
  key: string;
  label: string;
}

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  columns: Column[];
  onApplyFilter: (conditions: FilterCondition[]) => void;
  initialConditions?: FilterCondition[];
  onSaveFilter?: (
    name: string,
    description: string,
    conditions: FilterCondition[]
  ) => void;
  onLoadFilter?: (filterId: string) => void;
}

// Regular operators for text/number fields
const TEXT_OPERATORS = [
  { value: "equals", label: "Equals", symbol: "=" },
  { value: "notEquals", label: "Not Equals", symbol: "≠" },
  { value: "contains", label: "Contains", symbol: "⊃" },
  { value: "notContains", label: "Not Contains", symbol: "⊅" },
  { value: "startsWith", label: "Starts With", symbol: "^" },
  { value: "endsWith", label: "Ends With", symbol: "$" },
  { value: "isEmpty", label: "Is Empty", symbol: "∅" },
  { value: "isNotEmpty", label: "Is Not Empty", symbol: "≠∅" },
  { value: "greaterThan", label: "Greater Than", symbol: ">" },
  { value: "lessThan", label: "Less Than", symbol: "<" },
  { value: "greaterThanOrEqual", label: "Greater Than or Equal", symbol: "≥" },
  { value: "lessThanOrEqual", label: "Less Than or Equal", symbol: "≤" },
];

// Date-specific operators
const DATE_OPERATORS = [
  { value: "dateEquals", label: "On Date", symbol: "=" },
  { value: "dateBefore", label: "Before Date", symbol: "<" },
  { value: "dateAfter", label: "After Date", symbol: ">" },
  { value: "dateWithin1Week", label: "Within 1 Week", symbol: "1W" },
  { value: "dateWithin2Weeks", label: "Within 2 Weeks", symbol: "2W" },
  { value: "dateWithin1Month", label: "Within 1 Month", symbol: "1M" },
  { value: "dateWithin2Months", label: "Within 2 Months", symbol: "2M" },
  { value: "dateWithin3Months", label: "Within 3 Months", symbol: "3M" },
  { value: "dateWithin6Months", label: "Within 6 Months", symbol: "6M" },
  { value: "dateWithin1Year", label: "Within 1 Year", symbol: "1Y" },
  { value: "datePast1Week", label: "Past 1 Week", symbol: "-1W" },
  { value: "datePast2Weeks", label: "Past 2 Weeks", symbol: "-2W" },
  { value: "datePast1Month", label: "Past 1 Month", symbol: "-1M" },
  { value: "datePast2Months", label: "Past 2 Months", symbol: "-2M" },
  { value: "datePast3Months", label: "Past 3 Months", symbol: "-3M" },
  { value: "datePast6Months", label: "Past 6 Months", symbol: "-6M" },
  { value: "datePast1Year", label: "Past 1 Year", symbol: "-1Y" },
  { value: "dateCustomRange", label: "Custom Date Range", symbol: "⇄" },
  { value: "isEmpty", label: "Is Empty", symbol: "∅" },
  { value: "isNotEmpty", label: "Is Not Empty", symbol: "≠∅" },
];

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  isOpen,
  onClose,
  columns,
  onApplyFilter,
  initialConditions = [],
  onSaveFilter,
  onLoadFilter,
}) => {
  const [conditions, setConditions] = useState<FilterCondition[]>(
    initialConditions.length > 0
      ? initialConditions
      : [
          {
            id: Date.now().toString(),
            field: columns[0]?.key || "",
            operator: "contains",
            value: "",
            logicalOperator: "AND",
          },
        ]
  );

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterDescription, setFilterDescription] = useState("");
  const [savedFilters, setSavedFilters] = useState<any[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ show: false, message: "", type: "success" });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Toast notification helper
  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Load saved filters
  useEffect(() => {
    if (showLoadModal) {
      loadSavedFilters();
    }
  }, [showLoadModal]);

  const loadSavedFilters = async () => {
    try {
      setIsLoadingFilters(true);
      const response = await fetch(`${API_URL}/saved-filters`);
      const data = await response.json();

      if (data.success) {
        setSavedFilters(data.filters || []);
      }
    } catch (error) {
      console.error("Error loading saved filters:", error);
    } finally {
      setIsLoadingFilters(false);
    }
  };

  const handleSaveFilter = async () => {
    if (!filterName.trim()) {
      showToast("Please enter a filter name", "error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/saved-filters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: filterName,
          description: filterDescription,
          filterConditions: conditions,
          createdBy: "Admin", // You can change this to actual user
        }),
      });

      const data = await response.json();

      if (data.success) {
        showToast("Filter saved successfully!", "success");
        setShowSaveModal(false);
        setFilterName("");
        setFilterDescription("");
      } else {
        showToast(data.message || "Failed to save filter", "error");
      }
    } catch (error) {
      console.error("Error saving filter:", error);
      showToast("Failed to save filter", "error");
    }
  };

  const handleLoadFilter = async (filterId: string) => {
    try {
      const response = await fetch(`${API_URL}/saved-filters/${filterId}`);
      const data = await response.json();

      if (data.success && data.filter) {
        setConditions(data.filter.filterConditions);
        setShowLoadModal(false);
        showToast(`Loaded filter: ${data.filter.name}`, "success");
      }
    } catch (error) {
      console.error("Error loading filter:", error);
      showToast("Failed to load filter", "error");
    }
  };

  const handleDeleteSavedFilter = async (filterId: string) => {
    // Using window.confirm is acceptable for delete confirmations
    if (!window.confirm("Are you sure you want to delete this saved filter?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/saved-filters/${filterId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        showToast("Filter deleted successfully!", "success");
        loadSavedFilters(); // Reload the list
      } else {
        showToast(data.message || "Failed to delete filter", "error");
      }
    } catch (error) {
      console.error("Error deleting filter:", error);
      showToast("Failed to delete filter", "error");
    }
  };

  // Identify date fields
  const DATE_FIELDS = [
    "accountOpenDate",
    "firstTradeDate",
    "lastTradeDate",
    "lastLoginDate",
    "nextFollowUpDate",
    "reEycDoneDate",
    "demoRequiredDate",
    "fundReceivedDate",
    "tradeDoneDate",
  ];

  const isDateField = (fieldKey: string) => {
    return (
      DATE_FIELDS.includes(fieldKey) || fieldKey.toLowerCase().includes("date")
    );
  };

  const getOperatorsForField = (fieldKey: string) => {
    return isDateField(fieldKey) ? DATE_OPERATORS : TEXT_OPERATORS;
  };

  const addCondition = () => {
    const firstField = columns[0]?.key || "";
    const defaultOperator = isDateField(firstField)
      ? "dateWithin1Month"
      : "contains";

    setConditions([
      ...conditions,
      {
        id: Date.now().toString(),
        field: firstField,
        operator: defaultOperator,
        value: "",
        logicalOperator: "AND",
      },
    ]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((c) => c.id !== id));
    }
  };

  const updateCondition = (
    id: string,
    field: keyof FilterCondition,
    value: string
  ) => {
    setConditions(
      conditions.map((c) => {
        if (c.id === id) {
          const updates: any = { [field]: value };

          // If field is being changed, reset operator to appropriate default
          if (field === "field") {
            updates.operator = isDateField(value)
              ? "dateWithin1Month"
              : "contains";
            updates.value = "";
          }

          return { ...c, ...updates };
        }
        return c;
      })
    );
  };

  const handleApply = () => {
    onApplyFilter(conditions);
    onClose();
  };

  const handleClear = () => {
    const firstField = columns[0]?.key || "";
    const defaultOperator = isDateField(firstField)
      ? "dateWithin1Month"
      : "contains";

    setConditions([
      {
        id: Date.now().toString(),
        field: firstField,
        operator: defaultOperator,
        value: "",
        logicalOperator: "AND",
      },
    ]);
    onApplyFilter([]);
    onClose();
  };

  const needsValueInput = (operator: string) => {
    return (
      operator !== "isEmpty" &&
      operator !== "isNotEmpty" &&
      !operator.startsWith("dateWithin") &&
      !operator.startsWith("datePast")
    );
  };

  const needsDateRangeInput = (operator: string) => {
    return operator === "dateCustomRange";
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-[9999] px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {toast.type === "success" && <FaCheckCircle className="w-5 h-5" />}
          {toast.type === "error" && (
            <FaExclamationCircle className="w-5 h-5" />
          )}
          {toast.type === "info" && <FaInfoCircle className="w-5 h-5" />}
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fbc40c] rounded-full flex items-center justify-center">
                <FaFilter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Advanced Filter
                </h3>
                <p className="text-sm text-gray-600">
                  Create complex queries to filter your data
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSaveModal(true)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                title="Save Filter"
              >
                <FaSave className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
              </button>
              <button
                onClick={() => setShowLoadModal(true)}
                className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
                title="Load Saved Filter"
              >
                <FaFolderOpen className="w-5 h-5 text-green-600 group-hover:text-green-700" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filter Conditions */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {conditions.map((condition, index) => {
                const currentOperators = getOperatorsForField(condition.field);
                const isDate = isDateField(condition.field);

                return (
                  <div key={condition.id}>
                    {/* Logical Operator (except for first condition) */}
                    {index > 0 && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              updateCondition(
                                condition.id,
                                "logicalOperator",
                                "AND"
                              )
                            }
                            className={`px-4 py-1 rounded-full text-xs font-semibold transition-colors ${
                              condition.logicalOperator === "AND"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            AND
                          </button>
                          <button
                            onClick={() =>
                              updateCondition(
                                condition.id,
                                "logicalOperator",
                                "OR"
                              )
                            }
                            className={`px-4 py-1 rounded-full text-xs font-semibold transition-colors ${
                              condition.logicalOperator === "OR"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            OR
                          </button>
                        </div>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>
                    )}

                    {/* Condition Row */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        {/* Field Select */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Field
                          </label>
                          <select
                            value={condition.field}
                            onChange={(e) =>
                              updateCondition(
                                condition.id,
                                "field",
                                e.target.value
                              )
                            }
                            id="single-select-field"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 text-sm form-select"
                          >
                            {columns.map((col) => (
                              <option key={col.key} value={col.key}>
                                {col.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Operator Select */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Operator
                          </label>
                          <select
                            value={condition.operator}
                            onChange={(e) =>
                              updateCondition(
                                condition.id,
                                "operator",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 text-sm form-select"
                            id="single-select-field"
                          >
                            {currentOperators.map((op) => (
                              <option key={op.value} value={op.value}>
                                {op.label} ({op.symbol})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Value Input */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Value
                          </label>
                          {needsDateRangeInput(condition.operator) ? (
                            <div className="space-y-2">
                              <input
                                type="date"
                                value={condition.value.split(",")[0] || ""}
                                onChange={(e) => {
                                  const endDate =
                                    condition.value.split(",")[1] || "";
                                  updateCondition(
                                    condition.id,
                                    "value",
                                    `${e.target.value},${endDate}`
                                  );
                                }}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 text-xs"
                                placeholder="Start date"
                              />
                              <input
                                type="date"
                                value={condition.value.split(",")[1] || ""}
                                onChange={(e) => {
                                  const startDate =
                                    condition.value.split(",")[0] || "";
                                  updateCondition(
                                    condition.id,
                                    "value",
                                    `${startDate},${e.target.value}`
                                  );
                                }}
                                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 text-xs"
                                placeholder="End date"
                              />
                            </div>
                          ) : needsValueInput(condition.operator) ? (
                            <input
                              type={isDate ? "date" : "text"}
                              value={condition.value}
                              onChange={(e) =>
                                updateCondition(
                                  condition.id,
                                  "value",
                                  e.target.value
                                )
                              }
                              placeholder="Enter value..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 text-sm"
                            />
                          ) : (
                            <div className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 flex items-center justify-center">
                              N/A
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Remove Button */}
                      {conditions.length > 1 && (
                        <button
                          onClick={() => removeCondition(condition.id)}
                          className="mt-7 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove condition"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Condition Button */}
            <button
              onClick={addCondition}
              className="mt-4 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#fbc40c] hover:text-[#fbc40c] hover:bg-[#fbc40c]/5 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <FaPlus className="w-4 h-4" />
              Add Condition
            </button>

            {/* Query Preview */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Query Preview:
              </h4>
              <div className="text-sm text-blue-800 font-mono bg-white p-3 rounded border border-blue-200">
                {conditions.length === 0 ? (
                  <span className="text-gray-400">No conditions</span>
                ) : (
                  conditions.map((condition, index) => {
                    const operators = getOperatorsForField(condition.field);
                    const operator = operators.find(
                      (o) => o.value === condition.operator
                    );

                    return (
                      <div key={condition.id}>
                        {index > 0 && (
                          <span className="text-blue-600 font-bold">
                            {" "}
                            {condition.logicalOperator}{" "}
                          </span>
                        )}
                        <span>
                          {
                            columns.find((c) => c.key === condition.field)
                              ?.label
                          }{" "}
                          <span className="text-purple-600">
                            {operator?.symbol}
                          </span>{" "}
                          {needsValueInput(condition.operator) && (
                            <span className="text-green-600">
                              "{condition.value}"
                            </span>
                          )}
                          {needsDateRangeInput(condition.operator) && (
                            <span className="text-green-600">
                              "{condition.value.split(",")[0]} to{" "}
                              {condition.value.split(",")[1]}"
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium text-gray-700"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg font-semibold"
            >
              Apply Filter
            </button>
          </div>
        </div>

        {/* Save Filter Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Save Filter</h3>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Filter Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    placeholder="e.g., High Value Clients"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={filterDescription}
                    onChange={(e) => setFilterDescription(e.target.value)}
                    placeholder="Brief description of this filter..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20"
                  />
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFilter}
                  className="flex-1 px-4 py-2 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <FaSave className="w-4 h-4" />
                  Save Filter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Load Filter Modal */}
        {showLoadModal && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Saved Filters
                </h3>
                <button
                  onClick={() => setShowLoadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {isLoadingFilters ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#fbc40c]"></div>
                    <p className="mt-2 text-gray-600">Loading filters...</p>
                  </div>
                ) : savedFilters.length === 0 ? (
                  <div className="text-center py-12">
                    <FaFolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No saved filters yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Save your current filter to quickly access it later
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedFilters.map((filter) => (
                      <div
                        key={filter._id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-[#fbc40c] hover:bg-[#fbc40c]/5 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {filter.name}
                            </h4>
                            {filter.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {filter.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>By: {filter.createdBy}</span>
                              <span>Used: {filter.usageCount} times</span>
                              <span>
                                {new Date(
                                  filter.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleLoadFilter(filter._id)}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg font-medium"
                            >
                              Load
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteSavedFilter(filter._id)
                              }
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowLoadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium text-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdvancedFilter;
