'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Home, MapPin, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, Share2, Printer, Edit, TrendingUp, User, Building, Key, FileText } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface PropertyDetails {
  id: string
  unitNo: string
  projectName: string
  projectId: string
  type: string
  carpetArea: string
  builtUpArea: string
  superBuiltUpArea: string
  floor: string
  facing: string
  price: string
  status: 'Available' | 'Sold' | 'Reserved' | 'Blocked' | 'Under Construction'
  possessionDate: string
  towerBlock: string
  parkingSlots: number
  balconies: number
  bathrooms: number
  bedrooms: number
  isCornerUnit: boolean
  hasGardenView: boolean
  registryNumber: string
  khataNumber: string
  propertyInfo: {
    createdDate: string
    createdBy: string
    lastModified: string
    modifiedBy: string
    ageInDays: number
  }
  locationDetails: {
    address: string
    landmark: string
    pincode: string
    city: string
    state: string
  }
  specifications: {
    category: string
    details: string
  }[]
  amenities: string[]
  documents: {
    name: string
    type: string
    uploadedDate: string
    uploadedBy: string
    size: string
  }[]
  priceBreakdown: {
    component: string
    amount: string
  }[]
  timeline: {
    date: string
    event: string
    details: string
    performedBy: string
    status: string
  }[]
  bookingHistory: {
    date: string
    customerName: string
    bookingAmount: string
    status: string
    remarks: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function PropertyDetailsPage() {
  const router = useRouter()
  const params = useParams()
    const isLoading = usePageLoading(1000)
  const [property] = useState<PropertyDetails>({
    id: 'PROP-2024-001',
    unitNo: 'A-101',
    projectName: 'Gomti Nagar Housing Scheme',
    projectId: 'PROJ-001',
    type: '2BHK',
    carpetArea: '950 sq.ft',
    builtUpArea: '1150 sq.ft',
    superBuiltUpArea: '1250 sq.ft',
    floor: '1st Floor',
    facing: 'East',
    price: '₹45,00,000',
    status: 'Sold',
    possessionDate: '2024-12-30',
    towerBlock: 'Tower A',
    parkingSlots: 1,
    balconies: 2,
    bathrooms: 2,
    bedrooms: 2,
    isCornerUnit: false,
    hasGardenView: true,
    registryNumber: 'REG/2024/001',
    khataNumber: 'KH-12345',
    propertyInfo: {
      createdDate: '2023-06-15',
      createdBy: 'Admin - techculture-ai',
      lastModified: '2024-10-28',
      modifiedBy: 'Sales Officer - Priya Sharma',
      ageInDays: 503,
    },
    locationDetails: {
      address: 'Tower A, Unit 101, Gomti Nagar Housing Scheme',
      landmark: 'Near Phoenix United Mall',
      pincode: '226010',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
    },
    specifications: [
      { category: 'Structure', details: 'RCC Framed Structure with Earthquake Resistant Design' },
      { category: 'Walls', details: '9" Brick Walls with Premium Plaster Finish' },
      { category: 'Flooring - Living/Dining', details: 'Vitrified Tiles 24x24 inches' },
      { category: 'Flooring - Bedrooms', details: 'Laminated Wooden Flooring' },
      { category: 'Flooring - Kitchen', details: 'Anti-skid Ceramic Tiles' },
      { category: 'Flooring - Bathrooms', details: 'Anti-skid Ceramic Tiles with Dado up to 7 feet' },
      { category: 'Kitchen', details: 'Granite Platform with Stainless Steel Sink and Wall Tiles' },
      { category: 'Bathroom Fittings', details: 'Premium CP Fittings, Designer Sanitaryware' },
      { category: 'Main Door', details: 'Teak Wood Frame with Polished Finish' },
      { category: 'Internal Doors', details: 'Flush Doors with Premium Paint' },
      { category: 'Windows', details: 'UPVC Windows with Mosquito Mesh' },
      { category: 'Electrical', details: 'Modular Switches, Concealed Copper Wiring' },
      { category: 'Painting - Internal', details: 'Premium Acrylic Emulsion Paint' },
      { category: 'Painting - External', details: 'Weather-proof Exterior Paint' },
    ],
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      'Children\'s Play Area',
      'Clubhouse',
      'Landscaped Gardens',
      'Jogging Track',
      '24x7 Security with CCTV',
      'Power Backup',
      'Covered Parking',
      'Rainwater Harvesting',
      'Solar Panels',
      'Community Hall',
      'Indoor Games Room',
      'Yoga/Meditation Area',
      'Multipurpose Court',
    ],
    documents: [
      {
        name: 'Unit_Floor_Plan.pdf',
        type: 'Floor Plan',
        uploadedDate: '2023-06-15',
        uploadedBy: 'Admin - techculture-ai',
        size: '2.4 MB',
      },
      {
        name: 'Sale_Agreement.pdf',
        type: 'Legal Document',
        uploadedDate: '2024-08-15',
        uploadedBy: 'Legal Officer',
        size: '1.8 MB',
      },
      {
        name: 'Registry_Documents.pdf',
        type: 'Registry',
        uploadedDate: '2024-08-20',
        uploadedBy: 'Registry Officer',
        size: '3.2 MB',
      },
      {
        name: 'Payment_Schedule.pdf',
        type: 'Financial',
        uploadedDate: '2024-08-15',
        uploadedBy: 'Accounts Department',
        size: '856 KB',
      },
      {
        name: 'Property_Photos.zip',
        type: 'Images',
        uploadedDate: '2024-10-01',
        uploadedBy: 'Marketing Team',
        size: '15.6 MB',
      },
    ],
    priceBreakdown: [
      { component: 'Base Price (950 sq.ft @ ₹4,200/sq.ft)', amount: '₹39,90,000' },
      { component: 'Floor Rise Charge (1st Floor)', amount: '₹0' },
      { component: 'Garden View Premium', amount: '₹1,42,500' },
      { component: 'Parking Charges (1 slot)', amount: '₹2,00,000' },
      { component: 'Club Membership', amount: '₹50,000' },
      { component: 'Development Charges', amount: '₹75,000' },
      { component: 'Subtotal', amount: '₹44,57,500' },
      { component: 'GST (5%)', amount: '₹2,22,875' },
      { component: 'Total Price', amount: '₹46,80,375' },
      { component: 'Discount (Early Bird - 4%)', amount: '-₹1,80,375' },
      { component: 'Final Price', amount: '₹45,00,000' },
    ],
    timeline: [
      {
        date: '2024-10-28',
        event: 'Unit Sold',
        details: 'Unit sold to Rajesh Kumar Singh. Registry completed.',
        performedBy: 'Sales Officer - Priya Sharma',
        status: 'Completed',
      },
      {
        date: '2024-08-20',
        event: 'Registry Completed',
        details: 'Registry documentation completed and registered',
        performedBy: 'Registry Officer',
        status: 'Completed',
      },
      {
        date: '2024-08-15',
        event: 'Sale Agreement Signed',
        details: 'Sale agreement signed between buyer and developer',
        performedBy: 'Legal Officer',
        status: 'Completed',
      },
      {
        date: '2024-08-10',
        event: 'Unit Booked',
        details: 'Unit booked by Rajesh Kumar Singh with booking amount',
        performedBy: 'Sales Officer - Priya Sharma',
        status: 'Completed',
      },
      {
        date: '2024-07-15',
        event: 'Construction Completed',
        details: 'Unit construction completed and ready for handover',
        performedBy: 'Project Manager',
        status: 'Completed',
      },
      {
        date: '2023-06-15',
        event: 'Unit Launched',
        details: 'Unit added to inventory and made available for sale',
        performedBy: 'Admin - techculture-ai',
        status: 'Completed',
      },
    ],
    bookingHistory: [
      {
        date: '2024-08-10',
        customerName: 'Rajesh Kumar Singh',
        bookingAmount: '₹5,00,000',
        status: 'Confirmed - Sold',
        remarks: 'Early bird discount applied. Full payment completed.',
      },
      {
        date: '2024-06-20',
        customerName: 'Amit Verma',
        bookingAmount: '₹3,00,000',
        status: 'Cancelled',
        remarks: 'Customer cancelled booking due to personal reasons. Amount refunded.',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-10-28 14:30:00',
      action: 'Status Updated',
      performedBy: 'Sales Officer - Priya Sharma',
      details: 'Property status changed from Reserved to Sold',
    },
    {
      id: 'AL-002',
      timestamp: '2024-08-20 11:00:00',
      action: 'Registry Completed',
      performedBy: 'Registry Officer',
      details: 'Registry documents uploaded and verified',
    },
    {
      id: 'AL-003',
      timestamp: '2024-08-15 16:00:00',
      action: 'Sale Agreement Uploaded',
      performedBy: 'Legal Officer',
      details: 'Sale agreement document uploaded to system',
    },
    {
      id: 'AL-004',
      timestamp: '2024-08-10 10:00:00',
      action: 'Unit Booked',
      performedBy: 'Sales Officer - Priya Sharma',
      details: 'Unit booked for Rajesh Kumar Singh',
    },
    {
      id: 'AL-005',
      timestamp: '2024-07-15 09:00:00',
      action: 'Construction Completed',
      performedBy: 'Project Manager',
      details: 'Unit construction marked as completed',
    },
    {
      id: 'AL-006',
      timestamp: '2023-06-15 10:00:00',
      action: 'Property Created',
      performedBy: 'Admin - techculture-ai',
      details: 'Property added to master inventory',
    },
  ])

  const handleExport = () => {
    const content = `
PROPERTY DETAILS REPORT
=======================

Property ID: ${property.id}
Unit Number: ${property.unitNo}
Project: ${property.projectName}
Status: ${property.status}

BASIC INFORMATION
=================
Type: ${property.type}
Tower/Block: ${property.towerBlock}
Floor: ${property.floor}
Facing: ${property.facing}
Carpet Area: ${property.carpetArea}
Built-up Area: ${property.builtUpArea}
Super Built-up Area: ${property.superBuiltUpArea}

UNIT CONFIGURATION
==================
Bedrooms: ${property.bedrooms}
Bathrooms: ${property.bathrooms}
Balconies: ${property.balconies}
Parking Slots: ${property.parkingSlots}
Corner Unit: ${property.isCornerUnit ? 'Yes' : 'No'}
Garden View: ${property.hasGardenView ? 'Yes' : 'No'}

LOCATION DETAILS
================
Address: ${property.locationDetails.address}
Landmark: ${property.locationDetails.landmark}
City: ${property.locationDetails.city}
State: ${property.locationDetails.state}
Pincode: ${property.locationDetails.pincode}

PRICING INFORMATION
===================
${property.priceBreakdown.map(item => `${item.component}: ${item.amount}`).join('\n')}

LEGAL INFORMATION
=================
Registry Number: ${property.registryNumber}
Khata Number: ${property.khataNumber}
Possession Date: ${new Date(property.possessionDate).toLocaleDateString('en-IN')}

SPECIFICATIONS
==============
${property.specifications.map(spec => `${spec.category}: ${spec.details}`).join('\n')}

AMENITIES
=========
${property.amenities.join(', ')}

DOCUMENTS
=========
${property.documents.map(doc => `${doc.name} (${doc.type}) - ${doc.size}\n   Uploaded: ${doc.uploadedDate} by ${doc.uploadedBy}`).join('\n\n')}

BOOKING HISTORY
===============
${property.bookingHistory.map(booking => `${booking.date} - ${booking.customerName}\n   Booking Amount: ${booking.bookingAmount}\n   Status: ${booking.status}\n   Remarks: ${booking.remarks}`).join('\n\n')}

TIMELINE
========
${property.timeline.map(t => `${t.date} - ${t.event}\n   ${t.details}\n   By: ${t.performedBy}\n   Status: ${t.status}`).join('\n\n')}

AUDIT TRAIL
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Property_${property.unitNo.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700'
      case 'Sold':
        return 'bg-blue-100 text-blue-700'
      case 'Reserved':
        return 'bg-orange-100 text-orange-700'
      case 'Blocked':
        return 'bg-red-100 text-red-700'
      case 'Under Construction':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Sold':
        return <Key size={40} className="text-blue-600" />
      case 'Reserved':
        return <Clock size={40} className="text-orange-600" />
      case 'Blocked':
        return <AlertCircle size={40} className="text-red-600" />
      case 'Under Construction':
        return <Building size={40} className="text-gray-600" />
      default:
        return <Home size={40} className="text-gray-600" />
    }
  }
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
            <h1 className="text-2xl font-bold text-gray-900">Unit {property.unitNo}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {property.projectName} • {property.type}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(property.status)}`}>
            {property.status}
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
      <div className={`rounded-lg p-8 text-white ${
        property.status === 'Available' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        property.status === 'Sold' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        property.status === 'Reserved' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        property.status === 'Blocked' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        'bg-gradient-to-r from-gray-500 to-gray-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              property.status === 'Available' ? 'text-green-100' :
              property.status === 'Sold' ? 'text-blue-100' :
              property.status === 'Reserved' ? 'text-orange-100' :
              property.status === 'Blocked' ? 'text-red-100' :
              'text-gray-100'
            }`}>
              Property Status
            </p>
            <h2 className="text-4xl font-bold">{property.status}</h2>
            <p className={`text-sm mt-2 ${
              property.status === 'Available' ? 'text-green-100' :
              property.status === 'Sold' ? 'text-blue-100' :
              property.status === 'Reserved' ? 'text-orange-100' :
              property.status === 'Blocked' ? 'text-red-100' :
              'text-gray-100'
            }`}>
              {property.type} • {property.carpetArea} • {property.floor} • {property.facing} Facing
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(property.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Price</p>
              <h3 className="text-2xl font-bold text-gray-900">{property.price}</h3>
              <p className="text-xs text-gray-500 mt-2">Final selling price</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Carpet Area</p>
              <h3 className="text-2xl font-bold text-blue-600">{property.carpetArea}</h3>
              <p className="text-xs text-gray-500 mt-2">Usable area</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Home size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Configuration</p>
              <h3 className="text-2xl font-bold text-orange-600">{property.type}</h3>
              <p className="text-xs text-gray-500 mt-2">{property.bedrooms} Bed • {property.bathrooms} Bath</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Building size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Possession</p>
              <h3 className="text-sm font-bold text-purple-600">
                {new Date(property.possessionDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </h3>
              <p className="text-xs text-gray-500 mt-2">Expected date</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Home size={20} className="mr-2" />
          Basic Information
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Property ID</p>
            <p className="text-sm font-medium text-gray-900">{property.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Unit Number</p>
            <p className="text-sm font-medium text-gray-900">{property.unitNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Project</p>
            <p className="text-sm font-medium text-gray-900">{property.projectName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Tower/Block</p>
            <p className="text-sm font-medium text-gray-900">{property.towerBlock}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Type</p>
            <p className="text-sm font-medium text-gray-900">{property.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Floor</p>
            <p className="text-sm font-medium text-gray-900">{property.floor}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Facing</p>
            <p className="text-sm font-medium text-gray-900">{property.facing}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(property.status)}`}>
              {property.status}
            </span>
          </div>
        </div>
      </div>

      {/* Area & Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Area Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">Carpet Area</span>
              <span className="text-lg font-bold text-blue-600">{property.carpetArea}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Built-up Area</span>
              <span className="text-sm font-medium text-gray-900">{property.builtUpArea}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Super Built-up Area</span>
              <span className="text-sm font-medium text-gray-900">{property.superBuiltUpArea}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuration</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Bedrooms</span>
              <span className="text-lg font-bold text-orange-600">{property.bedrooms}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Bathrooms</span>
              <span className="text-lg font-bold text-orange-600">{property.bathrooms}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Balconies</span>
              <span className="text-sm font-medium text-gray-900">{property.balconies}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Parking Slots</span>
              <span className="text-sm font-medium text-gray-900">{property.parkingSlots}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <MapPin size={20} className="mr-2" />
          Location Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{property.locationDetails.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Landmark</p>
            <p className="text-sm font-medium text-gray-900">{property.locationDetails.landmark}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">City</p>
            <p className="text-sm font-medium text-gray-900">{property.locationDetails.city}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">State</p>
            <p className="text-sm font-medium text-gray-900">{property.locationDetails.state}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Pincode</p>
            <p className="text-sm font-medium text-gray-900">{property.locationDetails.pincode}</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Special Features</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border-2 ${property.isCornerUnit ? 'bg-orange-50 border-orange-300' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-sm font-medium text-gray-900">Corner Unit</p>
            <p className="text-xs text-gray-600 mt-1">{property.isCornerUnit ? 'Yes - Premium location' : 'No'}</p>
          </div>
          <div className={`p-4 rounded-lg border-2 ${property.hasGardenView ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-sm font-medium text-gray-900">Garden View</p>
            <p className="text-xs text-gray-600 mt-1">{property.hasGardenView ? 'Yes - Beautiful garden view' : 'No'}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
            <p className="text-sm font-medium text-gray-900">{property.facing} Facing</p>
            <p className="text-xs text-gray-600 mt-1">Natural sunlight</p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <DollarSign size={20} className="mr-2" />
            Price Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {property.priceBreakdown.map((item, index) => (
                <tr key={index} className={
                  item.component.includes('Final Price') ? 'bg-green-50 border-t-2 border-green-200' :
                  item.component.includes('Total') || item.component.includes('Subtotal') ? 'bg-gray-50 font-semibold' :
                  ''
                }>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.component}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    {item.component.includes('Final Price') ? (
                      <span className="text-2xl font-bold text-green-600">{item.amount}</span>
                    ) : (
                      item.amount
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FileText size={20} className="mr-2" />
          Legal Information
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">Registry Number</p>
            <p className="text-sm font-bold text-blue-900">{property.registryNumber || 'Not Registered'}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-700 mb-2">Khata Number</p>
            <p className="text-sm font-bold text-green-900">{property.khataNumber}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-700 mb-2">Possession Date</p>
            <p className="text-sm font-bold text-purple-900">
              {new Date(property.possessionDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Specifications</h3>
        <div className="grid grid-cols-1 gap-3">
          {property.specifications.map((spec, index) => (
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

      {/* Amenities */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Amenities</h3>
        <div className="grid grid-cols-4 gap-4">
          {property.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText size={20} className="mr-2" />
            Documents ({property.documents.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {property.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.type} • {doc.size} • Uploaded: {new Date(doc.uploadedDate).toLocaleDateString('en-IN')} by {doc.uploadedBy}
                  </p>
                </div>
              </div>
              <button className="ml-4 text-orange-600 hover:text-orange-700">
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking History */}
      {property.bookingHistory.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User size={20} className="mr-2" />
              Booking History
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {property.bookingHistory.map((booking, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{booking.customerName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(booking.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{booking.bookingAmount}</p>
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full mt-1 ${
                        booking.status.includes('Confirmed') || booking.status.includes('Sold') ? 'bg-green-100 text-green-700' :
                        booking.status.includes('Cancelled') ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{booking.remarks}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock size={20} className="mr-2" />
            Property Timeline
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {property.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {index !== property.timeline.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-gray-900">{event.event}</p>
                  <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    <Calendar size={12} className="inline mr-1" />
                    {new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} • By {event.performedBy}
                  </p>
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
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    By {log.performedBy} • {new Date(log.timestamp).toLocaleString('en-IN')}
                  </p>
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
            <p className="text-xs text-gray-600 mb-2">Unit Number</p>
            <p className="text-lg font-bold text-gray-900">{property.unitNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Type</p>
            <p className="text-lg font-bold text-orange-600">{property.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Area</p>
            <p className="text-lg font-bold text-blue-600">{property.carpetArea}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Price</p>
            <p className="text-lg font-bold text-green-600">{property.price}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              property.status === 'Available' ? 'text-green-600' :
              property.status === 'Sold' ? 'text-blue-600' :
              property.status === 'Reserved' ? 'text-orange-600' :
              property.status === 'Blocked' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {property.status}
            </p>
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
          <span>Edit Property</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <TrendingUp size={20} />
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
          <span>Back to Properties</span>
        </button>
      </div>
    </div>
  )
}     