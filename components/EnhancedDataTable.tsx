"use client";

import React, { useEffect, useState } from "react";
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
  FaBookmark,
  FaChevronDown,
} from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";

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
  onFilterChange?: (conditions: FilterCondition[], search: string) => void;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (limit: number) => void;
  totalRecords?: number;
  currentPage?: number;
  itemsPerPage?: number;
  isLoading?: boolean;
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
  onFilterChange,
  onPageChange,
  onItemsPerPageChange,
  totalRecords = 0,
  currentPage = 1,
  itemsPerPage = 100,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [columns, setColumns] = useState<Column[]>(
    initialColumns.map((col) => ({ ...col, visible: col.visible !== false }))
  );
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState<number | null>(null);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>(
    []
  );
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [savedFilters, setSavedFilters] = useState<any[]>([]);
  const [showSavedFiltersDropdown, setShowSavedFiltersDropdown] =
    useState(false);
  const [isLoadingSavedFilters, setIsLoadingSavedFilters] = useState(false);
  const [selectAllPages, setSelectAllPages] = useState(false);
  const [isLoadingAllIds, setIsLoadingAllIds] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Load saved filters when dropdown opens
  useEffect(() => {
    if (showSavedFiltersDropdown) {
      loadSavedFilters();
    }
  }, [showSavedFiltersDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        showSavedFiltersDropdown &&
        !target.closest(".saved-filters-dropdown")
      ) {
        setShowSavedFiltersDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSavedFiltersDropdown]);

  const loadSavedFilters = async () => {
    try {
      setIsLoadingSavedFilters(true);
      const response = await fetch(`${API_URL}/saved-filters`);
      const data = await response.json();

      if (data.success) {
        setSavedFilters(data.filters || []);
      }
    } catch (error) {
      console.error("Error loading saved filters:", error);
    } finally {
      setIsLoadingSavedFilters(false);
    }
  };

  const handleLoadSavedFilter = async (filterId: string) => {
    try {
      const response = await fetch(`${API_URL}/saved-filters/${filterId}`);
      const data = await response.json();

      if (data.success && data.filter) {
        setFilterConditions(data.filter.filterConditions);
        setActiveFiltersCount(data.filter.filterConditions.length);
        setShowSavedFiltersDropdown(false);

        if (onFilterChange) {
          onFilterChange(data.filter.filterConditions, searchTerm);
        }
      }
    } catch (error) {
      console.error("Error loading filter:", error);
    }
  };

  const paginatedData = data;
  const totalPages = Math.ceil((totalRecords || 0) / itemsPerPage);
  const visibleColumns = columns.filter((col) => col.visible);

  const getRowId = (row: any): string => {
    return row._id || row.id;
  };

  const toggleSelectAll = () => {
    if (selectAllPages) {
      // If "select all pages" is active, deselect everything
      setSelectedRows([]);
      setSelectAllPages(false);
    } else if (
      selectedRows.length === paginatedData.length &&
      paginatedData.length > 0
    ) {
      // If current page is fully selected, deselect current page
      setSelectedRows([]);
    } else {
      // Select all on current page
      setSelectedRows(paginatedData.map((row) => getRowId(row)));
    }
  };

  const selectAllRecords = async () => {
    try {
      setIsLoadingAllIds(true);

      // Fetch all IDs from backend with current filters
      const params = new URLSearchParams({
        search: searchTerm,
        filters: JSON.stringify(filterConditions),
      });

      const response = await fetch(`${API_URL}/clients/ids/all?${params}`);
      const data = await response.json();

      if (response.ok && data.ids) {
        setSelectAllPages(true);
        setSelectedRows(data.ids);
        console.log(`Selected all ${data.ids.length} records`);
      } else {
        console.error("Failed to fetch all IDs:", data.message);
        // Fallback: just mark all pages as selected with current page IDs
        setSelectAllPages(true);
        setSelectedRows(paginatedData.map((row) => getRowId(row)));
      }
    } catch (error) {
      console.error("Error fetching all client IDs:", error);
      // Fallback: just mark all pages as selected with current page IDs
      setSelectAllPages(true);
      setSelectedRows(paginatedData.map((row) => getRowId(row)));
    } finally {
      setIsLoadingAllIds(false);
    }
  };

  const isAllCurrentPageSelected =
    selectedRows.length === paginatedData.length && paginatedData.length > 0;

  const toggleSelectRow = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleMultipleDelete = () => {
    if (onMultipleDelete && selectedRows.length > 0) {
      onMultipleDelete(selectedRows);
      setSelectedRows([]);
      setSelectAllPages(false);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const isRowSelected = (row: any): boolean => {
    const rowId = getRowId(row);
    return selectedRows.includes(rowId);
  };

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

  const toggleColumnVisibility = (columnKey: string) => {
    const updatedColumns = columns.map((col) =>
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    );
    setColumns(updatedColumns);
    if (onColumnOrderChange) {
      onColumnOrderChange(updatedColumns);
    }
  };

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

  // Handle apply filter - FIXED: Update count immediately
  const handleApplyFilter = (conditions: FilterCondition[]) => {
    console.log("Applying filters:", conditions);
    setFilterConditions(conditions);
    setActiveFiltersCount(conditions.length);
    if (onFilterChange) {
      onFilterChange(conditions, searchTerm);
    }
  };

  // Clear filters - FIXED: Reset count and conditions
  const clearFilters = () => {
    console.log("Clearing filters");
    setFilterConditions([]);
    setActiveFiltersCount(0);
    if (onFilterChange) {
      onFilterChange([], searchTerm);
    }
  };

  // Debounce search to call backend
  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    const timer = setTimeout(() => {
      if (onFilterChange) {
        console.log("Search term changed:", searchTerm);
        onFilterChange(filterConditions, searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sort data for display only
  const sortedData = sortColumn
    ? [...paginatedData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : paginatedData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
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
              Delete Selected (
              {selectAllPages ? totalRecords : selectedRows.length})
            </button>
          )}

          {/* Select All Pages Banner */}
          {isAllCurrentPageSelected &&
            !selectAllPages &&
            totalRecords > paginatedData.length && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm text-blue-700">
                  All {paginatedData.length} on this page are selected.
                </span>
                <button
                  onClick={selectAllRecords}
                  disabled={isLoadingAllIds}
                  className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline disabled:opacity-50 flex items-center gap-1"
                >
                  {isLoadingAllIds ? (
                    <>
                      <FaSpinner className="w-3 h-3 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    `Select all ${totalRecords} records`
                  )}
                </button>
              </div>
            )}

          {/* All Pages Selected Banner */}
          {selectAllPages && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm text-green-700 font-medium">
                All {totalRecords} records are selected.
              </span>
              <button
                onClick={() => {
                  setSelectAllPages(false);
                  setSelectedRows([]);
                }}
                className="text-sm font-semibold text-green-700 hover:text-green-900 underline"
              >
                Clear selection
              </button>
            </div>
          )}

          {/* FIXED: Show active filters indicator */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <FaFilter className="w-3 h-3 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
                active
              </span>
              <button
                onClick={clearFilters}
                className="ml-2 text-blue-600 hover:text-blue-800"
                title="Clear all filters"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Saved Filters Dropdown */}
          <div className="relative saved-filters-dropdown">
            <button
              onClick={() =>
                setShowSavedFiltersDropdown(!showSavedFiltersDropdown)
              }
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors cursor-pointer ${
                savedFilters.length > 0
                  ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title="Saved Filters"
            >
              <FaBookmark className="w-4 h-4" />
              Saved Filters
              <FaChevronDown
                className={`w-3 h-3 transition-transform ${
                  showSavedFiltersDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showSavedFiltersDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                {isLoadingSavedFilters ? (
                  <div className="p-4 text-center">
                    <FaSpinner className="w-5 h-5 animate-spin mx-auto text-[#fbc40c]" />
                    <p className="text-sm text-gray-600 mt-2">Loading...</p>
                  </div>
                ) : savedFilters.length === 0 ? (
                  <div className="p-4 text-center">
                    <FaBookmark className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No saved filters</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Save a filter from Advanced Filter
                    </p>
                  </div>
                ) : (
                  <div className="py-2">
                    {savedFilters.map((filter) => (
                      <button
                        key={filter._id}
                        onClick={() => handleLoadSavedFilter(filter._id)}
                        className="w-full px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-gray-900 text-sm">
                          {filter.name}
                        </div>
                        {filter.description && (
                          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {filter.description}
                          </div>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaBookmark className="w-3 h-3" />
                            {filter.usageCount} uses
                          </span>
                          <span>By: {filter.createdBy}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAdvancedFilter(true)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors cursor-pointer ${
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

          <button
            onClick={() => setShowColumnSettings(!showColumnSettings)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium text-gray-700 rounded-lg flex items-center gap-2 cursor-pointer"
            title="Column Settings"
          >
            <FaCog className="w-4 h-4" />
            Columns
          </button>

          {onExport && (
            <button
              onClick={onExport}
              className="px-4 py-2 bg-[#fbc40c] text-white rounded-lg font-medium hover:bg-[#D68108] flex items-center gap-2 cursor-pointer"
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
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <FaSpinner className="w-12 h-12 text-[#fbc40c] animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading data...</p>
            </div>
          </div>
        ) : sortedData.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left sticky left-0 bg-gray-50 z-10">
                  <button
                    onClick={toggleSelectAll}
                    className="text-gray-600 hover:text-gray-900"
                    title={
                      selectAllPages
                        ? "All records selected"
                        : isAllCurrentPageSelected
                        ? "Deselect all on page"
                        : "Select all on page"
                    }
                  >
                    {selectAllPages || isAllCurrentPageSelected ? (
                      <FaCheckSquare className="w-5 h-5 text-[#fbc40c]" />
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
              {sortedData.map((row, index) => {
                const rowId = getRowId(row);
                const isSelected = selectAllPages || isRowSelected(row);
                const isRead = row.isRead || false;

                return (
                  <tr
                    key={index}
                    onClick={() => onEdit && onEdit(rowId)}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                      isSelected ? "bg-blue-50" : ""
                    } ${isRead ? "" : "bg-yellow-50/30"}`}
                  >
                    <td
                      className="px-6 py-4 sticky left-0 bg-white z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          if (selectAllPages) {
                            setSelectAllPages(false);
                          }
                          toggleSelectRow(rowId);
                        }}
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

                    <td
                      className="px-6 py-4 bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
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

                    <td
                      className="px-6 py-4 text-right text-sm bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
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
        ) : (
          /* FIXED: Show "No Results" when filters are active but no data */
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <FaFilter className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600 mb-4">
              {activeFiltersCount > 0 || searchTerm
                ? "No data matches your current filters or search criteria."
                : "No data available in the table."}
            </p>
            {(activeFiltersCount > 0 || searchTerm) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  clearFilters();
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
              >
                <FaTimes className="w-4 h-4" />
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination - Show even when no data if filters are active */}
      {(sortedData.length > 0 || activeFiltersCount > 0 || searchTerm) && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <select
              value={itemsPerPage}
              onChange={(e) =>
                onItemsPerPageChange &&
                onItemsPerPageChange(Number(e.target.value))
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c]"
            >
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value={250}>250 per page</option>
              <option value={500}>500 per page</option>
              <option value={1000}>1000 per page</option>
            </select>

            <p className="text-sm text-gray-600">
              Showing{" "}
              {sortedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}{" "}
              to {Math.min(currentPage * itemsPerPage, totalRecords)} of{" "}
              {totalRecords} results
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Advanced Filter Modal */}
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
