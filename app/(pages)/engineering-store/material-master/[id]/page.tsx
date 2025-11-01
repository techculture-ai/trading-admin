'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Download, Package, DollarSign, AlertTriangle, TrendingUp, MapPin, User, FileText, CheckCircle, Clock, BarChart3, Share2, Printer, Edit } from 'lucide-react'

interface MaterialDetails {
  id: string
  materialCode: string
  materialName: string
  category: string
  unit: string
  currentStock: number
  reorderLevel: number
  specification: string
  unitPrice: string
  totalValue: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  supplier: string
  location: string
  description: string
  materialInfo: {
    brand: string
    manufacturer: string
    grade: string
    quality: string
    expiryDate?: string
  }
  stockMovement: {
    date: string
    type: 'Inward' | 'Outward' | 'Adjustment'
    quantity: number
    reference: string
    remarks: string
  }[]
  usageHistory: {
    project: string
    quantity: number
    date: string
    purpose: string
  }[]
  reorderHistory: {
    orderDate: string
    quantity: number
    supplier: string
    status: 'Ordered' | 'Received' | 'Pending'
    expectedDate: string
  }[]
}

interface AuditLog {
  id: string
  timestamp: string
  action: string
  performedBy: string
  details: string
}

export default function MaterialDetailsPage() {
  const router = useRouter()
  const params = useParams()
  
  // Mock data
  const [material] = useState<MaterialDetails>({
    id: 'MAT-ENG-001',
    materialCode: 'CEM-OPC-53',
    materialName: 'Cement OPC 53 Grade',
    category: 'Cement',
    unit: 'Bag (50 kg)',
    currentStock: 2500,
    reorderLevel: 500,
    specification: 'IS 12269:2013',
    unitPrice: '₹420',
    totalValue: '₹10,50,000',
    status: 'In Stock',
    supplier: 'Ambuja Cement Ltd.',
    location: 'Warehouse A - Section 1',
    description: 'Ordinary Portland Cement 53 Grade for structural work. High strength cement suitable for all types of construction including RCC work, pre-stressed concrete, and prestressed concrete.',
    materialInfo: {
      brand: 'Ambuja Cement',
      manufacturer: 'Ambuja Cements Limited',
      grade: 'OPC 53',
      quality: 'Premium Grade',
      expiryDate: '2025-12-31',
    },
    stockMovement: [
      {
        date: '2025-10-28',
        type: 'Outward',
        quantity: 500,
        reference: 'ISS/ENG/2024/001',
        remarks: 'Issued to Gomti Nagar Housing Scheme',
      },
      {
        date: '2025-10-25',
        type: 'Inward',
        quantity: 1000,
        reference: 'PO/2024/156',
        remarks: 'Purchase order received from Ambuja Cement',
      },
      {
        date: '2025-10-20',
        type: 'Outward',
        quantity: 300,
        reference: 'ISS/ENG/2024/002',
        remarks: 'Issued to Hazratganj Commercial Complex',
      },
      {
        date: '2025-10-15',
        type: 'Inward',
        quantity: 2000,
        reference: 'PO/2024/145',
        remarks: 'Stock replenishment order',
      },
      {
        date: '2025-10-10',
        type: 'Adjustment',
        quantity: -50,
        reference: 'ADJ/2024/012',
        remarks: 'Stock adjustment - damaged material',
      },
    ],
    usageHistory: [
      {
        project: 'Gomti Nagar Housing Scheme',
        quantity: 1500,
        date: '2025-10-01',
        purpose: 'Foundation and structural work',
      },
      {
        project: 'Hazratganj Commercial Complex',
        quantity: 800,
        date: '2025-10-15',
        purpose: 'Column construction',
      },
      {
        project: 'Aliganj Residential Project',
        quantity: 600,
        date: '2025-10-20',
        purpose: 'Slab casting',
      },
    ],
    reorderHistory: [
      {
        orderDate: '2025-10-20',
        quantity: 1000,
        supplier: 'Ambuja Cement Ltd.',
        status: 'Received',
        expectedDate: '2025-10-25',
      },
      {
        orderDate: '2025-10-10',
        quantity: 2000,
        supplier: 'Ambuja Cement Ltd.',
        status: 'Received',
        expectedDate: '2025-10-15',
      },
      {
        orderDate: '2025-09-25',
        quantity: 1500,
        supplier: 'Ambuja Cement Ltd.',
        status: 'Received',
        expectedDate: '2025-09-30',
      },
    ]
  })

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AL-001',
      timestamp: '2025-10-28 10:00:00',
      action: 'Stock Issued',
      performedBy: 'Store Manager - Amit Kumar',
      details: '500 bags issued to Gomti Nagar Housing Scheme',
    },
    {
      id: 'AL-002',
      timestamp: '2025-10-25 14:30:00',
      action: 'Stock Received',
      performedBy: 'Store Manager - Amit Kumar',
      details: '1000 bags received from Ambuja Cement Ltd.',
    },
    {
      id: 'AL-003',
      timestamp: '2025-10-20 11:00:00',
      action: 'Stock Issued',
      performedBy: 'Store Manager - Amit Kumar',
      details: '300 bags issued to Hazratganj Commercial Complex',
    },
    {
      id: 'AL-004',
      timestamp: '2025-10-20 09:00:00',
      action: 'Reorder Placed',
      performedBy: 'Purchase Manager',
      details: 'Purchase order placed for 1000 bags',
    },
    {
      id: 'AL-005',
      timestamp: '2025-10-15 15:00:00',
      action: 'Stock Received',
      performedBy: 'Store Manager - Amit Kumar',
      details: '2000 bags received - stock replenishment',
    },
  ])

  const handleExport = () => {
    const content = `
Material Details Report
=======================

Material ID: ${material.id}
Material Code: ${material.materialCode}
Status: ${material.status}

Basic Information
=================
Material Name: ${material.materialName}
Category: ${material.category}
Unit: ${material.unit}
Specification: ${material.specification}

Stock Information
=================
Current Stock: ${material.currentStock} ${material.unit}
Reorder Level: ${material.reorderLevel} ${material.unit}
Unit Price: ${material.unitPrice}
Total Value: ${material.totalValue}

Material Information
====================
Brand: ${material.materialInfo.brand}
Manufacturer: ${material.materialInfo.manufacturer}
Grade: ${material.materialInfo.grade}
Quality: ${material.materialInfo.quality}
${material.materialInfo.expiryDate ? `Expiry Date: ${material.materialInfo.expiryDate}` : ''}

Supplier & Location
===================
Supplier: ${material.supplier}
Storage Location: ${material.location}

Stock Movement (Recent)
=======================
${material.stockMovement.map(m => `${m.date} - ${m.type}: ${m.quantity} ${material.unit}\n   Reference: ${m.reference}\n   ${m.remarks}`).join('\n\n')}

Usage History
=============
${material.usageHistory.map(u => `${u.date} - ${u.project}\n   Quantity: ${u.quantity} ${material.unit}\n   Purpose: ${u.purpose}`).join('\n\n')}

Reorder History
===============
${material.reorderHistory.map(r => `${r.orderDate} - ${r.quantity} ${material.unit}\n   Supplier: ${r.supplier}\n   Status: ${r.status}\n   Expected: ${r.expectedDate}`).join('\n\n')}

Description
===========
${material.description}

Audit Trail
===========
${auditLogs.map(log => `${log.timestamp} - ${log.action} by ${log.performedBy}\n   ${log.details}`).join('\n\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `material_${material.id}.txt`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-700'
      case 'Low Stock':
        return 'bg-orange-100 text-orange-700'
      case 'Out of Stock':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <CheckCircle size={40} className="text-green-600" />
      case 'Low Stock':
        return <AlertTriangle size={40} className="text-orange-600" />
      case 'Out of Stock':
        return <AlertTriangle size={40} className="text-red-600" />
      default:
        return <Clock size={40} className="text-gray-600" />
    }
  }

  const stockPercentage = ((material.currentStock / (material.currentStock + material.reorderLevel)) * 100).toFixed(1)
  const daysToExpiry = material.materialInfo.expiryDate 
    ? Math.ceil((new Date(material.materialInfo.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  const totalInward = material.stockMovement
    .filter(m => m.type === 'Inward')
    .reduce((sum, m) => sum + m.quantity, 0)
  
  const totalOutward = material.stockMovement
    .filter(m => m.type === 'Outward')
    .reduce((sum, m) => sum + Math.abs(m.quantity), 0)

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
            <h1 className="text-2xl font-bold text-gray-900">{material.materialName}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {material.materialCode} • {material.category}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(material.status)}`}>
            {material.status}
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
        material.status === 'In Stock' ? 'bg-gradient-to-r from-green-500 to-green-600' :
        material.status === 'Low Stock' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
        'bg-gradient-to-r from-red-500 to-red-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm mb-2 ${
              material.status === 'In Stock' ? 'text-green-100' :
              material.status === 'Low Stock' ? 'text-orange-100' :
              'text-red-100'
            }`}>
              Stock Status
            </p>
            <h2 className="text-4xl font-bold">{material.status}</h2>
            <p className={`text-sm mt-2 ${
              material.status === 'In Stock' ? 'text-green-100' :
              material.status === 'Low Stock' ? 'text-orange-100' :
              'text-red-100'
            }`}>
              Current Stock: {material.currentStock} {material.unit} • Value: {material.totalValue}
            </p>
          </div>
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {getStatusIcon(material.status)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Current Stock</p>
              <h3 className="text-2xl font-bold text-gray-900">{material.currentStock}</h3>
              <p className="text-xs text-gray-500 mt-2">{material.unit}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Value</p>
              <h3 className="text-2xl font-bold text-blue-600">{material.totalValue}</h3>
              <p className="text-xs text-gray-500 mt-2">@ {material.unitPrice}/unit</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Reorder Level</p>
              <h3 className="text-2xl font-bold text-orange-600">{material.reorderLevel}</h3>
              <p className="text-xs text-gray-500 mt-2">{material.unit}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Unit Price</p>
              <h3 className="text-2xl font-bold text-purple-600">{material.unitPrice}</h3>
              <p className="text-xs text-gray-500 mt-2">Per {material.unit}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Stock Level Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock Level</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Current Stock vs Capacity</span>
            <span className="font-medium text-gray-900">{stockPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                parseFloat(stockPercentage) > 50 ? 'bg-green-500' :
                parseFloat(stockPercentage) > 20 ? 'bg-orange-500' :
                'bg-red-500'
              }`}
              style={{ width: `${stockPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Current: {material.currentStock}</span>
            <span>Reorder: {material.reorderLevel}</span>
          </div>
        </div>
      </div>

      {/* Material Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Material Information</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Material ID</p>
            <p className="text-sm font-medium text-gray-900">{material.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Material Code</p>
            <p className="text-sm font-medium text-gray-900">{material.materialCode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Category</p>
            <p className="text-sm font-medium text-gray-900">{material.category}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Unit</p>
            <p className="text-sm font-medium text-gray-900">{material.unit}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Specification</p>
            <p className="text-sm font-medium text-gray-900">{material.specification}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Brand</p>
            <p className="text-sm font-medium text-gray-900">{material.materialInfo.brand}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Manufacturer</p>
            <p className="text-sm font-medium text-gray-900">{material.materialInfo.manufacturer}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Grade</p>
            <p className="text-sm font-medium text-gray-900">{material.materialInfo.grade}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Quality</p>
            <p className="text-sm font-medium text-gray-900">{material.materialInfo.quality}</p>
          </div>
          {material.materialInfo.expiryDate && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(material.materialInfo.expiryDate).toLocaleDateString('en-IN', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                })}
                {daysToExpiry && daysToExpiry > 0 && (
                  <span className="ml-2 text-xs text-orange-600">({daysToExpiry} days remaining)</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Supplier & Location */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User size={20} className="mr-2" />
          Supplier & Storage Information
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Primary Supplier</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <User size={14} className="mr-1" />
              {material.supplier}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Storage Location</p>
            <p className="text-sm font-medium text-gray-900 flex items-center">
              <MapPin size={14} className="mr-1" />
              {material.location}
            </p>
          </div>
        </div>
      </div>

      {/* Stock Movement Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 size={20} className="mr-2" />
          Stock Movement Summary
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700 mb-2">Total Inward</p>
            <p className="text-2xl font-bold text-green-900">{totalInward}</p>
            <p className="text-xs text-green-600 mt-1">{material.unit}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-xs text-red-700 mb-2">Total Outward</p>
            <p className="text-2xl font-bold text-red-900">{totalOutward}</p>
            <p className="text-xs text-red-600 mt-1">{material.unit}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 mb-2">Net Movement</p>
            <p className="text-2xl font-bold text-blue-900">{totalInward - totalOutward}</p>
            <p className="text-xs text-blue-600 mt-1">{material.unit}</p>
          </div>
        </div>
      </div>

      {/* Stock Movement History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Stock Movement History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {material.stockMovement.map((movement, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(movement.date).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      movement.type === 'Inward' ? 'bg-green-100 text-green-700' :
                      movement.type === 'Outward' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {movement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {movement.quantity > 0 ? '+' : ''}{movement.quantity} {material.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{movement.reference}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{movement.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Project Usage History</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {material.usageHistory.map((usage, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{usage.project}</p>
                  <p className="text-sm text-gray-600 mt-1">{usage.purpose}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-xs text-gray-500">
                      Quantity: <span className="font-medium text-gray-900">{usage.quantity} {material.unit}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Date: {new Date(usage.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reorder History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Reorder History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {material.reorderHistory.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.orderDate).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.quantity} {material.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(order.expectedDate).toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Received' ? 'bg-green-100 text-green-700' :
                      order.status === 'Ordered' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2" />
          Material Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
          {material.description}
        </p>
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
            <p className="text-xs text-gray-600 mb-2">Material ID</p>
            <p className="text-lg font-bold text-gray-900">{material.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Current Stock</p>
            <p className="text-lg font-bold text-green-600">{material.currentStock} {material.unit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Value</p>
            <p className="text-sm font-bold text-blue-600">{material.totalValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Reorder Level</p>
            <p className="text-lg font-bold text-orange-600">{material.reorderLevel}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <p className={`text-lg font-bold ${
              material.status === 'In Stock' ? 'text-green-600' :
              material.status === 'Low Stock' ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {material.status}
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
          <span>Edit Material</span>
        </button>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <Share2 size={20} />
          <span>Share</span>
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Printer size={20} />
          <span>Print</span>
        </button>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </button>
      </div>
    </div>
  )
}