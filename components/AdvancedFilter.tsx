"use client";

import React, { useState } from "react";
import { FaTimes, FaPlus, FaFilter, FaTrash } from "react-icons/fa";

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
}

const OPERATORS = [
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

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  isOpen,
  onClose,
  columns,
  onApplyFilter,
  initialConditions = [],
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

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: Date.now().toString(),
        field: columns[0]?.key || "",
        operator: "contains",
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
      conditions.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleApply = () => {
    onApplyFilter(conditions);
    onClose();
  };

  const handleClear = () => {
    setConditions([
      {
        id: Date.now().toString(),
        field: columns[0]?.key || "",
        operator: "contains",
        value: "",
        logicalOperator: "AND",
      },
    ]);
    onApplyFilter([]);
    onClose();
  };

  const needsValueInput = (operator: string) => {
    return operator !== "isEmpty" && operator !== "isNotEmpty";
  };

  if (!isOpen) return null;

  return (
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
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Filter Conditions */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {conditions.map((condition, index) => (
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
                          updateCondition(condition.id, "logicalOperator", "OR")
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
                          updateCondition(condition.id, "field", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 text-sm"
                      >
                        {OPERATORS.map((op) => (
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
                      {needsValueInput(condition.operator) ? (
                        <input
                          type="text"
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
            ))}
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
                conditions.map((condition, index) => (
                  <div key={condition.id}>
                    {index > 0 && (
                      <span className="text-blue-600 font-bold">
                        {" "}
                        {condition.logicalOperator}{" "}
                      </span>
                    )}
                    <span>
                      {columns.find((c) => c.key === condition.field)?.label}{" "}
                      <span className="text-purple-600">
                        {
                          OPERATORS.find((o) => o.value === condition.operator)
                            ?.symbol
                        }
                      </span>{" "}
                      {needsValueInput(condition.operator) && (
                        <span className="text-green-600">
                          "{condition.value}"
                        </span>
                      )}
                    </span>
                  </div>
                ))
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
    </div>
  );
};

export default AdvancedFilter;
