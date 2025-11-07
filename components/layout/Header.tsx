'use client'

import { useState } from 'react'
import { Search, Bell, Settings, User, LogOut, HelpCircle, FileText } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications = [
    { id: 1, title: 'New RTI Application', message: 'RTI/2024/234 received', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment Approved', message: 'Bill payment of ₹2.5 Cr approved', time: '1 hour ago', unread: true },
    { id: 3, title: 'Project Update', message: 'Gomti Nagar Housing - 65% complete', time: '2 hours ago', unread: false },
  ]

  const handleLogout = () => {
    router.push('/signin')
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects, properties, documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              ⌘ K
            </div>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Help */}
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <HelpCircle size={20} className="text-gray-600" />
          </button>

          {/* Documentation */}
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <FileText size={20} className="text-gray-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <span className="text-xs text-orange-600 font-medium">2 new</span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-orange-50' : ''}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 mt-2 rounded-full ${notif.unread ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200">
                  <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <Link href="/settings" className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings size={20} className="text-gray-600" />
          </Link>
          
          {/* User Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 pl-4 border-l border-gray-200"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">PS</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Prabhu Zz</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Prabhu Zz</p>
                  <p className="text-xs text-gray-500">prabhuzz00@example.com</p>
                  <p className="text-xs text-gray-500 mt-1">Administrator</p>
                </div>
                <div className="py-2">
                  <Link 
                    href="/settings" 
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <User size={16} />
                    <span className="text-sm">My Profile</span>
                  </Link>
                  <Link 
                    href="/settings" 
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <Settings size={16} />
                    <span className="text-sm">Settings</span>
                  </Link>
                  {/* <Link 
                    href="/help" 
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <HelpCircle size={16} />
                    <span className="text-sm">Help & Support</span>
                  </Link> */}
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
  )
}