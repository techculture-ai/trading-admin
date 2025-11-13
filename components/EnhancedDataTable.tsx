"use client";

import React, { useState } from "react";
import AdvancedFilter, { FilterCondition } from "./AdvancedFilter";
import {
  FaSearch,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckSquare,
  FaSquare,
  FaToggleOn,
  FaToggleOff,
  FaGripVertical,
  FaCog,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  visible?: boolean;
}

interface EnhancedDataTableProps {
  columns: Column[];
  data: any[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMultipleDelete?: (ids: string[]) => void;
  onExport?: () => void;
  onToggleRead?: (id: string, isRead: boolean) => void;
  onColumnOrderChange?: (newColumns: Column[]) => void;
}

const EnhancedDataTable: React.FC<EnhancedDataTableProps> = ({
  columns: initialColumns,
  data,
  onView,
  onEdit,
  onDelete,
  onMultipleDelete,
  onExport,
  onToggleRead,
  onColumnOrderChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [columns, setColumns] = useState<Column[]>(
    initialColumns.map((col) => ({ ...col, visible: col.visible !== false }))
  );
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState<number | null>(null);
  const itemsPerPage = 10;
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>(
    []
  );
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);


  const applyFilters = (data: any[], conditions: FilterCondition[]) => {
    if (conditions.length === 0) return data;

    return data.filter((item) => {
      let result = true;
      let currentLogicalOperator: "AND" | "OR" = "AND";

      conditions.forEach((condition, index) => {
        const fieldValue = String(item[condition.field] || "").toLowerCase();
        const searchValue = condition.value.toLowerCase();
        let conditionResult = false;

        switch (condition.operator) {
          case "equals":
            conditionResult = fieldValue === searchValue;
            break;
          case "notEquals":
            conditionResult = fieldValue !== searchValue;
            break;
          case "contains":
            conditionResult = fieldValue.includes(searchValue);
            break;
          case "notContains":
            conditionResult = !fieldValue.includes(searchValue);
            break;
          case "startsWith":
            conditionResult = fieldValue.startsWith(searchValue);
            break;
          case "endsWith":
            conditionResult = fieldValue.endsWith(searchValue);
            break;
          case "isEmpty":
            conditionResult = !fieldValue || fieldValue.trim() === "";
            break;
          case "isNotEmpty":
            conditionResult = !!(fieldValue && fieldValue.trim() !== "");
            break;
          case "greaterThan":
            conditionResult = parseFloat(fieldValue) > parseFloat(searchValue);
            break;
          case "lessThan":
            conditionResult = parseFloat(fieldValue) < parseFloat(searchValue);
            break;
          case "greaterThanOrEqual":
            conditionResult = parseFloat(fieldValue) >= parseFloat(searchValue);
            break;
          case "lessThanOrEqual":
            conditionResult = parseFloat(fieldValue) <= parseFloat(searchValue);
            break;
          default:
            conditionResult = false;
        }

        if (index === 0) {
          result = conditionResult;
        } else {
          if (currentLogicalOperator === "AND") {
            result = result && conditionResult;
          } else {
            result = result || conditionResult;
          }
        }

        currentLogicalOperator = condition.logicalOperator || "AND";
      });

      return result;
    });
  };

  // Filter data
 const filteredData = (() => {
   let result = data;

   // Apply search term filter
   if (searchTerm) {
     result = result.filter((item) =>
       Object.values(item).some((value) =>
         String(value).toLowerCase().includes(searchTerm.toLowerCase())
       )
     );
   }

   // Apply advanced filters
   result = applyFilters(result, filterConditions);

   return result;
 })();

  const handleApplyFilter = (conditions: FilterCondition[]) => {
    setFilterConditions(conditions);
    setActiveFiltersCount(conditions.length);
    setCurrentPage(1); // Reset to first page
  };

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Get visible columns
  const visibleColumns = columns.filter((col) => col.visible);

  // Get MongoDB _id from row
  const getRowId = (row: any): string => {
    return row._id || row.id;
  };

  // Select/Deselect All
  const toggleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((row) => getRowId(row)));
    }
  };

  // Select/Deselect Individual Row
  const toggleSelectRow = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  // Handle Multiple Delete
  const handleMultipleDelete = () => {
    if (onMultipleDelete && selectedRows.length > 0) {
      onMultipleDelete(selectedRows);
      setSelectedRows([]);
    }
  };

  // Handle Sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Check if row is selected
  const isRowSelected = (row: any): boolean => {
    const rowId = getRowId(row);
    return selectedRows.includes(rowId);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedColumn(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (draggedColumn === null || draggedColumn === index) return;

    const newColumns = [...columns];
    const draggedItem = newColumns[draggedColumn];
    newColumns.splice(draggedColumn, 1);
    newColumns.splice(index, 0, draggedItem);

    setDraggedColumn(index);
    setColumns(newColumns);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    if (onColumnOrderChange) {
      onColumnOrderChange(columns);
    }
  };

  // Toggle column visibility
  const toggleColumnVisibility = (columnKey: string) => {
    const updatedColumns = columns.map((col) =>
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    );
    setColumns(updatedColumns);
    if (onColumnOrderChange) {
      onColumnOrderChange(updatedColumns);
    }
  };

  // Reset to default column order
  const resetColumnOrder = () => {
    const defaultColumns = initialColumns.map((col) => ({
      ...col,
      visible: true,
    }));
    setColumns(defaultColumns);
    if (onColumnOrderChange) {
      onColumnOrderChange(defaultColumns);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c]"
            />
          </div>

          {selectedRows.length > 0 && (
            <button
              onClick={handleMultipleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
            >
              <FaTrash className="w-4 h-4" />
              Delete Selected ({selectedRows.length})
            </button>
          )}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <FaFilter className="w-3 h-3 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
                active
              </span>
              <button
                onClick={() => {
                  setFilterConditions([]);
                  setActiveFiltersCount(0);
                }}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvancedFilter(true)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors ${
              activeFiltersCount > 0
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Advanced Filter"
          >
            <FaFilter className="w-4 h-4" />
            Advanced Filter
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
          {/* Column Settings Button */}
          <button
            onClick={() => setShowColumnSettings(!showColumnSettings)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2"
            title="Column Settings"
          >
            <FaCog className="w-4 h-4" />
            Columns
          </button>

          {onExport && (
            <button
              onClick={onExport}
              className="px-4 py-2 bg-[#fbc40c] text-white rounded-lg hover:bg-[#D68108] flex items-center gap-2"
            >
              <FaDownload className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Column Settings Panel */}
      {showColumnSettings && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Manage Columns (Drag to reorder)
            </h3>
            <button
              onClick={resetColumnOrder}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset to Default
            </button>
          </div>

          <div className="space-y-2">
            {columns.map((column, index) => (
              <div
                key={column.key}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-shadow ${
                  draggedColumn === index ? "opacity-50 scale-95" : ""
                }`}
              >
                <div className="cursor-grab active:cursor-grabbing">
                  <FaGripVertical className="w-4 h-4 text-gray-400" />
                </div>

                <input
                  type="checkbox"
                  checked={column.visible}
                  onChange={() => toggleColumnVisibility(column.key)}
                  className="w-4 h-4 text-[#fbc40c] border-gray-300 rounded focus:ring-[#fbc40c] cursor-pointer"
                />

                <label className="flex-1 text-sm font-medium text-gray-700 cursor-pointer select-none">
                  {column.label}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowColumnSettings(false)}
              className="px-4 py-2 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg text-sm font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left sticky left-0 bg-gray-50 z-10">
                <button
                  onClick={toggleSelectAll}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {selectedRows.length === paginatedData.length &&
                  paginatedData.length > 0 ? (
                    <FaCheckSquare className="w-5 h-5" />
                  ) : (
                    <FaSquare className="w-5 h-5" />
                  )}
                </button>
              </th>

              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 hover:text-gray-900"
                    >
                      {column.label}
                      {sortColumn === column.key && (
                        <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}

              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, index) => {
              const rowId = getRowId(row);
              const isSelected = isRowSelected(row);
              const isRead = row.isRead || false;

              return (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${
                    isSelected ? "bg-blue-50" : ""
                  } ${isRead ? "" : "bg-yellow-50/30"}`}
                >
                  <td className="px-6 py-4 sticky left-0 bg-white z-10">
                    <button
                      onClick={() => toggleSelectRow(rowId)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {isSelected ? (
                        <FaCheckSquare className="w-5 h-5 text-[#fbc40c]" />
                      ) : (
                        <FaSquare className="w-5 h-5" />
                      )}
                    </button>
                  </td>

                  {visibleColumns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                    >
                      {row[column.key] || "-"}
                    </td>
                  ))}

                  <td className="px-6 py-4 bg-white">
                    {onToggleRead && (
                      <button
                        onClick={() => onToggleRead(rowId, !isRead)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          isRead
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                        title={isRead ? "Mark as Unread" : "Mark as Read"}
                      >
                        {isRead ? (
                          <>
                            <FaToggleOn className="w-4 h-4" />
                            Read
                          </>
                        ) : (
                          <>
                            <FaToggleOff className="w-4 h-4" />
                            Unread
                          </>
                        )}
                      </button>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right text-sm bg-white">
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(rowId)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(rowId)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(rowId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, sortedData.length)} of{" "}
          {sortedData.length} results
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
      <AdvancedFilter
        isOpen={showAdvancedFilter}
        onClose={() => setShowAdvancedFilter(false)}
        columns={columns}
        onApplyFilter={handleApplyFilter}
        initialConditions={filterConditions}
      />
    </div>
  );
};

export default EnhancedDataTable;


