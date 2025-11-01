'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, MapPin, User, FileText, DollarSign, Calendar, Building, Navigation, Ruler, Map as MapIcon, Eye, Share2, Printer } from 'lucide-react'

interface ParcelGISDetails {
  id: string
  parcelId: string
  location: string
  coordinates: { lat: number; lng: number }
  status: 'Acquired' | 'In Progress' | 'Pending' | 'Disputed'
  area: string
  owner: string
  value: string
  ownerDetails: {
    name: string
    address: string
    contact: string
    email: string
    aadharNo: string
    panNo: string
  }
  parcelDetails: {
    surveyNo: string
    khataNo: string
    village: string
    district: string
    zone: string
    landUse: string
    soilType: string
    elevation: string
  }
  boundaries: {
    north: string
    south: string
    east: string
    west: string
  }
  acquisitionDetails: {
    acquisitionDate: string
    compensationAmount: string
    paymentStatus: string
    purpose: string
    authority: string
  }
  measurements: {
    perimeter: string
    shape: string
    totalArea: string
    usableArea: string
  }
  nearbyLandmarks: {
    name: string
    distance: string
    direction: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function GISParcelDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data - in real app, fetch based on params.id
  const [parcel] = useState<ParcelGISDetails>({
    id: '1',
    parcelId: 'PAR-145',
    location: 'Gomti Nagar, Lucknow',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    status: 'Acquired',
    area: '2.5 acres',
    owner: 'Ram Kumar Singh',
    value: '₹45,00,000',
    ownerDetails: {
      name: 'Ram Kumar Singh',
      address: 'House No. 123, Village Gomti Nagar, Lucknow - 226010',
      contact: '+91 98765 43210',
      email: 'ramkumar@email.com',
      aadharNo: 'XXXX-XXXX-1234',
      panNo: 'ABCDE1234F',
    },
    parcelDetails: {
      surveyNo: 'SUR-2024-145',
      khataNo: 'KH-456',
      village: 'Gomti Nagar',
      district: 'Lucknow',
      zone: 'Zone A (North)',
      landUse: 'Agricultural',
      soilType: 'Alluvial',
      elevation: '125 meters above MSL',
    },
    boundaries: {
      north: 'Property of Suresh Kumar (PAR-150)',
      south: 'Main Road (NH-27)',
      east: 'Canal',
      west: 'Property of Geeta Devi (PAR-146)',
    },
    acquisitionDetails: {
      acquisitionDate: '20 Jan 2024',
      compensationAmount: '₹55,00,000',
      paymentStatus: 'Paid',
      purpose: 'Infrastructure Development - Metro Extension',
      authority: 'Lucknow Development Authority',
    },
    measurements: {
      perimeter: '625 meters',
      shape: 'Rectangular',
      totalArea: '2.5 acres (10,117.5 sq meters)',
      usableArea: '2.4 acres (9,712.8 sq meters)',
    },
    nearbyLandmarks: [
      {
        name: 'Gomti Nagar Metro Station',
        distance: '1.2 km',
        direction: 'North-East',
      },
      {
        name: 'Government Hospital',
        distance: '800 meters',
        direction: 'South',
      },
      {
        name: 'Primary School',
        distance: '500 meters',
        direction: 'West',
      },
      {
        name: 'Community Center',
        distance: '1.5 km',
        direction: 'East',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2024-01-10 10:00:00',
      action: 'Parcel Surveyed',
      performedBy: 'Survey Team',
      details: 'Initial land survey completed and coordinates recorded',
    },
    {
      id: 'AL-002',
      timestamp: '2024-01-12 14:30:00',
      action: 'Ownership Verified',
      performedBy: 'Land Records Officer',
      details: 'Land ownership documents verified from revenue records',
    },
    {
      id: 'AL-003',
      timestamp: '2024-01-15 11:00:00',
      action: 'Valuation Completed',
      performedBy: 'Land Valuation Officer',
      details: 'Market value assessed at ₹45,00,000',
    },
    {
      id: 'AL-004',
      timestamp: '2024-01-18 09:30:00',
      action: 'Acquisition Approved',
      performedBy: 'Land Acquisition Officer',
      details: 'Land acquisition approved for metro extension project',
    },
    {
      id: 'AL-005',
      timestamp: '2024-01-20 10:00:00',
      action: 'Compensation Paid',
      performedBy: 'Treasury Officer',
      details: 'Compensation amount of ₹55,00,000 disbursed to owner',
    },
    {
      id: 'AL-006',
      timestamp: '2024-01-22 15:00:00',
      action: 'GIS Data Updated',
      performedBy: 'GIS Administrator',
      details: 'Parcel status updated to "Acquired" in GIS system',
    },
  ])

  const handleExport = () => {
    const content = `
GIS Parcel Details Report
==========================

Parcel ID: ${parcel.parcelId}
Location: ${parcel.location}
Status: ${parcel.status}

Geographic Information
======================
Coordinates: ${parcel.coordinates.lat}° N, ${parcel.coordinates.lng}° E
Survey Number: ${parcel.parcelDetails.surveyNo}
Khata Number: ${parcel.parcelDetails.khataNo}
Village: ${parcel.parcelDetails.village}
District: ${parcel.parcelDetails.district}
Zone: ${parcel.parcelDetails.zone}
Elevation: ${parcel.parcelDetails.elevation}

Land Details
============
Total Area: ${parcel.measurements.totalArea}
Usable Area: ${parcel.measurements.usableArea}
Perimeter: ${parcel.measurements.perimeter}
Shape: ${parcel.measurements.shape}
Land Use: ${parcel.parcelDetails.landUse}
Soil Type: ${parcel.parcelDetails.soilType}
Market Value: ${parcel.value}

Boundaries
==========
North: ${parcel.boundaries.north}
South: ${parcel.boundaries.south}
East: ${parcel.boundaries.east}
West: ${parcel.boundaries.west}

Owner Details
=============
Name: ${parcel.ownerDetails.name}
Address: ${parcel.ownerDetails.address}
Contact: ${parcel.ownerDetails.contact}
Email: ${parcel.ownerDetails.email}
PAN: ${parcel.ownerDetails.panNo}
Aadhar: ${parcel.ownerDetails.aadharNo}

Acquisition Details
===================
Acquisition Date: ${parcel.acquisitionDetails.acquisitionDate}
Compensation: ${parcel.acquisitionDetails.compensationAmount}
Payment Status: ${parcel.acquisitionDetails.paymentStatus}
Purpose: ${parcel.acquisitionDetails.purpose}
Authority: ${parcel.acquisitionDetails.authority}

Nearby Landmarks
================
${parcel.nearbyLandmarks.map(l => `${l.name} - ${l.distance} (${l.direction})`).join('\n')}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}: ${log.details}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gis_parcel_${parcel.parcelId}.txt`
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
      case 'Disputed':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${parcel.coordinates.lat},${parcel.coordinates.lng}`, '_blank')
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
            <h1 className="text-2xl font-bold text-gray-900">Parcel {parcel.parcelId}</h1>
            <p className="text-sm text-gray-600 mt-1 flex items-center">
              <MapPin size={14} className="mr-1" />
              {parcel.location}
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

      {/* Map Preview Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-2">Geographic Location</p>
            <h2 className="text-4xl font-bold">{parcel.coordinates.lat.toFixed(4)}° N</h2>
            <h2 className="text-4xl font-bold">{parcel.coordinates.lng.toFixed(4)}° E</h2>
            <p className="text-blue-100 text-sm mt-2">Survey No: {parcel.parcelDetails.surveyNo} • Zone: {parcel.parcelDetails.zone}</p>
          </div>
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <MapIcon size={64} />
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
              <p className="text-sm text-gray-600 mb-2">Market Value</p>
              <h3 className="text-2xl font-bold text-green-600">{parcel.value}</h3>
              <p className="text-xs text-gray-500 mt-2">Current valuation</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Perimeter</p>
              <h3 className="text-2xl font-bold text-purple-600">{parcel.measurements.perimeter}</h3>
              <p className="text-xs text-gray-500 mt-2">{parcel.measurements.shape}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapIcon size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Elevation</p>
              <h3 className="text-2xl font-bold text-orange-600">125m</h3>
              <p className="text-xs text-gray-500 mt-2">above MSL</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Navigation size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Parcel Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <MapIcon size={20} className="mr-2" />
          Parcel Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Parcel ID</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Survey Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelDetails.surveyNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Khata Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelDetails.khataNo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Village</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelDetails.village}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">District</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelDetails.district}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Zone</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelDetails.zone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Land Use</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelDetails.landUse}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Soil Type</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelDetails.soilType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Elevation</p>
            <p className="text-sm font-medium text-gray-900">{parcel.parcelDetails.elevation}</p>
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
            <p className="text-sm text-gray-900">{parcel.boundaries.north}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2 font-semibold">South</p>
            <p className="text-sm text-gray-900">{parcel.boundaries.south}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2 font-semibold">East</p>
            <p className="text-sm text-gray-900">{parcel.boundaries.east}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2 font-semibold">West</p>
            <p className="text-sm text-gray-900">{parcel.boundaries.west}</p>
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
            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
            <p className="text-sm font-medium text-gray-900">{parcel.ownerDetails.contact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
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
            <p className="text-xs text-gray-500 mb-1">Compensation Amount</p>
            <p className="text-sm font-medium text-green-600">{parcel.acquisitionDetails.compensationAmount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Status</p>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              {parcel.acquisitionDetails.paymentStatus}
            </span>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Purpose</p>
            <p className="text-sm font-medium text-gray-900">{parcel.acquisitionDetails.purpose}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Authority</p>
            <p className="text-sm font-medium text-gray-900">{parcel.acquisitionDetails.authority}</p>
          </div>
        </div>
      </div>

      {/* Nearby Landmarks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <MapPin size={20} className="mr-2" />
          Nearby Landmarks
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {parcel.nearbyLandmarks.map((landmark, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{landmark.name}</p>
                  <p className="text-xs text-gray-500">{landmark.direction}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">{landmark.distance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText size={20} className="mr-2" />
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
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <MapIcon size={16} className="text-blue-600" />
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
            <p className="text-lg font-bold text-gray-900">{parcel.parcelId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Area</p>
            <p className="text-lg font-bold text-blue-600">{parcel.area}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Value</p>
            <p className="text-lg font-bold text-green-600">{parcel.value}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Zone</p>
            <p className="text-lg font-bold text-purple-600">{parcel.parcelDetails.zone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              parcel.status === 'Acquired' ? 'text-green-600' :
              parcel.status === 'In Progress' ? 'text-blue-600' :
              parcel.status === 'Disputed' ? 'text-red-600' :
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
          <span>Download GIS Data</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share Location</span>
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
          <span>Back to Map</span>
        </button>
      </div>
    </div>
  )
}