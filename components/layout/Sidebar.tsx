"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Package,
  Wallet,
  Headphones,
  BarChart3,
  FileText,
  Newspaper,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  UserCheck,
  CreditCard,
  Building2,
  ShoppingCart,
  PieChart,
  LineChart,
  LogOut,
} from "lucide-react";

interface SubMenuItem {
  name: string;
  href: string;
  badge?: string;
}

interface MenuItem {
  name: string;
  icon: any;
  href?: string;
  badge?: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "User Management",
    icon: Users,
    // badge: "156",
    subItems: [
      { name: "All Users", href: "/users" },
      { name: "KYC Verification", href: "/users/kyc", badge: "23" },
      { name: "Demat Accounts", href: "/accounts/demat" },
      { name: "Trading Accounts", href: "/accounts/trading" },
    ],
  },
  {
    name: "Trade Management",
    icon: TrendingUp,
    subItems: [
      { name: "All Trades", href: "/trades" },
      { name: "Orders", href: "/trades/orders", badge: "45" },
      { name: "Open Positions", href: "/trades/positions" },
    ],
  },
  {
    name: "Products",
    icon: Package,
    subItems: [
      { name: "Stocks", href: "/products/stocks" },
      { name: "Mutual Funds", href: "/products/mutual-funds" },
      { name: "IPOs", href: "/products/ipos", badge: "3" },
      { name: "F&O", href: "/products/fno" },
    ],
  },
  {
    name: "Payments",
    icon: Wallet,
    subItems: [
      { name: "Transactions", href: "/payments" },
      { name: "Withdrawals", href: "/payments/withdrawals", badge: "12" },
      { name: "Deposits", href: "/payments/deposits" },
    ],
  },
  {
    name: "Clients", // New Menu Item
    icon: Users,
    href: "/clients",
  },
  {
    name: "Support",
    icon: Headphones,
    badge: "34",
    subItems: [
      { name: "Tickets", href: "/support/tickets", badge: "18" },
      { name: "Queries", href: "/support/queries", badge: "16" },
    ],
  },
  {
    name: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    name: "Reports",
    icon: FileText,
    href: "/reports",
  },
  {
    name: "Content",
    icon: Newspaper,
    subItems: [
      { name: "Blogs", href: "/content/blogs" },
      { name: "News", href: "/content/news" },
      { name: "Research", href: "/content/research" },
    ],
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleExpand = (itemName: string) => {
    if (isMinimized) return;
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const toggleSidebar = () => {
    setIsMinimized((prev) => !prev);
    if (!isMinimized) {
      setExpandedItems([]);
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`bg-[#0A2745] text-white border-r border-white/10 overflow-y-auto transition-all duration-300 h-screen hide-scrollbar  ${
        isMinimized ? "w-24" : ""
      }`}
    >
      {/* Logo */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!isMinimized && (
              <div className="w-10 h-10 bg-[#fbc40c] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                EZ
              </div>
            )}
            {!isMinimized && (
              <span className="font-semibold text-lg">Control Panel</span>
            )}
            {isMinimized && (
              <div className="w-10 h-10 bg-[#fbc40c] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                EZ
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title={isMinimized ? "Maximize sidebar" : "Minimize sidebar"}
          >
            {isMinimized ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-[#fbc40c] text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                  title={isMinimized ? item.name : ""}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} />
                    {!isMinimized && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </div>
                  {!isMinimized && item.badge && (
                    <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-semibold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
                    title={isMinimized ? item.name : ""}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} />
                      {!isMinimized && (
                        <span className="font-medium">{item.name}</span>
                      )}
                    </div>
                    {!isMinimized && (
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-semibold">
                            {item.badge}
                          </span>
                        )}
                        {expandedItems.includes(item.name) ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </div>
                    )}
                  </button>
                  {!isMinimized &&
                    expandedItems.includes(item.name) &&
                    item.subItems && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/10 pl-3">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-colors ${
                              isActive(subItem.href)
                                ? "bg-[#fbc40c] text-white font-medium"
                                : "text-white/70 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <ChevronRight size={14} />
                              <span>{subItem.name}</span>
                            </div>
                            {subItem.badge && (
                              <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full font-semibold">
                                {subItem.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Settings & Logout */}
        <div className="mt-8 pt-8 border-t border-white/10 space-y-1">
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10"
            title={isMinimized ? "Settings" : ""}
          >
            <Settings size={20} />
            {!isMinimized && <span className="font-medium">Settings</span>}
          </Link>
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
            title={isMinimized ? "Log out" : ""}
            onClick={() => router.push("/login")}
          >
            <LogOut size={20} />
            {!isMinimized && <span className="font-medium">Log out</span>}
          </button>
        </div>
      </nav>

      {/* User Info at Bottom */}
      {/* {!isMinimized && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0A2745]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#fbc40c] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-white">
                Admin User
              </p>
              <p className="text-xs text-white/60 truncate">
                admin@ezwealth.com
              </p>
            </div>
          </div>
        </div>
      )} */}
    </aside>
  );
}
