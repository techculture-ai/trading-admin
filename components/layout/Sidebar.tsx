'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname,useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  MapPin,
  ClipboardList,
  Building2,
  Home,
  Calculator,
  Users,
  Package,
  Wrench,
  Megaphone,
  Scale,
  FileText,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
} from 'lucide-react'

interface SubMenuItem {
  name: string
  href: string
}

interface MenuItem {
  name: string
  icon: any
  href?: string
  badge?: string
  subItems?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    name: 'Land Acquisition',
    icon: MapPin,
    // href: '/land-acquisition',
    subItems: [
      { name: 'Parcel Registry', href: '/land-acquisition/parcel-registry' },
      { name: 'Acquisition Workflows', href: '/land-acquisition/acquisition-workflows' },
      { name: 'Compensation & Payment', href: '/land-acquisition/compensation-payment' },
      { name: 'Land Valuation', href: '/land-acquisition/land-valuation' },
      { name: 'GIS View', href: '/land-acquisition/gis-view' },
    ],
  },
  {
    name: 'Planning',
    icon: ClipboardList,
    // href: '/planning',
    subItems: [
      { name: 'Project Master', href: '/planning/project-master' },
      { name: 'DPR & Design', href: '/planning/dpr-design' },
      { name: 'Resource Estimation', href: '/planning/resource-estimation' },
      { name: 'Clearances & NOCs', href: '/planning/clearances' },
    ],
  },
  {
    name: 'Construction',
    icon: Building2,
    // href: '/construction',
    badge: 'NEW',
    subItems: [
      { name: 'Project & Contracts', href: '/construction/project-contracts' },
      { name: 'Site Progress', href: '/construction/site-progress' },
      { name: 'Quality Assurance', href: '/construction/quality-assurance' },
      { name: 'Bill Processing', href: '/construction/bill-processing' },
    ],
  },
  {
    name: 'Property Disposal',
    icon: Home,
    // href: '/property-disposal',
    subItems: [
      { name: 'Property Master', href: '/property-disposal/property-master' },
      { name: 'Sale & Allotment', href: '/property-disposal/sale-allotment' },
      { name: 'Pricing Engine', href: '/property-disposal/pricing' },
      { name: 'Inventory Status', href: '/property-disposal/inventory' },
    ],
  },
  {
    name: 'Accounts',
    icon: Calculator,
    // href: '/accounts',
    subItems: [
      { name: 'Budgeting', href: '/accounts/budgeting' },
      { name: 'Receipts & Revenue', href: '/accounts/receipts' },
      { name: 'Payables', href: '/accounts/payables' },
      { name: 'Treasury Integration', href: '/accounts/treasury' },
    ],
  },
  {
    name: 'Establishment',
    icon: Users,
    // href: '/establishment',
    subItems: [
      { name: 'Employee Master', href: '/establishment/employee-master' },
      { name: 'Attendance & Leave', href: '/establishment/attendance' },
      { name: 'Payroll', href: '/establishment/payroll' },
    ],
  },
  {
    name: 'General Store',
    icon: Package,
    // href: '/general-store',
    subItems: [
      { name: 'Inventory', href: '/general-store/inventory' },
      { name: 'Procurement', href: '/general-store/procurement' },
    ],
  },
  {
    name: 'Engineering Store',
    icon: Wrench,
    // href: '/engineering-store',
    subItems: [
      { name: 'Material Master', href: '/engineering-store/material-master' },
      { name: 'Issue Tracking', href: '/engineering-store/issue-tracking' },
    ],
  },
  {
    name: 'Marketing',
    icon: Megaphone,
    // href: '/marketing',
    subItems: [
      { name: 'Campaigns', href: '/marketing/campaigns' },
      { name: 'Lead Management', href: '/marketing/leads' },
    ],
  },
  {
    name: 'Legal',
    icon: Scale,
    // href: '/legal',
    subItems: [
      { name: 'Case Registry', href: '/legal/case-registry' },
      { name: 'Hearing Calendar', href: '/legal/hearings' },
    ],
  },
  {
    name: 'RTI',
    icon: FileText,
    // href: '/rti',
    subItems: [
      { name: 'Applications', href: '/rti/applications' },
      { name: 'Responses', href: '/rti/responses' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Dashboard'])
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleExpand = (itemName: string) => {
    if (isMinimized) return // Don't expand when minimized
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    )
  }

  const toggleSidebar = () => {
    setIsMinimized((prev) => !prev)
    if (!isMinimized) {
      setExpandedItems([]) // Collapse all when minimizing
    }
  }

  const isActive = (href: string) => pathname === href

  return (
    <aside
      className={`bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ${
        isMinimized ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!isMinimized && <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>}
            {!isMinimized && <span className="font-semibold text-lg">MIS ERP</span>}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            title={isMinimized ? 'Maximize sidebar' : 'Minimize sidebar'}
          >
            {isMinimized ? <Menu size={20} /> : <ChevronLeft size={20} />}
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
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={isMinimized ? item.name : ''}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} />
                    {!isMinimized && <span className="font-medium">{item.name}</span>}
                  </div>
                  {!isMinimized && item.badge && (
                    <span className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    title={isMinimized ? item.name : ''}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} />
                      {!isMinimized && <span className="font-medium">{item.name}</span>}
                    </div>
                    {!isMinimized && (
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded">
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
                  {!isMinimized && expandedItems.includes(item.name) && item.subItems && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                            isActive(subItem.href)
                              ? 'bg-orange-50 text-orange-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.name}
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
        <div className="mt-8 pt-8 border-t border-gray-200 space-y-1">
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
            title={isMinimized ? 'Settings' : ''}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!isMinimized && <span className="font-medium">Settings</span>}
          </Link>
          <button
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
            title={isMinimized ? 'Log out' : ''}
            onClick={() => router.push('/signin')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isMinimized && <span className="font-medium">Log out</span>}
          </button>
        </div>
      </nav>
    </aside>
  )
}