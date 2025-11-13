import React from "react";
import Link from "next/link";
import { FaPlus, FaDownload, FaFilter } from "react-icons/fa";

interface PageHeaderProps {
  title: string;
  description?: string;
  showAddButton?: boolean;
  addButtonText?: string;
  addButtonHref?: string;
  onAddClick?: () => void;
  showExportButton?: boolean;
  onExportClick?: () => void;
  showFilterButton?: boolean;
  onFilterClick?: () => void;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  showAddButton = false,
  addButtonText = "Add New",
  addButtonHref,
  onAddClick,
  showExportButton = false,
  onExportClick,
  showFilterButton = false,
  onFilterClick,
  children,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {showFilterButton && (
          <button
            onClick={onFilterClick}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-medium text-gray-700"
          >
            <FaFilter className="w-4 h-4" />
            Filter
          </button>
        )}
        {showExportButton && (
          <button
            onClick={onExportClick}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-medium text-gray-700"
          >
            <FaDownload className="w-4 h-4" />
            Export
          </button>
        )}
        {showAddButton &&
          (addButtonHref ? (
            <Link
              href={addButtonHref}
              className="px-4 py-2 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg flex items-center gap-2 font-semibold transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              {addButtonText}
            </Link>
          ) : (
            <button
              onClick={onAddClick}
              className="px-4 py-2 bg-[#fbc40c] hover:bg-[#D68108] text-white rounded-lg flex items-center gap-2 font-semibold transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              {addButtonText}
            </button>
          ))}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
