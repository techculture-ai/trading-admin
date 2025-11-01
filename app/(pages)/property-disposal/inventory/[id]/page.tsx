'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, BarChart3, Home, MapPin, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, Share2, Printer, Edit, TrendingUp, Users, Building } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface InventoryDetails {
  id: string
  projectName: string
  projectLocation: string
  totalUnits: number
  available: number
  sold: number
  reserved: number
  blocked: number
  availabilityPerc: string
  soldPerc: string
  priceRange: string
  projectStatus: string
  possession: string
  projectInfo: {
    developer: string
    approvalNumber: string
    reraNumber: string
    landArea: string
    totalFloors: number
    towers: number
    launchDate: string
    completionDate: string
  }
  unitTypes: {
    type: string
    total: number
    available: number
    sold: number
    reserved: number
    blocked: number
    area: string
    price: string
  }[]
  amenities: string[]
  specifications: {
    category: string
    details: string
  }[]
  floorPlans: {
    unitType: string
    area: string
    fileName: string
    uploadedDate: string
  }[]
  salesHistory: {
    month: string
    unitsSold: number
    revenue: string
    averagePrice: string
  }[]
  recentBookings: {
    date: string
    unitNo: string
    unitType: string
    customerName: string
    bookingAmount: string
    status: string
  }[]
  timeline: {
    date: string
    event: string
    details: string
    status: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function InventoryDetailsPage() {
  const router = useRouter()
  const params = useParams()
    const isLoading = usePageLoading(1000)
  // Mock data
  const [inventory] = useState<InventoryDetails>({
    id: 'INV-001',
    projectName: 'Gomti Nagar Housing Scheme',
    projectLocation: 'Sector 12, Gomti Nagar Extension, Lucknow - 226010',
    totalUnits: 150,
    available: 35,
    sold: 98,
    reserved: 12,
    blocked: 5,
    availabilityPerc: '23%',
    soldPerc: '65%',
    priceRange: '₹35-85 Lakhs',
    projectStatus: 'Under Construction',
    possession: 'December 2025',
    projectInfo: {
      developer: 'Urban Local Body - Lucknow',
      approvalNumber: 'ULB/LC/2023/045',
      reraNumber: 'UPRERAPRJ12345',
      landArea: '5.5 Acres',
      totalFloors: 15,
      towers: 3,
      launchDate: '2023-06-15',
      completionDate: '2025-12-31',
    },
    unitTypes: [
      {
        type: '2 BHK',
        total: 60,
        available: 15,
        sold: 40,
        reserved: 4,
        blocked: 1,
        area: '1050-1150 sq.ft',
        price: '₹35-42 Lakhs',
      },
      {
        type: '3 BHK',
        total: 70,
        available: 18,
        sold: 45,
        reserved: 6,
        blocked: 1,
        area: '1450-1650 sq.ft',
        price: '₹52-68 Lakhs',
      },
      {
        type: '4 BHK',
        total: 20,
        available: 2,
        sold: 13,
        reserved: 2,
        blocked: 3,
        area: '2050-2250 sq.ft',
        price: '₹75-85 Lakhs',
      },
    ],
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      'Children\'s Play Area',
      'Clubhouse',
      'Landscaped Gardens',
      'Jogging Track',
      '24x7 Security',
      'Power Backup',
      'Covered Parking',
      'Rainwater Harvesting',
      'Solar Panels',
      'Community Hall',
    ],
    specifications: [
      { category: 'Structure', details: 'RCC Framed Structure with Earthquake Resistant Design' },
      { category: 'Walls', details: '9" & 4.5" Brick Walls with Plaster Finish' },
      { category: 'Flooring', details: 'Vitrified Tiles in Living/Dining, Anti-skid tiles in Bathrooms' },
      { category: 'Kitchen', details: 'Granite Platform with Stainless Steel Sink' },
      { category: 'Bathroom', details: 'Premium Sanitary Fittings, Designer Tiles' },
      { category: 'Doors', details: 'Main Door - Teak Wood, Internal - Flush Doors' },
      { category: 'Windows', details: 'UPVC/Aluminum Windows with Mosquito Mesh' },
      { category: 'Electrical', details: 'Modular Switches, Concealed Copper Wiring' },
      { category: 'Painting', details: 'Acrylic Emulsion Paint for Internal Walls' },
    ],
    floorPlans: [
      {
        unitType: '2 BHK - Type A',
        area: '1050 sq.ft',
        fileName: '2BHK_TypeA_FloorPlan.pdf',
        uploadedDate: '2023-06-15',
      },
      {
        unitType: '2 BHK - Type B',
        area: '1150 sq.ft',
        fileName: '2BHK_TypeB_FloorPlan.pdf',
        uploadedDate: '2023-06-15',
      },
      {
        unitType: '3 BHK - Type A',
        area: '1450 sq.ft',
        fileName: '3BHK_TypeA_FloorPlan.pdf',
        uploadedDate: '2023-06-15',
      },
      {
        unitType: '3 BHK - Type B',
        area: '1650 sq.ft',
        fileName: '3BHK_TypeB_FloorPlan.pdf',
        uploadedDate: '2023-06-15',
      },
      {
        unitType: '4 BHK - Premium',
        area: '2050 sq.ft',
        fileName: '4BHK_Premium_FloorPlan.pdf',
        uploadedDate: '2023-06-15',
      },
    ],
    salesHistory: [
      { month: 'Oct 2024', unitsSold: 12, revenue: '₹6.2 Cr', averagePrice: '₹51.67 L' },
      { month: 'Sep 2024', unitsSold: 8, revenue: '₹4.1 Cr', averagePrice: '₹51.25 L' },
      { month: 'Aug 2024', unitsSold: 10, revenue: '₹5.3 Cr', averagePrice: '₹53.00 L' },
      { month: 'Jul 2024', unitsSold: 15, revenue: '₹7.8 Cr', averagePrice: '₹52.00 L' },
      { month: 'Jun 2024', unitsSold: 9, revenue: '₹4.7 Cr', averagePrice: '₹52.22 L' },
      { month: 'May 2024', unitsSold: 11, revenue: '₹5.9 Cr', averagePrice: '₹53.64 L' },
    ],
    recentBookings: [
      {
        date: '2024-10-28',
        unitNo: 'A-1205',
        unitType: '3 BHK',
        customerName: 'Rajesh Kumar',
        bookingAmount: '₹5,00,000',
        status: 'Confirmed',
      },
      {
        date: '2024-10-26',
        unitNo: 'B-0804',
        unitType: '2 BHK',
        customerName: 'Priya Sharma',
        bookingAmount: '₹3,50,000',
        status: 'Confirmed',
      },
      {
        date: '2024-10-25',
        unitNo: 'C-1501',
        unitType: '4 BHK',
        customerName: 'Amit Verma',
        bookingAmount: '₹7,50,000',
        status: 'Confirmed',
      },
      {
        date: '2024-10-23',
        unitNo: 'A-0903',
        unitType: '3 BHK',
        customerName: 'Neha Gupta',
        bookingAmount: '₹5,20,000',
        status: 'Pending',
      },
      {
        date: '2024-10-20',
        unitNo: 'B-1102',
        unitType: '2 BHK',
        customerName: 'Suresh Patel',
        bookingAmount: '₹3,60,000',
        status: 'Confirmed',
      },
    ],
    timeline: [
      {
        date: '2024-10-28',
        event: 'Unit Booking - A-1205',
        details: '3 BHK unit booked by Rajesh Kumar',
        status: 'Completed',
      },
      {
        date: '2024-10-15',
        event: 'Construction Milestone',
        details: 'Tower A - 12th Floor Slab Completed',
        status: 'Completed',
      },
      {
        date: '2024-10-01',
        event: 'Price Revision',
        details: 'Unit prices revised - 5% increase',
        status: 'Completed',
      },
      {
        date: '2024-09-20',
        event: 'Inventory Update',
        details: '10 units released for sale',
        status: 'Completed',
      },
      {
        date: '2024-09-01',
        event: 'Construction Milestone',
        details: 'Tower B - 10th Floor Slab Completed',
        status: 'Completed',
      },
      {
        date: '2023-06-15',
        event: 'Project Launch',
        details: 'Gomti Nagar Housing Scheme officially launched',
        status: 'Completed',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-28 14:30:00',
      action: 'Unit Booked',
      performedBy: 'Sales Officer - Priya Sharma',
      details: 'Unit A-1205 (3 BHK) booked for Rajesh Kumar',
    },
    {
      id: 'AL-002',
      timestamp: '2024-10-26 11:00:00',
      action: 'Unit Booked',
      performedBy: 'Sales Officer - Amit Singh',
      details: 'Unit B-0804 (2 BHK) booked for Priya Sharma',
    },
    {
      id: 'AL-003',
      timestamp: '2024-10-15 16:00:00',
      action: 'Inventory Updated',
      performedBy: 'Project Manager',
      details: 'Construction milestone updated - Tower A 12th floor',
    },
    {
      id: 'AL-004',
      timestamp: '2024-10-01 10:00:00',
      action: 'Price Updated',
      performedBy: 'Admin - techculture-ai',
      details: 'Unit prices revised by 5%',
    },
    {
      id: 'AL-005',
      timestamp: '2024-09-20 09:00:00',
      action: 'Inventory Released',
      performedBy: 'Admin - techculture-ai',
      details: '10 units released for sale',
    },
  ])

  const handleExport = () => {
    const content = `
INVENTORY DETAILS REPORT
========================

Project Name: ${inventory.projectName}
Project Location: ${inventory.projectLocation}
Project Status: ${inventory.projectStatus}

PROJECT INFORMATION
===================
Developer: ${inventory.projectInfo.developer}
Approval Number: ${inventory.projectInfo.approvalNumber}
RERA Number: ${inventory.projectInfo.reraNumber}
Land Area: ${inventory.projectInfo.landArea}
Total Floors: ${inventory.projectInfo.totalFloors}
Number of Towers: ${inventory.projectInfo.towers}
Launch Date: ${new Date(inventory.projectInfo.launchDate).toLocaleDateString('en-IN')}
Expected Completion: ${new Date(inventory.projectInfo.completionDate).toLocaleDateString('en-IN')}
Possession: ${inventory.possession}

INVENTORY STATUS
================
Total Units: ${inventory.totalUnits}
Available: ${inventory.available} (${inventory.availabilityPerc})
Sold: ${inventory.sold} (${inventory.soldPerc})
Reserved: ${inventory.reserved}
Blocked: ${inventory.blocked}
Price Range: ${inventory.priceRange}

UNIT TYPE BREAKDOWN
===================
${inventory.unitTypes.map(unit => `${unit.type}:
   Total: ${unit.total}
   Available: ${unit.available}
   Sold: ${unit.sold}
   Reserved: ${unit.reserved}
   Blocked: ${unit.blocked}
   Area: ${unit.area}
   Price: ${unit.price}`).join('\n\n')}

AMENITIES
=========
${inventory.amenities.join(', ')}

SPECIFICATIONS
==============
${inventory.specifications.map(spec => `${spec.category}: ${spec.details}`).join('\n')}

SALES HISTORY
=============
${inventory.salesHistory.map(sale => `${sale.month}: ${sale.unitsSold} units, Revenue: ${sale.revenue}, Avg Price: ${sale.averagePrice}`).join('\n')}

RECENT BOOKINGS
===============
${inventory.recentBookings.map(booking => `${booking.date} - Unit ${booking.unitNo} (${booking.unitType})
   Customer: ${booking.customerName}
   Booking Amount: ${booking.bookingAmount}
   Status: ${booking.status}`).join('\n\n')}

TIMELINE
========
${inventory.timeline.map(t => `${t.date} - ${t.event}\n   ${t.details}\n   Status: ${t.status}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Inventory_${inventory.projectName.replace(/\s+/g, '_')}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Construction':
        return 'bg-orange-100 text-orange-700'
      case 'Ready to Move':
        return 'bg-green-100 text-green-700'
      case 'Pre-Launch':
        return 'bg-blue-100 text-blue-700'
      case 'Completed':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const totalRevenue = inventory.salesHistory.reduce((sum, sale) => {
    const revenue = parseFloat(sale.revenue.replace(/[^0-9.]/g, ''))
    return sum + revenue
  }, 0)

  const totalUnitsSold = inventory.salesHistory.reduce((sum, sale) => sum + sale.unitsSold, 0)

  if (isLoading) {
    return <DetailsSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{inventory.projectName}</h1>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <MapPin size={14} className="mr-1" />
              {inventory.projectLocation}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(inventory.projectStatus)}`}>
            {inventory.projectStatus}
          </span>
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm mb-2 text-orange-100">Project Status</p>
            <h2 className="text-4xl font-bold">{inventory.projectStatus}</h2>
            <p className="text-sm mt-2 text-orange-100">
              {inventory.totalUnits} Total Units • {inventory.available} Available • {inventory.soldPerc} Sold
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Building size={40} className="text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Units</p>
              <h3 className="text-2xl font-bold text-gray-900">{inventory.totalUnits}</h3>
              <p className="text-xs text-gray-500 mt-2">All configurations</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Home size={24} className="text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-green-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Available</p>
              <h3 className="text-2xl font-bold text-green-600">{inventory.available}</h3>
              <p className="text-xs text-gray-500 mt-2">{inventory.availabilityPerc} of total</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Sold</p>
              <h3 className="text-2xl font-bold text-blue-600">{inventory.sold}</h3>
              <p className="text-xs text-gray-500 mt-2">{inventory.soldPerc} of total</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-orange-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Reserved</p>
              <h3 className="text-2xl font-bold text-orange-600">{inventory.reserved}</h3>
              <p className="text-xs text-gray-500 mt-2">Booked units</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 border-l-4 border-l-red-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Blocked</p>
              <h3 className="text-2xl font-bold text-red-600">{inventory.blocked}</h3>
              <p className="text-xs text-gray-500 mt-2">On hold</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Project Information
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Developer</p>
            <p className="text-sm font-medium text-gray-900">{inventory.projectInfo.developer}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Approval Number</p>
            <p className="text-sm font-medium text-gray-900">{inventory.projectInfo.approvalNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">RERA Number</p>
            <p className="text-sm font-medium text-blue-600">{inventory.projectInfo.reraNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Land Area</p>
            <p className="text-sm font-medium text-gray-900">{inventory.projectInfo.landArea}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Floors</p>
            <p className="text-sm font-medium text-gray-900">{inventory.projectInfo.totalFloors} Floors</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Number of Towers</p>
            <p className="text-sm font-medium text-gray-900">{inventory.projectInfo.towers} Towers</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Launch Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(inventory.projectInfo.launchDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Expected Completion</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(inventory.projectInfo.completionDate).toLocaleDateString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Possession</p>
            <p className="text-sm font-medium text-green-600">{inventory.possession}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Price Range</p>
            <p className="text-lg font-bold text-orange-600">{inventory.priceRange}</p>
          </div>
        </div>
      </div>

      {/* Unit Types */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Home size={20} className="mr-2" />
            Unit Type Details ({inventory.unitTypes.length} Types)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reserved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blocked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.unitTypes.map((unit, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{unit.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{unit.available}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{unit.sold}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{unit.reserved}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">{unit.blocked}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{unit.area}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">{unit.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(unit.sold / unit.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{((unit.sold / unit.total) * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales History */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp size={20} className="mr-2" />
              Sales History (Last 6 Months)
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {inventory.salesHistory.map((sale, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{sale.month}</p>
                    <p className="text-xs text-gray-500 mt-1">{sale.unitsSold} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">{sale.revenue}</p>
                    <p className="text-xs text-gray-500 mt-1">Avg: {sale.averagePrice}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Total Units Sold</p>
                  <p className="text-2xl font-bold text-blue-600">{totalUnitsSold}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toFixed(1)} Cr</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle size={20} className="mr-2" />
              Recent Bookings
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {inventory.recentBookings.map((booking, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:border-orange-500 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Unit {booking.unitNo}</p>
                      <p className="text-xs text-gray-500">{booking.unitType}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{booking.customerName}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{new Date(booking.date).toLocaleDateString('en-IN')}</span>
                    <span className="font-medium text-green-600">{booking.bookingAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Amenities & Facilities</h3>
        <div className="grid grid-cols-4 gap-4">
          {inventory.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Specifications</h3>
        <div className="grid grid-cols-1 gap-3">
          {inventory.specifications.map((spec, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className="w-1/4">
                <p className="text-sm font-medium text-gray-900">{spec.category}</p>
              </div>
              <div className="w-3/4">
                <p className="text-sm text-gray-700">{spec.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floor Plans */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Floor Plans</h3>
        <div className="grid grid-cols-1 gap-3">
          {inventory.floorPlans.map((plan, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Home size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{plan.unitType}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {plan.area} • Uploaded: {new Date(plan.uploadedDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                <Download size={16} />
                <span className="text-sm">Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Project Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {inventory.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== inventory.timeline.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        <Calendar size={12} className="inline mr-1" />
                        {new Date(event.date).toLocaleDateString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Activity Log
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {auditLogs.map((log, index) => (
              <div key={log.id} className="flex items-start space-x-4 relative">
                {index !== auditLogs.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        By {log.performedBy} • {new Date(log.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-5 gap-6 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-2">Total Units</p>
            <p className="text-lg font-bold text-gray-900">{inventory.totalUnits}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Available</p>
            <p className="text-lg font-bold text-green-600">{inventory.available}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Sold</p>
            <p className="text-lg font-bold text-blue-600">{inventory.sold}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Sold %</p>
            <p className="text-lg font-bold text-orange-600">{inventory.soldPerc}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className="text-sm font-bold text-orange-600">{inventory.projectStatus}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button 
          onClick={handleExport}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Download Report</span>
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Edit size={20} />
          <span>Edit Inventory</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <BarChart3 size={20} />
          <span>View Analytics</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share</span>
        </button>
        <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print</span>
        </button>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Inventory</span>
        </button>
      </div>
    </div>
  )
}