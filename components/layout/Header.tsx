"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  HelpCircle,
  FileText,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New User Registration",
      message: "John Doe completed KYC verification",
      time: "5 min ago",
      unread: true,
      type: "success",
    },
    {
      id: 2,
      title: "Withdrawal Request",
      message: "₹50,000 withdrawal pending approval",
      time: "15 min ago",
      unread: true,
      type: "warning",
    },
    {
      id: 3,
      title: "High Volume Trade Alert",
      message: "Unusual trading activity detected for RELIANCE",
      time: "1 hour ago",
      unread: true,
      type: "alert",
    },
    {
      id: 4,
      title: "Support Ticket",
      message: "New ticket #1234 - Login Issue",
      time: "2 hours ago",
      unread: false,
      type: "info",
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users, trades, stocks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fbc40c] focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              ⌘ K
            </div>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Market Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-700">
              Market Open
            </span>
          </div>

          {/* Help */}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg relative"
            title="Help & Documentation"
          >
            <HelpCircle size={20} className="text-gray-600" />
          </button>

          {/* Documentation */}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg relative"
            title="Documentation"
          >
            <FileText size={20} className="text-gray-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <span className="text-xs text-[#fbc40c] font-semibold">
                      {unreadCount} new
                    </span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        notif.unread ? "bg-orange-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 mt-2 rounded-full ${
                            notif.type === "success"
                              ? "bg-green-500"
                              : notif.type === "warning"
                              ? "bg-yellow-500"
                              : notif.type === "alert"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200">
                  <button className="text-sm text-[#fbc40c] hover:text-[#D68108] font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <Link
            href="/admin/settings"
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Settings"
          >
            <Settings size={20} className="text-gray-600" />
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-3 pl-4 border-l border-gray-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#fbc40c] to-[#D68108] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AD</span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Administrator</p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 hidden lg:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">admin@ezwealth.com</p>
                  <p className="text-xs text-[#fbc40c] font-semibold mt-1">
                    Super Administrator
                  </p>
                </div>
                <div className="py-2">
                  <Link
                    href="/admin/profile"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <User size={16} />
                    <span className="text-sm">My Profile</span>
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <Settings size={16} />
                    <span className="text-sm">Settings</span>
                  </Link>
                  <Link
                    href="/admin/analytics"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <TrendingUp size={16} />
                    <span className="text-sm">Analytics</span>
                  </Link>
                </div>
                <div className="border-t border-gray-200 py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-red-50 text-red-600 w-full"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
