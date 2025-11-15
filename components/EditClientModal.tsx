"use client";

import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaUser,
  FaBriefcase,
  FaChartLine,
  FaFileAlt,
  FaPhone,
  FaSpinner,
  FaHistory,
} from "react-icons/fa";
import AuditLogViewer from "./AuditLogViewer";

interface ClientData {
  [key: string]: any;
}

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: ClientData | null;
  onSave: (data: ClientData) => Promise<void>;
  isUpdating: boolean;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  isOpen,
  onClose,
  clientData,
  onSave,
  isUpdating,
}) => {
  const [editData, setEditData] = useState<ClientData>(clientData || {});
  const [showAuditLog, setShowAuditLog] = useState(false);

  useEffect(() => {
    if (clientData) {
      setEditData(clientData);
    }
  }, [clientData]);

  if (!isOpen || !clientData) return null;

  const handleChange = (key: string, value: any) => {
    const newData = { ...editData, [key]: value };

    // Clear conditional fields when calling status changes
    if (key === "callingStatus") {
      newData.reEycDoneDate = "";
      newData.demoRequiredDate = "";
      newData.fundReceivedAmount = "";
      newData.fundReceivedDate = "";
      newData.tradeDoneDate = "";
    }

    setEditData(newData);
  };

  const handleSubmit = async () => {
    await onSave(editData);
  };

  const isActiveAccount = editData.accountStatus === "Active";

  // Calling status options based on account status
  const inactiveCallingStatusOptions = [
    "New",
    "Not Contactable",
    "In Process",
    "Re-EYC done",
    "Form Sent",
    "Sent to Activation",
    "Call disconnected by Client",
    "Client wants to close account",
    "Brokerage Related",
    "Others",
    "Not Interested",
    "Invalid Number",
  ];

  const activeCallingStatusOptions = [
    "New",
    "Not Contactable",
    "In Process",
    "Demo Required Date",
    "Not Interested",
    "Fund Received",
    "Trade Done",
  ];

  const callingStatusOptions = isActiveAccount
    ? activeCallingStatusOptions
    : inactiveCallingStatusOptions;

  // Build follow-up fields dynamically
  const getFollowUpFields = () => {
    const baseFields = [
      {
        key: "callingStatus",
        label: "Calling Status",
        type: "select",
        options: callingStatusOptions,
      },
    ];

    // Add conditional fields based on calling status
    if (editData.callingStatus === "Re-EYC done") {
      baseFields.push({
        key: "reEycDoneDate",
        label: "Re-EYC Done Date",
        type: "date",
        options: [],
      });
    } else if (editData.callingStatus === "Demo Required Date") {
      baseFields.push({
        key: "demoRequiredDate",
        label: "Demo Required Date",
        type: "date",
        options: [],
      });
    } else if (editData.callingStatus === "Fund Received") {
      baseFields.push({
        key: "fundReceivedAmount",
        label: "Fund Received Amount",
        type: "number",
        options: [],
      });
      baseFields.push({
        key: "fundReceivedDate",
        label: "Fund Received Date",
        type: "date",
        options: [],
      });
    } else if (editData.callingStatus === "Trade Done") {
      baseFields.push({
        key: "tradeDoneDate",
        label: "Trade Done Date",
        type: "date",
        options: [],
      });
    }

    baseFields.push(
      {
        key: "nextFollowUpDate",
        label: "Next Follow-up Date",
        type: "date",
        options: [],
      },
      { key: "remarks", label: "Remarks", type: "textarea", options: [] }
    );

    return baseFields;
  };

  // Category definitions
  const categories = [
    {
      title: "Basic Information",
      icon: <FaUser className="w-5 h-5" />,
      color: "blue",
      fields: [
        {
          key: "tradingCode",
          label: "Trading Code",
          type: "text",
          disabled: true,
        },
        { key: "owner", label: "Owner", type: "text" },
        { key: "name", label: "Name", type: "text" },
        { key: "mobileNo", label: "Mobile No", type: "tel" },
        { key: "emailId", label: "Email ID", type: "email" },
        { key: "dpClientId", label: "DP Client ID", type: "text" },
      ],
    },
    {
      title: "Account Details",
      icon: <FaBriefcase className="w-5 h-5" />,
      color: "green",
      fields: [
        { key: "branchCode", label: "Branch Code", type: "text" },
        { key: "rmtlCode", label: "RMTL Code", type: "text" },
        {
          key: "investorType",
          label: "Investor Type",
          type: "select",
          options: ["Individual", "Corporate", "Partnership", "HUF", "Trust"],
        },
        { key: "accountOpenDate", label: "A/c Open Date", type: "date" },
        {
          key: "accountStatus",
          label: "Account Status",
          type: "select",
          options: ["Active", "Inactive", "Suspended", "Closed"],
        },
        { key: "activeExchange", label: "Active Exchange", type: "text" },
      ],
    },
    {
      title: "Trading Information",
      icon: <FaChartLine className="w-5 h-5" />,
      color: "purple",
      fields: [
        { key: "firstTradeDate", label: "First Trade Date", type: "date" },
        { key: "lastTradeDate", label: "Last Trade Date", type: "date" },
        { key: "holdingValue", label: "Holding Value", type: "number" },
        { key: "ledgerBalance", label: "Ledger Balance", type: "number" },
        { key: "ytdBrok", label: "YTD Brokerage", type: "number" },
        { key: "lastLoginDate", label: "Last Login Date", type: "date" },
      ],
    },
    {
      title: "Personal Details",
      icon: <FaFileAlt className="w-5 h-5" />,
      color: "orange",
      fields: [
        {
          key: "annualIncome",
          label: "Annual Income",
          type: "select",
          options: [
            "Below 1 Lac",
            "1-5 Lacs",
            "5-10 Lacs",
            "10-25 Lacs",
            "Above 25 Lacs",
          ],
        },
        {
          key: "occupation",
          label: "Occupation",
          type: "select",
          options: [
            "Business",
            "Service",
            "Professional",
            "Retired",
            "Student",
            "Housewife",
            "Others",
          ],
        },
        { key: "city", label: "City", type: "text" },
        { key: "state", label: "State", type: "text" },
        {
          key: "poaDdpi",
          label: "POA/DDPI",
          type: "select",
          options: ["Yes", "No", "Pending"],
        },
        { key: "nominee", label: "Nominee", type: "text" },
      ],
    },
    {
      title: `Follow-up & Remarks ${
        isActiveAccount ? "(Active Account)" : "(Inactive Account)"
      }`,
      icon: <FaPhone className="w-5 h-5" />,
      color: "red",
      fields: getFollowUpFields(),
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      green: "bg-green-50 border-green-200 text-green-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
      orange: "bg-orange-50 border-orange-200 text-orange-700",
      red: "bg-red-50 border-red-200 text-red-700",
    };
    return colors[color] || colors.blue;
  };

  const renderField = (field: any) => {
    const value = editData[field.key] || "";

    if (field.type === "select") {
      return (
        <select
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value)}
          disabled={isUpdating || field.disabled}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
        >
          <option value="">Select {field.label}</option>
          {field.options?.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value)}
          disabled={isUpdating || field.disabled}
          rows={4}
          placeholder={`Enter ${field.label.toLowerCase()}...`}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm resize-none"
        />
      );
    }

    return (
      <input
        type={field.type}
        value={value}
        onChange={(e) => handleChange(field.key, e.target.value)}
        disabled={isUpdating || field.disabled}
        placeholder={
          field.type === "number"
            ? `Enter ${field.label.toLowerCase()}`
            : field.type === "date"
            ? "Select date"
            : `Enter ${field.label.toLowerCase()}`
        }
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#fbc40c] focus:ring-2 focus:ring-[#fbc40c]/20 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-green-600">
          <div>
            <h3 className="text-2xl font-bold text-white">Edit Client</h3>
            <p className="text-green-100 text-sm mt-1">
              Trading Code: {editData.tradingCode || "N/A"} | Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  isActiveAccount
                    ? "bg-green-300 text-green-900"
                    : "bg-yellow-300 text-yellow-900"
                }`}
              >
                {editData.accountStatus || "Unknown"}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <FaTimes className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {categories.map((category, catIndex) => (
              <div
                key={catIndex}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Category Header */}
                <div
                  className={`px-6 py-3 border-b-2 flex items-center gap-3 ${getColorClasses(
                    category.color
                  )}`}
                >
                  {category.icon}
                  <h4 className="font-bold text-lg">{category.title}</h4>
                </div>

                {/* Category Fields */}
                <div className="p-6 grid grid-cols-3 gap-6">
                  {category.fields.map((field) => (
                    <div
                      key={field.key}
                      className={`${
                        field.type === "textarea" ? "col-span-3" : ""
                      }`}
                    >
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                        {field.label}
                        {"disabled" in field && field.disabled && (
                          <span className="ml-2 text-xs text-gray-500 normal-case">
                            (Read-only)
                          </span>
                        )}
                        {field.key.includes("Date") ||
                        field.key.includes("Amount") ? (
                          <span className="ml-1 text-red-500">*</span>
                        ) : null}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t-2 border-gray-200 bg-gray-50">
          <button
            onClick={() => setShowAuditLog(true)}
            disabled={isUpdating}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            <FaHistory className="w-4 h-4" />
            View Audit Log
          </button>
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#fbc40c] to-[#D68108] hover:from-[#D68108] hover:to-[#fbc40c] text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <>
                <FaSpinner className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>

      {/* Audit Log Modal */}
      {showAuditLog && clientData && (
        <AuditLogViewer
          clientId={clientData._id || clientData.id}
          tradingCode={clientData.tradingCode}
          isOpen={showAuditLog}
          onClose={() => setShowAuditLog(false)}
        />
      )}
    </div>
  );
};

export default EditClientModal;
