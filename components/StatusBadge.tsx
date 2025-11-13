import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "default" | "success" | "warning" | "error" | "info";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = "default",
}) => {
  const getStatusStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-700 border-red-200";
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
