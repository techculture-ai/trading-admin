'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, MapPin, User, FileText, DollarSign, Calendar, Building, Navigation, Ruler, CheckCircle, Clock, AlertCircle, File, Phone, Mail, Share2, Printer } from 'lucide-react'
import { DetailsSkeleton } from '@/components/SkeletonLoader'
import { usePageLoading } from '@/hooks/usePageLoading'

interface ParcelDetails {
  id: string
  surveyNo: string
  owner: string
  area: string
  location: string
  status: 'Acquired' | 'In Progress' | 'Pending'
  compensation: string
  date: string
  ownerContact: string
  documents: string[]
  coordinates: string
  ownerDetails: {
    name: string
    address: string
    contact: string
    email: string
    aadharNo: string
    panNo: string
  }
  parcelInfo: {
    khataNo: string
    plotNo: string
    village: string
    district: string
    state: string
    pincode: string
    zone: string
    landUse: string
    soilType: string
  }
  measurements: {
    totalArea: string
    usableArea: string
    perimeter: string
    shape: string
    boundaries: {
      north: string
      south: string
      east: string
      west: string
    }
  }
  acquisitionDetails: {
    acquisitionDate: string
    purpose: string
    authority: string
    approvedBy: string
    marketValue: string
    assessedValue: string
    totalCompensation: string
    paymentStatus: string
  }
  legalDetails: {
    registrationNo: string
    registrationDate: string
    previousOwner: string
    encumbrances: string
    legalStatus: string
  }
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function ParcelRegistryDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const isLoading = usePageLoading(1000)
  // Mock data - in real app, fetch based on params.id
  const [parcel] = useState<ParcelDetails>({
    id: 'PAR-001',
    surveyNo: 'SV-2024-001',
    owner: 'Ram Kumar Singh',
    area: '2.5 acres',
    location: 'Gomti Nagar, Lucknow',
    status: 'Acquired',
    compensation: '₹45,00,000',
    date: '15 Jan 2024',
    ownerContact: '+91 98765 43210',
    documents: ['Title Deed', 'Survey Report', 'NOC', 'Tax Receipt', 'Encumbrance Certificate'],
    coordinates: '26.8467° N, 80.9462° E',
    ownerDetails: {
      name: 'Ram Kumar Singh',
      address: 'House No. 123, Village Gomti Nagar, Lucknow - 226010',
      contact: '+91 98765 43210',
      email: 'ramkumar@email.com',
      aadharNo: 'XXXX-XXXX-1234',
      panNo: 'ABCDE1234F',
    },
    parcelInfo: {
      khataNo: 'KH-456',
      plotNo: 'PLOT-789',
      village: 'Gomti Nagar',
      district: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226010',
      zone: 'Zone A (Residential)',
      landUse: 'Residential',
      soilType: 'Alluvial',
    },
    measurements: {
      totalArea: '2.5 acres (10,117.5 sq meters)',
      usableArea: '2.4 acres (9,712.8 sq meters)',
      perimeter: '625 meters',
      shape: 'Rectangular',
      boundaries: {
        north: 'Property of Suresh Kumar (PAR-150)',
        south: 'Main Road (NH-27)',
        east: 'Canal',
        west: 'Property of Geeta Devi (PAR-146)',
      }
    },
    acquisitionDetails: {
      acquisitionDate: '15 Jan 2024',
      purpose: 'Infrastructure Development - Metro Extension',
      authority: 'Lucknow Development Authority',
      approvedBy: 'Chief Land Acquisition Officer',
      marketValue: '₹40,00,000',
      assessedValue: '₹42,00,000',
      totalCompensation: '₹55,00,000',
      paymentStatus: 'Paid',
    },
    legalDetails: {
      registrationNo: 'REG/2024/001234',
      registrationDate: '10 Jan 2024',
      previousOwner: 'Mohan Lal Singh',
      encumbrances: 'None',
      legalStatus: 'Clear Title',
    }
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-10 09:00:00',
      action: 'Parcel Registered',
      performedBy: 'Land Records Officer',
      details: 'New parcel added to registry system',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-10 14:30:00',
      action: 'Survey Completed',
      performedBy: 'Survey Team',
      details: 'Land survey completed and measurements recorded',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-12 11:00:00',
      action: 'Valuation Done',
      performedBy: 'Valuation Officer',
      details: 'Property valuation assessed at ₹42,00,000',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-13 10:30:00',
      action: 'Documents Verified',
      performedBy: 'Legal Officer',
      details: 'All property documents verified and approved',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-15 09:00:00',
      action: 'Acquisition Completed',
      performedBy: 'Land Acquisition Officer',
      details: 'Land acquisition process completed successfully',
    },
    {
      id: 'AL-006',
      timestamp: '2024-01-15 15:00:00',
      action: 'Compensation Paid',
      performedBy: 'Treasury Officer',
      details: 'Total compensation of ₹55,00,000 disbursed to owner',
    },
  ])

  const handleExport = () => {
    const content = `
Parcel Registry Details Report
================================

Parcel ID: ${parcel.id}
Survey No: ${parcel.surveyNo}
Status: ${parcel.status}

Owner Details
=============
Name: ${parcel.ownerDetails.name}
Address: ${parcel.ownerDetails.address}
Contact: ${parcel.ownerDetails.contact}
Email: ${parcel.ownerDetails.email}
Aadhar: ${parcel.ownerDetails.aadharNo}
PAN: ${parcel.ownerDetails.panNo}

Parcel Information
==================
Khata No: ${parcel.parcelInfo.khataNo}
Plot No: ${parcel.parcelInfo.plotNo}
Village: ${parcel.parcelInfo.village}
District: ${parcel.parcelInfo.district}
State: ${parcel.parcelInfo.state}
Pincode: ${parcel.parcelInfo.pincode}
Zone: ${parcel.parcelInfo.zone}
Land Use: ${parcel.parcelInfo.landUse}
Soil Type: ${parcel.parcelInfo.soilType}
Location: ${parcel.location}
Coordinates: ${parcel.coordinates}

Measurements
============
Total Area: ${parcel.measurements.totalArea}
Usable Area: ${parcel.measurements.usableArea}
Perimeter: ${parcel.measurements.perimeter}
Shape: ${parcel.measurements.shape}

Boundaries:
North: ${parcel.measurements.boundaries.north}
South: ${parcel.measurements.boundaries.south}
East: ${parcel.measurements.boundaries.east}
West: ${parcel.measurements.boundaries.west}

Acquisition Details
===================
Acquisition Date: ${parcel.acquisitionDetails.acquisitionDate}
Purpose: ${parcel.acquisitionDetails.purpose}
Authority: ${parcel.acquisitionDetails.authority}
Approved By: ${parcel.acquisitionDetails.approvedBy}
Market Value: ${parcel.acquisitionDetails.marketValue}
Assessed Value: ${parcel.acquisitionDetails.assessedValue}
Total Compensation: ${parcel.acquisitionDetails.totalCompensation}
Payment Status: ${parcel.acquisitionDetails.paymentStatus}

Legal Details
=============
Registration No: ${parcel.legalDetails.registrationNo}
Registration Date: ${parcel.legalDetails.registrationDate}
Previous Owner: ${parcel.legalDetails.previousOwner}
Encumbrances: ${parcel.legalDetails.encumbrances}
Legal Status: ${parcel.legalDetails.legalStatus}

Documents
=========
${parcel.documents.join('\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `parcel_${parcel.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Acquired':
        return 'bg-green-100 text-green-700'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Acquired':
        return <CheckCircle size={40} className="text-green-600" />
      case 'In Progress':
        return <Clock size={40} className="text-blue-600" />
      case 'Pending':
        return <AlertCircle size={40} className="text-orange-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const openInGoogleMaps = () => {
    const [lat, lng] = parcel.coordinates.split(',').map(c => parseFloat(c.replace(/[^0-9.-]/g, '')))
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
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
            <h1 className="text-2xl font-bold text-gray-900">Parcel {parcel.id}</h1>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <MapPin size={14} className="mr-1" />
              {parcel.location} • Survey No: {parcel.surveyNo}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(parcel.status)}`}>
            {parcel.status}
          </span>
          <button 
            onClick={openInGoogleMaps}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Navigation size={20} />
            <span>Open in Maps</span>
          </button>
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
        parcel.status === 'Acquired' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        parcel.status === 'In Progress' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
        'bg-gradient-to-r from-orange-500 to-orange-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              parcel.status === 'Acquired' ? 'text-green-100' :
              parcel.status === 'In Progress' ? 'text-blue-100' :
              'text-orange-100'
            }`}>
              Parcel Status
            </p>
            <h2 className="text-4xl font-bold">{parcel.status}</h2>
            <p className={`text-sm mt-2 ${
              parcel.status === 'Acquired' ? 'text-green-100' :
              parcel.status === 'In Progress' ? 'text-blue-100' :
              'text-orange-100'
            }`}>
              {parcel.area} • Compensation: {parcel.compensation} • Registered: {parcel.date}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(parcel.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Area</p>
              <h3 className="text-2xl font-bold text-gray-900">{parcel.area}</h3>
              <p className="text-xs text-gray-500 mt-2">{parcel.measurements.totalArea}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Ruler size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Compensation</p>
              <h3 className="text-2xl font-bold text-green-600">{parcel.compensation}</h3>
              <p className="text-xs text-gray-500 mt-2">Total amount</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Documents</p>
              <h3 className="text-2xl font-bold text-purple-600">{parcel.documents.length}</h3>
              <p className="text-xs text-gray-500 mt-2">Verified records</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Registration</p>
              <h3 className="text-lg font-bold text-orange-600">{parcel.date}</h3>
              <p className="text-xs text-gray-500 mt-2">Added to registry</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Parcel Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <MapPin size={20} className="mr-2" />
          Parcel Information
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Parcel ID</p>
            <p className="text-sm font-medium text-gray-900">{parcel.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Survey Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.surveyNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Khata Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.khataNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Plot Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.plotNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Village</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.village}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">District</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.district}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">State</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.state}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Pincode</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.pincode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Zone</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.zone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Land Use</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.landUse}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Soil Type</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelInfo.soilType}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">GPS Coordinates</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Navigation size={14} className="mr-1" />
              {parcel.coordinates}
            </p>
          </div>
        </div>
      </div>

      {/* Owner Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Owner Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Owner Name</p>
            <p className="text-sm font-medium text-gray-900">{parcel.ownerDetails.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <Phone size={12} className="mr-1" />
              Contact Number
            </p>
            <p className="text-sm font-medium text-gray-900">{parcel.ownerDetails.contact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 flex items-center">
              <Mail size={12} className="mr-1" />
              Email Address
            </p>
            <p className="text-sm font-medium text-gray-900">{parcel.ownerDetails.email}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm font-medium text-gray-900">{parcel.ownerDetails.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.ownerDetails.panNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Aadhar Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.ownerDetails.aadharNo}</p>
          </div>
        </div>
      </div>

      {/* Measurements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Ruler size={20} className="mr-2" />
          Measurements & Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 mb-2">Total Area</p>
            <p className="text-2xl font-bold text-blue-900">{parcel.measurements.totalArea}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700 mb-2">Usable Area</p>
            <p className="text-2xl font-bold text-green-900">{parcel.measurements.usableArea}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-xs text-purple-700 mb-2">Perimeter</p>
            <p className="text-2xl font-bold text-purple-900">{parcel.measurements.perimeter}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-xs text-orange-700 mb-2">Shape</p>
            <p className="text-2xl font-bold text-orange-900">{parcel.measurements.shape}</p>
          </div>
        </div>
      </div>

      {/* Boundaries */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Navigation size={20} className="mr-2" />
          Property Boundaries
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2 font-semibold">North</p>
            <p className="text-sm text-gray-900">{parcel.measurements.boundaries.north}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2 font-semibold">South</p>
            <p className="text-sm text-gray-900">{parcel.measurements.boundaries.south}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2 font-semibold">East</p>
            <p className="text-sm text-gray-900">{parcel.measurements.boundaries.east}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2 font-semibold">West</p>
            <p className="text-sm text-gray-900">{parcel.measurements.boundaries.west}</p>
          </div>
        </div>
      </div>

      {/* Acquisition Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Building size={20} className="mr-2" />
          Acquisition Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Acquisition Date</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar size={14} className="mr-1" />
              {parcel.acquisitionDetails.acquisitionDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Status</p>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              {parcel.acquisitionDetails.paymentStatus}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Approved By</p>
            <p className="text-sm font-medium text-gray-900">{parcel.acquisitionDetails.approvedBy}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Purpose</p>
            <p className="text-sm font-medium text-gray-900">{parcel.acquisitionDetails.purpose}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Authority</p>
            <p className="text-sm font-medium text-gray-900">{parcel.acquisitionDetails.authority}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Market Value</p>
            <p className="text-sm font-medium text-gray-900">{parcel.acquisitionDetails.marketValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Assessed Value</p>
            <p className="text-sm font-medium text-gray-900">{parcel.acquisitionDetails.assessedValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Compensation</p>
            <p className="text-sm font-medium text-green-600 text-lg">{parcel.acquisitionDetails.totalCompensation}</p>
          </div>
        </div>
      </div>

      {/* Legal Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FileText size={20} className="mr-2" />
          Legal Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Registration Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.legalDetails.registrationNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Registration Date</p>
            <p className="text-sm font-medium text-gray-900">{parcel.legalDetails.registrationDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Legal Status</p>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              {parcel.legalDetails.legalStatus}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Previous Owner</p>
            <p className="text-sm font-medium text-gray-900">{parcel.legalDetails.previousOwner}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Encumbrances</p>
            <p className="text-sm font-medium text-gray-900">{parcel.legalDetails.encumbrances}</p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <File size={20} className="mr-2" />
          Documents ({parcel.documents.length})
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {parcel.documents.map((doc, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                  <File size={20} className="text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc}</p>
                  <p className="text-xs text-gray-500">PDF Document</p>
                </div>
              </div>
            </div>
          ))}
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
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <CheckCircle size={16} className="text-orange-600" />
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
            <p className="text-xs text-gray-600 mb-2">Parcel ID</p>
            <p className="text-lg font-bold text-gray-900">{parcel.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Area</p>
            <p className="text-lg font-bold text-blue-600">{parcel.area}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Compensation</p>
            <p className="text-lg font-bold text-green-600">{parcel.compensation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Owner</p>
            <p className="text-lg font-bold text-purple-600">{parcel.owner}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              parcel.status === 'Acquired' ? 'text-green-600' :
              parcel.status === 'In Progress' ? 'text-blue-600' :
              'text-orange-600'
            }`}>
              {parcel.status}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-4">
        <button 
          onClick={openInGoogleMaps}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Navigation size={20} />
          <span>View in Google Maps</span>
        </button>
        <button 
          onClick={handleExport}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Download Record</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share Details</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print Report</span>
        </button>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Registry</span>
        </button>
      </div>
    </div>
  )
}