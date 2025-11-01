'use client'

import { useEffect, useRef } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import GlobalLoader from '@/components/GlobalLoader'
import ProgressLoader from '@/components/ProgressLoader'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const notificationRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        // Close notifications
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        // Close user menu
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <ProgressLoader />
          {children}
        </main>
      </div>
    </div>
  )
}