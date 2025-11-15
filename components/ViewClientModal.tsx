"use client";

import React, { useState } from "react";
import {
  FaTimes,
  FaUser,
  FaBriefcase,
  FaChartLine,
  FaFileAlt,
  FaPhone,
  FaHistory,
} from "react-icons/fa";
import AuditLogViewer from "./AuditLogViewer";

interface ClientData {
  [key: string]: any;
}

interface ViewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientData: ClientData | null;
}

const ViewClientModal: React.FC<ViewClientModalProps> = ({
  isOpen,
  onClose,
  clientData,
}) => {
  const [showAuditLog, setShowAuditLog] = useState(false);

  if (!isOpen || !clientData) return null;

  const isActiveAccount = clientData.accountStatus === "Active";

  // Build follow-up fields dynamically based on calling status
  const getFollowUpFields = () => {
    const baseFields = [
      { key: "callingStatus", label: "Calling Status", type: "text" },
    ];

    // Add conditional fields based on calling status
    if (clientData.callingStatus === "Re-EYC done") {
      baseFields.push({
        key: "reEycDoneDate",
        label: "Re-EYC Done Date",
        type: "date",
      });
    } else if (clientData.callingStatus === "Demo Required Date") {
      baseFields.push({
        key: "demoRequiredDate",
        label: "Demo Required Date",
        type: "date",
      });
    } else if (clientData.callingStatus === "Fund Received") {
      baseFields.push({
        key: "fundReceivedAmount",
        label: "Fund Received Amount",
        type: "number",
      });
      baseFields.push({
        key: "fundReceivedDate",
        label: "Fund Received Date",
        type: "date",
      });
    } else if (clientData.callingStatus === "Trade Done") {
      baseFields.push({
        key: "tradeDoneDate",
        label: "Trade Done Date",
        type: "date",
      });
    }

    baseFields.push(
      { key: "nextFollowUpDate", label: "Next Follow-up Date", type: "date" },
      { key: "remarks", label: "Remarks", type: "textarea" }
    );

    return baseFields;
  };

  // Category definitions with columns
  const categories = [
    {
      title: "Basic Information",
      icon: <FaUser className="w-5 h-5" />,
      color: "blue",
      fields: [
        { key: "tradingCode", label: "Trading Code", type: "text" },
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
        { key: "investorType", label: "Investor Type", type: "text" },
        { key: "accountOpenDate", label: "A/c Open Date", type: "date" },
        { key: "accountStatus", label: "Account Status", type: "text" },
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
        { key: "annualIncome", label: "Annual Income", type: "text" },
        { key: "occupation", label: "Occupation", type: "text" },
        { key: "city", label: "City", type: "text" },
        { key: "state", label: "State", type: "text" },
        { key: "poaDdpi", label: "POA/DDPI", type: "text" },
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

  const formatValue = (value: any, type: string) => {
    if (!value || value === "") return "-";
    if (type === "number" && value) {
      return new Intl.NumberFormat("en-IN").format(parseFloat(value));
    }
    if (type === "date" && value) {
      try {
        return new Date(value).toLocaleDateString("en-IN");
      } catch {
        return value;
      }
    }
    return value;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
          <div>
            <h3 className="text-2xl font-bold text-white">Client Details</h3>
            <p className="text-blue-100 text-sm mt-1">
              Trading Code: {clientData.tradingCode || "N/A"} | Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  isActiveAccount
                    ? "bg-green-400 text-green-900"
                    : "bg-yellow-400 text-yellow-900"
                }`}
              >
                {clientData.accountStatus || "Unknown"}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
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
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                        {field.label}
                      </label>
                      <div
                        className={`text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 ${
                          field.type === "textarea" ? "min-h-[100px]" : ""
                        }`}
                      >
                        {formatValue(clientData[field.key], field.type)}
                      </div>
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
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
          >
            <FaHistory className="w-4 h-4" />
            View Audit Log
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Audit Log Modal */}
      {showAuditLog && (
        <AuditLogViewer
          clientId={clientData._id}
          tradingCode={clientData.tradingCode}
          isOpen={showAuditLog}
          onClose={() => setShowAuditLog(false)}
        />
      )}
    </div>
  );
};

export default ViewClientModal;
