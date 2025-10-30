'use client'

import { useState } from 'react'
import { User, Bell, Lock, Palette, Globe, Database, Shield, Mail, Phone, MapPin, Building } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'preferences', name: 'Preferences', icon: Globe },
    { id: 'data', name: 'Data & Privacy', icon: Database },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-lg border border-gray-200 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={20} />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'preferences' && <PreferencesSettings />}
          {activeTab === 'data' && <DataPrivacySettings />}
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Update your personal information</p>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          PS
        </div>
        <div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium">
            Change Photo
          </button>
          <button className="ml-3 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Remove
          </button>
          <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 2MB</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            defaultValue="Prabhu"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="Zz"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            defaultValue="prabhuzz00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              defaultValue="prabhuzz00@example.com"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              defaultValue="+91 9876543210"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
          <input
            type="text"
            defaultValue="System Administrator"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <div className="relative">
            <Building size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Administration</option>
              <option>Engineering</option>
              <option>Accounts</option>
              <option>Legal</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              defaultValue="Lucknow, Uttar Pradesh"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          rows={4}
          defaultValue="System Administrator at Urban Local Bodies, Uttar Pradesh"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Save Changes
        </button>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Notification Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Manage how you receive notifications</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Email Notifications</p>
            <p className="text-sm text-gray-600">Receive notifications via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">SMS Notifications</p>
            <p className="text-sm text-gray-600">Receive notifications via SMS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Push Notifications</p>
            <p className="text-sm text-gray-600">Receive push notifications in browser</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-semibold text-gray-900 mb-4">Notification Types</h3>
        <div className="space-y-3">
          {['Project Updates', 'RTI Applications', 'Payment Approvals', 'Document Uploads', 'System Alerts'].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-gray-700">{item}</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t">
        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Save Preferences
        </button>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your account security</p>
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Change Password</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Update Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="pt-6 border-t">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-4">Active Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Windows PC - Chrome</p>
              <p className="text-sm text-gray-600">Lucknow, India • Last active: Now</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Current</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">iPhone - Safari</p>
              <p className="text-sm text-gray-600">Lucknow, India • Last active: 2 hours ago</p>
            </div>
            <button className="text-red-600 hover:text-red-700 text-sm font-medium">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Appearance Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Customize how the application looks</p>
      </div>

      {/* Theme */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-orange-500 rounded-lg p-4 cursor-pointer">
            <div className="w-full h-24 bg-white rounded mb-2 border"></div>
            <p className="text-center font-medium">Light</p>
          </div>
          <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400">
            <div className="w-full h-24 bg-gray-900 rounded mb-2"></div>
            <p className="text-center font-medium">Dark</p>
          </div>
          <div className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400">
            <div className="w-full h-24 bg-gradient-to-br from-white to-gray-900 rounded mb-2"></div>
            <p className="text-center font-medium">Auto</p>
          </div>
        </div>
      </div>

      {/* Primary Color */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-4">Primary Color</h3>
        <div className="grid grid-cols-6 gap-4">
          {['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'].map((color) => (
            <div key={color} className={`w-12 h-12 ${color} rounded-lg cursor-pointer hover:scale-110 transition-transform`}></div>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-4">Font Size</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Small</span>
          <input type="range" min="12" max="18" defaultValue="14" className="flex-1" />
          <span className="text-sm text-gray-600">Large</span>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t">
        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Apply Changes
        </button>
      </div>
    </div>
  )
}

function PreferencesSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
        <p className="text-sm text-gray-600 mt-1">Customize your experience</p>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>English</option>
          <option>हिंदी (Hindi)</option>
          <option>मराठी (Marathi)</option>
        </select>
      </div>

      {/* Time Zone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>Asia/Kolkata (IST)</option>
          <option>UTC</option>
          <option>America/New_York (EST)</option>
        </select>
      </div>

      {/* Date Format */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>DD/MM/YYYY</option>
          <option>MM/DD/YYYY</option>
          <option>YYYY-MM-DD</option>
        </select>
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>₹ INR (Indian Rupee)</option>
          <option>$ USD (US Dollar)</option>
          <option>€ EUR (Euro)</option>
        </select>
      </div>

      <div className="flex justify-end pt-6 border-t">
        <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Save Preferences
        </button>
      </div>
    </div>
  )
}

function DataPrivacySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Data & Privacy</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your data and privacy settings</p>
      </div>

      {/* Data Export */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">Export Your Data</h3>
        <p className="text-sm text-gray-600 mb-4">Download a copy of your data</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Request Export
        </button>
      </div>

      {/* Data Deletion */}
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <h3 className="font-semibold text-gray-900 mb-2">Delete Account</h3>
        <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all associated data</p>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete Account
        </button>
      </div>

      {/* Privacy Options */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-gray-900 mb-4">Privacy Options</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show my profile to other users</p>
              <p className="text-sm text-gray-600">Allow other users to see your profile</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Analytics and usage data</p>
              <p className="text-sm text-gray-600">Help us improve by sharing usage data</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
          </div>
        </div>
      </div>
    </div>
  )
}